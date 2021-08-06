
////Construction de l'url pour fetch l'article:
//recuperation de l'article par id dans url
const stringSearchUrlById = window.location.search;
//recuperation de l'article avec id
const removePoint = stringSearchUrlById.substring(4);
//remplacer id dans url
const urlArticle = "http://localhost:3000/api/cameras/" + removePoint;
 
//creation de la section 
const section = document.getElementById('article__display')
//
let articleSelected = [];

// BOUTON //
//ajout de l'alerte produit ajouté sous bouton
const addButton = document.getElementById('ajout__btn');
addButton.addEventListener('click', addOne);
//Nombre d'article:
/*   //creation des nombres
 const numbersSection = document.getElementById('nombre')
numberSelect.addEventListener('change', changeNumberArticle)
 */

//appel get dans l'api avec l'url construit
function getArticleSelected() {
  fetch(urlArticle)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then (function(data) {
    //ajout des data dans variable articleSelected voir fichier data.js
    articleSelected = (data);//données globales
    console.log(articleSelected);
    //options de personnalisation creation d'une variable pour stocker
    const opt = (data.lenses);
    options = opt;
  })
  .catch(function(err) {
    //ajout message d'erreur dans la page:
    section.innerHTML = ` <p class="col text-info">Une erreur est survenue, nous vous prions de bien vouloir réessayer dans un instant.</P>` + err;
  })
}

getArticleSelected()

//ajout produit///////
//variable pour l'icone panier
const cartIcon = document.querySelector('.header__cart--icon');
/////

setTimeout(function articleSelectedDisplay() {
  //ajout dans le html des données
  section.innerHTML = `
  <img  class="card-img-top" src="${articleSelected.imageUrl}"/>
  <h3 class="card-title mt-3">${articleSelected.name}</h3>
  <div class="card-text">
    <p>${articleSelected.description}</p> 
    <p>${articleSelected.price/100} € <p>
    <form>
      <label for="lentilles" class="col-12"> Choisissez l'option de lentille </label>
      <select name="lentilles" id="lentilles">
      </select>
    </form>
    <form>
      <label for="nombre" class="col-12"> Nombre d'article </label>
      <select name="nombre" id="nombre">
      </select>
    </form>
    <div class="nombre__choisi">Nombre d'article: </div>
  </div> 
  `
    for (let option in options) {
    //creation des champs de personnalisation de l'article dans le slect créé précédemment
    const customiseSection = document.getElementById('lentilles')
    //ajout liste déroulante
    const optionCustom = document.createElement('option');
    //ajout inner HTML des champs custom radio boutons:
    optionCustom.innerHTML =
    `
    <option value=${options[option]}>${options[option]}</option>
    `
    customiseSection.appendChild(optionCustom)
    }
    //creation du select des quantités
    const nombreMax = 11;
    for(let num=1; num < nombreMax; num++) {
    //ajout liste déroulante
    const numberSelect = document.createElement('option');
    //ajout inner HTML des champs custom radio boutons:
    numberSelect.innerHTML =
    `
    <option>${num}</option>
    `
    numbersSection.appendChild(numberSelect)
    }
  return articleSelected
}, 500)

///////fonction choix quantité
/* //choix de la quantité
async function changeNubmerArticle() {
  const nombreChoisi = document.querySelector(".nombre__choisi")
} */
//au click sur bouton:
async function addOne() {
  await getArticleSelected
  //ajout du nombre dans l'élément panier du header
  let headerCounter = document.getElementById("header__cart")
  //creation de l'objet article avec quantité
  let articleTest = {
    name: articleSelected.name,
    id: articleSelected._id,
    imageUrl: articleSelected.imageUrl,
    qty: 1
  }
  // variable pour modification en JSON
  let articleJSON = JSON.stringify(articleTest)
  //varaible pour setItem dans localStorage
  let addArticle = localStorage.setItem("article", articleJSON);

  //creation du tableau pour stocker article en localstorage:
/*   if()
  articleInLocalStorage =[];
  articleInLocalStorage.push(articleTest);
  addArticle;

  console.log(articleInLocalStorage); */


/*   articleInLocalStorage.push(articleTest);
  console.log(articleInLocalStorage);
  addArticle; */

/*   console.log((articleTest));
  //creation de l'objet article et  modification en JSON
  let articleJSON = JSON.stringify(articleTest)
  console.log(articleJSON);
  //ajout au localStorage:
  let addArticle = localStorage.setItem("article", articleJSON);
  //variale pour parser les articles enregistrés dans local storage
  let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
  if(articleInLocalStorage == null) {
    //creation du tableau si local storage vide
    //ajout de l'article
    articleInLocalStorage.push(1, articleTest);
    addArticle;
    articleJSON;
    console.log(articleInLocalStorage);
  }else if (articleInLocalStorage != null && articleInLocalStorage.id == articleInLocalStorage.id) {
    articleInLocalStorage.qty ++;
    addArticle;
    articleJSON;
  } */
}
//ajout du bouton  panier
/* function buttonGoToKart() {
  if (localStorage)
  for (let i = 0; i < localStorage.length ;i++)
} */

/* push article:
//au click sur bouton:
function addOne() {
  //modification de l'objet en json
  let articleJSON = JSON.stringify(articleSelected);
  //ajout au localStorage:
  const addArticle = localStorage.setItem("article", articleJSON);
  //parse article dans localStorage
  let articleInLocalStorage = JSON.parse(localStorage.getItem("article"))
  
  if(articleInLocalStorage) {
    articleInLocalStorage.push(articleSelected);
    articleJSON;
    addArticle;
  }else{ 
    articleInLocalStorage = [];
    articleInLocalStorage.push(articleSelected);
    articleJSON;
    addArticle;
  }
} */



