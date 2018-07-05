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
        powerpaste_word_import: 'clean',
        paste_as_text: true,
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
        'fullscreen ',
        //  'hr insertdatetime layer lists importcss nonbreaking',
        'hr insertdatetime lists table',
        //  'noneditable pagebreak print save searchreplace tabfocus',
        '',
        //  'table template textcolor textpattern visualblocks visualchars powerpaste',
        ' template visualblocks visualchars powerpaste',
        //  'snLink listitem_fix align_listitems a11y_fixes'
        'snLink powerpaste listitem_fix align_listitems a11y_fixes'
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
                menu: [{
                    text: 'Format',
                    menu: [{
                       text: 'Angiv overskrift / nyt afsnit',
                        onclick: function () {
                            tinymce.activeEditor.execCommand('mceToggleFormat', false, 'h1');
                        }
                    }, {
                        text: 'Formatér som tekst',
                        onclick: function () {
                            tinymce.activeEditor.execCommand('mceToggleFormat', false, 'p');
                        }
                    }, {
                        text: 'Angiv liste-element',
                        onclick: function () {
                            var ed = tinyMCE.activeEditor;
                            var content = ed.selection.getContent({'format':'html'});
                            var new_selection_content = '[@] ' + content + ' [/@]';
                            ed.execCommand('insertHTML', false, new_selection_content);
                        }
                    }],
                }, {
                    text: 'Noter',
                    menu: [{
                    text: 'Gør markeret tekst til note',
                    onclick: function () {
                        var ed = tinyMCE.activeEditor;
                        var content = ed.selection.getContent({'format':'html'});
                        var new_selection_content = '[note] ' + content + ' [/note]';
                        ed.execCommand('insertHTML', false, new_selection_content);
                    }
                }, {
                    text: 'Indsæt en note',
                    onclick: function() {
                        var ed = tinyMCE.activeEditor;
                        ed.windowManager.open({
                            title: 'Indsæt note',
                        body: [
                          {type: 'textbox', name: 'label', label: 'note'}
                        ],
                        onsubmit: function(e) {
                          ed.insertContent('[note] '+e.data.label+' [/note]');
                        }
                      });
                    }
                }],
             }, {
                text: 'Tip',
                menu: [{
                text: 'Gør markeret tekst til et tip',
                onclick: function () {
                    var ed = tinyMCE.activeEditor;
                    var content = ed.selection.getContent({'format':'html'});
                    var new_selection_content = '[?]' + content + '[/?]';
                    ed.execCommand('insertHTML', false, new_selection_content);
                }
                }, {
                text: 'Indsæt et tip',
                onclick: function() {
                    var ed = tinyMCE.activeEditor;
                    ed.windowManager.open({
                        title: 'Indsæt tip',
                    body: [
                      {type: 'textbox', name: 'label', label: 'tip'}
                    ],
                    onsubmit: function(e) {
                      ed.insertContent('[?] '+e.data.label+' [/?]');
                    }
              });
            }
        }],
                }, {
                text: 'Fremhævet tekst',
                    menu: [{
                        text: 'Fremhæv markeret tekst',
                        onclick: function () {
                            var ed = tinyMCE.activeEditor;
                            var content = ed.selection.getContent({'format':'html'});
                            var new_selection_content = '[!]'+content+'[/!]';
                            ed.execCommand('insertHTML', false, new_selection_content);
                        }
                    }, {
                        text: 'Indsæt fremhævet tekst',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.windowManager.open({
                                title: 'Indsæt fremhævet tekst',
                            body: [
                              {type: 'textbox', name: 'label', label: 'tekst'}
                            ],
                            onsubmit: function(e) {
                              ed.insertContent('[!]'+e.data.label+'[/!]');
                            }
                          });
                        }
                    }],
                }, {
                    text: 'Tastatur-ikorner',
                    menu: [{
                      text: 'Windows-knap',
                      onclick: function() {
                        var ed = tinyMCE.activeEditor;
                        ed.insertContent('{win}');
                      }
                    }, {
                        text: 'Shift-knap',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.insertContent('{shift}');
                        }
                     }, {
                        text: 'Ctrl-knap',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.insertContent('{ctrl}');
                        }
                      }, {
                        text: 'tab-knap',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.insertContent('{tab}');
                        }
                      }, {
                        text: 'Enter-knap',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.insertContent('{enter}');
                        }
                      }, {
                        text: 'Lav din egen knap',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.windowManager.open({
                            title: 'Label',
                            body: [
                              {type: 'textbox', name: 'label', label: 'label'}
                            ],
                            onsubmit: function(e) {
                              // Insert content when the window form is submitted
                              ed.insertContent('{'+e.data.label+'}');
                            }
                          });
                        }
                    }],
                }, {
                    text: 'Pile',
                    menu: [{
                      text: 'Venstre-pil',
                      onclick: function() {
                        var ed = tinyMCE.activeEditor;
                        ed.insertContent('&#10229;');
                      }
                    }, {
                        text: 'Højre-pil',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.insertContent('&#10230;');
                        }
                     }, {
                        text: 'Op-pil',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.insertContent('&#129025;');
                        }
                      }, {
                        text: 'Ned-pil',
                        onclick: function() {
                            var ed = tinyMCE.activeEditor;
                            ed.insertContent('&#129043;');
                        }
                    }],
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
        elements: 'kb_knowledge.text, kb_knowledge.u_comments',
        //height: 300,
        //auto_focus: 'kb_knowledge.text',
        toolbar: 'undo redo | insert | styleselect | bold italic | bullist numlist | table | link image media | fullscreen | code | aak-btn',
        content_css: [],
        content_style: "ul li, ol li {margin-bottom: 5px; margin-left: 0px;} ul, ol {padding-left: 0;} img {width:25px; height:10px; border: 1px dashed #000; padding:5px; display: inline-block;} #tinymce {padding: 10px;} pre {background-color: #fafafa; border: none; border-radius: 0;}",
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
