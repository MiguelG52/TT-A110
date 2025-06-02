"use client"
import { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import type { OnChange } from "@monaco-editor/react";
import { Recommendation } from '@/models/types';

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  theme?: string;
  language?: string;
  recommendations?: Recommendation[];
}

const Editor = ({ code, onChange, theme = "light", language = "java", recommendations = [] }: EditorProps) => {
  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null) 

  useEffect(() => {
    if (editorRef.current && recommendations.length > 0) {
      const monaco = (window as any).monaco;
      if (!monaco) return;

      const decorations = recommendations.map(rec => ({
        range: new monaco.Range(rec.line, 1, rec.line, 1),
        options: {
          isWholeLine: true,
          className: `recommendation-marker ${rec.type}`,
          glyphMarginClassName: 'recommendation-glyph',
          hoverMessage: {
            value: [
              `**${rec.title}** (${rec.type})`,
              rec.description,
              ...(rec.code ? ['```java\n' + rec.code + '\n```'] : [])
            ].join('\n\n')
          }
        }
      }));

      editorRef.current.deltaDecorations([], decorations);
    }
  }, [recommendations]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange: OnChange = (value) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const handleClearEditor = () => {
    onChange('');
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleImportFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
    // Reset input para permitir seleccionar el mismo archivo otra vez
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MonacoEditor
      height="100%"
      width="100%"
      language={language}
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
  );
};

export default Editor;