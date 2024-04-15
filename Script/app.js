document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!confirm("Are you sure you want to register this account?")) return;

    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const user = { username, email, password };

    localStorage.setItem(username, JSON.stringify(user));
    alert('Registration successful');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!confirm("Proceed with login?")) return;

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password) {
        alert('Login successful');
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!confirm("Are you sure you want to update this profile?")) return;

    const username = document.getElementById('updateUsername').value;
    const newEmail = document.getElementById('updateEmail').value;

    if (localStorage.getItem(username)) {
        const user = JSON.parse(localStorage.getItem(username));
        user.email = newEmail;
        localStorage.setItem(username, JSON.stringify(user));
        alert('Email updated successfully');
    } else {
        alert('User not found');
    }
});

document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!confirm("Are you sure you want to delete this account?")) return;

    const username = document.getElementById('deleteUsername').value;

    if (localStorage.getItem(username)) {
        localStorage.removeItem(username);
        alert('User deleted successfully');
    } else {
        alert('User not found');
    }
});
