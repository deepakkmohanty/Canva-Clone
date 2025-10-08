import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa'
import { FaDiamond } from 'react-icons/fa6'
import { IoTriangle } from 'react-icons/io5'
import { ActiveTool } from '../types'
import ShapeTool from './shape-tool'
import { ToolSidebarClose } from './tool-sidebar-close'
import ToolSidebarHeader from './tool-sidebar-header'

interface ShapeSidebarProps {
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

const ShapeSidebar = ({
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select')
  }
  return (
    <aside
      className={cn(
        'bg-white h-full w-[360px] border-r z-[40] relative flex flex-col',
        activeTool === 'shapes' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />

      <ScrollArea>
        <div className="grid grid-cols-3 gap-2 p-4">
          <ShapeTool icon={FaCircle} onClick={() => {}} />
          <ShapeTool icon={FaSquare} onClick={() => {}} />
          <ShapeTool icon={FaSquareFull} onClick={() => {}} />
          <ShapeTool icon={IoTriangle} onClick={() => {}} />
          <ShapeTool
            icon={IoTriangle}
            onClick={() => {}}
            iconClassName="rotate-180"
          />
          <ShapeTool icon={FaDiamond} onClick={() => {}} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}

export default ShapeSidebar
