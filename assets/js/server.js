import express from 'express';
import cors from 'cors';

import { readUser, createUser } from './users.js';
import { addArticle, editArticle, readArticles } from './articles.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // middleware to parse json
app.set('json spaces', 2); // format for json

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

// get articles api
app.get('/api/articles', async (req, res) => {
   const getArticles = await readArticles();

   if (getArticles.length == 0) {
      return res.status(204).json({ message: 'No content in database' });
   }

   return res.status(200).json({ status: 'success', total_articles: getArticles.length, articles: getArticles });
});

// get article by id
app.get('/api/articles/:id', async (req, res) => {
   // get id
   const articleId = req.params.id;

   // get data and find data by id
   const data = await readArticles();
   const article = data.find((item) => String(item.id) === articleId);

   if (!article) {
      return res.status(404).json({ status: 'Error', message: 'Article not found' });
   }

   return res.status(200).json({ status: 'success', data: article });
});

// create article api
app.post('/api/create', async (req, res) => {
   // get data
   const { title, content, publish, status } = req.body || {};

   const newArticle = {
      id: Date.now(),
      title: title,
      content: content,
      publishDate: publish,
      status: status || 'Draft',
      createdAt: new Date().toISOString(),
   };

   await addArticle(newArticle);

   return res.status(201).json({ message: 'Article created', article: req.body });
});

// update article
app.put('/api/articles/:id', async (req, res) => {
   // get id
   const idArticle = req.params.id;
   const { title, content, publishDate, status } = req.body;

   // find article index in array by id
   const dataArticle = await readArticles();
   const articleIndex = dataArticle.findIndex((item) => String(item.id) === idArticle);

   if (articleIndex !== -1) {
      dataArticle[articleIndex].title = title;
      dataArticle[articleIndex].content = content;
      dataArticle[articleIndex].publishDate = publishDate;
      dataArticle[articleIndex].status = status;
      dataArticle[articleIndex].updatedAt = new Date().toISOString();

      await editArticle(dataArticle);
   } else {
      return res.status(400).json({ status: 'error', message: 'input data is not valid' });
   }

   return res.status(201).json({ status: 'success', message: 'Article updated', article: dataArticle[articleIndex] });
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
