import express from 'express';
import cors from 'cors';

import { readUser, createUser } from './users.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // middleware to parse json

app.post('/api/register', async (req, res) => {
   // get data user from body
   const { id, username, password, createdAt } = req.body;

   // validate user
   const dataUser = await readUser();
   const existingUser = dataUser.find((user) => user.username === username);

   if (existingUser) {
      // response code 409 because the user data is the same
      return res.status(409).json({ message: 'Conflict: data already exist in system' });
   }

   const addUser = await createUser(id, username, password, createdAt);

   res.status(201).json({ message: 'User created', user: req.body });
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
