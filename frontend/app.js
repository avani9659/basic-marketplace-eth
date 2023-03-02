App = {
  init: async function () {
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

  handleAdd: function () {
    console.log("add button click");
  },

  handleBuy: function (event) {
    var productId = parseInt($(event.target).data("id"));
    console.log(productId);
  },
};

$(function () {
  $(window).on("load", function () {
    App.init();
  });
});
