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


// cart.js est utilisé dans deux pages cart.html et confirmation.html
// En fonction de la page choisi on lance les fonctions necessaires pour chaque page 
let path = window.location.pathname;
if (path.includes('cart.html')) {
	// les fonctions actives seulement dans cart.html 
	displayCartNumber();
	displayCart();
	validForm();
	changeProductNumber();
	deleteProduct();
	refreshCart();
}
else {
	// fonction active dans confirmation.html
	// récupérer l'id de la commande à partir du lien confirmation.html?orderId=..
	const paramsString = new URLSearchParams(window.location.search);
	const idUrl = paramsString.get("orderId");
	let orderIdElement = document.getElementById("orderId");
	if (idUrl != null) {
		let orderIdValue = paramsString.toString().replace('orderId=', '');;
		orderIdElement.innerHTML += `${orderIdValue}`;
		localStorage.clear();
	}
	else {
		orderIdElement.innerHTML += "undefined";
	}
}






//.................................. Le Formulair.................................//
//les fonctions expressions
// ****************validation prénom**************
const validfirstName = function (inputfirstName) {
	// creation de la reg exp pour validation prénom
	let firstNameRegExp = new RegExp(
		'^[A-Za-z ]{3,20}$'
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
		errorMsg.innerHTML = 'Prenom incorrect';
		errorMsg.classList.remove('text-success');
		errorMsg.classList.add('text-danger');
		return false;
	}

};

// ***************** Validation Nom ********************
const validlastName = function (inputlastName) {
	// Creation de la reg exp pour validation nom
	let lastNameRegExp = new RegExp(
		'^[A-Za-z ]{3,20}$'
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
		'^[A-Za-z ]+$'
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
//regular fonction
// ********************validation formulaire****************    
function validForm() {
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


			let products = [];

			Object.values(productStorage).forEach(function (prod) {
				products.push(prod._id);
			})
			if (products != null) {

				let cartTotal = refreshCart();

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
						// // on récupere l'identifiant de l'orderId
						let recupOrderId = response.orderId;

						// // on creer une fenetre demandant la validation de la commande 
						let confirmButton = confirm("souhaitez-vous confirmer votre commande?");
						if (confirmButton) {
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

//pour afficher le nombre de produits dans le panier
function displayCartNumber() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if (productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

//afficher les produits selectionnés sur la page cart 
function displayCart() {
	let cartItem = localStorage.getItem("cartProduct");
	cartItem = JSON.parse(cartItem);

	let cart_items = document.getElementById("cart__items");
	if (cartItem != null) {
		Object.values(cartItem).forEach(function (prod) {

			let cart__item = document.createElement('article');
			cart_items.appendChild(cart__item);
			cart__item.setAttribute("data-id", `${prod._id}`);
			cart__item.setAttribute("data-color", `${prod.colors}`);
			cart__item.classList.add('cart__item')

			let cart__item__img = document.createElement("div");
			cart__item__img.classList.add("cart__item__img");
			let img = document.createElement('img');
			cart__item.appendChild(cart__item__img);
			cart__item__img.appendChild(img);

			let cart__item__content = document.createElement("div");
			cart__item.appendChild(cart__item__content);
			let incart = parseInt(`${prod.inCart}`);

			let cart__item__content__description = document.createElement("div");
			cart__item__content__description.classList.add("cart__item__content__description");
			cart__item__content.appendChild(cart__item__content__description);
			let h2 = document.createElement("h2");
			cart__item__content__description.appendChild(h2);

			let p = document.createElement("p");
			p.innerHTML = `${prod.colors}`;
			cart__item__content__description.appendChild(p);

			let p1 = document.createElement("p");
			cart__item__content__description.appendChild(p1);


			let cart__item__content__settings = document.createElement("div");
			cart__item__content__settings.classList.add("cart__item__content__settings");
			cart__item__content__description.appendChild(cart__item__content__settings);
			let par = document.createElement("p");
			cart__item__content__settings.appendChild(par);

			let input = document.createElement("input");
			input.type = "number";
			input.classList.add("itemQuantity");
			input.name = "itemQuantity";
			input.min = "1";
			input.max = "100";
			input.value = `${+ incart}`;
			cart__item__content__settings.appendChild(input);


			let cart__item__content__settings__delete = document.createElement("div");
			cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
			cart__item__content__settings.appendChild(cart__item__content__settings__delete);
			let button = document.createElement("button");
			button.classList.add("deleteItem");
			cart__item__content__settings__delete.appendChild(button);

			let pDeleteButton = document.createElement("p");
			button.appendChild(pDeleteButton);
			pDeleteButton.textContent = "supprimer";

			// utiliser fetch pour récupérer les informations:
			// name, price, imageURL
			// et les mettre dans la page cart.html dans le bon element déjà crée
			fetch("http://localhost:3000/api/products/" + `${prod._id}`)
				.then(response => response.json())
				.then(products => {
					h2.textContent = `${products.name}`;
					p1.textContent = `${products.price / 100}`;
					img.src = `${products.imageUrl}`;
					img.alt = `${products.altTxt}`;
				})
		})

	}
	else {
		console.log("panier vide");
	}

}

// supprimer le  produit selectionné  du local storage et du panier 
function deleteProduct() {
	document.querySelectorAll(".deleteItem").forEach(deleteButton => {
		deleteButton.addEventListener('click', () => {
			let id = deleteButton.closest('.cart__item').getAttribute("data-id");
			let color = deleteButton.closest('.cart__item__content__description').getElementsByTagName('p')[0].innerHTML;
			id += color;
			let cartItem = localStorage.getItem("cartProduct");
			cartItem = JSON.parse(cartItem);
			delete cartItem[id];
			localStorage.setItem("cartProduct", JSON.stringify(cartItem));
			refreshCart();
			location.reload();
		})
	});
}

// metttre à jour le nombre de produits dans le local storage
function changeProductNumber() {
	document.getElementsByName("itemQuantity").forEach(itemQuantity => {

		itemQuantity.addEventListener('change', () => {
			let id = itemQuantity.closest('.cart__item').getAttribute("data-id");
			let color = itemQuantity.closest('.cart__item__content__description').getElementsByTagName('p')[0].innerHTML;
			id += color;
			let newincart = itemQuantity.value;
			let cartItem = localStorage.getItem("cartProduct");
			cartItem = JSON.parse(cartItem);
			cartItem[id].inCart = newincart;
			localStorage.setItem("cartProduct", JSON.stringify(cartItem));
			refreshCart();
		})
	})
}

// chaque fois qu'il y'a un changement (rafraichir la page, supprimer item ou ajouter/retirer un item dans le panier)
// rafraichir les informations dans la page cart.html
// recalculer le prix total en fonctions des informations dans le local storage
function refreshCart() {
	let cartItem = localStorage.getItem("cartProduct");
	cartItem = JSON.parse(cartItem);
	let cartNumber = 0;
	let cost = parseFloat(0);
	if (cartItem != null) {
		Object.values(cartItem).forEach(function (prod) {
			cartNumber += parseInt(prod.inCart);
			fetch("http://localhost:3000/api/products/" + `${prod._id}`)
				.then(response => response.json())
				.then(products => {
					let productprice = parseFloat(`${products.price / 100}`);
					let poductincart = parseFloat(prod.inCart);
					let productcost = productprice * poductincart;
					cost = Number(cost) + Number(productcost);
					cost = (Math.round(cost * 100) / 100).toFixed(2);
					document.querySelector('.cart span').textContent = cartNumber;
					let totalPrice = document.getElementById('totalPrice');
					totalPrice.textContent = cost;
					return (cost);
				}
				);

		})
		localStorage.setItem('cartNumbers', cartNumber);
	}
}

