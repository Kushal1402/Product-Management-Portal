import niv from 'node-input-validator';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModal from '../models/user.js';

export const Login = async (req, res, next) => {

    try {
        const objValidation = new niv.Validator(req.body, {
            email: "required|email",
            password: "required|minLength:6",
        });
        const matched = await objValidation.check();
        if (!matched) {
            const errorMessages = [];
            for (const field in objValidation.errors) {
                errorMessages.push({
                    field: field,
                    message: objValidation.errors[field].message
                });
            }
            return res.status(422).json({
                message: "Validation failed",
                errors: errorMessages
            });
        };

        const { email, password } = req.body;

        // Check if the user exists
        let user = await UserModal.findOne({ email });
        let message = "Logged in successfully.";

        if (user && user.registerMethod === 0 && (user !== null || user !== undefined)) {
            // User exists, verify password
            const isPasswordCorrect = await bycrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        } else if (!user && (user == null || user == undefined)) {
            return res.status(400).json({ message: "User does not exist with this email" });
        } else if (user && user.registerMethod !== 0 ) {
            return res.status(400).json({ message: "User already exists with this email but has not registered with credentials yet." });
        }
        // else {
        //     // User does not exist, create a new user
        //     const hashedPassword = await bycrypt.hash(password, 12);

        //     user = new UserModal({
        //         email,
        //         password: hashedPassword,
        //         name: email.split('@')[0],
        //     });

        //     await user.save();
        //     message = "Your profile has been registered successfully.";
        // }

        // Generate token for authentication
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        );

        const userToReturn = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        res.status(200).json({
            message,
            result: userToReturn,
            token
        });
    } catch (error) {
        console.error("Error in login : ", error);
        next(error);
    }
};

export const Register = async (req, res, next) => {

    try {
        const objValidation = new niv.Validator(req.body, {
            username: "required|string|minLength:3|maxLength:56",
            email: "required|email",
            password: "required|minLength:6",
        });
        const matched = await objValidation.check();
        if (!matched) {
            const errorMessages = [];
            for (const field in objValidation.errors) {
                errorMessages.push({
                    field: field,
                    message: objValidation.errors[field].message
                });
            }
            return res.status(422).json({
                message: "Validation failed",
                errors: errorMessages
            });
        };

        const { username, email, password } = req.body;

        // Check if the user exists
        let user = await UserModal.findOne({ email, registerMethod: 0 });
        let message = "";

        // Throw error if user already exists
        if (user && (user !== null || user !== undefined)) {
            return res.status(400).json({ message: "User already exists with this email" });
        } else {
            // User does not exist, create a new user
            const hashedPassword = await bycrypt.hash(password, 12);

            user = new UserModal({
                email,
                password: hashedPassword,
                name: username?.trim(),
            });

            await user.save();
            message = "Your profile has been registered successfully.";
        }

        // Generate token for authentication
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        );

        const userToReturn = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        res.status(200).json({
            message,
            result: userToReturn,
            token
        });

    } catch (error) {
        console.error("Error in register : ", error);
        next(error);
    }
};

export const MakeAdmin = async (req, res, next) => {
    try {
        const objValidation = new niv.Validator(req.body, {
            email: "required|email",
            password: "required|minLength:6",
            name: "string|minLength:3|maxLength:56",
        });
        const matched = await objValidation.check();
        if (!matched) {
            const errorMessages = [];
            for (const field in objValidation.errors) {
                errorMessages.push({
                    field: field,
                    message: objValidation.errors[field].message
                });
            }
            return res.status(422).json({
                message: "Validation failed",
                errors: errorMessages
            });
        };

        const { name, email, password } = req.body;

        // Check if the user exists
        let CheckUser = await UserModal.findOne({ email });
        if (CheckUser && (CheckUser !== null || CheckUser !== undefined)) {
            return res.status(400).json({ message: "Duplicate record found with this email" });
        };
        // Check if the user is already an admin
        if (CheckUser && CheckUser.role === "admin") {
            return res.status(400).json({ message: "User is already an admin" });
        }
        // Check if the user is already a user
        if (CheckUser && CheckUser.role === "user") {
            return res.status(400).json({ message: "User is already a user" });
        }

        const newAdmin = new UserModal();

        newAdmin.name = name?.trim();
        newAdmin.email = email?.trim();
        const hashedPassword = await bycrypt.hash(password, 12);
        newAdmin.password = hashedPassword;
        newAdmin.role = "admin";

        await newAdmin.save();

        delete newAdmin._doc.password;
        delete newAdmin._doc.__v;
        delete newAdmin._doc.createdAt;
        delete newAdmin._doc.updatedAt;

        res.status(200).json({
            message: "Admin added successfully.",
            result: newAdmin
        });
    } catch (error) {
        console.error("Error in make admin : ", error);
        next(error);
    }
};

export const GoogleLogin = async (req, res, next) => {
    try {
        const objValidation = new niv.Validator(req.body, {
            idToken: "required|string",
        });
        const matched = await objValidation.check();
        if (!matched) {
            const errorMessages = [];
            for (const field in objValidation.errors) {
                errorMessages.push({
                    field: field,
                    message: objValidation.errors[field].message
                });
            }
            return res.status(422).json({
                message: "Validation failed",
                errors: errorMessages
            });
        };

        const { idToken, name, email } = req.body;
        // console.log("Google Login Request Body:", req.body);

        // Check if user already exists with this email
        let user = await UserModal.findOne({ email: email, registerMethod: 1 });
        // console.log("User found:", user);

        let message = "Logged in successfully with Google.";

        if (!user) {
            // Create a new user if not exists
            user = new UserModal({
                email: email,
                name: name,
                googleId: idToken,
                registerMethod: 1, // Google signup
            });

            await user.save();
            message = "Your profile has been created successfully with Google.";
        } else if (user) {
            // User exists, update Google ID if not already set
            if (!user.googleId) {
                user.googleId = idToken;
                await user.save();
                message = "Your Google account has been linked successfully.";
            }
        } else if (user && user.registerMethod !== 1) {
            return res.status(400).json({ message: "User already exists with this email but has not linked Google account yet." });     
        }

        // Generate token for authentication
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        );

        const userToReturn = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        res.status(200).json({
            message,
            result: userToReturn,
            token
        });
    } catch (error) {
        console.error("Error in Google login: ", error);
        next(error);
    }
};