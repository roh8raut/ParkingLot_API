import express from 'express';
import { getDataFromService, getAllSlots, postDataToService, deleteDataFromService } from '../controllers/parkinglot.controller';

const router = express.Router()

router.route('/')
    .get(getDataFromService);

router.route('/availableSlots')
    .get(getAllSlots)

router.route('/:regNum')
    .delete(deleteDataFromService);

router.route('/')
    .post(postDataToService);


 
export default router;router.route('/')
.get(getDataFromService);