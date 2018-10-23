'use strict';
(function () {
  function getRandomInteger(min, max) {
    var random = min - 0.5 + Math.random() * (max - min + 1);
    random = Math.round(random);
    return random;
  }
  function getRandomCompare(a, b) {
    return Math.random() - 0.5;
  }

  window.util = {
    getRandomInteger: getRandomInteger,
    getRandomCompare: getRandomCompare
  };
})();
