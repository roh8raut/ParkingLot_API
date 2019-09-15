import mongoose from 'mongoose';

let parkingLotData = new mongoose.Schema({
    
        "totalParkingSlots": {type: Number, max: 20},
        "parkingDetails":[  
           {  
              "regNum": String,
              "slotAlloted": {type: Number, min: 0, max: 20},
              "bookingDateAndTime": {type: Date, default: Date.now()}
           }
        ],
});

// parkingLotData.set('autoIndex', false);

// parkinglotdatas

module.exports =  mongoose.model("parkingLotData", parkingLotData);