'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mongoose = require('mongoose');

// _src/helpers/db.ts
var transaction = async (operation, clientSession) => {
  const session = clientSession ?? await mongoose.startSession();
  clientSession ?? session.startTransaction();
  return await operation(session).then(async (res) => {
    await session.commitTransaction();
    return res;
  }).catch(async (err) => {
    await session.abortTransaction();
    throw err;
  }).finally(() => {
    session.endSession();
  });
};
var db = { transaction };
var db_default = db;

exports.default = db_default;
exports.transaction = transaction;
