/* Fichier js regroupant les variables et fonctions réutilisées */

///// - Variables générales - /////
//url de l'api cameras:
const urlApi = "http://localhost:3000/api/cameras/";

//Parse article dans localStorage
let articleInLocalStorage = JSON.parse(localStorage.getItem("article"))

 ///// - Déclarations des fonctions - /////

/// -Fonctions relatives au menu:
//Affichae de la popup avec nombre d'articles dans le nav du header:
function onCartEdit() {
  try {
    //Récupération de la key article dans le localStorage:
    const articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
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

