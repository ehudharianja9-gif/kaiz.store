import { Book } from '../types/library';
import { BookCard } from './BookCard';

interface FavoritesViewProps {
  favoriteBooks: Book[];
  borrowedBookIds: Set<string>;
  favoriteIds: Set<string>;
  onOpenDetail: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onToggleFavorite: (bookId: string) => void;
  onBrowseCatalog: () => void;
}

export function FavoritesView({
  favoriteBooks,
  borrowedBookIds,
  favoriteIds,
  onOpenDetail,
  onOpenReader,
  onToggleFavorite,
  onBrowseCatalog,
}: FavoritesViewProps) {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-2 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-700">
            Kurasi Pribadi
          </p>
          <h1 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-stone-900">
            Buku Favorit Saya
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Simpan buku pilihan Anda untuk akses cepat saat ingin meminjam atau membaca ulang
            cuplikannya.
          </p>
        </div>

        <p className="text-xs font-medium tabular-nums text-stone-500">
          Total <span className="font-semibold text-stone-900">{favoriteBooks.length}</span> buku
          tersimpan
        </p>
      </section>

      {favoriteBooks.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center">
          <p className="font-serif text-xl font-semibold text-stone-900">
            Daftar favorit Anda masih kosong
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
            Ketuk ikon hati pada kartu atau halaman detail buku di katalog untuk menyimpannya ke
            rak favorit ini.
          </p>
          <button
            type="button"
            onClick={onBrowseCatalog}
            className="mt-6 inline-flex min-h-[42px] items-center justify-center rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            Jelajahi Katalog Buku
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isBorrowed={borrowedBookIds.has(book.id)}
              isFavorite={favoriteIds.has(book.id)}
              onOpenDetail={onOpenDetail}
              onOpenReader={onOpenReader}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
