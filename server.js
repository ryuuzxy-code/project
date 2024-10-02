const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const upload = multer({ dest: 'upluads/' }); // Untuk menangani pengunggahan file

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Tambahkan middleware CORS
router.use(cors({
      origin: 'http://localhost:3000', // Ganti dengan port frontend Anda
      methods: ['GET', 'POST'],
      credentials: true
  
    // jika yang di gunakan adalah ip
    //origin: 'http://192.168.1.10', // Ganti dengan alamat IP frontend Anda
    //methods: ['GET', 'POST'], // Metode yang diizinkan
  }));

// Endpoint untuk mengirim email
router.post('http://localhost:3000/send-email', upload.single('Bukti'), async (req, res) => {
  const { nama, nisn, nomor, kelas, pesan } = req.body;
  const { filename } = req.file;
  
  const emailBody = `
    Nama Siswa: ${nama}
    NISN Siswa: ${nisn}
    Nomor WA: ${nomor}
    Kelas/Jurusan: ${kelas}

    Isi Pengaduan:
    ${pesan}
  `;

  // Konfigurasi transporter Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'vgknfzhhc@gmail.com',
      pass: 'bskaaflbydsqyihh' // Isi dengan password aplikasi Gmail
    },
    from: 'vgknfzhhc@gmail.com'
  });

  const mailOptions = {
    from: 'vgknfzhhc@gmail.com',
    to: 'aldiansyah9342@gmail.com',
    subject: 'Pengaduan Baru',
    text: emailBody,
    attachments: [{
      filename: filename,
      path: `upluods/${filename}`,
      contentType: 'image/jpeg'
    }]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Pengaduan berhasil dikirim.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Terjadi kesalahan saat mengirim pengaduan.');
  }
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
router.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
