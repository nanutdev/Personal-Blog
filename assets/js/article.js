async function renderArticle() {
   const urlParams = new URLSearchParams(window.location.search);
   const articleId = urlParams.get('id');

   const loadingEl = document.getElementById('loading');
   const contentEl = document.getElementById('article-content');
   const errorEl = document.getElementById('error-message');
   
   if (!articleId) {
      loadingEl.style.display = 'none';
      errorEl.textContent = 'Article ID not provided.';
      errorEl.style.display = 'block';
      return;
   }

   try {
      const res = await fetch(`http://localhost:3000/api/articles/${articleId}`, { method: 'GET' });

      if (!res.ok) {
         if (res.status === 404) {
            throw new Error('Article not found.');
         }
         throw new Error(`HTTP Error: ${res.status}`);
      }

      const responseData = await res.json();
      const article = responseData.data;

      // Formatting date
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(article.publishDate || article.createdAt).toLocaleDateString('id-ID', options);

      // Populate DOM
      document.getElementById('article-title').textContent = article.title;
      document.title = `${article.title} - Personal Blog`;
      document.getElementById('article-date').textContent = formattedDate;
      
      // Basic formatting for content (handling newlines as paragraphs)
      const formattedContent = article.content.split('\n').map(p => p.trim()).filter(p => p.length > 0).map(p => `<p>${p}</p>`).join('');
      document.getElementById('article-body').innerHTML = formattedContent;

      // Show content, hide loading
      loadingEl.style.display = 'none';
      contentEl.style.display = 'block';

   } catch (err) {
      console.error(err);
      loadingEl.style.display = 'none';
      errorEl.textContent = err.message || 'Failed to load the article.';
      errorEl.style.display = 'block';
   }
}

document.addEventListener('DOMContentLoaded', renderArticle);
