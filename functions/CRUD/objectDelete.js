const modelMapper = require("./modelMapper");

const objectDelete = async (args) => {
  try {
    const model = args.objectType;
    console.log(model);
    // Use the "model mapper" function to import the mongodb model
    let theModel = modelMapper(model);
    const toDelete = await theModel.findById(args._id);
    if (toDelete) {
      await toDelete.remove();
    }
    const mongoList = await theModel.find();
    return { status: "victory", list: mongoList };
  } catch (error) {
    console.log(error);
    return { status: "fail", error: error };
  }
};

module.exports = objectDelete;
