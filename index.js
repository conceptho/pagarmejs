var rest = require('rest-js');
var sha1 = require('sha1');


var restApi = rest('https://api.pagar.me/1/', {
    crossDomain: true,
    defaultFormat: ''
});

//METHODS

function getAll(model, api_key, data){
    if(data){
        data['api_key'] = api_key;
        return restApi.read(model,{
                data: data
            })
            .then(function(res){
                return res;
            })
            .catch(function(err){
                return err;
            });
    }else{
        return restApi.read(model,{
                data: {
                    api_key: api_key
                }
            })
            .then(function(res){
                return res;
            })
            .catch(function(err){
                return err;
            });
    }
};

function modelFindById(model, api_key, id){
    if(id)
        return restApi.read(model+'/'+id, {
                data: {
                    api_key: api_key
                }
            })
            .then(function(res){
                return res;
            })
            .catch(function(err){
                return err;
            });
    return false;
};

function modelCreate(model,api_key,data){
    if(data){
        data['api_key'] = api_key;
        return restApi.create(model, {
                data: data
            })
            .then(function(res){
                return res;
            })
            .catch(function(err){
                return err;
            });
    }
    return false;
};

function modelSave(model, api_key, id, data){
    if(data && id){
        data['api_key'] = api_key;
        return restApi.update(model+'/'+id, {
                data: data
            })
            .then(function(res){
                return res;
            })
            .catch(function(err){
                return err;
            })
    }
    return false;
};

function modelCancel(model, api_key, id){
    if(id){
        return restApi.post(model+'/'+id+'/cancel', {
            data: {
                api_key: api_key
            }
        })
        .then(function(res){
            return res;
        })
        .catch(function(err){
            return err;
        });
    }
    return false;
};

function pagarMe(api_key){
  this.initialize(api_key);
}

var app_key = "";

pagarMe.prototype = {
  //INITIALIZE
  initialize: function(api_key) {
      app_key = api_key;
  },
  //CARDS
  card:{
      "findById" : function (id){
          return modelFindById('cards',app_key,id);
      },
      "create" : function(data){
          return modelCreate('cards',app_key,data);
      }
  },

  //CUSTOMERS

  customer:{
      "create" : function(data){
          return modelCreate('customers', app_key, data);
      },
      "all" : function(data){
        console.log(app_key);
          return getAll('customers',app_key,data);
      },
      "findById" : function (id){
          return modelFindById('customers',app_key ,id);
      }
  },

  //PLANS

  plan:{
      "create" : function(data){
          return modelCreate('plans',app_key,data);
      },
      "all" : function(data){
          return getAll('plans',app_key,data);
      },
      "findById" : function (id){
          return modelFindById('plans',app_key,id);
      },
      "save" : function(id , data){
          return modelSave('plans',app_key,id,data);
      }
  },

  //SUBSCRIPTIONS

  subscription:{
      "create" : function(data){
          return modelCreate('subscriptions',app_key,data);
      },
      "all" : function(data){
          return getAll('subscriptions',app_key,data);
      },
      "findById" : function (id){
          return modelFindById('subscriptions',app_key,id);
      },
      "save" : function(id , data){
          return modelSave('subscriptions',app_key,id,data);
      },
      "cancel" : function(id){
          return modelCancel('subscriptions', app_key,id);
      }
  },

  //PAYABLES

  payable:{
      "all" : function(){
          return getAll('payables', app_key, {});
      },
      "findById" : function(id){
          return modelFindById('payables', app_key, id);
      }
  },

  //BALANCE

  balance:{
      "findById" : function(id){
          var data = {};
          data['api_key'] = app_key;
          if(id){
              data['recipient_id'] = id;
          }
          return restApi.read('payables', {data : data})
              .then(function(res){
                  return res;
              })
              .catch(function(err){
                  return err;
              });
      },
      "operationsAll" : function(data){
          return getAll('balance/operations', app_key, data);
      },
      "operationsFindById" : function(id){
          return modelFindById('balance/operations', app_key ,id);
      }
  },

  //BANK_ACCOUNTS

  bank_account:{
      "create" : function(data){
          return modelCreate('bank_accounts', app_key, data);
      },
      "findById" : function(id){
          return modelFindById('bank_accounts', app_key, id);
      },
      "all" : function(data){
          return getAll('bank_accounts', app_key, data);
      }
  },

  //RECIPIENTS

  recipient:{
      "create" : function(data){
          return modelCreate('recipients',app_key,data);
      },
      "all" : function(data){
          return getAll('recipients',app_key,data);
      },
      "findById" : function(id){
          return modelFindById('recipients',app_key,id);
      },
      "save" : function(id, data){
          return modelSave('recipients',app_key,id,data);
      },
      "balanceFindById" : function(id){
          if(id){
              return restApi.read('recipients/'+id+'/balance', {
                      data: {
                          api_key: app_key
                      }
                  })
                  .then(function(res){
                      return res;
                  })
                  .catch(function(err){
                      return err;
                  });
          }
      },
      "operationsAll" : function(recipient_id, data){
          return getAll('recipients/'+recipient_id+'/balance/operations', app_key , data);
      }
  },

  //TRANSFERS

  transfer:{
      "create" : function(data){
          return modelCreate('transfers', app_key,data);
      },
      "findById" : function(id){
          return modelFindById('transfers', app_key, id);
      },
      "all" : function(data){
          return getAll('transfers',app_key,data);
      },
      "cancel" : function(id){
          return modelCancel('transfers',app_key, id);
      }
  },

  //TRANSACTIONS

  transaction:{
      "create" : function(data){
          return modelCreate('transactions',app_key,data);
      },
      "findById" : function(id){
          return modelFindById('transactions',app_key, id);
      },
      "all" : function(data){
          return getAll('transactions',app_key,data);
      },
      "splitRulesAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/split_rules', {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "splitRulesFindById" : function(transaction_id, split_id){
        if(id){
            return restApi.read('transactions/'+transaction_id+'/split_rules/'+split_id, {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "payablesAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/payables', {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "payablesFindById" : function(transaction_id, payable_id){
        if(id){
            return restApi.read('transactions/'+transaction_id+'/payables/'+payable_id, {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "postbackAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/postbacks', {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "postbackFindById" : function(transaction_id, postback_id){
        if(id){
            return restApi.read('transactions/'+transaction_id+'/postbacks/'+postback_id, {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "postbackRedeliver" : function(transaction_id, postback_id){
        if(id){
            return restApi.post('transactions/'+transaction_id+'/postbacks/'+postback_id+'/redeliver', {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "eventsAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/events', {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "operationsAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/operations', {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "refund" : function(id){
        if(id){
            return restApi.post('transactions/'+id+'/refund', {
                    data: {
                        api_key: app_key
                    }
                })
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                });
        }
      },
      "calculateInstallmentsAmount" : function(data){
        data['api_key'] = app_key;
        return restApi.read('/transactions/calculate_installments_amount', {
                data: data
            })
            .then(function(res){
                return res;
            })
            .catch(function(err){
                return err;
            });
      }
  },

  //ZIPCODE

  zipcode:{
      "find" : function(zipcode){
          return modelFindById('zipcodes', app_key, zipcode);
      }
  },

  fingerprint: {
      "verify": function(id, fingerprint_res){
          if(sha1(id+"#"+app_key) == fingerprint_res)
              return true;
          return false;
      }
  }
}

//EXPORTS
module.exports = pagarMe;
