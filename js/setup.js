'use strict';

var WIZARD_OBJECTS_ARRAY_LENGTH = 4;
var setupBlock = document.querySelector('.setup');
var similarWizardsBlock = document.querySelector('.setup-similar');
var similarWizardsListBlock = document.querySelector('.setup-similar-list');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var userNameField = document.querySelector('.setup-user-name');
var wizardSetupBlock = document.querySelector('.setup-wizard');
var wizardCoatSetupBlock = wizardSetupBlock.querySelector('.wizard-coat');
var wizardCoatSetupInput = setupBlock.querySelector('input[name="coat-color"]');
var wizardEyesSetupBlock = wizardSetupBlock.querySelector('.wizard-eyes');
var wizardEyesSetupInput = setupBlock.querySelector('input[name="eyes-color"]');
var wizardFireballSetupBlock = document.querySelector('.setup-fireball-wrap');
var wizardFireballSetupInput = wizardFireballSetupBlock.querySelector('input[name="fireball-color"]');
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var keyCodes = {
  ENTER: 13,
  ESCAPE: 27
};

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
  ],
  FIREBALL_COLORS: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var setupBlockCoordinates = {
  TOP: '80px',
  LEFT: '50%'
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

var onSetupOpenIconEnter = function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    showSetupBlock();
  }
};

var onSetupCloseButtonEnter = function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    hideSetupBlock();
  }
};

var onEscapeKeyDown = function (evt) {
  if (evt.keyCode === keyCodes.ESCAPE && evt.target !== userNameField) {
    hideSetupBlock();
  }
};

var setWizardElementColor = function (wizardElementBlock, hiddenInput, array) {
  var color = getRandomArrayElement(array);
  wizardElementBlock.setAttribute('fill', color);
  hiddenInput.value = color;
};

var onWizardCoatSetupBlockClick = function () {
  wizardCoatSetupBlock.removeAttribute('style');
  setWizardElementColor(wizardCoatSetupBlock, wizardCoatSetupInput, wizardParams.COAT_COLORS);
};

var onWizardEyesSetupBlockClick = function () {
  setWizardElementColor(wizardEyesSetupBlock, wizardEyesSetupInput, wizardParams.EYES_COLORS);
};

var onWizardFireballSetupBlockClick = function () {
  var color = getRandomArrayElement(wizardParams.FIREBALL_COLORS);
  wizardFireballSetupBlock.style.backgroundColor = color;
  wizardFireballSetupInput.value = color;
};

var onUserNameFieldInvalid = function () {
  if (userNameField.validity.tooShort) {
    userNameField.setCustomValidity('Имя волшебника должно состоять минимум из 2-х символов');
  } else if (userNameField.validity.tooLong) {
    userNameField.setCustomValidity('Имя волшебника не может превышать 25-ти символов');
  } else if (userNameField.validity.valueMissing) {
    userNameField.setCustomValidity('Пожалуйста, придумайте имя для волшебника');
  } else {
    userNameField.setCustomValidity('');
  }
};

var onUserNameFieldInput = function (evt) {
  if (evt.target.value.length >= 2) {
    userNameField.setCustomValidity('');
  }
};

var setInitialCoordinates = function () {
  setupBlock.style.top = setupBlockCoordinates.TOP;
  setupBlock.style.left = setupBlockCoordinates.LEFT;
};

var showSetupBlock = function () {
  setInitialCoordinates();
  setupBlock.classList.remove('hidden');
  similarWizardsBlock.classList.remove('hidden');
  document.addEventListener('keydown', onEscapeKeyDown);
  setupCloseButton.addEventListener('click', hideSetupBlock);
  setupCloseButton.addEventListener('keydown', onSetupCloseButtonEnter);
  wizardCoatSetupBlock.addEventListener('click', onWizardCoatSetupBlockClick);
  wizardEyesSetupBlock.addEventListener('click', onWizardEyesSetupBlockClick);
  wizardFireballSetupBlock.addEventListener('click', onWizardFireballSetupBlockClick);
  userNameField.addEventListener('invalid', onUserNameFieldInvalid);
  userNameField.addEventListener('input', onUserNameFieldInput);
  setupOpenButton.removeEventListener('click', showSetupBlock);
  setupOpenIcon.removeEventListener('keydown', onSetupOpenIconEnter);
};

var hideSetupBlock = function () {
  setupBlock.classList.add('hidden');
  setupOpenButton.addEventListener('click', showSetupBlock);
  setupOpenIcon.addEventListener('keydown', onSetupOpenIconEnter);
  setupCloseButton.removeEventListener('click', hideSetupBlock);
  setupCloseButton.removeEventListener('keydown', onSetupCloseButtonEnter);
  wizardCoatSetupBlock.removeEventListener('click', onWizardCoatSetupBlockClick);
  wizardEyesSetupBlock.removeEventListener('click', onWizardEyesSetupBlockClick);
  wizardFireballSetupBlock.removeEventListener('click', onWizardFireballSetupBlockClick);
  document.removeEventListener('keydown', onEscapeKeyDown);
  userNameField.removeEventListener('invalid', onUserNameFieldInvalid);
  userNameField.removeEventListener('input', onUserNameFieldInput);
};

setupOpenIcon.addEventListener('keydown', onSetupOpenIconEnter);
setupOpenButton.addEventListener('click', showSetupBlock);
similarWizardsListBlock.appendChild(renderSimilarWizardsList());
