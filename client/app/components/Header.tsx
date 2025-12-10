'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const navigationItems = [
  { label: 'work', href: '/work' },
  { label: 'notes', href: '/notes' },
  { label: 'about', href: '/about' },
  { label: 'contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const currentLocale = useLocale();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === `/${currentLocale}`;
    return pathname.includes(href);
  };

  const getLocalizedHref = (href: string, locale: string) => {
    return `/${locale}${href}`;
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
            href={`/${currentLocale}`}
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
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                const href = getLocalizedHref(item.href, currentLocale);

                return (
                  <li key={item.href}>
                    <Link
                      href={href}
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
                      {t(item.label)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Language Switcher */}
            <div className="ml-4 pl-4 border-l border-border/60">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
