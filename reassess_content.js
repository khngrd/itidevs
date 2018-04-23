/**
 * chrome >
 * ctr + shift + j
 * jQuery.getScript('https://rawgit.com/khngrd/itidevs/master/reassess_content.js');
 * > enter
 */

$q = jQuery.noConflict();

// remote
// $q('head').append('<link rel="stylesheet" href="https://rawgit.com/khngrd/itidevs/master/reassess_content.css" type="text/css" />');

// local
$q('head').append('<link rel="stylesheet" href="http://127.0.0.1:8887/reassess_content.css" type="text/css" />');

var $wrapper = $q("#article, .kb_article");

var $modal =
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

var $header = ("h3");

var $image = 0;

$q($wrapper)
    .wrapInner("<div />")
    .find(">:first-child")
    .attr('id', 'extWrapper')
    .prepend('<' + $header + '/>')
    .append($modal)
    .find(".modal-dialog")
    .addClass("modal-md");


$q('h1, h2, h3, h4, h5, h6', $wrapper)
    .replaceWith(function () {
        return $q('<' + $header + '/>')
            .append($q(this).contents());
    });

$q($header, $wrapper)
    .each(function (index) {
        $q(this)
            .nextUntil('' + $header + '')
            .andSelf()
            .wrapAll("<div />")
            .parent()
            .addClass('container-fluid')
    });

var $lists = $q('ul, ol', $wrapper)
if ($lists.length) {
    $lists
    .slice(1)
        .hide()
        .replaceWith(function () {
            return $q('<ul />')
                .append($q(this)
                    .contents());
        });
}

var $images = $q('img', $wrapper)

if ($images.length) {
    $images.each(function () {
        $images
        .wrap("<a />")
        .parent()
        .attr("href", '')
        .addClass("pop")
        .unwrap()
    })
    .parent(function () {
        $image++;
        var newID = '#img-' + $image;
        $q(this).attr('href', newID);
        $q(this).val($image)
    })
    .click(function () {
        $q('#imagepreview')
            .attr('src', $q(this).attr('src'))
            .css("max-width", "100%")
        $q('#imagemodal').modal('show')
    });
}

$q($header, $wrapper).each(function () {
    if ($q(this).html().replace(/\s|&nbsp;/g, '').length == 0)
        $q(this).remove();
});

$q('p', $wrapper).each(function () {
    if ($q(this).html().replace(/\s|&nbsp;/g, '').length == 0)
        $q(this).remove();
});
