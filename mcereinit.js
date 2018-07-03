// jQuery.getScript('https://rawgit.com/khngrd/itidevs/master/mcereinit.js');

function toolbarExists() {
    if (document.getElementById("kb_knowledge.text")) {
        return document.getElementsByClassName("mce-toolbar").length !== 0;
    }
}

function mceInit(id, config) {
    tinyMCE.baseURL = '/scripts/tinymce4_4_3';
    tinyMCE.suffix = '.min';

    function snDir(name, min) {
        return '/scripts/tinymce4_4_3/sn_plugins/' + name + '/plugin' + (min ? '.min' : '') + '.js';
    }
    var default_config = {
        remove_script_host: true,
        document_base_url: window.location.protocol + '//' + window.location.host,
        getAttachmentData: function () {
            try {
                return {
                    table: g_form.getTableName(),
                    sys_id: g_form.getUniqueValue()
                };
            } catch (e) {
                return {
                    error: "cannot create attachments, no parent record found"
                };
            }
        },
        valid_children: "+body[style|link]",
        paste_data_images: true,
        paste_auto_cleanup_on_paste: true,
        paste_webkit_styles: '',
        paste_retain_style_properties: '',
        convert_fonts_to_spans: true,
        fix_list_elements: true,
        powerpaste_html_import: 'clean',
        remove_trailing_brs: true,
        dialog_type: 'modal',
        inline_styles: false,
        entity_encoding : "raw",
        valid_classes: {
            '*': 'cheatsheet', // Global classes
            'cheatsheet': 'anchor' // Link specific classes
        },
        target_list: [{
                title: 'None(Use Implicit)',
                value: ''
            },
            {
                title: 'Same frame(_self)',
                value: '_self'
            },
            {
                title: 'New window(_blank)',
                value: '_blank'
            },
            {
                title: 'Top frame(_top)',
                value: '_top'
            }
        ],
        menubar: false
    };
    var default_plugins = [
        //  'advlist anchor autolink charmap code colorpicker ',
        'autolink code',
        //  'directionality emoticons fullscreen ',
        'fullscreen',
        //  'hr insertdatetime layer lists importcss nonbreaking',
        'hr lists table',
        //  'noneditable pagebreak print save searchreplace tabfocus',
        '',
        //  'table template textcolor textpattern visualblocks visualchars powerpaste',
        ' template powerpaste',
        //  'snLink listitem_fix align_listitems a11y_fixes'
        'snLink powerpaste listitem_fix'
    ];
    var config = tinyMCE.extend(default_config, (config || {}), {
        browser_spellcheck: true,
        setup: function (ed) {
            $j(ed.getElement()).trigger('keydown');
            ed.on('blur', function () {
                ed.save();
                $j(ed.getElement()).trigger('change');
            });
            ed.addCommand('snImage', function () {
                SNTinyMCEImage(ed);
            });
            ed.addButton('image', {
                icon: 'image',
                tooltip: 'Insert/edit image',
                onclick: function () {
                    ed.execCommand('snImage');
                },
                stateSelector: 'img:not([data-mce-object],[data-mce-placeholder])'
            });
            ed.addCommand('snMedia', function () {
                SNTinyMCEMedia(ed);
            });
            ed.addButton('media', {
                icon: 'media',
                tooltip: 'Insert/edit video',
                onclick: function () {
                    ed.execCommand('snMedia');
                }
            });
            ed.addButton('aak-btn', {
                type: 'menubutton',
                text: 'Knowledge',
                icon: false,
                menu: [{
                    icon: false,
                    text: 'Overskrift',
                    onclick: function () {
                        tinymce.activeEditor.execCommand('mceToggleFormat', false, 'h1');
                    }
                }, {
                    icon: false,
                    text: 'Tekst',
                    onclick: function () {
                        tinymce.activeEditor.execCommand('mceToggleFormat', false, 'p');
                    }
                    /*
                }, {
                    icon: false,
                    text: 'Før du går igang',
                    onclick: function () {
                        var ed = tinyMCE.activeEditor;
                        var content = ed.selection.getContent({'format':'html'});
                        var new_selection_content = '<div id="intro">' + content + '</div>';
                        ed.execCommand('insertHTML', false, new_selection_content);
                    }
                }, {
                    icon: false,
                    text: '_dev_stripTags',
                    onclick: function () {
                        var el = tinymce.activeEditor.selection.getContent({ format : 'text' });
                        tinymce.activeEditor.selection.setContent(el);
                    }
                    */
                }],
            });
            ed.on('init', function (e) {
                var doc = ed.getDoc();
                doc.documentElement.style.height = '100%';
                doc.body.style.height = '100%';
                $j(ed.getBody())
                    .on('focus', function () {
                        $j(ed.getContentAreaContainer()).addClass('focused');
                    }).on('blur', function () {
                        $j(ed.getContentAreaContainer()).removeClass('focused');
                    });
                CachedEvent.emit('tinyeditor_init.' + e.target.id, ed);
            });
        },
        images_upload_handler: function (blobInfo, success, failure) {
            var blobname = blobInfo.filename();
            var extension = blobname.substring(blobname.indexOf('.'));
            var tinyMceConfig = (config || default_config);
            var data = {};
            var attachmentData;
            if (tinyMceConfig.attachmentData) {
                attachmentData = tinyMceConfig.attachmentData;
            } else if (typeof tinyMceConfig.getAttachmentData == 'function') {
                attachmentData = tinyMceConfig.getAttachmentData();
            }
            data.sysparm_table = attachmentData.table;
            data.sysparm_sys_id = attachmentData.sys_id;
            AttachmentUploader.uploadBlob(blobInfo.blob(), "Pasted image" + extension, 'sys_attachment.do', data)
                .success(function (response) {
                    success("/sys_attachment.do?sys_id=" + response.sys_id);
                })
                .error(function (response) {
                    failure(response);
                });
        },
        mode: "exact",
        //selector: 'textarea',
        elements: 'kb_knowledge.text',
        height: 600,
        auto_focus: 'kb_knowledge.text',
        toolbar: 'undo redo | insert | styleselect | bold italic | bullist numlist | table | link image media video | fullscreen | code | aak-btn',
        content_css: [],
        content_style: "ul li, ol li {margin-bottom: 5px;} img {width:110px; height:110px; border: 1px dashed #000; padding:10px;} .readthis {border: 1px dashed orange; padding: 5px;} #tinymce {padding: 10px;}",
        menubar: false,
        plugins: default_plugins,
        external_plugins: {
            readonlymode: snDir('readonlymode'),
            'codemirror': snDir('codemirror', true),
            'preview': snDir('preview'),
            'notificationhandler': snDir('notificationhandler')
        },
        codemirror: {
            path: 'CodeMirror'
        },
    });
    config.originalSettings = $j.extend(true, {}, config);
    tinymce.init(config);
}

var $calls = 1;

var mceReady = window.setInterval(function () {
    if ($calls < 10) {
        $calls += 1;
        if (!toolbarExists() ) {
            //console.log('attempting to re-initialize tinymce.. ' + $calls + '/10');
        } else {
            CachedEvent.after('glideform.initialized', function (gf) {
                var elements = document.querySelectorAll('.htmlField');
                var i = elements.length;
                while (i--) {
                    var id = elements[i].id;
                    var handler = new TinyMCETextAreaElement(id);
                    gf.registerHandler(id, handler);
                }
            });
            addTopRenderEvent(function () {
                var elements = document.querySelectorAll('.htmlField');
                var i = elements.length;
                while (i--) {
                    var element = elements[i];
                    tinymce.remove('textarea');
                    mceInit(element.id, 'config');
                }
            });
            window.clearInterval(mceReady);
        }
    }
}, 1000);
