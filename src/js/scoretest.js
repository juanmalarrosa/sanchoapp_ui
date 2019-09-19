$(document).ready(function () {

    numberAnimationInit($('.score-holder').find('.animateNumber'));



}); // document ready


/* ***** VARIABLES ***** */

/* ***** FUNCIONES ***** */



function numberAnimationInit($selector) {
    $selector.each(function () {
        $(this).html('0');
    });
    $selector.waypoint({
        offset: 'bottom-in-view',
        handler: function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                $(this.element).addClass('animated');
                animateNumber($(this.element));
            }
        }
    });
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











