const modelMapper = require("./modelMapper");

const objectGet = async (args) => {
  try {
    const model = args.objectType;

    // Use the "model mapper" function to import the mongodb model
    let theModel = modelMapper(model);
    let mongoList = [];

    if (args._id) {
      if (model === "Club") {
        mongoList = await theModel
          .find({ _id: args._id })
          .populate("brand")
          .populate({
            path: "shaft",
            populate: {
              path: "brand",
              model: model,
            },
          });
      } else if (model === "Shaft") {
        mongoList = await theModel.find({ _id: args._id }).populate("brand");
      } else {
        mongoList = await theModel.find({ _id: args._id });
      }
    } else {
      if (model === "Club") {
        mongoList = await theModel
          .find()
          .populate("brand")
          .populate({
            path: "shaftOptions",
            populate: {
              path: "brand",
              model: "Brand",
            },
          });
      } else if (model === "Shaft") {
        mongoList = await theModel.find().populate("brand");
      } else {
        mongoList = await theModel.find();
      }
    }
    return { status: "victory", list: mongoList };
  } catch (error) {
    console.log(error);
    return { status: "fail", error: error };
  }
};

module.exports = objectGet;
