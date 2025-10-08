'use client'
import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo,
  Undo,
} from 'lucide-react'
import { BsCloudCheck } from 'react-icons/bs'
import { CiFileOn } from 'react-icons/ci'
import { ActiveTool } from '../types'
import Logo from './logo'

interface NavbarProps {
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

const Navbar = ({ activeTool, onChangeActiveTool }: NavbarProps) => {
  return (
    <nav className="w-full border-b flex items-center p-4 lg:pl-[35px] h-[68px] gap-x-8">
      <Logo />
      <div className="w-full h-full flex items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'sm'}>
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem className="flex items-center gap-x-2">
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open as JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-2" />

        <Hint label="select" side="bottom" sideOffset={10}>
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => onChangeActiveTool('select')}
            className={cn(activeTool === 'select' && 'bg-orange-100')}
          >
            <MousePointerClick className="size-5" />
          </Button>
        </Hint>
        <Hint label="undo" side="bottom" sideOffset={10}>
          <Button variant={'ghost'} size={'icon'} className="">
            <Undo className="size-5" />
          </Button>
        </Hint>
        <Hint label="redo" side="bottom" sideOffset={10}>
          <Button variant={'ghost'} size={'icon'} className="">
            <Redo className="size-5" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2 font-medium">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Saved</div>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} size={'sm'}>
                Export
                <Download className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-60" align="end">
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
