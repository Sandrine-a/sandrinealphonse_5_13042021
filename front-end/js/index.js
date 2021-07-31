//Recuperation liste articles api Meubles en chêne http://localhost:3000/api/furniture
function getArticles() {
  fetch('http://localhost:3000/api/cameras/')
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then (function(articlesInTable) {
      articlesList = (articlesInTable)
      //creation d'un tableau avec les articles de l'api, dans fichiers data.js
      console.log(articlesList);
    })
    .catch(function(err) {
      console.log('une erreur détectée' + err);
      //ajout message d'erreur dans la page:
      list.innerHTML = ` <p class="col text-info">Une erreur est survenue, nous vous prions de bien vouloir réessayer dans un instant.</P>` + err;
    })
}
getArticles() 

const list = document.getElementById('artcicles__list');

setTimeout(function articlesListDisplay() {
  return articlesList.forEach(function(items) {
    console.log(items);
    //ajout des <div> pour article:
    const article = document.createElement('article');
    //ajout de la class card boostrap pour contenant article:
    article.classList.add('card','col-md-5','mx-2','my-2')
    //ajout données affichées pour chaque article dans la card bootstrap:
    article.innerHTML = `
    <a href="./product.html?id=${items._id}" class="card-body"> 
      <h3 class="card-title">${items.name}</h3>
      <img src="${items.imageUrl}" class="card-img"/>
      <div>${items.price} €
        <p class="underlineLink">Voir cet article</p> 
      </div> 
    </a> `
    list.appendChild(article);
  })
}, 500);
articlesListDisplay();



