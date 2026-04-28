/**
<article class="article-card">
   <div class="article-date">April 02, 2026</div>
   <h3 class="article-title"><a href="pages/article.html">Building a Personal Blog from Scratch</a></h3>
   <p class="article-excerpt">A step-by-step guide to setting up a custom, aesthetic, and responsive blog using modern HTML and CSS principles.</p>
   <a href="pages/article.html" class="read-more">Read article</a>
</article>
*/

async function renderData() {
   const listArticle = document.getElementById('article-list');

   // format date
   const options = { year: 'numeric', month: 'long', day: 'numeric' };

   try {
      // fetch data
      const res = await fetch('http://localhost:3000/api/articles', { method: 'GET' });

      const data = await res.json();

      // validate response
      if (!res.ok) {
         throw new Error(`HTTP: ${res.status}`);
      }

      // clear hardcoded or existing articles
      listArticle.innerHTML = '';

      // iterate each item in data
      data.articles.forEach((element) => {
         // create element card
         const articleCard = document.createElement('article');
         articleCard.classList.add('article-card');

         if (element.status === 'Published') {
            articleCard.innerHTML = `
               <div class="article-date">${new Date(element.publishDate).toLocaleDateString('id-ID', options)}</div>
               <h3 class="article-title"><a href="pages/article.html?id=${element.id}">${element.title}</a></h3>
               <p class="article-excerpt">${element.content}</p>
               <a href="pages/article.html?id=${element.id}" class="read-more">Read article</a>
            `;

            listArticle.appendChild(articleCard);
         }
      });
   } catch (err) {
      console.error(err);
   }
}

renderData();
