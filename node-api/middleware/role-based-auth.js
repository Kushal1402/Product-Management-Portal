import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

const Authorize = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                return res.status(401).json({
                    message: 'Authentication failed. No token provided.',
                });
            }

            const token = req.headers.authorization.split(' ')[1];
            const decoded = await jwt.verify(token, process.env.JWT_KEY);
            const { id } = decoded;

            const userData = await UserModel.findOne({ _id: id });
            if (!userData) {
                return res.status(401).json({
                    message: 'Authentication failed. User not found.',
                });
            };

            // Add user data to request object
            req.userData = userData;

            if (allowedRoles.length === 0 || allowedRoles.includes(userData.role)) {
                next();
            } else {
                return res.status(403).json({
                    message: 'Access denied. Insufficient permissions.',
                });
            }
        } catch (err) {
            return res.status(401).json({
                message: 'Authentication failed. Please try again.',
            });
        }
    };
};

export default Authorize;