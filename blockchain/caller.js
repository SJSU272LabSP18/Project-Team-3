
var blockchain = require('./blockchain');




//all this function is async, so should set a timer

blockchain.createUser('Customer', 2, '123@hotmail.com',function(){
  console.log('success')
})


// blockchain.createUser('Administrator', 2000, '456@hotmail.com',function(){
//   console.log('success')
// })
//

// blockchain.getPerson('Customer', 2,function(person){
//   console.log(person.contractId)
//   console.log(person.email)
//   console.log(person.personId)
// })



// blockchain.moneyTransfer(2, 2000,400,function(){
//   console.log('success')
// })


// blockchain.CreateContract(2, 2000,"docString",function(){
//   console.log('success')
// })


// //get customer's contract
// blockchain.getContract('Customer', 2,function(contract){
//   console.log(contract.customerId)
//   console.log(contract.administratorId)
//   console.log(contract.doc)
//   console.log(contract.LeasingStart)
//   console.log(contract.LeasingEnd)
//   console.log(contract.Status)
// })
//
//
//


//input: customer id , and status code
// blockchain.UpdateContractStatus(2,-1,function(){
//   console.log('success')
// })
