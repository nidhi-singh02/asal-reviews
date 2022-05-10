const mongoose = require("mongoose");
const { Password } = require("../Services/password");

const UserSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
    },
    UserName: {
      type: String,
    },
    Email: {
      type: String,
    },
    Hashed_Password: {
      type: String,
    },
    PhoneNo: {
      type: Number,
    },
    Role: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret.UserId;
        delete ret.UserId;
        delete ret._id;
        delete ret.Hashed_Password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("Hashed_Password")) {
    const hashed = await Password.toHash(this.get("Hashed_Password"));
    this.set("Hashed_Password", hashed);
  }
  done();
});

module.exports = mongoose.model("users", UserSchema);
