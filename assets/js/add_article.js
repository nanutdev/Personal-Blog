// get form input
// validate form
// api for post form in json file

async function addArticle() {
   const dataArticle = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      publish: document.getElementById('publish_date').value,
      status: document.getElementById('status').value,
   };

   try {
      // fetch api
      const response = await fetch('http://localhost:3000/api/create', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(dataArticle),
      });

      if (!response.ok) {
         throw new Error(`HTTP Error: ${response.status}`);
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

const form = document.getElementById('add_article');
form.addEventListener('submit', async (e) => {
   e.preventDefault();

   const newArticle = await addArticle();

   if (newArticle.ok) {
      alert('Article created sucessfully');
      window.location.href = './dashboard.html';
   }

   alert('Failed create article');
   return;
});
