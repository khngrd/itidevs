/**
 * include this script in your kb_view_edit
 * like so
 * <g: include_script src="khn_tinymce_mod.jsdbx" />
*/

(function () {
    'use strict';
    /**
     * tinymces wysiwyg editor's iframe container has the id #kb_knowledge.text
     */
    function getDocument() {
        var frame_id = 'kb_knowledge.text';

        for (var i = 0; i < window.frames.length; i++) {
            if (window.frames[i].frameElement.id == frame_id) {
                return window.frames[i].document;
            }
        }
    }
    /**
     * unless tinymce is up and running, the toolbar wont exist
     * so checking for toolbar sorta equates window.document
     */
    function toolbarExists() {
        return document.getElementsByClassName('mce-toolbar').length !== 0;
    }

    /**
     * settings up buttons for later injection
     *
     * (needs a trimming)
     */

    function buildBtnP() {
        // setting up a style for our button
        var btnStyle = 'style="text-transform:lowercase; font-weight:bold;';
        // whatever we want to appear on the button (can be text, icon, whatever)
        var btnFace = 'tekst';
        var zNode = document.createElement('div');
        // configures the innerHTML of the button, along with our btnStyle and btnFace elements
        zNode.innerHTML = '<button id="tinyMCE_btn-p"' + 'role="presentation" type="button"' + btnStyle + '">' + '' + btnFace + '</button>';
        zNode.id = 'p_container';
        // configures correct classes for the tinymce toolbar 
        zNode.setAttribute('class', 'mce-widget mce-btn');
        zNode.setAttribute('aria-label', 'paragraph');
        zNode.setAttribute('role', 'button');
        zNode.setAttribute('aria-labelledby', 'p_container');
        zNode.setAttribute('style', 'margin-left:2px');

        return zNode;
    }

    function buildBtnH1() {
        // setting up a style for our button
        var btnStyle = 'style="text-transform:lowercase; font-weight:bold;';
        // whatever we want to appear on the button (can be text, icon, whatever)
        var btnFace = 'overskrift';
        var zNode = document.createElement('div');
        zNode.innerHTML = '<button id="tinyMCE_btn-h1"' + 'role="presentation" type="button"' + btnStyle + '">' + '' + btnFace + '</button>';
        zNode.id = 'h1_container';
        zNode.setAttribute('class', 'mce-widget mce-btn');
        zNode.setAttribute('aria-label', 'style-h1');
        zNode.setAttribute('role', 'button');
        zNode.setAttribute('aria-labelledby', 'h1_container');
        zNode.setAttribute('style', 'margin-left:2px');

        return zNode;
    }
    /**
     * here we make sure that our buttons do stuff whenever we click them
     */
    function btnRunner() {
        document.getElementById("tinyMCE_btn-p").addEventListener(
            "click", btnClickP, false
        );
        document.getElementById("tinyMCE_btn-h1").addEventListener(
            "click", btnClickH1, false
        );
    }
    /**
     * here we tell our buttons what to do whenever we click on them
     */
    function btnClickP() {
        // first we remove all unnessecary styling elements
        tinymce.activeEditor.execCommand('RemoveFormat', false, 'b,strong,em,i,font,u,strike,');
        // then we wrap the content block in a <p> tag
        tinymce.activeEditor.execCommand('mceToggleFormat', false, 'p');
    }
    function btnClickH1() {
        // first we remove all unnessecary styling elements
        tinymce.activeEditor.execCommand('RemoveFormat', false, 'b,strong,em,i,font,u,strike');
        // we apply a bit of shading to the heading for proof of concept
        // tinymce.activeEditor.execCommand('ForeColor', false, 'seagreen');
        // then we wrap the content block in a <p> tag
        tinymce.activeEditor.execCommand('mceToggleFormat', false, 'h1');
    }
    /**
     * we then scour the dom looking for the last button on the toolbar
     * while we look at childnodes trying to figure everthing out
     *
     * (seems less hardcoded and more forgiving than matching ids)
     */
    function insBtns() {
        var a = document.getElementsByClassName('mce-toolbar');
        var b = a.item(0);
        var c = b.childNodes;
        var d = c.item(0);
        var e = d.childNodes;
        var f = e.item(e.length - 1); // f = <div id="mceu_33 class="mce-container [...]
        var g = f.childNodes;
        var h = g.item(0); // h = <div id="mceu_33-body">
        var i = h.childNodes;
        var j = i.item(i.length - 1);
        /**
         * tinymce applies mce-first and mce-last classes to toolbar dom elements for styling purposes
         * so we use that call to hook into the tinymce init for a steamlined look
         */
        // first we add our buttons
        h.appendChild(buildBtnP());
        h.appendChild(buildBtnH1());
        // then we apply classes for styling
        p_container.addClassName('mce-first mce-last');
        h1_container.addClassName('mce-first mce-last');
    }

    /**
     * the script runs in the background before tinyMCE has finished its init
     * like a ninja, it waits in the shadows of the dom, patiently awaiting its moment of opportunity
     * when tinyMCE begins assembling its toolbar - and just before it completes the action - we quietly slip in and inject our buttons
     * pretending we were never there
     */
    (function waitForTinyMCE() {
        if (!toolbarExists()) {
            setTimeout(waitForTinyMCE, 1000);
        } else {
            insBtns();
            btnRunner();
        }
    })();
})();
