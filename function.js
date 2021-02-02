/* global $ */
/*eslint-env browser*/

// Initialisierung der DOM Objekte (von oben nach unten)
var $content = $('#content');
var $counter = $content.find('.counter');
var $abacusframe = $content.find('.abacus-frame');

//ABAKUS-FENSTER (DARSTELLUNG VON OBEN NACH UNTEN)

//Zähler auf 0 setzen
var counter = 0;
//Variable mit der Klasse "counter" den Zähler mit 0 übergeben
$counter.text(counter);

var $reset = $('.btn');

// 5 Linien bilden, dem Abakus-Fenster zuweisen
for (var i = 0; i < 5; i++) {
  $abacusframe.append("<div class='lines' id='" + i + "'></div>");
}

//Finde die Klasse "lines" in Abakus-Fenster
var $lines = $abacusframe.find('.lines');
//Bilde 10 Kugeln auf den Linien ab
for (var j = 0; j < 10; j++) {
  $lines.append("<div class='balls left' id='" + j + "'></div>");
}

//BERECHNUNG

//Jeweils die Kinder von Klasse "lines" holen (in css kann man die Farbe zuweisen)
var tenthousands = $content.find('.lines:nth-child(1) .balls');
var thounsands = $content.find('.lines:nth-child(2) .balls');
var hundreds = $content.find('.lines:nth-child(3) .balls');
var tens = $content.find('.lines:nth-child(4) .balls');
var ones = $content.find('.lines:nth-child(5) .balls');

//Events anhängen
//Verschiebe die Kugeln, adde Klassen mit Transitionen jeweils nach rechts bzw. links
//Warte bis die Transition zu Ende ist, danach erst wieder "Klicken" erlauben

//Variable zur Überprüfung, ob die Animation zu Ende ist, es darf erst dann
//gezählt

$('.balls').on('click', function (e) {
  if ($(e.target).hasClass('left')) {
    movetoRight($(e.target));
  } else {
    movetoLeft($(e.target));
  }
});

function movetoRight(ball) {
  var length = ball.nextUntil('.right').addBack().length;

  ball.nextAll().addBack().removeClass('left').addClass('right');

  countPlus(ball, length);


}

function movetoLeft(ball) {
  var length = ball.prevUntil('.left').addBack().length;

  ball.prevAll().addBack().removeClass('right').addClass('left');

  countMinus(ball, length);
}

//Darstellung von Zahlen (Plus-Variante)
function countPlus(clicked, length) {
  if (clicked.is(tenthousands)) {
    counter += length * 10000;
    $counter.text(counter);
  } else if (clicked.is(thounsands)) {
    counter += length * 1000;
    $counter.text(counter);
  } else if (clicked.is(hundreds)) {
    counter += length * 100;
    $counter.text(counter);
  } else if (clicked.is(tens)) {
    counter += length * 10;
    $counter.text(counter);
  } else if (clicked.is(ones)) {
    counter += length * 1;
    $counter.text(counter);
  } else {
    counter = 0;
  }
}

//Darstellung von Zahlen (Minus-Variante)
function countMinus(clicked, length) {
  if (clicked.is(tenthousands)) {
    counter -= length * 10000;
    $counter.text(counter);
  } else if (clicked.is(thounsands)) {
    counter -= length * 1000;
    $counter.text(counter);
  } else if (clicked.is(hundreds)) {
    counter -= length * 100;
    $counter.text(counter);
  } else if (clicked.is(tens)) {
    counter -= length * 10;
    $counter.text(counter);
  } else if (clicked.is(ones)) {
    counter -= length * 1;
    $counter.text(counter);
  } else {
    counter = 0;
  }
}

$reset.on('click', function() {
	$('.balls').addClass('left');
	counter = 0;
	$counter.text(counter); 
});