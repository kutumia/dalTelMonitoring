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

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { request, response } = require("express");
const express = require("express");

//multer controller starts
//multer setup for fieldDay image
var storagefieldDay = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/fieldDay");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadfieldDay = multer({
  storage: storagefieldDay,
}).single("newsUp");
exports.uploadfieldDay = uploadfieldDay;

//multer setup for farmerTraining image
var storagefarmerTraining = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/farmerTraining");
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
}).single("newsUp");
exports.uploadfarmerTraining = uploadfarmerTraining;

//multer setup for farmerPrize image
var storagefarmerPrize = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/farmerPrize");
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
}).single("newsUp");
exports.uploadfarmerPrize = uploadfarmerPrize;

//multer setup for saaoTraining image
var storagesaaoTraining = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/saaoTraining");
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
}).single("newsUp");
exports.uploadsaaoTraining = uploadsaaoTraining;

//multer setup for review image
var storagereview = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/review");
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
}).single("newsUp");
exports.uploadreview = uploadreview;

//multer setup for bij image
var storagebij = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/bij");
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
}).single("newsUp");
exports.uploadbij = uploadbij;

//multer setup for motivational image
var storagemotivational = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/motivational");
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
}).single("newsUp");
exports.uploadmotivational = uploadmotivational;

//logIn controller start
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
  } catch (error) {
    console.log(error);
  }
};

module.exports.upazillaDashboard = async (req, res) => {
  console.log("upazilladashboard", res.locals.type);
  res.render("upazilla/dashboard", {
    title:
      "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
    msg: "Welcome",
  });
};
//logIn controller end

//signUp controller
module.exports.upazillasignup = async (req, res) => {
  await dd
    .findAll()
    .then((data) => {
      console.log("inside");
      res.render("upazilla/signup", {
        title:
          "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
        msg: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log("outside");
      res.render("upazilla/signup", {
        title:
          "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প ",
        msg: "",
        records: err,
      });
    });
};
module.exports.upazillasignuppost = async (req, res) => {
  try {
    const { dds, uname, password, confirmPassword } = req.body;
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
      console.log(hashedPassword);
      try {
        const createupazilla = await upazilla.create({
          uname: uname,
          password: hashedPassword,
          dd_id: dds,
          pd_id: 1,
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
//signUp controller end

//dashboard controller
module.exports.dashboardMonitoring = async (req, res) => {
  console.log("dashboardMonitoring", res.locals.type);
  res.render("upazilla/dashboard", {
    title:
      "কৃষক পর্যায়ে উন্নতমানের ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প",
    msg: "Welcome",
  });
};
//dashboard controller

//fieldDay controller
module.exports.fieldDay = async (req, res) => {
  
  await fieldDay
    .findAll({
      where: { upazilla: req.session.user_id },
    })
    .then((data) => {
      console.log("inside");
      res.render("upazilla/fieldDay/fieldDay", {
        title: "মাঠ দিবস ",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log("outside");
      res.render("upazilla/fieldDay/fieldDay", {
        title: "মাঠ দিবস ",
        success: "",
        records: err,
      });
    });

  //  records:result
};

module.exports.fieldDayYear = async (req, res) => {
  await fieldDay
    .findAll({
      where: { year: req.body.year, upazilla_id: req.session.user_id },
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
      res.render("upazilla/fieldDay/fieldDayYear", {
        title: "মাঠ দিবস ",
        success: "",
        records: err,
      });
    });
};

//fieldDayForm GET
module.exports.fieldDayForm = async (req, res) => {
  var startRange = "";
  var endRange = "";
  if (res.locals.moment().format("M") < 7) {
    startRange = "jul" + "-" + res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = "jul" + "-" + res.locals.moment().format("yyyy");
  } else {
    startRange = "jul" + "-" + res.locals.moment().format("yyyy");
    endRange = "jul" + "-" + res.locals.moment().add(1, "year").format("yyyy");
  }

  const fieldDayActivities = await Activities.findOne({
    where : {
      upazillaId : req.session.user_id,
      start_time : startRange,
      end_time : endRange,
    }
  });

  res.render("upazilla/fieldDay/fieldDayForm", {
    title: "মাঠ-দিবস",
    msg: "",
    success: "",
    user_id: req.session.user_id,
    activities: fieldDayActivities
  });
};

//fieldDayForm POST
module.exports.fieldDayFormPost = async (req, res) => {
  var startRange = "";
  var endRange = "";
  if (res.locals.moment().format("M") < 7) {
    startRange = "jul" + "-" + res.locals.moment().subtract(1, "year").format("yyyy");
    endRange = "jul" + "-" + res.locals.moment().format("yyyy");
  } else {
    startRange = "jul" + "-" + res.locals.moment().format("yyyy");
    endRange = "jul" + "-" + res.locals.moment().add(1, "year").format("yyyy");
  }

  const activity = await Activities.findOne({
    where : {
      upazillaId : req.body.user_id,
      start_time : startRange,
      end_time : endRange,
    }
  })
  // console.log("activity",activity)

  const path = req.file && req.file.path;
  if (path) {
    var imagePath = "/fieldDay/" + req.file.filename;
    var name = req.body.name;
    var description = req.body.description;
    var date = req.body.date;
    var year = req.body.year;
    var user_id = req.body.user_id;
    await fieldDay
      .create({
        name: name,
        description: description,
        date: date,
        year: year,
        image: imagePath,
        upazilla_id: user_id,
      })
      .then((data) => {
        res.redirect("/upazilla/fieldDay");
        const fieldDayValue = activity.field_day_done;
        const incrementedValue = fieldDayValue++;
        console.log("increment",incrementedValue);
        activity.update(
          {
            field_day_done : incrementedValue
          },
          { 
            where: {id : activity.id},
          }
        );
      })
      .catch((err) => {
        console.log("file not uploaded successfully");
      });      

  } else {
    console.log("file not uploaded successfully");
  }

};
//fieldDay controller ends

//farmerTraining controller
module.exports.farmerTraining = async (req, res) => {
  await farmerTraining
    .findAll({
      where: { upazilla: req.session.user_id },
    })
    .then((data) => {
      console.log("inside");
      res.render("upazilla/farmerTraining/farmerTraining", {
        title: "কৃষক প্রশিক্ষণ তথ্য",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log("outside");
      res.render("upazilla/farmerTraining/farmerTraining", {
        title: "কৃষক প্রশিক্ষণ তথ্য",
        success: "",
        records: err,
      });
    });

  //  records:result
};
module.exports.farmerTrainingYear = async (req, res) => {
  await farmerTraining
    .findAll({
      where: { year: req.body.year, upazilla_id: req.session.user_id },
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
      res.render("upazilla/farmerTraining/farmerTrainingYear", {
        title: "কৃষক প্রশিক্ষণ তথ্য",
        success: "",
        records: err,
      });
    });
};
module.exports.farmerTrainingForm = async (req, res) => {
  res.render("upazilla/farmerTraining/farmerTrainingForm", {
    title: "কৃষক প্রশিক্ষণ",
    msg: "",
    success: "",
    user_id: req.session.user_id,
  });
};
module.exports.farmerTrainingFormPost = async (req, res) => {
  const path = req.file && req.file.path;
  if (path) {
    var imagePath = "/farmerTraining/" + req.file.filename;
    var name = req.body.name;
    var description = req.body.description;
    var date = req.body.date;
    var year = req.body.year;
    var user_id = req.body.user_id;
    await farmerTraining
      .create({
        name: name,
        description: description,
        date: date,
        year: year,
        image: imagePath,
        upazilla_id: user_id,
      })
      .then((data) => {
        res.redirect("/upazilla/farmerTraining");
      })
      .catch((err) => {
        console.log("file not uploaded successfully");
      });
  } else {
    console.log("file not uploaded successfully");
  }
};
//farmerTraining controller ends

//farmerPrize controller
module.exports.farmerPrize = async (req, res) => {
  await farmerPrize
    .findAll({
      where: { upazilla: req.session.user_id },
    })
    .then((data) => {
      console.log("inside");
      res.render("upazilla/farmerPrize/farmerPrize", {
        title: "কৃষক পুরষ্কার তথ্য",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log("outside");
      res.render("upazilla/farmerPrize/farmerPrize", {
        title: "কৃষক পুরষ্কার তথ্য",
        success: "",
        records: err,
      });
    });

  //  records:result
};
module.exports.farmerPrizeYear = async (req, res) => {
  await farmerPrize
    .findAll({
      where: { year: req.body.year, upazilla_id: req.session.user_id },
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
      res.render("upazilla/farmerPrize/farmerPrizeYear", {
        title: "কৃষক পুরষ্কার তথ্য",
        success: "",
        records: err,
      });
    });
};
module.exports.farmerPrizeForm = async (req, res) => {
  res.render("upazilla/farmerPrize/farmerPrizeForm", {
    title: "কৃষক পুরষ্কার তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
  });
};
module.exports.farmerPrizeFormPost = async (req, res) => {
  const path = req.file && req.file.path;
  if (path) {
    var imagePath = "/farmerPrize/" + req.file.filename;
    var name = req.body.name;
    var description = req.body.description;
    var date = req.body.date;
    var year = req.body.year;
    var user_id = req.body.user_id;
    await farmerPrize
      .create({
        name: name,
        description: description,
        date: date,
        year: year,
        image: imagePath,
        upazilla_id: user_id,
      })
      .then((data) => {
        res.redirect("/upazilla/farmerPrize");
      })
      .catch((err) => {
        console.log("file not uploaded successfully");
      });
  } else {
    console.log("file not uploaded successfully");
  }
};
//farmerPrize controller ends

//saaoTraining controller --------------------------------------
module.exports.saaoTraining = async (req, res) => {
  await saaoTraining
    .findAll({
      where: { upazilla: req.session.user_id },
    })
    .then((data) => {
      console.log("inside");
      res.render("upazilla/saaoTraining/saaoTraining", {
        title: "এসএএও প্রশিক্ষণ তথ্য",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log("outside");
      res.render("upazilla/saaoTraining/saaoTraining", {
        title: "এসএএও প্রশিক্ষণ তথ্য",
        success: "",
        records: err,
      });
    });

  //  records:result
};
module.exports.saaoTrainingYear = async (req, res) => {
  await saaoTraining
    .findAll({
      where: { year: req.body.year, upazilla_id: req.session.user_id },
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
      res.render("upazilla/saaoTraining/saaoTrainingYear", {
        title: "এসএএও প্রশিক্ষণ তথ্য",
        success: "",
        records: err,
      });
    });
};
module.exports.saaoTrainingForm = async (req, res) => {
  res.render("upazilla/saaoTraining/saaoTrainingForm", {
    title: "এসএএও প্রশিক্ষণ তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
  });
};
module.exports.saaoTrainingFormPost = async (req, res) => {
  const path = req.file && req.file.path;
  if (path) {
    var imagePath = "/saaoTraining/" + req.file.filename;
    var name = req.body.name;
    var description = req.body.description;
    var date = req.body.date;
    var year = req.body.year;
    var user_id = req.body.user_id;
    await saaoTraining
      .create({
        name: name,
        description: description,
        date: date,
        year: year,
        image: imagePath,
        upazilla_id: user_id,
      })
      .then((data) => {
        res.redirect("/upazilla/saaoTraining");
      })
      .catch((err) => {
        console.log("file not uploaded successfully");
      });
  } else {
    console.log("file not uploaded successfully");
  }
};
//saaoTraining controller ends ----------------------------------

//review controller----------------------------------------------
module.exports.review = async (req, res) => {
  await review
    .findAll({
      where: { upazilla: req.session.user_id },
    })
    .then((data) => {
      console.log("inside");
      res.render("upazilla/review/review", {
        title: "রিভিউ ডিস্কাশন তথ্য",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log("outside");
      res.render("upazilla/review/review", {
        title: "রিভিউ ডিস্কাশন তথ্য",
        success: "",
        records: err,
      });
    });

  //  records:result
};
module.exports.reviewYear = async (req, res) => {
  await review
    .findAll({
      where: { year: req.body.year, upazilla_id: req.session.user_id },
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
      res.render("upazilla/review/reviewYear", {
        title: "রিভিউ ডিস্কাশন তথ্য",
        success: "",
        records: err,
      });
    });
};
module.exports.reviewForm = async (req, res) => {
  res.render("upazilla/review/reviewForm", {
    title: "রিভিউ ডিস্কাশন তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
  });
};
module.exports.reviewFormPost = async (req, res) => {
  const path = req.file && req.file.path;
  if (path) {
    var imagePath = "/review/" + req.file.filename;
    var name = req.body.name;
    var description = req.body.description;
    var date = req.body.date;
    var year = req.body.year;
    var user_id = req.body.user_id;
    await review
      .create({
        name: name,
        description: description,
        date: date,
        year: year,
        image: imagePath,
        upazilla_id: user_id,
      })
      .then((data) => {
        res.redirect("/upazilla/review");
      })
      .catch((err) => {
        console.log("file not uploaded successfully");
      });
  } else {
    console.log("file not uploaded successfully");
  }
};
//review controller ends----------------------------------------

//bij controller-----------------------------------------------
module.exports.bij = async (req, res) => {
  await bij
    .findAll({
      where: { upazilla: req.session.user_id },
    })
    .then((data) => {
      console.log("inside");
      res.render("upazilla/bij/bij", {
        title: "বীজ প্রত্যয়ন প্রতিবেদন তথ্য",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log("outside");
      res.render("upazilla/bij/bij", {
        title: "বীজ প্রত্যয়ন প্রতিবেদন তথ্য",
        success: "",
        records: err,
      });
    });

  //  records:result
};
module.exports.bijYear = async (req, res) => {
  await bij
    .findAll({
      where: { year: req.body.year, upazilla_id: req.session.user_id },
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
      res.render("upazilla/bij/bijYear", {
        title: "বীজ প্রত্যয়ন প্রতিবেদন তথ্য",
        success: "",
        records: err,
      });
    });
};
module.exports.bijForm = async (req, res) => {
  res.render("upazilla/bij/bijForm", {
    title: "বীজ প্রত্যয়ন প্রতিবেদন তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
  });
};
module.exports.bijFormPost = async (req, res) => {
  const path = req.file && req.file.path;
  if (path) {
    var imagePath = "/bij/" + req.file.filename;
    var name = req.body.name;
    var description = req.body.description;
    var date = req.body.date;
    var year = req.body.year;
    var user_id = req.body.user_id;
    await bij
      .create({
        name: name,
        description: description,
        date: date,
        year: year,
        image: imagePath,
        upazilla_id: user_id,
      })
      .then((data) => {
        res.redirect("/upazilla/bij");
      })
      .catch((err) => {
        console.log("file not uploaded successfully");
      });
  } else {
    console.log("file not uploaded successfully");
  }
};
//bij controller ends--------------------------------------------

//motivational controller
module.exports.motivational = async (req, res) => {
  await motivational
    .findAll({
      where: { upazilla: req.session.user_id },
    })
    .then((data) => {
      console.log("inside");
      res.render("upazilla/motivational/motivational", {
        title: "মোটিভেশনাল ট্যুর তথ্য",
        success: "",
        records: data,
      });
    })
    .catch((err) => {
      console.log("outside");
      res.render("upazilla/motivational/motivational", {
        title: "মোটিভেশনাল ট্যুর তথ্য",
        success: "",
        records: err,
      });
    });

  //  records:result
};
module.exports.motivationalYear = async (req, res) => {
  await motivational
    .findAll({
      where: { year: req.body.year, upazilla_id: req.session.user_id },
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
      res.render("upazilla/motivational/motivationalYear", {
        title: "মোটিভেশনাল ট্যুর তথ্য",
        success: "",
        records: err,
      });
    });
};
module.exports.motivationalForm = async (req, res) => {
  res.render("upazilla/motivational/motivationalForm", {
    title: "মোটিভেশনাল ট্যুর তথ্য",
    msg: "",
    success: "",
    user_id: req.session.user_id,
  });
};
module.exports.motivationalFormPost = async (req, res) => {
  const path = req.file && req.file.path;
  if (path) {
    var imagePath = "/motivational/" + req.file.filename;
    var name = req.body.name;
    var description = req.body.description;
    var date = req.body.date;
    var year = req.body.year;
    var user_id = req.body.user_id;
    await motivational
      .create({
        name: name,
        description: description,
        date: date,
        year: year,
        image: imagePath,
        upazilla_id: user_id,
      })
      .then((data) => {
        res.redirect("/upazilla/motivational");
      })
      .catch((err) => {
        console.log("file not uploaded successfully");
      });
  } else {
    console.log("file not uploaded successfully");
  }
};
//motivational controller ends
