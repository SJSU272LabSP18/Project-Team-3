const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

let bizNetworkConnection = new BusinessNetworkConnection();


module.exports = {
  createUser: async function(userType, id, email, callback) {

    try {


      let businessNetworkDefintion = await bizNetworkConnection.connect('admin@ap');

      let personRegistry = await bizNetworkConnection.getParticipantRegistry('org.example.basic.' + userType)
      let factory = businessNetworkDefintion.getFactory();

      let owner = factory.newResource('org.example.basic', userType, id + '');

      owner.firstName = ""
      owner.lastName = ""
      owner.contractId = ""
      owner.email = email



      let accountRegistry = await bizNetworkConnection.getAssetRegistry('org.example.basic.Account');


      let balance = Math.random() * 10000 + 100

      let account = factory.newResource('org.example.basic', 'Account', id + '');

      account.balance = balance


      await personRegistry.add(owner)
      await accountRegistry.add(account)



      await bizNetworkConnection.disconnect();

      callback()
    } catch (error) {
      // error handling
      console.log(error);
    }


  },
  getPerson: async function(userType, id, callback) {

    try {

      let businessNetworkDefintion = await bizNetworkConnection.connect('admin@ap');
      let personRegistry = await bizNetworkConnection.getParticipantRegistry('org.example.basic.' + userType)

      let person = await personRegistry.get(id + '');


      await bizNetworkConnection.disconnect();

      callback(person)

    } catch (error) {
      console.log(error);
    }


  },

  getContract: async function(userType, id, callback) {

    try {

      let businessNetworkDefintion = await bizNetworkConnection.connect('admin@ap');
      let personRegistry = await bizNetworkConnection.getParticipantRegistry('org.example.basic.' + userType)

      let person = await personRegistry.get(id + '');

      let contractRegistry = await bizNetworkConnection.getAssetRegistry('org.example.basic.Contract')

      let contract = await contractRegistry.get(person.contractId);


      await bizNetworkConnection.disconnect();

      callback(contract)

    } catch (error) {
      console.log(error);
    }


  },

  moneyTransfer: async function(fromId, toId, amount, callback) {
    try {

      let businessNetworkDefintion = await bizNetworkConnection.connect('admin@ap');


      let serializer = businessNetworkDefintion.getSerializer();

      let resource = serializer.fromJSON({
        '$class': 'org.example.basic.AccountTransfer',
        'from': fromId + '',
        'to': toId + '',
        'amount': amount
      });

      await bizNetworkConnection.submitTransaction(resource);

      await bizNetworkConnection.disconnect();

      callback()

    } catch (error) {
      console.log(error)
    }
  },

  UpdateContractStatus: async function(customerId, status, callback) {

    try {

      let businessNetworkDefintion = await bizNetworkConnection.connect('admin@ap');


      let personRegistry = await bizNetworkConnection.getParticipantRegistry('org.example.basic.Customer')
      let customer = await personRegistry.get(customerId + '')


      let serializer = businessNetworkDefintion.getSerializer();

      let resource = serializer.fromJSON({
        '$class': 'org.example.basic.UpdateContractStatus',
        'contract': customer.contractId,
        'changeStatus': status
      });

      await bizNetworkConnection.submitTransaction(resource);

      await bizNetworkConnection.disconnect();

      callback()

    } catch (error) {
      console.log(error)
    }
  },

  CreateContract: async function(customerId, adminId, docString, callback) {

    try {
      let businessNetworkDefintion = await bizNetworkConnection.connect('admin@ap');
      let factory = businessNetworkDefintion.getFactory();

      let contractId = Math.floor(Math.random() * 10000) + 100

      let contractRegistry = await bizNetworkConnection.getAssetRegistry('org.example.basic.Contract')

      let contract = factory.newResource('org.example.basic', 'Contract', contractId + '');

      contract.doc = docString
      contract.customerId = customerId + ''
      contract.administratorId = adminId + ''
      contract.LeasingStart = '2018/5/7'
      contract.LeasingEnd = '2019/5/7'
      contract.Status = 1



      let personRegistry = await bizNetworkConnection.getParticipantRegistry('org.example.basic.Customer')
      let customer = await personRegistry.get(customerId + '')


      customer.contractId = contractId + ''

      await personRegistry.update(customer)
      await contractRegistry.add(contract)

      await bizNetworkConnection.disconnect();


      callback()

    } catch (error) {
      console.log(error)
    }

  }
};
