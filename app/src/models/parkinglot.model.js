import mongoose from 'mongoose';

let parkingLotData = new mongoose.Schema({
    
        "Slots": [Number],
        "parkingDetails":[
           {  
              "regNum": String,
              "slotAlloted": {type: Number, min: 0, max: 20},
              "bookingDateAndTime": {type: Date, default: Date.now()}
           }
        ],
});

// parkingLotData.set('autoIndex', false);

module.exports =  mongoose.model("PLDATAS", parkingLotData);