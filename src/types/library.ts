export type BookCategory =
  | 'Sastra'
  | 'Sejarah'
  | 'Sains'
  | 'Teknologi'
  | 'Filsafat'
  | 'Ekonomi'
  | 'Budaya'
  | 'Psikologi';

export const BOOK_CATEGORIES: BookCategory[] = [
  'Sastra',
  'Sejarah',
  'Sains',
  'Teknologi',
  'Filsafat',
  'Ekonomi',
  'Budaya',
  'Psikologi',
];

export type CoverThemeId =
  | 'emerald'
  | 'indigo'
  | 'terracotta'
  | 'slate'
  | 'amber'
  | 'teal'
  | 'plum'
  | 'charcoal';

export type CoverMotifId =
  | 'archipelago'
  | 'botanical'
  | 'compass'
  | 'cosmos'
  | 'songket';

export interface CoverThemeOption {
  id: CoverThemeId;
  label: string;
  swatchHex: string;
  gradientFrom: string;
  gradientTo: string;
  accentHex: string;
  textColor: string;
  mutedColor: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  year: number;
  pages: number;
  publisher: string;
  isbn: string;
  coverTheme: CoverThemeId;
  coverMotif: CoverMotifId;
  synopsis: string;
  chapterOneTitle: string;
  chapterOneContent: string;
  createdAt: string;
}

export interface LoanRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
}

export type NavTab = 'katalog' | 'pinjaman' | 'kelola' | 'favorit';

export type AvailabilityFilter = 'semua' | 'tersedia' | 'dipinjam';

export type ReaderTheme = 'terang' | 'sepia' | 'gelap';

export type ReaderFontSize = 'kecil' | 'sedang' | 'besar' | 'ekstra';

export interface ReaderPreferences {
  theme: ReaderTheme;
  fontSize: ReaderFontSize;
}

export interface LibraryStoragePayload {
  version: number;
  books: Book[];
  loans: LoanRecord[];
  favorites: string[];
  readerPrefs: ReaderPreferences;
  updatedAt: string;
}

export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

export interface BookFormValues {
  title: string;
  author: string;
  category: BookCategory;
  year: string;
  pages: string;
  publisher: string;
  isbn: string;
  coverTheme: CoverThemeId;
  coverMotif: CoverMotifId;
  synopsis: string;
  chapterOneTitle: string;
  chapterOneContent: string;
}
