import { Book, CoverMotifId, CoverThemeId, CoverThemeOption } from '../types/library';

export const COVER_THEMES: Record<CoverThemeId, CoverThemeOption> = {
  emerald: {
    id: 'emerald',
    label: 'Zamrud Rimba',
    swatchHex: '#047857',
    gradientFrom: '#064e3b',
    gradientTo: '#047857',
    accentHex: '#a7f3d0',
    textColor: '#ecfdf5',
    mutedColor: '#a7f3d0',
  },
  indigo: {
    id: 'indigo',
    label: 'Biru Nilam',
    swatchHex: '#3730a3',
    gradientFrom: '#1e1b4b',
    gradientTo: '#3730a3',
    accentHex: '#c7d2fe',
    textColor: '#eef2ff',
    mutedColor: '#c7d2fe',
  },
  terracotta: {
    id: 'terracotta',
    label: 'Bata Terakota',
    swatchHex: '#9a3412',
    gradientFrom: '#7c2d12',
    gradientTo: '#b45309',
    accentHex: '#fde68a',
    textColor: '#fffbeb',
    mutedColor: '#fed7aa',
  },
  slate: {
    id: 'slate',
    label: 'Sabak Senja',
    swatchHex: '#334155',
    gradientFrom: '#0f172a',
    gradientTo: '#334155',
    accentHex: '#cbd5e1',
    textColor: '#f8fafc',
    mutedColor: '#cbd5e1',
  },
  amber: {
    id: 'amber',
    label: 'Kuning Kunyit',
    swatchHex: '#92400e',
    gradientFrom: '#451a03',
    gradientTo: '#92400e',
    accentHex: '#fcd34d',
    textColor: '#fef3c7',
    mutedColor: '#fde68a',
  },
  teal: {
    id: 'teal',
    label: 'Laut Banda',
    swatchHex: '#0f766e',
    gradientFrom: '#134e4a',
    gradientTo: '#0f766e',
    accentHex: '#99f6e4',
    textColor: '#f0fdfa',
    mutedColor: '#99f6e4',
  },
  plum: {
    id: 'plum',
    label: 'Manggis Tua',
    swatchHex: '#701a75',
    gradientFrom: '#4a044e',
    gradientTo: '#86198f',
    accentHex: '#f5d0fe',
    textColor: '#fdf4ff',
    mutedColor: '#f5d0fe',
  },
  charcoal: {
    id: 'charcoal',
    label: 'Arang Klasik',
    swatchHex: '#292524',
    gradientFrom: '#1c1917',
    gradientTo: '#44403c',
    accentHex: '#d6d3d1',
    textColor: '#fafaf9',
    mutedColor: '#d6d3d1',
  },
};

export const COVER_THEME_LIST: CoverThemeOption[] = Object.values(COVER_THEMES);

export const COVER_MOTIFS: { id: CoverMotifId; label: string }[] = [
  { id: 'archipelago', label: 'Gelombang Kepulauan' },
  { id: 'botanical', label: 'Lengkungan Flora' },
  { id: 'compass', label: 'Kompas Bahari' },
  { id: 'cosmos', label: 'Lingkar Semesta' },
  { id: 'songket', label: 'Anyaman Geometris' },
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'buku-01',
    title: 'Senja di Pelabuhan Sunda Kelapa',
    author: 'Ratna Ayu Lestari',
    category: 'Sastra',
    year: 2023,
    pages: 312,
    publisher: 'Pustaka Kayu Manis',
    isbn: '978-602-411-018-4',
    coverTheme: 'terracotta',
    coverMotif: 'archipelago',
    synopsis:
      'Sebuah roman sejarah tentang pertemuan dua keluarga pelayar di Jakarta Utara pada akhir dekade 1960-an. Di antara derit kayu pinisi dan bau cengkih dari gudang tua, rahasia surat-surat lama perlahan terungkap.',
    chapterOneTitle: 'Bab 1: Dermaga Kayu dan Angin Muson',
    chapterOneContent: `Pukul lima sore, matahari mulai merendah di balik tiang-tiang pinisi yang bersandar di Pelabuhan Sunda Kelapa. Cahayanya memantul di permukaan air laut yang keruh, mengubah riak kecil menjadi garis-garis tembaga yang bergetar pelan.

Di ujung dermaga nomor tiga, Arsyad berdiri sambil memegang buku catatan kulit yang sudutnya sudah mengelupas. Sejak subuh, ia menghitung peti-peti pala dan kayu manis yang diturunkan dari lambung kapal layar asal Makassar. Bau rempah yang tajam bercampur dengan asin angin laut selalu mengingatkannya pada suara ayahnya di beranda rumah.

"Masih ada dua perahu lagi yang menunggu pasang malam ini," kata Pak Darmo, mandor pelabuhan yang mengenakan topi anyaman pandan. Suaranya nyaris tenggelam oleh teriakan kuli angkut yang memanggul karung goni di atas papan titian.

Arsyad mengangguk lalu mencatat jam sandar di kolom kanan. Namun perhatiannya justru tertambat pada seorang perempuan muda berkebaya katun biru muda yang berdiri di dekat pos syahbandar. Di tangannya tergenggam sebuah amplop cokelat tersegel lilin merah—tanda kiriman penting dari seberang lautan.

Angin muson timur berembus lebih kencang, membawa aroma hujan yang tertahan di kaki langit. Pada saat itu Arsyad belum menyadari bahwa amplop di tangan perempuan tersebut akan mengubah seluruh perjalanan hidupnya selama sepuluh tahun mendatang.`,
    createdAt: '2026-01-10T08:00:00.000Z',
  },
  {
    id: 'buku-02',
    title: 'Jejak Jalur Rempah Nusantara',
    author: 'Dr. Hendra Wijaya',
    category: 'Sejarah',
    year: 2022,
    pages: 428,
    publisher: 'Balai Aksara Sejarah',
    isbn: '978-602-411-029-0',
    coverTheme: 'amber',
    coverMotif: 'compass',
    synopsis:
      'Penelusuran mendalam mengenai jaringan perdagangan maritim kepulauan Indonesia sejak abad ke-7 hingga ke-17. Mengulas peran pelabuhan lokal, teknologi navigasi tradisional, dan pertukaran budaya lintas samudra.',
    chapterOneTitle: 'Bab 1: Peta yang Ditulis oleh Angin',
    chapterOneContent: `Jauh sebelum kompas magnetik dikenal luas di perairan Eropa, para pelaut Nusantara telah membaca lautan sebagai halaman naskah yang hidup. Arah angin muson, warna arus permukaan, hingga jalur terbang burung laut menjadi penanda pasti menuju pulau-pulau penghasil pala dan cengkih di timur.

Dalam catatan perjalanan Tiongkok abad ketujuh serta manuskrip Arab klasik, kepulauan di selatan garis khatulistiwa disebut sebagai negeri yang harum baunya bahkan sebelum daratannya tampak di cakrawala. Nama itu bukan sekadar kiasan puitis; ia merujuk pada perdagangan cengkih Maluku dan lada Sumatera yang menggerakkan ekonomi lintas benua.

Setiap enam bulan sekali, perubahan arah angin memicu pergerakan ratusan jung dan perahu bercadik. Para pedagang dari Gujarat, Tiongkok Selatan, hingga Semenanjung Arab berkumpul di bandar-bandar niaga seperti Sriwijaya, Majapahit, dan Ternate. Di pelabuhan inilah bahasa Melayu berkembang menjadi bahasa pergaulan yang menyatukan berbagai bangsa.

Melalui arsip pelayaran, temuan keramik dasar laut, serta tradisi lisan masyarakat pesisir, buku ini mengajak pembaca menelusuri kembali bagaimana rempah-rempah kecil dari hutan tropis membentuk peta geopolitik dunia modern.`,
    createdAt: '2026-01-12T09:15:00.000Z',
  },
  {
    id: 'buku-03',
    title: 'Ekologi Hutan Hujan Tropis',
    author: 'Prof. Nadia Kartika',
    category: 'Sains',
    year: 2024,
    pages: 296,
    publisher: 'Penerbit Cakrawala Ilmu',
    isbn: '978-602-411-044-3',
    coverTheme: 'emerald',
    coverMotif: 'botanical',
    synopsis:
      'Kajian ilmiah populer mengenai keanekaragaman hayati di kanopi hutan hujan Kalimantan dan Papua. Menjelaskan hubungan simbiotik antara pohon raksasa, jamur mikoriza, serta satwa endemik dalam menjaga keseimbangan iklim.',
    chapterOneTitle: 'Bab 1: Kehidupan di Lapisan Kanopi',
    chapterOneContent: `Jika Anda berdiri di lantai hutan hujan tropis pada pukul sembilan pagi, suasana di bawah terasa teduh dan lembap, seolah berada di dalam katedral hijau raksasa. Kurang dari dua persen cahaya matahari yang berhasil menembus rimbunnya tajuk pepohonan di ketinggian empat puluh meter.

Di atas sana, jauh dari pandangan pengamat di permukaan tanah, terbentang dunia yang jauh lebih riuh. Lapisan kanopi merupakan pusat produksi energi utama hutan tropis. Daun-daun lebar pohon meranti, kapur, dan ulin berlomba menyerap radiasi surya sambil menampung ratusan spesies anggrek epifit dan paku-pakuan.

Penelitian lapangan selama lima belas tahun menunjukkan bahwa setiap batang pohon tua dapat menjadi rumah bagi lebih dari seribu jenis serangga penyerbuk, katak pohon, hingga mamalia pemanjat. Mereka membentuk jejaring makanan yang rapat; satu jenis tumbuhan bergantung pada burung tertentu untuk menyebarkan bijinya, sementara burung itu bergantung pada rongga batang lapuk untuk bersarang.

Memahami lapisan kanopi berarti memahami jantung siklus air dan karbon di kepulauan kita. Ketika satu tajuk tumbang oleh penebangan liar, bukan hanya sebatang kayu yang hilang, melainkan satu ekosistem vertikal yang membutuhkan ratusan tahun untuk pulih.`,
    createdAt: '2026-01-14T10:30:00.000Z',
  },
  {
    id: 'buku-04',
    title: 'Arsitektur Sistem Terdistribusi Modern',
    author: 'Bima Pratama Putra',
    category: 'Teknologi',
    year: 2025,
    pages: 384,
    publisher: 'TeknoPress Bandung',
    isbn: '978-602-411-051-1',
    coverTheme: 'indigo',
    coverMotif: 'cosmos',
    synopsis:
      'Panduan praktis merancang aplikasi web dan layanan backend yang tangguh menghadapi jutaan permintaan per detik. Membahas replikasi data, konsistensi, antrean pesan, dan observabilitas sistem nyata.',
    chapterOneTitle: 'Bab 1: Ketika Satu Peladen Tidak Lagi Cukup',
    chapterOneContent: `Hampir semua sistem perangkat lunak besar berawal dari kesederhanaan: satu aplikasi, satu basis data, dan satu mesin peladen yang melayani seluruh pengguna. Pada tahap awal, arsitektur monolitik semacam itu sangat mudah dipahami, diuji, dan diperbarui dalam hitungan menit.

Namun ketika jumlah pengguna bertumbuh dari ratusan menjadi jutaan, keterbatasan fisik mulai mengetuk pintu. Kapasitas memori, lebar pita jaringan, dan kecepatan baca-tulis cakram keras memiliki batas alami. Lebih penting lagi, ketergantungan pada satu titik kegagalan membuat satu gangguan listrik atau pembaruan keliru dapat melumpuhkan seluruh layanan.

Di sinilah arsitektur terdistribusi hadir bukan sebagai gaya-gayaan teknis, melainkan sebagai jawaban atas kebutuhan keandalan dan skalabilitas. Memecah beban kerja ke banyak simpul memberi kita ketahanan, tetapi sekaligus memperkenalkan tantangan baru yang tidak sederhana: latensi jaringan yang tak terduga, jam sistem yang tidak pernah benar-benar sinkron, serta kegagalan parsial.

Bab-bab dalam buku ini dirancang untuk menjembatani teori konsensus klasik dengan praktik rekayasa sehari-hari. Kita akan belajar mengenali kapan kesederhanaan tetap menjadi pilihan terbaik, dan bagaimana merancang sistem terdistribusi yang tetap terukur ketika badai lalu lintas data datang.`,
    createdAt: '2026-01-18T11:00:00.000Z',
  },
  {
    id: 'buku-05',
    title: 'Etika Kesunyian di Era Bising',
    author: 'Surya Dharmawan',
    category: 'Filsafat',
    year: 2021,
    pages: 224,
    publisher: 'Lentera Pemikiran',
    isbn: '978-602-411-063-4',
    coverTheme: 'charcoal',
    coverMotif: 'cosmos',
    synopsis:
      'Kumpulan esai filosofis tentang bagaimana manusia modern memaknai keheningan, perhatian, dan kebebasan batin di tengah gempuran informasi digital yang tiada henti.',
    chapterOneTitle: 'Bab 1: Ruang Sunyi yang Semakin Menyempit',
    chapterOneContent: `Kita hidup pada zaman ketika jeda lima belas detik di ruang tunggu dokter atau di dalam gerbong kereta api terasa hampir mustahil dibiarkan kosong. Sebelum pikiran sempat mengembara, jari kita telah lebih dahulu meraih layar kecil di saku baju, mencari kabar terbaru yang sesungguhnya tidak mendesak untuk diketahui.

Kebisingan modern jarang hadir dalam bentuk suara keras yang memekakkan telinga. Ia datang sebagai arus pemberitahuan yang halus, potongan opini yang tergesa-gesa, serta dorongan konstan untuk selalu hadir dan memberi tanggapan. Dalam situasi seperti itu, kesunyian kerap dicurigai sebagai kekosongan yang tidak produktif.

Padahal, dalam sejarah pemikiran Timur maupun Barat, keheningan selalu menjadi prasyarat bagi kejernihan budi. Tanpa ruang jeda, manusia hanya menjadi gema dari apa yang baru saja dibacanya. Kesadaran kritis membutuhkan jarak—semacam pelataran sunyi tempat pengalaman sehari-hari diendapkan menjadi kebijaksanaan.

Mengembalikan etika kesunyian bukanlah ajakan untuk lari ke gua terpencil atau memutus diri dari kemajuan zaman. Ia adalah seni melatih kendali atas perhatian kita sendiri, agar kita kembali mampu mendengar suara nurani dan hadir utuh bagi sesama.`,
    createdAt: '2026-01-20T14:20:00.000Z',
  },
  {
    id: 'buku-06',
    title: 'Ekonomi Rakyat dan Koperasi Digital',
    author: 'Sri Mulyani Hapsari',
    category: 'Ekonomi',
    year: 2024,
    pages: 268,
    publisher: 'Mandala Ekonomi Nusantara',
    isbn: '978-602-411-077-1',
    coverTheme: 'teal',
    coverMotif: 'songket',
    synopsis:
      'Analisis transformasi usaha mikro, koperasi tani, dan komunitas perajin lokal yang memanfaatkan teknologi finansial terbuka untuk memperluas pasar tanpa kehilangan asas gotong royong.',
    chapterOneTitle: 'Bab 1: Pasar Desa dalam Genggaman Baru',
    chapterOneContent: `Di sebuah kecamatan penghasil kopi di dataran tinggi Gayo, catatan panen yang dahulu ditulis di buku tulis bergaris kini tercatat rapi di papan dasbor bersama milik koperasi desa. Setiap petani dapat memantau harga beli harian, kualitas kadar air biji kopi, hingga jadwal pengiriman ke pelabuhan ekspor tanpa perantara yang berlapis.

Perubahan ini membuktikan bahwa teknologi keuangan dan pencatatan digital tidak harus selalu memusatkan keuntungan pada segelintir platform raksasa. Ketika infrastruktur digital dikelola secara kolektif oleh kelompok produsen, efisiensi teknologi justru memperkuat daya tawar ekonomi rakyat.

Selama puluhan tahun, koperasi sering dipandang sebagai lembaga lamban yang tertinggal oleh perubahan pasar. Padahal persoalan utamanya bukanlah pada nilai kebersamaan atau kepemilikan anggota, melainkan pada kurangnya transparansi pembukuan serta akses informasi pasar yang setara.

Dalam bab pembuka ini, kita meninjau studi kasus dari tujuh provinsi yang memperlihatkan bagaimana pembukuan terbuka, sistem pembayaran QR lintas bank, dan logistik terpadu mampu menggandakan pendapatan bersih perajin serta petani kecil secara berkelanjutan.`,
    createdAt: '2026-01-22T15:45:00.000Z',
  },
  {
    id: 'buku-07',
    title: 'Tenun Songket dan Makna Simbolis',
    author: 'Cut Meutia Zahra',
    category: 'Budaya',
    year: 2020,
    pages: 240,
    publisher: 'Warisan Wastra Indonesia',
    isbn: '978-602-411-082-5',
    coverTheme: 'plum',
    coverMotif: 'songket',
    synopsis:
      'Dokumentasi etnografis tentang motif-motif klasik songket dari Palembang, Minangkabau, hingga Lombok. Mengungkap filosofi hidup, doa keluarga, dan teknik pewarnaan alam yang diwariskan lintas generasi.',
    chapterOneTitle: 'Bab 1: Benang Emas di Atas Gedogan',
    chapterOneContent: `Suara kayu sisir tenun yang beradu teratur di beranda rumah panggung selalu menandai kesabaran yang panjang. Sehelai kain songket tradisional tidak pernah lahir dari ketergesaan; setiap tarikan benang pakan menuntut ketelitian mata dan ketenangan hati penenunnya.

Dalam tradisi masyarakat Palembang dan Minangkabau, motif bukanlah hiasan semata. Ragam hias pucuk rebung melambangkan pertumbuhan dan harapan yang selalu mengarah ke atas, sementara motif bintang beralih mengingatkan pemakainya pada keteguhan prinsip di tengah perubahan zaman.

Pewarnaan benang pun merupakan dialog akrab dengan alam sekitar. Akar mengkudu menghasilkan merah marun yang hangat, daun tarum memberi biru nila yang dalam, sedangkan kunyit dan kulit kayu mahoni menyumbang rona keemasan yang tahan pudar puluhan tahun.

Menyelami warisan wastra Nusantara berarti membaca sejarah perempuan-perempuan penenun yang menjaga ingatan kolektif komunitas melalui helai demi helai kain bermakna.`,
    createdAt: '2026-01-25T16:10:00.000Z',
  },
  {
    id: 'buku-08',
    title: 'Psikologi Kebiasaan dan Fokus',
    author: 'Dr. Bagus Santoso',
    category: 'Psikologi',
    year: 2023,
    pages: 280,
    publisher: 'Pustaka Cipta Diri',
    isbn: '978-602-411-091-7',
    coverTheme: 'slate',
    coverMotif: 'compass',
    synopsis:
      'Pendekatan ilmiah berbasis riset kognitif tentang cara membentuk kebiasaan baik tanpa mengandalkan tekad semata, serta strategi memulihkan rentang perhatian di tempat kerja.',
    chapterOneTitle: 'Bab 1: Mengapa Niat Baik Sering Terhenti',
    chapterOneContent: `Setiap awal tahun atau awal bulan, jutaan orang menyusun daftar resolusi yang ambisius: membaca dua puluh buku setahun, berolahraga empat kali sepekan, atau tidur lebih awal setiap malam. Namun dalam waktu tiga minggu, sebagian besar rencana itu perlahan memudar kembali ke pola lama.

Kegagalan tersebut jarang disebabkan oleh kemalasan atau lemahnya karakter pribadi. Ilmu perilaku modern menemukan bahwa lebih dari empat puluh persen tindakan harian kita digerakkan oleh kebiasaan otomatis yang dipicu oleh konteks lingkungan, bukan oleh keputusan sadar yang dipikirkan matang-matang.

Ketika kita berusaha mengubah hidup hanya dengan mengandalkan motivasi, kita sedang bertaruh pada sumber daya mental yang cepat habis di penghujung hari kerja. Sebaliknya, merancang pemicu lingkungan yang sederhana dan memangkas hambatan awal terbukti jauh lebih efektif menjaga konsistensi jangka panjang.

Buku ini memetakan anatomi kebiasaan—mulai dari isyarat, rutinitas, hingga imbalan—dengan contoh praktis yang dapat langsung diterapkan dalam jadwal belajar, bekerja, dan beristirahat sehari-hari.`,
    createdAt: '2026-01-28T08:40:00.000Z',
  },
  {
    id: 'buku-09',
    title: 'Catatan dari Lembah Baliem',
    author: 'Yohanes Tabuni',
    category: 'Budaya',
    year: 2022,
    pages: 254,
    publisher: 'Cenderawasih Press',
    isbn: '978-602-411-104-4',
    coverTheme: 'emerald',
    coverMotif: 'archipelago',
    synopsis:
      'Memoar dan catatan lapangan tentang kehidupan masyarakat pegunungan tengah Papua, sistem pertanian tradisional ubi jalar, solidaritas bakar batu, serta perubahan sosial generasi muda.',
    chapterOneTitle: 'Bab 1: Kabut Pagi di Atas Wamena',
    chapterOneContent: `Menjelang pukul enam pagi, kabut putih masih menyelimuti parit-parit ladang di dasar Lembah Baliem. Dari ketinggian lereng gunung, puncak-puncak atap jerami honai tampak seperti jamur hangat yang mengepulkan asap tipis kayu bakar ke udara pegunungan yang dingin.

Bagi masyarakat lembah, tanah bukanlah komoditas yang diukur dengan sertifikat kertas, melainkan ibu yang memberi makan lintas generasi. Parit drainase yang digali dengan kayu keras membentuk petak-petak ladang ubi jalar yang simetris, sebuah rekayasa pertanian dataran tinggi yang telah bertahan ribuan tahun.

Ketika matahari mulai naik dan kabut tersibak, suara sapaan warga saling bersahutan melintasi pematang. Hari dimulai dengan gotong royong memperbaiki pagar kebun agar babi hutan tidak merusak tanaman muda.

Melalui catatan-catatan harian dalam buku ini, penulis mengajak pembaca melihat Papua dari sudut pandang penghuni lembahnya sendiri—penuh kehangatan keluarga, kearifan ekologi, dan harapan akan pendidikan yang berakar pada jati diri lokal.`,
    createdAt: '2026-02-01T13:00:00.000Z',
  },
  {
    id: 'buku-10',
    title: 'Algoritma untuk Kehidupan Sehari-hari',
    author: 'Dewi Anggraini',
    category: 'Teknologi',
    year: 2024,
    pages: 336,
    publisher: 'Inovasi Aksara Jakarta',
    isbn: '978-602-411-119-8',
    coverTheme: 'indigo',
    coverMotif: 'botanical',
    synopsis:
      'Menjelaskan konsep-konsep ilmu komputer—seperti pencarian optimal, penjadwalan, dan kompromi memori—sebagai kerangka berpikir praktis untuk mengambil keputusan lebih tenang dalam kehidupan nyata.',
    chapterOneTitle: 'Bab 1: Seni Berhenti Mencari yang Terbaik',
    chapterOneContent: `Bayangkan Anda sedang mencari rumah kontrakan baru di kota yang padat, atau memilih kandidat terbaik untuk posisi penting di tim kerja. Setiap kali melihat satu pilihan yang cukup baik, muncul pertanyaan klasik: apakah lebih baik langsung mengambil pilihan ini, atau terus mencari dengan harapan menemukan yang lebih sempurna?

Dalam ilmu komputer, persoalan tersebut dikenal sebagai masalah penghentian optimal. Secara matematis, meninjau tanpa batas justru membuat peluang terbaik terlewatkan, sedangkan memutuskan terlalu cepat berisiko mengabaikan opsi yang jauh lebih unggul.

Aturan tiga puluh tujuh persen memberikan panduan yang mengejutkan namun menenangkan: gunakan sepertiga awal waktu atau kuota pengamatan untuk mengenali standar yang ada tanpa berkomitmen, lalu pilih opsi pertama setelahnya yang melampaui semua kandidat sebelumnya.

Melalui berbagai kisah nyata tanpa rumus yang menakutkan, buku ini menunjukkan bagaimana logika algoritmik dapat membantu kita merapikan lemari, mengatur prioritas tugas harian, hingga berdamai dengan ketidakpastian.`,
    createdAt: '2026-02-04T17:30:00.000Z',
  },
];
