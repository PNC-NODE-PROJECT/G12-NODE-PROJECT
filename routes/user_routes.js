const express = require('express')
const router = express.Router()


// import Task model
const userModel = require("../models/user_models").users;
// const userModel = Data.user;

// Define static route
// router.use(express.static("public"));

// TODO: Define dynamic routes
// Get user data from DB
router.get('/', (req, res) => {
        userModel.find()
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);

            });
    })
    // add to user
router.post('/addUser', (req, res) => {
    let element = req.body;
    userModel.create(element)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
})

// delete
router.delete("/deleteuser/:id", (req, res) => {
    userModel.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});
// user login 
router.post('/login', (req, res) => {
    let userData = req.body;
    let isValid = false;
    userModel.find(userData)
        // .populate("role")
        .then((result) => {
            if (result.length > 0) {
                isValid = true;
                res.send(isValid);
            } else {
                isValid = false;
                res.send(isValid);
            }
        })
})

// user signup
router.post('/signup', (req, res) => {
    let userData = req.body;
    let isValid = false;
    userModel.find(userData)
        // .populate("role")
        .then((result) => {
            console.log(result);
            if (result.length > 0) {
                isValid = true;
                res.send(isValid);
            } else {
                isValid = false;
                res.send(isValid);
            }
        })
})



// // update
// router.put("/updateUser/:id", (req, res) => {
//   let data = req.body
//   console.log({_id: req.params.id},
//     { username: req.body.username},
//     { email:req.body.email},
//     { password: req.body.password})
//   userModel.updateOne({_id: req.params.id},
//     data)
//   .then((result)=>{
//       res.send(result);
//   })
//   .catch((error)=>{
//       console.log(error);
//       res.send(error);
//   });
// });

module.exports = router