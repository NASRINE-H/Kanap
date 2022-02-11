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
      // utilisé dans l'affichage du product.html
      let Selectedproduct = {
        name: products.name,
        price: products.price / 100,
        imageUrl: products.imageUrl,
        description: products.description,
        colors: products.colors,
        inCart: 0,
        _id: products._id
      };
      // utilisé dans le local storage
      let Storedproduct = {
        colors: products.colors,
        inCart: 0,
        _id: products._id
      };
      // une fois le produit récupéré dans 'selectedproduct', on va l'afficher sur la page product.html
      showProduct(Selectedproduct, products.colors);
      // enregistrer le produit dans local storage
      addProducToCart(Storedproduct);
    })
}
// calculer le nombre de produits dans le panier pour mettre à jour le numéro dans le header
productNumberDisplay();


//afficher les details du produit choisi 
function showProduct(Selectedproduct, colors) {
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

  // afficher la quantité du produit de la couleur choisi (avec le change)
  divColorSetting.addEventListener('change', () => {
    document.querySelector("input#quantity").value = productNumberinCart(Selectedproduct._id + divColorSetting.value);
  })
};

// enregister un produit choisi dans le localstorage sur appui du boutton ajouter au panier
function addProducToCart(Selectedproduct) {
  let carts = document.querySelectorAll('.add-cart');
  carts[0].addEventListener('click', () => {
    let settingQuantity = document.getElementById("quantity");
    let itemQuantity = parseInt(settingQuantity.value);
    let settingColor = document.getElementById("colors");
    let itemColor = settingColor.value;
    if (itemColor == '--SVP, choisissez une couleur --' || itemColor == '')
      alert("veuillez choisir une couleur");
    else {
      saveToLocalStorage(Selectedproduct, itemQuantity, itemColor);
      productNumberDisplay();
      console.log("added ", itemQuantity, "of product ", Selectedproduct._id);
      window.open("../html/cart.html","_self");
    }
  })
}

//pour afficher le nombre de produits dans le panier (dans localstorage) dans la page product html
function productNumberDisplay() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

//enregistrer les produits dans localStorage
function saveToLocalStorage(Selectedproduct, itemQuantity, itemcolor) {
  let localId = Selectedproduct._id + itemcolor;
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
  // id trouvé dans le local storge => on augmente seulement le inCart
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

//recuperer le nombre de produits avec l'id "prodcutid" déjà dans localStorage pour l
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
