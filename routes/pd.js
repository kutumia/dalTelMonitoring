const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {editActivity,postActivity,activityDashboardFilter,filterActivities,fetchUpazilla,activities,addActivities,postActivities,fieldDay,fieldDayFilter,farmerTraining,farmerTrainingFilter,farmerPrize,farmerPrizeFilter,dashboardMonitoring,pdsignup,pdsignuppost,pdlogin,pdloginpost,pdDashboard,farmerTrainingDistrictFilter,
    fieldDayDistrictFilter,farmerPrizeDistrictFilter,saaoTraining,saaoTrainingFilter,saaoTrainingDistrictFilter,review,reviewFilter,reviewDistrictFilter,bij,bijFilter,bijDistrictFilter,motivational,motivationalFilter,motivationalDistrictFilter,
    fieldDayCardOpen,farmerTrainingCardOpen,farmerPrizeCardOpen,saaoTrainingCardOpen,reviewCardOpen,bijCardOpen,motivationalCardOpen
} = require('../controllers/pd.controller');
    
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);
router.post('/activityDashboardFilter',activityDashboardFilter);
router.get('/dashboardMonitoring',dashboardMonitoring);


router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);


router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);
router.post('/fieldDayDistrictFilter',fieldDayDistrictFilter);
router.get("/fieldDayCardOpen/:id", fieldDayCardOpen);


router.get('/farmerTraining',farmerTraining);
router.post('/farmerTrainingFilter',farmerTrainingFilter);
router.post('/farmerTrainingDistrictFilter',farmerTrainingDistrictFilter);
router.get("/farmerTrainingCardOpen/:id", farmerTrainingCardOpen);



router.get('/farmerPrize',farmerPrize);
router.post('/farmerPrizeFilter',farmerPrizeFilter);
router.post('/farmerPrizeDistrictFilter',farmerPrizeDistrictFilter);
router.get("/farmerPrizeCardOpen/:id", farmerPrizeCardOpen);


router.get('/saaoTraining',saaoTraining);
router.post('/saaoTrainingFilter',saaoTrainingFilter);
router.post('/saaoTrainingDistrictFilter',saaoTrainingDistrictFilter);
router.get("/saaoTrainingCardOpen/:id", saaoTrainingCardOpen);


router.get('/review',review);
router.post('/reviewFilter',reviewFilter);
router.post('/reviewDistrictFilter',reviewDistrictFilter);
router.get("/reviewCardOpen/:id", reviewCardOpen);

router.get('/bij',bij);
router.post('/bijFilter',bijFilter);
router.post('/bijDistrictFilter',bijDistrictFilter);
router.get("/bijCardOpen/:id", bijCardOpen);


router.get('/motivational',motivational);
router.post('/motivationalFilter',motivationalFilter);
router.post('/motivationalDistrictFilter',motivationalDistrictFilter);
router.get("/motivationalCardOpen/:id", motivationalCardOpen);


router.get('/activities',activities);
router.get('/addActivities',addActivities);
router.post('/postActivities',postActivities);
router.post('/fetchUpazilla',fetchUpazilla);
router.post('/filterActivities',filterActivities);
router.get('/editActivity/:id',editActivity);
router.post('/postActivity/:id',postActivity);


module.exports = router;