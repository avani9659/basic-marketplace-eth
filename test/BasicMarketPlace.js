const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BasicMarketPlace", function () {
  it("Should return a new product once deployed", async function () {
    const Contract = await ethers.getContractFactory("BasicMarketPlace");
    const contract = await Contract.deploy();
    await contract.deployed();

    expect(await contract.numProduct()).to.equal(1);
  });

  it("Should create a new product", async function () {
    const Contract = await ethers.getContractFactory("BasicMarketPlace");
    const contract = await Contract.deploy();
    await contract.deployed();

    const addProductTransaction = await contract.addProduct(
      "Test Product",
      100
    );
    await addProductTransaction.wait();

    expect(await contract.numProduct()).to.equal(2);
  });
});
