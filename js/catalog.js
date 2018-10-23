'use strict';
(function () {
  var RATING_CAPACITY = {
    1: 'stars__rating--one',
    2: 'stars__rating--two',
    3: 'stars__rating--three',
    4: 'stars__rating--four',
    5: 'stars__rating--four'
  };
  var catalog = document.querySelector('.catalog__cards');
  var catalogLoadMessage = catalog.querySelector('.catalog__load');
  var cartGoods = document.querySelector('.goods__cards');

  var cartGoodsEmpty = document.querySelector('.goods__card-empty');
  var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
  var cartTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

  function loadMessageClose() {
    catalog.classList.remove('catalog__cards--load');
    catalogLoadMessage.classList.add('visually-hidden');
  }


  function getSingleCard(good) {
    var card = cardTemplate.cloneNode(true);
    card.classList.remove('card--in-stock');
    editContent('.card__title', good.name);
    editContent('.star__count', good.rating.number);
    editContent('.card__composition-list', good.nutritionFacts.content);
    card.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency"> ₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';
    function getAmountValue() {
      if (good.amount === 0) {
        card.classList.add('card--soon');
      } else if (good.amount >= 1 && good.amount < 5) {
        card.classList.add('card--little');
      } else {
        card.classList.add('card--in-stock');
      }
    }
    function getRatingValue() {
      var ratingBlock = card.querySelector('.stars__rating');
      ratingBlock.classList.remove('stars__rating--five');
      switch (good.rating.value) {
        case 1: ratingBlock.classList.add(RATING_CAPACITY[1]); break;
        case 2: ratingBlock.classList.add(RATING_CAPACITY[2]);
          break;
        case 3: ratingBlock.classList.add(RATING_CAPACITY[3]);
          break;
        case 4: ratingBlock.classList.add(RATING_CAPACITY[4]);
          break;
        default : ratingBlock.classList.add(RATING_CAPACITY[5]);
      }
    }
    function setSugarValue() {
      var nutritionBlock = card.querySelector('.card__characteristic');
      if (good.nutritionFacts.sugar) {
        nutritionBlock.textContent = 'Содержит сахар. ' + good.nutritionFacts.energy + ' ккал';
      } else {
        nutritionBlock.textContent = 'Без сахара. ' + good.nutritionFacts.energy + ' ккал';
      }
    }
    function editContent(searchClass, editData) {
      card.querySelector(searchClass).textContent = editData;
    }
    getAmountValue();
    getRatingValue();
    setSugarValue();
    return card;
  }

  function emptyMessageClose() {
    cartGoods.classList.remove('goods__cards--empty');
    cartGoodsEmpty.classList.add('visually-hidden');
  }
  function getAllCards(card) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.dataModule.DATA_VALUE.COUNT; i++) {
      fragment.appendChild(getSingleCard(card[i]));
    }
    catalog.appendChild(fragment);
  }

  function getSingleCartGood(good) {
    var cartGood = cartTemplate.cloneNode(true);
    cartGood.querySelector('.card-order__title').textContent = good.name;
    cartGood.querySelector('.card-order__price').textContent = good.price + ' ₽';
    return cartGood;
  }

  function getAllCartGoods(card) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < card.length; i++) {
      fragment.appendChild(getSingleCartGood(card[i]));
    }
    cartGoods.appendChild(fragment);
  }

  window.catalog = {
    loadMessageClose: loadMessageClose,
    getSingleCard: getSingleCard,
    getAllCards: getAllCards,
    getSingleCartGood: getSingleCartGood,
    emptyMessageClose: emptyMessageClose,
    getAllCartGoods: getAllCartGoods
  };
})();
