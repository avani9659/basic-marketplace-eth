App = {
  init: async function () {
    //this will as application to get a signer. In our case, signer is Metamask.
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    document.getElementById("wallet").innerText =
      "Your wallet address is " + userAddress;

    $.getJSON("../sampleData.json", function (data) {
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

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn_add", App.handleAdd);
    $(document).on("click", ".btn_buy", { id: this.id }, App.handleBuy);
  },

  handleAdd: function () {},

  handleBuy: function (event) {
    var productId = parseInt($(event.target).data("id"));
  },
};

$(function () {
  $(window).on("load", function () {
    App.init();
  });
});
