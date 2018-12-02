'use strict';

var setupBlock = document.querySelector('.setup');
var setupHandler = document.querySelector('.setup-user-pic');

var checkChangeValue = function (change) {
  if (change) {
    var onClickPreventDefault = function (evt) {
      evt.preventDefault();
      setupHandler.removeEventListener('click', onClickPreventDefault);
    };
    setupHandler.addEventListener('click', onClickPreventDefault);
  }
};

var setSetupBlockCoordinates = function (shift) {
  setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
  setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
};

var getSetupHandlerCoordinates = function (evt) {
  return {
    x: evt.clientX,
    y: evt.clientY
  };
};

var getShiftCoordinates = function (startCoordinates, moveEvt) {
  return {
    x: startCoordinates.x - moveEvt.clientX,
    y: startCoordinates.y - moveEvt.clientY
  };
};

setupHandler.style.zIndex = 1;
setupHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoordinates = getSetupHandlerCoordinates(evt);
  var change = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    change = true;
    var shift = getShiftCoordinates(startCoordinates, moveEvt);
    startCoordinates = getSetupHandlerCoordinates(moveEvt);
    setSetupBlockCoordinates(shift);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    checkChangeValue(change);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
