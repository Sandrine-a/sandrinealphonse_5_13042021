console.log('hello you');

let newDiv = document.createElement('div');

//Recuperation liste articles api Meubles en chêne http://localhost:3000/api/furniture
 function getArticles() {
  fetch('http://localhost:3000/api/furniture/')
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
        let article = document.createElement('article')
        //ajout données affichées pour chaque article:
        article.innerHTML = ` <h3>${data.name}</h3>
        <p>${data.price}</p>
        <img src="${data.imageUrl}"/>`
        let list = document.getElementById('artcicles__list');
        list.appendChild(article);
      });
    })
    .catch(function(err) {
      console.log('une erreur détectée' + err);
    })
}
getArticles()

//Afficher article

//      //ajout des éléments carte
//list.innerHTML += ` <h3>${dataList[1].name}</h3>
//<p>${dataList[1].price}</p>` ;
//ajout prix