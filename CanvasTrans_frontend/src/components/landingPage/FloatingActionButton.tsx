import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FloatingActionButtonProps {
  openWalletModal: () => void
}

export default function FloatingActionButton({ openWalletModal }: FloatingActionButtonProps) {
  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg"
      onClick={openWalletModal}
    >
      <Plus className="w-6 h-6" />
    </Button>
  )
}