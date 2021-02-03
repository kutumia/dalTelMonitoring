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


module.exports.ddlogin=async(req,res)=>{
    res.render('dd/login', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'' });
    res.send("log");
};

module.exports.ddloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        dd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "dd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/dd/dashboard');
                    }
                    else{
                        return res.status(200).render('dd/login', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('dd/login', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Please provide a username and password' });
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

module.exports.ddDashboard = async(req,res) => {
    console.log("dddashboard",res.locals.type);
    res.render('dd/dashboard', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.ddsignup=async(req,res)=>{

        res.render('dd/signup', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'' });
   
};
module.exports.ddsignuppost=async(req,res)=>{
    try {
        const{district,uname,password,confirmPassword}=req.body;
        const data = await dd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('dd/signup',{title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'ERROR: The dd is already enrolled!',records: data })
        }
        else if(password !== confirmPassword){
            return res.render('dd/signup',{title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'ERROR: Passwords do not match!' })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createdd = await dd.create({
                    district:district,
                    uname: uname,
                    password:hashedPassword,
                    pdId:1
                })
                res.render('dd/signup',{title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'dd Registered Successfully!' })
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
    res.render('dd/monitoring/dashboardMonitoring', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Welcome' });
};
//dashboard controller


//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {ddId: req.session.user_id}});
        console.log("inside");
        res.render('dd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', upazillas:err });
    }

};
module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/fieldDay/fieldDayYear', { title: 'মাঠ দিবস ',success:'', records: err });
    })

};
module.exports.fieldDayCardOpen = async (req, res) => {
  
    var ddata=await fieldDay.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    console.log("batchNum,year,upazillaID",batchNum,year,upazilla);
    await fieldDay
      .findAll({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // console.log("inside");
        res.render("dd/fieldDay/fieldDayGallery", {
          title: "মাঠ দিবস ",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
    //  records:result
};
//fieldDay controller ends

//farmerTraining controller
module.exports.farmerTraining=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {ddId: req.session.user_id}});
        console.log("inside");
        res.render('dd/farmerTraining/farmerTraining', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/farmerTraining/farmerTraining', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'', upazillas:err });
    }
    //  records:result

};
module.exports.farmerTrainingFilter=async(req,res)=>{
    await farmerTraining.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/farmerTraining/farmerTrainingTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/farmerTraining/farmerTrainingYear', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'', records: err });
    })

};
module.exports.farmerTrainingCardOpen = async (req, res) => {
  
    var ddata=await farmerTraining.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    console.log("batchNum,year,upazillaID",batchNum,year,upazilla);
    await farmerTraining
      .findAll({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // console.log("inside");
        res.render("dd/farmerTraining/farmerTrainingGallery", {
          title: "কৃষক প্রশিক্ষণ তথ্য",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
    //  records:result
};
//farmerTraining controller ends


//farmerPrize controller
module.exports.farmerPrize=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {ddId: req.session.user_id}});
        console.log("inside");
        res.render('dd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:'', upazillas:err });
    }
    //  records:result

};
module.exports.farmerPrizeFilter=async(req,res)=>{
    await farmerPrize.findAll({
        where: {year: req.body.year,upazillaId:req.body.upazilla}
    })
    .then(data => {
        res.render('dd/farmerPrize/farmerPrizeTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/farmerPrize/farmerPrizeYear', { title: 'কৃষক পুরষ্কার তথ্য',success:'', records: err });
    })

};
module.exports.farmerPrizeCardOpen = async (req, res) => {
  
    var ddata=await farmerPrize.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    console.log("batchNum,year,upazillaID",batchNum,year,upazilla);
    await farmerPrize
      .findAll({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // console.log("inside");
        res.render("dd/farmerPrize/farmerPrizeGallery", {
          title: "কৃষক পুরষ্কার তথ্য",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
    //  records:result
};
//farmerPrize controller ends
//saaoTraining controller
module.exports.saaoTraining=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {ddId: req.session.user_id}});
        console.log("inside");
        res.render('dd/saaoTraining/saaoTraining', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/saaoTraining/saaoTraining', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:'', upazillas:err });
    }
    //  records:result

};
module.exports.saaoTrainingFilter=async(req,res)=>{
    await saaoTraining.findAll({
        where: {year: req.body.year,upazillaId:req.body.upazilla}
    })
    .then(data => {
        res.render('dd/saaoTraining/saaoTrainingTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/saaoTraining/saaoTrainingYear', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:'', records: err });
    })

};
module.exports.saaoTrainingCardOpen = async (req, res) => {
  
    var ddata=await saaoTraining.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    console.log("batchNum,year,upazillaID",batchNum,year,upazilla);
    await saaoTraining
      .findAll({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // console.log("inside");
        res.render("dd/saaoTraining/saaoTrainingGallery", {
          title: "এসএএও প্রশিক্ষণ তথ্য",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
    //  records:result
};
//saaoTraining controller ends

//motivational controller
module.exports.motivational=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {ddId: req.session.user_id}});
        console.log("inside");
        res.render('dd/motivational/motivational', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/farmerPrize/farmerPrize', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:'', upazillas:err });
    }
    //  records:result

};
module.exports.motivationalFilter=async(req,res)=>{
    await motivational.findAll({
        where: {year: req.body.year,upazillaId:req.body.upazilla}
    })
    .then(data => {
        res.render('dd/motivational/motivationalTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/motivational/motivationalYear', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:'', records: err });
    })

};
module.exports.motivationalCardOpen = async (req, res) => {
  
    var ddata=await motivational.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    console.log("batchNum,year,upazillaID",batchNum,year,upazilla);
    await motivational
      .findAll({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // console.log("inside");
        res.render("dd/motivational/motivationalGallery", {
          title: "মোটিভেশনাল ট্যুর",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
    //  records:result
};
//motivational controller ends

//review controller
module.exports.review=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {ddId: req.session.user_id}});
        console.log("inside");
        res.render('dd/review/review', { title: 'রিভিউ ডিস্কাশন তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/review/review', { title: 'রিভিউ ডিস্কাশন তথ্য',success:'', upazillas:err });
    }
    //  records:result

};
module.exports.reviewFilter=async(req,res)=>{
    await review.findAll({
        where: {year: req.body.year,upazillaId:req.body.upazilla}
    })
    .then(data => {
        res.render('dd/review/reviewTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/review/reviewYear', { title: 'রিভিউ ডিস্কাশন তথ্য',success:'', records: err });
    })

};
module.exports.reviewCardOpen = async (req, res) => {
  
    var ddata=await review.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    console.log("batchNum,year,upazillaID",batchNum,year,upazilla);
    await review
      .findAll({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // console.log("inside");
        res.render("dd/review/reviewGallery", {
          title: "রিভিউ ডিস্কাশন",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
    //  records:result
};
//review controller ends

//bij controller
module.exports.bij=async(req,res)=>{
    try{
        var upazillass=await upazilla.findAll({where: {ddId: req.session.user_id}});
        console.log("inside");
        res.render('dd/bij/bij', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/bij/bij', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:'', upazillas:err });
    }
    //  records:result

};
module.exports.bijFilter=async(req,res)=>{
    await bij.findAll({
        where: {year: req.body.year,upazillaId:req.body.upazilla}
    })
    .then(data => {
        res.render('dd/bij/bijTable', {records: data} ,function(err, html) {
         res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/bij/bijYear', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:'', records: err });
    })

};
module.exports.bijCardOpen = async (req, res) => {
  
    var ddata=await fieldDay.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    console.log("batchNum,year,upazillaID",batchNum,year,upazilla);
    await bij
      .findAll({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // console.log("inside");
        res.render("dd/bij/bijGallery", {
          title: "বীজ প্রত্যয়ন প্রতিবেদন",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
    //  records:result
};
//bij controller ends

