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
exports.server = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const { API_PORT } = process.env;
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.set("port", API_PORT);
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.disable("x-powered-by");
        app.use(routes_1.default);
        app.listen(app.get("port"), () => console.log(`Conectado http://localhost:${app.get("port")}/user/397453373479190538`));
    });
}
exports.server = server;
