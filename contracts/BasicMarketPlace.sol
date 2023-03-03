// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BasicMarketPlace {
    struct Product {
        uint256 id;
        string itemName;
        address creator;
        address itemOwner;
        uint256 askingPrice;
        bool isSold;
    }

    mapping(uint256 => Product) public products;
    uint256 public numProduct;

    event savingsEvent(uint256 indexed _productId);

    constructor() {
        numProduct = 0;
    }

    function addProduct(string memory itemName, uint256 askingPrice) public {
        Product storage product = products[numProduct]; //creating instance of product (mapping)
        product.creator = msg.sender;
        product.itemOwner = msg.sender;
        product.askingPrice = askingPrice;
        product.itemName = itemName;
        product.isSold = false;

        products[numProduct] = Product(
            numProduct,
            product.itemName,
            product.creator,
            product.itemOwner,
            product.askingPrice,
            product.isSold
        );

        numProduct++;
    }

    function getProduct(
        uint256 productId
    ) public view returns (Product memory) {
        return products[productId];
    }

    function getProducts() public view returns (Product[] memory) {
        Product[] memory prodList = new Product[](numProduct);

        for (uint256 i = 0; i < numProduct; i++) {
            Product storage product = products[i];
            prodList[i] = product;
        }

        return prodList;
    }

    function sellProduct(uint256 productId) public {
        Product storage product = products[productId];
        product.itemOwner = msg.sender; //address of the owner who clicked buy button
        product.isSold = true;
    }
}
