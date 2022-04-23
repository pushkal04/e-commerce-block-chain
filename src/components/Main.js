import React, { Component } from 'react';
import {FiRefreshCcw} from 'react-icons/fi'
//import Web3 from 'web3'
import './App.css';
import * as Utils from 'web3-utils';

class Main extends Component {

    render() {
        return (
            <div id="content">
                <h1>Add Product</h1>
                <form onSubmit = {(event) => { 
                    const name = this.productName.value
                    const price = Utils.toWei(this.productPrice.value.toString(), 'Ether')
                    this.props.createProduct(name, price)
                    }}>
                    <div className="form-group mr-sm-2">
                        <input id="productName" type="text" ref={(input) => {this.productName = input}} placeholder="Product Name" className="form-control" required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input id="productPrice" type="text" ref={(input) => {this.productPrice = input}} placeholder="Product Price" className="form-control" required />
                    </div>
                    <div className="d-flex justify-content-between">
                    <button type = "submit" className = "btn btn-primary ">Add Product</button>
                    <button onClick={() => window.location.reload(false)}  className = "btn btn-outline-primary "><FiRefreshCcw/></button>
                    </div>
                </form>
                <p>&nbsp;</p>
                <h2>Buy Products</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Owner</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                <tbody id="productList">
                    {this.props.products.map((product,key) => {
                        return (
                            <tr key = {key}>
                            <th scope="row">{product.id.toString()}</th>
                            <td>{product.name}</td>
                            <td>{Utils.fromWei(product.price.toString(), 'Ether')} ETH</td>
                            <td>{product.owner}</td>
                            <td>
                                { !product.purchased ?
                                <button name = {product.id} value = {product.price} className="btn btn-success" 
                            onClick = {(event) => {
                                this.props.purchaseProduct(event.target.name, event.target.value);
                            }}>
                                Buy
                                </button>
                            : null }
                                </td>
                        </tr>
                        )
                    })}
                </tbody>
                </table>
            </div>
        );
    }
}

export default Main;
