import { INITIAL_BOOKS } from '../data/initialBooks';
import {
  Book,
  LibraryStoragePayload,
  LoanRecord,
  ReaderPreferences,
} from '../types/library';

export const STORAGE_KEY = 'pustaka_nusantara_library';
export const STORAGE_VERSION = 1;
export const LOAN_DURATION_DAYS = 7;

export const DEFAULT_READER_PREFS: ReaderPreferences = {
  theme: 'terang',
  fontSize: 'sedang',
};

export function createDefaultPayload(): LibraryStoragePayload {
  return {
    version: STORAGE_VERSION,
    books: INITIAL_BOOKS.map((book) => ({ ...book })),
    loans: [],
    favorites: ['buku-01', 'buku-03'],
    readerPrefs: { ...DEFAULT_READER_PREFS },
    updatedAt: new Date().toISOString(),
  };
}

function isValidBook(item: unknown): item is Book {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.author === 'string' &&
    typeof candidate.category === 'string' &&
    typeof candidate.year === 'number' &&
    typeof candidate.pages === 'number' &&
    typeof candidate.synopsis === 'string' &&
    typeof candidate.chapterOneTitle === 'string' &&
    typeof candidate.chapterOneContent === 'string'
  );
}

function isValidLoan(item: unknown): item is LoanRecord {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.bookId === 'string' &&
    typeof candidate.bookTitle === 'string' &&
    typeof candidate.borrowedAt === 'string' &&
    typeof candidate.dueAt === 'string'
  );
}

export function loadLibraryState(): LibraryStoragePayload {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createDefaultPayload();
      saveLibraryState(initial);
      return initial;
    }

    const parsed = JSON.parse(raw) as Partial<LibraryStoragePayload>;
    if (!parsed || parsed.version !== STORAGE_VERSION) {
      const migrated = createDefaultPayload();
      saveLibraryState(migrated);
      return migrated;
    }

    const books = Array.isArray(parsed.books) ? parsed.books.filter(isValidBook) : INITIAL_BOOKS;
    const loans = Array.isArray(parsed.loans) ? parsed.loans.filter(isValidLoan) : [];
    const favorites = Array.isArray(parsed.favorites)
      ? parsed.favorites.filter((id): id is string => typeof id === 'string')
      : [];

    const readerPrefs: ReaderPreferences = {
      theme:
        parsed.readerPrefs?.theme === 'sepia' ||
        parsed.readerPrefs?.theme === 'gelap' ||
        parsed.readerPrefs?.theme === 'terang'
          ? parsed.readerPrefs.theme
          : DEFAULT_READER_PREFS.theme,
      fontSize:
        parsed.readerPrefs?.fontSize === 'kecil' ||
        parsed.readerPrefs?.fontSize === 'sedang' ||
        parsed.readerPrefs?.fontSize === 'besar' ||
        parsed.readerPrefs?.fontSize === 'ekstra'
          ? parsed.readerPrefs.fontSize
          : DEFAULT_READER_PREFS.fontSize,
    };

    return {
      version: STORAGE_VERSION,
      books,
      loans,
      favorites,
      readerPrefs,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    const fallback = createDefaultPayload();
    saveLibraryState(fallback);
    return fallback;
  }
}

export function saveLibraryState(payload: LibraryStoragePayload): void {
  try {
    const dataToSave: LibraryStoragePayload = {
      ...payload,
      version: STORAGE_VERSION,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function resetLibraryState(): LibraryStoragePayload {
  const fresh = createDefaultPayload();
  saveLibraryState(fresh);
  return fresh;
}

export function addDaysIso(isoDate: string, days: number): string {
  const date = new Date(isoDate);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function formatIndonesianDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export function getDaysRemaining(dueAtIso: string): number {
  const now = new Date();
  const due = new Date(dueAtIso);
  const diffMs = due.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
