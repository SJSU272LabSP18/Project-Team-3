/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.example.basic.AccountTransfer} The sample transaction instance.
 * @transaction
 */

 function accountTransfer(transfer){


   if (transfer.from.balance <  transfer.amount) {
      throw new Error('Insufficent Fund')
   }


   transfer.from.balance -= transfer.amount
   transfer.to.balance += transfer.amount

   return getAssetRegistry('org.example.basic.Account')

     .then(function (assetRegistry){

     return assetRegistry.update(transfer.to)

   }).then(function (){

     return getAssetRegistry('org.example.basic.Account')
   }).then(function (assetRegistry){
     return assetRegistry.update(transfer.from)
   })


 }


/**
 * Sample transaction processor function.
 * @param {org.example.basic.UpdateContractStatus} The sample update contract instance.
 * @transaction
 */

function updateContractStatus(updateStatus){

  updateStatus.contract.Status = updateStatus.changeStatus


  return getAssetRegistry('org.example.basic.Contract')

     .then(function (assetRegistry){

     return assetRegistry.update(updateStatus.contract)

   })
}
