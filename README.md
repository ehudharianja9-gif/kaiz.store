# Kaizen Library — Perpustakaan Digital

Aplikasi web Perpustakaan Digital berbahasa Indonesia yang dibangun dengan **React**, **TypeScript**, **Tailwind CSS**, dan **Lucide React**. Seluruh data koleksi, pinjaman, riwayat, favorit, serta preferensi pembaca disimpan secara lokal menggunakan `localStorage` berversi (`v1`).

## Fitur Utama

1. **Beranda / Katalog**
   - Statistik koleksi langsung (total buku, tersedia, sedang dipinjam, favorit).
   - Pencarian *real-time* berdasarkan judul, penulis, kategori, penerbit, dan ISBN.
   - Filter kategori buku, status ketersediaan (`Semua`, `Tersedia`, `Dipinjam`), dan pengurutan.
   - Tombol **Reset Data Awal** untuk memulihkan 10 buku awal bawaan beserta pengaturannya.
2. **Rak Pinjaman Saya**
   - Manajemen pinjaman aktif dengan **tenggat otomatis 7 hari**.
   - Indikator sisa hari / keterlambatan, tombol **Kembalikan**, dan akses cepat ke **Baca Cuplikan**.
   - Tab **Riwayat** untuk mencatat seluruh transaksi pengembalian buku.
3. **Kelola Koleksi**
   - Formulir tervalidasi untuk menambah dan menyunting buku.
   - Pemilih warna sampul gradien dan motif ilustrasi **SVG** tanpa tautan gambar eksternal, dilengkapi pratinjau langsung.
   - Fitur hapus buku dengan dialog konfirmasi dan perlindungan terhadap buku yang sedang dipinjam.
4. **Favorit**
   - Kurasi buku pilihan untuk akses cepat.
5. **Modal Detail & Mode Baca Cuplikan Layar Penuh**
   - Modal detail bibliografi lengkap, sinopsis, dan aksi pinjam/favorit.
   - Mode **Baca Cuplikan** Bab 1 layar penuh dengan pengatur ukuran font (`Kecil`, `Sedang`, `Besar`, `Ekstra`) serta pilihan tema **Terang**, **Sepia**, dan **Gelap**.

## Struktur Proyek

```text
src/
├── components/
│   ├── BookCard.tsx
│   ├── BookCover.tsx
│   ├── BookDetailModal.tsx
│   ├── CatalogView.tsx
│   ├── ConfirmDialog.tsx
│   ├── FavoritesView.tsx
│   ├── Header.tsx
│   ├── LoansView.tsx
│   ├── ManageCollectionView.tsx
│   ├── ReaderModal.tsx
│   └── ToastContainer.tsx
├── data/
│   └── initialBooks.ts
├── hooks/
│   └── useLibrary.ts
├── types/
│   └── library.ts
├── utils/
│   └── storage.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Untuk memeriksa tipe TypeScript dan membangun produksi:

```bash
npm run lint
npm run build
```
