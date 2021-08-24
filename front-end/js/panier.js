/////// partie 1 afficahge du panier:
///declaration des cariables réutilisables
let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));

//bouton vider panier:
const btnClear = document.getElementById("order__btn");
//section qui contient le panier:
const displayCart = document.getElementById("panier__display");
//dans section panier titre du tableau:
const tabHeaderCart = document.getElementById("tab__header")
//dans section panier affichage des articles et tarifs:
const displayPrice = document.getElementById("panier__display--content")
//Dans section controle du panier, zone total:
const displayTotalPrice =  document.querySelector(".control__panier--total")
//Decalaration du tableau avec id du panier
let id =[];

//affichage pop up avec articles 
function onCartEdit() {
  try {
    const articleInLocalStorage = JSON.parse(localStorage.getItem("article"))
    const cartElement = document.querySelector('.header__cart--popup')

    const thereIsArticlesInStorage = articleInLocalStorage && articleInLocalStorage.length > 0;
    const thereIsNoArticleInStorage = !thereIsArticlesInStorage;
    const cartBadgeIsHidden = cartElement.className.includes('hide');
    const cartBadgeIsVisible = !cartBadgeIsHidden;

    if (thereIsArticlesInStorage && cartBadgeIsHidden) {
      /// On affiche la pop up avec le nombre d'articles
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

///calcule des sommes par elements dans panier et envoi objet products en localstorage:
function articlesInCartSome() {
  ///1- - tri des articles par nom de produit
  const sortByName= articleInLocalStorage.sort((a, b) => {
    if(a.name > b.name ){
      return 1;
    } else {
      return -1;
    }
  })
  sortByName
  ///2- - Récupération des id uniquement:
  //puis envoi des id en tableau
  const filterById = articleInLocalStorage.filter(function(idFilter) {
    return id.push(idFilter.id);
  })
  filterById
  let products = id;
  //Envoi objet products dans localstorage et transfomation en string:
  localStorage.setItem("products", JSON.stringify(products));
  /// 3 - - envoie dans le html prix et produits
  for (let i=0; i < articleInLocalStorage.length; i ++) {
      //ajout des <articles> pour article:
      const createArticle = document.createElement("article");
      //ajout de la class row pour style boostrap pour contenant article:
      createArticle.classList.add("row", "cart__item");
      createArticle.innerHTML = 
      `
        <div class="col-3 cart__item--name">
          <p>${articleInLocalStorage[i].name}</p>
        </div>
        <div class="col-3">
          <p> ${articleInLocalStorage[i].price} €</p>
        </div>
        <div class="col-3 cart__item--qty">
          <p class="item__qty"> ${articleInLocalStorage[i].qty} </p>
        </div>
        <div class="col-3" id="cart__item--btn">
          <input type="button" class="btn btn-light" id="btn__moins" value="-">
          <input type="button" class="btn btn-light" id="btn__plus" value="+"> 
        </div>
      ` 
      displayPrice.appendChild(createArticle)     
  }
}

///Changement des quantités par articles:
function changeQuantity() {
  //////// gestion quantités:
  ///Recuperation des elements html boutons - et +:
  const btnMoins = document.querySelectorAll("#btn__moins");
  const btnPlus = document.querySelectorAll("#btn__plus");
  
  ///fonction pour le bouton moins:
  for (let i = 0; i < btnMoins.length; i ++) {
    //variable pour récupérer le nom de l'article liée au bouton:
    const nameForBtnContainer = btnMoins[i].parentElement.parentElement.firstElementChild.firstElementChild.textContent;
    console.log(nameForBtnContainer);
    ///Evenement au click sur le bouton ciblé:
    btnMoins[i].addEventListener('click', function decreaseQty(event) {
      event.stopPropagation();
      //On MAJ la quantité dans le local storage selon le nom qui correspond:
      articleInLocalStorage.forEach(item => {
        if(item.name === nameForBtnContainer) {
          //On retire un produit:
          item.qty --;
          console.log(item.name);
          console.log(item.qty);
          //suppression de la ligne si valeur =0:
          if (item.qty === 0) {
            //demande de confirmation de suppression:
            if(confirm(`Confirmez-vous la suppresion du ${item.name} ?`)) {
              console.log(articleInLocalStorage);
              console.log(articleInLocalStorage.length);
              //Si articles totalement suppprimés, suppression du localStorage par filter:
              articleInLocalStorage = articleInLocalStorage.filter((el)=> {
                console.log(el.qty == 0);
                return el.qty !== 0;
              })
            } 
            //Si non confirmé, remise à 1 du compteur:
            else {
              item.qty ++;
            }
          }
          //mise à jour du localStorage
          localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
        };
      }) 
      //on MAJ la page;
      location.reload();
    })
  };

   ///fonction pour le bouton Plus
  for (let i = 0; i < btnPlus.length; i ++) {
    //variable pour récupérer le nom de l'article liée au bouton:
    const nameForBtnContainer = btnMoins[i].parentElement.parentElement.firstElementChild.firstElementChild.textContent;
    console.log(nameForBtnContainer);
    btnPlus[i].addEventListener('click', function increaseQty(event) {
      event.stopPropagation();
      //On récupère la quantité dans le HTML et met à jour:
      articleInLocalStorage.forEach(item => {
        if(item.name === nameForBtnContainer) {
          //On retire ajoute produit:
          item.qty ++;
          console.log(item.name);
          console.log(item.qty);
          //Nombre maximum: 20cam
          if (item.qty > 20) {
            //demande de confirmation de suppression:
            window.alert(`Vous avez atteint le maximum de ${item.name}`)
            //Bloquage du bouton +:
            btnPlus[i].setAttribute("disabled","disabled")
          } else {
            btnPlus[i].removeAttribute("disabled")
          }
          //ON MAJ la qty correspondant dans le localStorage
          localStorage.setItem("article", JSON.stringify(articleInLocalStorage))
        }
      })
      //on MAJ la page;
      location.reload();
    })
  };
};
///bouton vider panier:
async function clearCart(e) {
  e.stopPropagation()
  await init()
  console.log('pour vider');
  //popup pour confirmer le panier vide:
  if (window.confirm("Souhaitez-vous supprimer tous les éléments de votre panier?")) {
    //on vide le localStorage
    localStorage.clear()
  } else {
    console.log("pannier non confirmé vidage");
  };
  //puis actualisation de la page pour afficher le panier vide
  location.reload()
}

//init: pour affichage des produits dans onload: 
const init = () => {
  //Affichage des produits dans popup panier:
  onCartEdit();
  //affichage du contenu de la page en cas de panier vide: 
  if(articleInLocalStorage == null || articleInLocalStorage.length == 0 ) {
    //si le panier est vidé individuellement par les btn -:
    localStorage.clear()
    //affichage du message si panier vide:
    const messageCartEmpty = document.getElementById('panier__display__message');
    tabHeaderCart.classList.add('hide');
    messageCartEmpty.classList.remove('hide');
  } else {
  //affichage des produits dans le html si panier rempli:
  articlesInCartSome();
  //Gere la quantité:
  changeQuantity()
}
}

//fonction calcule du total de la commande:
function totalOrder() {
  let tot = 0;
  for (let p in articleInLocalStorage) {
    tot += articleInLocalStorage[p].price * articleInLocalStorage[p].qty;
  }
    //affichage dans la section html:
  return displayTotalPrice.innerHTML = `${tot} €`;
}


///////PARTIE GESTION DU FORMULAIRE:
///declaration des cariables réutilisables
//formulaire:
const contactForm = document.getElementById('needs-validation');
//champs du formulaire déclaration des variables:
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const adress = document.getElementById('adress')
const city = document.getElementById('city')
const email = document.getElementById('email') 
const zip = document.getElementById('zip')

//vérification des données du formulaire puis appel de la fonction envoi
function inputCheck(event) {
  if (contactForm.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  contactForm.classList.add('was-validated');
  sentFormToServer(event)
};

//Envoi des données et id produits dans localStorage +  envoi au server
async function sentFormToServer(event) {
  event.preventDefault()
  await inputCheck()
  let products = id
  //stockage des données dans un objet contact:
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: adress.value,
    city: city.value,
    email:  email.value
  }
  //envoi objet contact dans localstorage et transfomation en string:
  localStorage.setItem("contact", JSON.stringify(contact))
  //Mettre les values du formulaire dans un object:
  const sendFormToServer = {
    contact,
    products
  }
  sendFormToServer
  //envoi de de l'objet au server avec données localstorage contact et products:
  const promiseCom = fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body:  JSON.stringify(sendFormToServer),
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    }
  });
  console.log();
  //voir le resultat du server response:
  promiseCom.then(async(response) => {
    try {
      console.log("response is:");
      console.log(response);
      //reponse du server en json
      const contenuRes = await response.json()
      console.log(contenuRes);
      if(response.ok) {
        console.log(`résultat de la response: ${response.ok}`)
        //recuperation de la réponse
        //envoiel'OrderID dans localstorage pour stockage
        localStorage.setItem("orderId", (contenuRes.orderId))
        //envoi vers page confirmation de commande
        window.location = "confirmation.html";
      } else {
      //ajout de l'erreur Serveur si impossible de traiter la requete, innerhtml:
      let contentError = document.createElement("div");
      contentError.innerHTML = 
      `<p class="text-danger h4">
        ERREUR Serveur: ${response.status} ${response.statusText}
      </p>
      `
      contactForm.appendChild(contentError);
      }
    }catch(event){
      //ajout de l'erreur innerhtml:
      let contentError = document.createElement("div");
      contentError.innerHTML = 
      `<p class="text-danger h4">
        ERREUR lors de l'envoi: ${event}
      </p>
      `
      contactForm.appendChild(contentError);
    }
  })
};


/////fonctions activées
//fonction onload
window.onload = init;
//bouton vider panier:
btnClear.addEventListener('click', clearCart);
//prix total
totalOrder();

//formulaire:
//fonction verification des champs:
contactForm.addEventListener('submit', inputCheck)

console.log(articleInLocalStorage);


