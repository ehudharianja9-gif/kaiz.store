import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Book,
  BookFormValues,
  LibraryStoragePayload,
  LoanRecord,
  ReaderPreferences,
  ToastMessage,
  ToastVariant,
} from '../types/library';
import {
  addDaysIso,
  LOAN_DURATION_DAYS,
  loadLibraryState,
  resetLibraryState,
  saveLibraryState,
  STORAGE_VERSION,
} from '../utils/storage';

export function useLibrary() {
  const [state, setState] = useState<LibraryStoragePayload>(() => loadLibraryState());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    saveLibraryState(state);
  }, [state]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToast = useCallback(
    (title: string, description?: string, variant: ToastVariant = 'success') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-3), { id, title, description, variant }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 4000);
    },
    []
  );

  const activeLoans = useMemo(
    () =>
      state.loans
        .filter((loan) => loan.returnedAt === null)
        .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime()),
    [state.loans]
  );

  const loanHistory = useMemo(
    () =>
      state.loans
        .filter((loan) => loan.returnedAt !== null)
        .sort(
          (a, b) =>
            new Date(b.returnedAt ?? b.borrowedAt).getTime() -
            new Date(a.returnedAt ?? a.borrowedAt).getTime()
        ),
    [state.loans]
  );

  const borrowedBookIds = useMemo(
    () => new Set(activeLoans.map((loan) => loan.bookId)),
    [activeLoans]
  );

  const favoriteIds = useMemo(() => new Set(state.favorites), [state.favorites]);

  const borrowBook = useCallback(
    (bookId: string) => {
      const target = state.books.find((book) => book.id === bookId);
      if (!target) return;

      const alreadyBorrowed = state.loans.some(
        (loan) => loan.bookId === bookId && loan.returnedAt === null
      );
      if (alreadyBorrowed) {
        addToast('Buku sedang dipinjam', `"${target.title}" sudah berada di rak pinjaman Anda.`, 'info');
        return;
      }

      const nowIso = new Date().toISOString();
      const newLoan: LoanRecord = {
        id: `pinjam-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        bookId: target.id,
        bookTitle: target.title,
        bookAuthor: target.author,
        borrowedAt: nowIso,
        dueAt: addDaysIso(nowIso, LOAN_DURATION_DAYS),
        returnedAt: null,
      };

      setState((prev) => ({
        ...prev,
        version: STORAGE_VERSION,
        loans: [newLoan, ...prev.loans],
      }));

      addToast(
        'Buku berhasil dipinjam',
        `Tenggat pengembalian "${target.title}" ditetapkan otomatis 7 hari dari hari ini.`,
        'success'
      );
    },
    [state.books, state.loans, addToast]
  );

  const returnBook = useCallback(
    (loanId: string) => {
      const targetLoan = state.loans.find((loan) => loan.id === loanId && loan.returnedAt === null);
      if (!targetLoan) return;

      const nowIso = new Date().toISOString();
      setState((prev) => ({
        ...prev,
        loans: prev.loans.map((loan) =>
          loan.id === loanId ? { ...loan, returnedAt: nowIso } : loan
        ),
      }));

      addToast(
        'Buku dikembalikan',
        `"${targetLoan.bookTitle}" telah dikembalikan ke katalog dan dicatat di riwayat.`,
        'success'
      );
    },
    [state.loans, addToast]
  );

  const returnBookByBookId = useCallback(
    (bookId: string) => {
      const active = state.loans.find(
        (loan) => loan.bookId === bookId && loan.returnedAt === null
      );
      if (active) {
        returnBook(active.id);
      }
    },
    [state.loans, returnBook]
  );

  const toggleFavorite = useCallback(
    (bookId: string) => {
      const target = state.books.find((book) => book.id === bookId);
      const isFav = state.favorites.includes(bookId);

      setState((prev) => ({
        ...prev,
        favorites: isFav
          ? prev.favorites.filter((id) => id !== bookId)
          : [bookId, ...prev.favorites],
      }));

      if (target) {
        addToast(
          isFav ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit',
          `"${target.title}" ${isFav ? 'dihapus dari' : 'disimpan ke'} daftar favorit Anda.`,
          'info'
        );
      }
    },
    [state.books, state.favorites, addToast]
  );

  const addBook = useCallback(
    (values: BookFormValues): Book => {
      const newBook: Book = {
        id: `buku-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: values.title.trim(),
        author: values.author.trim(),
        category: values.category,
        year: Number(values.year),
        pages: Number(values.pages),
        publisher: values.publisher.trim(),
        isbn: values.isbn.trim(),
        coverTheme: values.coverTheme,
        coverMotif: values.coverMotif,
        synopsis: values.synopsis.trim(),
        chapterOneTitle: values.chapterOneTitle.trim(),
        chapterOneContent: values.chapterOneContent.trim(),
        createdAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        books: [newBook, ...prev.books],
      }));

      addToast('Buku baru ditambahkan', `"${newBook.title}" kini tersedia di katalog.`, 'success');
      return newBook;
    },
    [addToast]
  );

  const updateBook = useCallback(
    (bookId: string, values: BookFormValues) => {
      setState((prev) => ({
        ...prev,
        books: prev.books.map((book) =>
          book.id === bookId
            ? {
                ...book,
                title: values.title.trim(),
                author: values.author.trim(),
                category: values.category,
                year: Number(values.year),
                pages: Number(values.pages),
                publisher: values.publisher.trim(),
                isbn: values.isbn.trim(),
                coverTheme: values.coverTheme,
                coverMotif: values.coverMotif,
                synopsis: values.synopsis.trim(),
                chapterOneTitle: values.chapterOneTitle.trim(),
                chapterOneContent: values.chapterOneContent.trim(),
              }
            : book
        ),
        loans: prev.loans.map((loan) =>
          loan.bookId === bookId
            ? {
                ...loan,
                bookTitle: values.title.trim(),
                bookAuthor: values.author.trim(),
              }
            : loan
        ),
      }));

      addToast('Koleksi diperbarui', `Perubahan untuk "${values.title.trim()}" telah disimpan.`, 'success');
    },
    [addToast]
  );

  const deleteBook = useCallback(
    (bookId: string) => {
      const target = state.books.find((book) => book.id === bookId);
      if (!target) return;

      const isCurrentlyBorrowed = state.loans.some(
        (loan) => loan.bookId === bookId && loan.returnedAt === null
      );

      if (isCurrentlyBorrowed) {
        addToast(
          'Tidak dapat menghapus buku',
          `"${target.title}" sedang dipinjam. Kembalikan buku terlebih dahulu sebelum menghapusnya.`,
          'warning'
        );
        return false;
      }

      setState((prev) => ({
        ...prev,
        books: prev.books.filter((book) => book.id !== bookId),
        favorites: prev.favorites.filter((id) => id !== bookId),
      }));

      addToast('Buku dihapus', `"${target.title}" telah dihapus dari koleksi.`, 'info');
      return true;
    },
    [state.books, state.loans, addToast]
  );

  const clearLoanHistory = useCallback(() => {
    setState((prev) => ({
      ...prev,
      loans: prev.loans.filter((loan) => loan.returnedAt === null),
    }));
    addToast('Riwayat dibersihkan', 'Semua catatan pengembalian terdahulu telah dihapus.', 'info');
  }, [addToast]);

  const resetAllData = useCallback(() => {
    const fresh = resetLibraryState();
    setState(fresh);
    addToast(
      'Data perpustakaan direset',
      'Koleksi dikembalikan ke 10 buku awal beserta pengaturan standar.',
      'info'
    );
  }, [addToast]);

  const updateReaderPrefs = useCallback((partial: Partial<ReaderPreferences>) => {
    setState((prev) => ({
      ...prev,
      readerPrefs: {
        ...prev.readerPrefs,
        ...partial,
      },
    }));
  }, []);

  return {
    books: state.books,
    loans: state.loans,
    activeLoans,
    loanHistory,
    borrowedBookIds,
    favorites: state.favorites,
    favoriteIds,
    readerPrefs: state.readerPrefs,
    toasts,
    borrowBook,
    returnBook,
    returnBookByBookId,
    toggleFavorite,
    addBook,
    updateBook,
    deleteBook,
    clearLoanHistory,
    resetAllData,
    updateReaderPrefs,
    dismissToast,
  };
}
