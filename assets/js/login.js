async function login() {
   const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
   };

   try {
      // fetching api
      const response = await fetch('http://localhost:3000/api/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });

      // validate response
      if (!response.ok) {
         throw new Error(`Login failed, status: ${response.status}`);
      }

      return {
         ok: true,
         status: response.message,
      };
   } catch (error) {
      return {
         ok: false,
         status: error.message,
      };
   }
}

const loginButton = document.getElementById('login');
loginButton.addEventListener('submit', async (e) => {
   e.preventDefault();

   const checkLogin = await login();

   if (checkLogin.ok) {
      alert('Login success!');
      window.location.href = './dashboard.html';
   }

   alert('Login failed, make sure username or password is valid');
   return;
});
