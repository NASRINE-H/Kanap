"use strict";
/*
1) Les fonctions/conditions de validation des champs du formulaire:
 - validation des noms / prénom => fonction valider utiliser le regExp
 - validation de l'adresse
 - validation de l'email 

2) créer la classe / object contact
 - formulaire de contact 
 - tableau des produits du panier 
 - nombre de chaque produit
 - le prix total
 - numéro de la commande
 
 
 3) l'envoi de l'object contact au serveur
  */







//pour afficher le nombre de produits dans le panier
function displayCartNumber() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if (productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

//aficher les produits selectionnés sur la page cart et fair le prix totale

function displayCart() {
	let cartItem = localStorage.getItem("cartProduct");
	cartItem = JSON.parse(cartItem);

	let cart_items = document.getElementById("cart__items");
	if(cartItem!=null)
	
	{	
		Object.values(cartItem).forEach(function (prod) {

			let cart__item = document.createElement('article');
			cart_items.appendChild(cart__item);
			cart__item.setAttribute("data-id", `${prod._id}`);
			cart__item.setAttribute("data-color", `${prod.colors}`);
			cart__item.classList.add('cart__item')
			let cart__item__img = document.createElement("div");
			cart__item__img.innerHTML += `
			<img src=${prod.imageUrl} alt=${prod.name} >
			`
			cart__item__img.classList.add('cart__item__img')
			cart__item.appendChild(cart__item__img);
			let cart__item__content = document.createElement("div");
			cart__item.appendChild(cart__item__content);
			let incart = parseInt(`${prod.inCart}`);
			cart__item__img.innerHTML += `
					<div class="cart__item__content__description">
						<h2>${prod.name}</h2>
						<p>${prod.colors}</p>
						<p>${prod.price} €</p>
					</div>
					<div class="cart__item__content__settings">
						<div class="cart__item__content__settings__quantity">
						<p>Qté : </p>
						<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=`+ incart + `>
						</div>
						<div class="cart__item__content__settings__delete">
						<p class="deleteItem">Supprimer</p>
						</div>
					</div>
					`

					let total = `${prod.price}` * `${prod.inCart}`;
		})


	}
	else
	{
		console.log("panier vide");
	}
	
}




function totalCost() {
	let cartItem = localStorage.getItem('cartProduct');
	cartItem = JSON.parse(cartItem);
	console.log(cartItem);

	let cost = 0;
	for (let i in cartItem) {
		cost +=
			parseFloat(cartItem[i].price) * parseFloat(cartItem[i].inCart);
	}
	localStorage.setItem('cartCost', cost);
	console.log(cost);
	let totalPrice = document.getElementById('totalPrice');
	totalPrice.innerHTML += `${cost}`;

}

//.................................. Le Formulair.................................//
var path = window.location.pathname;
if(path.includes('cart.html'))
{
	displayCartNumber();
	displayCart();
	totalCost();
	formCheck();
}
else
{
	// récupérer l'id de la commande à partir du lien confirmation.html?orderId=..
	const paramsString = new URLSearchParams(window.location.search);
	const idUrl = paramsString.get("orderId");
	let orderIda = document.getElementById("orderId");
	if (idUrl != null) {
		let v = paramsString.toString().replace('orderId=', '');;
		orderIda.innerHTML += `${v}`;
		localStorage.clear();
	}
	else {
		orderIda.innerHTML += "undefined";
	}

}







// ****************validation prénom**************

const validfirstName = function (inputfirstName) {
	// creation de la reg exp pour validation prénom
	let firstNameRegExp = new RegExp(
		'[A-Za-z ]+$'
	);


	// Recuperation de la balise span
	let errorMsg = document.getElementById("firstNameErrorMsg");

	// on test l'expression reguliere

	if (firstNameRegExp.test(inputfirstName.value)) {
		errorMsg.innerHTML = 'Prenom correct';
		errorMsg.classList.remove('text-danger');
		errorMsg.classList.add('text-success');
		return true;
	} else {
		errorMsg.innerHTML = 'Preom incorrect';
		errorMsg.classList.remove('text-success');
		errorMsg.classList.add('text-danger');
		return false;
	}

};


// ***************** Validation Nom ********************
const validlastName = function (inputlastName) {
	// Creation de la reg exp pour validation nom
	let lastNameRegExp = new RegExp(
		'[A-Za-z ]+$'
	);

	// Recuperation de la balise span
	let errorMsg = document.getElementById("lastNameErrorMsg");

	// on test l'expression reguliere

	if (lastNameRegExp.test(inputlastName.value)) {
		errorMsg.innerHTML = 'Nom correct';
		errorMsg.classList.remove('text-danger');
		errorMsg.classList.add('text-success');
		return true;
	} else {
		errorMsg.innerHTML = 'Nom incorrect';
		errorMsg.classList.remove('text-success');
		errorMsg.classList.add('text-danger');
		return false;
	}

};

// *****************************validation aderesse*****************

const validadress = function (inputadress) {
	// creation de la reg exp pour validation adresse
	let adressRegExp = new RegExp(
		'^[A-Za-z0-9 ]+$'
	);


	// Recuperation de la balise span
	let errorMsg = document.getElementById("addressErrorMsg");

	// on test l'expression reguliere

	if (adressRegExp.test(inputadress.value)) {
		errorMsg.innerHTML = 'Addresse correct';
		errorMsg.classList.remove('text-danger');
		errorMsg.classList.add('text-success');
		return true;
	} else {
		errorMsg.innerHTML = 'Addresse incorrect';
		errorMsg.classList.remove('text-success');
		errorMsg.classList.add('text-danger');
		return false;
	}


};
// ********************validation ville****************    
const validcity = function (inputcity) {
	// creation de la reg exp pour validation ville
	let cityRegExp = new RegExp(
		'[A-Za-z ]+$'
	);

	// Recuperation de la balise span
	let errorMsg = document.getElementById("cityErrorMsg");

	// on test l'expression reguliere

	if (cityRegExp.test(inputcity.value)) {
		errorMsg.innerHTML = 'city correct';
		errorMsg.classList.remove('text-danger');
		errorMsg.classList.add('text-success');
		return true;
	} else {
		errorMsg.innerHTML = 'city incorrect';
		errorMsg.classList.remove('text-success');
		errorMsg.classList.add('text-danger');
		return false;
	}

};

// ********************validation email******************

const validEmail = function (inputEmail) {
	// creation de la reg exp pour validation email
	let emailRegExp = new RegExp
		('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

	//RegExp(
	//		'[A-Za-z ]+$'
	//		'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/'
	//	);


	// Recuperation de la balise span
	let errorMsg = document.getElementById("emailErrorMsg");

	// on test l'expression reguliere

	if (emailRegExp.test(inputEmail.value)) {
		errorMsg.innerHTML = 'email correct';
		errorMsg.classList.remove('text-danger');
		errorMsg.classList.add('text-success');
		return true;
	} else {
		errorMsg.innerHTML = 'email incorrect';
		errorMsg.classList.remove('text-success');
		errorMsg.classList.add('text-danger');
		return false;
	}

};

function formCheck() {
	let form = document.querySelector(".cart__order__form");

	// Ecouter la modification du nom
	form.firstName.addEventListener('change', function () {
		validfirstName(this);
	});
	// Ecouter la modification du prénom
	form.lastName.addEventListener('change', function () {
		validlastName(this);
	});
	// Ecouter la modification de l'adresse
	form.address.addEventListener('change', function () {
		validadress(this);
	});
	// Ecouter la modification de la ville
	form.city.addEventListener('change', function () {
		validcity(this);

	});
	// Ecouter la modification de l'E-mail
	form.email.addEventListener('change', function () {
		validEmail(this);

	});


	const sendHttpRequest = (method, url, data) => {
		return fetch(url, {
			method: method,
			body: JSON.stringify(data),
			headers: data ? { 'content-type': 'application/json' } : {}

		})
			.then(response => {
				if (response.status >= 400) {
					// Reponse Not OK !
					return response.json().then(errResData => {
						const error = new Error('something went wrong');
						error.data = errResData;
						throw error;
					});
				}
				return response.json();
			});
	}

	// Ecouter la soumission du formulaire
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		console.log("formulaire envoi en cours");
		// pour casser l'envoi du formulaire
		if (validfirstName(form.firstName)
			&& validlastName(form.lastName)
			&& validadress(form.address)
			&& validcity(form.city)
			&& validEmail(form.email)) {
			let contact = {
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				address: form.address.value,
				city: form.city.value,
				email: form.email.value
			};
			let productStorage = localStorage.getItem('cartProduct');
			productStorage = JSON.parse(productStorage);


			let i = 0;
			let products = [];
			for (let item in productStorage) {
				products.push(item);
				i++;
			}
			if (products!= null) {

				let cartTotal = localStorage.getItem("cartCost");
				console.log("products:", products);

				// Récupération de la réponse du serveur
				const options = {
					method: 'POST',
					body: JSON.stringify({ contact, products }),
					headers: {
						'content-Type': 'application/json'
					}
				};

				fetch("http://localhost:3000/api/products/order", options)
					.then(response => response.json())
					.then((response) => {
						console.log("contact:", contact);
						console.log("products:", products);

						// // on récupere l'identifiant de l'orderId
						let recupOrderId = response.orderId;
						console.log("orderId", recupOrderId);

						// // on déclare une nouvelle variable en insérant l'orderId et le prix total
						let orderRecap = { recupOrderId, cartTotal };
						console.log(orderRecap)


						// // on stock les données de l'orderId et du prix total dans le localstorage
						localStorage.setItem("result", JSON.stringify(orderRecap))


						// // on creer une fenetre demandant la validation de la commande 
						let val = confirm("souhaitez-vous confirmer votre commande?");
						console.log("confirmation : ", val);
						if (val) {
							window.location.href = `../html/confirmation.html?orderId=${recupOrderId}`;
						}
					})

			}
			else {
				console.log("le panié est vide");
			}
		}
		else {
			console.log("le formulaire n'est pas valide");
		}
	});

}




function printOrderRecap(cartTotal, recupOrderId) {
	console.log("printing order: ")
	document.querySelector("#commande").innerHTML = "Votre commande !";
	let order = ` 
					<p> ORINOCO vous remercie pour votre commande ! </p>
					<p> Total de la commande :    ${cartTotal} € </p>
					<p> Numéro de commande :   ${recupOrderId} </p>
						`
		;


	document.getElementById('commande').innerHTML = order;
	hide(document.getElementById('panier'));
	hide(document.getElementById('cartNumbers'));
	//on supprime les anciennes données dans le localstorage
	localStorage.clear();
	updateCart();
	//	hide(document.getElementById('products-container'));

};

