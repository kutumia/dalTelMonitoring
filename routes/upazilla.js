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
  fieldDayCardOpen,

  farmerTrainingForm,
  farmerTrainingFormPost,
  // farmerTrainingFormEdit,
  // farmerTrainingFormUpdatePost,
  // farmerTrainingCardDelete,
  farmerTrainingCardOpen,
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
  // farmerPrizeFormEdit,
  // farmerPrizeFormUpdatePost,
  // farmerPrizeCardDelete,
  farmerPrizeCardOpen,
  saaoTraining,
  saaoTrainingYear,
  saaoTrainingForm,
  uploadsaaoTraining,
  saaoTrainingFormPost,
  // saaoTrainingFormEdit,
  // saaoTrainingFormUpdatePost,
  // saaoTrainingCardDelete,
  saaoTrainingCardOpen,
  review,
  reviewYear,
  reviewForm,
  uploadreview,
  reviewFormPost,
  // reviewFormEdit,
  // reviewFormUpdatePost,
  // reviewCardDelete,
  reviewCardOpen,
  bij,
  bijYear,
  bijForm,
  uploadbij,
  bijFormPost,
  // bijFormEdit,
  // bijFormUpdatePost,
  // bijCardDelete,
  bijCardOpen,
  motivational,
  motivationalYear,
  motivationalForm,
  uploadmotivational,
  motivationalFormPost,
  // motivationalFormEdit,
  // motivationalFormUpdatePost,
  // motivationalCardDelete,
  motivationalCardOpen,
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
router.get("/fieldDayCardOpen/:id", fieldDayCardOpen);
router.get("/fieldDayFormEdit/:id", fieldDayFormEdit);
router.post("/fieldDayFormUpdatePost/:id", fieldDayFormUpdatePost);
router.get("/fieldDayCardDelete/:id", fieldDayCardDelete);

router.get("/farmerTraining", farmerTraining);
router.post("/farmerTrainingYear", farmerTrainingYear);
router.get("/farmerTrainingForm", farmerTrainingForm);
router.post("/farmerTrainingFormPost", uploadfarmerTraining, farmerTrainingFormPost);
router.get("/farmerTrainingCardOpen/:id", farmerTrainingCardOpen);
// router.get("/farmerTrainingFormEdit/:id", farmerTrainingFormEdit);
// router.post("/farmerTrainingFormUpdatePost/:id", farmerTrainingFormUpdatePost);
// router.get("/farmerTrainingCardDelete/:id", farmerTrainingCardDelete);

router.get("/farmerPrize", farmerPrize);
router.post("/farmerPrizeYear", farmerPrizeYear);
router.get("/farmerPrizeForm", farmerPrizeForm);
router.post("/farmerPrizeFormPost", uploadfarmerPrize, farmerPrizeFormPost);
router.get("/farmerPrizeCardOpen/:id", farmerPrizeCardOpen);
// router.get("/farmerPrizeFormEdit/:id", farmerPrizeFormEdit);
// router.post("/farmerPrizeFormUpdatePost/:id", farmerPrizeFormUpdatePost);
// router.get("/farmerPrizeCardDelete/:id", farmerPrizeCardDelete);

router.get("/saaoTraining", saaoTraining);
router.post("/saaoTrainingYear", saaoTrainingYear);
router.get("/saaoTrainingForm", saaoTrainingForm);
router.post("/saaoTrainingFormPost", uploadsaaoTraining, saaoTrainingFormPost);
router.get("/saaoTrainingCardOpen/:id", saaoTrainingCardOpen);
// router.get("/saaoTrainingFormEdit/:id", saaoTrainingFormEdit);
// router.post("/saaoTrainingFormUpdatePost/:id", saaoTrainingFormUpdatePost);
// router.get("/saaoTrainingCardDelete/:id", saaoTrainingCardDelete);

router.get("/review", review);
router.post("/reviewYear", reviewYear);
router.get("/reviewForm", reviewForm);
router.post("/reviewFormPost", uploadreview, reviewFormPost);
router.get("/reviewCardOpen/:id", reviewCardOpen);
// router.get("/reviewFormEdit/:id", reviewFormEdit);
// router.post("/reviewFormUpdatePost/:id", reviewFormUpdatePost);
// router.get("/reviewCardDelete/:id", reviewCardDelete);

router.get("/bij", bij);
router.post("/bijYear", bijYear);
router.get("/bijForm", bijForm);
router.post("/bijFormPost", uploadbij, bijFormPost);
router.get("/bijCardOpen/:id", bijCardOpen);
// router.get("/bijFormEdit/:id", bijFormEdit);
// router.post("/bijFormUpdatePost/:id", bijFormUpdatePost);
// router.get("/bijCardDelete/:id", bijCardDelete);

router.get("/motivational", motivational);
router.post("/motivationalYear", motivationalYear);
router.get("/motivationalForm", motivationalForm);
router.post("/motivationalFormPost", uploadmotivational, motivationalFormPost);
router.get("/motivationalCardOpen/:id", motivationalCardOpen);
// router.get("/motivationalFormEdit/:id", motivationalFormEdit);
// router.post("/motivationalFormUpdatePost/:id", motivationalFormUpdatePost);
// router.get("/motivationalCardDelete/:id", motivationalCardDelete);

module.exports = router;
