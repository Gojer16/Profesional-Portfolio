'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentLocale = useLocale();

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLocalizedHref = (localeCode: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/(en|es|de|fr|it|pt|ru|pl)/, '') || '/';
    return `/${localeCode}${pathWithoutLocale}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2
          px-3 py-2
          text-sm font-medium
          text-text-primary
          bg-background
          border border-border/60
          rounded-lg
          hover:bg-background-secondary
          hover:border-border
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/20
        "
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
            absolute right-0 mt-2
            w-48
            bg-background
            border border-border/60
            rounded-lg
            shadow-lg
            overflow-hidden
            z-50
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          <div className="py-1">
            {languages.map((language) => {
              const isActive = currentLocale === language.code;
              const href = getLocalizedHref(language.code);

              return (
                <Link
                  key={language.code}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3
                    px-4 py-2.5
                    text-sm
                    transition-colors duration-150
                    ${
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-text-primary hover:bg-background-secondary'
                    }
                  `}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="flex-1">{language.label}</span>
                  {isActive && (
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
