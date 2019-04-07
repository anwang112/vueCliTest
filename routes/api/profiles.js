//@login &register
const express = require("express")
const router = express.Router()
const keys =require("../../config/keys")
const Profile = require("../../models/Profile")
const passport = require("passport")

//$route GET /api/profiless/test
//@desc 返回json
router.get("/test",(req,res)=>{
    res.json({meg:"profiles works"})
})

//$route POST /api/profiless/add
//@desc 新增
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {}
    if(req.body.type) profileFields.type = req.body.type
    if(req.body.describe) profileFields.describe = req.body.describe
    if(req.body.income) profileFields.income = req.body.income
    if(req.body.expend) profileFields.expend = req.body.expend
    if(req.body.remark) profileFields.remark = req.body.remark
    if(req.body.cash) profileFields.cash = req.body.cash
    
    new Profile(profileFields).save()
        .then(profile=>{
            res.json(profile)
        })

})

//$route GET /api/profiles
//@desc 取得所有資訊
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find()
    .then(profile =>{
        if(!profile){
            res.status(404).json("沒有任何內容")
        }
        return res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

//$route GET /api/profiles/:id
//@desc 取得單筆資訊
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find({_id:req.params.id})
    .then(profile =>{
        if(!profile){
            res.status(404).json("沒有任何內容")
        }
        return res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

//$route POST /api/profiless/edit
//@desc 編輯
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {}
    if(req.body.type) profileFields.type = req.body.type
    if(req.body.describe) profileFields.describe = req.body.describe
    if(req.body.income) profileFields.income = req.body.income
    if(req.body.expend) profileFields.expend = req.body.expend
    if(req.body.remark) profileFields.remark = req.body.remark
    if(req.body.cash) profileFields.cash = req.body.cash
    
    Profile.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
        ).then(profile => res.json(profile))
})
//$route POST /api/profiless/delete
//@desc 刪除
router.delete('/delete/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findByIdAndRemove(
        {_id:req.params.id}
    ).then(profile => {
        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json("刪除失敗"))
})
module.exports = router 