import express from 'express';
import cors from 'cors';

import { readUser, createUser } from './users.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // middleware to parse json

// register api
app.post('/api/register', async (req, res) => {
   // get data user from body
   const { id, username, password, createdAt } = req.body || {};

   // validate user
   const dataUser = await readUser();
   const existingUser = dataUser.find((user) => user.username === username);

   if (existingUser) {
      // response code 409 because the user data is the same
      return res.status(409).json({ message: 'Conflict: data already exist in system' });
   }

   const addUser = await createUser(id, username, password, createdAt);

   return res.status(201).json({ message: 'User created', user: req.body });
});

// login api
app.post('/api/login', async (req, res) => {
   // get data from body request
   const { username, password } = req.body || {};

   // validate data user
   const getUser = await readUser();
   const user = getUser.find((u) => u.username === username);

   // check user and password
   if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid Credentials, check again username and password!' });
   }

   return res.status(200).json({ message: 'Login successfully!', user: { username: user.username } });
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
