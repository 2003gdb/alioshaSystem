"use client"

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Solutions', href: '#' },
  { label: 'Contact Us', href: '/contact' },
];

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'ES', label: 'Español' },
];

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langOpen]);

  // Prevent background scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* Menu Button */}
      <button
        className="fixed top-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded bg-[var(--color-alioshaBlack)]/60 hover:bg-[var(--color-alioshaYellow)]/20 border border-[var(--color-alioshaYellow)]/20 hover:border-[var(--color-alioshaYellow)] text-[var(--color-alioshaYellow)] shadow-md cursor-pointer transition-all duration-300"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[var(--color-alioshaBlack)]/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 animate-fade-in">
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded bg-[var(--color-alioshaBlack)]/60 hover:bg-[var(--color-alioshaYellow)]/20 border border-[var(--color-alioshaYellow)]/20 hover:border-[var(--color-alioshaYellow)] text-[var(--color-alioshaYellow)] shadow-md cursor-pointer transition-all duration-300"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="flex flex-col gap-8 items-center mt-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-2xl font-semibold text-[var(--color-alioshaWhite)] hover:text-[var(--color-alioshaYellow)] transition-colors duration-200"
                onClick={() => {
                  setMenuOpen(false);
                  console.log(`${link.label} clicked`);
                }}
              >
                {link.label}
              </a>
            ))}
            {/* Language Switcher */}
            <div className="relative w-full flex flex-col items-center" ref={langRef}>
              <button
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-none text-[var(--color-alioshaWhite)] text-xl font-medium transition-all duration-300',
                  'hover:text-[var(--color-alioshaYellow)] hover:bg-[var(--color-alioshaWhite)]/5 focus:outline-none focus:ring-2 focus:ring-[var(--color-alioshaYellow)] cursor-pointer',
                  langOpen && 'bg-[var(--color-alioshaWhite)]/10 text-[var(--color-alioshaYellow)]'
                )}
                onClick={() => setLangOpen((v) => !v)}
              >
                {currentLang.code} <span className="text-[var(--color-alioshaGrayLight)]">|</span> {LANGUAGES.find(l => l.code !== currentLang.code)?.code}
                <svg className={cn('ml-2 w-4 h-4 transition-transform', langOpen && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
              </button>
              {langOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 rounded-none bg-[var(--color-alioshaBlack)]/95 shadow-lg ring-1 ring-[var(--color-alioshaYellow)]/30 backdrop-blur-xl z-20 animate-fade-in">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className={cn(
                        'block w-full text-left px-6 py-3 text-[var(--color-alioshaWhite)] hover:bg-[var(--color-alioshaYellow)]/20 hover:text-[var(--color-alioshaYellow)] transition-colors',
                        lang.code === currentLang.code && 'font-bold text-[var(--color-alioshaYellow)]'
                      )}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangOpen(false);
                        console.log(`Language switched to ${lang.code}`);
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Dark Mode Toggle */}
            <button
              className="flex items-center justify-center w-14 h-14 rounded-none bg-[var(--color-alioshaBlack)]/60 hover:bg-[var(--color-alioshaYellow)]/20 transition-all duration-300 border border-[var(--color-alioshaYellow)]/20 hover:border-[var(--color-alioshaYellow)] text-[var(--color-alioshaYellow)] shadow-md cursor-pointer"
              onClick={() => console.log('Dark mode toggle clicked')}
              aria-label="Toggle dark mode"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
} 