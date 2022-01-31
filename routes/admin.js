const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Admin');
});

// app.get('/admin',(req,res)=>{
//     const admin = new adminModel({
//         username: 'admin',
//         password: 'admin'
//     });
//     admin.save().then(()=>{
//         res.send('Admin Created');
//     }).catch(()=>{
//         res.send('Admin already exists');
//     })
// });

// app.get('/allAdmin',(req,res)=>{
//     adminModel.find().then(admins=>{
//         res.send(admins);
//     }).catch(()=>{
//         res.send('No admins found');
//     })
// });

module.exports = router;