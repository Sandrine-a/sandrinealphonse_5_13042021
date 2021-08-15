const articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
console.log(articleInLocalStorage);

/* const getIdInLocalStorage = () => { 
  for (let i=0; i < articleInLocalStorage.length; i ++) {
    idInitial = articleInLocalStorage[i].id;
    console.log(idInitial);
  }
} */

//affichage pop up avec articles :
function onCartEdit() {
  try {
    const cartElement = document.querySelector('.header__cart--popup')

    const thereIsArticlesInStorage = articleInLocalStorage && articleInLocalStorage.length > 0;
/*     const thereIsNoArticleInStorage = !thereIsArticlesInStorage; */
    const cartBadgeIsHidden = cartElement.className.includes('hide');
    const cartBadgeIsVisible = !cartBadgeIsHidden;

    if (thereIsArticlesInStorage && cartBadgeIsHidden) {
      // On affiche la pop up avec le nombre d'articles
      cartElement.classList.remove('hide');
      cartElement.innerHTML = articleInLocalStorage.length;
    } else {
      console.log("popup non affichée");
    }
  }
  catch {
    console.log("erreur sur la pop up");
  }
}

//calcule des sommes par elements dans panier:
function articlesInCartSome() {
  //recherche de l'id de chaquearticle en locaStorage:
  for (let i=0; i < articleInLocalStorage.length; i ++) {
  idInitial = articleInLocalStorage[i].id;
  //calcule de la somme par id:
  let some = articleInLocalStorage[i].price += articleInLocalStorage[i].price;
    //// boucle pour faire la some par id:
    switch(idInitial) {
      case idInitial: 
      console.log(some);
      }
    }
}

/* //affichage des articles dans le html:
async function articlesInCartDisplay() {
  await articlesInCartSome()
} */
    

//init: pour affichage des produits dans onload: 
const init = () => {
  //Affichage des produits dans popup panier:
  onCartEdit();
  //affichage des produits dans html:
  articlesInCartSome()
}
//fonction onload
window.onload = init;
