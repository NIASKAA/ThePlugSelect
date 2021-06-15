async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
    });
    
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

async function loggingOut() {
    console.log("connected");
    let signoff = document.querySelector('#logout')
    signoff.addEventListener('click', logout);
};

loggingOut();