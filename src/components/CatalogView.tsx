import { RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  AvailabilityFilter,
  BOOK_CATEGORIES,
  Book,
  BookCategory,
} from '../types/library';
import { BookCard } from './BookCard';

interface CatalogViewProps {
  books: Book[];
  borrowedBookIds: Set<string>;
  favoriteIds: Set<string>;
  onOpenDetail: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onToggleFavorite: (bookId: string) => void;
  onRequestReset: () => void;
}

type SortOption = 'terbaru' | 'judul-asc' | 'tahun-desc';

export function CatalogView({
  books,
  borrowedBookIds,
  favoriteIds,
  onOpenDetail,
  onOpenReader,
  onToggleFavorite,
  onRequestReset,
}: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | BookCategory>('Semua');
  const [statusFilter, setStatusFilter] = useState<AvailabilityFilter>('semua');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');

  const stats = useMemo(() => {
    const total = books.length;
    const borrowed = books.filter((b) => borrowedBookIds.has(b.id)).length;
    const available = total - borrowed;
    const favorites = books.filter((b) => favoriteIds.has(b.id)).length;
    return { total, available, borrowed, favorites };
  }, [books, borrowedBookIds, favoriteIds]);

  const availableCategories = useMemo(() => {
    const present = new Set(books.map((b) => b.category));
    return BOOK_CATEGORIES.filter((cat) => present.has(cat));
  }, [books]);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = books.filter((book) => {
      const isBorrowed = borrowedBookIds.has(book.id);

      if (selectedCategory !== 'Semua' && book.category !== selectedCategory) {
        return false;
      }

      if (statusFilter === 'tersedia' && isBorrowed) return false;
      if (statusFilter === 'dipinjam' && !isBorrowed) return false;

      if (!q) return true;

      return (
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q) ||
        book.publisher.toLowerCase().includes(q) ||
        book.isbn.toLowerCase().includes(q)
      );
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'judul-asc') {
        return a.title.localeCompare(b.title, 'id-ID');
      }
      if (sortBy === 'tahun-desc') {
        return b.year - a.year;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [books, borrowedBookIds, searchQuery, selectedCategory, statusFilter, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'Semua' || statusFilter !== 'semua';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setStatusFilter('semua');
    setSortBy('terbaru');
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header & Reset Action */}
      <section className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-700">
            Katalog Perpustakaan Digital
          </p>
          <h1 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Jelajahi Koleksi Bacaan Pilihan
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-base">
            Temukan buku sastra, sejarah, sains, hingga teknologi. Pinjam otomatis selama 7 hari
            atau baca cuplikan bab pertama langsung di layar penuh.
          </p>
        </div>

        <button
          type="button"
          onClick={onRequestReset}
          className="inline-flex min-h-[40px] items-center justify-center gap-2 self-start rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-100 whitespace-nowrap shrink-0 sm:self-end"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset Data Awal</span>
        </button>
      </section>

      {/* Collection Statistics Row */}
      <section aria-label="Statistik koleksi perpustakaan">
        <div className="grid grid-cols-2 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-stone-500">Total Koleksi</p>
            <p className="mt-1.5 font-serif text-2xl font-bold tabular-nums text-stone-900">
              {stats.total} <span className="font-sans text-sm font-normal text-stone-500">buku</span>
            </p>
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-stone-500">Tersedia di Rak</p>
            <p className="mt-1.5 font-serif text-2xl font-bold tabular-nums text-emerald-700">
              {stats.available} <span className="font-sans text-sm font-normal text-stone-500">buku</span>
            </p>
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-stone-500">Sedang Dipinjam</p>
            <p className="mt-1.5 font-serif text-2xl font-bold tabular-nums text-amber-700">
              {stats.borrowed} <span className="font-sans text-sm font-normal text-stone-500">buku</span>
            </p>
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-stone-500">Ditandai Favorit</p>
            <p className="mt-1.5 font-serif text-2xl font-bold tabular-nums text-stone-900">
              {stats.favorites} <span className="font-sans text-sm font-normal text-stone-500">buku</span>
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section aria-label="Pencarian dan filter katalog" className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Real-time Search */}
          <div className="relative flex-1 lg:max-w-md">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul buku, penulis, penerbit, atau ISBN..."
              aria-label="Cari buku di katalog"
              className="w-full min-h-[42px] rounded-lg border border-stone-200 bg-white py-2 pr-10 pl-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/15"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus kata kunci pencarian"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Availability Segmented Control + Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-1 rounded-lg bg-stone-200/70 p-1"
              role="group"
              aria-label="Filter status ketersediaan"
            >
              {(
                [
                  { id: 'semua', label: 'Semua' },
                  { id: 'tersedia', label: 'Tersedia' },
                  { id: 'dipinjam', label: 'Dipinjam' },
                ] as { id: AvailabilityFilter; label: string }[]
              ).map((tab) => {
                const active = statusFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    aria-pressed={active}
                    className={`min-h-[34px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-stone-400" aria-hidden="true" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Urutkan katalog"
                className="min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 focus:border-emerald-700 focus:outline-none"
              >
                <option value="terbaru">Urutkan: Terbaru</option>
                <option value="judul-asc">Urutkan: Judul A–Z</option>
                <option value="tahun-desc">Urutkan: Tahun Terbit</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter kategori buku"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory('Semua')}
            aria-pressed={selectedCategory === 'Semua'}
            className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'Semua'
                ? 'bg-emerald-700 text-white font-semibold'
                : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
            }`}
          >
            Semua Kategori
          </button>
          {availableCategories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={active}
                className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Result Count & Book Grid */}
      <section aria-label="Daftar buku katalog">
        <div className="mb-4 flex items-center justify-between text-xs text-stone-500">
          <p className="tabular-nums">
            Menampilkan <span className="font-semibold text-stone-800">{filteredBooks.length}</span>{' '}
            dari {books.length} koleksi buku
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Atur ulang filter
            </button>
          )}
        </div>

        {filteredBooks.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center">
            <p className="font-serif text-lg font-semibold text-stone-900">
              Tidak ada buku yang cocok dengan pencarian Anda
            </p>
            <p className="mt-1.5 text-sm text-stone-600">
              Coba ubah kata kunci pencarian, kategori, atau filter status ketersediaan.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex min-h-[40px] items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Tampilkan Semua Buku
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
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
      </section>
    </div>
  );
}
