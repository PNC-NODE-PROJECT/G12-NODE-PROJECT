const containSignIn = document.querySelector('.contain-sign-in');
const containSignUp = document.querySelector('.contain-sign-up');
const login = document.querySelector('#sign-in');
const goToSignUp = document.querySelector('.go-sign-up');
const goToSignIn = document.querySelector('.go-sign-in');
const sign_up = document.querySelector('#sign-up');
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
goToSignUp.addEventListener("click", showSignUp);
goToSignIn.addEventListener('click', showLogin);

