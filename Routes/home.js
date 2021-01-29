const express = require('express');
const router = express.Router();
router.get('/',(req,res)=>{
    res.render('index', {title: 'my express App', message: 'welcome to vidly'});
});

module.exports = router;