 "use strict"; 
 //On récupère les informations de l'API 
fetch(" http://localhost:3000/api/products")
  //Récupérer une promesse sous forme de donnée Json 
  .then(response => response.json())
  //Récupérer la fonction pour l'afficher
  .then(products => {
    console.log(products);
    printProducts(products);
  });
 //<div id="panier">
 // <div class="products-container" id="products-container">
 // <div class="product-header">
      // <h5 class="product-title">PRODUCT</h5>
      // <h5 class="price">PRICE</h5>
      // <h5 class="quantity">QUANTITY</h5>
       //<h5 class="total">TOTAL</h5>
      //</div>
   //<div class="products">
   //</div> 

  //création d'une fonction d'affichage pour la structure du DOM
function printProducts(products) {
  let itemsElemnt = document.getElementById("items");

  //On va parcourir le tableau et recuperer les informations et les afficher en HTML
  products.forEach(function (prod) {
    let link = document.createElement('a');
    itemsElemnt.appendChild(link);
    link.setAttribute("href", `product.html?id=${prod._id}`);
    let article = document.createElement("article");
    link.appendChild(article);
    article.innerHTML += `
        <img src=${prod.imageUrl} id="img">
        <h3 id="productName">${prod.name}</h3>
        <p id="productDescription">${prod.altTxt}</p>
        `
  }
  );

};

//pour afficher le nombre de produits dans le panier
let productNumbers = localStorage.getItem('cartNumbers');
if (productNumbers) {
  document.querySelector('.cart span').textContent = productNumbers;
};
