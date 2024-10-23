import { useState, useEffect } from 'react';
import { Moon, Sun, UserCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CanvasTransLogo } from './CanvasTransLogo';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export default function Header({ toggleDarkMode, isDarkMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = router.pathname === '/';

  return (

    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/10 backdrop-blur-md border-b border-border' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <CanvasTransLogo />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">CanvasTrans</span>
        </Link>

        {isHomePage && (
          <nav className="hidden md:flex space-x-6">
            {['Features', 'How It Works', 'Creators'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {isHomePage && (
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="relative">
              <Sun className={`h-[1.2rem] w-[1.2rem] ${isDarkMode ? 'block' : 'hidden'} text-yellow-500`} />
              <Moon className={`h-[1.2rem] w-[1.2rem] ${isDarkMode ? 'hidden' : 'block'} text-gray-400`} />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {!connected ? (
                    <Button onClick={openConnectModal} variant="outline">
                      Connect Wallet
                    </Button>
                  ) : chain.unsupported ? (
                    <Button onClick={openChainModal} variant="destructive">
                      Wrong network
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button onClick={openChainModal} variant="outline" size="sm">
                        {chain.hasIcon && chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-4 h-4"
                          />
                        )}
                        {chain.name}
                      </Button>

                      <Button onClick={openAccountModal} variant="outline" size="sm">
                        {account.displayName}
                        {account.displayBalance ? ` (${account.displayBalance})` : ''}
                      </Button>
                    </div>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>

          <Link href="/user-block">
            <Button variant="ghost" size="icon" className="relative">
              <UserCircle2 className="h-9 w-9 text-foreground/80 hover:text-primary transition-colors" />
              <span className="sr-only">User profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

