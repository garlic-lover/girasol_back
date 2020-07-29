const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const accountCreateFunction = require("./customerAccountCreate");
const customerAddressModify = require("./customerAddressModify");
const cardGetFunction = require("./cardGet");

/* 
    Customer 
*/

// Customer account create
const accountCreate = (userData) => {
  return accountCreateFunction(stripe, userData);
};

// Customer address modify
const addressModify = (userData, firstTime) => {
  return customerAddressModify(stripe, userData, firstTime);
};

// Get the info of an user's credit card
const cardGet = (customerId, cardId) => {
  return cardGetFunction(stripe, customerId, cardId);
};

module.exports = {
  accountCreate,
  addressModify,
  cardGet,
};
