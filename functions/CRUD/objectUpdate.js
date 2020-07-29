const modelMapper = require("./modelMapper");

const objectUpdate = async (args) => {
  try {
    const model = args.objectType;
    console.log(model);
    // Use the "model mapper" function to import the mongodb model
    let theModel = modelMapper(model);
    let toModify = await theModel.findById(args.objectId);
    if (toModify) {
      console.log(toModify);
      let keysTab = Object.keys(args[args.objectType]);
      console.log(keysTab);
      for (let i = 0; i < keysTab.length; i++) {
        let key = [keysTab[i]];
        if (key === "priceOptions") {
        } else {
          if (toModify[key] !== args[args.objectType][key]) {
            toModify[key] = args[args.objectType][key];
          }
        }
      }
      await toModify.save();
    }
    const mongoList = await theModel.find();
    return { status: "victory", list: mongoList };
  } catch (error) {
    console.log(error);
    return { status: "fail", error: error };
  }
};

module.exports = objectUpdate;
