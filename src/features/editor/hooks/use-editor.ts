import { Canvas, FabricObject, Rect, Shadow } from 'fabric'
import { useCallback } from 'react'

export const useEditor = () => {
  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: Canvas
      initialContainer: HTMLDivElement
    }) => {
      FabricObject.prototype.set({
        cornerColor: '#fff',
        cornerStyle: 'circle',
        borderColor: '#3b82f6',
        borderScaleFactor: 1.5,
        transparentCorner: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: '#3b82f6',
      })
      const initialWorkspace = new Rect({
        width: 900,
        height: 1200,
        name: 'clip',
        fill: 'white',
        selectable: false,
        hasControls: false,
        shadow: new Shadow({
          color: 'rgba(0,0,0,0.8)',
          blur: 5,
        }),
      })

      initialCanvas.setHeight(initialContainer.offsetHeight)
      initialCanvas.setWidth(initialContainer.offsetWidth)

      initialCanvas.add(initialWorkspace)
      initialCanvas.centerObject(initialWorkspace)
      initialCanvas.clipPath = initialWorkspace

      const text = new Rect({
        width: 100,
        height: 100,
        fill: 'green',
      })

      initialCanvas.add(text)
      initialCanvas.centerObject(text)
    },
    []
  )
  return { init }
}
