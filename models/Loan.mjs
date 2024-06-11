import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  amount : {
    type : Number,
    required : true
  },
  lended : {
    type : Boolean,
    required : true
  },
  title : {
    type : String,
    required : true
  },
},
  {
    timestamps : true
  }
)

export default mongoose.model('Loan' , LoanSchema);