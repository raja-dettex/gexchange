"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routes/user.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/users', user_router_1.userRoutes);
app.listen(4000, () => console.log("listening..."));
