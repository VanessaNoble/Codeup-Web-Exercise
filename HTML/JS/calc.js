/**
 * Created by vanessamnoble on 11/16/16.
 */
'use strict';

var btns = document.getElementsByClassName("btn");
var left = document.getElementById("leftDisplay");
var center = document.getElementById("centerDisplay");
var right = document.getElementById("rightDisplay");


// loop i through array + add event listener + display in left display
 for (var i = 0; i < btns.length; i++) {
     btns[i].addEventListener("click", function (e) {
         var buttonClicked = this.innerText;
// cont. until operator is clicked + display it in centerDisplay
// after operator sel. than place value in right


         if (!isNaN(buttonClicked) || buttonClicked == ".") {
             if (center.value) {
                 right.value += buttonClicked;
             } else {
                 left.value += buttonClicked;
             }
         }else if (buttonClicked == "C") {
             left.value = "";
             center.value = "";
             right.value = "";
             document.getElementById("title").removeAttribute("class","gif");
             document.getElementById("title").setAttribute("class","jumbotron");
            //return to original
         }else if (buttonClicked == "=") {
             var x = parseFloat(left.value);
             var y = parseFloat(right.value);
             var result;
             var operator = center.value;
             left.value = "";
             center.value= "";
             right.value = "";
                switch(operator){
                    case "+":
                        result= x + y;
                        break;
                    case "-":
                        result= x - y;
                        break;
                    case "*":
                        result= x * y;
                        break;
                    case "/":
                        result= x / y;
                        break;
                    case "xy":
                        var copyX = x;
                        for (var i = 0; i < y; i++){
                            // console.log(i);
                            console.log(x);
                            x *= copyX;
                        }
                        result= x;
                        break;
                }

             document.getElementById("title").setAttribute("class","gif");


             left.value = result;
        } else {
             center.value = buttonClicked;
         }


     });


 };








