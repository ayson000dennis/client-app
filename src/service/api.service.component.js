var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import Config from '../app/config';
import "rxjs/Rx";
import * as $ from "jquery";
var ApiService = (function () {
    function ApiService(http) {
        var _this = this;
        this.http = http;
        this.username = "gopage";
        this.password = "gopage321";
        this.userAuth = btoa(this.username + ":" + this.password);
        this.Users = {
            user: function (userId) {
                return _this.http.get(Config.baseUrl + "api/users/view/" + userId).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        // deals_list: () => {
        //       return this.http.get(Config.baseUrl + "api/deals/list_all/").map(response => {
        //           return response.json();
        //       }).toPromise();
        // }
        this.Deals = {
            deals_search: function (input) {
                return _this.http.get(Config.ElasticSearch + "deals/_search?q=" + input, {
                    headers: _this.getHeaders()
                }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            deals_list: function () {
                return _this.http.get(Config.ElasticSearch + "deals/_search", {
                    headers: _this.getHeaders()
                }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            deals_count: function () {
                return _this.http.get(Config.ElasticSearch + "deals/_count", {
                    headers: _this.getHeaders()
                }).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Business = {
            business_deal: function (temp) {
                return _this.http.get(Config.baseUrl + "api/deals/template/" + temp).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.BusinessCategory = {
            business_category: function () {
                return _this.http.get(Config.baseUrl + "api/business_category/list/").map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Loyalties = {
            loyalty_list: function (customerId, businessId) {
                return _this.http.get(Config.baseUrl + "api/loyalties/list/" + customerId + "/" + businessId).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            business: function (customerId) {
                return _this.http.get(Config.baseUrl + "api/loyalties/business/" + customerId).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            loyalty_customer_list: function (customerId, businessId) {
                return _this.http.get(Config.baseUrl + "api/loyalties/list/customer/" + customerId + "/" + businessId).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            loyalty_deal: function (customerId, accountType) {
                return _this.http.get(Config.baseUrl + "api/deals/list/" + customerId + "/" + accountType).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.LoyaltyCards = {};
        this.LoyaltyDeals = {
            loyaltyDeal: function (customerId, accountType) {
                return _this.http.get(Config.baseUrl + "api/deals/list/" + customerId + "/" + accountType).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Favorites = {
            add_to_favorite: function (deal_body) {
                return _this.http.post(Config.baseUrl + "api/favorites/add", deal_body).map(function (response) {
                    console.log(response);
                    return response.json();
                }).toPromise();
            },
            favorite_list: function (customer_id) {
                return _this.http.get(Config.baseUrl + "api/favorites/list/" + customer_id).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            remove_to_favorites: function (id) {
                return _this.http.post(Config.baseUrl + "api/favorites/delete/" + id, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        //Deals Business CategoryMenuPage
        this.BusinessCategoryFilter = {
            business_category_filter: function (business_category) {
                return _this.http.get(Config.baseUrl + "api/business/filter?" + $.param(business_category)).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Message = {
            business_list: function (user_id) {
                return _this.http.get(Config.baseUrl + "api/business_owners/list/" + user_id).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            fetch_chats: function (room_id) {
                return _this.http.get(Config.ChatBaseUrl + "api/inbox/members/" + room_id).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
    }
    ApiService.prototype.getHeaders = function () {
        return new Headers({ 'Authorization': 'Basic ' + this.userAuth });
    };
    return ApiService;
}());
ApiService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.component.js.map