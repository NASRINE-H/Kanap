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
let productNumbers = localStorage.getItem('cartNumbers');
if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
}


//aficher les produits selectionnés sur la page cart et fair le prix totale

function displayCart() {
    let cartItem = localStorage.getItem("cartProduct");
    cartItem = JSON.parse(cartItem);

	let cartCost = localStorage.getItem("cartCost");
	

let productContainer = document.querySelector(".products-container");

console.log(cartItem);
if (cartItem && productContainer){
    productContainer.innerHTML = '';
		Object.values(cartItem).map(item => {
			productContainer.innerHTML += `
            <div class= "product" >
					<ion-icon class="icon" name="close-circle"></ion-icon>
					<img src="${item.imageUrl}">
					<span class="name">${item.name}</span>
				
				 <div class="price">
					${item.price}€
				 </div>
				
				 <div class="quantity">
					<ion-icon class="decrease"name="arrow-dropleft-circle"></ion-icon>
					<span>${item.inCart}</span>
					<ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
				 </div>

				 <div class="pricetotal">${item.inCart * item.price}€
				 </div>
	
				</div>
            
            
            
            
            `;
        });  
		
		productContainer.innerHTML += `
			<div class="basketTotalContainer">
			<h4 class="basketTotalTitle">
			prix totale
			</h4>
			<h4 class="basketTotal">
			${cartCost}€
			</h4>
			`
}
}
displayCart();



//.................................. Le Formulair.................................//



let form = document.querySelector('#myForm');
updateCart();

// Ecouter la modification du nom
form.lastName.addEventListener('change', function () {
	validlastName(this);
});
// Ecouter la modification du prénom
form.firstName.addEventListener('change', function () {
	validfirstName(this);
});
// Ecouter la modification de l'adresse
form.adress.addEventListener('change', function () {
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
	if (validlastName(form.lastName)
		&& validfirstName(form.firstName)
		&& validadress(form.adress)
		&& validcity(form.city)
		&& validEmail(form.email)) {
		let contact = {
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			address: form.adress.value,
			city: form.city.value,
			email: form.email.value
		};
		
		let product = localStorage.getItem('cartProduct');
		product = JSON.parse(product);

		let i = 0;
		let products = [];
		for (item in product) {
			products.push(item);
			i++;
		}

		console.log("contact:", contact);
		console.log("products:", products);
		let cartTotal = localStorage.getItem("cartCost");

		// Récupération de la réponse du serveur
		const options = {
			method: "POST",
			body: JSON.stringify({ contact, products }),
			headers: {
				'content-Type': 'application/json'
			}
		};
		fetch('http://localhost:3000/api/products', options)
			.then(response => response.json())
			.then((response) => {

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

					printOrderRecap(cartTotal, recupOrderId);
	//				window.location.href = "../front/commande.html";
					/*				document.querySelector("#commande").innerHTML = "Votre commande !";
					
								 let cmd = document.getElementById('commande');
								 let order = document.createElement('div');
								 cmd.appendChild(order);
								 let p = document.createElement('p')
								 p.innerHTML = 'ORINOCO vous remercie pour votre commande !'
								 order.appendChild(p) 
								 let totalOrder = document.createElement('p')
								 totalOrder.innerHTML = 'Total de la commande : ' + cartTotal + ' €'
								 order.appendChild(totalOrder)
								 let orderId = document.createElement('p')
								 orderId.innerHTML = 'Numéro de commande : ' + recupOrderId
								 order.appendChild(orderId)
					
					*/
					
				}
			})
			//	form.submit();
		//			console.log("contact est:",contact);
		//			console.log("options est:",options);

	}
	else {
		console.log("le formulaire n'est pas valide");
	}
});
// ***************** Validation Nom ********************
const validlastName = function (inputlastName) {
	// Creation de la reg exp pour validation nom
	let lastNameRegExp = new RegExp(
		'[A-Za-z ]+$'
	);

	// Recuperation de la balise span
	let span = inputlastName.nextElementSibling;

	// on test l'expression reguliere

	if (lastNameRegExp.test(inputlastName.value)) {
		span.innerHTML = 'Nom correct';
		span.classList.remove('text-danger');
		span.classList.add('text-success');
		return true;
	} else {
		span.innerHTML = 'Nom incorrect';
		span.classList.remove('text-success');
		span.classList.add('text-danger');
		return false;
	}
};

// ****************validation prénom**************

const validfirstName = function (inputfirstName) {
	// creation de la reg exp pour validation prénom
	let firstNameRegExp = new RegExp(
		'[A-Za-z ]+$'
	);


	// Recuperation de la balise span
	let span = inputfirstName.nextElementSibling;

	// on test l'expression reguliere

	if (firstNameRegExp.test(inputfirstName.value)) {
		span.innerHTML = 'Prenom correct';
		span.classList.remove('text-danger');
		span.classList.add('text-success');
		return true;
	} else {
		span.innerHTML = 'Prenom incorrect';
		span.classList.remove('text-success');
		span.classList.add('text-danger');
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
	let span = inputadress.nextElementSibling;

	// on test l'expression reguliere

	if (adressRegExp.test(inputadress.value)) {
		span.innerHTML = 'adresse correct';
		span.classList.remove('text-danger');
		span.classList.add('text-success');
		return true;
	} else {
		span.innerHTML = 'adresse incorrect';
		span.classList.remove('text-success');
		span.classList.add('text-danger');
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
	let span = inputcity.nextElementSibling;

	// on test l'expression reguliere

	if (cityRegExp.test(inputcity.value)) {
		span.innerHTML = 'ville correct';
		span.classList.remove('text-danger');
		span.classList.add('text-success');
		return true;
	} else {
		span.innerHTML = 'ville incorrect';
		span.classList.remove('text-success');
		span.classList.add('text-danger');
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
	let span = inputEmail.nextElementSibling;

	// on test l'expression reguliere

	if (emailRegExp.test(inputEmail.value)) {
		span.innerHTML = 'Email correct';
		span.classList.remove('text-danger');
		span.classList.add('text-success');
		return true;
	} else {
		span.innerHTML = 'Email incorrect';
		span.classList.remove('text-success');
		span.classList.add('text-danger');
		return false;
	}



};


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

function updateCart(){
let productNumbers = localStorage.getItem('cartNumbers');

if (productNumbers) {
	document.querySelector('.cart span').textContent = productNumbers;
}
}
function hide (elements) {
	elements = elements.length ? elements : [elements];
	for (var index = 0; index < elements.length; index++) {
	  elements[index].style.display = 'none';
	}
}
