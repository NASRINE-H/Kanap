"use strict";
// chercher le mot "id" dans le lien html de la page prdouit
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
  // récupérer les informations du produit selectionné par fetch
  fetch(urlApi())
    .then(response => response.json())
    .then(products => {

      let Selectedproduct = {
        name: products.name,
        price: products.price / 100,
        imageUrl: products.imageUrl,
        description: products.description,
        colors: products.colors,
        inCart: 0,
        _id: products._id
      };
        // une fois le produit récupéré dans 'selectedproduct', on va l'afficher sur la page product.html
      printProducts(Selectedproduct, products.colors);

      addProducToCart(Selectedproduct);
    })
}
// calculer le nombre de produits dans le panier pour mettre à jour le numéro dans le header
updateProductNumberDisplay();


//afficher les details du produit choisi 
function printProducts(Selectedproduct, colors) {
  //remplir les champs de la page porduct.html
  document.querySelector('#img').src = Selectedproduct.imageUrl;
  document.querySelector("#title").innerText = Selectedproduct.name;
  document.querySelector("#price").innerText = Selectedproduct.price;
  document.querySelector("#description").innerText = Selectedproduct.description;

  //remplir le bouton "choisir la couleur" avec les couleurs du produit choisi 
  let divColorSetting = document.getElementById("colors");
  colors.forEach(color => {
    let option = document.createElement('option');
    option.setAttribute("value", color);
    divColorSetting.appendChild(option);
    option.innerText = color;
  })

  divColorSetting.addEventListener('change', () => {
    document.querySelector("input#quantity").value = productNumberinCart(Selectedproduct._id+divColorSetting.value);
  })
};


//afficher le nombre de produits qui existe dant localStorage au panier
//1) enregister un produit choisi dans le panier

function addProducToCart(Selectedproduct) {
  let carts = document.querySelectorAll('.add-cart');
  carts[0].addEventListener('click', () => {
    console.log(Selectedproduct);
    let settingQuantity = document.getElementById("quantity");
    let itemQuantity = parseInt(settingQuantity.value);
    let settingColor = document.getElementById("colors");
    let itemColor= settingColor.value;
    if(itemColor=='--SVP, choisissez une couleur --' || itemColor=='')
      alert("veuillez choisir une couleur");
    else
    {    
        saveToLocalStorage(Selectedproduct, itemQuantity, itemColor);
        cartNumbers(itemQuantity);
        updateProductNumberDisplay();
        console.log("added ",itemQuantity, "of product ",Selectedproduct._id);
//        window.open("../html/cart.html");
    }  
  })
}

//pour afficher le nombre de produits dans le panier
function updateProductNumberDisplay() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

// pour enregistrer le nombre de produit dan localStorage
function cartNumbers(itemQuantity) {

  let inCart = localStorage.getItem('cartNumbers');
  inCart = parseInt(inCart);

  if (inCart) {
    localStorage.setItem('cartNumbers', inCart + itemQuantity);
    inCart = inCart + itemQuantity;
  } else {
    localStorage.setItem('cartNumbers', itemQuantity);
  }
}

//enregistrer les produits dans localStorage
function saveToLocalStorage(Selectedproduct, itemQuantity, itemcolor) {
  let localId=Selectedproduct._id+itemcolor;
  console.log("local id:", localId);
  let cartItem = localStorage.getItem('cartProduct');
  cartItem = JSON.parse(cartItem);

  // vérifier si local storage est vide
  if (cartItem == null) {
    Selectedproduct.inCart = parseInt(itemQuantity);
    Selectedproduct.colors = itemcolor;
    let cartItem =
    {
      [localId]: Selectedproduct
    };
    //transformer de obj en JSON 
    localStorage.setItem('cartProduct', JSON.stringify(cartItem));
  }
  // id trouvé dans le local storge => on augumente seulement le inCart
  else if (cartItem[localId] != null) {
    cartItem[localId].inCart += parseInt(itemQuantity);
  //transformer de obj en JSON 
  localStorage.setItem('cartProduct', JSON.stringify(cartItem));
  }
  // le locale storage existe mais un nouveau item est selectionné
  else {
    Selectedproduct.inCart = parseInt(itemQuantity);
    Selectedproduct.colors = itemcolor;
    //taguer l'obj
    cartItem = {
      ...cartItem,
      [localId]: Selectedproduct
    };
  //transformer de obj en JSON 
  localStorage.setItem('cartProduct', JSON.stringify(cartItem));
  }
}

function productNumberinCart(prodcutid) {
  let cartItem = localStorage.getItem('cartProduct');
  cartItem = JSON.parse(cartItem);
  let inCart;
  if (cartItem == null || cartItem[prodcutid] == null) {
    // local storage vide
    inCart = 0;
  }
  else {
    inCart = cartItem[prodcutid].inCart;
  }
  return (inCart);
}
