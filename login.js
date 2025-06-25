//created a logic for submit button and signing in 
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // login check
  if (username === "admin" && password === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html"; // redirect to dashboard
  } else {
    alert("Invalid credentials. Try admin/1234");
  }
});
