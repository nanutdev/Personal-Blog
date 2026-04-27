// get id from URL (Query paramater)
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');
const title = document.getElementById('title');
const content = document.getElementById('content');
const publishDate = document.getElementById('publish_date');
const statusPublish = document.getElementById('status');
const articleForm = document.getElementById('article-form');

async function getData() {
   try {
      const res = await fetch(`http://localhost:3000/api/articles/${articleId}`, {
         method: 'GET',
      });

      if (!res.ok) throw new Error(`HTTP: ${res.status}`);

      const article = await res.json();

      // render to form input
      title.value = article.data.title;
      content.value = article.data.content;
      publishDate.value = article.data.publishDate;
      statusPublish.value = article.data.status;

      return article;
   } catch (err) {
      return err;
   }
}

async function editData(id) {
   const newData = {
      title: title.value,
      content: content.value,
      publishDate: publishDate.value,
      status: statusPublish.value,
   };

   try {
      const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newData),
      });

      if (!res.ok) throw new Error(`Http: ${res.status}`);

      return {
         ok: true,
         status: 'success',
         message: 'updated data successfully',
      };
   } catch (error) {
      return {
         ok: false,
         status: 'error',
         message: `Error while update data`,
      };
   }
}

getData();

articleForm.addEventListener('submit', async (e) => {
   e.preventDefault();

   const edit = await editData(articleId);

   if (edit.ok) {
      alert(edit.message);
      window.location.href = './dashboard.html';
   }

   alert(edit.message);
   return;
});
