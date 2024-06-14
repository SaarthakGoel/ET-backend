import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  expense: {
    currentMonth: {
      type: Number,
      default: 0
    },
    lastMonth: {
      type: Number,
      default: 0
    },
    twoMonthsAgo: {
      type: Number,
      default: 0
    }
  },
  investment : {
    TotalInvestment : {
      type : Number,
      default : 0
    },
    TotalCurrent : {
      type : Number,
      default : 0
    },
    TotalReturns : {
      type : Number,
      defualt : 0
    }
  },
  loan : {
    TotalDebt : {
      type : Number,
      default : 0
    },
    TotalLended : {
      type : Number,
      default : 0
    },
    debtStatus : {
      type : Number,
      default : 0
    }
  },
  Income : {
    type : Number,
    default : 0
  },
  Savings : {
    type : Number, 
    default : 0
  },
})

export default mongoose.model('UserData' , UserDataSchema);