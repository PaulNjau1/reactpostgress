"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dealController_1 = require("../controllers/dealController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// GET /api/deals - Fetch all deals
// @ts-ignore
router.get('/', dealController_1.getDeals);
// POST /api/deals - Create a new deal (requires authentication)
// @ts-ignore
router.post('/', authMiddleware_1.authenticate, dealController_1.createDeal);
exports.default = router;
