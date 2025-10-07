'use client'
import { Canvas } from 'fabric'
import { useEffect, useRef } from 'react'
import { useEditor } from '../hooks/use-editor'
import Footer from './footer'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Toolbar from './toolbar'

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
      <Navbar />
      <div className=" absolute h-[calc(100%-68px)] top-[68px] w-full flex ">
        <Sidebar />
        <main className="bg-muted flex flex-1 overflow-auto relative flex-col">
          <Toolbar />
          <div className="flex-1 h-[124px] bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default Editor
