# Pagarmejs

[![Join the chat at https://gitter.im/conceptho/pagarmejs](https://badges.gitter.im/conceptho/pagarmejs.svg)](https://gitter.im/conceptho/pagarmejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Javascript client to pagar.me payment gateway.

## Installation

    npm install pagarmejs

## Usage


```js
var Pagarme = require('pagarmejs');
var pagarme = new Pagarme('<API_KEY>');

pagarme.customer.create({
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
    return pagarme.customer.all({count:2});
  })
  .then(console.log)
  .catch(console.log)


```
[Pagar.me official documentation!](https://docs.pagar.me/api/)

## Available Methods

###CARDS
- card.findById(id)
- card.create(data)

###CUSTOMERS
- customer.findById(id)
- customer.create(data)
- customer.all(data)

###PLANS
- plan.findById(id)
- plan.create(data)
- plan.all(data)
- plan.save(id, data)

###SUBSCRIPTIONS
- subscription.findById(id)
- subscription.create(data)
- subscription.all(data)
- subscription.save(id, data)
- subscription.cancel(id)

###PAYABLES
- payable.findById(id)
- payable.all(data)

###BALANCE
- balance.findById(id)
- balance.operationsAll(data)
- balance.operationsFindById(id)

###BANK_ACCOUNTS
- bank_account.findById(id)
- bank_account.create(data)
- bank_account.all(data)

###RECIPIENTS
- recipient.findById(id)
- recipient.create(data)
- recipient.all(data)
- recipient.save(id, data)
- recipient.balanceFindById(id)
- recipient.operationsAll(recipient_id, data)

###TRANSFERS
- transfer.findById(id)
- transfer.create(data)
- transfer.all(data)
- transfer.cancel(id)

###TRANSACTIONS
- transaction.findById(id)
- transaction.create(data)
- transaction.all(data)
- transaction.splitRulesAll(id)
- transaction.splitRulesFindById(transaction_id, split_id)
- transaction.payablesAll(id)
- transaction.payablesFindById(transaction_id, payable_id)
- transaction.postbackAll(id)
- transaction.postbackFindById(transaction_id, postback_id)
- transaction.postbackRedeliver(transaction_id, postback_id)
- transaction.eventsAll(id)
- transaction.operationsAll(id)
- transaction.refund(id)
- transaction.calculateInstallmentsAmount(data)

###ZIPCODE
- zipcode.find(zipcode)

###FINGERPRINT
- fingerprint.verify(id, fingerprint_res)
