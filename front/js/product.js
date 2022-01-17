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
       printProducts(products);
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

function printProducts(Selectedproduct) {
  document.querySelector("#img").src = Selectedproduct.imageUrl;
  document.querySelector("#title").innerHTML = Selectedproduct.name;
  document.querySelector("#price").innerHTML = Selectedproduct.price;
  document.querySelector("#description").innerHTML = Selectedproduct.description;
  document.querySelector("#colors").innerHTML = Selectedproduct.colors;
  document.querySelector("#quantity").innerHTML = Selectedproduct.inCart;

}






//afficher le nombre de produits qui existe dant localStorage au panier
//1) enregister un produit choisi dans le panier

function startCartCounter(Selectedproduct) {
  let carts = document.querySelectorAll('.add-cart');
  carts[0].addEventListener('click', () => {
    cartNumbers(Selectedproduct);
    totalCost();
    onLoadCartNumbers();
  })
}


//pour afficher le nombre de produits dans le panier
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  console.log(productNumbers);
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }

}


// pour enregestrer le nombre de produit dan localStorage
function cartNumbers(Selectedproduct) {

  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    productNumbers = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
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
  for (i in cartItem) {
    cost +=
      parseFloat(cartItem[i].price) * parseFloat(cartItem[i].inCart);
  }
  localStorage.setItem('cartCost', cost);
}

