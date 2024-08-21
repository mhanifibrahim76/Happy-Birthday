document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form dari submit secara default
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Validasi password
    if (password === "12345") {
        // Simpan username di localStorage agar bisa diambil di halaman utama
        localStorage.setItem("username", username);
        // Arahkan ke halaman utama
        window.location.href = "../index.html";
    } else {
        alert("Password salah. Coba lagi.");
    }
});

