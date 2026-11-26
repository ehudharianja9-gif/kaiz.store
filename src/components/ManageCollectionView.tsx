import { Check, Pencil, Plus, RotateCcw, Search, Trash2, X } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { COVER_MOTIFS, COVER_THEME_LIST } from '../data/initialBooks';
import {
  BOOK_CATEGORIES,
  Book,
  BookCategory,
  BookFormValues,
  CoverMotifId,
  CoverThemeId,
} from '../types/library';
import { BookCover } from './BookCover';

interface ManageCollectionViewProps {
  books: Book[];
  borrowedBookIds: Set<string>;
  editingBook: Book | null;
  onCancelEdit: () => void;
  onStartEdit: (book: Book) => void;
  onAddBook: (values: BookFormValues) => void;
  onUpdateBook: (bookId: string, values: BookFormValues) => void;
  onRequestDeleteBook: (book: Book) => void;
  onRequestReset: () => void;
}

const EMPTY_FORM: BookFormValues = {
  title: '',
  author: '',
  category: 'Sastra',
  year: String(new Date().getFullYear()),
  pages: '240',
  publisher: '',
  isbn: '',
  coverTheme: 'emerald',
  coverMotif: 'archipelago',
  synopsis: '',
  chapterOneTitle: 'Bab 1: ',
  chapterOneContent: '',
};

type FormErrors = Partial<Record<keyof BookFormValues, string>>;

function bookToFormValues(book: Book): BookFormValues {
  return {
    title: book.title,
    author: book.author,
    category: book.category,
    year: String(book.year),
    pages: String(book.pages),
    publisher: book.publisher,
    isbn: book.isbn,
    coverTheme: book.coverTheme,
    coverMotif: book.coverMotif,
    synopsis: book.synopsis,
    chapterOneTitle: book.chapterOneTitle,
    chapterOneContent: book.chapterOneContent,
  };
}

export function ManageCollectionView({
  books,
  borrowedBookIds,
  editingBook,
  onCancelEdit,
  onStartEdit,
  onAddBook,
  onUpdateBook,
  onRequestDeleteBook,
  onRequestReset,
}: ManageCollectionViewProps) {
  const [formValues, setFormValues] = useState<BookFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [listSearch, setListSearch] = useState('');

  useEffect(() => {
    if (editingBook) {
      setFormValues(bookToFormValues(editingBook));
      setErrors({});
    }
  }, [editingBook]);

  const validate = (values: BookFormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    const currentYear = new Date().getFullYear() + 1;
    const yearNum = Number(values.year);
    const pagesNum = Number(values.pages);

    if (values.title.trim().length < 3) {
      nextErrors.title = 'Judul buku minimal 3 karakter.';
    }
    if (values.author.trim().length < 3) {
      nextErrors.author = 'Nama penulis minimal 3 karakter.';
    }
    if (!Number.isInteger(yearNum) || yearNum < 1900 || yearNum > currentYear) {
      nextErrors.year = `Tahun terbit harus antara 1900 dan ${currentYear}.`;
    }
    if (!Number.isInteger(pagesNum) || pagesNum < 10 || pagesNum > 5000) {
      nextErrors.pages = 'Jumlah halaman harus antara 10 hingga 5000.';
    }
    if (values.publisher.trim().length < 2) {
      nextErrors.publisher = 'Nama penerbit wajib diisi.';
    }
    if (values.isbn.trim().length < 6) {
      nextErrors.isbn = 'Nomor ISBN minimal 6 karakter.';
    }
    if (values.synopsis.trim().length < 20) {
      nextErrors.synopsis = 'Sinopsis minimal 20 karakter agar informatif.';
    }
    if (values.chapterOneTitle.trim().length < 4) {
      nextErrors.chapterOneTitle = 'Judul bab pertama minimal 4 karakter.';
    }
    if (values.chapterOneContent.trim().length < 40) {
      nextErrors.chapterOneContent = 'Konten cuplikan Bab 1 minimal 40 karakter.';
    }

    return nextErrors;
  };

  const handleFieldChange = <K extends keyof BookFormValues>(
    field: K,
    value: BookFormValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingBook) {
      onUpdateBook(editingBook.id, formValues);
      onCancelEdit();
      setFormValues(EMPTY_FORM);
    } else {
      onAddBook(formValues);
      setFormValues(EMPTY_FORM);
    }
    setErrors({});
  };

  const handleResetForm = () => {
    setFormValues(EMPTY_FORM);
    setErrors({});
    if (editingBook) {
      onCancelEdit();
    }
  };

  const filteredCollection = useMemo(() => {
    const q = listSearch.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q)
    );
  }, [books, listSearch]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <section className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-700">
            Administrasi Pustaka
          </p>
          <h1 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-stone-900">
            Kelola Koleksi Buku
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Tambahkan buku baru, perbarui detail bibliografi, sesuaikan warna sampul SVG, atau
            hapus koleksi yang tidak lagi aktif.
          </p>
        </div>

        <button
          type="button"
          onClick={onRequestReset}
          className="inline-flex min-h-[40px] items-center justify-center gap-2 self-start rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-100 whitespace-nowrap shrink-0 sm:self-end"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset Data Awal</span>
        </button>
      </section>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        {/* Left: Validated Book Form */}
        <section className="xl:col-span-6" aria-label="Formulir tambah atau edit buku">
          <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-stone-900">
                  {editingBook ? 'Edit Data Buku' : 'Tambah Buku Baru'}
                </h2>
                <p className="mt-0.5 text-xs text-stone-500">
                  {editingBook
                    ? `Menyunting "${editingBook.title}"`
                    : 'Semua kolom bertanda wajib diisi tervalidasi sebelum disimpan.'}
                </p>
              </div>
              {editingBook && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Batal Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-5">
              {/* Live Cover Preview + Theme Selector */}
              <div className="flex flex-col gap-5 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:items-center">
                <div className="w-28 shrink-0 self-center sm:self-start">
                  <BookCover
                    title={formValues.title.trim() || 'Judul Buku Baru'}
                    author={formValues.author.trim() || 'Nama Penulis'}
                    category={formValues.category}
                    coverTheme={formValues.coverTheme}
                    coverMotif={formValues.coverMotif}
                    size="sm"
                    className="shadow-md"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <span className="block text-xs font-semibold text-stone-700">
                      Warna Sampul Gradien
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {COVER_THEME_LIST.map((theme) => {
                        const selected = formValues.coverTheme === theme.id;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => handleFieldChange('coverTheme', theme.id as CoverThemeId)}
                            title={theme.label}
                            aria-label={`Pilih warna sampul ${theme.label}`}
                            aria-pressed={selected}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform ${
                              selected
                                ? 'scale-110 border-stone-900 ring-2 ring-emerald-700/30'
                                : 'border-white shadow-xs hover:scale-105'
                            }`}
                            style={{
                              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                            }}
                          >
                            {selected && <Check className="h-3.5 w-3.5 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="book-motif"
                      className="block text-xs font-semibold text-stone-700"
                    >
                      Motif Ilustrasi SVG
                    </label>
                    <select
                      id="book-motif"
                      value={formValues.coverMotif}
                      onChange={(e) =>
                        handleFieldChange('coverMotif', e.target.value as CoverMotifId)
                      }
                      className="mt-1.5 w-full min-h-[38px] rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 focus:border-emerald-700 focus:outline-none"
                    >
                      {COVER_MOTIFS.map((motif) => (
                        <option key={motif.id} value={motif.id}>
                          {motif.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Title & Author */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="book-title" className="block text-xs font-semibold text-stone-700">
                    Judul Buku *
                  </label>
                  <input
                    id="book-title"
                    type="text"
                    value={formValues.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    aria-invalid={Boolean(errors.title)}
                    placeholder="Contoh: Jejak Langkah di Kota Tua"
                    className="mt-1.5 w-full min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/15"
                  />
                  {errors.title && (
                    <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="book-author" className="block text-xs font-semibold text-stone-700">
                    Penulis *
                  </label>
                  <input
                    id="book-author"
                    type="text"
                    value={formValues.author}
                    onChange={(e) => handleFieldChange('author', e.target.value)}
                    aria-invalid={Boolean(errors.author)}
                    placeholder="Contoh: Pramoedya Kusuma"
                    className="mt-1.5 w-full min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/15"
                  />
                  {errors.author && (
                    <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                      {errors.author}
                    </p>
                  )}
                </div>
              </div>

              {/* Category, Year, Pages */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="book-category"
                    className="block text-xs font-semibold text-stone-700"
                  >
                    Kategori *
                  </label>
                  <select
                    id="book-category"
                    value={formValues.category}
                    onChange={(e) =>
                      handleFieldChange('category', e.target.value as BookCategory)
                    }
                    className="mt-1.5 w-full min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-emerald-700 focus:outline-none"
                  >
                    {BOOK_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="book-year" className="block text-xs font-semibold text-stone-700">
                    Tahun Terbit *
                  </label>
                  <input
                    id="book-year"
                    type="number"
                    value={formValues.year}
                    onChange={(e) => handleFieldChange('year', e.target.value)}
                    aria-invalid={Boolean(errors.year)}
                    className="mt-1.5 w-full min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm tabular-nums text-stone-900 focus:border-emerald-700 focus:outline-none"
                  />
                  {errors.year && (
                    <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                      {errors.year}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="book-pages" className="block text-xs font-semibold text-stone-700">
                    Jumlah Halaman *
                  </label>
                  <input
                    id="book-pages"
                    type="number"
                    value={formValues.pages}
                    onChange={(e) => handleFieldChange('pages', e.target.value)}
                    aria-invalid={Boolean(errors.pages)}
                    className="mt-1.5 w-full min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm tabular-nums text-stone-900 focus:border-emerald-700 focus:outline-none"
                  />
                  {errors.pages && (
                    <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                      {errors.pages}
                    </p>
                  )}
                </div>
              </div>

              {/* Publisher & ISBN */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="book-publisher"
                    className="block text-xs font-semibold text-stone-700"
                  >
                    Penerbit *
                  </label>
                  <input
                    id="book-publisher"
                    type="text"
                    value={formValues.publisher}
                    onChange={(e) => handleFieldChange('publisher', e.target.value)}
                    aria-invalid={Boolean(errors.publisher)}
                    placeholder="Contoh: Balai Pustaka Aksara"
                    className="mt-1.5 w-full min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-emerald-700 focus:outline-none"
                  />
                  {errors.publisher && (
                    <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                      {errors.publisher}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="book-isbn" className="block text-xs font-semibold text-stone-700">
                    Nomor ISBN *
                  </label>
                  <input
                    id="book-isbn"
                    type="text"
                    value={formValues.isbn}
                    onChange={(e) => handleFieldChange('isbn', e.target.value)}
                    aria-invalid={Boolean(errors.isbn)}
                    placeholder="978-602-411-000-0"
                    className="mt-1.5 w-full min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm tabular-nums text-stone-900 focus:border-emerald-700 focus:outline-none"
                  />
                  {errors.isbn && (
                    <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                      {errors.isbn}
                    </p>
                  )}
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <label htmlFor="book-synopsis" className="block text-xs font-semibold text-stone-700">
                  Sinopsis Singkat *
                </label>
                <textarea
                  id="book-synopsis"
                  rows={3}
                  value={formValues.synopsis}
                  onChange={(e) => handleFieldChange('synopsis', e.target.value)}
                  aria-invalid={Boolean(errors.synopsis)}
                  placeholder="Ringkasan isi buku, tema utama, dan latar cerita..."
                  className="mt-1.5 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm leading-relaxed text-stone-900 focus:border-emerald-700 focus:outline-none"
                />
                {errors.synopsis && (
                  <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                    {errors.synopsis}
                  </p>
                )}
              </div>

              {/* Chapter 1 Title & Content */}
              <div>
                <label
                  htmlFor="book-ch1-title"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Judul Bab 1 *
                </label>
                <input
                  id="book-ch1-title"
                  type="text"
                  value={formValues.chapterOneTitle}
                  onChange={(e) => handleFieldChange('chapterOneTitle', e.target.value)}
                  aria-invalid={Boolean(errors.chapterOneTitle)}
                  placeholder="Bab 1: Pagi di Pelabuhan"
                  className="mt-1.5 w-full min-h-[40px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-emerald-700 focus:outline-none"
                />
                {errors.chapterOneTitle && (
                  <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                    {errors.chapterOneTitle}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="book-ch1-content"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Konten Cuplikan Bab 1 *
                </label>
                <textarea
                  id="book-ch1-content"
                  rows={5}
                  value={formValues.chapterOneContent}
                  onChange={(e) => handleFieldChange('chapterOneContent', e.target.value)}
                  aria-invalid={Boolean(errors.chapterOneContent)}
                  placeholder="Tuliskan paragraf pembuka bab pertama. Pisahkan antarparagraf dengan baris kosong..."
                  className="mt-1.5 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm leading-relaxed text-stone-900 focus:border-emerald-700 focus:outline-none"
                />
                {errors.chapterOneContent && (
                  <p role="alert" className="mt-1 text-xs font-medium text-rose-700">
                    {errors.chapterOneContent}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-50"
                >
                  {editingBook ? 'Batalkan' : 'Kosongkan Form'}
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>{editingBook ? 'Simpan Perubahan' : 'Tambahkan ke Katalog'}</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Right: Managed Books List */}
        <section className="xl:col-span-6 space-y-4" aria-label="Daftar koleksi untuk dikelola">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-serif text-xl font-semibold text-stone-900">
              Daftar Buku Terdaftar{' '}
              <span className="font-sans text-sm font-normal tabular-nums text-stone-500">
                ({books.length})
              </span>
            </h2>
            <div className="relative sm:w-64">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
                placeholder="Saring daftar buku..."
                aria-label="Saring daftar buku terkelola"
                className="w-full min-h-[38px] rounded-lg border border-stone-200 bg-white py-1.5 pr-3 pl-9 text-xs text-stone-900 focus:border-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
            {filteredCollection.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-stone-500">
                Tidak ada buku yang cocok dengan saringan tersebut.
              </div>
            ) : (
              filteredCollection.map((book) => {
                const isBorrowed = borrowedBookIds.has(book.id);
                const isEditing = editingBook?.id === book.id;

                return (
                  <div
                    key={book.id}
                    className={`flex items-center justify-between gap-4 p-4 transition-colors ${
                      isEditing ? 'bg-emerald-50/60' : 'hover:bg-stone-50/80'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="w-11 shrink-0">
                        <BookCover
                          title={book.title}
                          author={book.author}
                          category={book.category}
                          coverTheme={book.coverTheme}
                          coverMotif={book.coverMotif}
                          size="sm"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-sm font-semibold text-stone-900">
                          {book.title}
                        </h3>
                        <p className="truncate text-xs text-stone-600">{book.author}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-stone-500">
                          <span>{book.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{book.year}</span>
                          <span aria-hidden="true">·</span>
                          <span className={isBorrowed ? 'font-medium text-amber-800' : 'text-emerald-700'}>
                            {isBorrowed ? 'Dipinjam' : 'Tersedia'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onStartEdit(book)}
                        aria-label={`Edit buku ${book.title}`}
                        className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100"
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onRequestDeleteBook(book)}
                        aria-label={`Hapus buku ${book.title}`}
                        className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-700 transition-colors hover:border-rose-200 hover:bg-rose-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">Hapus</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
