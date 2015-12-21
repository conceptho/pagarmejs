var rest = require('rest-js');
var sha1 = require('sha1');


var restApi = rest('https://api.pagar.me/1/', {
    crossDomain: true,
    defaultFormat: ''
});

//METHODS

var getAll = function(model, api_key, data){
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

var modelFindById = function(model, api_key, id){
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

var modelCreate = function(model,api_key,data){
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

var modelSave = function(model, api_key, id, data){
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

var modelCancel = function(model, api_key, id){
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


//EXPORTS
module.exports = {

    //CARDS
    card:{
        "findById" : function (api_key, id){
            return modelFindById('cards',api_key,id);
        },
        "create" : function(api_key, data){
            return modelCreate('cards',api_key,data);
        }
    },

    //CUSTOMERS

    customer:{
        "create" : function(api_key, data){
            return modelCreate('customers', api_key, data);
        },
        "all" : function(api_key, data){
            return getAll('customers',api_key,data);
        },
        "findById" : function (api_key, id){
            return modelFindById('customers',api_key,id);
        }
    },

    //PLANS

    plan:{
        "create" : function(api_key, data){
            return modelCreate('plans',api_key,data);
        },
        "all" : function(api_key, data){
            return getAll('plans',api_key,data);
        },
        "findById" : function (api_key, id){
            return modelFindById('plans',api_key,id);
        },
        "save" : function(api_key, id , data){
            return modelSave('plans',api_key,id,data);
        }
    },

    //SUBSCRIPTIONS

    subscription:{
        "create" : function(api_key, data){
            return modelCreate('subscriptions',api_key,data);
        },
        "all" : function(api_key, data){
            return getAll('subscriptions',api_key,data);
        },
        "findById" : function (api_key, id){
            return modelFindById('subscriptions',api_key,id);
        },
        "save" : function(api_key, id , data){
            return modelSave('subscriptions',api_key,id,data);
        },
        "cancel" : function(api_key, id){
            return modelCancel('subscriptions', api_key,id);
        }
    },

    //PAYABLES

    payable:{
        "all" : function(api_key){
            return getAll('payables', api_key, {});
        },
        "findById" : function(api_key, id){
            return modelFindById('payables', api_key, id);
        }
    },

    //BALANCE

    balance:{
        "findById" : function(api_key, id){
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
        "operationsAll" : function(api_key, data){
            return getAll('balance/operations', api_key, data);
        },
        "operationsFindById" : function(api_key, id){
            return modelFindById('balance/operations', api_key,id);
        }
    },

    //BANK_ACCOUNTS

    bank_account:{
        "create" : function(api_key, data){
            return modelCreate('bank_accounts', api_key, data);
        },
        "findById" : function(api_key, id){
            return modelFindById('bank_accounts', api_key, id);
        },
        "all" : function(api_key, data){
            return getAll('bank_accounts', api_key, data);
        }
    },

    //RECIPIENTS

    recipient:{
        "create" : function(api_key, data){
            return modelCreate('recipients',api_key,data);
        },
        "all" : function(api_key, data){
            return getAll('recipients',api_key,data);
        },
        "findById" : function(api_key, id){
            return modelFindById('recipients',api_key,id);
        },
        "save" : function(api_key, id, data){
            return modelSave('recipients', api_key,id,data);
        },
        "balanceFindById" : function(api_key, id){
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
        "operationsAll" : function(api_key, recipient_id, data){
            return getAll('recipients/'+recipient_id+'/balance/operations', api_key, data);
        }
    },

    //TRANSFERS

    transfer:{
        "create" : function(api_key, data){
            return modelCreate('transfers', api_key,data);
        },
        "findById" : function(api_key, id){
            return modelFindById('transfers', api_key, id);
        },
        "all" : function(api_key, data){
            return getAll('transfers', api_key,data);
        },
        "cancel" : function(api_key, id){
            return modelCancel('transfers', api_key, id);
        }
    },

    //TRANSACTIONS

    transaction:{
        "create" : function(api_key, data){
            return modelCreate('transactions', api_key,data);
        },
        "findById" : function(api_key, id){
            return modelFindById('transactions', api_key, id);
        },
        "all" : function(api_key, data){
            return getAll('transactions', api_key,data);
        },
        "splitRulesAll" : function(api_key, id){
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
        "splitRulesFindById" : function(api_key, transaction_id, split_id){
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
        "payablesAll" : function(api_key, id){
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
        "payablesFindById" : function(api_key, transaction_id, payable_id){
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
        "postbackAll" : function(api_key, id){
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
        "postbackFindById" : function(api_key, transaction_id, postback_id){
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
        "postbackRedeliver" : function(api_key, transaction_id, postback_id){
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
        "eventsAll" : function(api_key, id){
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
        "operationsAll" : function(api_key, id){
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
        "refund" : function(api_key, id){
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
        "calculateInstallmentsAmount" : function(api_key, data){
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

    zipcode:{
        "find" : function(api_key, zipcode){
            return modelFindById('zipcodes', api_key, zipcode);
        }
    },

    fingerprint: {
        "verify": function(api_key, id, fingerprint_res){
            if(sha1(id+"#"+api_key) == fingerprint_res)
                return true;
            return false;
        }
    }


};
