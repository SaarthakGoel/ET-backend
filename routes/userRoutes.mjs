import { Router } from "express";
import User from "../models/User.mjs";
import brcypt from 'bcrypt';

const router = Router();


router.get('/users', async (req, res) => {
  const users = await User.find().select('-password').lean();
  if (!users?.length) return res.status(400).json({ message: 'No users found' });
  res.status(200).json(users);
})


router.post('/users', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
  console.log(duplicate)
  if (duplicate) return res.status(409).json({ message: 'Duplicate username' })
  const hashedPwd = await brcypt.hash(password, 10);
  const userObject = { username: username, password: hashedPwd }
  const user = await User.create(userObject);
  if (user) {
    return res.status(200).json({ message: `new user ${username} created` })
  } else {
    return res.status(400).json({ message: 'Invalid User data recived' })
  }
})


router.patch('/users', async (req, res) => {
  const { id, username, password } = req.body;
  //confirm data
  if (!id || !username) {
    return res.status(400).json({ message: 'All fields are required ' })
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  // check duplicate
  const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate Username' })
  }

  user.username = username;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.status(201).json({ message: `${updatedUser.username} updated` })
})


router.delete('/users', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'User ID required' })

  const user = await User.findById(id).exec();

  if (!user) {
    res.status(400).json({ message: 'User not found' })
  }

  const result = await user.deleteOne();
  const reply = `Username ${user.username} with ID ${user._id} deleted`
  res.json(reply);
})

export default router;