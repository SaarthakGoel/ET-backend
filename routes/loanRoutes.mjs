import Loan from "../models/Loan.mjs";
import { Router } from "express";

const router = Router();

// GET all loans
router.get('/loan', async (req, res) => {
  try {
    const loanList = await Loan.find().lean();
    if (!loanList?.length) {
      return res.status(400).json({ message: 'No loans found' });
    }
    res.status(200).json(loanList);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST a new loan
router.post('/loan', async (req, res) => {
  const { user, amount, lended, title } = req.body;
  if (!user || !amount || lended === undefined || !title) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const loan = await Loan.create({ user, amount, lended, title });
    if (loan) {
      return res.status(201).json({ message: 'New loan created' });
    } else {
      return res.status(400).json({ message: 'Invalid loan data received' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PATCH a loan
router.patch('/loan', async (req, res) => {
  const { id, amount, lended, title } = req.body;
  if (!id || !amount || lended === undefined || !title) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const loan = await Loan.findById(id).exec();
    if (!loan) {
      return res.status(400).json({ message: 'Loan not found' });
    }
    
    loan.amount = amount;
    loan.lended = lended;
    loan.title = title;
    const updatedLoan = await loan.save();
    res.json(`${updatedLoan.title} updated`);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE a loan
router.delete('/loan', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Loan ID required' });
  }

  try {
    const loan = await Loan.findById(id).exec();
    if (!loan) {
      return res.status(400).json({ message: 'Loan not found' });
    }
    
    const result = await loan.deleteOne();
    const reply = `Loan '${loan.title}' with ID ${loan._id} deleted`;
    res.json(reply);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
