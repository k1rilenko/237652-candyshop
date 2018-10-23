'use strict';
(function () {
  var d = window.dataModule.DATA_VALUE;
  function getRandomTitle(array) {
    return array[window.util.getRandomInteger(0, array.length)];
  }
  function getImagePath(array) {
    var path = './img/cards/' + getRandomTitle(array) + '.jpg';
    return path;
  }

  function getContent(array) {
    var content = array.slice(window.util.getRandomInteger(0, array.length));
    content.sort(window.util.getRandomCompare);
    return Array.prototype.join.call(content);
  }

  function getBoolValue() {
    var boolValue = window.util.getRandomInteger(0, 1);
    if (boolValue > 0) {
      return true;
    } else {
      return false;
    }
  }

  function getSingleGood() {
    return {
      name: getRandomTitle(window.dataModule.data.names),
      picture: getImagePath(window.dataModule.data.pictures),
      amount: window.util.getRandomInteger(d.AMOUNT.MIN, d.AMOUNT.MAX),
      price: window.util.getRandomInteger(d.PRICE.MIN, d.PRICE.MAX),
      weight: window.util.getRandomInteger(d.WEIGHT.MIN, d.WEIGHT.MAX),
      rating: {
        value: window.util.getRandomInteger(d.RATING_VALUE.MIN, d.RATING_VALUE.MAX),
        number: window.util.getRandomInteger(d.RATING_VALUE.MIN, d.RATING_VALUE.MAX)
      },
      nutritionFacts: {
        sugar: getBoolValue(),
        energy: window.util.getRandomInteger(d.NUTRITION_ENERGE.MIN, d.NUTRITION_ENERGE.MAX),
        content: getContent(window.dataModule.data.contents)
      }
    };
  }
  var goods = [];
  function getAllGoods() {
    for (var i = 0; i < window.dataModule.DATA_VALUE.COUNT.CATALOG; i++) {
      goods.push(getSingleGood());
    }
    return goods;
  }
  var cartGoods = [];
  function getCartGoods() {
    for (var i = 0; i < window.dataModule.DATA_VALUE.COUNT.CART; i++) {
      cartGoods.push(getSingleGood());
    }
    return cartGoods;
  }

  window.goods = {
    getRandomTitle: getRandomTitle,
    getImagePath: getImagePath,
    getContent: getContent,
    getSingleGood: getSingleGood,
    getAllGoods: getAllGoods,
    goodsArray: goods,
    getCartGoods: getCartGoods
  };
})();

