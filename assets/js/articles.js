import fs from 'fs/promises';
const pathFile = './data/articles.json';

// read file article json
export const readArticles = async () => {
   try {
      const data = await fs.readFile(pathFile, 'utf-8');
      return data ? JSON.parse(data) : [];
   } catch (error) {
      if (error.code === 'ENOENT') {
         console.error('File not found!');
         return [];
      }
      console.error('Error while read data: ', error);
      return [];
   }
};

// add article
export const addArticle = async (data) => {
   try {
      const database = await readArticles();
      database.push(data);

      if (database) {
         await fs.writeFile(pathFile, JSON.stringify(database, null, 2));
         return data;
      } else {
         throw new Error('Database not found, please check again');
      }
   } catch (error) {
      console.error('Error while adding data');
      throw error;
   }
};

export const editArticle = async (data) => {
   await fs.writeFile(pathFile, JSON.stringify(data, null, 2));
   return data;
};
