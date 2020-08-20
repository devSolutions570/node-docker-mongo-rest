'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nutritionRepo = require('../controllers/nutritionControl');
const app = express_1.default();
app.get('/get/:id', (req, res) => {
    const result = nutritionRepo.getById(req.params.id).then((result) => {
        res.send(result);
    });
});
app.get('/all', (req, res) => {
    const result = nutritionRepo.getAll().then((result) => {
        res.send(result);
    });
});
app.get('/delete/:id', (req, res) => {
    nutritionRepo.delete(req.params.id).then((result) => {
        res.send(result);
    });
});
app.get('/reset', (req, res) => {
    nutritionRepo.reset().then((result) => {
        res.send(result);
    });
});
app.post('/save', (req, res) => {
    const nutrition = req.body;
    if (nutrition._id !== "") {
        nutritionRepo.getById(nutrition._id).then((result) => {
            if (result !== undefined) {
                nutritionRepo.update(nutrition).then((result) => {
                    res.send(result);
                });
            }
            else {
                nutritionRepo.create(nutrition).then((result) => {
                    res.send(result);
                });
            }
        });
    }
    else {
        nutritionRepo.create(nutrition).then((result) => {
            res.send(result);
        });
    }
});
module.exports = app;
//# sourceMappingURL=nutritionRoutes.js.map