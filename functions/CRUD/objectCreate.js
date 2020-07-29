const modelMapper = require("./modelMapper");
const stripe = require("./Stripe/stripeFunctions");

const objectCreate = async (args) => {
  try {
    const model = args.objectType;
    // Create the object to add to the database according to its params
    let newObject = {};
    let paramsTab = Object.keys(args[model]);
    for (let i = 0; i < paramsTab.length; i++) {
      if (paramsTab[i] === "priceOptions") {
        let stripeInfos = await stripe.productCreate(args[model]);
        newObject.priceOptions = stripeInfos.priceOptions;
        newObject.stripeData = stripeInfos.product;
      } else {
        newObject[paramsTab[i]] = args[model][paramsTab[i]];
      }
    }

    // Use the "model mapper" function to import the mongodb model
    let theModel = modelMapper(model);
    const mongoObject = await new theModel(newObject).save();
    const mongoTab = await theModel.find();
    return { status: "victory", tab: mongoTab };
  } catch (error) {
    console.log(error);
    return { status: "fail", error: error };
  }
};

module.exports = objectCreate;
