const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url, { family: 4 })
  .then((res) => console.log("connected to MongoDB"))
  .catch((error) => console.log(`error connecting to MongoDB:`, error.message));

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: [true, "name is required"] },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{2,}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, "number is required"],
    minLength: [8, "number must be at least 8 characters long"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
