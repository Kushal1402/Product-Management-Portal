import express from 'express';
const router = express.Router();
import { Login, Register, MakeAdmin } from '../controllers/guest.js';

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login or auto-registration
 *     description: Authenticates user with email and password. Creates a new account if user doesn't exist.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (min 6 characters)
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login or registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully.
 *                 result:
 *                   type: object
 *                   properties:
 *                      _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c85
 *                      email:
 *                       type: string
 *                       example: user@example.com
 *                      name:
 *                       type: string
 *                       example: user
 *                      role:
 *                       type: string
 *                       example: user
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists with this email
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
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: The email field is required
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
// @route   POST /api/login
// @desc    Login with email and password
// @access  Public
router.post("/login", Login);

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: User registration
 *     description: Registers a new user with username, email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username 
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: string
 *                 description: User's username
 *                 example: user123
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (min 6 characters)
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Register successfully.
 *                 result:
 *                   type: object
 *                   properties:
 *                      _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c85
 *                      email:
 *                       type: string
 *                       example: user@example.com
 *                      name:
 *                       type: string
 *                       example: user
 *                      role:
 *                       type: string
 *                       example: user
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
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
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: The email field is required
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
// @route   POST /api/signup
// @desc    Signup with username, email and password
// @access  Public
router.post("/signup", Register)

/**
 * @swagger
 * /api/add-admin:
 *   post:
 *     summary: Add a new admin user
 *     description: Creates a new admin user with the provided email, password, and name.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin's email address
 *                 example: mayank@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Admin's password (min 6 characters)
 *                 example: password@123#
 *               name:
 *                 type: string
 *                 description: Admin's name
 *                 example: Mayank
 *     responses:
 *       200:
 *         description: Admin added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin added successfully.
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c85
 *                     email:
 *                       type: string
 *                       example: mayank@gmail.com
 *                     name:
 *                       type: string
 *                       example: Mayank
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
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
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: The email field is required
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
// @route   POST /api/add-admin
// @desc    Add a new admin user
// @access  Public
router.post("/add-admin", MakeAdmin);

export default router;