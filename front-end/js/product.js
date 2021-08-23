
////Construction de l'url pour fetch l'article:
//recuperation de l'article par id dans url
const stringSearchUrlById = window.location.search;
//recuperation de l'article avec id
const removePoint = stringSearchUrlById.substring(4);
//remplacer id dans url
const urlArticle = "http://localhost:3000/api/cameras/" + removePoint;
 
//creation de la section 
const section = document.getElementById('article__display')


// BOUTON //
//ajout de l'alerte produit ajouté sous bouton
const addButton = document.getElementById('ajout__btn');
addButton.addEventListener('click', addArticles);
//bouton valider la commande declaration variable:
const validateBtn = document.getElementById("order__btn");
window.addEventListener('storage', activateValidateBtn)/* 
validateBtn.addEventListener('click', goPanier) */

let articleSelected = {};

//variable total
let articleTotalSelected = {}

//Nombre d'article:
  //creation du total des articles
const numbersSection = document.getElementById('nombre')
numbersSection.addEventListener('change', getAmountArticles)

//appel get dans l'api avec l'url construit
let getArticleSelected = fetch(urlArticle)
.then(function (res) {
  return res.json();
})
.then(function(responseJson) {
  articleSelected = responseJson
})
.catch(function(err) {
  //ajout message d'erreur dans la page:
  section.innerHTML = ` <p class="col text-info">Une erreur est survenue, nous vous prions de bien vouloir réessayer dans un instant.</P>` + err;
})

async function articleSelectedDisplay() {
  await getArticleSelected
  //ajout dans le html des données
  section.innerHTML = `
  <img  class="card-img-top" src="${articleSelected.imageUrl}"/>
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
}
articleSelectedDisplay()

//activation du bouton valider la commande si le pannier contient des articles:
async function activateValidateBtn() {
  await articleSelectedDisplay()
  if(localStorage.getItem("article") != null) {
  validateBtn.removeAttribute("disabled");
  validateBtn.classList.replace("btn-primary", "btn-info");
  }
}
activateValidateBtn()

//fonction calcul du prix total à l'event change du nombre d'article
function getAmountArticles() {
  let articleTotal
  //definition variable pour le nombre d'articles
  let choiceNumbers = numbersSection.options[numbersSection.selectedIndex].text;
  //calcule du prix total:
  const price = articleSelected.price * choiceNumbers /100 ;
  console.log(price);
  //ajout dans <span> du prix total innerHTML:
  const resultTotal = document.querySelector('.total__prix')
  resultTotal.innerHTML = 
  `
  ${price} €
  `
  //boucle pour creation d'un total
  for(let num in choiceNumbers) {
    articleTotal = {
      name: articleSelected.name,
      id: articleSelected._id,
      price: articleSelected.price/100,
      qty:Number(choiceNumbers),
      img: articleSelected.imageUrl,
    }
  }
  articleTotalSelected = articleTotal
  console.log(articleTotalSelected);
}

//stockage des articles dans le localStorage
async function addArticles(e) {
  let choiceNumbers = numbersSection.options[numbersSection.selectedIndex].text;
  //parse article dans localStorage
  let articleInLocalStorage = JSON.parse(localStorage.getItem("article"))
  // definition de la fonction pour ajouter les articles dans le localStorage selon le nombre choisi:
  const addSome = () => {
    articleInLocalStorage.push(articleTotalSelected);
    //modification de l'objet en json et envoi dans key "article"
    localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
    //activation du bouton valider la commande
    validateBtn.removeAttribute("disabled");
    validateBtn.classList.replace("btn-primary", "btn-info")
    //puis actualisation de la page pour afficher le nombre d'article dans la popup panier
    location.reload()
  }
  //si selection nulle renvoie alert: border + message (to do)
 if (choiceNumbers == 0) {
   console.log(choiceNumbers);
    numbersSection.style.border = "2px dashed red";
 } else {
  if(articleInLocalStorage) {
    let newArticle = true;
      //verification si l'article est déja présent dans le panier:
      for (let i = 0; i < articleInLocalStorage.length; i++) {
      ///si article existe deja dans panier:
        const product = articleInLocalStorage[i];
        if (product.id === removePoint) {
          console.log("ajout ajout");
          //on pass new article à la valeur false
          newArticle = false;
          //on ajoute la quantité d'articles
          product.qty += Number(choiceNumbers);
          localStorage.setItem("article", JSON.stringify(articleInLocalStorage))
          //puis actualisation de la page pour afficher le nombre d'article dans la popup panier
          location.reload()
          break
        }       
      }
      ///si article dont l'id est différent de ceux deja dans le panier:
      if(newArticle) {
        addSome()
      } 
  } else {
  //creation du tableau des articles lors du 1er ajout dans le pannier
  articleInLocalStorage = []
  addSome()
  }
  e.preventDefault()
  e.stopPropagation()
}
}

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
onCartEdit()

