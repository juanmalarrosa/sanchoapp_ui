$(document).ready(function () {

    animateScore();



}); // document ready


/* ***** VARIABLES ***** */

var scoreTimer = null;
/* ***** FUNCIONES ***** */

function animateScore() {

    numberAnimationInit($('.score-holder').find('.animateNumber'));

    scoreTimer = setTimeout(function () {
        $('.score-image').addClass('active');
    }, 400);
}

function numberAnimationInit($selector) {

    $selector.addClass('animated');
    animateNumber($selector);

} // numberAnimationInit

function animateNumber($el) {
    // Number characteristics
    var numId = $el.attr('id');
    // remove id from cloned items
    //$('.owl-item.cloned').find(numId).attr('id',"");
    var final = $el.attr('data-num');
    var decimals = 0;
    if (final.toString().indexOf('.') !== -1) {
        decimals = final.toString().split('.')[1].length;
    }

    // Plugin options
    var options = {
        useEasing: true,
        useGrouping: true,

    };
    var demo = new CountUp(numId, 0, final, decimals, 2, options);
    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }
} // animateNumber











