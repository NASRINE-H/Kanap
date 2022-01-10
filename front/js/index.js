//On récupère les informations de l'API
fetch(" http://localhost:3000/api/products")
  //Récupérer une promise sous forme de donnée Json 
  .then(response => response.json())
  //Récupérer la fonction pour l'afficher
  .then(products => {
    console.log(products)
    printProducts(products);
  });
//création d'une fonction pour la structure du DOM
function printProducts(products) {
  let listOfProducts = "";
  //On va parcourir le tableau et recuperer les informations et les afficher sue DOM(page web)
  products.forEach(prod =>
    listOfProducts += `
      <tr class="text-left bg-dark text-light " id="${prod._id}">
        
        <td class="w-25"><img src=${prod.imageUrl} class="img-fluid img-thumbnail w-75" id="myImg"></td>
        <td class="w-25 align-middle">${prod.name}</td>
        <td class="w-25 align-middle">${prod.colors}</td>
        
        <td class="w-25 align-middle">${prod.price / 100}€</td>
        <td class="w-25 align-middle">${prod.description}</td>
        <td class="w-25 align-middle">${prod.altTxt}</td>
        <td class="w-25 align-middle"><a id="view" href="product.html?id=${prod._id}" class="view-cart btn btn-info">Voir</a></td>
      </tr>   
          `
  );
  //On identifie l'id pour l'affichage du tableau 

  let itemsElemnt = document.getElementById("items");
  let paragraphElement = document.createElement("p");
  itemsElemnt.appendChild(paragraphElement);
  paragraphElement.innerHTML = listOfProducts;




  //document.getElementById('items').innerHTML = listOfProducts;
};

//pour afficher le nombre de produits dans le panier
let productNumbers = localStorage.getItem('cartNumbers');
if (productNumbers) {
  document.querySelector('.cart span').textContent = productNumbers;
}
