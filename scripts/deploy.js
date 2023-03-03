const hre = require("hardhat");

async function main() {
  //name of your contract
  const BasicMarketPlace = await hre.ethers.getContractFactory(
    "BasicMarketPlace"
  );

  //deploy your contract
  const basicmarketplace = await BasicMarketPlace.deploy();

  //wait for it to be deployed
  await basicmarketplace.deployed();

  console.log("Contract was deployed to " + basicmarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
