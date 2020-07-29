const models = require("../models");

const { brand, club, shaft, product, insurance } = models;

const modelMapper = (model) => {
  switch (model) {
    case "Brand":
      return brand;
    case "Club":
      return club;
    case "Shaft":
      return shaft;
    case "Product":
      return product;
    case "Insurance":
      return insurance;
    default:
      return;
  }
};

module.exports = modelMapper;
