"use client"
import { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import type { OnChange } from "@monaco-editor/react"

interface EditorProps {
  code: string
  onChange: (value: string) => void
  theme?: string
  language?: string
}

const Editor = ({ code, onChange, theme = "light", language = "java" }: EditorProps)=>{
    const editorRef = useRef<any>(null);
    
    function handleEditorDidMount(editor:any) {
        editorRef.current = editor;
        editor.focus()
      }
      const handleEditorChange:OnChange = (value) => {
        if (value !== undefined) {
          onChange(value)
        }
      }
      return (
        <MonacoEditor
          height="100%"
          width="100%"
          defaultLanguage={language}
          defaultValue={code}
          value={code}
          theme={theme === "dark" ? "vs-dark" : "light"}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            automaticLayout: true,
            tabSize: 2,
            cursorBlinking: "smooth",
            folding: true,
            glyphMargin: true,
            renderLineHighlight: "all",
          }}
          className="border-0"
        />
      )
}

export default Editor
