import express from 'express';
import { getDataFromService, getAllSlots, postDataToService, deleteDataFromService } from '../controllers/parkinglot.controller';

const router = express.Router()

router.route('/:regNum')
    .get(getDataFromService);

router.route('/all/go')
    .get(getAllSlots)

router.route('/:regNum')
    .delete(deleteDataFromService);

router.route('/')
    .post(postDataToService);


 
export default router;router.route('/')
.get(getDataFromService);