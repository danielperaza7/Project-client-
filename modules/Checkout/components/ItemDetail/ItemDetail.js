import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
// import {TransitionMotion, spring, presets} from 'react-motion';     // already uninstalled, please use css animation in checkout v2

// import actions
import { moveItemToWishList } from "../../CheckoutActions";

// import Components
import ItemDetailObject from "./ItemDetailObject";
// import DefaultMask from '../../../../components/masks/DefaultMask';


class ItemDetail extends Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     todos: []
  //   };
  // }
  //
  // componentWillReceiveProps(nextProps){
  //   this.setState({todos: nextProps.productList.items.map((item) => {
  //     return {
  //       key: item.sku,
  //       data: {item: item}
  //     }})})
  // }
  //
  // // actual animation-related logic
  // getDefaultStyles = () => {
  //   return this.state.todos.map(todo => ({...todo, style: {opacity: 1, maxHeight: 500}}));
  // };
  //
  // getStyles = () => {
  //   return this.state.todos.map(({key, data}, i) => {
  //     return {
  //       key,
  //       data,
  //       style: {
  //         opacity: spring(1, presets.gentle),
  //         maxHeight: spring(500, presets.gentle)
  //       }
  //     };
  //   });
  // };
  //
  // willLeave() {
  //   return {
  //     opacity: spring(0),
  //     maxHeight: spring(0)
  //   };
  // };
  //
  // render() {
  //   let productList = this.props.productList;
  //   if(productList) {
  //       return (
  //             <TransitionMotion
  //               defaultStyles={this.getDefaultStyles()}
  //               styles={this.getStyles()}
  //               willLeave={this.willLeave}>
  //               {styles =>
  //                 <div>
  //                   {styles.map(({key, style, data: {item}}, index) => {
  //                     return (
  //                           <div key={key} style={{opacity: style.opacity, maxHeight: style.maxHeight}}>
  //                             <ItemDetailObject key={item.sku} {...item} position={index+1}/>
  //                           </div>
  //                     )
  //                   }
  //                   )}
  //                 </div>
  //               }
  //             </TransitionMotion>
  //           )
  //     // return (
  //     //   <div>
  //     //     { /* we should use sku as key, but somehow I found there can be items have same sku, before found out what's the problem, use index instead */ }
  //     //     {productList.items.map((item, index) => <ItemDetailObject key={item.sku} {...item} position={index+1}/>)}
  //     //   </div>
  //     // );
  //   } else {
  //     return null;
  //   }
  // }
  render() {
    return <div />;
  }
}

export default connect()(ItemDetail);
