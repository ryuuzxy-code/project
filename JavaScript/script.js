document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('pengaduanForm');
  const pesanElement = document.getElementById('pesan');

  if (form && pesanElement) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Mencegah pengiriman default

      const formData = new FormData(form); // Mengambil data dari form

      try {
        const response = await fetch('http://localhost:3000/send-email', { // Ganti port jika berbeda
          method: 'POST',
          body: formData
        });        

        if (response.ok) {
          pesanElement.textContent = 'Pengaduan berhasil dikirim';
        } else {
          throw new Error('Pengiriman gagal.');
        }
      } catch (error) {
        console.error('Error:', error);
        pesanElement.textContent = 'Terjadi kesalahan saat mengirim pengaduan';
      }
    });
  } else {
    console.error('Form atau elemen pesan tidak ditemukan');
  }
});
