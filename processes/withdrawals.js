var SqlMqWorker = require('sql-mq-worker');
var WithdrawalProcessor = require(__dirname+'/../lib/core/withdrawal_processor.js');
var gatewayd = require(__dirname+'/../');

var worker = new SqlMqWorker({
  Class: gatewayd.data.models.rippleTransactions,
  predicate: { where: {
    state: 'incoming'
  }},
  job: function(incomingPayment, callback) {
    var withdrawalProcessor = new WithdrawalProcessor(incomingPayment);
    withdrawalProcessor.processIncomingPayment(callback);
  }
});

worker.start();

