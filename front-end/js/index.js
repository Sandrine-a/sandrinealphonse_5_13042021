console.log('hello you');

//Variable 
let list = document.getElementById('artcicles__list');

//Recuperation liste articles api Meubles en chêne http://localhost:3000/api/furniture
 function getArticles() {
  fetch('http://localhost:3000/api/cameras/')
    .then(function(res) {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
    })
    .then(function(dataList) {
      console.log(dataList[1]);
      dataList.forEach(function(data) {
        console.log(data)
        //ajout des <div> pour article:
        let article = document.createElement('article');
        //ajout de la class card boostrap pour contenant article:
        article.classList.add('card')
        //ajout données affichées pour chaque article dans la card bootstrap:
        article.innerHTML = `
        <a href="#" class="card-body")> 
        <h3 class="card-title">${data.name}</h3>
        <img src="${data.imageUrl}" class="card-img"/>
        <p>${data.price} €</p> </a>`
        list.appendChild(article);
      });
    })
    .catch(function(err) {
      console.log('une erreur détectée' + err);
      //ajout message d'erreur dans la page:
      list.innerHTML = ` <p class="col text-info">Une erreur est survenue, nous vous prions de bien vouloir réessayer dans un instant.</P>` + err;
    })
}
getArticles()

//Afficher article
