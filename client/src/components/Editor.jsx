import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

import { ACTIONS } from "../Actions";

function Editor({ socket, roomId, onCodeChange, theme }) {
  const editorRef = useRef(null);
  const textareaRef = useRef(null);

  // 👇 refs to always have latest values inside the change handler
  const socketRef = useRef(socket);
  const roomIdRef = useRef(roomId);

  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  useEffect(() => {
    roomIdRef.current = roomId;
  }, [roomId]);

  // 🔹 Initialize CodeMirror ONCE
  useEffect(() => {
    if (!textareaRef.current) return;

    const editor = CodeMirror.fromTextArea(textareaRef.current, {
      mode: { name: "javascript", json: true },
      theme: theme === "light" ? "eclipse" : "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    editorRef.current = editor;
    editor.setSize("100%", "100%");

    editor.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);

      // 💡 use refs so we always hit the current socket + roomId
      const currentSocket = socketRef.current;
      const currentRoomId = roomIdRef.current;

      if (origin !== "setValue" && currentSocket && currentRoomId) {
        currentSocket.emit(ACTIONS.CODE_CHANGE, {
          roomId: currentRoomId,
          code,
        });
      }
    });

    return () => {
      editor.toTextArea();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // don't re-init editor

  // 🔹 React to theme changes
  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.setOption(
      "theme",
      theme === "light" ? "eclipse" : "dracula"
    );
  }, [theme]);

  // 🔹 Listen for CODE_CHANGE from server
  useEffect(() => {
    if (!socket) return;

    const handleCodeChange = ({ code }) => {
      if (code != null && editorRef.current) {
        editorRef.current.setValue(code);
      }
    };

    socket.on(ACTIONS.CODE_CHANGE, handleCodeChange);

    return () => {
      socket.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
  }, [socket]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <textarea ref={textareaRef} id="realtimeEditor" />
    </div>
  );
}

export default Editor;
