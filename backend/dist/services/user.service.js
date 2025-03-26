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
exports.UserService = void 0;
const client_1 = require("../db/client");
class UserService {
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCreated = yield client_1.client.users.create({
                    data: {
                        username: user.email,
                        provider: user.provider,
                        password: user.password,
                        name: user.name,
                        profilePicture: user.profilePicture,
                        sub: user.sub,
                        solWallet: {
                            create: {
                                publicKey: user.solWallet.publicKey,
                                privateKey: user.solWallet.privateKey
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: user.inrWallet.balance
                            }
                        }
                    }
                });
                return userCreated;
            }
            catch (error) {
                if (error instanceof Error)
                    throw new Error(error.message);
                throw new Error("error creating user");
            }
        });
    }
    getUser(sub) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield client_1.client.users.findFirst({
                    where: {
                        sub: sub
                    }
                });
                return user;
            }
            catch (error) {
                if (error instanceof Error)
                    throw new Error(error.message);
                throw new Error("unable to find user");
            }
        });
    }
    getUserByusername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield client_1.client.users.findFirst({
                    where: {
                        username: username
                    }
                });
                return user;
            }
            catch (error) {
                if (error instanceof Error)
                    throw new Error(error.message);
                throw new Error("unable to find user");
            }
        });
    }
    updateUser(updateMetadata) {
        throw new Error("Method not implemented.");
    }
    getWallets(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const inrWallet = yield client_1.client.inrWallet.findUnique({ where: { userId: userId } });
                const solWallet = yield client_1.client.solWallet.findUnique({ where: { userId: userId } });
                return { inrWallet: { balance: (_a = inrWallet === null || inrWallet === void 0 ? void 0 : inrWallet.balance) !== null && _a !== void 0 ? _a : 0 }, solWallet: { publicKey: (_b = solWallet === null || solWallet === void 0 ? void 0 : solWallet.publicKey) !== null && _b !== void 0 ? _b : "", privateKey: (_c = solWallet === null || solWallet === void 0 ? void 0 : solWallet.privateKey) !== null && _c !== void 0 ? _c : "" } };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
