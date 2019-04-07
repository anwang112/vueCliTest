//@login &register
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const jwt = require("jsonwebtoken")
const keys =require("../../config/keys")
const User = require("../../models/User")
const passport = require("passport")

//$route GET /api/users/test
//@desc 返回json
router.get("/test",(req,res)=>{
    res.json({meg:"login works"})
})
//$route POST /api/users/register
//@desc 返回json
router.post("/register",(req,res)=>{
    // console.log(req.body)
    //查詢DB有沒有此email
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(user){
            return res.status(400).json(`${req.body.email}已被註冊`)
        }else{
            var avatar = gravatar.url('req.body.email', {s: '200', r: 'pg', d: 'mm'});
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar,
                identity:req.body.identity
            
            })

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            });
        }
    })
})
//$route POST /api/users/login
//@desc 返回json jwt passport
router.post("/login",(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    //查詢資料褲
    User.findOne({email})
    .then(user => {
        if(!user){
            res.status(404).json("查無此用戶")
        }
        //密碼
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(isMatch){
            //    jwt.sign('規則','加密名','過期時間','箭頭函數')
            const rule ={
                id:user.id,
                name:user.name,
                avatar:user.avatar,
                identity:user.identity
            } 
            jwt.sign(rule,keys.secretOrKeys,{expiresIn:3600 },(err,token)=>{
                if(err) throw err
                res.json({
                    success:true,
                    token:'Bearer '+token

                })
            })
                // res.json({msg:"success"})
            }else{
                return res.status(404).json("密碼錯誤")
            }
        })
        
    })
})
//$route GET /api/users/current
//@desc return current user
router.get('/current',passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    })
})
module.exports = router