import fs from 'fs/promises';

// function for read data user

const pathFile = './data/users.json';

export const readUser = async () => {
   try {
      let data = await fs.readFile(pathFile, 'utf-8');
      return data ? JSON.parse(data) : [];
   } catch (error) {
      if (error.code === 'ENOENT') {
         console.error('File not found!');
         return [];
      }
      console.error('Error while reading data: ', error);
      return [];
   }
};

export const createUser = async (id, username, password, createdAt) => {
   const newData = {
      id,
      username,
      password,
      createdAt,
   };

   try {
      // readUser already parses and returns an array
      const database = await readUser();

      // push new user
      database.push(newData);

      // write back to file
      await fs.writeFile(pathFile, JSON.stringify(database, null, 3));
      
      return newData;
   } catch (error) {
      console.error('Error while creating user: ', error);
      throw error;
   }
};
