const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app = express();
const {
  fieldDay,
  fieldDayFilter,
  fieldDayCardOpen,
  farmerTraining,
  farmerTrainingFilter,
  farmerTrainingCardOpen,
  farmerPrize,
  farmerPrizeFilter,
  farmerPrizeCardOpen,
  motivational,
  motivationalFilter,
  motivationalCardOpen,
  review,
  reviewFilter,
  reviewCardOpen,
  bij,
  bijFilter,
  bijCardOpen,
  saaoTraining,
  saaoTrainingFilter,
  saaoTrainingCardOpen,
  dashboardMonitoring,
  ddsignup,
  ddsignuppost,
  ddlogin,
  ddloginpost,
  ddDashboard,
} = require("../controllers/dd.controller");
router.get("/login", ddlogin);
router.post("/logins", ddloginpost);
router.get("/dashboard", ddDashboard);
router.get("/dashboardMonitoring", dashboardMonitoring);

router.get("/signup", ddsignup);
router.post("/signups", ddsignuppost);

router.get("/fieldDay", fieldDay);
router.post("/fieldDayFilter", fieldDayFilter);
router.get("/fieldDayCardOpen/:id", fieldDayCardOpen);

router.get("/farmerTraining", farmerTraining);
router.post("/farmerTrainingFilter", farmerTrainingFilter);
router.get("/farmerTrainingCardOpen/:id", farmerTrainingCardOpen);


router.get("/farmerPrize", farmerPrize);
router.post("/farmerPrizeFilter", farmerPrizeFilter);
router.get("/farmerPrizeCardOpen/:id", farmerPrizeCardOpen);


router.get("/motivational", motivational);
router.post("/motivationalFilter", motivationalFilter);
router.get("/motivationalCardOpen/:id", motivationalCardOpen);

router.get("/review", review);
router.post("/reviewFilter", reviewFilter);
router.get("/reviewCardOpen/:id", reviewCardOpen);

router.get("/bij", bij);
router.post("/bijFilter", bijFilter);
router.get("/bijCardOpen/:id", bijCardOpen);

router.get("/saaoTraining", saaoTraining);
router.post("/saaoTrainingFilter", saaoTrainingFilter);
router.get("/saaoTrainingCardOpen/:id", saaoTrainingCardOpen);

module.exports = router;
