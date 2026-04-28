const table = document.getElementById('content-table');

// function read all data
async function readAllData() {
   try {
      // fetch data
      const res = await fetch('http://localhost:3000/api/articles', {
         method: 'GET',
      });

      if (!res.ok) {
         throw new Error(`Http Error: ${res.status}`);
      }

      const result = await res.json();

      return result;
   } catch (error) {
      console.error('Failed get data from api', error);
   }
}

async function renderData() {
   const dataArticle = await readAllData();
   const content = document.getElementById('content-table');

   // format date
   const options = { year: 'numeric', month: 'long', day: 'numeric' };

   dataArticle.articles.forEach((element) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
         <td><a href="#">${element.title}</a></td>
         <td>${new Date(element.publishDate).toLocaleDateString('id-ID', options)}</td>
         <td><span class="status-badge ${String(element.status).toLowerCase()}">${element.status}</span></td>
         <td class="actions-cell">
            <a href="./article-edit.html?id=${element.id}" class="btn-icon edit">Edit</a>
            <button class="btn-icon delete" onclick="deletedData(${element.id})">Delete</button>
         </td>
      `;

      content.appendChild(tr);
   });
}

async function deletedData(id) {
   const isConfirm = confirm('Can you deleted thid data?');

   if (!isConfirm) {
      return;
   }

   try {
      // fetch data
      const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
         method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
         alert(`Failed deleted data: ${result.message}`);
      }

      alert('Data successfully deleted');
   } catch (error) {
      console.error('Failed deleted data', error);
   }
}

renderData();
