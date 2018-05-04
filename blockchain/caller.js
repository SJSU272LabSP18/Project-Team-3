
var blockchain = require('./blockchain');




//all this function is async, so should set a timer

blockchain.createUser('Customer', 1, '123@hotmail.com',function(){
  console.log('success')
})


blockchain.createUser('Administrator', 1000, '456@hotmail.com',function(){
  console.log('success')
})


blockchain.getPerson('Administrator', 1000,function(person){
  console.log(person)
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
