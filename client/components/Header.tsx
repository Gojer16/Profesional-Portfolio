'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { label: 'Work', href: '/work' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-content mx-auto px-6">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo/Home link */}
          <Link 
            href="/"
            className="text-body font-display font-semibold text-text-primary hover:opacity-80 transition-opacity duration-150 ease-out focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded"
            aria-label="Home"
          >
            Orlando Ascanio
          </Link>
          
          {/* Navigation links */}
          <ul className="flex items-center gap-8 m-0 p-0 list-none">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center justify-center
                    text-body
                    min-h-[44px] min-w-[44px]
                    transition-opacity duration-150 ease-out
                    hover:opacity-80
                    focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded
                    ${isActive(item.href) 
                      ? 'text-primary font-medium' 
                      : 'text-text-primary'
                    }
                  `}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
