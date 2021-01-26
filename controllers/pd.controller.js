const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const upazilla = db.upazilla;
const fieldDay = db.fieldDay;
const farmerTraining = db.farmerTraining;
const farmerPrize = db.farmerPrize;
const saaoTraining = db.saaoTraining;
const review = db.review;
const bij = db.bij;
const motivational = db.motivational;


const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');


module.exports.pdlogin=async(req,res)=>{
    res.render('pd/login', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'' });
    res.send("log");
};

module.exports.pdloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        pd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "pd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/pd/dashboard');
                    }
                    else{
                        return res.status(200).render('pd/login', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('pd/login', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // upazilla.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , upazilla.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //             else{
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('upazilla/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.pdDashboard = async(req,res) => {
    console.log("pddashboard",res.locals.type);
    res.render('pd/dashboard', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'' });
    res.send("log");
};
module.exports.pdsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await pd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('pd/signup',{title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'ERROR: The pd is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('pd/signup',{title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createpd = await pd.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('pd/signup',{title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'pd Registered Successfully!'})
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end


////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////////////////////////////
///////////////////Monitoring?????????????????????/////////
///////////////////////////////////////////////////////////////

//dashboard controller
module.exports.dashboardMonitoring = async(req,res) => {
    console.log("dashboardMonitoring",res.locals.type);
    res.render('pd/dashboardMonitoring', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Welcome' });
};
//dashboard controller


//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:''});
    }
     
    //  records:result

};
module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/fieldDay/fieldDayYear', { title: 'মাঠ দিবস ',success:'', records: err });
    })

};
module.exports.fieldDayDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', upazillas:err });
    }
     

};
//fieldDay controller ends

//farmerTraining controller
module.exports.farmerTraining=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/farmerTraining/farmerTraining', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/farmerTraining/farmerTraining', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:''});
    }
     
    //  records:result

};
module.exports.farmerTrainingFilter=async(req,res)=>{
    await farmerTraining.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/farmerTraining/farmerTrainingTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/farmerTraining/farmerTrainingYear', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'', records: err });
    })

};
module.exports.farmerTrainingDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/demonstration/demonstration', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'', upazillas:err });
    }
     

};
//farmerTraining controller ends

//farmerPrize controller
module.exports.farmerPrize=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:''});
    }
     
     
    //  records:result

};
module.exports.farmerPrizeFilter=async(req,res)=>{
    await farmerPrize.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/farmerPrize/farmerPrizeTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/farmerPrize/farmerPrizeYear', { title: 'কৃষক পুরষ্কার তথ্য',success:'', records: err });
    })

};
module.exports.farmerPrizeDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:'', upazillas:err });
    }
     

};
//farmerPrize controller ends

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:''});
    }
     
    //  records:result

};
module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/fieldDay/fieldDayYear', { title: 'মাঠ দিবস ',success:'', records: err });
    })

};
module.exports.fieldDayDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', upazillas:err });
    }
     

};
//fieldDay controller ends

//farmerTraining controller
module.exports.farmerTraining=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/farmerTraining/farmerTraining', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/farmerTraining/farmerTraining', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:''});
    }
     
    //  records:result

};
module.exports.farmerTrainingFilter=async(req,res)=>{
    await farmerTraining.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/farmerTraining/farmerTrainingTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/farmerTraining/farmerTrainingYear', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'', records: err });
    })

};
module.exports.farmerTrainingDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/demonstration/demonstration', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'', upazillas:err });
    }
     

};
//farmerTraining controller ends

//farmerPrize controller
module.exports.farmerPrize=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:''});
    }
     
     
    //  records:result

};
module.exports.farmerPrizeFilter=async(req,res)=>{
    await farmerPrize.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/farmerPrize/farmerPrizeTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/farmerPrize/farmerPrizeYear', { title: 'কৃষক পুরষ্কার তথ্য',success:'', records: err });
    })

};
module.exports.farmerPrizeDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:'', upazillas:err });
    }
     

};
//farmerPrize controller ends

//saaoTraining controller
module.exports.saaoTraining=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/saaoTraining/saaoTraining', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/saaoTraining/saaoTraining', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:''});
    }
     
     
    //  records:result

};
module.exports.saaoTrainingFilter=async(req,res)=>{
    await saaoTraining.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/saaoTraining/saaoTrainingTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/saaoTraining/saaoTrainingYear', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:'', records: err });
    })

};
module.exports.saaoTrainingDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/saaoTraining/saaoTraining', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:'', upazillas:err });
    }
     

};
//saaoTraining controller ends

//review controller
module.exports.review=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন তথ্য',success:''});
    }
     
     
    //  records:result

};
module.exports.reviewFilter=async(req,res)=>{
    await review.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/review/reviewTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/review/reviewYear', { title: 'রিভিউ ডিস্কাশন তথ্য',success:'', records: err });
    })

};
module.exports.reviewDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন তথ্য',success:'', upazillas:err });
    }
     

};
//review controller ends

//bij controller
module.exports.bij=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/bij/bij', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/bij/bij', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:''});
    }
     
     
    //  records:result

};
module.exports.bijFilter=async(req,res)=>{
    await bij.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/bij/bijTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/bij/bijYear', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:'', records: err });
    })

};
module.exports.bijDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/bij/bij', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:'', upazillas:err });
    }
     

};
//bij controller ends

//motivational controller
module.exports.motivational=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/motivational/motivational', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/motivational/motivational', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:''});
    }
     
     
    //  records:result

};
module.exports.motivationalFilter=async(req,res)=>{
    await motivational.findAll({
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/motivational/motivationalTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/motivational/motivationalYear', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:'', records: err });
    })

};
module.exports.motivationalDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/motivational/motivational', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:'', upazillas:err });
    }
     

};
//motivational controller ends
