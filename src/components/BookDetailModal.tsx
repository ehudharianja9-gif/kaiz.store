import {
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock,
  Heart,
  Pencil,
  RotateCcw,
  X,
} from 'lucide-react';
import { useEffect } from 'react';
import { Book, LoanRecord } from '../types/library';
import { formatIndonesianDate, getDaysRemaining } from '../utils/storage';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  activeLoan?: LoanRecord;
  isFavorite: boolean;
  onClose: () => void;
  onBorrow: (bookId: string) => void;
  onReturn: (loanId: string) => void;
  onToggleFavorite: (bookId: string) => void;
  onOpenReader: (book: Book) => void;
  onEditBook: (book: Book) => void;
}

export function BookDetailModal({
  book,
  activeLoan,
  isFavorite,
  onClose,
  onBorrow,
  onReturn,
  onToggleFavorite,
  onOpenReader,
  onEditBook,
}: BookDetailModalProps) {
  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const isBorrowed = Boolean(activeLoan);
  const daysRemaining = activeLoan ? getDaysRemaining(activeLoan.dueAt) : null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-stone-950/55 p-3 sm:p-6 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-detail-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-stone-200 bg-stone-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Close Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-stone-50/95 px-5 py-3.5 backdrop-blur-xs sm:px-8">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
            <span>Detail Koleksi</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-800">{book.category}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail buku"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Left Cover Column */}
            <div className="md:col-span-4">
              <div className="mx-auto max-w-[240px] md:max-w-none">
                <BookCover
                  title={book.title}
                  author={book.author}
                  category={book.category}
                  coverTheme={book.coverTheme}
                  coverMotif={book.coverMotif}
                  size="lg"
                  className="shadow-md"
                />
              </div>

              {/* Availability Status Card */}
              <div className="mt-5 rounded-xl border border-stone-200 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  {isBorrowed ? (
                    <>
                      <Clock className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />
                      <span className="text-amber-800">Sedang Dipinjam</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-700 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-emerald-800">Tersedia di Rak</span>
                    </>
                  )}
                </div>

                {activeLoan ? (
                  <div className="mt-2 space-y-1 text-xs text-stone-600">
                    <p>
                      Dipinjam:{' '}
                      <span className="font-medium text-stone-800">
                        {formatIndonesianDate(activeLoan.borrowedAt)}
                      </span>
                    </p>
                    <p>
                      Tenggat:{' '}
                      <span className="font-semibold text-stone-900">
                        {formatIndonesianDate(activeLoan.dueAt)}
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5 pt-1 text-amber-800 font-medium">
                      <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="tabular-nums">
                        {daysRemaining !== null && daysRemaining >= 0
                          ? `Sisa waktu ${daysRemaining} hari`
                          : 'Melewati tenggat'}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
                    Masa peminjaman standar berlaku otomatis selama 7 hari kalender.
                  </p>
                )}
              </div>
            </div>

            {/* Right Metadata & Actions Column */}
            <div className="md:col-span-8 flex flex-col">
              <div>
                <h2
                  id="book-detail-title"
                  className="font-serif text-2xl font-bold leading-tight text-stone-900 sm:text-3xl"
                >
                  {book.title}
                </h2>
                <p className="mt-2 text-base font-medium text-stone-700">Oleh {book.author}</p>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {activeLoan ? (
                  <button
                    type="button"
                    onClick={() => onReturn(activeLoan.id)}
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-800 whitespace-nowrap"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>Kembalikan Buku</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onBorrow(book.id)}
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap"
                  >
                    <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    <span>Pinjam Buku (7 Hari)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onOpenReader(book)}
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-emerald-700/30 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 whitespace-nowrap"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>Baca Cuplikan</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(book.id)}
                  aria-pressed={isFavorite}
                  className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    isFavorite
                      ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{isFavorite ? 'Difavoritkan' : 'Favoritkan'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onEditBook(book)}
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 whitespace-nowrap"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Synopsis */}
              <div className="mt-7 border-t border-stone-200 pt-6">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                  Sinopsis Buku
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                  {book.synopsis}
                </p>
              </div>

              {/* Bibliographic Details Grid */}
              <div className="mt-6 border-t border-stone-200 pt-6">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-stone-500">
                  Informasi Bibliografi
                </h3>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                  <div className="border-b border-stone-200/70 pb-2">
                    <dt className="text-xs text-stone-500">Kategori</dt>
                    <dd className="mt-0.5 font-medium text-stone-900">{book.category}</dd>
                  </div>
                  <div className="border-b border-stone-200/70 pb-2">
                    <dt className="text-xs text-stone-500">Tahun Terbit</dt>
                    <dd className="mt-0.5 font-medium tabular-nums text-stone-900">{book.year}</dd>
                  </div>
                  <div className="border-b border-stone-200/70 pb-2">
                    <dt className="text-xs text-stone-500">Tebal Halaman</dt>
                    <dd className="mt-0.5 font-medium tabular-nums text-stone-900">
                      {book.pages} halaman
                    </dd>
                  </div>
                  <div className="border-b border-stone-200/70 pb-2 col-span-2 sm:col-span-1">
                    <dt className="text-xs text-stone-500">Penerbit</dt>
                    <dd className="mt-0.5 font-medium text-stone-900">{book.publisher}</dd>
                  </div>
                  <div className="border-b border-stone-200/70 pb-2 col-span-2">
                    <dt className="text-xs text-stone-500">ISBN</dt>
                    <dd className="mt-0.5 font-medium tabular-nums text-stone-900">{book.isbn}</dd>
                  </div>
                </dl>
              </div>

              {/* Chapter 1 Teaser */}
              <div className="mt-6 rounded-xl border border-stone-200 bg-white p-4">
                <p className="text-xs font-medium text-stone-500">Cuplikan Tersedia</p>
                <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-serif text-sm font-semibold text-stone-900">
                    {book.chapterOneTitle}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenReader(book)}
                    className="text-left text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline whitespace-nowrap"
                  >
                    Buka Mode Baca Layar Penuh →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
