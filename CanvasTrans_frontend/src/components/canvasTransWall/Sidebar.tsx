import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Block } from './types'

interface SidebarProps {
  blocks: Block[]
  selectedBlock: string | null
  setSelectedBlock: (blockId: string | null) => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ blocks, selectedBlock, setSelectedBlock, isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div className="w-64 bg-gray-800 p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4 text-purple-400">Blocks</h2>
        <ul>
          {blocks.map(block => (
            <li key={block.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left ${selectedBlock === block.id ? 'bg-purple-600' : ''}`}
                onClick={() => setSelectedBlock(block.id)}
              >
                {block.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 bg-gray-800 p-4">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-purple-400">Blocks</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <ul className="mt-4">
            {blocks.map(block => (
              <li key={block.id}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left ${selectedBlock === block.id ? 'bg-purple-600' : ''}`}
                  onClick={() => {
                    setSelectedBlock(block.id)
                    onClose()
                  }}
                >
                  {block.name}
                </Button>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  )
}