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

router.get('/user/:id', (req, res) => {
    let id = req.params.id;
        userModel.find({_id:id})
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
            res.send(error);
        });
});
// user login 
router.post('/login', (req, res) => {
    let userData = req.body;
    let userId = null;
    userModel.find(userData)
        .then((result) => {
            if (result.length > 0) {
                userId = result[0]._id;
            } 
            res.send(userId);
        })
})

// user signup
router.post('/signup', (req, res) => {
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


module.exports = router