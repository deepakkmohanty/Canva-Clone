'use client'
import { Canvas } from 'fabric'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor } from '../hooks/use-editor'
import { ActiveTool } from '../types'
import Footer from './footer'
import Navbar from './navbar'
import ShapeSidebar from './shape-sidebar'
import Sidebar from './sidebar'
import Toolbar from './toolbar'

const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select')

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool('select')
      }
      if (tool === 'draw') {
        //TODO: Enable draw mode
      }
      if (activeTool === 'draw') {
      }

      setActiveTool(tool)
    },
    [activeTool]
  )

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
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] top-[68px] w-full flex ">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
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
