import { useMemo, useState } from 'react';
import { BookDetailModal } from './components/BookDetailModal';
import { CatalogView } from './components/CatalogView';
import { ConfirmDialog } from './components/ConfirmDialog';
import { FavoritesView } from './components/FavoritesView';
import { Header } from './components/Header';
import { LoansView } from './components/LoansView';
import { ManageCollectionView } from './components/ManageCollectionView';
import { ReaderModal } from './components/ReaderModal';
import { ToastContainer } from './components/ToastContainer';
import { useLibrary } from './hooks/useLibrary';
import { Book, NavTab } from './types/library';
import { STORAGE_VERSION } from './utils/storage';

export default function App() {
  const {
    books,
    activeLoans,
    loanHistory,
    borrowedBookIds,
    favoriteIds,
    readerPrefs,
    toasts,
    borrowBook,
    returnBook,
    toggleFavorite,
    addBook,
    updateBook,
    deleteBook,
    clearLoanHistory,
    resetAllData,
    updateReaderPrefs,
    dismissToast,
  } = useLibrary();

  const [activeTab, setActiveTab] = useState<NavTab>('katalog');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [readerBookId, setReaderBookId] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const selectedBook = useMemo(
    () => books.find((item) => item.id === selectedBookId) ?? null,
    [books, selectedBookId]
  );

  const readerBook = useMemo(
    () => books.find((item) => item.id === readerBookId) ?? null,
    [books, readerBookId]
  );

  const selectedBookActiveLoan = useMemo(() => {
    if (!selectedBook) return undefined;
    return activeLoans.find((loan) => loan.bookId === selectedBook.id);
  }, [selectedBook, activeLoans]);

  const favoriteBooks = useMemo(
    () => books.filter((book) => favoriteIds.has(book.id)),
    [books, favoriteIds]
  );

  const handleQuickAddBook = () => {
    setEditingBook(null);
    setActiveTab('kelola');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetail = (book: Book) => {
    setSelectedBookId(book.id);
  };

  const handleOpenReader = (book: Book) => {
    setReaderBookId(book.id);
  };

  const handleEditFromDetail = (book: Book) => {
    setSelectedBookId(null);
    setEditingBook(book);
    setActiveTab('kelola');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartEdit = (book: Book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmDelete = () => {
    if (!bookToDelete) return;
    const deleted = deleteBook(bookToDelete.id);
    if (deleted && editingBook?.id === bookToDelete.id) {
      setEditingBook(null);
    }
    if (deleted && selectedBookId === bookToDelete.id) {
      setSelectedBookId(null);
    }
    setBookToDelete(null);
  };

  const handleConfirmReset = () => {
    resetAllData();
    setEditingBook(null);
    setSelectedBookId(null);
    setReaderBookId(null);
    setResetConfirmOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onQuickAddBook={handleQuickAddBook}
        activeLoanCount={activeLoans.length}
        favoriteCount={favoriteBooks.length}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {activeTab === 'katalog' && (
          <CatalogView
            books={books}
            borrowedBookIds={borrowedBookIds}
            favoriteIds={favoriteIds}
            onOpenDetail={handleOpenDetail}
            onOpenReader={handleOpenReader}
            onToggleFavorite={toggleFavorite}
            onRequestReset={() => setResetConfirmOpen(true)}
          />
        )}

        {activeTab === 'pinjaman' && (
          <LoansView
            books={books}
            activeLoans={activeLoans}
            loanHistory={loanHistory}
            onReturnBook={returnBook}
            onOpenDetail={handleOpenDetail}
            onOpenReader={handleOpenReader}
            onClearHistory={clearLoanHistory}
            onBrowseCatalog={() => setActiveTab('katalog')}
          />
        )}

        {activeTab === 'kelola' && (
          <ManageCollectionView
            books={books}
            borrowedBookIds={borrowedBookIds}
            editingBook={editingBook}
            onCancelEdit={() => setEditingBook(null)}
            onStartEdit={handleStartEdit}
            onAddBook={addBook}
            onUpdateBook={updateBook}
            onRequestDeleteBook={(book) => setBookToDelete(book)}
            onRequestReset={() => setResetConfirmOpen(true)}
          />
        )}

        {activeTab === 'favorit' && (
          <FavoritesView
            favoriteBooks={favoriteBooks}
            borrowedBookIds={borrowedBookIds}
            favoriteIds={favoriteIds}
            onOpenDetail={handleOpenDetail}
            onOpenReader={handleOpenReader}
            onToggleFavorite={toggleFavorite}
            onBrowseCatalog={() => setActiveTab('katalog')}
          />
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            <span className="font-serif font-semibold text-stone-800">Kaizen Library</span> ·
            Perpustakaan Digital dengan penyimpanan lokal berversi (v{STORAGE_VERSION})
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('katalog')}
              className="hover:text-stone-900 transition-colors"
            >
              Katalog
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pinjaman')}
              className="hover:text-stone-900 transition-colors"
            >
              Pinjaman
            </button>
            <button
              type="button"
              onClick={() => setResetConfirmOpen(true)}
              className="font-medium text-stone-700 hover:text-emerald-700 transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>
      </footer>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        activeLoan={selectedBookActiveLoan}
        isFavorite={selectedBook ? favoriteIds.has(selectedBook.id) : false}
        onClose={() => setSelectedBookId(null)}
        onBorrow={borrowBook}
        onReturn={returnBook}
        onToggleFavorite={toggleFavorite}
        onOpenReader={handleOpenReader}
        onEditBook={handleEditFromDetail}
      />

      {/* Full-Screen Chapter 1 Reader */}
      <ReaderModal
        book={readerBook}
        preferences={readerPrefs}
        onUpdatePreferences={updateReaderPrefs}
        onClose={() => setReaderBookId(null)}
      />

      {/* Confirm Reset Data Dialog */}
      <ConfirmDialog
        open={resetConfirmOpen}
        title="Reset Data Perpustakaan?"
        description="Seluruh perubahan koleksi, daftar pinjaman aktif, riwayat pengembalian, dan favorit akan dikembalikan ke 10 buku awal bawaan."
        confirmLabel="Ya, Reset Data"
        tone="danger"
        onConfirm={handleConfirmReset}
        onCancel={() => setResetConfirmOpen(false)}
      />

      {/* Confirm Delete Book Dialog */}
      <ConfirmDialog
        open={Boolean(bookToDelete)}
        title="Hapus Buku dari Koleksi?"
        description={
          bookToDelete
            ? `Buku "${bookToDelete.title}" oleh ${bookToDelete.author} akan dihapus secara permanen dari penyimpanan lokal.`
            : ''
        }
        confirmLabel="Hapus Buku"
        tone="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setBookToDelete(null)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
