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
const activities = db.activities;

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.pdlogin=async(req,res)=>{
    res.render('pd/login', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'' });
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
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.pdDashboard = async(req,res) => {
    try {
        const ddArray = await dd.findAll({
            include: [upazilla]
        })
        const activityArray = await activities.findAll({
            include: [upazilla]
        })
        res.render('pd/dashboard/dashboard',{ title: 'কার্যক্রম',success:'',activityArray:activityArray , ddArray: ddArray})
    }
    catch (e) {
        console.log(e)
    }
};
module.exports.activityDashboardFilter = async (req,res) => {
    const activityArray = await activities.findAll({
        where : {
            ddId: req.body.dd_id
        },
        include: [upazilla]
    })

    var upazillas = [];
    var activityPercentage = [];

    var totalActivitySum = 0;
    var totalDoneActivitySum = 0;

    activityArray.map((activity,key) => {
        upazillas.push(activity.upazilla.uname);
        totalActivitySum = totalActivitySum + activity.saao_training;
        totalActivitySum = totalActivitySum + activity.field_day;
        totalActivitySum = totalActivitySum + activity.farmer_training;
        totalActivitySum = totalActivitySum + activity.review;
        totalActivitySum = totalActivitySum + activity.farmer_awards;
        totalActivitySum = totalActivitySum + activity.bij;
        totalActivitySum = totalActivitySum + activity.motivational;

        totalDoneActivitySum = totalDoneActivitySum + activity.saao_training_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.field_day_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.farmer_training_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.review_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.farmer_awards_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.bij_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.motivational_done;

        activityPercentage.push( ( (totalDoneActivitySum * 100) / totalActivitySum ).toFixed(2) )
    })

    res.render("pd/dashboard/activityTable", { records: activityArray, xAxis : JSON.stringify(upazillas), yAxis: JSON.stringify(activityPercentage) }, function (err, html) {
            res.send(html);
        }
    );
}
//logIn controller end

//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'' });
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

//dashboard controller
module.exports.dashboardMonitoring = async(req,res) => {
    res.render('pd/dashboardMonitoring', { title: 'কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ',msg:'Welcome' });
};
//dashboard controller

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'',district:districts });
    }
    catch(err){
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:''});
    }
};
module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
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
        var upazillass=await upazilla.findAll({where: {ddId: req.body.district}});
        res.send(upazillass)
    }
    catch(err){
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', upazillas:err });
    }
     

};
module.exports.fieldDayCardOpen = async (req, res) => {
  
    var ddata=await fieldDay.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    await fieldDay
      .findOne({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        res.render("pd/fieldDay/fieldDayGallery", {
          title: "মাঠ দিবস ",
          success: "",
          records: data        });
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
        var districts=await dd.findAll();
        res.render('pd/farmerTraining/farmerTraining', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'',district:districts });
    }
    catch(err){
        res.render('pd/farmerTraining/farmerTraining', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:''});
    }
     
    //  records:result

};
module.exports.farmerTrainingFilter=async(req,res)=>{
    await farmerTraining.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
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
        var upazillass=await upazilla.findAll({where: {ddId: req.body.district}});
        res.send(upazillass)
    }
    catch(err){
        res.render('pd/demonstration/demonstration', { title: 'কৃষক প্রশিক্ষণ তথ্য',success:'', upazillas:err });
    }
     

};
module.exports.farmerTrainingCardOpen = async (req, res) => {
  
    var ddata=await farmerTraining.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    await farmerTraining
      .findOne({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        res.render("pd/farmerTraining/farmerTrainingGallery", {
          title: "কৃষক প্রশিক্ষণ তথ্য",
          success: "",
          records: data       });
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
        var districts=await dd.findAll();
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:'',district:districts });
    }
    catch(err){
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:''});
    }
     
     
    //  records:result

};
module.exports.farmerPrizeFilter=async(req,res)=>{
    await farmerPrize.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
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
        var upazillass=await upazilla.findAll({where: {ddId: req.body.district}});
        res.send(upazillass)
    }
    catch(err){
        res.render('pd/farmerPrize/farmerPrize', { title: 'কৃষক পুরষ্কার তথ্য',success:'', upazillas:err });
    }
     

};
module.exports.farmerPrizeCardOpen = async (req, res) => {
  
    var ddata=await farmerPrize.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    await farmerPrize
      .findOne({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        res.render("pd/farmerPrize/farmerPrizeGallery", {
          title: "কৃষক পুরষ্কার তথ্য",
          success: "",
          records: data
        });
      })
      .catch((err) => {
        console.log(err);
      });
};
//farmerPrize controller ends

//saaoTraining controller
module.exports.saaoTraining=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        res.render('pd/saaoTraining/saaoTraining', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:'',district:districts });
    }
    catch(err){
        res.render('pd/saaoTraining/saaoTraining', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:''});
    }
};
module.exports.saaoTrainingFilter=async(req,res)=>{
    await saaoTraining.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
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
        var upazillass=await upazilla.findAll({where: {ddId: req.body.district}});
        
        res.send(upazillass)
    }
    catch(err){
        
        res.render('pd/saaoTraining/saaoTraining', { title: 'এসএএও প্রশিক্ষণ তথ্য',success:'', upazillas:err });
    }
};
module.exports.saaoTrainingCardOpen = async (req, res) => {
  
    var ddata=await saaoTraining.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    await saaoTraining
      .findOne({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // 
        res.render("pd/saaoTraining/saaoTrainingGallery", {
          title: "এসএএও প্রশিক্ষণ তথ্য",
          success: "",
          records: data
        });
      })
      .catch((err) => {
        console.log(err);
      });
};
//saaoTraining controller ends

//review controller
module.exports.review=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন তথ্য',success:'',district:districts });
    }
    catch(err){
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন তথ্য',success:''});
    }
};
module.exports.reviewFilter=async(req,res)=>{
    await review.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
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
        var upazillass=await upazilla.findAll({where: {ddId: req.body.district}});
        
        res.send(upazillass)
    }
    catch(err){
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন তথ্য',success:'', upazillas:err });
    }
};
module.exports.reviewCardOpen = async (req, res) => {
  
    var ddata=await review.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    
    await review
      .findOne({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        // 
        res.render("pd/review/reviewGallery", {
          title: "রিভিউ ডিস্কাশন",
          success: "",
          records: data        });
      })
      .catch((err) => {
        console.log(err);
      });
};
//review controller ends

//bij controller
module.exports.bij=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        
        res.render('pd/bij/bij', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:'',district:districts });
    }
    catch(err){
        
        res.render('pd/bij/bij', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:''});
    }
};
module.exports.bijFilter=async(req,res)=>{
    await bij.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
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
        var upazillass=await upazilla.findAll({where: {ddId: req.body.district}});
        
        res.send(upazillass)
    }
    catch(err){
        
        res.render('pd/bij/bij', { title: 'বীজ প্রত্যয়ন প্রতিবেদন তথ্য',success:'', upazillas:err });
    }
};
module.exports.bijCardOpen = async (req, res) => {
  
    var ddata=await fieldDay.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    
    await bij
      .findOne({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        res.render("pd/bij/bijGallery", {
          title: "বীজ প্রত্যয়ন প্রতিবেদন",
          success: "",
          records: data
        });
      })
      .catch((err) => {
        console.log(err);
      });
};
//bij controller ends

//motivational controller
module.exports.motivational=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        
        res.render('pd/motivational/motivational', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:'',district:districts });
    }
    catch(err){
        
        res.render('pd/motivational/motivational', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:''});
    }
};
module.exports.motivationalFilter=async(req,res)=>{
    await motivational.findAll({
        where: {year: req.body.year,upazillaId: req.body.upazilla}
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
        var upazillass=await upazilla.findAll({where: {ddId: req.body.district}});
        
        res.send(upazillass)
    }
    catch(err){
        
        res.render('pd/motivational/motivational', { title: 'মোটিভেশনাল ট্যুর তথ্য',success:'', upazillas:err });
    }
};
module.exports.motivationalCardOpen = async (req, res) => {
  
    var ddata=await motivational.findByPk(req.params.id)
    var batchNum=ddata.batch;
    var year=ddata.year;
    var upazilla=ddata.upazillaId;
    
    await motivational
      .findOne({
        where: { upazillaId:upazilla,batch:batchNum,year:year },
      })
      .then((data) => {
        res.render("pd/motivational/motivationalGallery", {
          title: "মোটিভেশনাল ট্যুর",
          success: "",
          records: data        });
      })
      .catch((err) => {
        console.log(err);
      });
};
//motivational controller ends

//activities
module.exports.fetchUpazilla = async(req,res) => {
    try {
        const upazillaArray = await upazilla.findAll({
            where : {
                ddId : req.body.dd_id
            }
        })
        res.send(upazillaArray);
    }
    catch (e) {
        console.log(e)
    }
}
module.exports.filterActivities = async (req,res) => {
    const activityArray = await activities.findAll({
        where : {
            ddId: req.body.dd_id
        },
        include: [upazilla]
    })

    var upazillas = [];
    var activityPercentage = [];

    var totalActivitySum = 0;
    var totalDoneActivitySum = 0;

    activityArray.map((activity,key) => {
        upazillas.push(activity.upazilla.uname);
        totalActivitySum = totalActivitySum + activity.saao_training;
        totalActivitySum = totalActivitySum + activity.field_day;
        totalActivitySum = totalActivitySum + activity.farmer_training;
        totalActivitySum = totalActivitySum + activity.review;
        totalActivitySum = totalActivitySum + activity.farmer_awards;
        totalActivitySum = totalActivitySum + activity.bij;
        totalActivitySum = totalActivitySum + activity.motivational;

        totalDoneActivitySum = totalDoneActivitySum + activity.saao_training_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.field_day_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.farmer_training_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.review_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.farmer_awards_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.bij_done;
        totalDoneActivitySum = totalDoneActivitySum + activity.motivational_done;

        activityPercentage.push( ( (totalDoneActivitySum * 100) / totalActivitySum ).toFixed(2) )
    })

    console.log(upazillas,activityPercentage);

    res.render("pd/activities/activityTable", { records: activityArray, xAxis : JSON.stringify(upazillas), yAxis: JSON.stringify(activityPercentage) }, function (err, html) {
            res.send(html);
        }
    );
}
module.exports.activities = async(req,res) => {
    try {
        const ddArray = await dd.findAll({
            include: [upazilla]
        })
        const activityArray = await activities.findAll({
            include: [upazilla]
        })
        res.render('pd/activities/activities',{ title: 'কার্যক্রম',success:'',activityArray:activityArray , ddArray: ddArray})
    }
    catch (e) {
        console.log(e)
    }
}
module.exports.addActivities = async(req,res) => {
    try{
        const ddArray = await dd.findAll({
            include: [upazilla]
        })
        res.render('pd/activities/activitiesForm',{ title: 'Form',success:'', ddArray: ddArray })
    }
    catch (e) {
        console.log(e)
    }
}
module.exports.postActivities = async (req,res) => {
    try{
        const {saao_training,field_day,farmer_training,review,farmer_awards,bij,motivational,upazillaId,year} = req.body;

        const fieldDayActivities = await activities.findOne({
            where : {
                upazillaId : upazillaId,
                year: year
            }
        });

        if (fieldDayActivities){
            req.flash("message", "Already added in this economic year against this upazilla");
            res.redirect('/pd/addActivities')
        }
        else{
            const upazillaInfo = await upazilla.findByPk(upazillaId)

            const activityPost = await activities.create({
                saao_training,
                field_day,
                farmer_training,
                review,
                farmer_awards,
                bij,
                motivational,
                upazillaId,
                ddId: upazillaInfo.ddId,
                year: year
            })
            req.flash("message", "Added Successfully");
            res.redirect('/pd/activities')
        }
    }
    catch (e) {
        console.log(e)
    }
}
module.exports.editActivity = async (req,res) => {
    try{
        const {id} = req.params;
        const activity = await activities.findByPk(id,{
            include: [upazilla,dd]
        })
        const ddArray = await dd.findAll({
            include: [upazilla]
        })
        res.render('pd/activities/activitiesFormEdit',{ title: 'Form',success:'', ddArray: ddArray, activity: activity })
    }
    catch (e) {
        console.log(e)
    }
}
module.exports.postActivity = async (req,res) => {
    try{
        const {field_exhibition,field_day,farmer_training,agricultural_fair,farmer_awards,llP_distribution,solarlight_trap,upazillaId,year} = req.body;

        var startRange = "";
        var endRange = "";
        if (res.locals.moment().format("M") < 7) {
            startRange = "jul" + "-" + res.locals.moment().subtract(1, "year").format("yyyy");
            endRange = "jul" + "-" + res.locals.moment().format("yyyy");
        } else {
            startRange = "jul" + "-" + res.locals.moment().format("yyyy");
            endRange = "jul" + "-" + res.locals.moment().add(1, "year").format("yyyy");
        }
        const upazillaInfo = await upazilla.findByPk(upazillaId)

        const activityPost = await activities.update(
            {
                field_exhibition,
                field_day,
                farmer_training,
                agricultural_fair,
                farmer_awards,
                llP_distribution,
                solarlight_trap,
                upazillaId,
                ddId: upazillaInfo.ddId,
                year
            },
            {
                where: { id: req.params.id },
            }
        )
        req.flash("message", "Added Successfully");
        res.redirect('/pd/activities')
    }
    catch (e) {
        console.log(e)
    }
}
//activities