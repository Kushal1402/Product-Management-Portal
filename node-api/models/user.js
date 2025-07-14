import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: function () {
                return this.registerMethod === 0; // Only required for local signup
            },
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        registerMethod: {
            type: Number,
            enum: [0, 1], // 0 for local signup, 1 for Google signup
            default: 0,
        },
        googleId: {
            type: String,
            sparse: true,
            unique: true,
        },
    },
    {
        timestamps: true
    }
);

// Index on name and email
UserSchema.index({ name: 1, email: 1 });

const User = mongoose.model("User", UserSchema);

export default User;