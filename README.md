# Portfolio Website — Calon IT Support & Mahasiswa Teknik Komputer

Website portfolio pribadi premium: dark mode, glassmorphism, animasi smooth,
100% HTML5 + CSS3 + JavaScript murni (tanpa framework), fully responsive.

## Struktur Folder

```
portfolio-website/
├── index.html                     # Halaman utama (semua section)
├── README.md
├── assets/
│   ├── css/
│   │   ├── variables.css          # Design tokens (warna, spacing, dsb)
│   │   ├── style.css              # Reset + layout + komponen
│   │   ├── animations.css         # Keyframes & scroll-reveal utility
│   │   └── responsive.css         # Media query (mobile-first overrides)
│   ├── js/
│   │   ├── main.js                # Loader, navbar, dark mode, scroll progress, back-to-top
│   │   ├── cursor.js               # Custom cursor
│   │   ├── particles.js            # Particle background di Hero
│   │   ├── typing.js               # Typing animation di Hero
│   │   └── scrollReveal.js         # Reveal-on-scroll + animasi progress bar skill
│   ├── images/
│   │   ├── favicon.svg
│   │   ├── profile-placeholder.svg
│   │   ├── cert-placeholder.svg
│   │   └── projects/
│   │       ├── project-1.svg ... project-4.svg
│   └── cv/
│       └── README.txt              # Instruksi menaruh file CV asli Anda
```

## Checklist Sebelum Publish

Cari komentar `<!-- EDIT: ... -->` di `index.html` — semua data placeholder
ada di sana. Yang WAJIB diganti:

- [ ] Nama lengkap (title, hero, footer, JSON-LD, meta tag)
- [ ] Foto profil asli → ganti `assets/images/profile-placeholder.svg` dengan
      foto Anda (`.jpg`/`.png`, disarankan rasio 1:1)
- [ ] File CV asli → taruh di `assets/cv/CV-Nama-Lengkap.pdf`
- [ ] Link Instagram, LinkedIn, GitHub, Email, WhatsApp (ada di Hero, Contact, & Footer)
- [ ] Isi About Me, Experience timeline, dan Certificates sesuai kondisi Anda
- [ ] Gambar project (`assets/images/projects/`) + link Live Demo / Source Code
- [ ] `og:url`, `og:image`, dan `canonical` setelah situs sudah online
      (og:image sebaiknya file `.png` 1200x630px — buat & taruh di
      `assets/images/og-image.png`, karena SVG tidak didukung semua platform
      untuk preview link)

## Menjalankan Secara Lokal

Cukup buka `index.html` langsung di browser, atau jalankan local server (opsional,
lebih akurat untuk simulasi hosting):

```bash
npx serve .
```

## Deploy

**GitHub Pages**
1. Push folder ini ke repository GitHub.
2. Settings → Pages → pilih branch `main` dan folder root.
3. Situs akan aktif di `https://username.github.io/nama-repo/`.

**Netlify**
1. Drag & drop folder ini ke [app.netlify.com/drop](https://app.netlify.com/drop), atau
2. Hubungkan repository GitHub → build command kosong, publish directory `.`

**Vercel**
1. Import repository di [vercel.com/new](https://vercel.com/new)
2. Framework preset: "Other", root directory `.` — tidak perlu build command.

## Kustomisasi Cepat

- **Warna & tema**: ubah variabel di `assets/css/variables.css`
- **Kata di typing animation**: ubah array `words` di `assets/js/typing.js`
- **Tambah sertifikat**: duplikat blok `<article class="cert-card">` di
  section Certificates pada `index.html`
- **Tambah project**: duplikat blok `<article class="project-card">` di
  section Projects
- **Tambah skill**: duplikat blok `.skill-item` di dalam kategori yang sesuai
