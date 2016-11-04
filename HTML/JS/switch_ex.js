/**
 * Created by vanessamnoble on 11/4/16.
 */
'use strict';
var luckyNumber = Math.floor(Math.random()* 6)
console.log(luckyNumber);

var total = 60;
var discountPercent = 0;
var discount;

switch(luckyNumber) {
    case 1:
        discountPercent = 0.1
        break;
    case 2:
        discountPercent = 0.25;
        break;
    case 4:
        discountPercent = 0.5;
        break;
    case 5:
        discountPercent = 1;
        break;
    default:
        discountPercent = 0;
}

discount = total - (total * discountPercent);
console.log('You Will pay' + (total - discount));