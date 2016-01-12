var pagarme_class = require('../index.js');
var Pagarme = new pagarme_class('<API_KEY>');



Pagarme.customer.all()
  .then(console.log)
  .then(function(){
    return Pagarme.customer.all();
  })
  .then(console.log)
  .catch(console.log)
