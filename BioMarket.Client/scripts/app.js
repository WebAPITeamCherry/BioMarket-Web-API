(function () {
    require.config({
        paths: {
            jquery: "libs/jquery.min",
            sammy: "libs/sammy-latest.min",
            handlebars: "libs/handlebars",
            kendo: "libs/kendo.web.min",
            Q: "libs/q.min",
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

            this.get("#/updateClient", function () {
                ui.initClientUpdatePage();
                logic.populateClientUpdateProfile();
            });

            this.get("#/updateFarm", function () {
                ui.initFarmUpdatePage();
                logic.populateFarmUpdateProfile();
            });

            this.get("#/addOffer", function () {
                ui.initAddOfferPage();
            });

            this.get("#/addProduct", function () {
                ui.initAddProductPage();
            });

            this.get("#/getOffers", function () {
                ui.initGetOffersPage();
            });

            this.get("#/logout", function () {
                logic.logout();
            });
        });

        app.run("#/");
    });
}());