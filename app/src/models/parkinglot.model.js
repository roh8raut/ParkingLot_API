import mongoose from 'mongoose';

let parkingLotData = mongoose.Schema({
    
        "totalParkingSlots": Number,
        "parkingDetails":[  
           {  
              "regNum": {type: String, unique: true},
              "slotAlloted": Number,
              "bookingDateAndTime": Date
           }
        ]
}
    );



module.exports =  mongoose.model("parkingLotData", parkingLotData);