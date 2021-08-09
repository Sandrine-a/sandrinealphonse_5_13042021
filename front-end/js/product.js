
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

let articleSelected = {};

//varaible panier 
let cart = []

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
  console.log(responseJson);
})
.catch(function(err) {
  //ajout message d'erreur dans la page:
  section.innerHTML = ` <p class="col text-info">Une erreur est survenue, nous vous prions de bien vouloir réessayer dans un instant.</P>` + err;
})

async function articleSelectedDisplay() {
  await getArticleSelected
  console.log(getArticleSelected);
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

//fonction calcul du prix total à l'event change du nombre d'article
function getAmountArticles() {
  let articleTotal
  console.log(articleSelected.price);
  //definition variable pour le nombre d'articles
  let choiceNumbers = numbersSection.options[numbersSection.selectedIndex].value
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
      price: articleSelected.price,
      img: articleSelected.imageUrl,
      qty: choiceNumbers[num],
      totalprice: price
    }
  }
  articleTotalSelected = articleTotal
  console.log(articleTotalSelected );
}

//stockage des articles dans le localStorage
async function addArticles() {
  let choiceNumbers = numbersSection.options[numbersSection.selectedIndex].value
  let articleStorage = localStorage.getItem('article')
  //parse article dans localStorage
  let articleInLocalStorage = JSON.parse(localStorage.getItem("article"))
  // definition de la fonction pour ajouter un article dans le localStorage:
  const addOne = () => {
  articleInLocalStorage.push(articleTotalSelected)
  //modification de l'objet en json et envoi dans key "article"
  localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
}
  //si selection nulle renvoie alert: border + message (to do)
 if (choiceNumbers == "") {
  numbersSection.style.border = "2px dashed red";
 }else {
   if(articleInLocalStorage) {
    addOne()
   }
/*    else if(articleInLocalStorage){
    console.log('coucouc');
   } */
   else {
    //creation du tableau des article dans le pannier
    articleInLocalStorage = []
    addOne()

    console.log(articleInLocalStorage);
   }
 }
}


/* /bon locaStorage sans prise en compte de la qty
//stockage des articles dans le localStorage
async function addArticles() {
  let choiceNumbers = numbersSection.options[numbersSection.selectedIndex].value
  let articleStorage = localStorage.getItem('article')
  //parse article dans localStorage
  let articleInLocalStorage = JSON.parse(localStorage.getItem("article"))

  // definition de la fonction pour ajouter un article dans le localStorage:
  const addOne = () => {
  articleInLocalStorage.push(articleSelected)
  //modification de l'objet en json et envoi dans key "article"
  localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
}
  //si selection nulle renvoie alert: border + message (to do)
 if (choiceNumbers == "") {
  numbersSection.style.border = "2px dashed red";
 }else {
   if(articleInLocalStorage) {
    addOne()
   }
   else {
    //creation du tableau des article dans le pannier
    articleInLocalStorage = cart
    addOne()

    console.log(articleInLocalStorage);
   }
 }
} */






