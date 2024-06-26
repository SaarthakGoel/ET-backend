import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  amount : {
    type : Number,
    required : true
  },
  currentValue : {
    type : Number,
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

export default mongoose.model('Investment' , InvestmentSchema);