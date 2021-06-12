
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify(
                {
                    email, 
                    password
                }
                ),
                headers: 
                {
                    'Content-Type': 'application/json'
                },
            });

            if(response.ok) {
            document.location.replace('/profile');
            } else {      
                alert('Failed to log in');
            }
        }
    };

async function signupFormHandler(event) {
        event.preventDefault();
    
        const username = document.querySelector('#username-signup').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
    
        if(username && email && password) {
            const response = await fetch('/api/users', {
                method: 'post',
                body: JSON.stringify({username, email, password}),
                headers: {'Content-Type': 'application/json'},
            });
    
            if(response.ok) {
                console.log('success');
                document.location.replace('/profile');
            } else {
                alert('Failed to sing up.');
            }
        }
    };


async function loadLogin() {
    console.log("connected");
    let login = document.querySelector('.login-form');

    console.log(login);

    login.addEventListener('submit', loginFormHandler);
};

async function loadSignUp() {
    console.log("connected");
    let signUp = document.querySelector('.signup-form');

    console.log(signUp);
    signUp.addEventListener('submit', signupFormHandler);
};


loadLogin();
loadSignUp();