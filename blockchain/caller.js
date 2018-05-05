
var blockchain = require('./blockchain');




//all this function is async, so should set a timer

blockchain.createUser('Customer', 1, '123@hotmail.com',function(){
  console.log('success')
})


blockchain.createUser('Administrator', 1000, '456@hotmail.com',function(){
  console.log('success')
})


blockchain.getPerson('Customer', 1,function(person){
  console.log(person.contractId)
  console.log(person.email)
  console.log(person.personId)
})


//get customer's contract
blockchain.getContract('Customer', 1,function(contract){
  console.log(contract.customerId)
  console.log(contract.administratorId)
  console.log(contract.doc)
  console.log(contract.LeasingStart)
  console.log(contract.LeasingEnd)
  console.log(contract.Status)
})



blockchain.moneyTransfer(1, 1000,400,function(){
  console.log('success')
})


blockchain.CreateContract(1, 1000,"docString",function(){
  console.log('success')
})

blockchain.UpdateContractStatus(1,2,function(){
  console.log('success')
})
