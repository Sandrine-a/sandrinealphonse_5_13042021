//affichage du prix total de commande:
const totalOrderField = document.querySelector(".recap__order__price")
//affichage du numéro de commande orderId:
const orderIdField = document.querySelector(".recap__order__id");

//fonction calcule du total de la commande et affichage:
const articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
function totalOrder() {
  let tot = 0;
  for (let p in articleInLocalStorage) {
    tot += articleInLocalStorage[p].price;
  }
  console.log(tot);
    //affichage dans la section html:
  return totalOrderField.innerHTML = `${tot} €`;
}

//fonction recuperation orderId et affichage:
const orderId = localStorage.getItem("orderId");
console.log(orderId);
const displayOrderId = orderIdField.innerHTML = ` ${orderId}`;

// appel fonction:
totalOrder() 