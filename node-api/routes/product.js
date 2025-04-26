import express from 'express';
const router = express.Router();
import Authorize from '../middleware/role-based-auth.js';
import { AddProduct, LatestProducts, Statistics } from '../controllers/product.js';

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product with name, description, and at least one variant.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productDescription
 *               - variants
 *             properties:
 *               productName:
 *                 type: string
 *                 maxLength: 255
 *                 description: Product name
 *                 example: Smartphone XYZ
 *               productDescription:
 *                 type: string
 *                 description: Product description
 *                 example: Latest smartphone with advanced features
 *               variants:
 *                 type: array
 *                 description: Array of product variants
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - amount
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: 128GB Black
 *                     amount:
 *                       type: number
 *                       example: 15599.99
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added successfully.
 *                 result:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The auto-generated id of the product
 *                       productName:
 *                         type: string
 *                         description: The name of the product
 *                       productDescription:
 *                         type: string
 *                         description: The description of the product
 *                       variants:
 *                         type: array
 *                         description: Array of product variants
 *                         items:
 *                            type: object
 *                            required:
 *                               - name
 *                               - amount
 *                            properties:
 *                              name:
 *                                type: string
 *                                description: The name of the variant
 *                              amount:
 *                                type: number
 *                                description: The price of the variant
 *                       userId:
 *                         type: string
 *                         description: The ID of the user who added the product
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when product was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when product was last updated
 *       400:
 *         description: Product already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product already exists
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden - User role not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied. Not authorized to access this resource.
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: name
 *                       message:
 *                         type: string
 *                         example: The name field is required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
// @route   POST /api/product/add
// @desc    Add a new product by user
// @access  Private
router.post("/add", Authorize(["user"]), AddProduct);

/**
 * @swagger
 * /api/product/latest-products:
 *   get:
 *     summary: Get latest products
 *     description: Get the 10 most recent products added to the system (admin only).
 *     tags:
 *       - Admin Dashboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Latest products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Latest products fetched successfully.
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - productName
 *                       - variants
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The auto-generated id of the product
 *                       productName:
 *                         type: string
 *                         description: The name of the product
 *                       productDescription:
 *                         type: string
 *                         description: The description of the product
 *                       variants:
 *                         type: array
 *                         description: Array of product variants
 *                         items:
 *                            type: object
 *                            required:
 *                               - name
 *                               - amount
 *                            properties:
 *                              name:
 *                                type: string
 *                                description: The name of the variant
 *                              amount:
 *                                type: number
 *                                description: The price of the variant
 *                       userId:
 *                         type: string
 *                         description: The ID of the user who added the product
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when product was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when product was last updated
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden - User role not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied. Not authorized to access this resource.
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No products found.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
// @route   GET /api/latest-products
// @desc    Get latest products added by user
// @access  Private
router.get("/latest-products", Authorize(["admin"]), LatestProducts);

/**
 * @swagger
 * /api/product/statistics:
 *   get:
 *     summary: Get statistics for products and users
 *     description: Get statistics about total products and users in the system (admin only).
 *     tags:
 *       - Admin Dashboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Statistics fetched successfully.
 *                 result:
 *                   type: object
 *                   properties:
 *                      totalProducts:
 *                         type: number
 *                         description: Total number of products in the system
 *                      totalUsers:
 *                         type: number
 *                         description: Total number of users in the system
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden - User role not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied. Not authorized to access this resource.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
// @route   GET /api/statistics
// @desc    Get statistics of products and users
// @access  Private
router.get("/statistics", Authorize(["admin"]), Statistics);

export default router;