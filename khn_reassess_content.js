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
            .wrap("<a href='' class='pop' />")
            .parent()
            .attr("src", jq2(this).attr("src"))
            .unwrap()
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

jq2(".article-custom-section", extWrapper).first().addClass("active");


jq2('#extWrapper').find('.accordion-toggle').click(function () {
    jq2(this).next().slideToggle('fast');
    jq2(".article-custom-section").not(jq2(this).next()).slideUp('fast');
});

jq2("h1", extWrapper).click(function () {
    jq2("h1", extWrapper).removeClass("active");
    jq2(this).addClass("active");
});

jq2('head').append('<link rel="stylesheet" href="https://rawgit.com/khngrd/itidevs/master/khn_styles.css" type="text/css" />');

// jq2(extWrapper).append("<div class='modal fade' id='imagemodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>Image preview</h4></div><div class='modal-body'><img src='' id='imagepreview'></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>");

jq2(extWrapper).append("<div class='modal fade' id='imagemodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button></div><div class='modal-body'><img src='' id='imagepreview'></div></div></div></div>");

jq2("img", extWrapper).click(function () {
    jq2('#imagepreview').attr('src', jq2(this).attr('src'));
    jq2('#imagemodal').modal('show');
});
