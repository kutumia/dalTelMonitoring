const db = require("../models");
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
const Activities = db.activities;

const multer = require("multer");
const path = require("path");
var fs = require('fs');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { request, response } = require("express");
const express = require("express");
//multer controller starts--------------------------------------------------

//multer setup for fieldDay image
var storagefieldDay = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/fieldDay");
  },
  filename: function (req, file, cb) {
    cb(
        null,
        Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadfieldDay = multer({
  storage: storagefieldDay,
}).array("newsUp",12);
exports.uploadfieldDay = uploadfieldDay;

//multer setup for farmerTraining image
var storagefarmerTraining = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/farmerTraining");
  },
  filename: function (req, file, cb) {
    cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadfarmerTraining = multer({
  storage: storagefarmerTraining,
}).array("newsUp");
exports.uploadfarmerTraining = uploadfarmerTraining;

//multer setup for farmerPrize image
var storagefarmerPrize = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/farmerPrize");
  },
  filename: function (req, file, cb) {
    cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadfarmerPrize = multer({
  storage: storagefarmerPrize,
}).array("newsUp");
exports.uploadfarmerPrize = uploadfarmerPrize;

//multer setup for saaoTraining image
var storagesaaoTraining = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/saaoTraining");
  },
  filename: function (req, file, cb) {
    cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadsaaoTraining = multer({
  storage: storagesaaoTraining,
}).array("newsUp");
exports.uploadsaaoTraining = uploadsaaoTraining;

//multer setup for review image
var storagereview = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/review");
  },
  filename: function (req, file, cb) {
    cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadreview = multer({
  storage: storagereview,
}).array("newsUp");
exports.uploadreview = uploadreview;

//multer setup for bij image
var storagebij = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/bij");
  },
  filename: function (req, file, cb) {
    cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadbij = multer({
  storage: storagebij,
}).array("newsUp");
exports.uploadbij = uploadbij;

//multer setup for motivational image
var storagemotivational = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/motivational");
  },
  filename: function (req, file, cb) {
    cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadmotivational = multer({
  storage: storagemotivational,
}).array("newsUp");
exports.uploadmotivational = uploadmotivational;
//multer controller ends----------------------------------------------------

//logIn controller starts---------------------------------------------------
module.exports.upazillatable = async (req, res) => {
  res.json({ message: "hello upazilla" });
};
module.exports.allupazilla = async (req, res) => {
  res.json({ message: "hello upazilla" });
};
module.exports.upazillalogin = async (req, res) => {
  res.render("upazilla/login", {
    title:
        "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
    msg: "",
  });
  res.send("log");
};
module.exports.upazillaloginpost = async (req, res) => {
  try {
    const uname = req.body.uname;
    const password = req.body.password;
    upazilla
        .findAll({ where: { uname: uname } })
        .then((data) => {
          if (data.length > 0) {
            bcrypt.compare(password, data[0].password, function (err, result) {
              if (result == true) {
                req.session.type = "upazilla";
                req.session.user_id = data[0].id;
                const id = req.session.user_id;
                // res.locals.type = req.session.type;
                // res.locals.user_id = req.session.user_id;
                console.log("session=", req.session.type, res.locals);
                // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                //     expiresIn:process.env.JWT_EXPIRES_IN
                // });
                // console.log("the token is :"+)
                res.redirect("/upazilla/dashboard");
              } else {
                return res.status(200).render("upazilla/login", {
                  title:
                      "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
                  msg: "Please provide a username and password",
                });
              }
            });
          } else {
            return res.status(200).render("upazilla/login", {
              title:
                  "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
              msg: "Please provide a username and password",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials.",
          });
        });
  } catch (error) {
    console.log(error);
  }
};
module.exports.upazillaDashboard = async (req, res) => {
  res.render("upazilla/dashboard", {
    title:
        "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
    msg: "Welcome",
  });
};
//logIn controller ends-----------------------------------------------------

//signUp controller starts--------------------------------------------------
module.exports.upazillasignup = async (req, res) => {
  await dd
      .findAll()
      .then((data) => {
        res.render("upazilla/signup", {
          title:
              "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
          msg: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
};
module.exports.upazillasignuppost = async (req, res) => {
  try {
    const { dds, uname,upazillas, password, confirmPassword } = req.body;
    const ddata = await dd.findAll();
    const data = await upazilla.findAll({ where: { uname: uname } });

    if (data.length > 0) {
      res.render("upazilla/signup", {
        title:
            "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
        msg: "ERROR: The upazilla is already enrolled!",
        records: ddata,
      });
    } else if (password !== confirmPassword) {
      res.render("upazilla/signup", {
        title:
            "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
        msg: "ERROR: Passwords do not match!",
        records: ddata,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const createupazilla = await upazilla.create({
          uname: uname,
          upazilla:upazillas,
          password: hashedPassword,
          ddId: dds,
          pdId: 1,
        });
        res.render("upazilla/signup", {
          title:
              "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
          msg: "upazilla Registered Successfully!",
          records: ddata,
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
//signUp controller ends----------------------------------------------------
//dashboard controller
module.exports.dashboardMonitoring = async (req, res) => {
  res.render("upazilla/dashboard", {
    title:
        "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প",
    msg: "Welcome",
  });
};

//fieldDay controller starts------------------------------------------------
// @GET - fieldDay
module.exports.fieldDay = async (req, res) => {
  await fieldDay
    .findAll({
      where: { upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render("upazilla/fieldDay/fieldDay", {
        title: "মাঠ দিবস",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// @GET - fieldDayYear
module.exports.fieldDayYear = async (req, res) => {
  await fieldDay
      .findAll({
        where: { year: req.body.year, upazillaId: req.session.user_id },
      })
      .then((data) => {
        res.render(
          "upazilla/fieldDay/fieldDayTable",
          { records: data },
          function (err, html) {
            res.send(html);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
};
// @GET - /fieldDayCardOpen
module.exports.fieldDayCardOpen = async (req, res) => {
  const ddata=await fieldDay.findByPk(req.params.id)
  var batchNum = ddata.batch;
  var year=ddata.year;
  await fieldDay
    .findOne({
      where: { upazillaId: req.session.user_id, batch:batchNum, year:year },
    })
    .then((data) => {
      res.render("upazilla/fieldDay/fieldDayGallery", {
        title: "মাঠ দিবস",
        success: "",
        records: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// @GET - /fieldDayForm
module.exports.fieldDayForm = async (req, res) => {
  var startRange = "";
  var endRange = "";
  var year = "";
  if (res.locals.moment().format("M") < 7) {
    startRange = res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = res.locals.moment().format("yyyy");
  } else {
    startRange = res.locals.moment().format("yyyy");
    endRange = res.locals.moment().add(1, "year").format("yyyy");
  }

  if(startRange === "2017" && endRange === "2018"){
      year = "2017"
  }
  else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
  }
  else if(startRange === "2019" && endRange === "2020"){
    year = "2019"
  }
  else if(startRange === "2020" && endRange === "2021"){
    year = "2020"
  }
  else if(startRange === "2021" && endRange === "2022"){
    year = "2021"
  }
  else if(startRange === "2022" && endRange === "2023"){
    year = "2022"
  }

  const fieldDayActivities = await Activities.findOne({
    where : {
      upazillaId : req.session.user_id,
      year
    }
  });
  res.render("upazilla/fieldDay/fieldDayForm", {
    title: "মাঠ দিবস",
    msg: "", 
    success: "",
    user_id: req.session.user_id,
    activities: fieldDayActivities
  });
};
// @GET - /fieldDayFormEdit
module.exports.fieldDayFormEdit = async (req, res) => {
  try  {
    var startRange = "";
    var endRange = "";
    var year = "";

    if (res.locals.moment().format("M") < 7) {
      startRange = res.locals.moment().subtract(1, "year").format("yyyy");
      endRange = res.locals.moment().format("yyyy");
    } else {
      startRange = res.locals.moment().format("yyyy");
      endRange = res.locals.moment().add(1, "year").format("yyyy");
    }

    if(startRange === "2017" && endRange === "2018"){
      year = "2017"
    }
    else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
    }
    else if(startRange === "2019" && endRange === "2020"){
      year = "2019"
    }
    else if(startRange === "2020" && endRange === "2021"){
      year = "2020"
    }
    else if(startRange === "2021" && endRange === "2022"){
      year = "2021"
    }
    else if(startRange === "2022" && endRange === "2023"){
      year = "2022"
    }

    const fieldDayActivities = await Activities.findOne({
      where : {
        upazillaId : req.session.user_id,
        year : year
      }
    });
    const editData = await fieldDay.findByPk(req.params.id);
    res.render("upazilla/fieldDay/fieldDayFormEdit", {
      output: editData,
      activities: fieldDayActivities,
      title: "মাঠ-দিবস"
    });
  } catch(err){
    console.log(err);
  }
};
// @POST - fieldDayFormPost
module.exports.fieldDayFormPost = async (req, res) => {
  const activity = await Activities.findOne({
    where : {
      upazillaId : req.body.user_id,
      year : req.body.year
    }
  });
  const path = req.files ;
  if (path) {
    let imageArray = [];
    path.map((image) => {
      const imagePathName = "/upload/fieldDay/" + image.filename;
      imageArray.push(imagePathName)
    })
    var imagePath = JSON.stringify(imageArray);
    const{batch,description,date,year,user_id} = req.body
    var name = `মাঠ দিবস - ${req.body.batch}`;

    if ( !activity ) {
      req.flash("message", "No yet assigned any field day during this year");
      res.redirect("/upazilla/fieldDayForm");
    }
    else{
      if(activity.field_day_done < activity.field_day){
        try{
          await fieldDay
              .create({
                name: name,
                batch:batch,
                description: description,
                date: date,
                year: year,
                image: imagePath,
                upazillaId: user_id,
              });
          let fieldDayValue = activity.field_day_done;
          let incrementedValue = ++fieldDayValue;
          await activity.update(
              {
                field_day_done : incrementedValue
              },
              {
                where: {id : activity.id},
              }
          );
          res.redirect("/upazilla/fieldDay");
        } catch(err) {
          console.log(err);
        }
      }
      else {
        req.flash("message", "Abort !!! Already overloaded !");
        res.redirect("/upazilla/fieldDayForm");
      }
    }


  }else {
    console.log("file not uploaded successfully");
  }
};
// @POST - /fieldDayFormUpdatePost
module.exports.fieldDayFormUpdatePost = async (req, res) => {
  const updatedFieldDay = await fieldDay.findByPk(req.params.id)
  const path = req.files ;
  if (path) {
    let imagePath = JSON.parse(updatedFieldDay.image);

    path.map((image) => {
      imagePath.push ( `/upload/fieldDay/${image.filename}` );
    })

    const {batch,description,date,year,upazillaId} = req.body;
    const name = `মাঠ দিবস - ${req.body.batch}`;
      try{
        await fieldDay
        .update({
            name: name,
            batch:batch,
            description: description,
            date: date,
            year: year,
            image: JSON.stringify(imagePath),
            upazillaId: upazillaId
        },
        { 
          where: {id : req.params.id},
        });

        res.redirect("/upazilla/fieldDay");
      } catch(err) {
        console.log(err);
      }
  } else {
    const {batch,description,date,year,upazillaId} = req.body;
    const name = `মাঠ দিবস - ${req.body.batch}`;
    try{
      await fieldDay
          .update({
                name: name,
                batch:batch,
                description: description,
                date: date,
                year: year,
                upazillaId: upazillaId,
              },
              {
                where: {id : req.params.id},
              });

      res.redirect("/upazilla/fieldDay");
    } catch(err) {
      console.log("activity is not updated", err);
    }
  }

};
// @GET - /fieldDayCardDelete
module.exports.fieldDayCardDelete = async (req, res) => {
  try{
    const deleteData = await fieldDay.findByPk(req.params.id);
    const activity = await Activities.findOne({
      where : {
        upazillaId : deleteData.upazillaId,
        year : req.params.year
      }
    });
    deleteData.destroy();
    let fieldDayValue = activity.field_day_done;
    let decrementedValue = --fieldDayValue;
    await activity.update(
        {
          field_day_done : decrementedValue
        },
        {
          where: {id : activity.id},
        }
    );
    res.redirect("/upazilla/fieldDay");
  } catch(err){
    console.log(err);
  }
};
// @GET - /fieldDayImageDelete
module.exports.fieldDayImageDelete = async (req,res) => {
  try{
    const data = await fieldDay.findByPk(req.params.fieldDayId);
    let images = JSON.parse(data.image);
    fs.unlink("public/"+images[req.params.imageId], function (err) {
      if (err) console.log(err);
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });

    images.splice(req.params.imageId,1)

    await fieldDay.update(
        {
          image : JSON.stringify(images)
        },
        {
          where: {id : req.params.fieldDayId},
        }
    );
    res.redirect("/upazilla/fieldDay");
  } catch(err){
    console.log(err);
  }
}
//fieldDay controller ends --------------------------------------------------

//farmerTraining controller starts ------------------------------------------
//@GET - /farmerTraining
module.exports.farmerTraining = async (req, res) => {
  await farmerTraining
      .findAll({
        where: { upazillaId: req.session.user_id },
      })
      .then((data) => {
        res.render("upazilla/farmerTraining/farmerTraining", {
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
//@GET - /farmerTrainingYear
module.exports.farmerTrainingYear = async (req, res) => {
  await farmerTraining
    .findAll({
      where: { year: req.body.year, upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render(
        "upazilla/farmerTraining/farmerTrainingTable",
        { records: data },
        function (err, html) {
          res.send(html);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    })
}
//@GET - /farmerTrainingCardOpen
module.exports.farmerTrainingCardOpen = async (req, res) => {
  var ddata=await farmerTraining.findByPk(req.params.id)
  var batchNum=ddata.batch;
  var year=ddata.year;
  await farmerTraining
    .findOne({
      where: { upazillaId: req.session.user_id,batch:batchNum,year:year },
    })
    .then((data) => {
      res.render("upazilla/farmerTraining/farmerTrainingGallery", {
        title: "কৃষক প্রশিক্ষণ তথ্য",
        success: "",
        records: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//@GET - /farmerTrainingForm
module.exports.farmerTrainingForm = async (req, res) => {
  var startRange = "";
  var endRange = "";
  var year = "";
  if (res.locals.moment().format("M") < 7) {
    startRange = res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = res.locals.moment().format("yyyy");
  } else {
    startRange = res.locals.moment().format("yyyy");
    endRange = res.locals.moment().add(1, "year").format("yyyy");
  }

  if(startRange === "2017" && endRange === "2018"){
    year = "2017"
  }
  else if(startRange === "2018" && endRange === "2019"){
    year = "2018"
  }
  else if(startRange === "2019" && endRange === "2020"){
    year = "2019"
  }
  else if(startRange === "2020" && endRange === "2021"){
    year = "2020"
  }
  else if(startRange === "2021" && endRange === "2022"){
    year = "2021"
  }
  else if(startRange === "2022" && endRange === "2023"){
    year = "2022"
  }

  const farmerTrainingActivities = await Activities.findOne({
    where : {
      upazillaId : req.session.user_id,
      year
    }
  });
  res.render("upazilla/farmerTraining/farmerTrainingForm", {
    title: "কৃষক প্রশিক্ষণ",
    msg: "",
    success: "",
    user_id: req.session.user_id,
    activities: farmerTrainingActivities
  });
};
//@POST - /farmerTrainingFormPost
module.exports.farmerTrainingFormPost = async (req, res) => {
  const activity = await Activities.findOne({
    where : {
      upazillaId : req.body.user_id,
      year : req.body.year
    }
  });
  const path = req.files;
  if (path) {
    let imageArray = [];
    path.map((image) => {
      const imagePathName = "/upload/farmerTraining/" + image.filename;
      imageArray.push(imagePathName)
    })
    var imagePath = JSON.stringify(imageArray);
    const{batch,description,date,year,user_id} = req.body;
    var name = `কৃষক প্রশিক্ষণ - ${req.body.batch}`;

    if ( !activity ) {
      req.flash("message", "No yet assigned any farmer training during this year");
      res.redirect("/upazilla/farmerTrainingForm");
    }
    else{
      if(activity.farmer_training_done < activity.farmer_training){
        try{
          await farmerTraining
              .create({
                name: name,
                description: description,
                date: date,
                batch: batch,
                year: year,
                image: imagePath,
                upazillaId: user_id,
              });
          let farmerTrainingValue = activity.farmer_training_done;
          let incrementedValue = ++farmerTrainingValue;
          await activity.update(
              {
                farmer_training_done : incrementedValue
              },
              {
                where: {id : activity.id},
              }
          );
          res.redirect("/upazilla/farmerTraining");
        } catch(err){
          console.log("Activities are not updated !", err);
        }
      }
      else {
        req.flash("message", "Abort !!! Already overloaded !");
        res.redirect("/upazilla/farmerTrainingForm");
      }
    }
  } else {
    console.log("file not uploaded successfully");
  }
};
// @GET - /farmerTrainingFormEdit
module.exports.farmerTrainingFormEdit = async (req, res) => {
  try{
    var startRange = "";
    var endRange = "";
    var year = "";

    if (res.locals.moment().format("M") < 7) {
      startRange = res.locals.moment().subtract(1, "year").format("yyyy");
      endRange = res.locals.moment().format("yyyy");
    } else {
      startRange = res.locals.moment().format("yyyy");
      endRange = res.locals.moment().add(1, "year").format("yyyy");
    }

    if(startRange === "2017" && endRange === "2018"){
      year = "2017"
    }
    else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
    }
    else if(startRange === "2019" && endRange === "2020"){
      year = "2019"
    }
    else if(startRange === "2020" && endRange === "2021"){
      year = "2020"
    }
    else if(startRange === "2021" && endRange === "2022"){
      year = "2021"
    }
    else if(startRange === "2022" && endRange === "2023"){
      year = "2022"
    }

    const farmerTrainingActivities = await Activities.findOne({
      where : {
        upazillaId : req.session.user_id,
        year : year
      }
    });
    const editData = await farmerTraining.findByPk(req.params.id);
    res.render("upazilla/farmerTraining/farmerTrainingFormEdit", {
      output: editData,
      activities: farmerTrainingActivities,
      title: "কৃষক প্রশিক্ষণ"
    });
  } catch(err){
    console.log("Error in Edit", err);
  }
};
// @POST - /farmerTrainingFormUpdatePost
module.exports.farmerTrainingFormUpdatePost = async (req, res) => {
const updatedFarmerTraining = await farmerTraining.findByPk(req.params.id)
const path = req.files ;
if (path) {
  let imagePath = JSON.parse(updatedFarmerTraining.image);

  path.map((image) => {
    imagePath.push ( `/upload/farmerTraining/${image.filename}` );
  })

  const {batch,description,date,year,upazillaId} = req.body;
  var name = `কৃষক প্রশিক্ষণ - ${req.body.batch}`;
      try{
        await farmerTraining
        .update({
          name: name,
          batch:batch,
          description: description,
          date: date,
          year: year,
          image: JSON.stringify(imagePath),
          upazillaId: upazillaId,
        },
        { 
          where: {id : req.params.id},
        });        
        res.redirect("/upazilla/farmerTraining");
      } catch(err) {        
        console.log("activity is not updated", err);
      }
  } else {
    const {batch,description,date,year,upazillaId} = req.body;
    var name = `কৃষক প্রশিক্ষণ - ${req.body.batch}`;
    try{
      await farmerTraining
          .update({
                name: name,
                batch:batch,
                description: description,
                date: date,
                year: year,
                upazillaId: upazillaId,
              },
              {
                where: {id : req.params.id},
              });
      res.redirect("/upazilla/farmerTraining");
    } catch(err) {
      console.log("activity is not updated", err);
    }  
  }
};
// @GET - /farmerTrainingCardDelete
module.exports.farmerTrainingCardDelete = async (req, res) => {
  try{
    const deleteData = await farmerTraining.findByPk(req.params.id);
    const activity = await Activities.findOne({
      where : {
        upazillaId : deleteData.upazillaId,
        year : req.params.year
      }
    });
    deleteData.destroy();
    let farmerTrainingValue = activity.farmer_training_done;
    let decrementedValue = --farmerTrainingValue;
    await activity.update(
      {
        farmer_training_done : decrementedValue
      },
      { 
        where: {id : activity.id},
      }
    );
    res.redirect("/upazilla/farmerTraining");
  } catch(err){
    console.log(err);
  }
};
// @GET - /fieldTrainingImageDelete
module.exports.farmerTrainingImageDelete = async (req,res) => {
  try{
    const data = await farmerTraining.findByPk(req.params.farmerTrainingId);
    let images = JSON.parse(data.image);
    fs.unlink("public/"+images[req.params.imageId], function (err) {
      if (err) console.log(err);
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });

    images.splice(req.params.imageId,1)

    await farmerTraining.update(
        {
          image : JSON.stringify(images)
        },
        {
          where: {id : req.params.farmerTrainingId},
        }
    );
    res.redirect("/upazilla/farmerTraining");
  } catch(err){
    console.log(err);
  }
}
//farmerTraining controller ends ----------------------------------

//farmerPrize controller starts------------------------------------
// @GET - /farmerPrize
module.exports.farmerPrize = async (req, res) => {
  await farmerPrize
      .findAll({
        where: { upazillaId: req.session.user_id },
      })
      .then((data) => {
        res.render("upazilla/farmerPrize/farmerPrize", {
          title: "কৃষক পুরষ্কার তথ্য",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
};
// @GET - /farmerPrizeYear
module.exports.farmerPrizeYear = async (req, res) => {
  await farmerPrize
    .findAll({
      where: { year: req.body.year, upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render(
        "upazilla/farmerPrize/farmerPrizeTable",
        { records: data },
        function (err, html) {
          res.send(html);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    })
}
// @GET - /farmerPrizeCardOpen
module.exports.farmerPrizeCardOpen = async (req, res) => {
  var ddata=await farmerPrize.findByPk(req.params.id)
  var batchNum=ddata.batch;
  var year=ddata.year;
  await farmerPrize
    .findOne({
      where: { upazillaId: req.session.user_id,batch:batchNum,year:year },
    })
    .then((data) => {
      res.render("upazilla/farmerPrize/farmerPrizeGallery", {
        title: "কৃষক পুরষ্কার তথ্য",
        success: "",
        records: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// @GET - /farmerPrizeForm
module.exports.farmerPrizeForm = async (req, res) => {
  var startRange = "";
  var endRange = "";
  var year = "";
  if (res.locals.moment().format("M") < 7) {
    startRange = res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = res.locals.moment().format("yyyy");
  } else {
    startRange = res.locals.moment().format("yyyy");
    endRange = res.locals.moment().add(1, "year").format("yyyy");
  }

  if(startRange === "2017" && endRange === "2018"){
    year = "2017"
  }
  else if(startRange === "2018" && endRange === "2019"){
    year = "2018"
  }
  else if(startRange === "2019" && endRange === "2020"){
    year = "2019"
  }
  else if(startRange === "2020" && endRange === "2021"){
    year = "2020"
  }
  else if(startRange === "2021" && endRange === "2022"){
    year = "2021"
  }
  else if(startRange === "2022" && endRange === "2023"){
    year = "2022"
  }
  const farmerPrizeActivities = await Activities.findOne({
    where : {
      upazillaId : req.session.user_id,
      year
    }
  });
  res.render("upazilla/farmerPrize/farmerPrizeForm", {
    title: "কৃষক পুরষ্কার তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
    activities: farmerPrizeActivities
  });
};
// @POST - /farmerPrizeFormPost
module.exports.farmerPrizeFormPost = async (req, res) => {
  const activity = await Activities.findOne({
    where : {
      upazillaId : req.body.user_id,
      year : req.body.year
    }
  });
  const path = req.files ;
  if (path) {
    let imageArray = [];
    path.map((image) => {
      const imagePathName = "/upload/farmerPrize/" + image.filename;
      imageArray.push(imagePathName)
    })
    var imagePath = JSON.stringify(imageArray);
    const{batch,description,date,year,user_id} = req.body;
    var name = `কৃষক পুরষ্কার - ${req.body.batch}`;

    if ( !activity ) {
      req.flash("message", "No yet assigned any farmer training during this year");
      res.redirect("/upazilla/farmerPrizeForm");
    }
    else{
      if(activity.farmer_awards_done < activity.farmer_awards){
        try{
          await farmerPrize
              .create({
                name: name,
                batch:batch,
                description: description,
                date: date,
                year: year,
                image: imagePath,
                upazillaId: user_id,
              })
          let farmerPrizeValue = activity.farmer_awards_done;
          let incrementedValue = ++farmerPrizeValue;
          await activity.update(
              {
                farmer_awards_done : incrementedValue
              },
              {
                where: {id : activity.id},
              }
          );
          res.redirect("/upazilla/farmerPrize");
        } catch(err){
          console.log("Activities are not updated !", err);
        }
      }
      else {
        req.flash("message", "Abort !!! Already overloaded !");
        res.redirect("/upazilla/farmerPrizeForm");
      }
    }
  } else {
    console.log("file not uploaded successfully");
  }
};
// @GET - /farmerPrizeFormEdit
module.exports.farmerPrizeFormEdit = async (req, res) => {
  try{
    var startRange = "";
    var endRange = "";
    var year = "";

    if (res.locals.moment().format("M") < 7) {
      startRange = res.locals.moment().subtract(1, "year").format("yyyy");
      endRange = res.locals.moment().format("yyyy");
    } else {
      startRange = res.locals.moment().format("yyyy");
      endRange = res.locals.moment().add(1, "year").format("yyyy");
    }

    if(startRange === "2017" && endRange === "2018"){
      year = "2017"
    }
    else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
    }
    else if(startRange === "2019" && endRange === "2020"){
      year = "2019"
    }
    else if(startRange === "2020" && endRange === "2021"){
      year = "2020"
    }
    else if(startRange === "2021" && endRange === "2022"){
      year = "2021"
    }
    else if(startRange === "2022" && endRange === "2023"){
      year = "2022"
    }

    const farmerPrizeActivities = await Activities.findOne({
      where : {
        upazillaId : req.session.user_id,
        year : year
      }
    });
    const editData = await farmerPrize.findByPk(req.params.id);
    res.render("upazilla/farmerPrize/farmerPrizeFormEdit", {
      output: editData,
      activities: farmerPrizeActivities,
      title: "কৃষক পুরষ্কার তথ্য"
    });
  } catch(err){
    console.log(err);
  }
};
// @POST - /farmerPrizeFormUpdatePost
module.exports.farmerPrizeFormUpdatePost = async (req, res) => {
  const updatedFarmerPrize= await farmerPrize.findByPk(req.params.id)
  const path = req.files ;
  if (path) {
    let imagePath = JSON.parse(updatedFarmerPrize.image);

    path.map((image) => {
      imagePath.push ( `/upload/farmerPrize/${image.filename}` );
    })

    const {batch,description,date,year,upazillaId} = req.body;
    var name = `কৃষক পুরষ্কার তথ্য- ${req.body.batch}`;
      try{
        await farmerPrize
        .update({
          name: name,
          batch:batch,
          description: description,
          date: date,
          year: year,
          image: JSON.stringify(imagePath),
          upazillaId: upazillaId,
        },
        { 
          where: {id : req.params.id},
        });
        res.redirect("/upazilla/farmerPrize");
      } catch(err){
        console.log("activity is not updated", err);
      }
  } else {
    const {batch,description,date,year,upazillaId} = req.body;
    var name = `মাঠ দিবস - ${req.body.batch}`;
    try{
      await farmerPrize
          .update({
                name: name,
                batch:batch,
                description: description,
                date: date,
                year: year,
                upazillaId: upazillaId,
              },
              {
                where: {id : req.params.id},
              });

      res.redirect("/upazilla/farmerPrize");
    } catch(err) {
      console.log("activity is not updated", err);
    }  }
};
// @GET - /farmerPrizeCardDelete
module.exports.farmerPrizeCardDelete = async (req, res) => {
  try{
    const deleteData = await farmerPrize.findByPk(req.params.id);
    const activity = await Activities.findOne({
      where : {
        upazillaId : deleteData.upazillaId,
        year : req.params.year
      }
    });
    deleteData.destroy();
    let farmerPrizeValue = activity.farmer_awards_done;
    let decrementedValue = --farmerPrizeValue;
    await activity.update(
      {
        farmer_awards_done : decrementedValue
      },
      { 
        where: {id : activity.id},
      }
    );
    res.redirect("/upazilla/farmerPrize");
  } catch(err){
    console.log(err);
  }
};
// @GET - /farmerPrizeImageDelete
module.exports.farmerPrizeImageDelete = async (req,res) => {
  try{
    const data = await farmerPrize.findByPk(req.params.farmerPrizeId);
    let images = JSON.parse(data.image);
    fs.unlink("public/"+images[req.params.imageId], function (err) {
      if (err) console.log(err);
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });

    images.splice(req.params.imageId,1)

    await farmerPrize.update(
        {
          image : JSON.stringify(images)
        },
        {
          where: {id : req.params.farmerPrizeId},
        }
    );
    res.redirect("/upazilla/farmerTraining");
  } catch(err){
    console.log(err);
  }
}
//farmerPrize controller ends------------------------------------------

//saaoTraining controller  starts--------------------------------------
// @GET - /saaoTraining
module.exports.saaoTraining = async (req, res) => {
  await saaoTraining
      .findAll({
        where: { upazillaId: req.session.user_id },
      })
      .then((data) => {
        res.render("upazilla/saaoTraining/saaoTraining", {
          title: "এসএএও প্রশিক্ষণ তথ্য",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
};
// @GET - /saaoTrainingYear
module.exports.saaoTrainingYear = async (req, res) => {
  await saaoTraining
    .findAll({
      where: { year: req.body.year, upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render(
        "upazilla/saaoTraining/saaoTrainingTable",
        { records: data },
        function (err, html) {
          res.send(html);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    })
}
// @GET - /saaoTrainingCardOpen
module.exports.saaoTrainingCardOpen = async (req, res) => {
  
  var ddata=await saaoTraining.findByPk(req.params.id)
  var batchNum=ddata.batch;
  var year=ddata.year;
  await saaoTraining
    .findOne({
      where: { upazillaId: req.session.user_id,batch:batchNum,year:year },
    })
    .then((data) => {
      res.render("upazilla/saaoTraining/saaoTrainingGallery", {
        title: "এসএএও প্রশিক্ষণ তথ্য",
        success: "",
        records: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// @GET - /saaoTrainingForm
module.exports.saaoTrainingForm = async (req, res) => {
  var startRange = "";
  var endRange = "";
  var year = "";
  if (res.locals.moment().format("M") < 7) {
    startRange = res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = res.locals.moment().format("yyyy");
  } else {
    startRange = res.locals.moment().format("yyyy");
    endRange = res.locals.moment().add(1, "year").format("yyyy");
  }

  if(startRange === "2017" && endRange === "2018"){
    year = "2017"
  }
  else if(startRange === "2018" && endRange === "2019"){
    year = "2018"
  }
  else if(startRange === "2019" && endRange === "2020"){
    year = "2019"
  }
  else if(startRange === "2020" && endRange === "2021"){
    year = "2020"
  }
  else if(startRange === "2021" && endRange === "2022"){
    year = "2021"
  }
  else if(startRange === "2022" && endRange === "2023"){
    year = "2022"
  }

  const activity = await Activities.findOne({
    where : {
      upazillaId : req.session.user_id,
      year
    }
  });
  res.render("upazilla/saaoTraining/saaoTrainingForm", {
    title: "এসএএও প্রশিক্ষন",
    msg: "",
    success: "",
    user_id: req.session.user_id,
    activities: activity
  });
};
// @POST - /saaoTrainingFormPost
module.exports.saaoTrainingFormPost = async (req, res) => {
  const activity = await Activities.findOne({
    where : {
      upazillaId : req.body.user_id,
      year : req.body.year
    }
  });
  const path = req.files ;
  if (path) {
    let imageArray = [];
    path.map((image) => {
      const imagePathName = "/upload/saaoTraining/" + image.filename;
      imageArray.push(imagePathName)
    })

    var imagePath = JSON.stringify(imageArray);
    const{batch,description,date,year,user_id} = req.body;
    var name = `এসএএও প্রশিক্ষন - ${req.body.batch}`;

    if ( !activity ){
      req.flash("message", "No yet assigned any saao training during this year");
      res.redirect("/upazilla/saaoTrainingForm");
    }
    else{
      if(activity.saao_training_done < activity.saao_training){
        try{
          await saaoTraining
              .create({
                name: name,
                batch: batch,
                description: description,
                date: date,
                year: year,
                image: imagePath,
                upazillaId: user_id,
              })
          let saaoTrainingValue = activity.saao_training_done;
          let incrementedValue = ++saaoTrainingValue;
          await activity.update(
              {
                saao_training_done : incrementedValue
              },
              {
                where: {id : activity.id},
              }
          );
          res.redirect("/upazilla/saaoTraining");
        } catch(err){
          console.log("activity is not updated", err);
        }
      }
      else {
        req.flash("message", "Abort !!! Already overloaded !");
        res.redirect("/upazilla/saaoTrainingForm");
      }
    }
  } else {
    console.log("file not uploaded successfully");
  }
};
// @GET - /saaoTrainingFormEdit 
module.exports.saaoTrainingFormEdit = async (req,res) => {
  try{
    var startRange = "";
    var endRange = "";
    var year = "";

    if (res.locals.moment().format("M") < 7) {
      startRange = res.locals.moment().subtract(1, "year").format("yyyy");
      endRange = res.locals.moment().format("yyyy");
    } else {
      startRange = res.locals.moment().format("yyyy");
      endRange = res.locals.moment().add(1, "year").format("yyyy");
    }

    if(startRange === "2017" && endRange === "2018"){
      year = "2017"
    }
    else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
    }
    else if(startRange === "2019" && endRange === "2020"){
      year = "2019"
    }
    else if(startRange === "2020" && endRange === "2021"){
      year = "2020"
    }
    else if(startRange === "2021" && endRange === "2022"){
      year = "2021"
    }
    else if(startRange === "2022" && endRange === "2023"){
      year = "2022"
    }

    const saaoTrainingActivities = await Activities.findOne({
      where : {
        upazillaId : req.session.user_id,
        year : year
      }
    });
    const editData = await saaoTraining.findByPk(req.params.id);
    res.render("upazilla/saaoTraining/saaoTrainingFormEdit", {
      output: editData,
      activities: saaoTrainingActivities,
      title: "এসএএও প্রশিক্ষণ তথ্য"
    });
  } catch(err){
    console.log(err);
  }
};
// @POST - /saaoTrainingFormUpdatePost
module.exports.saaoTrainingFormUpdatePost = async (req, res) => {
  const updatedSaaoTraining = await saaoTraining.findByPk(req.params.id)
  const path = req.files ;
  if (path) {
    let imagePath = JSON.parse(updatedSaaoTraining.image);

    path.map((image) => {
      imagePath.push ( `/upload/saaoTraining/${image.filename}` );
    })

    const {batch,description,date,year,upazillaId} = req.body;
    var name = `এসএএও প্রশিক্ষণ তথ্য - ${req.body.batch}`;
      try{
        await saaoTraining
        .update({
            name: name,
            batch:batch,
            description: description,
            date: date,
            year: year,
            image: JSON.stringify(imagePath),
            upazillaId: upazillaId
        },
        { 
          where: {id : req.params.id},
        }
        );
        res.redirect("/upazilla/saaoTraining");
      } catch(err){
        console.log("activity is not updated", err);
      }
  } else {
    const {batch,description,date,year,upazillaId} = req.body;
    var name = `এসএএও প্রশিক্ষণ তথ্য - ${req.body.batch}`;
    try{
      await saaoTraining
          .update({
            name: name,
            batch:batch,
            description: description,
            date: date,
            year: year,
            upazillaId: upazillaId,
          },
          {
            where: {id : req.params.id},
          });
      res.redirect("/upazilla/saaoTraining");
    } catch(err) {
      console.log("activity is not updated", err);
    }
  }
};
// @GET - /saaoTrainingCardDelete
module.exports.saaoTrainingCardDelete = async (req, res) => {
  try{
    const deleteData = await saaoTraining.findByPk(req.params.id);
    const activity = await Activities.findOne({
      where : {
        upazillaId : deleteData.upazillaId,
        year : req.params.year
      }
    });
    deleteData.destroy();
    let saaoTrainingValue = activity.saao_training_done;
    let decrementedValue = --saaoTrainingValue;
    await activity.update(
      {
        saao_training_done : decrementedValue
      },
      { 
        where: {id : activity.id},
      }
    );
    res.redirect("/upazilla/saaoTraining");
  } catch(err){
    console.log(err);
  }
};
// @GET - /fieldTrainingImageDelete
module.exports.saaoTrainingImageDelete = async (req,res) => {
  try{
    const data = await saaoTraining.findByPk(req.params.saaoTrainingId);
    let images = JSON.parse(data.image);
    fs.unlink("public/"+images[req.params.imageId], function (err) {
      if (err) console.log(err);
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });

    images.splice(req.params.imageId,1)

    await saaoTraining.update(
        {
          image : JSON.stringify(images)
        },
        {
          where: {id : req.params.saaoTrainingId},
        }
    );
    res.redirect("/upazilla/saaoTraining");
  } catch(err){
    console.log(err);
  }
}
//saaoTraining controller ends ----------------------------------------

//review controller----------------------------------------------------
// @GET - /review
module.exports.review = async (req, res) => {
  await review
    .findAll({
      where: { upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render("upazilla/review/review", {
        title: "রিভিউ ডিস্কাশন তথ্য",
        success: "",
        records: data,
      });
    }).catch(err => {
      console.log(err);
    });
}; 
// @GET - /reviewYear
module.exports.reviewYear = async (req, res) => {
  await review
    .findAll({
      where: { year: req.body.year, upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render(
        "upazilla/review/reviewTable",
        { records: data },
        function (err, html) {
          res.send(html);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    })
};
// @GET - /reviewCardOpen
module.exports.reviewCardOpen = async (req, res) => {
  var ddata=await review.findByPk(req.params.id)
  var batchNum=ddata.batch;
  var year=ddata.year;
  await review
    .findOne({
      where: { upazillaId: req.session.user_id, batch:batchNum, year:year },
    })
    .then((data) => {
      res.render("upazilla/review/reviewGallery", {
        title: "রিভিউ ডিস্কাশন তথ্য",
        success: "",
        records: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//@GET - /reviewForm
module.exports.reviewForm = async (req, res) => {
  var startRange = "";
  var endRange = "";
  var year = "";

  if (res.locals.moment().format("M") < 7) {
    startRange = res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = res.locals.moment().format("yyyy");
  } else {
    startRange = res.locals.moment().format("yyyy");
    endRange = res.locals.moment().add(1, "year").format("yyyy");
  }

  if(startRange === "2017" && endRange === "2018"){
    year = "2017"
  }
  else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
  }
  else if(startRange === "2019" && endRange === "2020"){
    year = "2019"
  }
  else if(startRange === "2020" && endRange === "2021"){
    year = "2020"
  }
  else if(startRange === "2021" && endRange === "2022"){
    year = "2021"
  }
  else if(startRange === "2022" && endRange === "2023"){
    year = "2022"
  }

  const reviewFormActivities = await Activities.findOne({
    where : {
      upazillaId : req.session.user_id,
      year
    }
  });

  res.render("upazilla/review/reviewForm", {
    title: "রিভিউ ডিস্কাশন তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
    activities: reviewFormActivities
  });
};
// @GET - /reviewFormEdit
module.exports.reviewFormEdit = async (req, res) => {
  try
  {
    var startRange = "";
    var endRange = "";
    var year = "";

    if (res.locals.moment().format("M") < 7) {
      startRange = res.locals.moment().subtract(1, "year").format("yyyy");
      endRange = res.locals.moment().format("yyyy");
    } else {
      startRange = res.locals.moment().format("yyyy");
      endRange = res.locals.moment().add(1, "year").format("yyyy");
    }

    if(startRange === "2017" && endRange === "2018"){
      year = "2017"
    }
    else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
    }
    else if(startRange === "2019" && endRange === "2020"){
      year = "2019"
    }
    else if(startRange === "2020" && endRange === "2021"){
      year = "2020"
    }
    else if(startRange === "2021" && endRange === "2022"){
      year = "2021"
    }
    else if(startRange === "2022" && endRange === "2023"){
      year = "2022"
    }

    const reviewActivities = await Activities.findOne({
      where : {
        upazillaId : req.session.user_id,
        year : year
      }
    });
    const editData = await review.findByPk(req.params.id);
    res.render("upazilla/review/reviewFormEdit", {
      output: editData,
      activities: reviewActivities,
      title: "রিভিউ ডিস্কাশন তথ্য"
    });
  } catch(err){
    console.log(err);
  }
};
// @POST - /reviewFormPost
module.exports.reviewFormPost = async (req, res) => {
  const activity = await Activities.findOne({
    where : {
      upazillaId : req.body.user_id,
      year : req.body.year
    }
  });

  const path = req.files ;
  if (path) {
    let imageArray = [];
    path.map((image) => {
      const imagePathName = "/upload/review/" + image.filename;
      imageArray.push(imagePathName)
    })

    var imagePath = JSON.stringify(imageArray);

    var name = `রিভিউ ডিস্কাশন - ${req.body.batch}`;
    const{batch,description,date,year,user_id} = req.body

    if ( !activity ) {
      req.flash("message", "No yet assigned any field day during this year");
      res.redirect("/upazilla/fieldDayForm");
    }
    else{
      if(activity.review_done < activity.review){
      try{
        await review
          .create({
            name: name,
            description: description,
            date: date,
            batch:batch,
            year: year,
            image: imagePath,
            upazillaId: user_id,
          });
        let reviewValue = activity.review_done;
        let incrementedValue = ++reviewValue;
        await activity.update(
          {
            review_done : incrementedValue
          },
          { 
            where: {id : activity.id},
          }
        );
        res.redirect("/upazilla/review");
      } catch(err){
        console.log("activity is not updated", err);
      }
    } else {
      req.flash("message", "Abort !!! Already overloaded !");
      res.redirect("/upazilla/reviewForm");
    }    
  }

  } else {
    console.log("file not uploaded successfully");
  }
};
// @POST - /reviewFormUpdatePost
module.exports.reviewFormUpdatePost = async (req, res) => {
  const updatedreview = await review.findByPk(req.params.id)
  const path = req.files ;

  if (path) {
    let imagePath = JSON.parse(updatedreview.image);

    path.map((image) => {
      imagePath.push ( `/upload/review/${image.filename}` );
    })

    const {batch,description,date,year,upazillaId} = req.body;
    var name = `রিভিউ ডিস্কাশন তথ্য- ${req.body.batch}`;
      try{
        await review
        .update({
          name: name,
          batch:batch,
          description: description,
          date: date,
          year: year,
          image: JSON.stringify(imagePath),
          upazillaId: upazillaId
        },
        { 
          where: {id : req.params.id},
        });
        res.redirect("/upazilla/review");
      } catch(err){
        console.log("activity is not updated", err);
      }  
  } else {
    const {batch,description,date,year,upazillaId} = req.body;
    var name = `রিভিউ ডিস্কাশন তথ্য- ${req.body.batch}`;
    try{
      await review
        .update({
          name: name,
          batch:batch,
          description: description,
          date: date,
          year: year,
          upazillaId: upazillaId,
        },
        {
          where: {id : req.params.id},
        });

      res.redirect("/upazilla/review");
    } catch(err) {
      console.log("activity is not updated", err);
    }  }
};
// @GET - /reviewCardDelete
module.exports.reviewCardDelete = async (req, res) => {  
  try{
    const deleteData = await review.findByPk(req.params.id);
    const activity = await Activities.findOne({
      where : {
        upazillaId : deleteData.upazillaId,
        year : req.params.year
      }
    });
    deleteData.destroy();
    let reviewValue = activity.review_done;
    let decrementedValue = --reviewValue;
    await activity.update(
      {
        review_done : decrementedValue
      },
      { 
        where: {id : activity.id},
      }
    );
    res.redirect("/upazilla/review");
  } catch(err){
    console.log(err);
  }
}
// @GET - /reviewImageDelete
module.exports.reviewImageDelete = async (req, res) => {
  try{
    const data = await review.findByPk(req.params.reviewId);
    let images = JSON.parse(data.image);
    fs.unlink("public/"+images[req.params.imageId], function (err) {
      if (err) console.log(err);
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });

    images.splice(req.params.imageId,1)

    await review.update(
        {
          image : JSON.stringify(images)
        },
        {
          where: {id : req.params.reviewId},
        }
    );
    res.redirect("/upazilla/review");
  } catch(err){
    console.log(err);
  }
}
//review controller ends-----------------------------------------------

//bij controller-------------------------------------------------------
// @GET - /bij
module.exports.bij = async (req, res) => {
  await bij
      .findAll({
        where: { upazillaId: req.session.user_id },
      })
      .then((data) => {
        res.render("upazilla/bij/bij", {
          title: "বীজ প্রত্যয়ন প্রতিবেদন তথ্য",
          success: "",
          records: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

  //  records:result
};
// @GET - /bijYear
module.exports.bijYear = async (req, res) => {
  await bij
    .findAll({
      where: { year: req.body.year, upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render(
        "upazilla/bij/bijTable",
        { records: data },
        function (err, html) {
          res.send(html);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    })
}
// @GET - /bijCardOpen
module.exports.bijCardOpen = async (req, res) => {
  var ddata=await bij.findByPk(req.params.id)
  var batchNum=ddata.batch;
  var year=ddata.year;
  await bij
    .findOne({
      where: { upazillaId: req.session.user_id,batch:batchNum,year:year },
    })
    .then((data) => {
      res.render("upazilla/bij/bijGallery", {
        title: "বীজ প্রত্যয়ন প্রতিবেদন তথ্য",
        success: "",
        records: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// @GET - /bijForm
module.exports.bijForm = async (req, res) => {
  var startRange = "";
  var endRange = "";
  var year = "";

  if (res.locals.moment().format("M") < 7) {
    startRange = res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = res.locals.moment().format("yyyy");
  } else {
    startRange = res.locals.moment().format("yyyy");
    endRange = res.locals.moment().add(1, "year").format("yyyy");
  }

  if(startRange === "2017" && endRange === "2018"){
    year = "2017"
  }
  else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
  }
  else if(startRange === "2019" && endRange === "2020"){
    year = "2019"
  }
  else if(startRange === "2020" && endRange === "2021"){
    year = "2020"
  }
  else if(startRange === "2021" && endRange === "2022"){
    year = "2021"
  }
  else if(startRange === "2022" && endRange === "2023"){
    year = "2022"
  }

  const bijFormActivities = await Activities.findOne({
    where : {
      upazillaId : req.session.user_id,
      year
    }
  });
  res.render("upazilla/bij/bijForm", {
    title: "বীজ প্রত্যয়ন প্রতিবেদন তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
    activities: bijFormActivities
  });
};
// @GET - /bijFormEdit
module.exports.bijFormEdit = async (req, res) => {
  try
  {
    var startRange = "";
    var endRange = "";
    var year = "";

    if (res.locals.moment().format("M") < 7) {
      startRange = res.locals.moment().subtract(1, "year").format("yyyy");
      endRange = res.locals.moment().format("yyyy");
    } else {
      startRange = res.locals.moment().format("yyyy");
      endRange = res.locals.moment().add(1, "year").format("yyyy");
    }

    if(startRange === "2017" && endRange === "2018"){
      year = "2017"
    }
    else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
    }
    else if(startRange === "2019" && endRange === "2020"){
      year = "2019"
    }
    else if(startRange === "2020" && endRange === "2021"){
      year = "2020"
    }
    else if(startRange === "2021" && endRange === "2022"){
      year = "2021"
    }
    else if(startRange === "2022" && endRange === "2023"){
      year = "2022"
    }

    const bijActivities = await Activities.findOne({
      where : {
        upazillaId : req.session.user_id,
        year : year
      }
    });
    const editData = await bij.findByPk(req.params.id);
    res.render("upazilla/bij/bijFormEdit", {
      output: editData,
      activities: bijActivities,
      title: "বীজ প্রত্যয়ন প্রতিবেদন তথ্য"
    });
  } catch(err){
    console.log(err);
  }
};
// @POST - /bijFormPost
module.exports.bijFormPost = async (req, res) => {

  const activity = await Activities.findOne({
    where : {
      upazillaId : req.body.user_id,
      year : req.body.year
    }
  });  
  const path = req.files ;
  if (path) {
    let imageArray = [];
    path.map((image) => {
      const imagePathName = "/upload/bij/" + image.filename;
      imageArray.push(imagePathName)
    })

    var imagePath = JSON.stringify(imageArray);

    var name = `বীজ প্রত্যয়ন প্রতিবেদন - ${req.body.batch}`;
    const{batch,description,date,year,user_id} = req.body

    if ( !activity ) {
      req.flash("message", "No yet assigned any field day during this year");
      res.redirect("/upazilla/fieldDayForm");
    }
    else {
      if(activity.bij_done <  activity.bij){
        try{
          await bij
            .create({
              name: name,
              description: description,
              date: date,
              year: year,
              batch:batch,
              image: imagePath,
              upazillaId: user_id,
            });
          let bijValue = activity.bij_done;
          let incrementedValue = ++bijValue;
          await activity.update(
            {
              bij_done : incrementedValue
            },
            { 
              where: {id : activity.id},
            }
          );
          res.redirect("/upazilla/bij");
        } catch(err){
          console.log("activity is not updated", err);
        }
      } else {
        req.flash("message", "Abort !!! Already overloaded !");
        res.redirect("/upazilla/bijForm");
      }  
    } 
  }
  else {
    console.log("file not uploaded successfully");
  }
};
// @POST - /bijFormUpdatePost
module.exports.bijFormUpdatePost = async (req, res) => {
  const updatedFarmerTraining = await farmerTraining.findByPk(req.params.id)
  const path = req.files ;
  if (path) {
    let imagePath = JSON.parse(updatedFarmerTraining.image);

    path.map((image) => {
      imagePath.push ( `/upload/farmerTraining/${image.filename}` );
    })

    const {batch,description,date,year,upazillaId} = req.body;
    var name = `বীজ প্রত্যয়ন প্রতিবেদন তথ্য - ${req.body.batch}`;
        try{
          await bij
          .update({
            name: name,
            batch:batch,
            description: description,
            date: date,
            year: year,
            image: JSON.stringify(imagePath),
            upazillaId: upazillaId,
          },
          { 
            where: {id : req.params.id},
          }
          );
          res.redirect("/upazilla/bij");
        } catch(err){
          console.log("activity is not updated", err);
        }  
    } else {
      const {batch,description,date,year,upazillaId} = req.body;
      var name = `বীজ প্রত্যয়ন প্রতিবেদন তথ্য - ${req.body.batch}`;
      try{
        await bij
            .update({
              name: name,
              batch:batch,
              description: description,
              date: date,
              year: year,
              upazillaId: upazillaId,
                },
                {
                  where: {id : req.params.id},
                });

        res.redirect("/upazilla/bij");
      } catch(err) {
        console.log("activity is not updated", err);
      }  }
};
// @GET - /bijCardDelete
module.exports.bijCardDelete = async (req, res) => {   
  try{
    const deleteData = await bij.findByPk(req.params.id);
    const activity = await Activities.findOne({
      where : {
        upazillaId : deleteData.upazillaId,
        year : req.params.year
      }
    });
    deleteData.destroy();
    let bijValue = activity.bij_done;
    let decrementedValue = --bijValue;
    await activity.update(
      {
        bij_done : decrementedValue
      },
      { 
        where: {id : activity.id},
      }
    );
    res.redirect("/upazilla/bij");
  } catch(err){
    console.log(err);
  }
};
// @GET - /bijImageDelete
module.exports.bijImageDelete = async (req, res) => {
  try{
    const data = await bij.findByPk(req.params.bijId);
    let images = JSON.parse(data.image);
    fs.unlink("public/"+images[req.params.imageId], function (err) {
      if (err) console.log(err);
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });

    images.splice(req.params.imageId,1)

    await bij.update(
        {
          image : JSON.stringify(images)
        },
        {
          where: {id : req.params.bijId},
        }
    );
    res.redirect("/upazilla/bij");
  } catch(err){
    console.log(err);
  }
}
//bij controller ends--------------------------------------------------

//motivational controller starts --------------------------------------
// @GET - /motivational
module.exports.motivational = async (req, res) => {
  await motivational
    .findAll({
      where: { upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render("upazilla/motivational/motivational", {
        title: "মোটিভেশনাল ট্যুর তথ্য",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// @GET - /motivationalYear
module.exports.motivationalYear = async (req, res) => {
  await motivational
    .findAll({
      where: { year: req.body.year, upazillaId: req.session.user_id },
    })
    .then((data) => {
      res.render(
        "upazilla/motivational/motivationalTable",
        { records: data },
        function (err, html) {
          res.send(html);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    })
}
// @GET - /motivationalCardOpen
module.exports.motivationalCardOpen = async (req, res) => {  
  var ddata=await motivational.findByPk(req.params.id)
  var batchNum=ddata.batch;
  var year=ddata.year;
  await motivational
    .findOne({
      where: { upazillaId: req.session.user_id, batch:batchNum, year:year },
    })
    .then((data) => {
      res.render("upazilla/motivational/motivationalGallery", {
        title: "মোটিভেশনাল ট্যুর তথ্য",
        success: "",
        records: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// @GET - /motivationalForm
module.exports.motivationalForm = async (req, res) => {
  var startRange = "";
  var endRange = "";
  var year = "";

  if (res.locals.moment().format("M") < 7) {
    startRange = res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = res.locals.moment().format("yyyy");
  } else {
    startRange = res.locals.moment().format("yyyy");
    endRange = res.locals.moment().add(1, "year").format("yyyy");
  }

  if(startRange === "2017" && endRange === "2018"){
      year = "2017"
  }
  else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
  }
  else if(startRange === "2019" && endRange === "2020"){
    year = "2019"
  }
  else if(startRange === "2020" && endRange === "2021"){
    year = "2020"
  }
  else if(startRange === "2021" && endRange === "2022"){
    year = "2021"
  }
  else if(startRange === "2022" && endRange === "2023"){
    year = "2022"
  }

  const motivationalFormActivities = await Activities.findOne({
    where : {
      upazillaId : req.session.user_id,
      year
    }
  });
  res.render("upazilla/motivational/motivationalForm", {
    title: "মোটিভেশনাল ট্যুর তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
    activities: motivationalFormActivities
  });
};
// @GET - /motivationalFormEdit
module.exports.motivationalFormEdit = async (req, res) => {
  try
  {
    var startRange = "";
    var endRange = "";
    var year = "";

    if (res.locals.moment().format("M") < 7) {
      startRange = res.locals.moment().subtract(1, "year").format("yyyy");
      endRange = res.locals.moment().format("yyyy");
    } else {
      startRange = res.locals.moment().format("yyyy");
      endRange = res.locals.moment().add(1, "year").format("yyyy");
    }

    if(startRange === "2017" && endRange === "2018"){
      year = "2017"
    }
    else if(startRange === "2018" && endRange === "2019"){
      year = "2018"
    }
    else if(startRange === "2019" && endRange === "2020"){
      year = "2019"
    }
    else if(startRange === "2020" && endRange === "2021"){
      year = "2020"
    }
    else if(startRange === "2021" && endRange === "2022"){
      year = "2021"
    }
    else if(startRange === "2022" && endRange === "2023"){
      year = "2022"
    }

    const motiationalActivities = await Activities.findOne({
      where : {
        upazillaId : req.session.user_id,
        year : year
      }
    });
    const editData = await motivational.findByPk(req.params.id);
    res.render("upazilla/motivational/motivationalFormEdit", {
      output: editData,
      activities: motiationalActivities,
      title: "মাঠ-দিবস"
    });
  } catch(err){
    console.log(err);
  }
};
// @POST - /motivationalFormPost
module.exports.motivationalFormPost = async (req, res) => {

  const activity = await Activities.findOne({
    where : {
      upazillaId : req.body.user_id,
      year : req.body.year
    }
  });
  const path = req.files ;
  if (path) {
    let imageArray = [];
    path.map((image) => {
      const imagePathName = "/upload/motivational/" + image.filename;
      imageArray.push(imagePathName)
    })

    var imagePath = JSON.stringify(imageArray);
    var name = `মোটিভেশনাল ট্যুর - ${req.body.batch}`;
    const{batch,description,date,year,user_id} = req.body

    if ( !activity ) {
      req.flash("message", "No yet assigned any field day during this year");
      res.redirect("/upazilla/fieldDayForm");
    } else {
      if(activity.motivational_done < activity.motivational){
        try{
          await motivational
          .create({
            name: name,
            description: description,
            date: date,
            batch:batch,
            year: year,
            image: imagePath,
            upazillaId: user_id,
          });
          let motivationalValue = activity.motivational_done;
          let incrementedValue = ++motivationalValue;
          await activity.update(
            {
              motivational_done : incrementedValue
            },
            { 
              where: {id : activity.id},
            }
          );
          res.redirect("/upazilla/motivational");
        } catch(err){
          console.log("Activities are not updated", err);
        }
      } else {
        req.flash("message", "Abort !!! Already overloaded !");
        res.redirect("/upazilla/motivationalForm");
      }
    }  
  } else {
    console.log("file not uploaded successfully");
  }
};
// @POST - /motivationalFormUpdatePost
module.exports.motivationalFormUpdatePost = async (req, res) => {
  const updatedmotivational= await motivational.findByPk(req.params.id)
  const path = req.files ;
  if (path) {
    let imagePath = JSON.parse(updatedmotivational.image);

    path.map((image) => {
      imagePath.push ( `/upload/motivational/${image.filename}` );
    })

    const {batch,description,date,year,upazillaId} = req.body;
    var name = `মোটিভেশনাল ট্যুর তথ্য - ${req.body.batch}`;
        try{
          await motivational
          .update({
            name: name,
            batch:batch,
            description: description,
            date: date,
            year: year,
            image: JSON.stringify(imagePath),
            upazillaId: upazillaId,
          },
          { 
            where: {id : req.params.id},
          }
          );
          res.redirect("/upazilla/motivational");
        } catch(err){
          console.log("Activities are not updated", err);
        }
    } else {
      const {batch,description,date,year,upazillaId} = req.body;
      var name = `মোটিভেশনাল ট্যুর তথ্য - ${req.body.batch}`;
      try{
        await motivational
            .update({
              name: name,
              batch:batch,
              description: description,
              date: date,
              year: year,
              upazillaId: upazillaId,
                },
                {
                  where: {id : req.params.id},
                });

        res.redirect("/upazilla/motivational");
      } catch(err) {
        console.log("activity is not updated", err);
      }  }
};
// @GET - /motivationalCardDelete
module.exports.motivationalCardDelete = async (req, res) => {  
  try{
    const deleteData = await motivational.findByPk(req.params.id);
    const activity = await Activities.findOne({
      where : {
        upazillaId : deleteData.upazillaId,
        year : req.params.year
      }
    });
    deleteData.destroy();
    let motivationalValue = activity.motivational_done;
    let decrementedValue = --motivationalValue;
    await activity.update(
      {
        motivational_done : decrementedValue
      },
      { 
        where: {id : activity.id},
      }
    );
    res.redirect("/upazilla/motivational");
  } catch(err){
    console.log(err);
  }
};
// @GET - /motivationalImageDelete
module.exports.motivationalImageDelete = async (req, res) => {
  try{
    const data = await motivational.findByPk(req.params.motivationalId);
    let images = JSON.parse(data.image);
    fs.unlink("public/"+images[req.params.imageId], function (err) {
      if (err) console.log(err);
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });

    images.splice(req.params.imageId,1)

    await motivational.update(
        {
          image : JSON.stringify(images)
        },
        {
          where: {id : req.params.motivationalId},
        }
    );
    res.redirect("/upazilla/motivational");
  } catch(err){
    console.log(err);
  }
}
