setTimeout(function () {
    var extWrapper = jQuery("#article, .kb_article");
    jQuery(extWrapper).wrapInner("<div id='extWrapper' style='padding-bottom:30px' />");

    jQuery("img", extWrapper).each(function () {
        if (jQuery(this).length) {
            jQuery(this)
                .attr("href", jQuery(this).attr("src"))
                .unwrap()
                .wrap("<a />")
                .parent()
            // .attr("href", jQuery(this).attr("src"))
        }
    });

    jQuery("a", extWrapper).each(function (index) {
        jQuery(this)
            .nextUntil("a")
            .andSelf()
            .wrapAll("<div class='article-custom-section' />")
    });

    jQuery(".article-custom-section:first").addClass("default").css("display", "block");


    jQuery("h1", extWrapper).each(function () {
        // jQuery(this).addClass("accordion-toggle");
        jQuery(this).first().addClass("accordion-toggle default")
        jQuery(this).not(":first").addClass("accordion-toggle")
        jQuery(this).parent().before(this);
    })


    jQuery(document).ready(function (jQuery) {
        jQuery('#extWrapper').find('.accordion-toggle').click(function () {
            jQuery(this).next().slideToggle('fast');
            jQuery(".article-custom-section").not(jQuery(this).next()).slideUp('fast');
        });
    });
}, 500);
