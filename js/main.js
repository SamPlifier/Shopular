(function() {
    'use strict';
    angular
    // local storage dependency added to the module
        .module('shopular', [])
        .factory('localStorageModule', function() {
            var localStorageModule = {};
                // get
                localStorageModule.get = function() {
                  var allItems = localStorage.getItem('shopItems');
                    return (allItems !== null) ? JSON.parse(allItems) : [];
                };
                // save new
                localStorageModule.saveNew = function(item) {
                    var items = localStorageModule.get();
                    items.unshift(item);
                    localStorage.setItem('shopItems', JSON.stringify(items));
                };
                // update
                localStorageModule.update = function(item) {
                    // retrieve list of items
                    var items = localStorageModule.get();
                    // loop through
                    for (i = 0; i < items.length; i++) {
                        // find correct item by id and update collection
                        if (items[i].id == item.id) {
                            items[i] = item;
                            break;
                        }
                    }
                    // updating local storage collection
                    localStorage.setItem('shopItems', JSON.stringify(items));
                };
                localStorageModule.getNextId = function() {
                    var currentId = localStorage.currentId || 99999;
                    currentId += 1;
                    localStorage.currentId = currentId;
                    return currentId;
                };
            return localStorageModule;
        })
        // .service('userService', function($scope){
        //
        // })
        .controller('UserController', function($scope){
          var user = this;
          user.showLogin = true;
          user.userName = "";
          user.loginTime = null;
          user.login = function() {
            var newTime = new Date();
            user.loginTime = newTime.toLocaleDateString() + " " + newTime.toLocaleTimeString();
            user.showLogin = false;
          };
        })
        .controller('ShopController', function($scope, localStorageModule) {
            var shop = this;
            $scope.sortType = '-price'; // set the default sort type
            $scope.sortReverse = false; // set the default sort order
            shop.addItem = function() {
                var addNewItem = {
                    "id": localStorageModule.getNextId(),
                    "name": this.newName,
                    "price": this.newPrice,
                    "quantity": this.newQuantity,
                    "color": this.newColor,
                    "discount": this.newDiscount
                };
                items.unshift(addNewItem);
                localStorageModule.saveNew(addNewItem);
                this.sortType = 'name';
                this.sortType = 'price';
                this.sortType = 'quantity';
                this.sortType = 'total';
                this.sortReverse = false;
            };
            shop.tax = 0.0575;
            shop.title = 'Shopular';
            shop.data = [{
                "id": 2957,
                "name": "widget",
                "price": 32,
                "quantity": 203,
                "color": "red",
                "discount": 31
            }, {
                "id": 89274,
                "name": "golf club",
                "price": 98,
                "quantity": 10,
                "color": "black",
                "discount": 0
            }, {
                "id": 64,
                "name": "iPhone",
                "price": 499,
                "quantity": 2,
                "color": "white",
                "discount": 0
            }, {
                "id": 87363,
                "name": "bonzai tree",
                "price": 76,
                "quantity": 2,
                "color": "green",
                "discount": 0
            }, {
                "id": 1736,
                "name": "towel",
                "price": 55,
                "quantity": 30,
                "color": "brown",
                "discount": 10
            }, {
                "id": 4836,
                "name": "dog bed",
                "price": 99,
                "quantity": 10,
                "color": "beige",
                "discount": 50
            }, {
                "id": 829,
                "name": "waste basket",
                "price": 15,
                "quantity": 40,
                "color": "silver",
                "discount": 0
            }, {
                "id": 46,
                "name": "guitar",
                "price": 899,
                "quantity": 0,
                "color": "blue",
                "discount": 150
            }, {
                "id": 17456,
                "name": "matcha tea",
                "price": 42,
                "quantity": 4,
                "color": "green",
                "discount": 11
            }, {
                "id": 3292,
                "name": "enlightenment",
                "price": 99999,
                "quantity": 1,
                "color": "red",
                "discount": 0
            }, {
                "id": 533,
                "name": "eggs",
                "price": 5,
                "quantity": 12,
                "color": "brown",
                "discount": 1
            }, {
                "id": 683,
                "name": "pillow",
                "price": 27,
                "quantity": 10,
                "color": "black",
                "discount": 12
            }];
            shop.formatItem = function(item) {
                var total = item.quantity * (item.price - item.discount);
                var tax = total * shop.tax;
                total = total - tax;
                var newItem = {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    color: item.color,
                    total: total.toFixed(2),
                    hasDiscount: (item.discount > 0)
                };
                return newItem;
            };
            var items = [];
            if (shop.data && shop.data.length > 0) {
                for (var i = 0; i < shop.data.length; i++) {
                    var newItem = shop.formatItem(shop.data[i]);
                    items.push(newItem);
                }
            }
            var storedItems = localStorageModule.get();
            if (storedItems && storedItems.length > 0) {
                for (var j = 0; j < storedItems.length; j++) {
                    var newStoredItem = shop.formatItem(storedItems[j]);
                    items.push(newStoredItem);
                }
            }
            shop.items = items;
        });

})();
