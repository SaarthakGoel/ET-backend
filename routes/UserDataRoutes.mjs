import { Router } from "express";
import UserData from "../models/UserData.mjs";

const router = Router();

router.get('/usersData', async (req, res) => {
  const userData = await UserData.find().lean()
  if (!userData?.length) return res.status(400).json({ message: 'user not found' });
  res.status(200).json(userData)
})

router.post('/usersData' , async (req , res) => {
  const {id , Income , Savings} = req.body;
  if(!id || !Income || !Savings) return res.status(400).json({message : 'All fields are required'});
  const userData = UserData.create({user : id , Income , Savings});
  return res.status(200).json({message : 'successful'})
})

router.patch('/usersData', async (req, res) => {
  const { user, currentMonth, lastMonth, TwoMonthsAgo , Income , Savings , TotalDebt ,  TotalLended , debtStatus , TotalInvestment , TotalCurrent , TotalReturns } = req.body;
  if (!user) return res.status(400).json({ message: 'Id is required ' })

  const userData = await UserData.findOne({user : user}).exec();

  if (!userData) {
    return res.status(400).json({ message: 'User not found' })
  }
  if(currentMonth) userData.expense.currentMonth = currentMonth;
  if(lastMonth) userData.expense.lastMonth = lastMonth;
  if(TwoMonthsAgo) userData.expense.TwoMonthsAgo = TwoMonthsAgo;
  if(Income) userData.Income = Income;
  if(Savings) userData.Savings = Savings;
  if(TotalDebt) userData.loan.TotalDebt = TotalDebt;
  if(TotalLended) userData.loan.TotalLended = TotalLended;
  if(debtStatus) userData.loan.debtStatus = debtStatus;
  if(TotalInvestment) userData.investment.TotalInvestment = TotalInvestment;
  if(TotalCurrent) userData.investment.TotalCurrent = TotalCurrent;
  if(TotalReturns) userData.investment.TotalReturns = TotalReturns;

  await userData.save();
  res.status(201).json({ message: `UserData updated` })
})

router.delete('/usersData' , async (req , res) => {
  const {id} = req.body;
  if(!id) return res.status(400).json({ message: 'Id is required ' })
  const userData = await UserData.findById(id).exec();
  if(!userData) return res.status(400).json({message : 'data not found'})
  await userData.deleteOne()
res.status(200).json({message : 'delete successful'})
})

export default router;