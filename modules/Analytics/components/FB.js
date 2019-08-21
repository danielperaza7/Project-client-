import _ from "lodash";
// I. Facebook tag requirements
//
// https://www.facebook.com/business/help/402791146561655
//
//
// 1. Search:
// The search event should be placed on any search results page to track when people complete a search. Add a search string parameter to track and optimize for specific search terms.The search event should be placed on any search results page to track when people complete a search. Add a search string parameter or product and content details to track and optimize for specific search terms and products.
//
// dataLayer.push({
//     'event': 'Search',
// 	'facebookInfo': {
// 		'Search': {
// 			'search_string': '',     //according to what the customer types
// 			'content_ids': ['display id 1', 'display id 2', 'display id 3', ...]
// 			// totally 8 display ids
// 		}
// 	}
// });

export function PushDL_FB_Search({ search_string, content_ids }) {
  dataLayer.push({
    event: "Search",
    facebookInfo: {
      Search: {
        search_string, // according to what the customer types
        content_ids, // totally 8 display ids
      },
    },
  });
}

//
// 2. Add Payment Info:
// The add payment info event should be triggered when a person adds payment information to an account or in a checkout flow.
export function PushDL_FB_ADD_Payment() {
  dataLayer.push({
    event: "AddPaymentInfo",
  });
}
//
//
// 3. Lead:
// The lead event should be placed on a form confirmation page or triggered by a submit button when a lead form is completed (ex: when someone signs up for a newsletter). Add parameters for conversion value (amount per content view) and currency to measure the value of lead conversions.
//
// // Here we choose apply coupon. If a customer successfully applies a coupon, the value is the total value with the coupon, no matter the current page is cart page or checkout page
// dataLayer.push({
// 	'event': 'Lead',
// 	'facebookInfo': {
// 		'Lead': {
// 			'value': 10.00
// 		}
// 	}
// });
export function PushDL_FB_Lead(value) {
  dataLayer.push({
    event: "Lead",
    facebookInfo: {
      Lead: {
        value,
      },
    },
  });
}
//
// 4. Complete Registration:
// The complete registration event should be placed on a registration form confirmation page or triggered by a submit button when a registration form is completed (ex: when someone subscribes to a service). Add parameters for conversion value (amount per content view) and currency to measure the value of complete registration conversions.
//
// dataLayer.push({
// 	'event': 'CompleteRegistration'
// });

export function PushDL_FB_Registration() {
  dataLayer.push({
    event: "CompleteRegistration",
  });
}

//
// 5. First name and Last name:
//

export function PushDL_FB_CustomerInfo({
  email, tier, firstName, lastName,
}) {
  dataLayer.push({
    event: "CustomerInfo",
    customerInfo: {
      email,
      tier,
      firstName, // If there is a first name of the visitor, push it into dataLayer
      lastName, // If there is a last name of the visitor, push it into dataLayer
    },
  });
}
//
//
// 6. Any ohter custom event?
// You can leverage website actions important to your business that aren't included in Facebook standard events by sending them as custom events. You must also send define the event as a custom conversion, so we understand how to track and optimize for these events. Modify the code below to add a custom event name that's meaningful to you and parameters for the event.
//
// dataLayer.push({
// 	'event': '<EVENT_NAME>',
// 	'facebookInfo': {
// 		'<EVENT_NAME>': {
// 			'<parameter_key>': '<parameter_value>',
// 			'<parameter_key>': '<parameter_value>'
// 		}
// 	}
// });
//
//
// 7. Add to Wishlist (TODO)
// The add to wishlist event should be triggered when a person adds or saves an item to a wishlist on your website. Add parameters for product details to track and optimize for specific products, and for conversion value (amount per content view) and currency to measure the value of add to wishlist conversions.
//
// dataLayer.push({
// 	'event': 'AddToWishlist',
// 	'facebookInfo': {
//
// 	}
// });
// fbq('track', 'AddToWishlist', {
// content_ids: ['1234', '4642', '35838'],
// content_type: 'product',
// value: 247.35,
// currency: 'USD'
// });
//
//
//
// II. Additional requirements
//
//
// 1. For all product detail views, list views and click, add an attribute of price:
//
// dataLayer.push({
// 	'event': 'productViewed',
// 	'ecommerce': {
// 		'listViewed': {
// 			'actionField': {...},
// 			'products': [
// 				'id': '',
// 				'name': '',
// 				'price': '',    // add an attribute of price here
// 				...
// 			]
// 		}
// 	}
// });
// dataLayer.push({
// 	'event': 'productDetailViewed',
// 	'ecommerce': {
// 		'detailViewed': {
// 			'actionField': {...},
// 			'products': [
// 				'id': '',
// 				'name': '',
// 				'price': '',    // add an attribute of price here
// 				...
// 			]
// 		}
// 	}
// });
