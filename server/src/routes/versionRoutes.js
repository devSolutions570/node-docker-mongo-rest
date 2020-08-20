'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../../config"));
const app = express_1.default();
app.get('/api/version', (req, res) => {
    res.send(config_1.default.version);
});
module.exports = app;
//# sourceMappingURL=versionRoutes.js.map