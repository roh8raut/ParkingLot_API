import mongoose from 'mongoose';
import parkingLotData from '../models/parkinglot.model';
const url =  'mongodb://localhost:27017/parkinglot';

const slotsArray = [];
let dataToReturn;

// slots Array which will consist of slots
for (let i = 1; i < 21; i++) {
  slotsArray.push(i);
}

mongoose.connect(url, {useNewUrlParser: true});


export const getSlotNumber = async (regNum) => {
    await parkingLotData.findOne({},{"parkingDetails": {$elemMatch : {regNum: regNum }}})
          .then((data) => {
              dataToReturn = (data && data.parkingDetails && data.parkingDetails.length > 0) ? {"msg": "Your car is parked in slot: ",slotAlloted: data.parkingDetails[0].slotAlloted} : {"msg": "No Car is Parked with that registration number:("};
            });
            return dataToReturn;
}
// await parkingLotData.findOneAndUpdate({ "_id" : "5d30af93df497513e52d0a30"},{$push: {parkingDetails: {dataObj}}})
export const getAllAvailableSlots = async () => {
  
  return (slotsArray.length > 0) ? {"slots": slotsArray} : {"msg": "All Slots are booked"};

}
 export const postDataToTable = async (req) => {
  // let ds = new parkingLotData({})
  await parkingLotData.find({"parkingDetails": {$elemMatch: {"regNum": req.regNum}}})
                      .then(async (data) => {
                        if(data.length !== 0) {
                          dataToReturn = {"msg": "We are sorry to inform that your entry already exists."}
                        } else {
                          let isSlotAlloted = await getAvailableSlot(req.regNum);
                          dataToReturn =  isSlotAlloted ? {"msg": "Your car is parked in slot: ","slotAlloted": isSlotAlloted}:{"msg": "All slots are booked"}
                        }
 
                      })
                      return dataToReturn;
}

// export const updateDataToTable = async () => {
//   await parkingLotData.findOneAndUpdate()
//         .then((data) => {
//             dataToReturn = data;
//           });
//           return dataToReturn;
// }

export const deleteDataFromTable = async (regNum) => {
  
  await parkingLotData.findOne({},{"parkingDetails": {$elemMatch: {regNum: regNum}}})
          .then(async (data) => {
              dataToReturn = (data && data.parkingDetails && data.parkingDetails.length > 0) ? addSlotToSlotArr(data) : {"msg": "No Car is Parked with that registration number:("};
          });
          return dataToReturn;
}

// > db.parkinglotdatas.findOne({},{"parkingDetails": {$elemMatch: {regNum: "1234"}}})

const getAvailableSlot  = async (regNum) => {
      if(slotsArray.length > 0){
        let slotAlloted = parseInt(slotsArray.splice(0,1));
          await parkingLotData.findOneAndUpdate({$push: {"parkingDetails": {regNum: regNum, slotAlloted: slotAlloted, bookingDateAndTime: new Date()}}})
          return slotAlloted;
      } else {
        return "";
      }
}

const addSlotToSlotArr = async (data) => {
  const dataObj = {slotToBeAdded: data.parkingDetails[0].slotAlloted, bookingDate: data.parkingDetails[0].bookingDateAndTime, regNum: data.parkingDetails[0].regNum};
  const amountToBePaid = calculateAmountToPaid(dataObj.bookingDate);
    await parkingLotData.update({},{$pull: {"parkingDetails": {regNum: dataObj.regNum}}})
        slotsArray.push(dataObj.slotToBeAdded);
        return {"msg": "Your car is moved from parking space.","amountToBePaid":`Amount to be paid ${amountToBePaid}₹`};
}

const calculateAmountToPaid = (bookingDate) => {
    let currentDate = new Date();
    const diff = currentDate.getTime() - bookingDate.getTime();
    return (Math.floor(diff/60000) === 0) ? 1 : Math.floor(diff/60000);
}
