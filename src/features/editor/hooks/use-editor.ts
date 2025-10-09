import {
  Canvas,
  Circle,
  FabricObject,
  Object,
  Polygon,
  Rect,
  Shadow,
  Triangle,
} from 'fabric'
import { useCallback, useMemo, useState } from 'react'
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
} from './../types'
import { useAutoResize } from './use-auto-resize'

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((obj: Object) => obj.name === 'clip')
  }
  const center = (object: Object) => {
    const workspace = getWorkspace()
    const center = workspace?.getCenterPoint()
    if (!center) return
    canvas._centerObject(object, center)
  }
  const addToCanvas = (object: Object) => {
    object.set({
      cornerColor: '#FFF',
      cornerStyle: 'circle',
      borderColor: '#3b82f6',
      borderScaleFactor: 1.5,
      transparentCorners: false,
      borderOpacityWhenMoving: 1,
      cornerStrokeColor: '#3b82f6',
    })

    center(object)
    canvas.add(object)
    canvas.setActiveObject(object)
  }

  return {
    addCircle: () => {
      const object = new Circle({
        ...CIRCLE_OPTIONS,
      })
      addToCanvas(object)
    },

    addSoftRectangle: () => {
      const object = new Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
      })
      addToCanvas(object)
    },
    addRectangle: () => {
      const object = new Rect({
        ...RECTANGLE_OPTIONS,
      })
      addToCanvas(object)
    },
    addTriangle: () => {
      const object = new Triangle({
        ...TRIANGLE_OPTIONS,
      })
      addToCanvas(object)
    },
    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height
      const WIDTH = TRIANGLE_OPTIONS.width
      const object = new Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
        }
      )
      addToCanvas(object)
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height
      const WIDTH = DIAMOND_OPTIONS.width
      const object = new Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
        }
      )
      addToCanvas(object)
    },
  }
}

export const useEditor = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useAutoResize({
    canvas,
    container,
  })

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
      })
    }
    return undefined
  }, [canvas])

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: Canvas
      initialContainer: HTMLDivElement
    }) => {
      FabricObject.prototype.set({
        borderColor: '#3b82f6',
        cornerColor: '#ffffff',
        cornerSize: 10,
        cornerStyle: 'circle',
        cornerStrokeColor: '#3b82f6',
        cornerStrokeSize: 1.5,
        borderScaleFactor: 1.8,
        borderDashArray: [5, 3],
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
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

      setCanvas(initialCanvas)
      setContainer(initialContainer)
    },
    []
  )
  return { init, editor }
}
