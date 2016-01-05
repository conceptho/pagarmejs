# Pagarmejs
Javascript client to pagar.me payment gateway.

## Installation

    npm install pagarmejs

## Usage


```js
var Pagarme = require('pagarmejs');

api_key = "pagar.me secret key";

Pagarme.customer.create(api_key,{
     document_number: '18152564000105',
     name:'client name',
     email:'eee@email.com',
     born_at:'13121988',
     gender:'M',
     address: {
         street: 'street name',
         complementary: 'house',
         street_number: '13',
         neighborhood: 'neighborhood name',
         city: 'city',
         state: 'SP',
         zipcode: '05444040',
         country: 'Brasil'
     },
     phone:{
         ddi: '55',
         ddd: '11',
         number: '999887766'
     }
  })
  .then(function(){
    return Pagarme.customer.all(api_key,{count:2});
  })
  .then(console.log)
  .catch(console.log)


```
[Pagar.me official documentation!](https://docs.pagar.me/api/)

## Available Methods

###CARDS
- card.findById(api_key, id)
- card.create(api_key, data)

###CUSTOMERS
- customer.findById(api_key, id)
- customer.create(api_key, data)
- customer.all(api_key, data)

###PLANS
- plan.findById(api_key, id)
- plan.create(api_key, data)
- plan.all(api_key, data)
- plan.save(api_key, id, data)

###SUBSCRIPTIONS
- subscription.findById(api_key, id)
- subscription.create(api_key, data)
- subscription.all(api_key, data)
- subscription.save(api_key, id, data)
- subscription.cancel(api_key, id)

###PAYABLES
- payable.findById(api_key, id)
- payable.all(api_key, data)

###BALANCE
- balance.findById(api_key, id)
- balance.operationsAll(api_key, data)
- balance.operationsFindById(api_key, id)

###BANK_ACCOUNTS
- bank_account.findById(api_key, id)
- bank_account.create(api_key, data)
- bank_account.all(api_key, data)

###RECIPIENTS
- recipient.findById(api_key, id)
- recipient.create(api_key, data)
- recipient.all(api_key, data)
- recipient.save(api_key, id, data)
- recipient.balanceFindById(api_key, id)
- recipient.operationsAll(api_key, recipient_id, data)

###TRANSFERS
- transfer.findById(api_key, id)
- transfer.create(api_key, data)
- transfer.all(api_key, data)
- transfer.cancel(api_key, id)

###TRANSACTIONS
- transaction.findById(api_key, id)
- transaction.create(api_key, data)
- transaction.all(api_key, data)
- transaction.splitRulesAll(api_key, id)
- transaction.splitRulesFindById(api_key, transaction_id, split_id)
- transaction.payablesAll(api_key, id)
- transaction.payablesFindById(api_key, transaction_id, payable_id)
- transaction.postbackAll(api_key, id)
- transaction.postbackFindById(api_key, transaction_id, postback_id)
- transaction.postbackRedeliver(api_key, transaction_id, postback_id)
- transaction.eventsAll(api_key, id)
- transaction.operationsAll(api_key, id)
- transaction.refund(api_key, id)
- transaction.calculateInstallmentsAmount(api_key, data)

###ZIPCODE
- zipcode.find(api_key, zipcode)

###FINGERPRINT
- fingerprint.verify(api_key, id, fingerprint_res)
