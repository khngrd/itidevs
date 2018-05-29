$(window).load(function () {

    function knowledgeExists() {
        return document.getElementsByClassName("kb-article-content").length !== 0;
    }

    var $article = (".kb-article-content");
    function prepareMODAL() {
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

        $($article)
            .append($modal)
            .find(".modal-dialog")
            .addClass("modal-lg");
    }

    function initMODAL() {
        function modalmix(element) {
            this.$element = $(element);
            this.$content = this.$element.find('.modal-content');
            var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
            var dialogMargin = $(window).width() < 768 ? 20 : 60;
            var contentHeight = $(window).height() - (dialogMargin + borderWidth);
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

        $('.modal').on('show.bs.modal', function () {
            $(this).show();
            modalmix(this);
        });

        $(window).resize(function () {
            if ($('.modal.in').length != 0) {
                modalmix($('.modal.in'));
            }
        });
    }

    function prepareDOM() {
        var $header = ('h3');
        var $images = $($article).find('img');
        var $headers = $($article).find('h1, h2, h3, h4, h5, h6');
        var $image = 0;
        var $lists = $($article).find('ul, ol');

        $($article).prepend('<' + $header + ' class="temp" />');

        $headers.replaceWith(function () {
            return $('<' + $header + '/>').append($(this).contents());
        });

        $($header, $article).each(function (index) {
            $(this)
                .nextUntil('' + $header + '')
                .andSelf()
                .wrapAll("<div />");
        });

        $($header, $article).each(function () {
            if ($(this).html().replace(/\s|&nbsp;/g, '').length == 0)
                $(this).remove();
        });

        if ($images.length) {
            $images.each(function () {
                $images
                    .wrap("<a />")
                    .parent()
                    .attr("href", '')
                    .addClass("pop")
                    .unwrap();
            });

            $images
                .click(function () {
                    $('#imagepreview')
                        .attr('src', $(this).attr('src'));
                    $('#imagemodal').modal('show');
                });
        }

        $('>div', $article).each(function () {
            $(this)
                .find('>a.pop')
                .nextUntil(this)
                .andSelf()
                .wrapAll("<div class='flex' />");
        });

        $('>div:first-of-type', $article)
            .find('span')
            .unwrap()
            .wrapAll('<div id="intro" />');

        $("#intro span", $article).each(function () {
            $(this).replaceWith('<p>' + $(this).text() + '</p>');
        });

        $('a.pop').click(function () {
            return false;
        });
			
			if ($lists.length) {
            $lists.replaceWith(function () {
                return $('<ol />').append($(this).contents());
            });
        }
    }

    (function setupDOM() {
        if (!knowledgeExists()) {
            setTimeout(setupDOM, 1000);
        } else {
            prepareDOM();
            prepareMODAL();
            initMODAL();
        }
    })();
});
