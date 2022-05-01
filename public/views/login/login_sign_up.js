const containSignIn = document.querySelector('.contain-sign-in');
const containSignUp = document.querySelector('.contain-sign-up');
const login = document.querySelector('#sign-in');
const goToSignUp = document.querySelector('.go-sign-up');
const goToSignIn = document.querySelector('.go-sign-in');
const sign_up = document.querySelector('#sign-up');
const containHome = document.querySelector('.contain-home');
const URL = "http://localhost:80"
    // Fucntion show elemet
const show = (element) => {
    element.style.display = 'block';
}

// Fucntion hide elemet
const hide = (element) => {
    element.style.display = 'none';
}

hide(containSignUp);
hide(containHome);
// Function to hide sign up , show login and  hide login show sign up
const showLogin = () => {
    hide(containSignUp);
    show(containSignIn);
}
const showSignUp = () => {
    hide(containSignIn);
    show(containSignUp);
}
const loginSuccess = () => {
    show(containHome);
    hide(containSignUp);
    hide(containSignIn);
}

function signUp(e) {
    e.preventDefault();
    let users = {
        username: userName.value,
        email: emailSignup.value,
        password: passwordSignup.value,
    };


    let valiEmail = document.getElementById("validationEmail");
    let valiUser = document.getElementById("validationUsername");
    let valiPss = document.getElementById("validationPassword");
    let valiConPass = document.getElementById("validationConPass");
    valiEmail.textContent = ""
    valiUser.textContent = ""
    valiPss.textContent = ""
    valiConPass.textContent = ""
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   
    if ((userName.value != "" && passwordSignup.value != "" && passwordConfirm.value != "" && emailSignup.value != "")) {
        if (passwordSignup.value === passwordConfirm.value) {}
        if (emailSignup.value.match(validRegex)) {
            if (passwordSignup.value === passwordConfirm.value) {
                let dataOfUsers = { email: emailSignup.value, password: passwordSignup.value };
                axios.post(URL + "/users/signup", dataOfUsers)
                .then((response) => {
                    console.log(response.data);
                    if (response.data==false) {
                        console.log("Login successful !!")

                            axios.post(URL + "/users/addUser", users)
        
                            .then((result => {
                                emailSignup.value = "";
                                passwordSignup.value = "";
                                userName.value = "";
                                passwordConfirm.value = ""
                                Swal.fire(
                                    'Good job!',
                                    'Sign up success!',
                                    'success'
                                )
                            }))
                            showLogin()
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Can not create',
                            text: 'This account already created!',
                            
                          })
                        
                    }
                });

                
            }
        }
    } else {

        if (userName.value == "") {
            valiUser.textContent = "Please complete your username!";
        }
        if (emailSignup.value == "") {
            valiEmail.textContent = "Please complete your email!";
        }
        if (passwordSignup.value == "") {
            valiPss.textContent = "Please complete your password!";
        }
        if (passwordConfirm.value == "") {
            valiConPass.textContent = "Please complete your password confirm!";
        }

    }
    // }
    if (!emailSignup.value.match(validRegex) && emailSignup.value != "") {
        valiEmail.textContent = "Please put '@' in your email!";
    }
    if (!(passwordSignup.value === passwordConfirm.value)) {
        valiConPass.textContent = "You confirm password is incorrect!";
    }

};

function signIn(e) {
    e.preventDefault();
    const emailSignin = document.querySelector('#email_sign_in').value;
    const passwordSignin = document.querySelector('#password_sign_in').value;
    let dataOfUsers = { email: emailSignin, password: passwordSignin };
    let valiEmailLogin = document.getElementById("validationEmailLogin");
    let valiUserLogin = document.getElementById("validationPasswordLogin");
    let validRegexs = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    valiEmailLogin.textContent =""
    valiUserLogin.textContent =""
    if (emailSignin!="" && passwordSignin!=""){
        axios.post(URL + "/users/login", dataOfUsers)
            .then((response) => {
                if (response.data) {
                    console.log("Login successful !!")
                    loginSuccess()
                } else {
                    console.log("Please !! Checked your password and try again !!")
                }
            });

    }else{

        if (emailSignin== "") {
            valiEmailLogin.textContent = "Please complete your email!";
        }
        if (passwordSignin == "") {
            valiUserLogin.textContent = "Please complete your password!";
        }

    }
    if (!emailSignin.match(validRegexs) && emailSignin!= "") {
        valiEmailLogin.textContent = "Please put '@' in your email!";
    }
}

// Get user from form
const emailSignup = document.querySelector('#email_sign_up');
const passwordSignup = document.querySelector('#password_sign_up')
const userName = document.querySelector('#username');
const passwordConfirm = document.querySelector('#pass_confirm');
goToSignUp.addEventListener("click", showSignUp);
goToSignIn.addEventListener('click', showLogin);
sign_up.addEventListener("click", signUp);
login.addEventListener("click", signIn);