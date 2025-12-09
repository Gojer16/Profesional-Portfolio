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
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/80">
      <div className="max-w-content mx-auto px-6">
        <nav
          className="flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Brand / Logo */}
          <Link
            href="/"
            aria-label="Home"
            className="
              font-display font-semibold
              text-lg
              text-text-primary
              hover:text-primary transition-colors
              focus-visible:outline-2 focus-visible:outline-primary
              focus-visible:outline-offset-2 focus-visible:rounded
            "
          >
            Orlando Ascanio
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-8">
            {navigationItems.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`
                      text-body
                      min-h-[44px] flex items-center justify-center
                      transition-colors
                      hover:text-primary/70
                      focus-visible:outline-2 focus-visible:outline-primary
                      focus-visible:outline-offset-2 focus-visible:rounded
                      ${
                        active
                          ? 'text-primary font-medium'
                          : 'text-text-secondary'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
