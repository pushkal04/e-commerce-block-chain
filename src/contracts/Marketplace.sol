// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        uint price; 
        address payable owner;
        bool purchased;
    }

    event ProductCreated (
        uint id,
        string name,
        uint price, 
        address payable owner,
        bool purchased

    );

    event ProductPurchased (
        uint id,
        string name,
        uint price, 
        address payable owner,
        bool purchased

    );

    constructor() public {
        name = "Block chain Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        //Make sure parameters are correct
        require(bytes(_name).length > 0);
        require(_price > 0);
        //Increment product count
        productCount++;
        //Create the product 
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        //Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        //Fetch the product
        Product memory _product = products[_id];
        //Fetch the owner
        address payable _seller = _product.owner;
        //Make sure the product is valid 
        require(_product.id > 0 && _product.id <= productCount);
        require(msg.value >= _product.price);
        require(!_product.purchased);
        require(_seller != msg.sender);
        //Transfer ownership
        _product.owner = msg.sender;
        //mark as purchased
        _product.purchased = true;
        //update the product  
        products[_id] = _product;
        //Pay the seller
        address(_seller).transfer(msg.value);
        //Trigger an event  
         emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }
}

