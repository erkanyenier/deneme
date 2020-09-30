import express , {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';

import {Test} from '../models/test';

const router = express.Router();

router.post('/api/tests/new', 
[
    body('testName')
    .trim()
    .notEmpty()
    .withMessage('test adı dolu olmalı'),
    body('testNo')
    .trim()
    .notEmpty()
    .isInt({min:0})
    .withMessage('test no dolu olmalı'),
],
async(req: Request,res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const{testName,testNo, isCorrect} = req.body;

    //const existingTest = Test.find({testNo});

        /*if (existingTest){
            return res.status(400).json({errors: ['Bu test no var.']});
        }*/

        const test = Test.build({testName,testNo,isCorrect});
        await test.save();
        res.status(201).send(test);

    } 
);


export { router as newTestRouter};

