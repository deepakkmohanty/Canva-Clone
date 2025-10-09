import { ChevronsLeft } from 'lucide-react'

interface ToolSidebarClose {
  onClick: () => void
}

export const ToolSidebarClose = ({ onClick }: ToolSidebarClose) => {
  return (
    <button
      onClick={onClick}
      className="absolute -right-[1.80rem] top-1/2 bg-white h-[70px] transform - translate-y-1/2 flex justify-center items-center rounded-r-xl px-1 pr-2 border-r border-y group transition"
    >
      <ChevronsLeft className="size-4 text-black group-hover:opacity-75 transition" />
    </button>
  )
}
