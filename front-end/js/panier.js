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

//calcule des sommes par elements dans panier et envoi objet products en localstorage:
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
  //envoie objet products dans localstorage et transfomation en string:
  localStorage.setItem("products", JSON.stringify(products));

  ///3 - - creation de nouveau tableau par id nom et prix pour afficher en html:

/*   for (let i=0; i < articleInLocalStorage.length; i ++) {
    console.log(articleInLocalStorage.length);
    //
    let some =0;
    some += articleInLocalStorage[i].price;
    console.log(some);
    console.log(articleInLocalStorage[i].id); */

    /// 4 - - envoie dans le html prix et produits
    console.log(articleInLocalStorage);
  
    for (let i=0; i < articleInLocalStorage.length; i ++) {
    //ajout des <articles> pour article:
    const createArticle = document.createElement("article");
    //ajout de la class row pour style boostrap pour contenant article:
    createArticle.classList.add("row");
    createArticle.innerHTML = 
    `
      <div class="col-3">
        <p>${articleInLocalStorage[i].name}</p>
      </div>
      <div class="col-3">
        <p> ${articleInLocalStorage[i].price} €</p>
      </div>
      <div class="col-3">
        <p> ${articleInLocalStorage[i].qty} </p>
      </div>
      <div class="col-3">
        <input type="button" class="btn btn-light" id="btn__moins" value="-">
        <input type="button" class="btn btn-light" id="btn__plus" value="+"> 
      </div>
    ` 
    displayPrice.appendChild(createArticle)
    /// 5 - fonction supprimer article  
    
  }
}


//bouton vider panier:
async function clearCart(e) {
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
  if(articleInLocalStorage == null) {
  //affichage du message si panier vide:
    const messageCartEmpty = document.getElementById('panier__display__message');
    tabHeaderCart.classList.add('hide');
    messageCartEmpty.classList.remove('hide');
  } else {
  //affichage des produits dans le html si panier rempli:
  articlesInCartSome();
  }
}

//fonction calcule du total de la commande:
function totalOrder() {
  let tot = 0;
  for (let p in articleInLocalStorage) {
    tot += articleInLocalStorage[p].price;
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
totalOrder()

//formulaire:
//fonction verification des champs:
contactForm.addEventListener('submit', inputCheck)


