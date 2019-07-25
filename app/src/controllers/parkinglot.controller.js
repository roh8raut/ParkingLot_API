import { getSlotNumber,getAllAvailableSlots, postDataToTable, upadteDataToTable, deleteDataFromTable } from '../services/parkinglot.services';

// import { getDataFromTable } from '../models/parkinglot.model';

export const getDataFromService = async (req, res) => {
     res.json(await getSlotNumber(req.params.regNum))
}

export const getAllSlots = async (req, res) => {
     res.json(await getAllAvailableSlots())
}

export const postDataToService = async (req, res) => {
     res.json(await postDataToTable(req.body));
}

// export const updateDataToService = async (req, res) => {
//      res.json(await upadteDataToTable());
// }

export const deleteDataFromService = async (req, res) => {
     res.json(await deleteDataFromTable(req.params.regNum))
}
