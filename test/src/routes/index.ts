import express , {Request, Response} from 'express';
import { Test } from '../models/test';

const router = express.Router();

router.get('/api/tests', async (req: Request, res: Response) => {
    
    const testList = await Test.find({});
    res.status(200).send({ erkan: testList });
}
);

export { router as indexTestRouter};