const { model, models, Schema } = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email is already exists!"],
        required: [true, "Email is required!"]
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
        match: [/^[a-zA-Z0-9]+$/, "Username is invalid"]
    },
    image: String
});

const User = models.User || model("User", UserSchema);

export default User;