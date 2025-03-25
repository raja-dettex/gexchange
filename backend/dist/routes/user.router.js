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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
exports.userRoutes = (0, express_1.Router)();
const userService = new user_service_1.UserService();
const authService = new auth_service_1.AuthService(userService);
exports.userRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("adding users");
    console.log(req.body);
    const { email, provider, password, profilePicture, name, sub } = req.body;
    if (!email || !provider) {
        res.status(400).json({ message: 'email and provider can not be empty' });
    }
    try {
        const user = yield authService.signIn({ username: email, provider, password, name, profilePicture, sub });
        res.status(201).json(user);
        return;
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
        return;
    }
}));
exports.userRoutes.get('/:sub', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("fetching userss");
    const { sub } = req.params;
    console.log(sub);
    try {
        const user = yield userService.getUser(sub);
        console.log("user");
        console.log(user);
        res.status(200).json(user);
        return;
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
        return;
    }
}));
exports.userRoutes.get('/wallets/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log("wallets", userId);
    if (!userId) {
        res.status(400).json({ message: 'userID can not be empty' });
        return;
    }
    try {
        const { inrWallet, solWallet } = yield userService.getWallets(userId);
        res.status(200).json({ inrWallet, solWallet });
        return;
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
        return;
    }
}));
