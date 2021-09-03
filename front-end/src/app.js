/* Fichier js regroupant les variables et fonctions réutilisées */

///// - - VARIABLES GLOBALES - - /////

//url de l'api cameras:
/* const urlApi = "http://localhost:3000/api/cameras/"; */

let urlApi  = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://orinoco-cameras-shop.herokuapp.com";

//Parse article dans localStorage:
let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
//affichage du prix total Pages Panier et confirmation:
//Dans section controle du panier, zone total:
const displayTotalPrice =  document.querySelector(".control__panier--total");


 ///// - - DECLARATION DES FONCTIONS - - /////
 
//Affichage de la popup avec nombre d'articles dans le nav du header:
function onCartEdit() {
  try {
    //Récupération de l'élément html:
    const cartElement = document.querySelector('.header__cart--popup');
    //Vérification s'il y a des articles présents dans le local storage:
    const thereIsArticlesInStorage = articleInLocalStorage && articleInLocalStorage.length > 0;
    const cartBadgeIsHidden = cartElement.className.includes('hide');

    if (thereIsArticlesInStorage && cartBadgeIsHidden) {
      /// On affiche la pop up avec le nombre d'articles
      //-Calcul du nombre d'articles dans le panier:
      let totalArticles = 0;
      for (let qt in articleInLocalStorage) {
        totalArticles += articleInLocalStorage[qt].qty;
      }
      //-Insertion dans le html:
      cartElement.classList.remove('hide');
      cartElement.innerHTML = totalArticles;
    }
  }
  catch {
    console.error("Erreur sur l'affichage de la pop up")
  }
}; 

///- Fonction calcul du total de la commande:
function totalOrder() {
  let tot = 0;
  for (let p in articleInLocalStorage) {
    tot += articleInLocalStorage[p].price * articleInLocalStorage[p].qty;
  }
    //affichage dans la section html:
  return displayTotalPrice.innerHTML = `${tot} €`;
};

///// - - EXPORT - - /////
export{ urlApi, articleInLocalStorage, displayTotalPrice ,onCartEdit , totalOrder };
