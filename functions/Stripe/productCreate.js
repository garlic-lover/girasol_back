const models = require("../../models");
const Brand = models.brand;

const depositCalc = require("../depositCalc");

const productCreateFunction = async (stripe, productData) => {
  let priceOptions = [...productData.priceOptions];
  const theBrand = await Brand.findById(productData.brand);

  // Create the product in Stripe
  const product = await stripe.products.create({
    name: `${theBrand.name} - ${productData.name}`,
  });

  // Create the regular prices in Stripe
  for (let i = 0; i < priceOptions.length; i++) {
    let theOption = { ...priceOptions[i] };
    if (theOption.price > 0) {
      // Create the regular prices in Stripe
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: theOption.price * 100,
        currency: "eur",
        recurring: {
          interval: "month",
        },
        metadata: {
          length: theOption.length,
          type: "recurring",
        },
      });
      // Create the price of the deposit in Stripe
      const deposit = await stripe.prices.create({
        product: product.id,
        unit_amount: depositCalc(theOption.price, theOption.length) * 100,
        currency: "eur",
        metadata: {
          length: theOption.length,
          type: "one_time",
        },
      });
      theOption.stripeData = price;
      theOption.deposit = deposit;
      priceOptions.splice(i, 1, theOption);
    }
  }
  return { priceOptions, product };
};

module.exports = productCreateFunction;
