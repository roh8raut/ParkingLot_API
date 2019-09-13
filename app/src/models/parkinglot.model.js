import mongoose from 'mongoose';

let parkingLotData = new mongoose.Schema({
    
        "totalParkingSlots": Number,
        "parkingDetails":[  
           {  
              "regNum": String,
              "slotAlloted": Number,
              "bookingDateAndTime": Date
           }
        ]
});



module.exports =  mongoose.model("parkingLotData", parkingLotData);