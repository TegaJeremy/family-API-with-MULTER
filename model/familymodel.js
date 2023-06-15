const mongoose = require( 'mongoose' );

  
  const familySchema = new mongoose.Schema({
    fatherName: {
        type: String,
        required: true
      },
      motherName: {
        type: String,
        required: true
      },
      children: [{
        type: String,
        // required: true
      }],
      childrenProfile: [{
      
        filename: String,
      }]
    
    
   
}, { timestamps: true } );

const familyModel = mongoose.model( "familyApi", familySchema );

module.exports = familyModel;