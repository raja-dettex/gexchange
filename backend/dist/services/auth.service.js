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
exports.AuthService = void 0;
const web3_js_1 = require("@solana/web3.js");
class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    signIn(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, provider, name, profilePicture, sub }) {
            try {
                const existingUser = yield this.userService.getUserByusername(username);
                if (!existingUser) {
                    const keypair = web3_js_1.Keypair.generate();
                    const publicKey = keypair.publicKey.toBase58();
                    const privateKey = keypair.secretKey;
                    const createdUser = yield this.userService.addUser({
                        email: username,
                        password,
                        provider,
                        name,
                        profilePicture,
                        sub,
                        solWallet: { privateKey: privateKey.toString(), publicKey },
                        inrWallet: { balance: 0 }
                    });
                    return createdUser;
                }
                return existingUser;
            }
            catch (error) {
                if (error instanceof Error)
                    throw new Error(error.message);
                throw new Error("unable to sign in");
            }
        });
    }
}
exports.AuthService = AuthService;
