jq2(".panel-heading", extWrapper).each(function () {
    jq2(this).parent().before(this);
});
