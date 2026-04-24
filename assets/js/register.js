// create new user
async function createUser() {
   const data = {
      id: Date.now(),
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      createdAt: new Date().toISOString(),
   };
   try {
      // fetch to backend
      const res = await fetch(`http://localhost:3000/api/register`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });

      // validate response api
      if (!res.ok) {
         throw new Error(`Http error! Status: ${res.status}`);
      }

      console.log(res);

      return await res.json();
   } catch (error) {
      return res.status(409).json({ error: 'Conflict: data already exist in system' });
   }
}

const register = document.getElementById('register-form');
register.addEventListener('submit', (e) => {
   e.preventDefault();
   createUser();
});
