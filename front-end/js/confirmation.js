///// - VARIABLES GLOBALES - /////
//affichage du numéro de commande orderId:
const orderIdField = document.querySelector(".recap__order__id");
//fonction recuperation orderId et affichage si panier rempli:
const orderId = localStorage.getItem("orderId");

///// - FONCTIONS - /////
//Fonction du fichier app.js:
totalOrder();
//fonction de ce fichier:
clearOrder();

//Affichage de l'id de commande dans la page:
if(articleInLocalStorage != null) {
  const displayOrderId = orderIdField.innerHTML = ` ${orderId}`;
  displayOrderId
};

///// - DECLARATION DES FONCTIONS - /////

//on vide le localStorage:
async function clearOrder() {
  await totalOrder()
      //on vide le localStorage
      localStorage.clear()
};
