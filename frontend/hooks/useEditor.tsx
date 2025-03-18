"use client"

import { useEffect, useRef, useState } from "react"
import * as monaco from "monaco-editor"
import { editor } from "@/models/types"

export function useMonacoEditor({ code, onChange, theme = "vs" }: editor) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [isEditorReady, setIsEditorReady] = useState(false)

  useEffect(() => {
    if (editorRef.current && !monacoInstanceRef.current) {
      monaco.editor.defineTheme("lightTheme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#FFFFFF",
          "editor.foreground": "#000000",
          "editor.lineHighlightBackground": "#F5F5F5",
          "editor.selectionBackground": "#E3F2FD",
          "editor.inactiveSelectionBackground": "#E8EAF6",
          "editorCursor.foreground": "#1976D2",
          "editorWhitespace.foreground": "#BDBDBD",
          "editorIndentGuide.background": "#EEEEEE",
        },
      })

      monacoInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: code,
        language: "javascript",
        theme: "lightTheme",
        automaticLayout: false,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: "on",
        wordWrap: "on",
      })

      monacoInstanceRef.current.onDidChangeModelContent(() => {
        if (monacoInstanceRef.current) {
          onChange(monacoInstanceRef.current.getValue())
        }
      })

      setIsEditorReady(true)
    }

    return () => {
      if (monacoInstanceRef.current) {
        monacoInstanceRef.current.dispose()
        monacoInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isEditorReady) return

    const resizeObserver = new ResizeObserver(
      debounce(() => {
        if (monacoInstanceRef.current) {
          monacoInstanceRef.current.layout()
        }
      }, 100)
    )

    if (editorRef.current) {
      resizeObserver.observe(editorRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [isEditorReady])

  useEffect(() => {
    if (monacoInstanceRef.current && isEditorReady) {
      const model = monacoInstanceRef.current.getModel()
  
      if (model) {
        const currentValue = monacoInstanceRef.current.getValue()
  
        if (typeof code === "string" && code !== currentValue) {
          monacoInstanceRef.current.setValue(code)
        }
      }
    }
  }, [code, isEditorReady])

  function debounce(fn: Function, delay: number) {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }

  return { editorRef, isEditorReady }
}
