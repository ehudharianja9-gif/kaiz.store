import { ArrowLeft, BookOpen, Minus, Moon, Plus, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  Book,
  ReaderFontSize,
  ReaderPreferences,
  ReaderTheme,
} from '../types/library';

interface ReaderModalProps {
  book: Book | null;
  preferences: ReaderPreferences;
  onUpdatePreferences: (partial: Partial<ReaderPreferences>) => void;
  onClose: () => void;
}

const FONT_SIZE_ORDER: ReaderFontSize[] = ['kecil', 'sedang', 'besar', 'ekstra'];

const FONT_SIZE_CONFIG: Record<
  ReaderFontSize,
  { label: string; textClass: string }
> = {
  kecil: { label: 'Kecil', textClass: 'text-[15px] leading-[1.75]' },
  sedang: { label: 'Sedang', textClass: 'text-[17px] leading-[1.85]' },
  besar: { label: 'Besar', textClass: 'text-[19px] leading-[1.85]' },
  ekstra: { label: 'Ekstra', textClass: 'text-[22px] leading-[1.9]' },
};

const THEME_CONFIG: Record<
  ReaderTheme,
  {
    label: string;
    container: string;
    header: string;
    title: string;
    muted: string;
    prose: string;
    divider: string;
    controlSurface: string;
    controlActive: string;
    progressTrack: string;
    progressBar: string;
  }
> = {
  terang: {
    label: 'Terang',
    container: 'bg-stone-50 text-stone-900',
    header: 'bg-stone-50/95 border-stone-200 text-stone-900',
    title: 'text-stone-900',
    muted: 'text-stone-500',
    prose: 'text-stone-800',
    divider: 'border-stone-200',
    controlSurface: 'bg-stone-200/70 text-stone-700',
    controlActive: 'bg-white text-stone-900 shadow-xs',
    progressTrack: 'bg-stone-200',
    progressBar: 'bg-emerald-700',
  },
  sepia: {
    label: 'Sepia',
    container: 'bg-[#f4ecd8] text-[#3e2f1c]',
    header: 'bg-[#f4ecd8]/95 border-[#dfd2b5] text-[#3e2f1c]',
    title: 'text-[#2d2112]',
    muted: 'text-[#745e43]',
    prose: 'text-[#3e2f1c]',
    divider: 'border-[#dfd2b5]',
    controlSurface: 'bg-[#e7dbc0] text-[#5c4932]',
    controlActive: 'bg-[#fcf8ee] text-[#2d2112] shadow-xs',
    progressTrack: 'bg-[#e2d4b7]',
    progressBar: 'bg-[#854d0e]',
  },
  gelap: {
    label: 'Gelap',
    container: 'bg-zinc-950 text-zinc-200',
    header: 'bg-zinc-950/95 border-zinc-800 text-zinc-100',
    title: 'text-zinc-100',
    muted: 'text-zinc-400',
    prose: 'text-zinc-200 tracking-[0.01em]',
    divider: 'border-zinc-800',
    controlSurface: 'bg-zinc-900 text-zinc-400 border border-zinc-800',
    controlActive: 'bg-zinc-800 text-zinc-100',
    progressTrack: 'bg-zinc-800',
    progressBar: 'bg-emerald-500',
  },
};

export function ReaderModal({
  book,
  preferences,
  onUpdatePreferences,
  onClose,
}: ReaderModalProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!book) return;
    setScrollProgress(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const theme = THEME_CONFIG[preferences.theme];
  const fontCfg = FONT_SIZE_CONFIG[preferences.fontSize];
  const currentSizeIndex = FONT_SIZE_ORDER.indexOf(preferences.fontSize);

  const paragraphs = book.chapterOneContent
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    const pct = Math.min(100, Math.max(0, Math.round((el.scrollTop / maxScroll) * 100)));
    setScrollProgress(pct);
  };

  const decreaseFont = () => {
    if (currentSizeIndex > 0) {
      onUpdatePreferences({ fontSize: FONT_SIZE_ORDER[currentSizeIndex - 1] });
    }
  };

  const increaseFont = () => {
    if (currentSizeIndex < FONT_SIZE_ORDER.length - 1) {
      onUpdatePreferences({ fontSize: FONT_SIZE_ORDER[currentSizeIndex + 1] });
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-chapter-title"
      className={`fixed inset-0 z-50 overflow-y-auto transition-colors duration-200 ${theme.container}`}
    >
      {/* Minimal Sticky Reader Toolbar */}
      <header className={`sticky top-0 z-20 border-b backdrop-blur-sm ${theme.header}`}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-current/15 px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80 whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Tutup Baca</span>
            </button>

            <div className="min-w-0 hidden sm:block">
              <p className={`truncate font-serif text-sm font-semibold ${theme.title}`}>
                {book.title}
              </p>
              <p className={`truncate text-xs ${theme.muted}`}>{book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font Size Stepper */}
            <div
              className={`inline-flex items-center rounded-lg p-1 ${theme.controlSurface}`}
              role="group"
              aria-label="Pengaturan ukuran huruf"
            >
              <button
                type="button"
                onClick={decreaseFont}
                disabled={currentSizeIndex === 0}
                aria-label="Perkecil ukuran huruf"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-opacity hover:opacity-80 disabled:opacity-35"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="px-2 text-xs font-semibold whitespace-nowrap">
                {fontCfg.label}
              </span>
              <button
                type="button"
                onClick={increaseFont}
                disabled={currentSizeIndex === FONT_SIZE_ORDER.length - 1}
                aria-label="Perbesar ukuran huruf"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-opacity hover:opacity-80 disabled:opacity-35"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Theme Switcher: Terang, Sepia, Gelap */}
            <div
              className={`inline-flex items-center gap-1 rounded-lg p-1 ${theme.controlSurface}`}
              role="group"
              aria-label="Tema tampilan baca"
            >
              <button
                type="button"
                onClick={() => onUpdatePreferences({ theme: 'terang' })}
                aria-pressed={preferences.theme === 'terang'}
                className={`inline-flex min-h-[32px] items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  preferences.theme === 'terang' ? theme.controlActive : 'hover:opacity-80'
                }`}
              >
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Terang</span>
              </button>
              <button
                type="button"
                onClick={() => onUpdatePreferences({ theme: 'sepia' })}
                aria-pressed={preferences.theme === 'sepia'}
                className={`inline-flex min-h-[32px] items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  preferences.theme === 'sepia' ? theme.controlActive : 'hover:opacity-80'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Sepia</span>
              </button>
              <button
                type="button"
                onClick={() => onUpdatePreferences({ theme: 'gelap' })}
                aria-pressed={preferences.theme === 'gelap'}
                className={`inline-flex min-h-[32px] items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  preferences.theme === 'gelap' ? theme.controlActive : 'hover:opacity-80'
                }`}
              >
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Gelap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reading Depth Progress Hairline */}
        <div className={`h-0.5 w-full ${theme.progressTrack}`}>
          <div
            className={`h-full transition-all duration-150 ${theme.progressBar}`}
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Reading Column */}
      <main className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-16">
        <div className={`border-b pb-8 ${theme.divider}`}>
          <p className={`text-xs font-semibold tracking-widest uppercase ${theme.muted}`}>
            Cuplikan Resmi · {book.category} · {book.year}
          </p>
          <h1
            id="reader-chapter-title"
            className={`mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl ${theme.title}`}
          >
            {book.chapterOneTitle}
          </h1>
          <p className={`mt-3 text-sm ${theme.muted}`}>
            Dari buku <span className="font-semibold">{book.title}</span> oleh {book.author}
          </p>
        </div>

        <article className={`mt-8 space-y-6 font-serif ${fontCfg.textClass} ${theme.prose}`}>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-none'
                  : undefined
              }
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* Chapter End Footer */}
        <footer className={`mt-14 border-t pt-8 text-center ${theme.divider}`}>
          <p className={`text-xs font-medium tracking-wide uppercase ${theme.muted}`}>
            Akhir Cuplikan Bab Pertama
          </p>
          <p className={`mt-2 font-serif text-base ${theme.prose}`}>
            Ingin melanjutkan membaca keseluruhan {book.pages} halaman buku ini?
          </p>
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Kembali ke Detail Buku
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
