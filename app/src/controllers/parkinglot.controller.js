import { getSlotNumber,getAllAvailableSlots, postDataToTable, deleteDataFromTable, parkedVehicles} from '../services/parkinglot.services';

// import { getDataFromTable } from '../models/parkinglot.model';


export const getDataFromService = async (req, res) => {
     res.json(await getSlotNumber(req.query.regNum))
}

export const getAllSlots = async (req, res) => {
     res.json(await getAllAvailableSlots())
}

export const postDataToService = async (req, res) => {
     res.json(await postDataToTable(req.body));
}

export const getParkedVehicles = async (req, res) => {
     res.json(await parkedVehicles());
}

export const deleteDataFromService = async (req, res) => {
     res.json(await deleteDataFromTable(req.params.regNum))
}
