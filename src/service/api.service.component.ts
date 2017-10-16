import { Injectable } from '@angular/core';
import { Headers, Http }  from '@angular/http';
import Config from '../app/config';
import "rxjs/Rx";
import * as $ from "jquery";
@Injectable()
export class ApiService {
  constructor(
    private http :Http
    ) { }

  private username = "gopage";
  private password = "gopage321";
  private userAuth = btoa(this.username + ":" + this.password);

  getHeaders() {
    return new Headers({'Authorization': 'Basic ' + this.userAuth});
  }

  Users = {
		user: (userId: string) => {
          return this.http.get(Config.baseUrl + "api/users/view/" + userId).map(response => {
              return response.json();
          }).toPromise();
    }
  }

  // deals_list: () => {
  //       return this.http.get(Config.baseUrl + "api/deals/list_all/").map(response => {
  //           return response.json();
  //       }).toPromise();
  // }
  Deals = {
    deals_search: (input) => {
          return this.http.get(Config.ElasticSearch + "deals/_search?q=" + input, {
            headers : this.getHeaders()}).map(response => {
            return response.json();
          }).toPromise();
    },

    deals_list: () => {
          return this.http.get(Config.ElasticSearch + "deals/_search", {
            headers : this.getHeaders()}).map(response => {
              return response.json();
          }).toPromise();
    },
    deals_count: () => {
          return this.http.get(Config.ElasticSearch + "deals/_count", {
            headers : this.getHeaders()}).map(response => {
              return response.json();
          }).toPromise();
    }

  }

  Business = {
    business_deal: (temp) => {
      return this.http.get(Config.baseUrl + "api/deals/template/" + temp).map(response =>{
          return response.json();
      }).toPromise();
    }
  }

  BusinessCategory = {
    business_category: () => {
        return this.http.get(Config.baseUrl + "api/business_category/list/").map(response =>{
            return response.json();
        }).toPromise();
    }

  }

  Loyalties = {
    loyalty_list: (customerId,businessId) => {
      return this.http.get(Config.baseUrl + "api/loyalties/list/" + customerId + "/" + businessId).map(response => {
        return response.json();
      }).toPromise();
    },
     business: (customerId) => {
      return this.http.get(Config.baseUrl + "api/loyalties/business/" + customerId).map(response => {
        return response.json();
      }).toPromise();
    },
    loyalty_customer_list: (customerId,businessId) => {
      return this.http.get(Config.baseUrl + "api/loyalties/list/customer/" + customerId + "/" + businessId).map(response => {
        return response.json();
      }).toPromise();
    },
    loyalty_deal: (customerId, accountType) => {
      return this.http.get(Config.baseUrl + "api/deals/list/" + customerId + "/" + accountType).map(response => {
        return response.json();
      }).toPromise();
    }
  }
   LoyaltyCards = {

  }

  LoyaltyDeals = {
    loyaltyDeal: (customerId, accountType) => {
      return this.http.get(Config.baseUrl + "api/deals/list/" + customerId + "/" + accountType).map(response => {
        return response.json();
      }).toPromise();
    }
  }

  Favorites = {
    add_to_favorite: (deal_body) => {
      return this.http.post(Config.baseUrl + "api/favorites/add", deal_body).map(response => {
        console.log(response);
        return response.json();
      }).toPromise();
    },

    favorite_list: (customer_id) => {
      return this.http.get(Config.baseUrl + "api/favorites/list/" + customer_id).map(response => {
        return response.json();
      }).toPromise();
    },

    remove_to_favorites: (id) => {
      return this.http.post(Config.baseUrl + "api/favorites/delete/" + id,{}).map(response => {
        return response.json();
      }).toPromise();
    }
  }

  //Deals Business CategoryMenuPage
  BusinessCategoryFilter = {
    business_category_filter : (business_category) => {
        return this.http.get(Config.baseUrl + "api/business/filter?" + $.param(business_category)).map(response =>{
            return response.json();
        }).toPromise();
    }
  }

  Message = {
    business_list: (user_id: string) => {
      return this.http.get(Config.baseUrl + "api/business_owners/list/" + user_id ).map(response => {
        return response.json();
      }).toPromise();
    },
    fetch_chats: (room_id: string) => {
      return this.http.get(Config.ChatBaseUrl + "api/inbox/members/" + room_id ).map(response => {
        return response.json();
      }).toPromise();
    }
  }


}
