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

hide(containSignUp)
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

function signUp(e) {
    e.preventDefault();
    let users = {
        username: userName.value,
        email: emailSignup.value,
        password: passwordSignup.value,
    };

    
    let valiEmail=document.getElementById("validationEmail");
    let valiUser=document.getElementById("validationUsername");
    let valiPss=document.getElementById("validationPassword");
    let valiConPass=document.getElementById("validationConPass");
    valiEmail.textContent=""
    valiUser.textContent=""
    valiPss.textContent=""
    valiConPass.textContent=""
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if ((userName.value!="" && passwordSignup.value!="" && passwordConfirm.value!="" && emailSignup.value!="")) {
            if (passwordSignup.value === passwordConfirm.value) {
            } 
             if(emailSignup.value.match(validRegex)){
                if (passwordSignup.value === passwordConfirm.value) {
                    axios.post(URL + "/users/addUser", users)
                    emailSignup.value="";
                    passwordSignup.value="";
                    userName.value="";
                    passwordConfirm.value=""
                        Swal.fire(
                            'Good job!',
                            'Sign up success!',
                            'success'
                            )
                            
                        .then((response) => {
                            console.log(response.data);
                        });
                    }
                } 
    } else{
        
            if(userName.value==""){
                valiUser.textContent="Please complete your username!";
            }
            if(emailSignup.value==""){
                valiEmail.textContent="Please complete your email!";
            }
            if(passwordSignup.value==""){
                valiPss.textContent="Please complete your password!";
            }
            if(passwordConfirm.value==""){
                valiConPass.textContent="Please complete your password confirm!";
            }

        }
    // }
    if(!emailSignup.value.match(validRegex) && emailSignup.value!=""){     
        valiEmail.textContent="Please put '@' in your email!";
    }
     if (!(passwordSignup.value === passwordConfirm.value)) {
        valiConPass.textContent="You confirm password is incorrect!"; 
           }
  
};

function signIn(e) {

}

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