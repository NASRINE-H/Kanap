"use strict";
const paramsString = new URLSearchParams(window.location.search);
const idUrl = paramsString.get("id");

const urlApi = function () {
  if (idUrl == null) {
    return "http://localhost:3000/api/products";
  } else {
    return "http://localhost:3000/api/products/" + idUrl;
  }
};


if (idUrl != null) {
  // let url = "http://localhost:3000/api/products" + idUrl;

  fetch(urlApi())
   .then(response => response.json())
    // Récupérer la fonction pour l'afficher
    .then(products => {
//       printProducts(products);
      let Selectedproduct = {
        name: products.name,
        price: products.price / 100,
        imageUrl: products.imageUrl,
        description: products.description,
        colors: products.colors,
        inCart: 0,
        _id: products._id
      };
      printProducts(Selectedproduct, products.colors);
      startCartCounter(Selectedproduct);


    })
}
onLoadCartNumbers();

function printProducts(Selectedproduct, colors) {
  document.querySelector('#img').src = Selectedproduct.imageUrl;
  document.querySelector("#title").innerHTML = Selectedproduct.name;
  document.querySelector("#price").innerHTML = Selectedproduct.price;
  document.querySelector("#description").innerHTML = Selectedproduct.description;
  document.querySelector("#colors").innerHTML = Selectedproduct.colors;
  document.querySelector("#quantity").innerHTML = Selectedproduct.inCart;
//bouton choisir la couleur
  let divSettCoSelect = document.getElementById("colors");

 

  colors.forEach(color => {
    let option =  document.createElement('option');
    option.setAttribute("value", color);
    divSettCoSelect.appendChild(option);
    option.innerHTML = color ;

    // creation d'un bouton pour la quantité
    /*let divSettQuantity = document.createElement("div");
    divSettQuantity.classList.add("item__content__settings__quantity");
    let divSettQuanLabel = document.createElement("label");
    divSettQuantity.appendChild(divSettQuanLabel);
    divSettQuanLabel.setAttribute("for", "itemQuantity");
    divSettQuanLabel.innerHTML = "Nombre d'article(s) (1-100)"*/

    //creation input

   /* let divSttQuanInput = document.createElement("input");
    divSettQuantity.appendChild(divSttQuanInput);
    divSttQuanInput.setAttribute("type", "number");
    divSttQuanInput.setAttribute("name","itemQuantity");
    divSttQuanInput.setAttribute("min","1");
    divSttQuanInput.setAttribute("max","100");
    divSttQuanInput.setAttribute("value","0");
    divSttQuanInput.setAttribute("id","quantity");

  }*/

    
 /*colors.forEach(color => {
    console.log(color);
    let option = document.createElement('option');
    option.setAttribute("value",color);
    option.innerHTML=color;
    divSettCoSelect.appendChild(option);*/
    
  });


// let divSettCoLabel = document.getElementById("color-select");
//sdivSettCoLabel.innerHTML = "choisir une couleur";

//let divSettCoSelOption = document.getElementsByTagName("option");
//divSettCoSelOption.innerHTML = "--SVP ,choisir ......";

// let divSettCoQuantity = document.getElementById('')



//afficher le nombre de produits qui existe dant localStorage au panier
//1) enregister un produit choisi dans le panier

function startCartCounter(Selectedproduct) {
 //creation boutton
   let divContent = document.createElement("div");
   divContent.classList.add("item__content");
   let divAdd = document.createElement("div");
divContent.appendChild(divAdd);
   divAdd.classList.add("item__content__addButton");

   let divAddButton = document.createElement("button");
   divAdd.appendChild(divAddButton);
   divAddButton.id = "addToCart";
   divAddButton.setAttribute("href", "cart.html");
   divAddButton.innerText = "Ajouter au panier";

  let selectedNumber=1;
  let selectedColor="Rien";
  let carts = document.querySelectorAll('.add-cart');
  carts[0].addEventListener('click', () => {
    cartNumbers(Selectedproduct, selectedNumber,selectedColor);
    totalCost();
    onLoadCartNumbers();
  })
}


//pour afficher le nombre de produits dans le panier
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
//  console.log(productNumbers);
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }

}


// pour enregestrer le nombre de produit dan localStorage
function cartNumbers(Selectedproduct,selectedNumber,selectedColor) {

  let inCart = localStorage.getItem('cartNumbers');
  console.log(selectedColor);
  inCart = parseInt(inCart);

  if (inCart) {
    localStorage.setItem('cartNumbers', inCart + selectedNumber);
    inCart = inCart + selectedNumber;
  } else {
    localStorage.setItem('cartNumbers', selectedNumber);
    document.querySelector('.cart span').textContent = selectedNumber;
  }
  setItems(Selectedproduct)



}

//enregestrer les produits dans localStorage

function setItems(Selectedproduct) {
  let cartItem = localStorage.getItem('cartProduct');
  cartItem = JSON.parse(cartItem);
  if (cartItem == null) {
    // local storage vide
    // 1 dans inCart
    Selectedproduct.inCart = 1;

    // taguer l'obj
    Selectedproduct.inCart = 1;

    let cartItem =
    {
      [Selectedproduct._id]: Selectedproduct

    };
    //transformer de obj en JSON 

    localStorage.setItem('cartProduct', JSON.stringify(cartItem));

  }
  else if (cartItem[Selectedproduct._id] != null) {// localStorage n'est pas vide 
    //ajouter 1 dans inCart
    cartItem[Selectedproduct._id].inCart += 1;
    // taguer l'obj
    localStorage.setItem('cartProduct', JSON.stringify(cartItem));


  }
  else {
    // le locale storage existe mais un nouveau item est selectionné
    Selectedproduct.inCart = 1;
    //taguer l'obj
    cartItem = {
      ...cartItem,
      [Selectedproduct._id]: Selectedproduct
    };
    //transformer de obj en json
    localStorage.setItem('cartProduct', JSON.stringify(cartItem));
  }
}

// fair le prix totale
function totalCost() {
  let cartItem = localStorage.getItem('cartProduct');
  cartItem = JSON.parse(cartItem);
  let cost = 0;
  for (let i in cartItem) {
    cost +=
      parseFloat(cartItem[i].price) * parseFloat(cartItem[i].inCart);
  }
  localStorage.setItem('cartCost', cost);
}
