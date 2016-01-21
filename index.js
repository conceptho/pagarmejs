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
  //INITIALIZE
    var api_key = api_key;
  //CARDS
  this.card = {
      "findById" : function (id){
          return modelFindById('cards',api_key,id);
      },
      "create" : function(data){
          return modelCreate('cards',api_key,data);
      }
  },

  //CUSTOMERS

  this.customer = {
      "create" : function(data){
          return modelCreate('customers', api_key, data);
      },
      "all" : function(data){
          return getAll('customers',api_key,data);
      },
      "findById" : function (id){
          return modelFindById('customers',api_key ,id);
      }
  },

  //PLANS

  this.plan = {
      "create" : function(data){
          return modelCreate('plans',api_key,data);
      },
      "all" : function(data){
          return getAll('plans',api_key,data);
      },
      "findById" : function (id){
          return modelFindById('plans',api_key,id);
      },
      "save" : function(id , data){
          return modelSave('plans',api_key,id,data);
      }
  },

  //SUBSCRIPTIONS

  this.subscription = {
      "create" : function(data){
          return modelCreate('subscriptions',api_key,data);
      },
      "all" : function(data){
          return getAll('subscriptions',api_key,data);
      },
      "findById" : function (id){
          return modelFindById('subscriptions',api_key,id);
      },
      "save" : function(id , data){
          return modelSave('subscriptions',api_key,id,data);
      },
      "cancel" : function(id){
          return modelCancel('subscriptions', api_key,id);
      }
  },

  //PAYABLES

  this.payable = {
      "all" : function(){
          return getAll('payables', api_key, {});
      },
      "findById" : function(id){
          return modelFindById('payables', api_key, id);
      }
  },

  //BALANCE

  this.balance = {
      "findById" : function(id){
          var data = {};
          data['api_key'] = api_key;
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
          return getAll('balance/operations', api_key, data);
      },
      "operationsFindById" : function(id){
          return modelFindById('balance/operations', api_key ,id);
      }
  },

  //BANK_ACCOUNTS

  this.bank_account = {
      "create" : function(data){
          return modelCreate('bank_accounts', api_key, data);
      },
      "findById" : function(id){
          return modelFindById('bank_accounts', api_key, id);
      },
      "all" : function(data){
          return getAll('bank_accounts', api_key, data);
      }
  },

  //RECIPIENTS

  this.recipient = {
      "create" : function(data){
          return modelCreate('recipients',api_key,data);
      },
      "all" : function(data){
          return getAll('recipients',api_key,data);
      },
      "findById" : function(id){
          return modelFindById('recipients',api_key,id);
      },
      "save" : function(id, data){
          return modelSave('recipients',api_key,id,data);
      },
      "balanceFindById" : function(id){
          if(id){
              return restApi.read('recipients/'+id+'/balance', {
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
      },
      "operationsAll" : function(recipient_id, data){
          return getAll('recipients/'+recipient_id+'/balance/operations', api_key , data);
      }
  },

  //TRANSFERS

  this.transfer = {
      "create" : function(data){
          return modelCreate('transfers', api_key,data);
      },
      "findById" : function(id){
          return modelFindById('transfers', api_key, id);
      },
      "all" : function(data){
          return getAll('transfers',api_key,data);
      },
      "cancel" : function(id){
          return modelCancel('transfers',api_key, id);
      }
  },

  //TRANSACTIONS

  this.transaction = {
      "create" : function(data){
          return modelCreate('transactions',api_key,data);
      },
      "findById" : function(id){
          return modelFindById('transactions',api_key, id);
      },
      "all" : function(data){
          return getAll('transactions',api_key,data);
      },
      "splitRulesAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/split_rules', {
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
      },
      "splitRulesFindById" : function(transaction_id, split_id){
        if(id){
            return restApi.read('transactions/'+transaction_id+'/split_rules/'+split_id, {
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
      },
      "payablesAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/payables', {
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
      },
      "payablesFindById" : function(transaction_id, payable_id){
        if(id){
            return restApi.read('transactions/'+transaction_id+'/payables/'+payable_id, {
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
      },
      "postbackAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/postbacks', {
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
      },
      "postbackFindById" : function(transaction_id, postback_id){
        if(id){
            return restApi.read('transactions/'+transaction_id+'/postbacks/'+postback_id, {
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
      },
      "postbackRedeliver" : function(transaction_id, postback_id){
        if(id){
            return restApi.post('transactions/'+transaction_id+'/postbacks/'+postback_id+'/redeliver', {
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
      },
      "eventsAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/events', {
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
      },
      "operationsAll" : function(id){
        if(id){
            return restApi.read('transactions/'+id+'/operations', {
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
      },
      "refund" : function(id){
        if(id){
            return restApi.post('transactions/'+id+'/refund', {
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
      },
      "calculateInstallmentsAmount" : function(data){
        data['api_key'] = api_key;
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

  this.zipcode = {
      "find" : function(zipcode){
          return modelFindById('zipcodes', api_key, zipcode);
      }
  },

  this.fingerprint = {
      "verify": function(id, fingerprint_res){
          if(sha1(id+"#"+api_key) == fingerprint_res)
              return true;
          return false;
      }
  }
}

//EXPORTS
module.exports = pagarMe;
