import { Button } from "@/components/ui/button"
import { Wallet } from 'lucide-react'

interface WalletConnectButtonProps {
  onClick: () => void
}

export default function WalletConnectButton({ onClick }: WalletConnectButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-primary hover:bg-primary/90 text-primary-foreground  font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  )
}