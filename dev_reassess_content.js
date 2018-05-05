//  chrome >
//  ctr + shift + j
//  jQuery.getScript('https://rawgit.com/khngrd/itidevs/master/dev_reassess_content.js');
//  > enter
// jQuery.getScript('http://127.0.0.1:8887/dev_reassess_content.js');

$q = jQuery;

var $DEV = true
var $NETWORK = true;
var $DEBUG = true;

if (!$DEBUG) {
} else {
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
    console.log('/-------------------- debugging enabled ---------------------------------------/')

}

if (!$DEV) {
    $q('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/khngrd/itidevs/master/reassess_content.css" type="text/css" />');
} else {
    if (!$NETWORK) {
        console.log('/-------------------- running with local development assets -------------------/');
        //$q('head').append('<link rel="stylesheet" href="http://127.0.0.1:8887/dev_reassess_content.css" type="text/css" />');
        //$q('head').append('<link rel="stylesheet" href="http://127.0.0.1:8887/dev_reassess_view.css" type="text/css" />');
        $q('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/khngrd/itidevs/master/dev_reassess_content.css" type="text/css" />');
        $q('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/khngrd/itidevs/master/dev_reassess_view.css" type="text/css" />');
    } else {
        console.log('/-------------------- running with networked development assets ---------------/');
        $q('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/khngrd/itidevs/master/dev_reassess_content.css" type="text/css" />');
        $q('head').append('<link rel="stylesheet" href="https://cdn.rawgit.com/khngrd/itidevs/master/dev_reassess_view.css" type="text/css" />');
    }
}

jQuery.fn.stripTags = function () {
    return this.replaceWith(this.html().replace(/<\/?[^>]+>/gi, ''));
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

var $header = ('h3')

var $headers = $q('h1, h2, h3, h4, h5, h6', $wrappers)

var $image = 0;

var $lists = $q('ul, ol', $wrappers)

var $images = $q('img', $wrappers)

var $expand = $q('.fa.fa-picture-o', $wrappers)

var $types = $q("#extWrapper > div > div > div", $wrappers).find("a:first-of-type")

if ($wrappers.length) {
    $wrappers
    .wrapInner("<div />")
    .find(">:first-child", $wrappers)
    .attr({
        id: "extWrapper",
    })
    $wrappers
    .find("#extWrapper")
    .prepend('<' + $header + ' class="temp" />')
    if ($spwrapper.length) {
        $spwrapper
            .find("#extWrapper")
            .append($modal)
            .find(".modal-dialog")
            .addClass("modal-lg");
}   }

if ($headers.length) {
    $headers
        .replaceWith(function () {
            return $q('<' + $header + '/>')
                .append($q(this).contents())
        });
    $q($header, $wrappers)
        .each(function (index) {
            $q(this)
            .nextUntil('' + $header + '')
            .andSelf()
            .wrapAll("<div />")
    });
    $q($header, $wrappers)
    .each(function () {
        if ($q(this).html().replace(/\s|&nbsp;/g, '').length == 0)
            $q(this).remove();
    });
    // $q($header + ':not(:last)', $wrappers)
        // .parent()
        // .append("<hr>");
}

if ($lists.length) {
    $lists.slice(1).hide()
        .replaceWith(function () {
            return $q('<ul />').append($q(this).contents());
})}

if ($images.length) {
    $q(this).each(function () {
        $images
        .wrap("<a />")
        .parent()
        .attr("href", '')
        .addClass("pop")
        // .prepend("<i class='fa fa-picture-o'></i>")
        .unwrap()
    })
    $images.each(function () {
        $images
        .parent()
        $image++;
        var newID = '#img-' + $image;
        $q(this).attr('href', newID);
        $q(this).val($image)
    })
    if ($spwrapper.length) {
        $images
        .click(function () {
            $q('#imagepreview')
            .attr('src', $q(this).attr('src'))
            .css("max-width", "100%")
            $q('#imagemodal').modal('show')
    })}
}

if ($spwrapper.length) {
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
}

$q('p, li', $wrappers).each(function () {
    var $this = $q(this);
    $this.html($this.html().replace(/&nbsp;/g, ''));
});

$q($types).each(function () {
    $q(this)
        .nextUntil($(this))
        .andSelf()
        .wrapAll("<div class='flex' />")
})

if (!$DEV) {
} else {
    $q('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" type="text/css" />');

    $q('body').find(".navbar-header > a > img").attr('ng-src', 'https://preview.ibb.co/dDdFjH/aarhus_kommune_logo_1.png').attr('src', 'https://preview.ibb.co/dDdFjH/aarhus_kommune_logo_1.png');

    $q(".panel-heading > h1").text(function () {
        return $q(this).text().replace("KB Top Viewed", "Mest læste vejledninger");
    });

    $q(".panel-heading > h1").text(function () {
        return $q(this).text().replace("Also in To-faktor-validering", "Samme kategori");
    });

    $q("#x020332605b032200a9ad09ed5a62bcf0 > div > span").text(function () {
        return $q(this).text().replace("Helpful?", "Fik du løst dit problem?");
    });

    $q("#x020332605b032200a9ad09ed5a62bcf0 > div > button.btn.btn-success.btn-question.ng-scope").text(function () {
        return $q(this).text().replace("Yes", "Ja");
    });

    $q("#x020332605b032200a9ad09ed5a62bcf0 > div > button.btn.btn-default.btn-question.ng-scope").text(function () {
        return $q(this).text().replace("No", "Nej");
    });

    // $q(".panel-title").text(function () {
    //     return $q(this).text().replace("KB Categories", "Videnskategorier");
    // });

    $q(".sp-row-content:first.row>div:first").removeClass("col-md-8").addClass("col-md-9 ext");

    $q(".sp-row-content:first.row>div:not(:first)").removeClass("col-md-4").addClass("col-md-3 ext");

    $q(".fa.fa-chevron-right").removeClass("fa-chevron-right").addClass("fa-angle-right");

    $q(".sp-row-content.row").find(">").addClass("ext")

    $q(".sp-row-content.row").addClass("ext")

    $q(".ng-scope.breadcrumbs-container.c65739d7d5b7212000d7ec7ad31f91a55").attr("id", "subheader")

    var $lastoftype = $q("#subheader .fa-angle-right").last();

    $q($lastoftype).removeClass("fa-angle-right").addClass("fa-angle-double-right");

    $q(".nav-pills li:first a").text(function () {
        return $q(this).text().replace('Hjem', '');
    });

    $q(".nav-pills li:first a").prepend("<i class='fa fa-home' aria-hidden='true' style='font-size:20px; padding: 0; margin: 0;' ></i>");
}

var $keyword = $q($q('#extWrapper>div:first(:contains("Før du går igang"))')[0]);

var $keygroup = $q($q('#extWrapper>div:first(:contains("Før du går igang"))')[0]);
console.log($keyword.length)

var $introtext = $q($q($wrappers)[0])

var regex = /^(før du går igang).*(?:\n\1*\S.*)+/mgi;

// var str = $q("#extWrapper").html();

// $q("#extWrapper").html(str.replace(regex, '<span class="red">$1</span>'));

// $introtext.stripTags()

// var word = 'før du går igang';
// var template = '$1<span class="boxed">$2</span>';
// var pattern = new RegExp('(>[^<.]*)(' + word + ')([^<.]*)', "gi");
// var content = $q($wrappers).html();

// $q($wrappers).html(content.replace(pattern, template));

jQuery.fn.linker = function () {
    $q(this).contents()
        .filter(function () { return this.nodeType != Node.TEXT_NODE; })
        .each(function () { $(this).linker(); });
    $q(this).contents()
        .filter(function () { return this.nodeType == Node.TEXT_NODE; })
        .each(function () {
            $q(this).replaceWith(
                $q(this).text().replace(/^(før du går igang).*(?:\n\1*\S.*)+/mgi, "<span class='intro'>$1</span>")
            );
        });
}
$q(document).ready(function () {
    $q($wrappers).linker();
});
