
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
//

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
console.log(articleSelected);

//ajout produit///////
//variable pour l'icone panier
const cartIcon = document.querySelector('.header__cart--icon');

/////

setTimeout(function articleSelectedDisplay() {
  //selection de la section pour afficher article
  console.log(section);
  //ajout dans le html des données
  //ajout des options pour select
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
  return articleSelected
}, 500)

articleSelectedDisplay()

//au click sur bouton:
function addOne() {
  //modification de l'objet en json
  let articleJSON = JSON.stringify(articleSelected)
  //ajout au localStorage:
  localStorage.setItem("article", articleJSON);

  //message de confirmation d'ajout dans section innerHTML ci-dessous:
  const messageAjoutArticle = document.createElement("p")
  messageAjoutArticle.classList.add("col-12", "text-center", "my-3", "text-info")
  let sectionMessageAjout = document.getElementById('ajout')
  
  sectionMessageAjout.appendChild(messageAjoutArticle)

  alert(`Article ajouté avec succès`)

}
//ajout du bouton  panier
/* function buttonGoToKart() {
  if (localStorage)
  for (let i = 0; i < localStorage.length ;i++)
} */





