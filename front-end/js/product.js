
////Construction de l'url pour fetch l'article:
//recuperation de l'article par id dans url
const stringSearchUrlById = window.location.search;
console.log(stringSearchUrlById);
//recuperation de l'article avec id
const removePoint = stringSearchUrlById.substring(4);
console.log(removePoint);
//remplacer id dans url
const urlArticle = "http://localhost:3000/api/cameras/" + removePoint;
console.log(urlArticle);
 
//creation de la section 
const section = document.getElementById('article__display')

//appel get dans l'api avec l'url construit
function getArticleSelected() {
  fetch(urlArticle)
  .then(function (res) {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
  })
  .then (function(data) {
    console.log(data)
    console.log(data.lenses);
    //ajout des data dans variable articleSelected voir fichier data.js
    articleSelected = (data);//données globales
    //options de personnalisation creation d'une variable pour stocker
    const opt = (data.lenses);
    options = opt;
    console.log(opt);
  })
  .catch(function(err) {
    console.log('une erreur détectée' + err);
    //ajout message d'erreur dans la page:
    section.innerHTML = ` <p class="col text-info">Une erreur est survenue, nous vous prions de bien vouloir réessayer dans un instant.</P>` + err;
  })
}

getArticleSelected()

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
    <fieldset id="lentilles">
      <legend> Choisissez l'option de lentille </legend>
    </fieldset>
  </div> 
  `
      for (let option in options) {
      //creation des champs de personnalisation de l'article dans le fieldset créé précédemment
      const customiseSection = document.getElementById('lentilles')
      //ajout input pour seclected option
      const optionCustom = document.createElement('div');
      //ajout des classes pour css de la div input:
      optionCustom.classList.add("mb-2");
      //ajout inner HTML des champs custom radio boutons:
      optionCustom.innerHTML =
      `
      <input type="radio" id ="${options[option]}" name="option" value="${options[option]}">
      <label for="${options[option]}">${options[option]}</label>
      `
      customiseSection.appendChild(optionCustom)
    }
}, 500)
console.log(articleSelectedDisplay())
articleSelectedDisplay()

//ajout produit
//variable pour l'icone panier
const cartIcon = document.querySelector('.header__cart--icon')

//ajout de l'alerte produi ajouté sous bouton


