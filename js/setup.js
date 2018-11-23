'use strict';

var WIZARD_OBJECTS_ARRAY_LENGTH = 4;
var setupBlock = document.querySelector('.setup');
var similarWizardsBlock = document.querySelector('.setup-similar');
var similarWizardsListBlock = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var wizardParams = {
  NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createWizardObject = function () {
  return {
    name: getRandomArrayElement(wizardParams.NAMES) + ' '
    + getRandomArrayElement(wizardParams.SURNAMES),
    coatColor: getRandomArrayElement(wizardParams.COAT_COLORS),
    eyesColor: getRandomArrayElement(wizardParams.EYES_COLORS)
  };
};

var createWizardObjectsArray = function () {
  var array = [];
  for (var i = 0; i < WIZARD_OBJECTS_ARRAY_LENGTH; i++) {
    array[i] = createWizardObject();
  }
  return array;
};

var renderSimilarWizard = function (wizardObject) {
  var similarWizard = wizardTemplate.cloneNode(true);
  similarWizard.querySelector('.setup-similar-label').textContent = wizardObject.name;
  similarWizard.querySelector('.wizard-coat').style.fill = wizardObject.coatColor;
  similarWizard.querySelector('.wizard-eyes').style.fill = wizardObject.eyesColor;
  return similarWizard;
};

var renderSimilarWizardsList = function () {
  var fragment = document.createDocumentFragment();
  var array = createWizardObjectsArray();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderSimilarWizard(array[i]));
  }
  return fragment;
};

setupBlock.classList.remove('hidden');
similarWizardsBlock.classList.remove('hidden');
similarWizardsListBlock.appendChild(renderSimilarWizardsList());
