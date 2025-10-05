'use client'
import { Canvas } from 'fabric'
import { useEffect, useRef } from 'react'
import { useEditor } from '../hooks/use-editor'

const Editor = () => {
  const { init } = useEditor()
  const canvasRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const canvas = new Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    })

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    })

    return () => {
      canvas.dispose()
    }
  }, [init])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 h-full bg-muted" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

export default Editor
