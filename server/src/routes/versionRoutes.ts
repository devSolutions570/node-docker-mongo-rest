'use strict';

import express, { Request, Response } from 'express';
import config from '../../config';

const app = express()

app.get('/api/version', (req: Request, res: Response) => {
    res.send(config.version);
});

module.exports = app;