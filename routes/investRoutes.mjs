import Investment from "../models/Investment.mjs";
import { Router } from "express";

const router = Router();

// GET all investments
router.get('/investment', async (req, res) => {
  const investmentList = await Investment.find().lean();
  if (!investmentList?.length) {
    return res.status(400).json({ message: 'No investments found' });
  }
  res.status(200).json(investmentList);
});

// POST a new investment
router.post('/investment', async (req, res) => {
  const { user, amount, currentValue, title } = req.body;
  if (!user || !amount || !currentValue || !title) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const investment = await Investment.create({ user, amount, currentValue, title });
    if (investment) {
      return res.status(201).json({ message: 'New investment created' });
    } else {
      return res.status(400).json({ message: 'Invalid investment data received' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// PATCH an investment
router.patch('/investment', async (req, res) => {
  const { id, amount, currentValue, title } = req.body;
  if (!id || !amount || !currentValue || !title) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const investment = await Investment.findById(id).exec();
    if (!investment) {
      return res.status(400).json({ message: 'Investment not found' });
    }
    
    investment.amount = amount;
    investment.currentValue = currentValue;
    investment.title = title;
    const updatedInvestment = await investment.save();
    res.json(`${updatedInvestment.title} updated`);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE an investment
router.delete('/investment', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Investment ID required' });
  }

  try {
    const investment = await Investment.findById(id).exec();
    if (!investment) {
      return res.status(400).json({ message: 'Investment not found' });
    }
    
    const result = await investment.deleteOne();
    const reply = `Investment '${investment.title}' with ID ${investment._id} deleted`;
    res.json(reply);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
