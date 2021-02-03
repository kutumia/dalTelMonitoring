const express = require("express");
const router = express.Router();
const app = express();

const {  

  fieldDay,
  fieldDayYear,
  fieldDayForm,
  uploadfieldDay,
  fieldDayFormPost,
  fieldDayFormEdit,
  fieldDayFormUpdatePost,
  fieldDayCardDelete,

  farmerTraining,
  farmerTrainingYear,
  farmerTrainingForm,
  uploadfarmerTraining,
  farmerTrainingFormPost,
  farmerTrainingFormEdit,
  farmerTrainingFormUpdatePost,
  farmerTrainingCardDelete,

  farmerPrize,
  farmerPrizeYear,
  farmerPrizeForm,
  uploadfarmerPrize,
  farmerPrizeFormPost,
  farmerPrizeFormEdit,
  farmerPrizeFormUpdatePost,
  farmerPrizeCardDelete,

  saaoTraining,
  saaoTrainingYear,
  saaoTrainingForm,
  uploadsaaoTraining,
  saaoTrainingFormPost,
  saaoTrainingFormEdit,
  saaoTrainingFormUpdatePost,
  saaoTrainingCardDelete,

  review,
  reviewYear,
  reviewForm,
  uploadreview,
  reviewFormPost,
  reviewFormEdit,
  reviewFormUpdatePost,
  reviewCardDelete,

  bij,
  bijYear,
  bijForm,
  uploadbij,
  bijFormPost,
  bijFormEdit,
  bijFormUpdatePost,
  bijCardDelete,

  motivational,
  motivationalYear,
  motivationalForm,
  uploadmotivational,
  motivationalFormPost,
  motivationalFormEdit,
  motivationalFormUpdatePost,
  motivationalCardDelete,

  dashboardMonitoring,
  upazillasignup,
  upazillasignuppost,
  allupazilla,
  upazillalogin,
  upazillaloginpost,
  upazillaDashboard,
    
} = require("../controllers/upazilla.controller");
router.get("/", allupazilla);
router.get("/login", upazillalogin);
router.post("/logins", upazillaloginpost);
router.get("/dashboard", upazillaDashboard);
router.get("/dashboardMonitoring", dashboardMonitoring);

router.get("/signup", upazillasignup);
router.post("/signups", upazillasignuppost);

router.get("/fieldDay", fieldDay);
router.post("/fieldDayYear", fieldDayYear);
router.get("/fieldDayForm", fieldDayForm);
router.post("/fieldDayFormPost", uploadfieldDay, fieldDayFormPost);
router.get("/fieldDayFormEdit/:id", fieldDayFormEdit);
router.post("/fieldDayFormUpdatePost/:id", fieldDayFormUpdatePost);
router.get("/fieldDayCardDelete/:id", fieldDayCardDelete);

router.get("/farmerTraining", farmerTraining);
router.post("/farmerTrainingYear", farmerTrainingYear);
router.get("/farmerTrainingForm", farmerTrainingForm);
router.post("/farmerTrainingFormPost", uploadfarmerTraining, farmerTrainingFormPost);
router.get("/farmerTrainingFormEdit/:id", farmerTrainingFormEdit);
router.post("/farmerTrainingFormUpdatePost/:id", farmerTrainingFormUpdatePost);
router.get("/farmerTrainingCardDelete/:id", farmerTrainingCardDelete);

router.get("/farmerPrize", farmerPrize);
router.post("/farmerPrizeYear", farmerPrizeYear);
router.get("/farmerPrizeForm", farmerPrizeForm);
router.post("/farmerPrizeFormPost", uploadfarmerPrize, farmerPrizeFormPost);
router.get("/farmerPrizeFormEdit/:id", farmerPrizeFormEdit);
router.post("/farmerPrizeFormUpdatePost/:id", farmerPrizeFormUpdatePost);
router.get("/farmerPrizeCardDelete/:id", farmerPrizeCardDelete);

router.get("/saaoTraining", saaoTraining);
router.post("/saaoTrainingYear", saaoTrainingYear);
router.get("/saaoTrainingForm", saaoTrainingForm);
router.post("/saaoTrainingFormPost", uploadsaaoTraining, saaoTrainingFormPost);
router.get("/saaoTrainingFormEdit/:id", saaoTrainingFormEdit);
router.post("/saaoTrainingFormUpdatePost/:id", saaoTrainingFormUpdatePost);
router.get("/saaoTrainingCardDelete/:id", saaoTrainingCardDelete)

router.get("/review", review);
router.post("/reviewYear", reviewYear);
router.get("/reviewForm", reviewForm);
router.post("/reviewFormPost", uploadreview, reviewFormPost);
router.get("/reviewFormEdit/:id", reviewFormEdit);
router.post("/reviewFormUpdatePost/:id", reviewFormUpdatePost);
router.get("/reviewCardDelete/:id", reviewCardDelete);

router.get("/bij", bij);
router.post("/bijYear", bijYear);
router.get("/bijForm", bijForm);
router.post("/bijFormPost", uploadbij, bijFormPost);
router.get("/bijFormEdit/:id", bijFormEdit);
router.post("/bijFormUpdatePost/:id", bijFormUpdatePost);
router.get("/bijCardDelete/:id", bijCardDelete);

router.get("/motivational", motivational);
router.post("/motivationalYear", motivationalYear);
router.get("/motivationalForm", motivationalForm);
router.post("/motivationalFormPost", uploadmotivational, motivationalFormPost);
router.get("/motivationalFormEdit/:id", motivationalFormEdit);
router.post("/motivationalFormUpdatePost/:id", motivationalFormUpdatePost);
router.get("/motivationalCardDelete/:id", motivationalCardDelete)

module.exports = router;
