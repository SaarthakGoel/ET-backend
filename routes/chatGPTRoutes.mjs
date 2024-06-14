/*import axios from "axios";
import bodyParser from "body-parser";
import { Router } from "express";
import { configDotenv } from "dotenv";

const router = Router();

configDotenv();

router.use(bodyParser.json());

const API_KEY = process.env.GEMENAI_API_KEY;

console.log(API_KEY)

router.post('/api/generate-report', async (req, res) => {

  //const userData = req.body;

  //console.log(userData)

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-turbo:generateText',
            {
                prompt: {
                    //text: `Generate a financial report: ${JSON.stringify(userData)}`
                    text : "hello"
                },
                options: {
                    maxOutputTokens: 128,
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const report = response.data;

        console.log(report)
        res.status(200).json({ report });
    } catch (error) {
        console.error('Error generating report:', error.response ? error.response.data : error.message);
        res.status(500).send('Error generating report');
    }
});

export default router;
*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";
import { configDotenv } from "dotenv";

const router = Router();

configDotenv();

router.post('/api/gemenai' , async (req , res) => {

  const userData = req.body

  const genAI = new GoogleGenerativeAI(process.env.GEMENAI_API_KEY);
  const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

  const prompt = `But do not use id or user in the response . Generate a financial report giving feedback based on the data given ${JSON.stringify(userData)}. also the values are in rupees .debtStatus is debt - lended `

  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response.text();

  res.status(200).json({ message : text});
})


export default router;



