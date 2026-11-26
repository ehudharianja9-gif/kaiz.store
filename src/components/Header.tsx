import { Menu, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { NavTab } from '../types/library';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onQuickAddBook: () => void;
  activeLoanCount: number;
  favoriteCount: number;
}

const NAV_ITEMS: { id: NavTab; label: string }[] = [
  { id: 'katalog', label: 'Beranda' },
  { id: 'pinjaman', label: 'Pinjaman Saya' },
  { id: 'kelola', label: 'Kelola Koleksi' },
  { id: 'favorit', label: 'Favorit' },
];

export function Header({
  activeTab,
  onSelectTab,
  onQuickAddBook,
  activeLoanCount,
  favoriteCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const getCountSuffix = (id: NavTab): string | null => {
    if (id === 'pinjaman' && activeLoanCount > 0) return ` (${activeLoanCount})`;
    if (id === 'favorit' && favoriteCount > 0) return ` (${favoriteCount})`;
    return null;
  };

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-stone-50/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('katalog')}
          className="font-serif text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          Kaizen Library
        </button>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const countSuffix = getCountSuffix(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                  isActive
                    ? 'font-semibold text-emerald-700'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>
                  {item.label}
                  {countSuffix && (
                    <span className="tabular-nums text-stone-500 font-normal">{countSuffix}</span>
                  )}
                </span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-700"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onQuickAddBook();
            }}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Tambah Buku</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 transition-colors hover:bg-stone-100 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="border-t border-stone-200 bg-white px-4 py-2 md:hidden"
        >
          <div className="flex flex-col divide-y divide-stone-100">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const countSuffix = getCountSuffix(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between py-2.5 text-left text-sm transition-colors ${
                    isActive ? 'font-semibold text-emerald-700' : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {countSuffix && (
                    <span className="tabular-nums text-xs text-stone-500">
                      {countSuffix.replace(/[() ]/g, '')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
