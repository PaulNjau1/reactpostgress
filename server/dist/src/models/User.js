"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserById = void 0;
// src/models/User.ts
const db_1 = __importDefault(require("../config/db"));
// Fetch user by ID
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);
    return result.rows[0];
});
exports.getUserById = getUserById;
// Update user profile
const updateUserProfile = (userId, username, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email', [username, email, userId]);
    return result.rows[0];
});
exports.updateUserProfile = updateUserProfile;
