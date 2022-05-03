
// Fucntion show elemet
export function show (element) {
    element.style.display = 'block';
}

// Fucntion hide elemet
export function hide (element){
    element.style.display = 'none';
}

export const saveDataToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}
export const getDataFromLocalStorage = (key) => {
    let data = localStorage.getItem(key);
    return data
}

export const putUsername = (userId, putName) => {
    axios.get("/users/user/" + userId).then((response) => {
      putName.textContent = response.data[0].username;
    })
}


