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
        // printProducts(products);
        let Selectedproduct ={
          name:products.name,
          price:products.price/100,
          imageUrl:products.imageUrl,
          description: products.description,
          colors: products.colors,
          inCart: 0,
          _id:products._id
        };
      printProducts(Selectedproduct, products.colors);  
      startCartCounter(Selectedproduct);
     

      })
    }

function printProducts(Selectedproduct)
{
    document.querySelector("#img").src=Selectedproduct.imageUrl;
    document.querySelector("#title").innerHTML=Selectedproduct.name;
    document.querySelector("#price").innerHTML=Selectedproduct.price;
    document.querySelector("#description").innerHTML=Selectedproduct.description;
    document.querySelector("#colors").innerHTML=Selectedproduct.colors;
  // abel.textContent ='color-select : ' 
      //boxSel.appendChild(label)
    document.querySelector("#quantity").innerHTML=Selectedproduct.inCart;

     }  






//afficher le nombre de produits qui existe dant localStorage au panier
//1) enregister un produit choisi dans le panier

function startCartCounter (Selectedproduct){
  let carts = document.querySelectorAll('.add-cart');
  carts[0].addEventListener('click', () => {
 console.log("The selected product is:",Selectedproduct);
});
};

//let carts = document.querySelectorAll('.add-cart');
//for (let i=0; i< carts.length; i++) {
  //carts[i].addEventListener('click', () => {
   // cartNumbers(Selectedproduct[i]);
  //})


function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
}

}

function cartNumbers(Selectedproduct) {
  console.log("the product clicked is",Selectedproduct);
   let productNumbers =  localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      productNumbers = productNumbers +1;
     } else {
  localStorage.setItem('cartNumbers', 1);
  document.querySelector('.cart span').textContent = 1;
     }


     onLoadCartNumbers();
    }

