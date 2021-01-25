const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {fieldDay,fieldDayFilter,farmerTraining,farmerTrainingFilter,farmerPrize,farmerPrizeFilter,dashboardMonitoring,pdsignup,pdsignuppost,pdlogin,pdloginpost,pdDashboard,farmerTrainingDistrictFilter,
    fieldDayDistrictFilter,farmerPrizeDistrictFilter,saaoTraining,saaoTrainingFilter,saaoTrainingDistrictFilter,review,reviewFilter,reviewDistrictFilter,bij,bijFilter,bijDistrictFilter,motivational,motivationalFilter,motivationalDistrictFilter} = require('../controllers/pd.controller');
    
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);
router.get('/dashboardMonitoring',dashboardMonitoring);


router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);


router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);
router.post('/fieldDayDistrictFilter',fieldDayDistrictFilter);

router.get('/farmerTraining',farmerTraining);
router.post('/farmerTrainingFilter',farmerTrainingFilter);
router.post('/farmerTrainingDistrictFilter',farmerTrainingDistrictFilter);


router.get('/farmerPrize',farmerPrize);
router.post('/farmerPrizeFilter',farmerPrizeFilter);
router.post('/farmerPrizeDistrictFilter',farmerPrizeDistrictFilter);

router.get('/saaoTraining',saaoTraining);
router.post('/saaoTrainingFilter',saaoTrainingFilter);
router.post('/saaoTrainingDistrictFilter',saaoTrainingDistrictFilter);

router.get('/review',review);
router.post('/reviewFilter',reviewFilter);
router.post('/reviewDistrictFilter',reviewDistrictFilter);

router.get('/bij',bij);
router.post('/bijFilter',bijFilter);
router.post('/bijDistrictFilter',bijDistrictFilter);

router.get('/motivational',motivational);
router.post('/motivationalFilter',motivationalFilter);
router.post('/motivationalDistrictFilter',motivationalDistrictFilter);


module.exports = router;