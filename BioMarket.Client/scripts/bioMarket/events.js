define(['jquery', 'logic', 'httpRequest'], function ($, logic, httpRequest) {
	// lOG IN
	$(document).on("click", "#login-button", function(){
		var username = $('#login-nickname').val(),
			password = $('#login-password').val();

		if (username.length < 6) {
			alert('Username must be at least 6 symbols');
		}
		else if(password.length < 6) {
			alert('Password must be at least 6 symbols!');
		}
		else {
			logic.login(username, password);
		}
	});

	// REGISTER CLIENT
	$(document).on("click", "#client-register-button", function(){
		var email = $('#client-register-email').val(),
			username = $('#client-register-username').val(),
			password = $('#client-register-password').val(),
			repeatPassword = $('#client-repeat-register-password').val(),
			firstName = $('#client-register-firstname').val(),
			lastName = $('#client-register-lastname').val(),
			phone = $('#client-register-phone').val();

		if (email.length === 0) {
			alert('Enter email');
		}
		else if (username.length < 6) {
			alert('Username must be at least 6 symbols!');
		}
		else if(password.length < 6) {
			alert('Password must be at least 6 symbols!');
		}
		else if (password !== repeatPassword) {
			alert("The passwords don't match! Please enter them again!");
		}
		else if(firstName.length === 0)
		{
			alert('Enter first name!');
		}
		else if(lastName.length === 0)
		{
			alert('Enter last name!');
		}
		else if(phone.length === 0)
		{
			alert('Enter phone!');
		}
		else {
			var client = {
				Email : email,
				UserName : username,
				password : password,
				ConfirmPassword : password,
				FirstName : firstName,
				LastName : lastName,
				Phone : phone
			};
			logic.registerClient(client);
		}
	});

	// UPDATE CLIENT
	$(document).on("click", "#client-update-button", function () {

		var email = $('#client-update-email').val(),
			username = $('#client-update-username').val(),
			password = $('#client-update-password').val(),
			repeatPassword = $('#client-repeat-update-password').val(),
			firstName = $('#client-update-firstname').val(),
			lastName = $('#client-update-lastname').val(),
			phone = $('#client-update-phone').val();

		if (email.length === 0) {
			alert('Enter email');
		}
		else if (username.length < 6) {
			alert('Username must be at least 6 symbols!');
		}
		else if (password.length < 6) {
			alert('Password must be at least 6 symbols!');
		}
		else if (password !== repeatPassword) {
			alert("The passwords don't match! Please enter them again!");
		}
		else if (firstName.length === 0) {
			alert('Enter first name!');
		}
		else if (lastName.length === 0) {
			alert('Enter last name!');
		}
		else if (phone.length === 0) {
			alert('Enter phone!');
		}
		else {
			var client = {
				Email: email,
				username: username,
				password: password,
				ConfirmPassword: password,
				FirstName: firstName,
				LastName: lastName,
				Phone: phone
			};
			logic.updateClient(client);
		}
	});

	// REGISTER FARM
	$(document).on("click", "#farm-register-button", function(){
		var email = $('#farm-register-email').val(),
			username = $('#farm-register-username').val(),
			password = $('#farm-register-password').val(),
			repeatPassword = $('#farm-repeat-register-password').val(),
			name = $('#farm-register-name').val(),
			address = $('#farm-register-address').val(),
			phone = $('#farm-register-phone').val(),
			owner = $('#farm-register-owner').val(),
			latitude = $('#farm-register-latitude').val(),
			longitude = $('#farm-register-longitude').val();

		if (email.length === 0) {
			alert('Enter email');
		}
		else if (username.length < 6) {
			alert('Username must be at least 6 symbols!');
		}
		else if(password.length < 6) {
			alert('Password must be at least 6 symbols!');
		}
		else if (password !== repeatPassword) {
			alert("The passwords don't match! Please enter them again!");
		}
		else if(name.length === 0)
		{
			alert('Enter first name!');
		}
		else {
			var farm = {
				Email : email,
				UserName : username,
				password : password,
				ConfirmPassword : password,
				Name : name,
				Address : address,
				Phone : phone,
				Owner : owner,
				Latitude : latitude,
				Longitude : longitude
			};
			logic.registerFarm(farm);
		}
	});

	// UPDATE FARM
	$(document).on("click", "#farm-update-button", function () {
		var email = $('#farm-update-email').val(),
			username = $('#farm-update-username').val(),
			newPassword = $('#farm-new-password').val(),
			repeatPassword = $('#farm-repeat-new-password').val(),
			name = $('#farm-update-name').val(),
			address = $('#farm-update-address').val(),
			phone = $('#farm-update-phone').val(),
			owner = $('#farm-update-owner').val(),
			latitude = $('#farm-update-latitude').val(),
			longitude = $('#farm-update-longitude').val();


		if (email.length === 0) {
			alert('Enter email');
		}
		else if (username.length < 6) {
			alert('Username must be at least 6 symbols!');
		}
		else if (newPassword.length < 6) {
			alert('Password must be at least 6 symbols!');
		}
		else if (newPassword !== repeatPassword) {
			alert("The passwords don't match! Please enter them again!");
		}
		else if (name.length === 0) {
			alert('Enter first name!');
		}
		else {
			var farm = {
				Email: email,
				UserName: username,
				password: newPassword,
				ConfirmPassword: repeatPassword,
				Name: name,
				Address: address,
				Phone: phone,
				Owner: owner,
				Latitude: latitude,
				Longitude: longitude
			};
			logic.updateFarm(farm);
		}
	});

	// CHOOSE PICTURE FOR OFFER
	$(document).on("click", "#add-offer-choose-photo-button", function(){
		$("#files").click();
	});

	$(document).on("change", "#files", function(evt){
		var tgt = evt.target || window.event.srcElement,
		files = tgt.files;

		// FileReader support
		if (FileReader && files && files.length) {
			var fr = new FileReader();
			fr.onload = function () {
				document.getElementById('add-offer-image').src = fr.result;

				var client = new Dropbox.Client({key: '94mhbpnlt8y813b'});

				// Try to finish OAuth authorization.
				client.authenticate({interactive: false}, function (error) {
					if (error) {
						alert('Authentication error: ' + error);
					}
				});

				if (client.isAuthenticated()) {
					// Client is authenticated. Display UI.
				}

				client.authenticate();
			};


			fr.readAsDataURL(files[0]);
		}

	});

	// ADD OFFER
	$(document).on("click", "#add-offer-button", function(){
		var product = $('#add-offer-products').val(),
			quantity = $('#add-offer-quantity').val(),
			photo = "photo",
			postDate = new Date();

		if (product.length === 0) {
			alert('Choose product');
		}
		else if (quantity.length === 0) {
			alert('Choose quantity!');
		}
		else {
			var offer = {
				Product : product,
				Quantity : quantity,
				Photo : photo,
				PostDate : postDate
			};

			logic.addOffer(offer);
		}
	});


	// ADD PRODUCT
	$(document).on("click", "#add-product-button", function () {
		var name= $("#add-product-name").val(),
			price= $("#add-product-price").val();

		if (name.length === 0) {
			alert('Enter product name');
			$('#add-product-name').focus();
		}
		else if (price.length === 0) {
			alert('Enter product price!');
			$('#add-product-price').focus();
		}
		else if (!isFinite(price)) {
			alert('Enter valid product price!');
			$('#add-product-price').focus();
		}
		else {
			var product = {
				Name : name,
				Price : price
			};

			logic.addProduct(product);
		}
		
	});

	// GET OFFERS
	$(document).on("click", "#getoffers-button", function(){
		var searchFarm = $('#search-farm').val(),
			searchProduct = $('#search-product').val(),
			searchDate = $('#search-date').val();
		
		logic.getOffers(searchFarm, searchProduct, searchDate);
	});
});