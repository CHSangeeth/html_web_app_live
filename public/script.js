// Login
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const loginButton = form.querySelector('button');
  const originalText = loginButton.innerHTML;
  
  loginButton.disabled = true;
  loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
  
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: form.username.value,
      password: form.password.value
    })
  }).then(res => res.json()).then(data => {
    if (data.success) {
      if (data.isAdmin) window.location = '/admin';
      else window.location = '/dashboard';
    } else {
      document.getElementById('loginError').innerText = data.error || 'Invalid credentials';
      loginButton.disabled = false;
      loginButton.innerHTML = originalText;
    }
  }).catch(err => {
    document.getElementById('loginError').innerText = 'Connection error. Please try again.';
    loginButton.disabled = false;
    loginButton.innerHTML = originalText;
  });
};

// Register
document.getElementById('registerForm').onsubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const registerButton = form.querySelector('button');
  const originalText = registerButton.innerHTML;
  
  registerButton.disabled = true;
  registerButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
  
  fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: form.username.value,
      whatsapp: form.whatsapp.value,
      password: form.password.value
    })
  }).then(res => res.json()).then(data => {
    if (data.success) {
      // Show success message
      const registerTab = document.getElementById('register-tab');
      registerTab.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
          <h3>Registration Successful!</h3>
          <p>Your account has been created. You can now log in.</p>
          <button type="button" class="auth-btn" onclick="switchToLogin()">
            <i class="fas fa-sign-in-alt"></i> Go to Login
          </button>
        </div>
      `;
    } else {
      document.getElementById('registerError').innerText = data.error || 'Registration failed';
      registerButton.disabled = false;
      registerButton.innerHTML = originalText;
    }
  }).catch(err => {
    document.getElementById('registerError').innerText = 'Connection error. Please try again.';
    registerButton.disabled = false;
    registerButton.innerHTML = originalText;
  });
};

// Function to switch to login tab
function switchToLogin() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  // Activate login tab
  document.querySelector('[data-tab="login"]').classList.add('active');
  document.getElementById('login-tab').classList.add('active');
}

// Initialize tab switching if on the login/register page
if (document.querySelector('.tab-header')) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab + '-tab').classList.add('active');
    });
  });
}