"use strict";
//On récupère les informations de l'API 
fetch("http://localhost:3000/api/products")
  //Récupérer une promesse sous forme de donnée Json 
  .then(response => response.json())
  //Récupérer la fonction pour l'afficher
  .then(products => {
    console.log(products);
    printProducts(products);
  });

//création d'une fonction d'affichage pour la structure du DOM
function printProducts(products) {
  let itemsElemnt = document.getElementById("items");

  //On va parcourir le tableau et recuperer les informations et les afficher en HTML
  products.forEach(/*function*/ prod => {
    let link = document.createElement('a');
    itemsElemnt.appendChild(link);
    link.setAttribute("href", `product.html?id=${prod._id}`);
    let article = document.createElement("article");
    link.appendChild(article);

    let image = document.createElement("img");
    image.id = "img";
    image.src = `${prod.imageUrl}`;
    article.appendChild(image);

    let h3 = document.createElement("h3");
    h3.innerHTML = `${prod.name}`;
    h3.classList.add("productName");
    article.appendChild(h3);

    let p = document.createElement("p");
    p.classList.add("productDescription");
    p.innerHTML = `${prod.altTxt}`;
    article.appendChild(p);
  }
  );

};

//pour afficher le nombre de produits dans le panier
let productNumbers = localStorage.getItem('cartNumbers');
if (productNumbers) {
  document.querySelector('.cart span').textContent = productNumbers;
};
