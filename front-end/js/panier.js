const articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
console.log(articleInLocalStorage);

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

function articlesOnCartDisplay() {
  const displayPrice = document.getElementById('panier__display--price')
  const createArticle = document.createElement("article");
  console.log("coucou panier ici");
  console.log(articleInLocalStorage.length);
  return articleInLocalStorage.forEach(function (id) {
    console.log(id.price);
    createArticle.innerHTML = 
    `<div>${id.price}</div>
    <div>${id.id}</div>`;
    displayPrice.appendChild(createArticle)
  });
}

//init: pour affichage des produits dans onload: 
const init = () => {
  //Affichage des produits dans popup panier:
  onCartEdit();
  //affichage des produits dans html:
  articlesOnCartDisplay()
}
//fonction onload
window.onload = init;
