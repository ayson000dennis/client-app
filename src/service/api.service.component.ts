import { Injectable } from '@angular/core';
import { Headers, URLSearchParams, Http }  from '@angular/http';
import Config from '../app/config';
import "rxjs/Rx";
import * as $ from "jquery";
@Injectable()
export class ApiService {
  constructor(
    private http :Http
    ) { }

  // private userAuth = btoa(Config.elasticUsername + ":" + Config.elasticPassword);

  // getHeaders() {
  //   return new Headers({'Authorization': 'Basic ' + this.userAuth});
  // }

  categoryQuery(data) {
  let category = {
                  "sort" : [
                      { "business_type.keyword" : "desc"},
                      "_score"
                  ],
                  "query" : {
                      "match_phrase": {
                        "business_category" : data
                      }
                  }
                };

  return category;
}

  Users = {
		user: (userId: string) => {
          return this.http.get(Config.baseUrl + "api/users/view/" + userId).map(response => {
              return response.json();
          }).toPromise();
    }
  }

  Business = {

    catch: (err) => {
      return this.http.post(Config.baseUrl + "api/catch/error", {error: err}).map(response => {
        return response.json();
      }).toPromise();
    },

    // business_deals_search: (input) => {
    //       return this.http.get(Config.ElasticSearch + "business/list/_search?size=1000&q=" + input, {
    //         headers : this.getHeaders()}).map(response => {
    //         return response.json();
    //       }).toPromise();
    // },

    // business_deals_list: () => {
    //       return this.http.get(Config.ElasticSearch + "business/list/_search?size=1000", {
    //         headers : this.getHeaders()}).map(response => {
    //           return response.json();
    //       }).toPromise();
    // },

    // business_deals_category: (input, category) => {
    //   let url;
    //   if (input !== '') {
    //     url = "business/list/_search?size=1000&q=" + input;
    //   } else {
    //     url = "business/list/_search?size=1000";
    //   }
    //   return this.http.post(Config.ElasticSearch + url , JSON.stringify(this.categoryQuery(category)), {
    //     headers : this.getHeaders()
    //   }).map(response => {
    //     return response.json();
    //   }).toPromise();
    // },

    business_deals_search: (input) => {
      return this.http.post(Config.baseUrl + "api/business/search/" + input, {})
      .map(response => {
        return response.json();
      }).toPromise();
    },

    business_deals_list: () => {
      return this.http.post(Config.baseUrl + "api/business/search", {})
      .map(response => {
          return response.json();
      }).toPromise();
    },

    business_deals_category: (input, category) => {
      let url;
      if (input !== '') {
        url = "api/business/search/" + input;
      } else {
        url = "api/business/search";
      }
      return this.http.post(Config.baseUrl + url , JSON.stringify(this.categoryQuery(category)))
      .map(response => {
        return response.json();
      }).toPromise();
    },

    business_deal: (template) => {
      return this.http.get(Config.baseUrl + "api/deals/template/" + template).map(response =>{
          return response.json();
      }).toPromise();
    },

    business: (business_name) => {
      return this.http.get(Config.baseUrl + "api/deals/business/" + business_name).map(response =>{
          return response.json();
      }).toPromise();
    },
    business_view: (id) => {
      return this.http.get(Config.baseUrl + "api/business/view/" + id).map(response =>{
          return response.json();
      }).toPromise();
    },

    business_all: () => {
      return this.http.get(Config.baseUrl + "api/business/list_all").map(response =>{
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
    room_list: (user_id: string) => {
      return this.http.get(Config.baseUrl + "api/business_owners/rooms/" + user_id, {}).map(response => {
        return response.json();
      }).toPromise();
    },
    update_read: (room_id: string, message_by: string) => {
      return this.http.post(Config.ChatBaseUrl + "api/chats/update_read/" + room_id + "/" + message_by, {}).map(response => {
        return response.json();
      }).toPromise();
    },
    fetch_chats: (room_id: string) => {
      return this.http.get(Config.ChatBaseUrl + "api/chats/list/" + room_id ).map(response => {
        return response.json();
      }).toPromise();
    }
  }

}
