///// - - VARIABLES GLOBALES - - /////
//affichage du numéro de commande orderId:
const orderIdField = document.querySelector(".recap__order__id");
//Affichage du message de confirmation:
const messageField = document.querySelector(".recap__order--message");


///// - - FONCTIONS - - /////

//fonction recuperation orderId et affichage si panier rempli:
const orderId = localStorage.getItem("orderId");

//Fonction du fichier app.js:
totalOrder();

//Affichage de l'id de commande dans la page:
if(articleInLocalStorage) {

  const displayOrderId = orderIdField.innerHTML = ` ${orderId}`;
  displayOrderId;

} else {
  
  messageField.style.display = "none"; 
};

///// - - DECLARATION DES FONCTIONS - - /////

//on vide le localStorage:
setTimeout(function clearOrder() {
      //on vide le localStorage
      localStorage.clear()
}, 3000);
