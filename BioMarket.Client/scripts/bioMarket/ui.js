define(['jquery', 'httpRequest', 'handlebars', 'kendo'], function ($, httpRequest) {
	var START_MENU_SIZE = 300,
		url = 'http://localhost:6022/', /*'http://biomarket.apphb.com/',*/
		contentType = 'application/json',
		acceptType = 'application/json';

	var initHomePage = function() {
		var username = localStorage.getItem('crowdShareUserName');
		
		initPage('#menu', $('#menu-container'));

		$('#main-content').load('home.html', function() {
			if (username && username !=='' && username !=='null') {
				$('#logout').text('Welcome: ' + username + ' (Logout)');
			}
		});
	};

	var initLoginPage = function(chatItems) {
		initPage('#menu', $('#menu-container'));

		$('#main-content').load('login.html', function() {
			$('#login-nickname').kendoMaskedTextBox();
			$('#login-password').kendoMaskedTextBox();
			$('#login-button').kendoButton();
			$('#login-nickname').focus();
		});
	};

	var initRegisterClientPage = function() {
		initPage('#menu', $('#menu-container'));

		$('#main-content').load('updateClient.html', function() {
			$('#client-register-email').kendoMaskedTextBox();
			$('#client-register-username').kendoMaskedTextBox();
			$('#client-register-password').kendoMaskedTextBox();
			$('#client-repeat-register-password').kendoMaskedTextBox();
			$('#client-register-firstname').kendoMaskedTextBox();
			$('#client-register-lastname').kendoMaskedTextBox();
			$('#client-register-phone').kendoMaskedTextBox();
			$('#client-register-button').kendoButton();
			$('#client-register-email').focus();
		});

	};

	var initClientUpdatePage = function() {
		initPage('#menu', $('#menu-container'));

		$('#main-content').load('updateClient.html', function () {
			$('#client-update-firstname').kendoMaskedTextBox();
			$('#client-update-lastname').kendoMaskedTextBox();
			$('#client-update-phone').kendoMaskedTextBox();
			$('#client-update-button').kendoButton();
			$('#client-delete-button').kendoButton();
			$('#client-update-firstname').focus();
		});
	};
	
	var initFarmUpdatePage = function() {
		initPage('#menu', $('#menu-container'));

		$('#main-content').load('updateFarm.html', function() {
			$('#farm-update-name').kendoMaskedTextBox();
			$('#farm-update-address').kendoMaskedTextBox();
			$('#farm-update-phone').kendoMaskedTextBox();
			$('#farm-update-owner').kendoMaskedTextBox();
			$('#farm-update-latitude').kendoMaskedTextBox();
			$('#farm-update-longitude').kendoMaskedTextBox();
			$('#farm-update-button').kendoButton();
			$('#farm-delete-button').kendoButton();
			$('#farm-update-email').focus();
		});
	};

	var initRegisterFarmPage = function() {
		initPage('#menu', $('#menu-container'));

		$('#main-content').load('registerFarm.html', function() {
			$('#farm-register-email').kendoMaskedTextBox();
			$('#farm-register-username').kendoMaskedTextBox();
			$('#farm-register-password').kendoMaskedTextBox();
			$('#farm-repeat-register-password').kendoMaskedTextBox();
			$('#farm-register-name').kendoMaskedTextBox();
			$('#farm-register-address').kendoMaskedTextBox();
			$('#farm-register-phone').kendoMaskedTextBox();
			$('#farm-register-owner').kendoMaskedTextBox();
			$('#farm-register-latitude').kendoMaskedTextBox();
			$('#farm-register-longitude').kendoMaskedTextBox();
			$('#farm-register-button').kendoButton();
			$('#farm-register-email').focus();
		});
	};

	var initAddOfferPage = function() {
		initPage('#menu', $('#menu-container'));
		
		$('#main-content').load('addOffer.html', function() {
			$('#add-offer-products').kendoComboBox();
			$('#add-offer-quantity').kendoMaskedTextBox();
			$('#add-offer-choose-photo-button').kendoButton();
			$('#add-offer-button').kendoButton();
			$('#add-offer-product').focus();
			addProductsToOffer();
		});
	};

	var initAddProductPage = function () {
		initPage('#menu', $('#menu-container'));

		$('#main-content').load('addProduct.html', function () {
			$('#add-product-name').kendoMaskedTextBox();
			$('#add-product-price').kendoMaskedTextBox();
			$('#add-product-quantity').kendoMaskedTextBox();
			$('#add-product-choose-photo-button').kendoButton();
			$('#add-product-button').kendoButton();
			$('#add-product-product').focus();
		});
	};

	var showError = function(err) {
		$('#main-content').text(err.responseText);
	};

	var initPage = function (menu, container) {
		container.load('menu.html', function() {
			$(menu).kendoMenu();
		});
		$('#main-content').text(' ');
	};

	var initGetOffersPage = function() {
		initPage('#menu', $('#menu-container'));
		$('#main-content').load('getOffers.html', function () {
			$('#getoffers-button').kendoButton();
			$('#search-product').kendoMaskedTextBox();
			$('#search-farm').kendoMaskedTextBox();
			$('#search-date').kendoMaskedTextBox();
			$('#search-farm').focus();
		});
	};

	var test = function () {
		alert("Test");
	};

	var drawKendoGrid = function (items) {
		$('#grid').kendoGrid({
			dataSource: {
				data : items,
				pageSize: 10
			},
			height: window.innerHeight - START_MENU_SIZE,
			groupable: true,
			sortable: true,
			filterable: true,
			pageable: {
				refresh: true,
				pageSizes: true,
				buttonCount: 5
			},
			columns:	[	{ field: "user.username", title: "Farm" },
							{ field: "postDate", title: "Date"},
							{ field: "title", title: "Product"},
						]
		});
	};

	// Adding products types from JSON array to Kendo multiselect
	var addProductsToOffer = function () {
		var	products = [];

		httpRequest.getJSON(url + 'api/Product/All', contentType, acceptType)
			.then(function (data) {
					products = data;
					handleBarConvert($('#product-template'), $('#add-offer-products'), products);
					$("#add-offer-products").kendoComboBox().data("kendoComboBox");
				}, function (err) {
					alert(err.statusText);
				}
			);


	};

	// Handlebar templates
	function handleBarConvert(template, container, items) {
		Handlebars.registerHelper('multiply', function (first, second) {
			var result = first * second;
			return result;
		});

		var currentTemplate = Handlebars.compile(template.html());

		container.html(currentTemplate({
			products : items
		}));
	}

	return {
		initHomePage: initHomePage,
		initLoginPage: initLoginPage,
		initRegisterClientPage: initRegisterClientPage,
		initClientUpdatePage: initClientUpdatePage,
		initRegisterFarmPage: initRegisterFarmPage,
		initFarmUpdatePage : initFarmUpdatePage,
		initAddProductPage: initAddProductPage,
		initAddOfferPage: initAddOfferPage,
		initGetOffersPage : initGetOffersPage,
		showError: showError,
		drawKendoGrid: drawKendoGrid,
		test : test
	};
});