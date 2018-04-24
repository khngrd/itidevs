//  chrome >
//  ctr + shift + j
//  jQuery.getScript('https://rawgit.com/khngrd/itidevs/master/reassess_content.js');
//  > enter
// jQuery.getScript('http://127.0.0.1:8887/reassess_content.js');

// $q = jQuery.noConflict();
$q = jQuery;

var DEBUG = false;
if (!DEBUG) {
    if (!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function () {};
    }
    $q('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/khngrd/itidevs/master/reassess_content.css" type="text/css" />');

} else {
    $q('head').append('<link rel="stylesheet" href="http://127.0.0.1:8887/reassess_content.css" type="text/css" />');
    console.log('/** RUNNING WITH LOCAL ASSETS **/')
}

$q.fn.log = function (max) {
    max = (max == null ? 15 : Math.max(max, 0));
    var arr = this.slice(0, max).toArray();
    for (var i = 1; i < arr.length; i += 2) {
        arr.splice(i, 0, ",");
    }
    arr.unshift("<jQuery> length %".replace("%", this.length), "[");
    if (this.length > max) {
        if (max > 0) {
            arr.push(",");
        }
        arr.push("(% more)".replace("%", this.length - max));
    }
    arr.push("]");
    console.log.apply(console, arr);
    return this;
};

/*********************************************************************************** */

var $spwrapper = $q(".kb_article");

var $snwrapper = $q("#article");

var $wrappers = $spwrapper, $snwrapper;

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
    "<div class='modal-body' id='#modal-body'>" +
    "<img src='' id='imagepreview' class='imagepreview'>" +
    "</div>" +
    "</div>" +
    "</div>";

var $header = ('h3');

var $headers = $q('h1, h2, h3, h4, h5, h6', $wrappers);

var $image = 0;

var $lists = $q('ul, ol', $wrappers)

var $images = $q('img', $wrappers)

var $paragraph = $q('p', $wrappers)

if ($wrappers.length) {
    $wrappers
    .wrapInner("<div />")
    .find(">:first-child")
    .attr('id', 'extWrapper')
    .prepend('<' + $header + '/>')
    if ($spwrapper.length) {
        $spwrapper
            .find("#extWrapper")
            .append($modal)
            .find(".modal-dialog")
            .addClass("modal-md");
    }

}

if ($headers.length) {
    $headers
        .replaceWith(function () {
            return $q('<' + $header + '/>').log()
                .append($q(this).contents());
        });
        $q($header, $wrappers)
            .each(function (index) {
                $q(this)
                    .nextUntil('' + $header + '')
                    .andSelf()
                    .wrapAll("<div />")
                    .parent()
                    .addClass('container-fluid').log(0)
        });
        $q($header, $wrappers)
            .each(function () {
                if ($q(this).html().replace(/\s|&nbsp;/g, '').length == 0)
                    $q(this).remove().log(0);
        });
}

if ($lists.length) {
    $lists.slice(1).hide()
        .replaceWith(function () {
            return $q('<ul />').append($q(this).contents()).log(0);
        });
}

if ($images.length) {
    $q(this).each(function () {
        $images
        .wrap("<a />")
        .parent()
        .attr("href", '')
        .addClass("pop")
        .unwrap()
        .append("<hr>");
    })
    $images.each(function () {
        $images
        .parent()
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

function modalmix(element) {
    this.$element = $q(element);
    this.$content = this.$element.find('.modal-content');
    var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
    var dialogMargin = $q(window).width() < 768 ? 20 : 60;
    var contentHeight = $q(window).height() - (dialogMargin + borderWidth);
    var headerHeight = this.$element.find('.modal-header').outerHeight() || 0;
    var footerHeight = this.$element.find('.modal-footer').outerHeight() || 0;
    var maxHeight = contentHeight - (headerHeight + footerHeight);

    this.$content.css({
        'overflow': 'hidden'
    });

    this.$element
        .find('.modal-body').css({
            'max-height': maxHeight,
            'overflow-y': 'auto'
        });
}

$q('.modal').on('show.bs.modal', function () {
    $q(this).show();
    modalmix(this);
});

$q(window).resize(function () {
    if ($q('.modal.in').length != 0) {
        modalmix($q('.modal.in'));
    }
});

$q('p, li', $wrappers).each(function () {
    var $this = $q(this).log(0);
    $this.html($this.html().replace(/&nbsp;/g, ''));
});
