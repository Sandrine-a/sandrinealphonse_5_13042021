///// - - VARIABLES GLOBALES - - /////

////Construction de l'url pour fetch l'article:
//Recherche de l'id de l'article dans l'url
const stringSearchUrlById = window.location.search;
//Récuperation de l'article avec id
const removePoint = stringSearchUrlById.substring(4);
//Aajout de l'id à l'url de l'api (enregistrée en constnte dans le fichier app.js)
/* const urlArticle = urlApi + removePoint; */
const urlArticle = `${urlApi}/api/cameras/${removePoint}`;
//Création de la section 
const section = document.getElementById('article__display');
//Section d'ajout d'article:
const sectionAdd = document.getElementById('ajout');
// Variables de stockage //
let articleSelected = {};
//variable total:
let articleTotalSelected = {};
// Boutons + eventListenner //
//Ajout de l'évènement sur le click d'ajout au panier:
const addButton = document.getElementById('ajout__btn');
addButton.addEventListener('click', addArticles);
//Bouton valider la commande declaration variable au remplissage du localStroage:
const validateBtn = document.getElementById("order__btn");
window.addEventListener('storage', activateValidateBtn);
//Nombre d'article:
//Création du total du nombre d'articles
const numbersSection = document.getElementById('nombre')
numbersSection.addEventListener('change', getAmountArticles);

///// -  - FONCTIONS - - /////

/// - Appel get dans l'api avec l'url construit:
let getArticleSelected = fetch(urlArticle)
  .then(function (res) {
    return res.json();
  })
  .then(function(responseJson) {
    articleSelected = responseJson;
  })
  .catch(function(err) {
    //ajout message d'erreur dans la page:
    section.innerHTML = ` <p class="col text-info">Une erreur est survenue, nous vous prions de bien vouloir réessayer dans un instant.</P>` + err;
  });

///Fonctions from app.js: pop-up panier si rempli:
//affichage pop up avec articles 
onCartEdit();  

///Fonctions de la page:
activateValidateBtn();

isMaxAmount();


///// - - DECLARATION DES FONCTIONS - - /////

///Affichage des articles dans le html:
async function articleSelectedDisplay() {
  await getArticleSelected
  //ajout dans le html des données
  section.innerHTML = `
  <img class="card-img-top pt-2" src="${articleSelected.imageUrl}"/>
  <h2 class="card-title mt-3">${articleSelected.name}</h2>
  <div class="card-text">
    <p>${articleSelected.description}</p> 
    <p class="h6">Prix: ${articleSelected.price/100} € <p>
    <form>
      <label for="lentilles" class="col-12"> Choisissez l'option de lentille </label>
      <select name="lentilles" id="lentilles">
      </select>
    </form>
  </div> 
  `
    for (let option in articleSelected.lenses) {
    //creation des champs de personnalisation de l'article dans le slect créé précédemment
    const customiseSection = document.getElementById('lentilles')
    //ajout liste déroulante
    const optionCustom = document.createElement('option');
    //ajout inner HTML des champs custom radio boutons:
    optionCustom.innerHTML =
    `
    <option value=${articleSelected.lenses[option]}>${articleSelected.lenses[option]}</option>
    `
    customiseSection.appendChild(optionCustom)
    }
};

//activation du bouton valider la commande si le pannier contient des articles:
async function activateValidateBtn() {
  await articleSelectedDisplay()
  if(localStorage.getItem("article") != null) {
  validateBtn.removeAttribute("disabled");
  validateBtn.classList.replace("btn-primary", "btn-info");
  }
};

//fonction calcul du prix total à l'event change du nombre d'article
function getAmountArticles() {
  let articleTotal;
  //definition variable pour le nombre d'articles
  let choiceNumbers = numbersSection.options[numbersSection.selectedIndex].text;
  //calcule du prix total:
  const price = articleSelected.price * choiceNumbers /100 ;
  //ajout dans <span> du prix total innerHTML:
  const resultTotal = document.querySelector('.total__prix')
  resultTotal.innerHTML = 
  `
  ${price} €
  `
  //boucle pour creation d'un nouvel objet avec la quantité.
  for(let num in choiceNumbers) {
    articleTotal = {
      name: articleSelected.name,
      id: articleSelected._id,
      price: articleSelected.price/100,
      qty:Number(choiceNumbers),
      img: articleSelected.imageUrl,
    }
  }
  articleTotalSelected = articleTotal;
};

//stockage des articles dans le localStorage
async function addArticles(e) {
  //récupération du nombre d'articles du selecy:
  let choiceNumbers = numbersSection.options[numbersSection.selectedIndex].text;
  // definition de la fonction pour ajouter les articles dans le localStorage selon le nombre choisi:
  const addSome = () => {
    articleInLocalStorage.push(articleTotalSelected);
    //modification de l'objet en json et envoi dans key "article"
    localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
    //puis actualisation de la page pour afficher le nombre d'article dans la popup panier
    location.reload();
  }
  //si selection nulle renvoie alert: border + message (to do)
 if (choiceNumbers == 0) {
    numbersSection.style.border = "2px dashed red";
 } else {
  if(articleInLocalStorage) {
    let newArticle = true;
      //verification si l'article est déja présent dans le panier:
      for (let i = 0; i < articleInLocalStorage.length; i++) {
      ///si article dans l'url existe deja dans panier:
        const product = articleInLocalStorage[i];
        if (product.id === removePoint) {
          //on pass new article à la valeur false
          newArticle = false;
          //on ajoute la quantité d'articles
          product.qty += Number(choiceNumbers);
          localStorage.setItem("article", JSON.stringify(articleInLocalStorage))
          //puis actualisation de la page pour afficher le nombre d'article dans la popup panier
          location.reload();
          break
        }       
      }
      ///si article dont l'id est différent de ceux deja dans le panier:
      if(newArticle) {
        addSome();
      } 
  } else {
    //creation du tableau des articles lors du 1er ajout dans le pannier
    articleInLocalStorage = []
    addSome();
  }
  e.preventDefault()
  e.stopPropagation()
}
};

//Desactivation du bouton ajout si max 20:
function isMaxAmount() {
  if (articleInLocalStorage) {
    articleInLocalStorage.forEach(el => {
      if (el.id === removePoint && el.qty >= 20 ) {
        //verrouillage du bouton ajouter:
        addButton.setAttribute('disabled', 'disabled');
        //Message d'info sur le nombre max atteint:
        let maxAmountMessage = document.createElement('div');
        maxAmountMessage.classList.add('col-12','text-center','h3', 'text-info')
        maxAmountMessage.innerHTML = `
        <p> Vous avez atteint le nombre maximum d'appareils ${el.name} dans votre panier </p>
        <p class="h4"> Merci de valider votre commande, ou de continuer vos achats. </p>
        `
        sectionAdd.appendChild(maxAmountMessage)
      }   
    })
  }
};





