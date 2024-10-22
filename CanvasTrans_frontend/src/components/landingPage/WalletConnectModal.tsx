import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={onClose} className="w-full">
            MetaMask
          </Button>
          <Button onClick={onClose} className="w-full">
            WalletConnect
          </Button>
          <Button onClick={onClose} className="w-full">
            Coinbase Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}