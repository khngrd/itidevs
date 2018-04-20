// $.getScript('https://rawgit.com/khngrd/itidevs/master/khn_reassess_content.js');

jq2 = jQuery.noConflict();

jq2('head').append('<link rel="stylesheet" href="https://rawgit.com/khngrd/itidevs/master/reassess_content.css" type="text/css" />');
// jq2('head').append('<link rel="stylesheet" href="http://127.0.0.1:8887/reassess_content.css" type="text/css" />');

var extWrapper = jq2("#article, .kb_article");

jq2(extWrapper)
    .wrapInner("<div id='extWrapper' class='container-fluid' />")

jq2(extWrapper)
    .append("<div class='modal fade' id='imagemodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button></div><div class='modal-body'><img src='' id='imagepreview' class='imagepreview'></div></div></div></div>");

jq2(".modal-dialog", extWrapper).addClass("modal-md");

var h = ("h3");

jq2("> div", extWrapper)
    .prepend('<' + h + '/>');

jq2('h1, h2, h3, h4, h5, h6', extWrapper)
    .replaceWith(function () {
        return jq2('<' + h + '/>')
            .append(jq2(this).contents());
});

jq2(h, extWrapper)
    .each(function (index) {
        jq2(this)
            .nextUntil(''+ h +'')
            .andSelf()
            .wrapAll("<div />")
});

jq2("img", extWrapper)
    .each(function () {
        if (jq2(this).length) {
            jq2(this)
                .wrap("<a href='' class='pop' />")
                .parent()
                .attr("src", jq2(this).attr("src"))
                .unwrap()
    }
});

var j = 0;
jq2("div > a", extWrapper)
    .each(function () {
        j++;
        var newID = '#collapse' + j;
        jq2(this).attr('href', newID);
        jq2(this).val(j)
});

jq2("img", extWrapper).click(function () {
    jq2('#imagepreview').attr('src', jq2(this).attr('src')).css("max-width", "100%");
    jq2('#imagemodal').modal('show');
});

/**
 * housecleaning
 */

jq2('ul, ol', extWrapper).slice(1).hide()
    .replaceWith(function () {
        return jq2('<ul />')
            .append(jq2(this).contents());
});

jq2("p:empty").remove()
jq2('' + h + ':empty').remove()

// jq2(extWrapper).html(function (i, html) {
//     return html.replace(/&nbsp;/g, '');
// });
