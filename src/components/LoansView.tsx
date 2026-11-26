import {
  BookOpen,
  CalendarClock,
  CheckCircle2,
  History,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Book, LoanRecord } from '../types/library';
import { formatIndonesianDate, getDaysRemaining } from '../utils/storage';
import { BookCover } from './BookCover';

interface LoansViewProps {
  books: Book[];
  activeLoans: LoanRecord[];
  loanHistory: LoanRecord[];
  onReturnBook: (loanId: string) => void;
  onOpenDetail: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onClearHistory: () => void;
  onBrowseCatalog: () => void;
}

type LoanSubTab = 'aktif' | 'riwayat';

export function LoansView({
  books,
  activeLoans,
  loanHistory,
  onReturnBook,
  onOpenDetail,
  onOpenReader,
  onClearHistory,
  onBrowseCatalog,
}: LoansViewProps) {
  const [subTab, setSubTab] = useState<LoanSubTab>('aktif');

  const findBook = (bookId: string): Book | undefined =>
    books.find((item) => item.id === bookId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-700">
            Sirkulasi Pribadi
          </p>
          <h1 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-stone-900">
            Rak Pinjaman Saya
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Pantau buku yang sedang Anda pinjam beserta tenggat pengembalian otomatis 7 hari dan
            riwayat bacaan terdahulu.
          </p>
        </div>

        {/* Sub-tabs */}
        <div
          className="inline-flex items-center gap-1 self-start rounded-lg bg-stone-200/75 p-1 sm:self-end"
          role="tablist"
          aria-label="Tab rak pinjaman"
        >
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'aktif'}
            onClick={() => setSubTab('aktif')}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              subTab === 'aktif'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Pinjaman Aktif</span>
            <span className="tabular-nums text-stone-500">({activeLoans.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'riwayat'}
            onClick={() => setSubTab('riwayat')}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              subTab === 'riwayat'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <History className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Riwayat</span>
            <span className="tabular-nums text-stone-500">({loanHistory.length})</span>
          </button>
        </div>
      </section>

      {/* Active Loans Panel */}
      {subTab === 'aktif' && (
        <section aria-label="Daftar pinjaman aktif">
          {activeLoans.length === 0 ? (
            <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center">
              <p className="font-serif text-xl font-semibold text-stone-900">
                Belum ada buku yang sedang dipinjam
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
                Pilih buku dari katalog untuk meminjam selama 7 hari secara otomatis dan mulai
                membaca kapan saja.
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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {activeLoans.map((loan) => {
                const book = findBook(loan.bookId);
                const daysLeft = getDaysRemaining(loan.dueAt);
                const isOverdue = daysLeft < 0;

                return (
                  <article
                    key={loan.id}
                    className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center"
                  >
                    {book && (
                      <button
                        type="button"
                        onClick={() => onOpenDetail(book)}
                        className="w-20 shrink-0 self-start focus-visible:outline-2 focus-visible:outline-emerald-700 rounded-r-lg"
                        aria-label={`Lihat detail ${book.title}`}
                      >
                        <BookCover
                          title={book.title}
                          author={book.author}
                          category={book.category}
                          coverTheme={book.coverTheme}
                          coverMotif={book.coverMotif}
                          size="sm"
                        />
                      </button>
                    )}

                    <div className="min-w-0 flex-1">
                      <h2 className="font-serif text-lg font-semibold leading-snug text-stone-900">
                        {book ? (
                          <button
                            type="button"
                            onClick={() => onOpenDetail(book)}
                            className="text-left hover:text-emerald-700 transition-colors"
                          >
                            {loan.bookTitle}
                          </button>
                        ) : (
                          loan.bookTitle
                        )}
                      </h2>
                      <p className="mt-0.5 text-sm text-stone-600">{loan.bookAuthor}</p>

                      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-stone-100 pt-3 text-xs">
                        <div>
                          <dt className="text-stone-500">Tanggal Pinjam</dt>
                          <dd className="font-medium tabular-nums text-stone-800">
                            {formatIndonesianDate(loan.borrowedAt)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-stone-500">Tenggat (7 Hari)</dt>
                          <dd className="font-semibold tabular-nums text-stone-900">
                            {formatIndonesianDate(loan.dueAt)}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                            isOverdue ? 'text-rose-700' : 'text-amber-800'
                          }`}
                        >
                          <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="tabular-nums">
                            {isOverdue
                              ? `Terlambat ${Math.abs(daysLeft)} hari`
                              : daysLeft === 0
                                ? 'Jatuh tempo hari ini'
                                : `Sisa ${daysLeft} hari`}
                          </span>
                        </span>

                        <div className="flex items-center gap-2">
                          {book && (
                            <button
                              type="button"
                              onClick={() => onOpenReader(book)}
                              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-800 transition-colors hover:bg-stone-100 whitespace-nowrap"
                            >
                              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Baca</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onReturnBook(loan.id)}
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap"
                          >
                            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Kembalikan</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Loan History Panel */}
      {subTab === 'riwayat' && (
        <section aria-label="Riwayat peminjaman buku" className="space-y-4">
          {loanHistory.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-stone-500 tabular-nums">
                Total {loanHistory.length} transaksi peminjaman selesai
              </p>
              <button
                type="button"
                onClick={onClearHistory}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Bersihkan Riwayat</span>
              </button>
            </div>
          )}

          {loanHistory.length === 0 ? (
            <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center">
              <p className="font-serif text-xl font-semibold text-stone-900">
                Riwayat peminjaman masih kosong
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">
                Buku yang telah Anda kembalikan akan tercatat rapi di sini beserta tanggal pinjam
                dan tanggal pengembaliannya.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-stone-200 bg-stone-50/80 text-xs font-semibold text-stone-600">
                    <tr>
                      <th className="px-5 py-3.5">Judul Buku</th>
                      <th className="px-5 py-3.5">Tanggal Pinjam</th>
                      <th className="px-5 py-3.5">Tanggal Kembali</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {loanHistory.map((loan) => {
                      const book = findBook(loan.bookId);
                      return (
                        <tr key={loan.id} className="hover:bg-stone-50/70">
                          <td className="px-5 py-4">
                            <p className="font-serif font-semibold text-stone-900">
                              {loan.bookTitle}
                            </p>
                            <p className="text-xs text-stone-500">{loan.bookAuthor}</p>
                          </td>
                          <td className="px-5 py-4 text-xs tabular-nums text-stone-700 whitespace-nowrap">
                            {formatIndonesianDate(loan.borrowedAt)}
                          </td>
                          <td className="px-5 py-4 text-xs tabular-nums text-stone-700 whitespace-nowrap">
                            {loan.returnedAt ? formatIndonesianDate(loan.returnedAt) : '—'}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Dikembalikan</span>
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right whitespace-nowrap">
                            {book ? (
                              <button
                                type="button"
                                onClick={() => onOpenDetail(book)}
                                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                              >
                                Lihat Buku
                              </button>
                            ) : (
                              <span className="text-xs text-stone-400">Dihapus</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
