const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();
const {fieldDay,fieldDayFilter,farmerTraining,farmerTrainingFilter,farmerPrize,farmerPrizeFilter,
    motivational,motivationalFilter,review,reviewFilter,bij,bijFilter,saaoTraining,saaoTrainingFilter,
    dashboardMonitoring,ddsignup,ddsignuppost,ddlogin,ddloginpost,ddDashboard} = require('../controllers/dd.controller');
router.get('/login',ddlogin);
router.post('/logins',ddloginpost);
router.get('/dashboard',ddDashboard);
router.get('/dashboardMonitoring',dashboardMonitoring);


router.get('/signup',ddsignup);
router.post('/signups',ddsignuppost);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);

router.get('/farmerTraining',farmerTraining);
router.post('/farmerTrainingFilter',farmerTrainingFilter);

router.get('/farmerPrize',farmerPrize);
router.post('/farmerPrizeFilter',farmerPrizeFilter);

router.get('/motivational',motivational);
router.post('/motivationalFilter',motivationalFilter);

router.get('/review',review);
router.post('/reviewFilter',reviewFilter);

router.get('/bij',bij);
router.post('/bijFilter',bijFilter);

router.get('/saaoTraining',saaoTraining);
router.post('/saaoTrainingFilter',saaoTrainingFilter);

module.exports = router;