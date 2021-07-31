//recuperation de l'article par id dans url
const stringSearchUrlById = window.location.search;
console.log(stringSearchUrlById);

//recuperation de l'article avec id
const removePoint = stringSearchUrlById.substring(4);
console.log(removePoint);

//creation de la section
const section = document.getElementById('article__display')

 //remplacer id dans url
const urlArticle = "http://localhost:3000/api/cameras/" + removePoint;
console.log(urlArticle);

//appel get dans l'api avec l'id rajouté à l'url
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
    //ajout des data dans variable articleSelected voir fichier data.js
    articleSelected = (data);
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
  section.innerHTML = `
  <img  class="card-img-top" src="${articleSelected.imageUrl}"/>
  <h3 class="card-title">${articleSelected.name}</h3>
  <div class="card-text">
    <p>${articleSelected.price} € <p>
    <p>${articleSelected.description}</p> 
  </div> 
  `
}, 500)
console.log(articleSelectedDisplay())
articleSelectedDisplay()

