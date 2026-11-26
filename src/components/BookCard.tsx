import { BookOpen, CheckCircle2, Clock, Heart } from 'lucide-react';
import { Book } from '../types/library';
import { BookCover } from './BookCover';

interface BookCardProps {
  book: Book;
  isBorrowed: boolean;
  isFavorite: boolean;
  onOpenDetail: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onToggleFavorite: (bookId: string) => void;
}

export function BookCard({
  book,
  isBorrowed,
  isFavorite,
  onOpenDetail,
  onOpenReader,
  onToggleFavorite,
}: BookCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-stone-200 bg-white p-4 transition-colors duration-150 hover:border-stone-300">
      {/* Cover Container */}
      <div className="relative mb-4">
        <button
          type="button"
          onClick={() => onOpenDetail(book)}
          className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded-r-lg"
          aria-label={`Lihat detail buku ${book.title}`}
        >
          <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
            <BookCover
              title={book.title}
              author={book.author}
              category={book.category}
              coverTheme={book.coverTheme}
              coverMotif={book.coverMotif}
              size="md"
            />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onToggleFavorite(book.id)}
          aria-label={
            isFavorite ? `Hapus ${book.title} dari favorit` : `Simpan ${book.title} ke favorit`
          }
          aria-pressed={isFavorite}
          className={`absolute top-2.5 right-2.5 inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
            isFavorite
              ? 'border-rose-200 bg-white/95 text-rose-600 shadow-xs hover:bg-rose-50'
              : 'border-white/25 bg-stone-950/35 text-white backdrop-blur-xs hover:bg-stone-950/55'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
        </button>
      </div>

      {/* Unboxed Metadata (Zero-Pill Rule) */}
      <div className="flex items-center gap-1.5 text-xs text-stone-500">
        <span className="font-medium text-stone-700">{book.category}</span>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">{book.year}</span>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">{book.pages} hlm</span>
      </div>

      {/* Title & Author */}
      <h3 className="mt-1.5 font-serif text-base font-semibold leading-snug text-stone-900 line-clamp-2">
        <button
          type="button"
          onClick={() => onOpenDetail(book)}
          className="text-left hover:text-emerald-700 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700"
        >
          {book.title}
        </button>
      </h3>
      <p className="mt-1 text-sm text-stone-600 truncate">{book.author}</p>

      {/* Availability Status (Explicit Icon + Label, not color alone) */}
      <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
        {isBorrowed ? (
          <>
            <Clock className="h-3.5 w-3.5 text-amber-700 shrink-0" aria-hidden="true" />
            <span className="text-amber-800">Sedang Dipinjam</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
            <span className="text-emerald-800">Tersedia untuk Dipinjam</span>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto pt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenDetail(book)}
          className="flex-1 inline-flex min-h-[40px] items-center justify-center rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-800 transition-colors hover:bg-stone-100 whitespace-nowrap"
        >
          Detail Buku
        </button>
        <button
          type="button"
          onClick={() => onOpenReader(book)}
          aria-label={`Baca cuplikan ${book.title}`}
          className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap shrink-0"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Baca</span>
        </button>
      </div>
    </article>
  );
}
