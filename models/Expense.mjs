import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  amount : {
    type : Number,
    required : true
  },
  title : {
    type : String,
    required : true
  }
},
{
  timestamps : true
}
)

export default mongoose.model('Expense' , expenseSchema);