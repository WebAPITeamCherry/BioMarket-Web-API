﻿(function () {
	require.config({
		paths: {
			jquery: "libs/jquery.min",
			sammy: "libs/sammy-latest.min",
			handlebars: "libs/handlebars",
			kendo: "libs/kendo.web.min",
			Q: "libs/q.min",
			cryptojs: 'libs/cryptojs',
			sha1: 'libs/sha1',
			underscore: 'libs/underscore',
			dropbox : 'libs/dropins',
			httpRequest : "bioMarket/httpRequest",
			logic: "bioMarket/logic",
			ui: "bioMarket/ui",
			events: "bioMarket/events"
		}
	});

	require(["sammy", "ui", "logic", "events"], function (sammy, ui, logic) {
		var app = sammy("#main-content", function() {
			this.get("#/", function () {
				ui.initHomePage();
			});

			this.get("#/login", function () {
				ui.initLoginPage();
			});

			this.get("#/registerClient", function () {
				ui.initRegisterClientPage();
			});

			this.get("#/registerFarm", function () {
				ui.initRegisterFarmPage();
			});

			this.get("#/myProfile", function () {
				ui.initUpdateClientPage();
			});

            this.get("#/updateFarm", function () {
                ui.initUpdateFarmPage();
            });

            this.get("#/addOffer", function () {
                ui.initAddOfferPage();
            });

			this.get("#/logout", function () {
				logic.logout();
			});

			this.get("#/addProduct", function () {
			    ui.initAddProductPage();
			});
		});

		app.run("#/");
	});
}());