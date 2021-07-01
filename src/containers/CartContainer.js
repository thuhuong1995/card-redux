import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Cart from "../components/Cart";
import * as Message from "../const/Message"
import CartItem from "../components/CartItem";
import CartResult from "../components/CartResult";
import { actDeleteProductInCart, actChangeMessage, actUpdateProductInCart } from "../actions/index";


class CartContainer extends Component {
    render() {
        const { cart } = this.props;
        return (
            <Cart>
                {this.ShowCartItem(cart)}
                {this.showTotal(cart)}
            </Cart>
        )
    }
    ShowCartItem = (cart) => {
        let result = <tr><td>
            {Message.MSG_CART_EMPTY}
        </td></tr>
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return (
                    <CartItem
                        key={index}
                        item={item}
                        index={index}
                        onDeleteProductInCart={this.props.onDeleteProductInCart}
                        onChangeMessage={this.props.onChangeMessage}
                        onUpdateProductInCart={this.props.onUpdateProductInCart}
                    />
                )
            })
        }
        return result;
    }
    showTotal = (cart) => {
        let result = null;
        if (cart.length > 0) {
            result = <CartResult cart={cart} />
        }
        return result;
    }
}
CartContainer.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                inventory: PropTypes.number.isRequired,
                rating: PropTypes.number.isRequired
            }).isRequired,
            quantity: PropTypes.number.isRequired
        })).isRequired,
}
const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteProductInCart: (product) => {
            dispatch(actDeleteProductInCart(product));
        },
        onChangeMessage: (message) => {
            dispatch(actChangeMessage(message));
        },
        onUpdateProductInCart: (product, quantity) => {
            dispatch(actUpdateProductInCart(product, quantity))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)