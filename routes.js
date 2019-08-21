/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React from "react";
import { Route, Switch } from "react-router-dom";
import CMS from "./modules/CMS/CMS";
import NotFoundPage from "./modules/App/pages/NotFoundPage";

import RootPage from "./modules/CMS/pages/RootPage/RootPage";
import ETContainer from "./modules/App/pages/ETContainer/ETContainer";
import ETFrontPage from "./modules/CMS/pages/ET-frontpage/ETFrontPage";
import EBEContainer from "./modules/App/pages/EBEContainer/EBEContainer";
import EBEFrontPage from "./modules/CMS/pages/EBE-frontpage/EBEFrontPage";
import CategoryContainer from "./modules/Category/pages/CategoryContainer/CategoryContainer";
import ProductContainer from "./modules/Category/pages/ProductContainer/ProductContainer";
import SearchPage from "./modules/Category/pages/SearchPage/SearchPage";
import ForgotpasswordPage from "./modules/Authentication/pages/ForgotpasswordPage/ForgotpasswordPage";
import ResetpasswordPage from "./modules/Authentication/pages/ResetpasswordPage/ResetpasswordPage";
import AccountPage from "./modules/Customer/pages/AccountPage/AccountPage";
import NBCAM from "./modules/Category/pages/NBCAM/NBCAM";
import StorePage from "./modules/Category/pages/StorePage/StorePage";
import ReturnPage from "./modules/Customer/pages/ReturnPage/ReturnPage";
import ReviewPage from "./modules/Customer/pages/ReviewPage/ReviewPage";
import SpecialGroupPage from "./modules/Customer/pages/SpecialGroupPage/SpecialGroupPage";
import GiftCardInstruction from "./modules/Customer/pages/GiftCardInstruction/GiftCardInstruction";
import SigninPage from "./modules/Authentication/pages/SigninPage/SigninPage";
import SignupPage from "./modules/Authentication/pages/SignupPage/SignupPage";
import CartPage from "./modules/CheckoutV2/pages/CartPage/CartPage";
import CheckoutPage from "./modules/CheckoutV2/pages/CheckoutPage/CheckoutPage";
import CheckoutSuccessPage from "./modules/CheckoutV2/pages/CheckoutSuccessPage/CheckoutSuccessPage";
import CheckoutSigninPage from "./modules/Authentication/pages/CheckoutSigninPage/CheckoutSigninPage";
import CheckoutSignupPage from "./modules/Authentication/pages/CheckoutSignupPage/CheckoutSignupPage";
import CMSPage from "./modules/CMS/pages/CMS/CMSPage";
import MembershipRule from "./modules/Category/pages/MembershipRule/MembershipRule";
import FollowingUsDetails from "./modules/Category/pages/FollowingUsDetails/FollowingUsDetails";
import AdminPanelPage from "./modules/CMS/pages/admin/AdminPanelPage";
import AdminSigninPage from "./modules/CMS/pages/admin/SigninPage";
import AdminLiveEditPage from "./modules/CMS/pages/admin/LiveEditPage";

export default React.memo(({ token }) => (
  <Switch>
    <Route exact path="/" render={props => <RootPage {...props} token={token} />} />
    <Route exact path="/et" render={props => <ETContainer><ETFrontPage {...props} token={token} /></ETContainer>} />
    <Route
      path="/et/category/:splat"
      render={props => <ETContainer><CategoryContainer {...props} token={token} /></ETContainer>}
    />
    <Route
      exact
      path="/ebe"
      render={props => <EBEContainer><EBEFrontPage {...props} token={token} /></EBEContainer>}
    />
    <Route
      path="/ebe/category/:splat"
      render={props => <EBEContainer><CategoryContainer {...props} token={token} /></EBEContainer>}
    />
    <Route
      exact
      path="/product/:productId"
      component={ProductContainer}
    />

    <Route
      exact
      path="/search"
      component={SearchPage}
    />
    <Route
      exact
      path="/account/password/forgot"
      component={ForgotpasswordPage}
    />
    <Route
      exact
      path="/account/password/reset/:token"
      component={ResetpasswordPage}
    />
    <Route
      exact
      path="/account/dashboard/:subId"
      component={AccountPage}
    />
    <Route
      exact
      path="/account/dashboard"
      component={AccountPage}
    />
    <Route
      exact
      path="/evesgoespink"
      component={NBCAM}
    />
    <Route
      exact
      path="/et/evesgoespink"
      component={NBCAM}
    />
    <Route
      path="/arcadiastore"
      component={StorePage}
    />
    <Route
      exact
      path="/et/arcadiastore"
      component={StorePage}
    />
    <Route
      exact
      path="/return/:orderID"
      component={ReturnPage}
    />
    <Route
      exact
      path="/review/order_id=:orderID"
      component={ReviewPage}
    />

    <Route
      exact
      path="/review/:orderID"
      component={ReviewPage}
    />

    <Route
      exact
      path="/membership/:email"
      component={SpecialGroupPage}
    />

    <Route
      exact
      path="/how_to_use_giftCard"
      component={GiftCardInstruction}
    />

    <Route
      exact
      path="/signin"
      component={SigninPage}
    />
    <Route
      exact
      path="/signup"
      component={SignupPage}
    />
    <Route
      exact
      path="/cart"
      component={CartPage}
    />

    <Route
      exact
      path="/checkout"
      component={CheckoutPage}
    />
    <Route
      exact
      path="/checkout/success"
      component={CheckoutSuccessPage}
    />

    <Route
      exact
      path="/checkout/signin"
      component={CheckoutSigninPage}
    />

    <Route
      exact
      path="/checkout/signup"
      component={CheckoutSignupPage}
    />

    <Route
      exact
      path="/page/:cmsid"
      component={CMSPage}
    />
    <Route
      exact
      path="/membershipRule"
      component={MembershipRule}
    />
    <Route
      exact
      path="/followingUsDetails"
      component={FollowingUsDetails}
    />
    <Route
      exact
      path="/cms/admin"
      render={props => <CMS><AdminPanelPage {...props} /></CMS>}
    />
    <Route
      exact
      path="/cms/signin"
      render={props => <CMS><AdminSigninPage {...props} /></CMS>}
    />
    <Route
      exact
      path="/cms/liveedit"
      render={props => <CMS><AdminLiveEditPage {...props} /></CMS>}
    />
    <Route path="/*" component={NotFoundPage} />
  </Switch>
));
