// $.getScript('https://rawgit.com/khngrd/itidevs/master/khn_reassess_content_v3_bootstrap.js');
jq2 = jQuery.noConflict();

var extWrapper = jq2("#article, .kb_article");

jq2(extWrapper).wrapInner("<div id='accordion' class ='panel-group' style='padding-bottom:30px' />");

jq2(extWrapper).wrapInner("<div id='extWrapper' />");

jq2(extWrapper).html(function (i, html) {
    return html.replace(/&nbsp;/g, '');
});

jq2("p:empty").remove()

jq2('h1', extWrapper).replaceWith(function () {
    return jq2("<h4 class='panel-title' />").append(jq2(this).contents());
});

jq2("h4", extWrapper).each(function (index) {
    jq2(this)
        .nextUntil("h4")
        .andSelf()
        .wrapAll("<div class='panel panel-default' />");
});

var k = 0;
jq2(".panel", extWrapper).each(function () {
    jq2(this).each(function () {
        k++;
        var newID = 'collapse'+k;
        jq2(this).attr('id', newID);
        jq2(this).attr('class', 'panel-collapse collapse');
        jq2(this).val(k);
    });
});

jq2("h4", extWrapper).each(function () {
    jq2(this).wrap("<div class='panel-heading' />")
        .append("<a data-toggle='collapse' data-parent='#accordion' href=''>" + jq2(this).text() + "</a>")
});

jq2("h4", extWrapper).each(function () {
    var extHead = jq2(this).children().eq(0).detach();
    jq2(this).empty();
    extHead.appendTo(this);
});

var j = 0;
jq2(".panel-heading a", extWrapper).each(function () {
    j++;
    var newID = '#collapse'+j;
    jq2(this).attr('href', newID);
    jq2(this).val(j);
});

jq2(".panel-heading", extWrapper).each(function () {
    jq2(this).parent().before(this);
});

jq2(extWrapper).append("<div class='modal fade' id='imagemodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button></div><div class='modal-body'><img src='' id='imagepreview'></div></div></div></div>");

jq2("img", extWrapper).each(function () {
    if (jq2(this).length) {
        jq2(this)
            .wrap("<a href='' class='pop' />")
            .parent()
            .attr("src", jq2(this).attr("src"))
            .unwrap()
    }
});

jq2("img", extWrapper).click(function () {
    jq2('#imagepreview').attr('src', jq2(this).attr('src'));
    jq2('#imagemodal').modal('show');
});

jq2('head').append('<link rel="stylesheet" href="https://rawgit.com/khngrd/itidevs/master/khn_styles.css" type="text/css" />');
