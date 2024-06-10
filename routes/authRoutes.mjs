import { Router } from "express";
const router = Router();
import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginLimiter } from "../middleware/loginLimiter.mjs";

router.post('/auth', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'All Fields Are reuired' })

  const foundUser = await User.findOne({ username }).exec()
  if (!foundUser) return res.status(401).json({ message: 'unauthorized' });

  const match = await bcrypt.compare(password, foundUser.password)
  if (!match) return res.status(401).json({ message: 'unauthorized' });

  const accessToken = jwt.sign(
    { "username": foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15s' }
  )

  const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None', // Use 'None' for cross-origin cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ accessToken });
})

router.get('/auth/refresh', async (req, res) => {

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })
      const foundUser = await User.findOne({ username: decoded.username }).exec()

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15s' }
      )

      res.json(accessToken);
    }
  )
})

router.post('/auth/logout', async (req, res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie('jwt' , {httpOnly : true , sameSite : 'None' , secure : true})
  res.json({message : 'Cookie Cleared'})
})

export default router;