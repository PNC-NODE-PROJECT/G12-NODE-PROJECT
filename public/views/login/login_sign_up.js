const containSignIn = document.querySelector('.contain-sign-in');
const containSignUp = document.querySelector('.contain-sign-up');
const login = document.querySelector('#sign-in');
const goToSignUp = document.querySelector('.go-sign-up');
const goToSignIn = document.querySelector('.go-sign-in');
const sign_up = document.querySelector('#sign-up');
const URL = "http://localhost:80"
    // Fucntion show elemet
const show = (element) => {
    element.style.display = 'block';
}

// Fucntion hide elemet
const hide = (element) => {
    element.style.display = 'none';
}

hide(containSignUp)

// Function to hide sign up , show login and  hide login show sign up
const showLogin = () => {
    hide(containSignUp);
    show(containSignIn);
}
const showSignUp = () => {
    hide(containSignIn);
    show(containSignUp);
}

function signUp(e) {
    e.preventDefault();
    let users = {
        username: userName.value,
        email: emailSignup.value,
        password: passwordSignup.value,
    };
    console.log(users);
    if (users != null && passwordSignup.value === passwordConfirm.value) {
        axios.post(URL + "/users/addUser", users)
            .then((response) => {
                console.log(response.data);
            });
    } else {
        confirm("You can't not sign up account ?")
    }
};

function signIn(e) {}

// Get user from form
const emailSignup = document.querySelector('#email_sign_up');
const emailSignin = document.querySelector('#email_sign_in');
const passwordSignin = document.querySelector('#password_sign_in');
const passwordSignup = document.querySelector('#password_sign_up')
const userName = document.querySelector('#username');
const passwordConfirm = document.querySelector('#pass_confirm');
goToSignUp.addEventListener("click", showSignUp);
goToSignIn.addEventListener('click', showLogin);
sign_up.addEventListener("click", signUp);