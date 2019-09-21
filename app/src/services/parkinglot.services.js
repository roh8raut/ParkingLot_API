import parkingLotData from "../models/parkinglot.model";

let slotsArray = [];
let dataToReturn;
let initialSetup = true;

// Initialize slots array

export const updateSlotsArray = async () => {

  await parkingLotData.distinct("Slots").then(data => {
    if(data && data.length === 0) {
      for(let i = 1; i < 21; i++) {
        slotsArray.push(i);
      }
      let SlotsArr = new parkingLotData({
        Slots: slotsArray
      })
      SlotsArr.save(error => {
        if (error) {
          console.log(error);
          return "";
        }
      });
    } else {
      slotsArray = data;
    }
    console.log("SlotsAr>>", slotsArray);
  });
};

export const parkedVehicles = async regNum => {
  await parkingLotData.distinct("parkingDetails.regNum").then(data => {
    dataToReturn = { regNum: data };
  });

  return dataToReturn;
};

export const getSlotNumber = async regNum => {
  await parkingLotData
    .find({}, { parkingDetails: { $elemMatch: { regNum: regNum } } })
    .then(data => {
      const dataObj = data.find(details => {
        return details.parkingDetails && details.parkingDetails.length > 0;
      });
      dataToReturn = dataObj
        ? {
            msg: "Your car is parked in slot: ",
            slotAlloted: dataObj.parkingDetails[0].slotAlloted
          }
        : { msg: "No Car is Parked with that registration number:(" };
    });
  return dataToReturn;
};
// await parkingLotData.findOneAndUpdate({ "_id" : "5d30af93df497513e52d0a30"},{$push: {parkingDetails: {dataObj}}})
export const getAllAvailableSlots = async () => {
  await updateSlotsArray();
  console.log("exec");
  return slotsArray.length > 0
    ? { slots: slotsArray }
    : { msg: "All Slots are booked" };
};

export const postDataToTable = async req => {
  // let ds = new parkingLotData({})
  await parkingLotData
    .find({ parkingDetails: { $elemMatch: { regNum: req.regNum } } })
    .then(async data => {
      if (data.length !== 0) {
        dataToReturn = {
          msg: "We are sorry to inform that your entry already exists."
        };
      } else {
        let isSlotAlloted = await getAvailableSlot(req.regNum);
        dataToReturn = isSlotAlloted
          ? { msg: "Your car is parked in slot: ", slotAlloted: isSlotAlloted }
          : { msg: "All slots are booked" };
      }
    })
    .catch(err => console.log(err));
  return dataToReturn;
};

// export const updateDataToTable = async () => {
//   await parkingLotData.findOneAndUpdate()
//         .then((data) => {
//             dataToReturn = data;
//           });
//           return dataToReturn;
// }

export const deleteDataFromTable = async regNum => {
  await parkingLotData
    .find({}, { parkingDetails: { $elemMatch: { regNum: regNum } } })
    .then(async data => {
      const dataObj = data.find(details => {
        return details.parkingDetails && details.parkingDetails.length > 0;
      });
      dataToReturn = dataObj
        ? addSlotToSlotArr(dataObj)
        : { msg: "No Car is Parked with that registration number:(" };
    });
  return dataToReturn;
};

// > db.parkinglotdatas.findOne({},{"parkingDetails": {$elemMatch: {regNum: "1234"}}})

const getAvailableSlot = async regNum => {
  if (slotsArray.length > 0) {
    let slotAlloted = parseInt(slotsArray.splice(0, 1));
    console.log("slotAlloted?>>", slotsArray, slotAlloted);
    await parkingLotData
      .update({}, { $pull: { Slots: slotAlloted } })
      .then(async data => {
        console.log("pulled data", data);
        await updateSlotsArray();
      });
    if (initialSetup) {
      initialSetup = false;
      let details = new parkingLotData({
        totalParkingSlots: 20,
        parkingDetails: [
          {
            regNum: regNum,
            slotAlloted: slotAlloted,
            bookingDateAndTime: new Date()
          }
        ]
      });
      await details.save(error => {
        if (error) {
          console.log(error);
          return "";
        }
      });
      return slotAlloted;
    } else {
      await parkingLotData.findOneAndUpdate({
        $push: {
          parkingDetails: {
            regNum: regNum,
            slotAlloted: slotAlloted,
            bookingDateAndTime: new Date()
          }
        }
      });
      return slotAlloted;
    }
  } else {
    return "";
  }
};

const addSlotToSlotArr = async data => {
  const dataObj = {
    slotToBeAdded: data.parkingDetails[0].slotAlloted,
    bookingDate: data.parkingDetails[0].bookingDateAndTime,
    regNum: data.parkingDetails[0].regNum
  };
  const amountToBePaid = calculateAmountToPaid(dataObj.bookingDate);
  await parkingLotData.update(
    {},
    { $pull: { parkingDetails: { regNum: dataObj.regNum } } }
  );
  // slotsArray.push(dataObj.slotToBeAdded);
  console.log(" dataObj.slotToBeAdded>>", dataObj.slotToBeAdded);
  await parkingLotData
    .update({}, { $push: { Slots: dataObj.slotToBeAdded } })
    .then(async () => {
      await updateSlotsArray();
    });

  return {
    msg: "Your car is moved from parking space.",
    amountToBePaid: `Amount to be paid ${amountToBePaid}₹`
  };
};

const calculateAmountToPaid = bookingDate => {
  let currentDate = new Date();
  const diff = currentDate.getTime() - bookingDate.getTime();
  return Math.floor(diff / 60000) === 0 ? 1 : Math.floor(diff / 60000);
};
