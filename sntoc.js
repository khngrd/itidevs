jQuery.tableOfContents =                                                                   
    function (tocList) {                                                                   
    jQuery(tocList).empty();                                                            
    var item = null;                                                             
    var list = null;     
    var header = ('h3');
    var headers = $('#aak-kb-article').find(':header');
    var index = 0;    

    jQuery(headers).each(function() {                                                      

        var anchor = "<a name='" + index + "'></a>";                                   
        jQuery(this).before(anchor);                                                        

        var li     = "<li style='font-family:\"SourceSansPro\", Helvetica, Arial, sans-serif; list-style-type:none; list-style-position: outside; font-size:14px;'><a href='#" + index + "'>" + 
                jQuery(this).text() + "</a></li>";   

        if( jQuery(this).is(header) ){                                                        
            list = jQuery('<ul style="margin-top: 8px; padding-left: 15px;"></ul>');                                               
            item = jQuery(li);                                                        
            item.append(list);                                             
            item.appendTo(tocList);                                              
        } else {                                                                       
            list.append(li);                                                     
        }                                                                              
        index++;                                                                       
    });                                                                                
} 

$('.kb-container-column.col-md-3').append(''+
    //'<div id="toc" class="panel panel-primary b" style="border-radius:0; border:0; box-shadow: none;">'+
    '<div id="toc" class="panel panel-primary b" style="position: relative;">'+
    '<div class="panel-heading">'+
    '<h1 class="h4 panel-title ng-binding">Index</h1>'+
    '</div><div class="panel-body">'+
    '<ul id="kb-article-toc" style="padding-left:0; list-style-type: none; position: absolute; margin-top:10px !important;"></ul>'+
    '</div>'+
    '</div>'+
    '');

jQuery.tableOfContents("#kb-article-toc");
