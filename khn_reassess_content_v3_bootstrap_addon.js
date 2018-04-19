jq2 = jQuery.noConflict();

jq2(".panel-heading", extWrapper).each(function () {
    jq2(this).parent().before(this);
});
