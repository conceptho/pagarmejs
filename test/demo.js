var pagarme = require('../index.js');
var Pagarme = new pagarme('<API_KEY>');



Pagarme.customer.all()
  .then(console.log)
  .then(function(){
    return Pagarme.customer.all();
  })
  .then(console.log)
  .catch(console.log)
