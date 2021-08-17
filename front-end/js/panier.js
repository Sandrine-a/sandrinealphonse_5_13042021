/////// partie 1 afficahge du panier:
///declaration des cariables réutilisables
const articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
//bouton vider panier:
const btnClear = document.getElementById("order__btn");
//section qui contient le panier:
const displayCart = document.getElementById("panier__display");
//dans section panier affichage des articles et tarifs:
const displayPrice = document.getElementById("panier__display--price")
//Dans section controle du panier, zone total:
const displayTotalPrice =  document.querySelector(".control__panier--total")

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
//calcule des sommes par elements dans panier et envoi objet products en localstorage:
function articlesInCartSome() {
  //tri des articles par nom de produit
  const sortByName= articleInLocalStorage.sort((a, b) => {
    if(a.name > b.name ){
      return 1;
    } else {
      return -1;
    }
  })
  sortByName
  //Récupération des id uniquement:
  //puis envoi des id en tableau
  let id =[];
  const filterById = articleInLocalStorage.filter(function(idFilter) {
    return id.push(idFilter.id);
  })
  filterById
  console.log(filterById);
  const products = id
  //envoie objet products dans localstorage et transfomation en string:
  localStorage.setItem("products", JSON.stringify(products))
  console.log(products);
/*   for (let i=0; i < articleInLocalStorage.length; i ++) {
    while(articleInLocalStorage.length) {
      if(articleInLocalStorage[i].id == articleInLocalStorage[i].id) {
        console.log(articleInLocalStorage[i].price);
        let some =0;
        some += articleInLocalStorage[i].price;
        console.log(some);
        return some;
        break;
      }
    } */

/*   for (let i=0; i < articleInLocalStorage.length; i ++) {
    const filterById = articleInLocalStorage.filter(function(idFilter) {
      console.log(idFilter.id);
      return idFilter.id

    })
        //ajout des <articles> pour article:
        const createArticle = document.createElement("article");
        //ajout de la class row pour style boostrap pour contenant article:
        createArticle.classList.add("row");
        createArticle.innerHTML = 
        `
          <div class="col-4">
            <p>${articleInLocalStorage[i].name}</p>
          </div>
          <div class="col-4">
            <p>€</p>
          </div>
        ` 
        displayPrice.appendChild(createArticle) 

      }

/*     const mapById = articleInLocalStorage.map(function(idFilter) {
      return idFilter.id
    })
    console.log(mapById );
    mapById  */

/*   for (let i=0; i < articleInLocalStorage.length; i ++) {
    const filterById = articleInLocalStorage.filter(function(idFilter) {
      return idFilter.id == articleInLocalStorage[i].id;
    })
    let idToCompare = articleInLocalStorage[i].id
    console.log(filterById );
    filterById
  } */

  //recherche de l'id de chaqu earticle en locaStorage:
  for (let i=0; i < articleInLocalStorage.length; i ++) {
  idInitial = articleInLocalStorage[i].id;
  //calcule de la somme par id:
  let some = articleInLocalStorage[i].price * idInitial;
    //// boucle pour faire la some par id:
    switch(idInitial) {
      case idInitial: 
      //ajout des <articles> pour article:
      const createArticle = document.createElement("article");
      //ajout de la class row pour style boostrap pour contenant article:
      createArticle.classList.add("row");
      createArticle.innerHTML = 
      `
        <div class="col-4">
          <p>${articleInLocalStorage[i].name}</p>
        </div>
        <div class="col-4">
          <p>€</p>
        </div>
      ` 
      displayPrice.appendChild(createArticle) 
    }
  }
}
//bouton vider panier:
async function clearCart() {
  await init()
  console.log('pour vider');
  //popup pour confirmer le panier vide:
  if (window.confirm("Souhaitez-vous supprimer tous les éléments de votre panier?")) {
    //on vide le localStorage
    localStorage.clear()
    //puis actualisation de la page pour afficher le panier vide
    location.reload()
  } else {
    console.log("pannier non confirmé vidage");
  };
}
//init: pour affichage des produits dans onload: 
const init = () => {
  //Affichage des produits dans popup panier:
  onCartEdit();
  //affichage du contenu de la page: 
  if(articleInLocalStorage == null) {
  //affichage du message si panier vide:
    const messageCartEmpty = document.getElementById('panier__display__message')
    console.log('vide vide');
    messageCartEmpty.classList.remove('hide')
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
//champs regex:
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
  sentFormToServer()
};

//Envoi des données et id produits dans localStorage +  envoi au server
async function sentFormToServer(event) {
  await inputCheck()
  console.log('check formulaire');
  //stockage des données dans un objet contact:
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: adress.value,
    city: city.value,
    email:  email.value
  }
  //envoie objet contact dans localstorage et transfomation en string:
  localStorage.setItem("contact", JSON.stringify(contact))
  //Mettre les values du formulaire dans un object:
  const sendFormToServer = {
    contact,
    products
  }
  console.log(contact);
  event.preventDefault()
  event.stopPropagation();
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
