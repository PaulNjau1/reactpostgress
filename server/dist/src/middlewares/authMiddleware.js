"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' }); // Send response without using return
        return; // Exit the function early
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // Cast decoded to your expected type
        req.user = decoded; // Attach the user information to the request object
        next(); // Call next to pass control to the next middleware
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' }); // Send response without using return
        return; // Exit the function early
    }
};
exports.authenticate = authenticate;
