//stockage de la liste des articles:
let articlesList = [];
///section d'affichage des cartes article:
const list = document.getElementById("articles__list");

///Recuperation liste articles cameras http://localhost:3000/api/cameras/":
async function getArticles() {
  await fetch("http://localhost:3000/api/cameras/")
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
      console.log("une erreur détectée" + err);
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
    article.classList.add("card", "col-md-5", "mx-1", "my-2", "shadow-lg");
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

///pop-up panier si rempli:
//affichage pop up avec articles 
async function onCartEdit() {
  await getArticles();
  await articlesListDisplay();

  try {
    const articleInLocalStorage = JSON.parse(localStorage.getItem("article"))
    console.log(articleInLocalStorage[0].qty)
    const cartElement = document.querySelector('.header__cart--popup')

    const thereIsArticlesInStorage = articleInLocalStorage && articleInLocalStorage.length > 0;
    const thereIsNoArticleInStorage = !thereIsArticlesInStorage;
    const cartBadgeIsHidden = cartElement.className.includes('hide');
    const cartBadgeIsVisible = !cartBadgeIsHidden;

    if (thereIsArticlesInStorage && cartBadgeIsHidden) {
      /// On affiche la pop up avec le nombre d'articles
      console.log(articleInLocalStorage);
      //-calcule des articles dans le panier:
      let totalArticles = 0;
      for (let qt in articleInLocalStorage) {
        totalArticles += articleInLocalStorage[qt].qty;
      }
      //-insertion dans le html:
      cartElement.classList.remove('hide');
      cartElement.innerHTML = totalArticles;
    } else {
      console.log("popup non affichée");
    }
  }
  catch {
    console.log("erreur sur la pop up");
  }

}


getArticles();
articlesListDisplay();
onCartEdit()



