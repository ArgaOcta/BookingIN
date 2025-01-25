document.addEventListener("DOMContentLoaded", () => {
    // Ambil data pengguna dari localStorage atau inisialisasi dengan pengguna awal
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user", password: "user123", role: "user" },
    ];
  
    // Simpan kembali data ke localStorage jika belum ada
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }
  
    // Form Daftar dan Login
    const daftarForm = document.querySelector("#daftarForm");
    const loginForm = document.querySelector("#loginForm");
  
    // Fungsi untuk Daftar
    if (daftarForm) {
      daftarForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const cekPassword = document.getElementById("cek_password").value.trim();
  
        if (!nama || !email || !username || !password) {
          alert("Semua kolom wajib diisi!");
          return;
        }
  
        if (password !== cekPassword) {
          alert("Password dan konfirmasi password tidak cocok!");
          return;
        }
  
        // Ambil data pengguna dari localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
  
        // Tambahkan pengguna baru ke array
        users.push({ username, password, role: "user" });
  
        // Simpan kembali ke localStorage
        localStorage.setItem("users", JSON.stringify(users));
  
        alert("Pendaftaran berhasil! Anda akan diarahkan ke halaman login.");
        daftarForm.reset();
        window.location.href = "login.html"; // Ganti "login.html" dengan path halaman login Anda
      });
    }
  
    // Fungsi untuk Login
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
  
        // Ambil data pengguna dari localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
  
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
  
        if (!user) {
          alert("Username atau password salah!");
          return;
        }
  
        if (user.role === "admin") {
          alert("Login berhasil sebagai Admin!");
          window.location.href = "admin/kelola_ruangan.html"; // Ganti dengan halaman admin
        } else {
          alert("Login berhasil sebagai User!");
          window.location.href = "user/index_cust.html"; // Ganti dengan halaman user
        }
      });
    }
  });
  