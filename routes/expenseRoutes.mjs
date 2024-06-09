import Expense from "../models/Expense.mjs";
import { Router } from "express";

const router = Router();

router.get('/expense' , async (req , res) => {
  const expenseList = await Expense.find().lean();
  if(!expenseList?.length) return res.status(400).json({message : 'No expenses Found'});
  res.status(200).json(expenseList); 
})


router.post('/expense' , async (req , res) => {
  const {amount , title , id} = req.body;
  if(!id || !title || !amount) res.status(400).json({message : 'All fields are required '})
  const expense = await Expense.create({user : id , amount , title});

  if(expense) {
    return res.status(201).json({ message: 'New expense created' })
  }else{
    return res.status(400).json({ message: 'Invalid note data recevied'})
  }
})


router.patch('/expense' , async (req , res) => {
  const { id , title , amount} = req.body;
  if (!id || !title || !amount) return res.status(400).json({message : 'All Fields are required'})
  const expense = await Expense.findById(id).exec()
  if (!expense) {
    return res.status(400).json({ message: 'expense not found' })
  }
  expense.title = title;
  expense.amount = amount ;
  const updatedExpense = expense.save();
  res.json(`${updatedExpense.title} updated`)
})


router.delete('/expense' , async (req , res) => {
  const {id} = req.body;
  if(!id) res.status(400).json({ message: 'expense ID required' })
  const expense = await Expense.findById(id).exec();
  if(!expense){
    return res.status(400).json({ message: 'expense not found' })
  }
  const result = await expense.deleteOne();
  const reply = `Expense '${expense.title}' with ID ${expense._id} deleted`
  res.json(reply)
})


export default router;