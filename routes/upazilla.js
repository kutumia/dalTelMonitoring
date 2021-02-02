const express = require("express");
const router = express.Router();
const app = express();

const {
  fieldDayYear,
  farmerTrainingYear,
  farmerPrizeYear,
  uploadfieldDay,
  uploadfarmerPrize,
  uploadfarmerTraining,
  farmerPrizeForm,
  farmerPrizeFormPost,

  fieldDayForm,
  fieldDayFormPost,
  fieldDayFormEdit,
  fieldDayFormUpdatePost,
  fieldDayCardDelete,

  farmerTrainingForm,
  farmerTrainingFormPost,
  dashboardMonitoring,
  upazillasignup,
  upazillasignuppost,
  allupazilla,
  upazillalogin,
  upazillaloginpost,
  upazillaDashboard,
  fieldDay,
  farmerTraining,
  farmerPrize,
  saaoTraining,
  saaoTrainingYear,
  saaoTrainingForm,
  uploadsaaoTraining,
  saaoTrainingFormPost,
  review,
  reviewYear,
  reviewForm,
  uploadreview,
  reviewFormPost,
  bij,
  bijYear,
  bijForm,
  uploadbij,
  bijFormPost,
  motivational,
  motivationalYear,
  motivationalForm,
  uploadmotivational,
  motivationalFormPost,
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

router.get("/farmerPrize", farmerPrize);
router.post("/farmerPrizeYear", farmerPrizeYear);
router.get("/farmerPrizeForm", farmerPrizeForm);
router.post("/farmerPrizeFormPost", uploadfarmerPrize, farmerPrizeFormPost);

router.get("/saaoTraining", saaoTraining);
router.post("/saaoTrainingYear", saaoTrainingYear);
router.get("/saaoTrainingForm", saaoTrainingForm);
router.post("/saaoTrainingFormPost", uploadsaaoTraining, saaoTrainingFormPost);

router.get("/review", review);
router.post("/reviewYear", reviewYear);
router.get("/reviewForm", reviewForm);
router.post("/reviewFormPost", uploadreview, reviewFormPost);

router.get("/bij", bij);
router.post("/bijYear", bijYear);
router.get("/bijForm", bijForm);
router.post("/bijFormPost", uploadbij, bijFormPost);

router.get("/motivational", motivational);
router.post("/motivationalYear", motivationalYear);
router.get("/motivationalForm", motivationalForm);
router.post("/motivationalFormPost", uploadmotivational, motivationalFormPost);

module.exports = router;
