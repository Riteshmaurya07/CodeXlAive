import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/eclipse.css";           // 👈 light theme
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

import { ACTIONS } from "../Actions";

function Editor({ socket, roomId, onCodeChange, theme }) {
  const editorRef = useRef(null);

  // Initialize CodeMirror
  useEffect(() => {
    const textarea = document.getElementById("realtimeEditor");
    if (!textarea) return;

    const editor = CodeMirror.fromTextArea(textarea, {
      mode: { name: "javascript", json: true },
      theme: theme === "dark" ? "dracula" : "eclipse",   // 👈 initial theme
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    editorRef.current = editor;
    editor.setSize(null, "100%");

    editor.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);

      if (origin !== "setValue" && socket) {
        socket.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    });
  }, [onCodeChange, roomId, socket, theme]);

  // Switch theme when `theme` changes
  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.setOption(
      "theme",
      theme === "dark" ? "dracula" : "eclipse"
    );
  }, [theme]);

  // Listen for code from server
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
    <div style={{ height: "600px" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;
