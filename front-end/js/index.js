///// -  - VARIABLES GLOBALES - - /////

//stockage de la liste des articles:
let articlesList = [];
///section d'affichage des cartes article:
const list = document.getElementById("articles__list");

///// - - FONCTIONS - - /////

///Fonctions from app.js: pop-up panier si rempli:
onCartEdit();

///Fonctions de la page:
articlesListDisplay();

///// - - DECLARATION DES FONCTIONS - - /////

///Recuperation liste articles cameras via urlApi from app.js":
async function getArticles() {
  console.log(urlApi);
  await fetch(`${urlApi}/api/cameras/`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (articlesInTable) {
      //creation d'un tableau avec les articles de l'api, dans fichiers data.js
      articlesList = articlesInTable;
    })
    .catch(function (err) {
      //ajout message d'erreur dans la page:
      list.innerHTML =
        ` <p class="col text-info h5">Une erreur est survenue, nous vous prions de bien vouloir réessayer dans un instant.</P>
        <p class="h5">${err}<p>`  
    });
};

///affichage inner HTML des articles dans des cartes:
async function articlesListDisplay() {
  await getArticles();
  return articlesList.forEach(function (items) {
    //ajout des <div> pour article:
    const article = document.createElement("article");
    //ajout de la class card boostrap pour contenant article:
    article.classList.add("card", "col-md-5", "mx-2", "mx-md-3", "my-3", "shadow-lg", "rounded-0");
    //ajout données affichées pour chaque article dans la card bootstrap:
    article.innerHTML = `
    <a href="./product.html?id=${items._id}" class="card-body text-white text-md-left"> 
      <h3 class="card-title text-center">${items.name}</h3>
      <img src="${items.imageUrl}" class="card-img"/>
      <div class="mt-3 h5">${items.price/100} €
        <p class="mt-1">Voir cet article...</p> 
      </div> 
    </a> `;
    list.appendChild(article);
  });
};





