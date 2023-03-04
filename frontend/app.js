App = {
  contract: {},
  init: async function () {
    //this will as application to get a signer. In our case, signer is Metamask.
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    document.getElementById("wallet").innerText =
      "Your wallet address is " + userAddress;

    //we get this address in console when we deploy the contract
    const resourceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    $.getJSON(
      "../artifacts/contracts/BasicMarketPlace.sol/BasicMarketPlace.json",
      function (BasicMarketplaceArtifact) {
        const contract = new ethers.Contract(
          resourceAddress,
          BasicMarketplaceArtifact.abi,
          signer
        );

        App.contract = contract;

        contract.getProducts().then((data) => {
          var allItemsDiv = $("#allItems");
          var itemTemplate = $("#itemTemplate");

          for (let i = 0; i < data.length; i++) {
            itemTemplate.find(".itemName").text(data[i].itemName);
            itemTemplate.find(".itemOwner").text(data[i].itemOwner);
            itemTemplate.find(".itemCreator").text(data[i].creator);
            itemTemplate.find(".askingPrice").text(data[i].askingPrice);
            itemTemplate
              .find(".itemStatus")
              .text(data[i].isSold ? "Sold" : "Available");

            itemTemplate.find(".btn_buy").attr("data-id", data[i].id);

            data[i].isSold
              ? itemTemplate.find(".btn_buy").hide()
              : itemTemplate.find(".btn_buy").show();

            allItemsDiv.append(itemTemplate.html());
          }
        });
      }
    );

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn_add", App.handleAdd);
    $(document).on("click", ".btn_buy", { id: this.id }, App.handleBuy);
  },

  handleAdd: function () {
    //get the user input
    var newItemName = $("#new_itemname").val();
    var newAskingPrice = $("#new_askingprice").val();

    //when we call the method in contract, metamask will ask us to confirm the transaction
    //and show the estimated gas fee for this transaction to complete
    App.contract.addProduct(newItemName, newAskingPrice);
  },

  handleBuy: function (event) {
    var productId = parseInt($(event.target).data("id"));

    App.contract.sellProduct(productId);
  },
};

$(function () {
  $(window).on("load", function () {
    App.init();
  });
});
