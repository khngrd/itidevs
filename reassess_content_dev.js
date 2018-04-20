// $.getScript('https://rawgit.com/khngrd/itidevs/master/khn_reassess_content_v4_bootstrap.js');
// q('head').append('<link rel="stylesheet" href="https://rawgit.com/khngrd/itidevs/master/reassess_content.css" type="text/css" />');

q = jQuery.noConflict();

q('head').append('<link rel="stylesheet" href="http://127.0.0.1:8887/reassess_content.css" type="text/css" />');

var w = q("#article, .kb_article");

var m =
    "<div class='modal fade' id='imagemodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>" +
    "<div class='modal-dialog'>" +
    "<div class='modal-content'>" +
    "<div class='modal-header'>" +
    "<button type='button' class='close' data-dismiss='modal'>" +
    "<span aria-hidden='true'>&times;</span>" +
    "<span class='sr-only'>Close</span>" +
    "</button>" +
    "</div>" +
    "<div class='modal-body'>" +
    "<img src='' id='imagepreview' class='imagepreview'>" +
    "</div>" +
    "</div>" +
    "</div>";

var h = ("h3");

var j = 0;

q(w)
    .wrapInner("<div />")
    .append(m);

q("div", w).first()
    .attr('id', 'extWrapper')

q(".modal-dialog", w)
    .addClass("modal-md");

q("> div", w)
    .prepend('<' + h + ' class="temp" />');

q('h1, h2, h3, h4, h5, h6', w)
    .replaceWith(function () {
        return q('<' + h + '/>')
            .append(q(this).contents());
    });

q(h, w)
    .each(function (index) {
        q(this)
            .nextUntil('' + h + '')
            .andSelf()
            .wrapAll("<div />")
            .parent()
            .addClass('container-fluid')
    });


q("img", w)
    .each(function () {
        if (q(this).length) {
            q(this)
                .wrap("<a />")
                .parent()
                .attr("src", q(this).attr("src"))
                .attr("href", '')
                .addClass("pop")
                .unwrap()
        }
    });

q("div > a", w)
    .each(function () {
        j++;
        var newID = '#collapse' + j;
        q(this).attr('href', newID);
        q(this).val(j)
    });

q("img", w).click(function () {
    q('#imagepreview')
        .attr('src', q(this).attr('src'))
        .css("max-width", "100%");
    q('#imagemodal').modal('show');
});

q('ul, ol', w).slice(1).hide()
    .replaceWith(function () {
        return q('<ul />')
            .append(q(this).contents());
    });
q(w).html(function (i, html) {
    return html.replace(/&nbsp;/g, '');
});

q("p:empty").remove()

q('div >' + h + ':empty').remove()
