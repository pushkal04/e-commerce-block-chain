import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3
    await this.loadBlockChainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      console.log('ethereum')
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      console.log('web3')
    } else {
      window.alert('non - ethereum browser detected')
    }
  }


  async loadBlockChainData() {
    window.ethereum.request({ method: 'eth_requestAccounts' });
    const Web3 = require('web3');
    // web3 lib instance
    const web3 = new Web3(window.ethereum);
    // get all accounts
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] })
    //console.log(Marketplace.abi, Marketplace.networks[5777].address)
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({productCount})
      console.log("Product count : " + productCount.toString()) //Logging product count

      for (var i = 1; i <= productCount; i ++){
        const product = await marketplace.methods.products(i).call()
        this.setState({ products: [...this.state.products , product]})
      }
      console.log(this.state.products)


      this.setState({ loading: false })
    } else {
      window.alert('Marketplace contract not deployed in this network/')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    this.loadWeb3 = this.loadWeb3.bind(this)
  }

  createProduct(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => { this.setState({ loading: false }) 
  })
}
purchaseProduct(id, price) {
  this.setState({ loading: true })
  this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price})
  .once('receipt', (receipt) => { this.setState({ loading: false }) 
})
}

  render() {
    return (
      <div>
        <Navbar account={this.state.account} load = {this.loadWeb3} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? <h2>Loading...</h2> : <Main 
              createProduct = {this.createProduct} 
              purchaseProduct = {this.purchaseProduct} 
              products = {this.state.products}/>}
            </main>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
