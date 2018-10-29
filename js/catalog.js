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


  function getSingleCard(good) {
    var card = cardTemplate.cloneNode(true);
    var favoriteButton = card.querySelector('.card__btn-favorite');
    var cardButton = card.querySelector('.card__btn');
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
    favoriteButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      favoriteButton.classList.toggle('card__btn-favorite--selected');
    });
    getAmountValue();
    getRatingValue();
    setSugarValue();

    cardButton.addEventListener('click', function(){
      controlEditGoodsCart(good);
      emptyMessageClose()
      getSingleCartGood(controlEditGoodsCart(good));
      console.dir(controlEditGoodsCart(good));
      return good;
    });

    // На выходе получаем обьект, который используется при отрисовке товара в корзине
    function controlEditGoodsCart(good) {
      var cloneGood = Object.assign({}, good);
      cloneGood.orderedAmount = 1;
      return cloneGood;
    }
    return card;
  }



// Создает все  карточки товаров
  function getAllCards(card) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < card.length; i++) {
      fragment.appendChild(getSingleCard(card[i]));
    }
    catalog.appendChild(fragment);
  }
//Добавляет товар в корзину
  function getSingleCartGood(good) {
    var cartGood = cartTemplate.cloneNode(true);
    var cartOrder = cartGood.querySelector('.card-order__main');
    var cardCount = cartOrder.querySelector('.card-order__count');
    cartGood.querySelector('.card-order__title').textContent = good.name;
    cartGood.querySelector('.card-order__price').textContent = good.price + ' ₽';
    cardCount.value = good.orderedAmount;
    changeAmount(cartOrder, cardCount, good);
    cartGoods.appendChild(cartGood);
  }

// Находит в карточке товаров кнопку + - и добавляет слушатели на кнопки
  function changeAmount(element, cardCounter, good) {
    var decreaseAmount = element.querySelector('.card-order__btn--decrease');
    var increaseAmount = element.querySelector('.card-order__btn--increase');
    increaseAmount.addEventListener('click', function (){
      if (good.amount >= 1) {
      cardCounter.value ++; //увеличиваем значение в инпуте цены
      good.orderedAmount ++; //увеличиваем значение - количество товара в корзине на единицу
      good.amount --; // уменьшаем зачение количества на единицу из общего количества
      console.log(good);
      } else {
        console.log('товар закончился');
      }
    });
     decreaseAmount.addEventListener('click', function (){
       if (cardCounter.value > 1) {
        cardCounter.value --;
        good.orderedAmount --; //увеличиваем значение - количество товара в корзине на единицу
        good.amount ++; // уменьшаем зачение количества на единицу из общего количества
        console.log(good);
       } else {
         cardCounter.value
       }
    });
  }
//Функция закрывает окно в каталоге
  function loadMessageClose() {
    catalog.classList.remove('catalog__cards--load');
    catalogLoadMessage.classList.add('visually-hidden');
  }
//Закрывает окно с сообщением в блоке с корзиной
  function emptyMessageClose() {
    cartGoods.classList.remove('goods__cards--empty');
    cartGoodsEmpty.classList.add('visually-hidden');
  }

  window.catalog = {
    loadMessageClose: loadMessageClose,
    getSingleCard: getSingleCard,
    getAllCards: getAllCards,
    getSingleCartGood: getSingleCartGood,
    emptyMessageClose: emptyMessageClose
  };
})();
