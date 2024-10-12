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
exports.createDeal = exports.getDeals = void 0;
const db_1 = __importDefault(require("../config/db"));
const getDeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM deals ORDER BY created_at DESC');
        return res.json(result.rows);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching deals' });
    }
});
exports.getDeals = getDeals;
const createDeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, category, subcategory, image_url } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized, user not found' });
    }
    const userId = req.user.userId;
    try {
        const result = yield db_1.default.query('INSERT INTO deals (title, description, category, subcategory, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [title, description, category, subcategory, image_url, userId]);
        return res.status(201).json(result.rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating deal' });
    }
});
exports.createDeal = createDeal;
