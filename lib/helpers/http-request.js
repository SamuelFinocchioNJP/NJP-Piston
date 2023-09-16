"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequest = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function httpRequest(url, method, body = {}) {
    switch (method) {
        case "GET": {
            const request = await (0, node_fetch_1.default)(url);
            return await request.json();
        }
        case "POST": {
            const request = await (0, node_fetch_1.default)(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });
            return await request.json();
        }
    }
}
exports.httpRequest = httpRequest;
