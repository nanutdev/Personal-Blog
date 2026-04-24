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

      return {
         ok: true,
         status: res.message,
      };
   } catch (error) {
      return {
         ok: false,
         status: error.message,
      };
   }
}

const register = document.getElementById('register-form');
register.addEventListener('submit', async (e) => {
   e.preventDefault();
   const addUser = await createUser();

   if (addUser.ok) {
      alert('User created successfully');
      window.location.href = './login.html';
   }

   alert('Failed to create user, make sure username is unique');
   return;
});
