 "use strict"
var express = require('express');
var router = express.Router();

var multer = require('multer');
var path = require('path');

var blockchain = require('../blockchain/blockchain');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });

var ip = require('ip');

const userController = require('../controllers/userController');
const utilityController = require('../controllers/utilityController');


/**
 * User routes
 */

router.post('/v1/api/user',upload.any(),userController.create); // create a new user
router.get('/v1/api/user/:slug',userController.show); // get details of a single user
router.put('/v1/api/user/:slug',upload.any(),userController.update); // update user

router.get('/v1/api/users',userController.index); // get list of all users
router.get('/v1/api/user',userController.show); // get details of a currently logged in user

router.delete('/v1/api/user/:slug',userController.delete); // delete user

/**
 * User login routes
 */

router.post('/authenticate',userController.authenticate);
router.post('/session',userController.session);
router.post('/logout',userController.logout);

/**
 * Dashboard routes
 *
 *
 */

 router.get('/dashboard/maintenance', function(req, res) {

   var html = "";

   // current user logged id => req.session.user.id
   // all details details of current logged in user req.session.user

   res.send(html);
 });

 router.post('/dashboard/maintenance/form', function(req, res) {

   var html = "";
   var values = req.body;

   /* FORM Values here ====> */
   console.log(values);
   /** Current user =====> */
   console.log(req.session.user['id']);

   console.log(userController.adminID)

   blockchain.CreateMaintenance(req.session.user['id'], userController.adminID[0], values['typeofProblem'],values['whereofproblem'])



   // current user logged id => req.session.user.id
   // all details details of current logged in user req.session.user

   res.send(html);
 });


 router.get('/dashboard/rent', function(req, res) {

   var html = "";



   res.send(html);
 });

 router.post('/dashboard/rent/form', function(req, res) {

   var html = "";
   var values = req.body;

   /* FORM Values here ====> */
   console.log(values);
   /** Current user =====> */
   console.log(req.session.user);

   console.log(req.session.user['id'])

   blockchain.moneyTransfer(req.session.user['id'], userController.adminID[0], values['amount'])


   // current user logged id => req.session.user.id
   // all details details of current logged in user req.session.user

   res.send(html);
 });

 router.get('/dashboard/documents', function(req, res) {

   var html = "";

   res.send(html);
 });


 router.get('/dashboard/termination', function(req, res) {

   var html = "";

   res.send(html);
 });

 router.post('/dashboard/termination/form', function(req, res) {

   var html = "";
   var values = req.body;

   /* FORM Values here ====> */
   console.log(values);
   /** Current user =====> */
   console.log(req.session.user);


   let reason = values["terminate_reason"];

   console.log(reason)


   blockchain.UpdateContractStatus(req.session.user['id'], reason);

   res.send(html);
 });


 router.get('/dashboard/dispute', function(req, res) {

   var html = "";

   res.send(html);
 });

 router.post('/dashboard/dispute/form', function(req, res) {

   var html = "";
   var values = req.body;

   /* FORM Values here ====> */
   console.log(values);
   /** Current user =====> */
   console.log(req.session.user);

   blockchain.CreateDispute(req.session.user['id'], userController.adminID[0], values['disputeTopic'])

   // current user logged id => req.session.user.id
   // all details details of current logged in user req.session.user

   res.send(html);
 });


router.post('/dashboard/renew/form',function(req,res){

  var html = "";
  var values = req.body;

  /* FORM Values here ====> */ console.log(values);
  /** Current user =====> */ console.log(req.session.user);

  var termType = ['rent_rate', 'deposit_rate', 'notice_advance_day ' ,'pest_control_frequency','maintenance_coverage', 'termination_cost'];


  var newTerm = [0.05, 0.4 , 3.0 , 1.0, 1.0, 0.3];

  // for (j = 0; j < termType.length ; j++) {
  //     newTerm.push(values[termType[j]])
  // }
  //
  // console.log(newTerm)


  blockchain.getContract('Customer', req.session.user['id'],function(contract){

    var doc = contract.doc.split(",");

    var result = ""

    var i;

    for (i = 0; i < doc.length ; i++) {
      let val = doc[i].split(':')[1]
      if (parseFloat(newTerm[i]) != parseFloat(val)){
         var tmp = termType[i] + ' changed from ' + val + ' to ' + newTerm[i] + '\n';
         result += tmp
      }
    }


    blockchain.UpdateContractStatus(req.session.user['id'], 'Normal Termination',function(){



        let rent = 'rent_increase_rate:0.05,'
        let desposit = 'deposit_rate:0.4,'
        let notice = 'notice_advance_day:3,'
        let pest = 'pest_control_frequency:1,'
        let maintenance = 'maintenance_coverage:1,'
        let termination = 'termination_cost:0.3'
        blockchain.CreateContract(req.session.user['id'],userController.adminID[0],rent+desposit+notice+pest+maintenance+termination,function(){

        })




    })


    res.send(result);




  })

  //console.log(result)

  // current user logged id => req.session.user.id
  // all details details of current logged in user req.session.user


});




//my edits--vishu
router.get('/dashboard/rent/form1',function(req,res){

  var html = "";

  res.send(html);
});


module.exports = router;
