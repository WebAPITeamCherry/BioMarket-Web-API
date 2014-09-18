define(['httpRequest', "ui", "underscore", "cryptojs", "sha1"], function (httpRequest, ui) {
    var url = /*'http://biomarket.apphb.com/'*/ 'http://localhost:6022/',
		contentType = 'application/json',
		acceptType = 'application/json';

	var login = function(username, password) {
		var authCode = username + password;

		var message = "userName=" + username + "&password=" + password +"&grant_type=password";

		httpRequest.postJSON(url + 'Token',  contentType, acceptType, message)
			.then(function(success) {
				localStorage.setItem("bioMarketUserName", success.userName);
				localStorage.setItem("bioMarketAccessToken", success.access_token);

				window.location.hash = '#/';
			},
			function(err){
				alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var logout = function() {
		localStorage.setItem("bioMarketUserName", '');
		localStorage.setItem("bioMarketAccessToken", '');
		window.location.hash = '#/';
	};

	var registerClient = function(client) {
		var message = {
				"Email" : client.Email,
				"UserName" : client.UserName,
				"password" : client.password,
				"ConfirmPassword" : client.password,
				"FirstName" : client.FirstName,
				"LastName" : client.LastName,
				"Phone" : client.Phone
			};

		httpRequest.postJSON(url + 'api/Account/Update', contentType, acceptType, message)
			.then(function(success) {
				$('#client-register-email').val(' ');
				$('#client-register-username').val(' ');
				$('#client-register-password').val(' ');
				$('#repeat-register-password').val(' ');
				$('#client-register-firstname').val(' ');
				$('#client-register-lastname').val(' ');
				$('#client-register-phone').val(' ');
				alert('You have been registered. Now you may login.');
				window.location.hash = '#/';
			},
			function(err){
				alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var updateClient = function (client) {
		var message = {
			"FirstName": client.FirstName,
			"LastName": client.LastName,
			"Phone": client.Phone
		};

	    httpRequest.putJSON(url + 'api/Account/Update?name=' + localStorage.getItem('bioMarketUserName'), contentType, acceptType, message)
			.then(function (success) {
				$('#client-update-email').val(' ');
				$('#client-update-username').val(' ');
				$('#client-update-password').val(' ');
				$('#repeat-update-password').val(' ');
				$('#client-update-firstname').val(' ');
				$('#client-update-lastname').val(' ');
				$('#client-update-phone').val(' ');
				alert('You profile have been updated! ');
				window.location.hash = '#/';
			},
			function (err) {
				alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var registerFarm = function(client) {
		var message = {
				"Email" : client.Email,
				"UserName" : client.UserName,
				"password" : client.password,
				"ConfirmPassword" : client.password,
				"Name" : client.Name,
				"Address" : client.Address,
				"Phone" : client.Phone,
				"Owner" : client.Owner,
				"Latitude" : client.Latitude,
				"Longitude" : client.Longitude
			};

		httpRequest.postJSON(url + 'api/Account/Register', contentType, acceptType, message)
			.then(function(success) {
				$('#farm-register-email').val(' ');
				$('#farm-register-username').val(' ');
				$('#farm-register-password').val(' ');
				$('#farm-register-password').val(' ');
				$('#farm-register-name').val(' ');
				$('#farm-register-address').val(' ');
				$('#farm-register-phone').val(' ');
				$('#farm-register-owner').val(' ');
				$('#farm-register-latitude').val(' ');
				$('#farm-register-longitude').val(' ');
				alert('You have been registered. Now you may login.');
				window.location.hash = '#/';
			},
			function(err){
				alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var updateFarm = function (client) {
	    var message = {
	        "Email": client.Email,
	        "UserName": client.UserName,
	        "password": client.password,
	        "ConfirmPassword": client.password,
	        "Name": client.Name,
	        "Address": client.Address,
	        "Phone": client.Phone,
	        "Owner": client.Owner,
	        "Latitude": client.Latitude,
	        "Longitude": client.Longitude
	    };

	    httpRequest.putJSON(url + 'api/Farms/Update?name=' + localStorage.getItem('bioMarketUserName'), contentType, acceptType, message)
			.then(function (success) {
			    $('#farm-email').val(' ');
			    $('#farm-username').val(' ');
			    $('#farm-old-password').val(' ');
			    $('#farm-new-password').val(' ');
			    $('#farm-repeat-new-password').val(' ');
			    $('#farm-name').val(' ');
			    $('#farm-address').val(' ');
			    $('#farm-phone').val(' ');
			    $('#farm-owner').val(' ');
			    $('#farm-latitude').val(' ');
			    $('#farm-longitude').val(' ');
			    alert('Your profile has been updated.');
			    window.location.hash = '#/';
			},
			function (err) {
			    alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var addOffer = function(offer) {
		var message = {
				"Product" : offer.Product,
				"Quantity" : offer.Quantity,
				"ProductPhoto" : offer.Photo,
				"PostDate" : offer.PostDate,
			};

		httpRequest.postJSON(url + 'api/Offers/Add', contentType, acceptType, message)
			.then(function(success) {
				$('#farm-register-email').val(' ');
				$('#farm-register-username').val(' ');
				$('#farm-register-password').val(' ');
				$('#farm-register-password').val(' ');
				$('#farm-register-name').val(' ');
				$('#farm-register-address').val(' ');
				$('#farm-register-phone').val(' ');
				$('#farm-register-owner').val(' ');
				$('#farm-register-latitude').val(' ');
				$('#farm-register-longitude').val(' ');
				alert('You have been registered. Now you may login.');
				window.location.hash = '#/';
			},
			function(err){
				alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var populateClientProfile = function () {
		httpRequest.getJSON(url + 'api/Clients/ByAccount/' + localStorage.getItem('bioMarketUserName'), acceptType)
			.then(function (success) {
				$('#client-firstname').text(success.FirstName);
				$('#client-lastname').text(success.LastName);
				$('#client-phone').text(success.Phone);
			},
			function (err) {
				alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var populateClientUpdateProfile = function () {
	    httpRequest.getJSON(url + 'api/Clients/ByAccount/' + localStorage.getItem('bioMarketUserName'), acceptType)
			.then(function (success) {
			    $('#client-firstname').val(success.FirstName);
			    $('#client-lastname').val(success.LastName);
			    $('#client-phone').val(success.Phone);
			},
			function (err) {
			    alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var populateFarmProfile = function () {
		httpRequest.getJSON(url + 'api/Farms/ByName/' + localStorage.getItem('bioMarketUserName'), acceptType)
			.then(function (success) {
				$('#farm-name').text(success.Name);
				$('#farm-address').text(success.Address);
				$('#farm-phone').text(success.Phones);
				$('#farm-owner').text(success.Owner);
				$('#farm-latitude').text(success.Latitude);
				$('#farm-longitude').text(success.Longitude);
			},
			function (err) {
				alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	var populateFarmUpdateProfile = function () {
	    httpRequest.getJSON(url + 'api/Farms/ByName/' + localStorage.getItem('bioMarketUserName'), acceptType)
			.then(function (success) {
			    $('#farm-update-email').val(success.Email);
			    $('#farm-update-username').val(success.UserName);
			    $('#farm-update-name').val(success.Name);
			    $('#farm-update-address').val(success.Address);
			    $('#farm-update-phone').val(success.Phones);
			    $('#farm-update-owner').val(success.Owner);
			    $('#farm-update-latitude').val(success.Latitude);
			    $('#farm-update-longitude').val(success.Longitude);
			},
			function (err) {
			    alert(JSON.parse(err.responseText).ModelState[""]);
			});
	};

	return {
		login : login,
		logout: logout,
		registerClient: registerClient,
		updateClient:updateClient,
		populateClientProfile: populateClientProfile,
		populateClientUpdateProfile: populateClientUpdateProfile,
		populateFarmProfile: populateFarmProfile,
		populateFarmUpdateProfile: populateFarmUpdateProfile,
		registerFarm: registerFarm,
		updateFarm: updateFarm,
		addOffer: addOffer
	};
});