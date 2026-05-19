// ===== RESUME FORM =====
const form = document.getElementById("resume-form");
const results = document.getElementById("results");
const jobDescriptionInput = document.getElementById("job-description");
const promptInput = document.getElementById("prompt");
const resumeInput = document.getElementById("resume");

// Validate job description on blur/input
jobDescriptionInput.addEventListener("blur", function () {
  const errorElement = getOrCreateErrorElement(jobDescriptionInput);
  const jobDescription = jobDescriptionInput.value.trim();
  
  if (!jobDescription) {
    errorElement.textContent = "Job description is required.";
    errorElement.style.display = "block";
  } else {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});

jobDescriptionInput.addEventListener("input", function () {
  const errorElement = getOrCreateErrorElement(jobDescriptionInput);
  if (errorElement.textContent) {
    const jobDescription = jobDescriptionInput.value.trim();
    if (jobDescription) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }
});

// Validate resume file on change
resumeInput.addEventListener("change", function () {
  const errorElement = getOrCreateErrorElement(resumeInput);
  const uploadedFile = resumeInput.files[0];
  
  if (!uploadedFile) {
    errorElement.textContent = "Please upload a resume file.";
    errorElement.style.display = "block";
  } else if (uploadedFile.type !== "application/pdf") {
    errorElement.textContent = "Please upload a valid PDF file.";
    errorElement.style.display = "block";
  } else {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});

// Handle resume form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const jobDescription = jobDescriptionInput.value.trim();
  const prompt = promptInput.value.trim();
  const uploadedFile = resumeInput.files[0];

  const jobDescriptionError = getOrCreateErrorElement(jobDescriptionInput);
  const resumeError = getOrCreateErrorElement(resumeInput);
  
  results.className = "";
  let hasError = false;

  if (!jobDescription) {
    jobDescriptionError.textContent = "Job description is required.";
    jobDescriptionError.style.display = "block";
    hasError = true;
  } else {
    jobDescriptionError.textContent = "";
    jobDescriptionError.style.display = "none";
  }

  if (!uploadedFile) {
    resumeError.textContent = "Please upload a resume file.";
    resumeError.style.display = "block";
    hasError = true;
  } else if (uploadedFile.type !== "application/pdf") {
    resumeError.textContent = "Please upload a valid PDF file.";
    resumeError.style.display = "block";
    hasError = true;
  } else {
    resumeError.textContent = "";
    resumeError.style.display = "none";
  }

  if (hasError) {
    return;
  }

  results.textContent = `Resume submitted: ${uploadedFile.name}.\nJob description length: ${jobDescription.length} characters.`;
  if (prompt) {
    results.textContent += ` Prompt: ${prompt}`;
  }
  results.classList.add("success");

  console.log("Job description:", jobDescription);
  console.log("Prompt:", prompt);
  console.log("Uploaded filename:", uploadedFile.name);
});

// Helper: create/get error element
function getOrCreateErrorElement(inputElement) {
  let errorElement = inputElement.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
  }
  return errorElement;
}

// Helper: validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper: validate password
function isValidPassword(password) {
  return password.length >= 8;
}

// Helper: validate username
function isValidUsername(username) {
  return username.length >= 3;
}

// ===== REGISTER FORM =====
const registerForm = document.getElementById("register-form");
const registerNameInput = document.getElementById("register-name");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");

// Validate name on blur/input
registerNameInput.addEventListener("blur", function () {
  const errorElement = getOrCreateErrorElement(registerNameInput);
  const name = registerNameInput.value.trim();
  
  if (!name) {
    errorElement.textContent = "Name is required.";
    errorElement.style.display = "block";
  } else if (!isValidUsername(name)) {
    errorElement.textContent = "Name must be at least 3 characters.";
    errorElement.style.display = "block";
  } else {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});

registerNameInput.addEventListener("input", function () {
  const errorElement = getOrCreateErrorElement(registerNameInput);
  if (errorElement.textContent) {
    const name = registerNameInput.value.trim();
    if (name && isValidUsername(name)) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }
});

// Validate email on blur/input
registerEmailInput.addEventListener("blur", function () {
  const errorElement = getOrCreateErrorElement(registerEmailInput);
  const email = registerEmailInput.value.trim();
  
  if (!email) {
    errorElement.textContent = "Email is required.";
    errorElement.style.display = "block";
  } else if (!isValidEmail(email)) {
    errorElement.textContent = "Please enter a valid email address.";
    errorElement.style.display = "block";
  } else {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});

registerEmailInput.addEventListener("input", function () {
  const errorElement = getOrCreateErrorElement(registerEmailInput);
  if (errorElement.textContent) {
    const email = registerEmailInput.value.trim();
    if (email && isValidEmail(email)) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }
});

// Validate password on blur/input
registerPasswordInput.addEventListener("blur", function () {
  const errorElement = getOrCreateErrorElement(registerPasswordInput);
  const password = registerPasswordInput.value;
  
  if (!password) {
    errorElement.textContent = "Password is required.";
    errorElement.style.display = "block";
  } else if (!isValidPassword(password)) {
    errorElement.textContent = "Password must be at least 8 characters.";
    errorElement.style.display = "block";
  } else {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});

registerPasswordInput.addEventListener("input", function () {
  const errorElement = getOrCreateErrorElement(registerPasswordInput);
  if (errorElement.textContent) {
    const password = registerPasswordInput.value;
    if (password && isValidPassword(password)) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }
});

// Handle register form submission
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const name = registerNameInput.value.trim();
  const email = registerEmailInput.value.trim();
  const password = registerPasswordInput.value;
  
  const nameError = getOrCreateErrorElement(registerNameInput);
  const emailError = getOrCreateErrorElement(registerEmailInput);
  const passwordError = getOrCreateErrorElement(registerPasswordInput);
  
  let hasError = false;
  
  if (!name) {
    nameError.textContent = "Name is required.";
    nameError.style.display = "block";
    hasError = true;
  } else if (!isValidUsername(name)) {
    nameError.textContent = "Name must be at least 3 characters.";
    nameError.style.display = "block";
    hasError = true;
  } else {
    nameError.textContent = "";
    nameError.style.display = "none";
  }
  
  if (!email) {
    emailError.textContent = "Email is required.";
    emailError.style.display = "block";
    hasError = true;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.display = "block";
    hasError = true;
  } else {
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
      emailError.textContent = "This email is already registered.";
      emailError.style.display = "block";
      hasError = true;
    } else {
      emailError.textContent = "";
      emailError.style.display = "none";
    }
  }
  
  if (!password) {
    passwordError.textContent = "Password is required.";
    passwordError.style.display = "block";
    hasError = true;
  } else if (!isValidPassword(password)) {
    passwordError.textContent = "Password must be at least 8 characters.";
    passwordError.style.display = "block";
    hasError = true;
  } else {
    passwordError.textContent = "";
    passwordError.style.display = "none";
  }
  
  if (!hasError) {
    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    
    console.log("User registered:", name, email);
    alert("Registration successful! You can now login.");
    
    // Clear form
    registerForm.reset();
  }
});

// ===== LOGIN FORM =====
const loginForm = document.getElementById("login-form");
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");

// Validate email on blur/input
loginEmailInput.addEventListener("blur", function () {
  const errorElement = getOrCreateErrorElement(loginEmailInput);
  const email = loginEmailInput.value.trim();
  
  if (!email) {
    errorElement.textContent = "Email is required.";
    errorElement.style.display = "block";
  } else if (!isValidEmail(email)) {
    errorElement.textContent = "Please enter a valid email address.";
    errorElement.style.display = "block";
  } else {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});

loginEmailInput.addEventListener("input", function () {
  const errorElement = getOrCreateErrorElement(loginEmailInput);
  if (errorElement.textContent) {
    const email = loginEmailInput.value.trim();
    if (email && isValidEmail(email)) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }
});

// Validate password on blur/input
loginPasswordInput.addEventListener("blur", function () {
  const errorElement = getOrCreateErrorElement(loginPasswordInput);
  const password = loginPasswordInput.value;
  
  if (!password) {
    errorElement.textContent = "Password is required.";
    errorElement.style.display = "block";
  } else if (!isValidPassword(password)) {
    errorElement.textContent = "Password must be at least 8 characters.";
    errorElement.style.display = "block";
  } else {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});

loginPasswordInput.addEventListener("input", function () {
  const errorElement = getOrCreateErrorElement(loginPasswordInput);
  if (errorElement.textContent) {
    const password = loginPasswordInput.value;
    if (password && isValidPassword(password)) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }
});

// Handle login form submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value;
  
  const emailError = getOrCreateErrorElement(loginEmailInput);
  const passwordError = getOrCreateErrorElement(loginPasswordInput);
  
  let hasError = false;
  
  if (!email) {
    emailError.textContent = "Email is required.";
    emailError.style.display = "block";
    hasError = true;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.display = "block";
    hasError = true;
  } else {
    emailError.textContent = "";
    emailError.style.display = "none";
  }
  
  if (!password) {
    passwordError.textContent = "Password is required.";
    passwordError.style.display = "block";
    hasError = true;
  } else if (!isValidPassword(password)) {
    passwordError.textContent = "Password must be at least 8 characters.";
    passwordError.style.display = "block";
    hasError = true;
  } else {
    passwordError.textContent = "";
    passwordError.style.display = "none";
  }
  
  if (!hasError) {
    // Check credentials against stored users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      console.log("Login successful for:", user.name);
      alert(`Welcome back, ${user.name}!`);
      loginForm.reset();
    } else {
      alert("Invalid email or password. Please try again or register first.");
    }
  }
});
