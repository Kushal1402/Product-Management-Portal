import niv from 'node-input-validator';

import UserModal from '../models/user.js';
import ProductModal from '../models/product.js';

export const AddProduct = async (req, res, next) => {

    const user = req.userData;

    try {
        const objValidation = new niv.Validator(req.body, {
            productName: "required|string|maxLength:255",
            productDescription: "required|string",
            variants: "array|required",
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

        const { productName, productDescription, variants } = req.body;

        // Check if the product already exists
        let product = await ProductModal.findOne({ productName });
        if (product) {
            return res.status(400).json({ message: "Product already exists" });
        }

        let AllVariant = null;
        if (variants && variants.length > 0) {
            AllVariant = variants.map((item) => {
                return {
                    name: item.name,
                    amount: item.amount
                }
            });
        }

        // Create a new product
        product = new ProductModal({
            productName,
            productDescription,
            variants: AllVariant,
            userId: user.id
        });

        await product.save();

        return res.status(201).json({
            message: "Product added successfully.",
            result: product
        });
    } catch (error) {
        console.error("Error in add product : ", error);
        next(error);
    }
};

export const LatestProducts = async (req, res, next) => {
    try {
        let result = await ProductModal.find({}).sort({ createdAt: -1 }).limit(10).populate("userId", "-_id name email");

        if (result.length > 0) {
            return res.status(200).json({
                message: "Latest products fetched successfully.",
                result: result
            });
        } else {
            return res.status(404).json({
                message: "No products found."
            });
        }
    } catch (error) {
        console.log("Error in latest products : ", error);
        next(error);
    }
};

export const Statistics = async (req, res, next) => {
    try {

        const totalProducts = await ProductModal.countDocuments({});
        const totalUsers = await UserModal.countDocuments({ role: "user" });

        return res.status(200).json({
            message: "Statistics fetched successfully.",
            result: {
                totalProducts,
                totalUsers
            }
        });
    } catch (error) {
        console.log("Error in statistics : ", error);
        next(error);
    }
}