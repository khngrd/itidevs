    jq2 = jQuery.noConflict();

    var extWrapper = jq2("#article, .kb_article");
    jq2(extWrapper).wrapInner("<div id='extWrapper' style='padding-bottom:30px' />");

    jq2(extWrapper).html(function (i, html) {
        return html.replace(/&nbsp;/g, '');
    });

    jq2("p:empty").remove()

    jq2("img", extWrapper).each(function () {
        if (jq2(this).length) {
            jq2(this)
                .attr("href", jq2(this).attr("src"))
                .wrap("<a />")
                .parent()
                .unwrap()
                // .attr("href", jq2(this).attr("src"))
        }
    });

    jq2("a", extWrapper).each(function (index) {
        jq2(this)
            .nextUntil("a")
            .andSelf()
            .wrapAll("<div class='article-custom-section' />")
    });

    jq2(".article-custom-section:first").addClass("default").css("display", "block");


    jq2("h1", extWrapper).each(function () {
        jq2(this).addClass("accordion-toggle")
        jq2(this).parent().before(this);
    })


    jq2("h1", extWrapper).first().addClass("active");


    jq2('#extWrapper').find('.accordion-toggle').click(function () {
        jq2(this).next().slideToggle('fast');
        jq2(".article-custom-section").not(jq2(this).next()).slideUp('fast');
    });

    jq2("h1", extWrapper).click(function () {
        jq2("h1", extWrapper).removeClass("active");
        jq2(this).addClass("active");
    });

    jq2("img", extWrapper).click(function () {
        if (jq2("a.expand")[0]) {
            jq2(this).parent().removeClass("expand");
        } else {
            jq2(this).parent().addClass("expand");
        }
    });

    jq2('head').append('<link rel="stylesheet" href="https://rawgit.com/khngrd/itidevs/master/khn_styles.css" type="text/css" />');

    jq2(extWrapper).append("<button input type='button' id='extBtnBack' class='btn btn-default' style='float:left;  margin-left:  5%' />");
    jq2(extWrapper).append("<button input type='button' id='extBtnForw' class='btn btn-default' style='float:right; margin-right: 5%' />");

    jq2(".fa.fa-search:first").clone().appendTo("#extBtnBack");
    jq2(".fa.fa-search:first").clone().appendTo("#extBtnForw");

    jq2("#extBtnBack i.fa.fa-search").removeClass("fa fa-search").addClass("fa fa-long-arrow-left").css("font-size", "18px");
    jq2("#extBtnForw i.fa.fa-search").removeClass("fa fa-search").addClass("fa fa-long-arrow-right").css("font-size", "18px");
