  // ✅ دالة إظهار وإخفاء الباسورد
  function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.src = 'https://cdn-icons-png.flaticon.com/512/565/565654.png'; // Eye open
    } else {
      passwordInput.type = 'password';
      eyeIcon.src = 'https://cdn-icons-png.flaticon.com/512/565/565655.png'; // Eye closed
    }
  }

  // ✅ معالجة تسجيل الدخول
  const form = document.getElementById("loginForm");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return; // يتأكد إن العنصر موجود
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // يمنع إعادة تحميل الصفحة

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("⚠️ Please enter both email and password.");
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch("https://localhost:5001/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("✅ Login successful!");
        console.log("Server Response:", result);

        localStorage.setItem("token", result.token);

          window.location.href = "/home.html";
      } else {
        const error = await response.text();
        alert("❌ Login failed: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error connecting to the server.");
    }
  });
});


