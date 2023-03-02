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

        data[i].isSold
          ? itemTemplate.find(".btn_buy").hide()
          : itemTemplate.find(".btn_buy").show();

        allItemsDiv.append(itemTemplate.html());
      }
    });
  },
};

$(function () {
  $(window).on("load", function () {
    App.init();
  });
});
