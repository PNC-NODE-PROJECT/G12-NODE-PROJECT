const express = require('express')
const router = express.Router()


// import Task model
const userModel = require("../models/user_models").user;
// const userModel = Data.user;

// Define static route
// router.use(express.static("public"));

// TODO: Define dynamic routes
// Get user data from DB
router.get('/', (req, res)=>{
  userModel.find()
  .then((result)=> {
      res.send(result);
  })
  .catch((error)=>{
      res.send(error);

  });
})
// // add to user
// router.post('/addUser', (req, res)=>{
//   let element =req.body;
//   userModel.create(element)
//   .then((result)=>{
//       res.send(result);
//   })
//   .catch((error)=>{
//       console.log(error);
//   });
// })

// // delete
// router.delete("/deleteuser/:id", (req, res)=>{
//   userModel.deleteOne({_id: req.params.id})
//   .then((result)=>{
//       res.send(result);
//   })
//   .catch((error)=>{
//       console.log(error);
//       res.send(error);
//   });
// })



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