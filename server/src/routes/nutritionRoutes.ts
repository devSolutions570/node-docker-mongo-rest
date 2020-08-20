'use strict';

import express, { Request, Response } from 'express';
import { Nutrition, Success } from '../types/type';

const nutritionRepo = require('../controllers/nutritionControl');

const app = express()

app.get('/get/:id', (req: Request, res: Response) => {
    const result = nutritionRepo.getById(req.params.id).then((result: Nutrition)=> {
        res.send(result)
    });
})
app.get('/all', (req: Request, res: Response) => {
    const result = nutritionRepo.getAll().then((result: Nutrition[]) => {
        res.send(result);
    });
})
app.get('/delete/:id', (req: Request, res: Response) => {
    nutritionRepo.delete(req.params.id).then((result: Success) => {
        res.send(result);
    });
})
app.get('/reset', (req: Request, res: Response) => {
    nutritionRepo.reset().then((result: Success) => {
        res.send(result);
    });
})
app.post('/save', (req: Request, res: Response) => {
    const nutrition = req.body;

    if (nutrition._id !== "") {
        nutritionRepo.getById(nutrition._id).then((result: Nutrition)=> {
            if ( result !== undefined) {
                nutritionRepo.update(nutrition).then((result: Success) => {
                    res.send(result);
                });
            } else {
                nutritionRepo.create(nutrition).then((result: Success) => {
                    res.send(result);
                });
            }
        });
    } else {
        nutritionRepo.create(nutrition).then((result: Success) => {
            res.send(result);
        });
    }
});

module.exports = app;