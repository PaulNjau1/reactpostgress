"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const dealRoutes_1 = __importDefault(require("./src/routes/dealRoutes"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/deals', dealRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.listen(5000, () => console.log('Server running on port 5000'));
