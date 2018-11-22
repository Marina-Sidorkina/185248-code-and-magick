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

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var createWizardObject = function () {
  return {
    name: wizardParams.NAMES[getRandomNumber(0, wizardParams.NAMES.length)] + ' '
    + wizardParams.SURNAMES[getRandomNumber(0, wizardParams.SURNAMES.length)],
    coatColor: wizardParams.COAT_COLORS[getRandomNumber(0, wizardParams.COAT_COLORS.length)],
    eyesColor: wizardParams.EYES_COLORS[getRandomNumber(0, wizardParams.EYES_COLORS.length)]
  };
};

var createWizardObjectsArray = function (arrayLength) {
  var array = [];
  for (var i = 0; i < arrayLength; i++) {
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

var renderSimilarWizardsList = function (wizardObjectsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardObjectsArray.length; i++) {
    fragment.appendChild(renderSimilarWizard(wizardObjectsArray[i]));
  }
  return fragment;
};

setupBlock.classList.remove('hidden');
similarWizardsBlock.classList.remove('hidden');
similarWizardsListBlock
  .appendChild(renderSimilarWizardsList(createWizardObjectsArray(WIZARD_OBJECTS_ARRAY_LENGTH)));
