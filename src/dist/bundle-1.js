var App=function(){var t,e=!1,o=!1,a=!1,i=!1,n=[],l="../assets/",s="global/img/",r="global/plugins/",c="global/css/",d={blue:"#89C4F4",red:"#F3565D",green:"#1bbc9b",purple:"#9b59b6",grey:"#95a5a6",yellow:"#F8CB00"},p=function(){"rtl"===$("body").css("direction")&&(e=!0),o=!!navigator.userAgent.match(/MSIE 8.0/),a=!!navigator.userAgent.match(/MSIE 9.0/),i=!!navigator.userAgent.match(/MSIE 10.0/),i&&$("html").addClass("ie10"),(i||a||o)&&$("html").addClass("ie")},h=function(){for(var t=0;t<n.length;t++){var e=n[t];e.call()}},u=function(){var t,e=$(window).width();if(o){var a;$(window).resize(function(){a!=document.documentElement.clientHeight&&(t&&clearTimeout(t),t=setTimeout(function(){h()},50),a=document.documentElement.clientHeight)})}else $(window).resize(function(){$(window).width()!=e&&(e=$(window).width(),t&&clearTimeout(t),t=setTimeout(function(){h()},50))})},f=function(){$("body").on("click",".portlet > .portlet-title > .tools > a.remove",function(t){t.preventDefault();var e=$(this).closest(".portlet");$("body").hasClass("page-portlet-fullscreen")&&$("body").removeClass("page-portlet-fullscreen"),e.find(".portlet-title .fullscreen").tooltip("destroy"),e.find(".portlet-title > .tools > .reload").tooltip("destroy"),e.find(".portlet-title > .tools > .remove").tooltip("destroy"),e.find(".portlet-title > .tools > .config").tooltip("destroy"),e.find(".portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand").tooltip("destroy"),e.remove()}),$("body").on("click",".portlet > .portlet-title .fullscreen",function(t){t.preventDefault();var e=$(this).closest(".portlet");if(e.hasClass("portlet-fullscreen"))$(this).removeClass("on"),e.removeClass("portlet-fullscreen"),$("body").removeClass("page-portlet-fullscreen"),e.children(".portlet-body").css("height","auto");else{var o=App.getViewPort().height-e.children(".portlet-title").outerHeight()-parseInt(e.children(".portlet-body").css("padding-top"))-parseInt(e.children(".portlet-body").css("padding-bottom"));$(this).addClass("on"),e.addClass("portlet-fullscreen"),$("body").addClass("page-portlet-fullscreen"),e.children(".portlet-body").css("height",o)}}),$("body").on("click",".portlet > .portlet-title > .tools > a.reload",function(t){t.preventDefault();var e=$(this).closest(".portlet").children(".portlet-body"),o=$(this).attr("data-url"),a=$(this).attr("data-error-display");o?(App.blockUI({target:e,animate:!0,overlayColor:"none"}),$.ajax({type:"GET",cache:!1,url:o,dataType:"html",success:function(t){App.unblockUI(e),e.html(t),App.initAjax()},error:function(t,o,i){App.unblockUI(e);var n="Error on reloading the content. Please check your connection and try again.";"toastr"==a&&toastr?toastr.error(n):"notific8"==a&&$.notific8?($.notific8("zindex",11500),$.notific8(n,{theme:"ruby",life:3e3})):alert(n)}})):(App.blockUI({target:e,animate:!0,overlayColor:"none"}),window.setTimeout(function(){App.unblockUI(e)},1e3))}),$('.portlet .portlet-title a.reload[data-load="true"]').click(),$("body").on("click",".portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand",function(t){t.preventDefault();var e=$(this).closest(".portlet").children(".portlet-body");$(this).hasClass("collapse")?($(this).removeClass("collapse").addClass("expand"),e.slideUp(200)):($(this).removeClass("expand").addClass("collapse"),e.slideDown(200))})},b=function(){if($("body").on("click",".md-checkbox > label, .md-radio > label",function(){var t=$(this),e=$(this).children("span:first-child");e.addClass("inc");var o=e.clone(!0);e.before(o),$("."+e.attr("class")+":last",t).remove()}),$("body").hasClass("page-md")){var t,e,o,a,i;$("body").on("click","a.btn, button.btn, input.btn, label.btn",function(n){t=$(this),0==t.find(".md-click-circle").length&&t.prepend("<span class='md-click-circle'></span>"),e=t.find(".md-click-circle"),e.removeClass("md-click-animate"),e.height()||e.width()||(o=Math.max(t.outerWidth(),t.outerHeight()),e.css({height:o,width:o})),a=n.pageX-t.offset().left-e.width()/2,i=n.pageY-t.offset().top-e.height()/2,e.css({top:i+"px",left:a+"px"}).addClass("md-click-animate"),setTimeout(function(){e.remove()},1e3)})}var n=function(t){""!=t.val()?t.addClass("edited"):t.removeClass("edited")};$("body").on("keydown",".form-md-floating-label .form-control",function(t){n($(this))}),$("body").on("blur",".form-md-floating-label .form-control",function(t){n($(this))}),$(".form-md-floating-label .form-control").each(function(){$(this).val().length>0&&$(this).addClass("edited")})},g=function(){$().iCheck&&$(".icheck").each(function(){var t=$(this).attr("data-checkbox")?$(this).attr("data-checkbox"):"icheckbox_minimal-grey",e=$(this).attr("data-radio")?$(this).attr("data-radio"):"iradio_minimal-grey";t.indexOf("_line")>-1||e.indexOf("_line")>-1?$(this).iCheck({checkboxClass:t,radioClass:e,insert:'<div class="icheck_line-icon"></div>'+$(this).attr("data-label")}):$(this).iCheck({checkboxClass:t,radioClass:e})})},m=function(){$().bootstrapSwitch&&$(".make-switch").bootstrapSwitch()},v=function(){$().confirmation&&$("[data-toggle=confirmation]").confirmation({btnOkClass:"btn btn-sm btn-success",btnCancelClass:"btn btn-sm btn-danger"})},y=function(){$("body").on("shown.bs.collapse",".accordion.scrollable",function(t){App.scrollTo($(t.target))})},C=function(){if(encodeURI(location.hash)){var t=encodeURI(location.hash.substr(1));$('a[href="#'+t+'"]').parents(".tab-pane:hidden").each(function(){var t=$(this).attr("id");$('a[href="#'+t+'"]').click()}),$('a[href="#'+t+'"]').click()}$().tabdrop&&$(".tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs").tabdrop({text:'<i class="fa fa-ellipsis-v"></i>&nbsp;<i class="fa fa-angle-down"></i>'})},w=function(){$("body").on("hide.bs.modal",function(){$(".modal:visible").size()>1&&$("html").hasClass("modal-open")===!1?$("html").addClass("modal-open"):$(".modal:visible").size()<=1&&$("html").removeClass("modal-open")}),$("body").on("show.bs.modal",".modal",function(){$(this).hasClass("modal-scroll")&&$("body").addClass("modal-open-noscroll")}),$("body").on("hidden.bs.modal",".modal",function(){$("body").removeClass("modal-open-noscroll")}),$("body").on("hidden.bs.modal",".modal:not(.modal-cached)",function(){$(this).removeData("bs.modal")})},x=function(){$(".tooltips").tooltip(),$(".portlet > .portlet-title .fullscreen").tooltip({trigger:"hover",container:"body",title:"Fullscreen"}),$(".portlet > .portlet-title > .tools > .reload").tooltip({trigger:"hover",container:"body",title:"Reload"}),$(".portlet > .portlet-title > .tools > .remove").tooltip({trigger:"hover",container:"body",title:"Remove"}),$(".portlet > .portlet-title > .tools > .config").tooltip({trigger:"hover",container:"body",title:"Settings"}),$(".portlet > .portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand").tooltip({trigger:"hover",container:"body",title:"Collapse/Expand"})},k=function(){$("body").on("click",".dropdown-menu.hold-on-click",function(t){t.stopPropagation()})},I=function(){$("body").on("click",'[data-close="alert"]',function(t){$(this).parent(".alert").hide(),$(this).closest(".note").hide(),t.preventDefault()}),$("body").on("click",'[data-close="note"]',function(t){$(this).closest(".note").hide(),t.preventDefault()}),$("body").on("click",'[data-remove="note"]',function(t){$(this).closest(".note").remove(),t.preventDefault()})},A=function(){"function"==typeof autosize&&autosize(document.querySelectorAll("textarea.autosizeme"))},S=function(){$(".popovers").popover(),$(document).on("click.bs.popover.data-api",function(e){t&&t.popover("hide")})},z=function(){App.initSlimScroll(".scroller")},P=function(){jQuery.fancybox&&$(".fancybox-button").size()>0&&$(".fancybox-button").fancybox({groupAttr:"data-rel",prevEffect:"none",nextEffect:"none",closeBtn:!0,helpers:{title:{type:"inside"}}})},T=function(){$().counterUp&&$("[data-counter='counterup']").counterUp({delay:10,time:1e3})},D=function(){(o||a)&&$("input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)").each(function(){var t=$(this);""===t.val()&&""!==t.attr("placeholder")&&t.addClass("placeholder").val(t.attr("placeholder")),t.focus(function(){t.val()==t.attr("placeholder")&&t.val("")}),t.blur(function(){""!==t.val()&&t.val()!=t.attr("placeholder")||t.val(t.attr("placeholder"))})})},U=function(){$().select2&&($.fn.select2.defaults.set("theme","bootstrap"),$(".select2me").select2({placeholder:"Select",width:"auto",allowClear:!0}))},E=function(){$("[data-auto-height]").each(function(){var t=$(this),e=$("[data-height]",t),o=0,a=t.attr("data-mode"),i=parseInt(t.attr("data-offset")?t.attr("data-offset"):0);e.each(function(){"height"==$(this).attr("data-height")?$(this).css("height",""):$(this).css("min-height","");var t="base-height"==a?$(this).outerHeight():$(this).outerHeight(!0);t>o&&(o=t)}),o+=i,e.each(function(){"height"==$(this).attr("data-height")?$(this).css("height",o):$(this).css("min-height",o)}),t.attr("data-related")&&$(t.attr("data-related")).css("height",t.height())})};return{init:function(){p(),u(),b(),g(),m(),z(),P(),U(),f(),I(),k(),C(),x(),S(),y(),w(),v(),A(),T(),this.addResizeHandler(E),D()},initAjax:function(){g(),m(),z(),U(),P(),k(),x(),S(),y(),v()},initComponents:function(){this.initAjax()},setLastPopedPopover:function(e){t=e},addResizeHandler:function(t){n.push(t)},runResizeHandlers:function(){h()},scrollTo:function(t,e){var o=t&&t.size()>0?t.offset().top:0;t&&($("body").hasClass("page-header-fixed")?o-=$(".page-header").height():$("body").hasClass("page-header-top-fixed")?o-=$(".page-header-top").height():$("body").hasClass("page-header-menu-fixed")&&(o-=$(".page-header-menu").height()),o+=e?e:-1*t.height()),$("html,body").animate({scrollTop:o},"slow")},initSlimScroll:function(t){$().slimScroll&&$(t).each(function(){if(!$(this).attr("data-initialized")){var t;t=$(this).attr("data-height")?$(this).attr("data-height"):$(this).css("height"),$(this).slimScroll({allowPageScroll:!0,size:"7px",color:$(this).attr("data-handle-color")?$(this).attr("data-handle-color"):"#bbb",wrapperClass:$(this).attr("data-wrapper-class")?$(this).attr("data-wrapper-class"):"slimScrollDiv",railColor:$(this).attr("data-rail-color")?$(this).attr("data-rail-color"):"#eaeaea",position:e?"left":"right",height:t,alwaysVisible:"1"==$(this).attr("data-always-visible"),railVisible:"1"==$(this).attr("data-rail-visible"),disableFadeOut:!0}),$(this).attr("data-initialized","1")}})},destroySlimScroll:function(t){$().slimScroll&&$(t).each(function(){if("1"===$(this).attr("data-initialized")){$(this).removeAttr("data-initialized"),$(this).removeAttr("style");var t={};$(this).attr("data-handle-color")&&(t["data-handle-color"]=$(this).attr("data-handle-color")),$(this).attr("data-wrapper-class")&&(t["data-wrapper-class"]=$(this).attr("data-wrapper-class")),$(this).attr("data-rail-color")&&(t["data-rail-color"]=$(this).attr("data-rail-color")),$(this).attr("data-always-visible")&&(t["data-always-visible"]=$(this).attr("data-always-visible")),$(this).attr("data-rail-visible")&&(t["data-rail-visible"]=$(this).attr("data-rail-visible")),$(this).slimScroll({wrapperClass:$(this).attr("data-wrapper-class")?$(this).attr("data-wrapper-class"):"slimScrollDiv",destroy:!0});var e=$(this);$.each(t,function(t,o){e.attr(t,o)})}})},scrollTop:function(){App.scrollTo()},blockUI:function(t){t=$.extend(!0,{},t);var e="";if(e=t.animate?'<div class="loading-message '+(t.boxed?"loading-message-boxed":"")+'"><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>':t.iconOnly?'<div class="loading-message '+(t.boxed?"loading-message-boxed":"")+'"><img src="'+this.getGlobalImgPath()+'loading-spinner-grey.gif" align=""></div>':t.textOnly?'<div class="loading-message '+(t.boxed?"loading-message-boxed":"")+'"><span>&nbsp;&nbsp;'+(t.message?t.message:"LOADING...")+"</span></div>":'<div class="loading-message '+(t.boxed?"loading-message-boxed":"")+'"><img src="'+this.getGlobalImgPath()+'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;'+(t.message?t.message:"LOADING...")+"</span></div>",t.target){var o=$(t.target);o.height()<=$(window).height()&&(t.cenrerY=!0),o.block({message:e,baseZ:t.zIndex?t.zIndex:1e3,centerY:void 0!==t.cenrerY?t.cenrerY:!1,css:{top:"10%",border:"0",padding:"0",backgroundColor:"none"},overlayCSS:{backgroundColor:t.overlayColor?t.overlayColor:"#555",opacity:t.boxed?.05:.1,cursor:"wait"}})}else $.blockUI({message:e,baseZ:t.zIndex?t.zIndex:1e3,css:{border:"0",padding:"0",backgroundColor:"none"},overlayCSS:{backgroundColor:t.overlayColor?t.overlayColor:"#555",opacity:t.boxed?.05:.1,cursor:"wait"}})},unblockUI:function(t){t?$(t).unblock({onUnblock:function(){$(t).css("position",""),$(t).css("zoom","")}}):$.unblockUI()},startPageLoading:function(t){t&&t.animate?($(".page-spinner-bar").remove(),$("body").append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')):($(".page-loading").remove(),$("body").append('<div class="page-loading"><img src="'+this.getGlobalImgPath()+'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>'+(t&&t.message?t.message:"Loading...")+"</span></div>"))},stopPageLoading:function(){$(".page-loading, .page-spinner-bar").remove()},alert:function(t){t=$.extend(!0,{container:"",place:"append",type:"success",message:"",close:!0,reset:!0,focus:!0,closeInSeconds:0,icon:""},t);var e=App.getUniqueID("App_alert"),o='<div id="'+e+'" class="custom-alerts alert alert-'+t.type+' fade in">'+(t.close?'<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>':"")+(""!==t.icon?'<i class="fa-lg fa fa-'+t.icon+'"></i>  ':"")+t.message+"</div>";return t.reset&&$(".custom-alerts").remove(),t.container?"append"==t.place?$(t.container).append(o):$(t.container).prepend(o):1===$(".page-fixed-main-content").size()?$(".page-fixed-main-content").prepend(o):($("body").hasClass("page-container-bg-solid")||$("body").hasClass("page-content-white"))&&0===$(".page-head").size()?$(".page-title").after(o):$(".page-bar").size()>0?$(".page-bar").after(o):$(".page-breadcrumb, .breadcrumbs").after(o),t.focus&&App.scrollTo($("#"+e)),t.closeInSeconds>0&&setTimeout(function(){$("#"+e).remove()},1e3*t.closeInSeconds),e},initFancybox:function(){P()},getActualVal:function(t){return t=$(t),t.val()===t.attr("placeholder")?"":t.val()},getURLParameter:function(t){var e,o,a=window.location.search.substring(1),i=a.split("&");for(e=0;e<i.length;e++)if(o=i[e].split("="),o[0]==t)return unescape(o[1]);return null},isTouchDevice:function(){try{return document.createEvent("TouchEvent"),!0}catch(t){return!1}},getViewPort:function(){var t=window,e="inner";return"innerWidth"in window||(e="client",t=document.documentElement||document.body),{width:t[e+"Width"],height:t[e+"Height"]}},getUniqueID:function(t){return"prefix_"+Math.floor(Math.random()*(new Date).getTime())},isIE8:function(){return o},isIE9:function(){return a},isRTL:function(){return e},isAngularJsApp:function(){return"undefined"!=typeof angular},getAssetsPath:function(){return l},setAssetsPath:function(t){l=t},setGlobalImgPath:function(t){s=t},getGlobalImgPath:function(){return l+s},setGlobalPluginsPath:function(t){r=t},getGlobalPluginsPath:function(){return l+r},getGlobalCssPath:function(){return l+c},getBrandColor:function(t){return d[t]?d[t]:""},getResponsiveBreakpoint:function(t){var e={xs:480,sm:768,md:992,lg:1200};return e[t]?e[t]:0}}}();jQuery(document).ready(function(){App.init()});
var Layout=function(){var e="layouts/layout/img/",a="layouts/layout/css/",t=App.getResponsiveBreakpoint("md"),i=[],s=[],o=function(){var e,a=$(".page-content"),i=$(".page-sidebar"),s=$("body");if(s.hasClass("page-footer-fixed")===!0&&s.hasClass("page-sidebar-fixed")===!1){var o=App.getViewPort().height-$(".page-footer").outerHeight()-$(".page-header").outerHeight(),n=i.outerHeight();n>o&&(o=n+$(".page-footer").outerHeight()),a.height()<o&&a.css("min-height",o)}else{if(s.hasClass("page-sidebar-fixed"))e=l(),s.hasClass("page-footer-fixed")===!1&&(e-=$(".page-footer").outerHeight());else{var r=$(".page-header").outerHeight(),d=$(".page-footer").outerHeight();e=App.getViewPort().width<t?App.getViewPort().height-r-d:i.height()+20,e+r+d<=App.getViewPort().height&&(e=App.getViewPort().height-r-d)}a.css("min-height",e)}},n=function(e,a,i){var s=location.hash.toLowerCase(),o=$(".page-sidebar-menu");if("click"===e||"set"===e?a=$(a):"match"===e&&o.find("li > a").each(function(){var e=$(this).attr("ui-sref");if(i&&e){if(i.is(e))return void(a=$(this))}else{var t=$(this).attr("href");if(t&&(t=t.toLowerCase(),t.length>1&&s.substr(1,t.length-1)==t.substr(1)))return void(a=$(this))}}),a&&0!=a.size()&&"javascript:;"!=a.attr("href")&&"javascript:;"!=a.attr("ui-sref")&&"#"!=a.attr("href")&&"#"!=a.attr("ui-sref")){parseInt(o.data("slide-speed")),o.data("keep-expanded");o.hasClass("page-sidebar-menu-hover-submenu")===!1?o.find("li.nav-item.open").each(function(){var e=!1;$(this).find("li").each(function(){var t=$(this).attr("ui-sref");if(i&&t){if(i.is(t))return void(e=!0)}else if($(this).find(" > a").attr("href")===a.attr("href"))return void(e=!0)}),e!==!0&&($(this).removeClass("open"),$(this).find("> a > .arrow.open").removeClass("open"),$(this).find("> .sub-menu").slideUp())}):o.find("li.open").removeClass("open"),o.find("li.active").removeClass("active"),o.find("li > a > .selected").remove(),a.parents("li").each(function(){$(this).addClass("active"),$(this).find("> a > span.arrow").addClass("open"),1===$(this).parent("ul.page-sidebar-menu").size()&&$(this).find("> a").append('<span class="selected"></span>'),1===$(this).children("ul.sub-menu").size()&&$(this).addClass("open")}),"click"===e&&App.getViewPort().width<t&&$(".page-sidebar").hasClass("in")&&$(".page-header .responsive-toggler").click()}},r=function(){$(".page-sidebar-mobile-offcanvas .responsive-toggler").click(function(e){$("body").toggleClass("page-sidebar-mobile-offcanvas-open"),e.preventDefault(),e.stopPropagation()}),$("body").hasClass("page-sidebar-mobile-offcanvas")&&$(document).on("click",function(e){$("body").hasClass("page-sidebar-mobile-offcanvas-open")&&0===$(e.target).closest(".page-sidebar-mobile-offcanvas .responsive-toggler").length&&0===$(e.target).closest(".page-sidebar-wrapper").length&&($("body").removeClass("page-sidebar-mobile-offcanvas-open"),e.preventDefault(),e.stopPropagation())}),$(".page-sidebar-menu").on("click","li > a.nav-toggle, li > a > span.nav-toggle",function(e){var a=$(this).closest(".nav-item").children(".nav-link");if(!(App.getViewPort().width>=t&&!$(".page-sidebar-menu").attr("data-initialized")&&$("body").hasClass("page-sidebar-closed")&&1===a.parent("li").parent(".page-sidebar-menu").size())){var i=a.next().hasClass("sub-menu");if(!(App.getViewPort().width>=t&&1===a.parents(".page-sidebar-menu-hover-submenu").size())){if(i===!1)return void(App.getViewPort().width<t&&$(".page-sidebar").hasClass("in")&&$(".page-header .responsive-toggler").click());var s=a.parent().parent(),n=a,r=$(".page-sidebar-menu"),l=a.next(),d=r.data("auto-scroll"),p=parseInt(r.data("slide-speed")),c=r.data("keep-expanded");c||(s.children("li.open").children("a").children(".arrow").removeClass("open"),s.children("li.open").children(".sub-menu:not(.always-open)").slideUp(p),s.children("li.open").removeClass("open"));var h=-200;l.is(":visible")?($(".arrow",n).removeClass("open"),n.parent().removeClass("open"),l.slideUp(p,function(){d===!0&&$("body").hasClass("page-sidebar-closed")===!1&&($("body").hasClass("page-sidebar-fixed")?r.slimScroll({scrollTo:n.position().top}):App.scrollTo(n,h)),o()})):i&&($(".arrow",n).addClass("open"),n.parent().addClass("open"),l.slideDown(p,function(){d===!0&&$("body").hasClass("page-sidebar-closed")===!1&&($("body").hasClass("page-sidebar-fixed")?r.slimScroll({scrollTo:n.position().top}):App.scrollTo(n,h)),o()})),e.preventDefault()}}}),App.isAngularJsApp()&&$(".page-sidebar-menu li > a").on("click",function(e){App.getViewPort().width<t&&$(this).next().hasClass("sub-menu")===!1&&$(".page-header .responsive-toggler").click()}),$(".page-sidebar").on("click"," li > a.ajaxify",function(e){e.preventDefault(),App.scrollTop();var a=$(this).attr("href"),i=$(".page-sidebar ul");i.children("li.active").removeClass("active"),i.children("arrow.open").removeClass("open"),$(this).parents("li").each(function(){$(this).addClass("active"),$(this).children("a > span.arrow").addClass("open")}),$(this).parents("li").addClass("active"),App.getViewPort().width<t&&$(".page-sidebar").hasClass("in")&&$(".page-header .responsive-toggler").click(),Layout.loadAjaxContent(a,$(this))}),$(".page-content").on("click",".ajaxify",function(e){e.preventDefault(),App.scrollTop();var a=$(this).attr("href");App.getViewPort().width<t&&$(".page-sidebar").hasClass("in")&&$(".page-header .responsive-toggler").click(),Layout.loadAjaxContent(a)}),$(document).on("click",".page-header-fixed-mobile .page-header .responsive-toggler",function(){App.scrollTop()}),p(),$(".page-sidebar").on("click",".sidebar-search .remove",function(e){e.preventDefault(),$(".sidebar-search").removeClass("open")}),$(".page-sidebar .sidebar-search").on("keypress","input.form-control",function(e){return 13==e.which?($(".sidebar-search").submit(),!1):void 0}),$(".sidebar-search .submit").on("click",function(e){e.preventDefault(),$("body").hasClass("page-sidebar-closed")&&$(".sidebar-search").hasClass("open")===!1?(1===$(".page-sidebar-fixed").size()&&$(".page-sidebar .sidebar-toggler").click(),$(".sidebar-search").addClass("open")):$(".sidebar-search").submit()}),0!==$(".sidebar-search").size()&&($(".sidebar-search .input-group").on("click",function(e){e.stopPropagation()}),$("body").on("click",function(){$(".sidebar-search").hasClass("open")&&$(".sidebar-search").removeClass("open")}))},l=function(){var e=App.getViewPort().height-$(".page-header").outerHeight(!0);return $("body").hasClass("page-footer-fixed")&&(e-=$(".page-footer").outerHeight()),e},d=function(){var e=$(".page-sidebar-menu");return o(),0===$(".page-sidebar-fixed").size()?void App.destroySlimScroll(e):void(App.getViewPort().width>=t&&!$("body").hasClass("page-sidebar-menu-not-fixed")&&(e.attr("data-height",l()),App.destroySlimScroll(e),App.initSlimScroll(e),o()))},p=function(){$("body").hasClass("page-sidebar-fixed")&&$(".page-sidebar").on("mouseenter",function(){$("body").hasClass("page-sidebar-closed")&&$(this).find(".page-sidebar-menu").removeClass("page-sidebar-menu-closed")}).on("mouseleave",function(){$("body").hasClass("page-sidebar-closed")&&$(this).find(".page-sidebar-menu").addClass("page-sidebar-menu-closed")})},c=function(){$("body").on("click",".sidebar-toggler",function(e){var a=$("body"),t=$(".page-sidebar"),i=$(".page-sidebar-menu");$(".sidebar-search",t).removeClass("open"),a.hasClass("page-sidebar-closed")?(a.removeClass("page-sidebar-closed"),i.removeClass("page-sidebar-menu-closed"),Cookies&&Cookies.set("sidebar_closed","0")):(a.addClass("page-sidebar-closed"),i.addClass("page-sidebar-menu-closed"),a.hasClass("page-sidebar-fixed")&&i.trigger("mouseleave"),Cookies&&Cookies.set("sidebar_closed","1")),$(window).trigger("resize")})},h=function(){$(".page-header").on("click",'.hor-menu a[data-toggle="tab"]',function(e){e.preventDefault();var a=$(".hor-menu .nav"),t=a.find("li.current");$("li.active",t).removeClass("active"),$(".selected",t).remove();var i=$(this).parents("li").last();i.addClass("current"),i.find("a:first").append('<span class="selected"></span>')}),$(".page-header").on("click",".search-form",function(e){$(this).addClass("open"),$(this).find(".form-control").focus(),$(".page-header .search-form .form-control").on("blur",function(e){$(this).closest(".search-form").removeClass("open"),$(this).unbind("blur")})}),$(".page-header").on("keypress",".hor-menu .search-form .form-control",function(e){return 13==e.which?($(this).closest(".search-form").submit(),!1):void 0}),$(".page-header").on("mousedown",".search-form.open .submit",function(e){e.preventDefault(),e.stopPropagation(),$(this).closest(".search-form").submit()}),$(document).on("click",".mega-menu-dropdown .dropdown-menu",function(e){e.stopPropagation()})},u=function(){$("body").on("shown.bs.tab",'a[data-toggle="tab"]',function(){o()})},g=function(){var e=300,a=500;navigator.userAgent.match(/iPhone|iPad|iPod/i)?$(window).bind("touchend touchcancel touchleave",function(t){$(this).scrollTop()>e?$(".scroll-to-top").fadeIn(a):$(".scroll-to-top").fadeOut(a)}):$(window).scroll(function(){$(this).scrollTop()>e?$(".scroll-to-top").fadeIn(a):$(".scroll-to-top").fadeOut(a)}),$(".scroll-to-top").click(function(e){return e.preventDefault(),$("html, body").animate({scrollTop:0},a),!1})},f=function(){$(".full-height-content").each(function(){var e,a=$(this);if(e=App.getViewPort().height-$(".page-header").outerHeight(!0)-$(".page-footer").outerHeight(!0)-$(".page-title").outerHeight(!0)-$(".page-bar").outerHeight(!0),a.hasClass("portlet")){var i=a.find(".portlet-body");App.destroySlimScroll(i.find(".full-height-content-body")),e=e-a.find(".portlet-title").outerHeight(!0)-parseInt(a.find(".portlet-body").css("padding-top"))-parseInt(a.find(".portlet-body").css("padding-bottom"))-5,App.getViewPort().width>=t&&a.hasClass("full-height-content-scrollable")?(e-=35,i.find(".full-height-content-body").css("height",e),App.initSlimScroll(i.find(".full-height-content-body"))):i.css("min-height",e)}else App.destroySlimScroll(a.find(".full-height-content-body")),App.getViewPort().width>=t&&a.hasClass("full-height-content-scrollable")?(e-=35,a.find(".full-height-content-body").css("height",e),App.initSlimScroll(a.find(".full-height-content-body"))):a.css("min-height",e)})};return{initHeader:function(){h()},setSidebarMenuActiveLink:function(e,a){n(e,a,null)},setAngularJsSidebarMenuActiveLink:function(e,a,t){n(e,a,t)},initSidebar:function(e){d(),r(),c(),App.isAngularJsApp()&&n("match",null,e),App.addResizeHandler(d)},initContent:function(){f(),u(),App.addResizeHandler(o),App.addResizeHandler(f)},initFooter:function(){g()},init:function(){this.initHeader(),this.initSidebar(null),this.initContent(),this.initFooter()},loadAjaxContent:function(e,a){var t=$(".page-content .page-content-body");App.startPageLoading({animate:!0}),$.ajax({type:"GET",cache:!1,url:e,dataType:"html",success:function(e){App.stopPageLoading(),t.html(e);for(var s=0;s<i.length;s++)i[s].call(e);a.size()>0&&0===a.parents("li.open").size()&&$(".page-sidebar-menu > li.open > a").click(),Layout.fixContentHeight(),App.initAjax()},error:function(e,a,i){App.stopPageLoading(),t.html("<h4>Could not load the requested content.</h4>");for(var o=0;o<s.length;o++)s[o].call(e)}})},addAjaxContentSuccessCallback:function(e){i.push(e)},addAjaxContentErrorCallback:function(e){s.push(e)},fixContentHeight:function(){o()},initFixedSidebarHoverEffect:function(){p()},initFixedSidebar:function(){d()},getLayoutImgPath:function(){return App.getAssetsPath()+e},getLayoutCssPath:function(){return App.getAssetsPath()+a}}}();App.isAngularJsApp()===!1&&jQuery(document).ready(function(){Layout.init()});
var QuickSidebar=function(){var i=function(){$(".dropdown-quick-sidebar-toggler a, .page-quick-sidebar-toggler, .quick-sidebar-toggler").click(function(i){$("body").toggleClass("page-quick-sidebar-open")})},a=function(){var i=$(".page-quick-sidebar-wrapper"),a=i.find(".page-quick-sidebar-chat"),e=function(){var e,t=i.find(".page-quick-sidebar-chat-users");e=i.height()-i.find(".nav-tabs").outerHeight(!0),App.destroySlimScroll(t),t.attr("data-height",e),App.initSlimScroll(t);var r=a.find(".page-quick-sidebar-chat-user-messages"),s=e-a.find(".page-quick-sidebar-chat-user-form").outerHeight(!0);s-=a.find(".page-quick-sidebar-nav").outerHeight(!0),App.destroySlimScroll(r),r.attr("data-height",s),App.initSlimScroll(r)};e(),App.addResizeHandler(e),i.find(".page-quick-sidebar-chat-users .media-list > .media").click(function(){a.addClass("page-quick-sidebar-content-item-shown")}),i.find(".page-quick-sidebar-chat-user .page-quick-sidebar-back-to-list").click(function(){a.removeClass("page-quick-sidebar-content-item-shown")});var t=function(i){i.preventDefault();var e=a.find(".page-quick-sidebar-chat-user-messages"),t=a.find(".page-quick-sidebar-chat-user-form .form-control"),r=t.val();if(0!==r.length){var s=function(i,a,e,t,r){var s="";return s+='<div class="post '+i+'">',s+='<img class="avatar" alt="" src="'+Layout.getLayoutImgPath()+t+'.jpg"/>',s+='<div class="message">',s+='<span class="arrow"></span>',s+='<a href="#" class="name">Bob Nilson</a>&nbsp;',s+='<span class="datetime">'+a+"</span>",s+='<span class="body">',s+=r,s+="</span>",s+="</div>",s+="</div>"},n=new Date,c=s("out",n.getHours()+":"+n.getMinutes(),"Bob Nilson","avatar3",r);c=$(c),e.append(c),e.slimScroll({scrollTo:"1000000px"}),t.val(""),setTimeout(function(){var i=new Date,a=s("in",i.getHours()+":"+i.getMinutes(),"Ella Wong","avatar2","Lorem ipsum doloriam nibh...");a=$(a),e.append(a),e.slimScroll({scrollTo:"1000000px"})},3e3)}};a.find(".page-quick-sidebar-chat-user-form .btn").click(t),a.find(".page-quick-sidebar-chat-user-form .form-control").keypress(function(i){return 13==i.which?(t(i),!1):void 0})},e=function(){var i=$(".page-quick-sidebar-wrapper"),a=function(){var a,e=i.find(".page-quick-sidebar-alerts-list");a=i.height()-80-i.find(".nav-justified > .nav-tabs").outerHeight(),App.destroySlimScroll(e),e.attr("data-height",a),App.initSlimScroll(e)};a(),App.addResizeHandler(a)},t=function(){var i=$(".page-quick-sidebar-wrapper"),a=function(){var a,e=i.find(".page-quick-sidebar-settings-list");a=i.height()-80-i.find(".nav-justified > .nav-tabs").outerHeight(),App.destroySlimScroll(e),e.attr("data-height",a),App.initSlimScroll(e)};a(),App.addResizeHandler(a)};return{init:function(){i(),a(),e(),t()}}}();App.isAngularJsApp()===!1&&jQuery(document).ready(function(){QuickSidebar.init()});
var QuickNav=function(){return{init:function(){if($(".quick-nav").length>0){var i=$(".quick-nav");i.each(function(){var i=$(this),n=i.find(".quick-nav-trigger");n.on("click",function(n){n.preventDefault(),i.toggleClass("nav-is-visible")})}),$(document).on("click",function(n){!$(n.target).is(".quick-nav-trigger")&&!$(n.target).is(".quick-nav-trigger span")&&i.removeClass("nav-is-visible")})}}}}();QuickNav.init();
var Demo=function(){var e=function(){var e=$(".theme-panel");$("body").hasClass("page-boxed")===!1&&$(".layout-option",e).val("fluid"),$(".sidebar-option",e).val("default"),$(".page-header-option",e).val("fixed"),$(".page-footer-option",e).val("default"),$(".sidebar-pos-option").attr("disabled")===!1&&$(".sidebar-pos-option",e).val(App.isRTL()?"right":"left");var a=function(){$("body").removeClass("page-boxed").removeClass("page-footer-fixed").removeClass("page-sidebar-fixed").removeClass("page-header-fixed").removeClass("page-sidebar-reversed"),$(".page-header > .page-header-inner").removeClass("container"),1===$(".page-container").parent(".container").size()&&$(".page-container").insertAfter("body > .clearfix"),1===$(".page-footer > .container").size()?$(".page-footer").html($(".page-footer > .container").html()):1===$(".page-footer").parent(".container").size()&&($(".page-footer").insertAfter(".page-container"),$(".scroll-to-top").insertAfter(".page-footer")),$(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark"),$("body > .container").remove()},o="",t=function(){var t=$(".layout-option",e).val(),i=$(".sidebar-option",e).val(),r=$(".page-header-option",e).val(),d=$(".page-footer-option",e).val(),s=$(".sidebar-pos-option",e).val(),n=$(".sidebar-style-option",e).val(),p=$(".sidebar-menu-option",e).val(),l=$(".page-header-top-dropdown-style-option",e).val();if("fixed"==i&&"default"==r&&(alert("Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar."),$(".page-header-option",e).val("fixed"),$(".sidebar-option",e).val("fixed"),i="fixed",r="fixed"),a(),"boxed"===t){$("body").addClass("page-boxed"),$(".page-header > .page-header-inner").addClass("container");$("body > .page-wrapper > .clearfix").after('<div class="container"></div>');$(".page-container").appendTo("body > .page-wrapper > .container"),"fixed"===d?$(".page-footer").html('<div class="container">'+$(".page-footer").html()+"</div>"):$(".page-footer").appendTo("body > .page-wrapper > .container")}o!=t&&App.runResizeHandlers(),o=t,"fixed"===r?($("body").addClass("page-header-fixed"),$(".page-header").removeClass("navbar-static-top").addClass("navbar-fixed-top")):($("body").removeClass("page-header-fixed"),$(".page-header").removeClass("navbar-fixed-top").addClass("navbar-static-top")),$("body").hasClass("page-full-width")===!1&&("fixed"===i?($("body").addClass("page-sidebar-fixed"),$("page-sidebar-menu").addClass("page-sidebar-menu-fixed"),$("page-sidebar-menu").removeClass("page-sidebar-menu-default"),Layout.initFixedSidebarHoverEffect()):($("body").removeClass("page-sidebar-fixed"),$("page-sidebar-menu").addClass("page-sidebar-menu-default"),$("page-sidebar-menu").removeClass("page-sidebar-menu-fixed"),$(".page-sidebar-menu").unbind("mouseenter").unbind("mouseleave"))),"dark"===l?$(".top-menu > .navbar-nav > li.dropdown").addClass("dropdown-dark"):$(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark"),"fixed"===d?$("body").addClass("page-footer-fixed"):$("body").removeClass("page-footer-fixed"),"light"===n?$(".page-sidebar-menu").addClass("page-sidebar-menu-light"):$(".page-sidebar-menu").removeClass("page-sidebar-menu-light"),"hover"===p?"fixed"==i?($(".sidebar-menu-option",e).val("accordion"),alert("Hover Sidebar Menu is not compatible with Fixed Sidebar Mode. Select Default Sidebar Mode Instead.")):$(".page-sidebar-menu").addClass("page-sidebar-menu-hover-submenu"):$(".page-sidebar-menu").removeClass("page-sidebar-menu-hover-submenu"),App.isRTL()?"left"===s?($("body").addClass("page-sidebar-reversed"),$("#frontend-link").tooltip("destroy").tooltip({placement:"right"})):($("body").removeClass("page-sidebar-reversed"),$("#frontend-link").tooltip("destroy").tooltip({placement:"left"})):"right"===s?($("body").addClass("page-sidebar-reversed"),$("#frontend-link").tooltip("destroy").tooltip({placement:"left"})):($("body").removeClass("page-sidebar-reversed"),$("#frontend-link").tooltip("destroy").tooltip({placement:"right"})),Layout.fixContentHeight(),Layout.initFixedSidebar()},i=function(e){var a=App.isRTL()?e+"-rtl":e;$("#style_color").attr("href",Layout.getLayoutCssPath()+"themes/"+a+".min.css"),"light2"==e?$(".page-logo img").attr("src",Layout.getLayoutImgPath()+"logo-invert.png"):$(".page-logo img").attr("src",Layout.getLayoutImgPath()+"logo.png")};$(".toggler",e).click(function(){$(".toggler").hide(),$(".toggler-close").show(),$(".theme-panel > .theme-options").show()}),$(".toggler-close",e).click(function(){$(".toggler").show(),$(".toggler-close").hide(),$(".theme-panel > .theme-options").hide()}),$(".theme-colors > ul > li",e).click(function(){var a=$(this).attr("data-style");i(a),$("ul > li",e).removeClass("current"),$(this).addClass("current")}),$("body").hasClass("page-boxed")&&$(".layout-option",e).val("boxed"),$("body").hasClass("page-sidebar-fixed")&&$(".sidebar-option",e).val("fixed"),$("body").hasClass("page-header-fixed")&&$(".page-header-option",e).val("fixed"),$("body").hasClass("page-footer-fixed")&&$(".page-footer-option",e).val("fixed"),$("body").hasClass("page-sidebar-reversed")&&$(".sidebar-pos-option",e).val("right"),$(".page-sidebar-menu").hasClass("page-sidebar-menu-light")&&$(".sidebar-style-option",e).val("light"),$(".page-sidebar-menu").hasClass("page-sidebar-menu-hover-submenu")&&$(".sidebar-menu-option",e).val("hover");$(".sidebar-option",e).val(),$(".page-header-option",e).val(),$(".page-footer-option",e).val(),$(".sidebar-pos-option",e).val(),$(".sidebar-style-option",e).val(),$(".sidebar-menu-option",e).val();$(".layout-option, .page-header-option, .page-header-top-dropdown-style-option, .sidebar-option, .page-footer-option, .sidebar-pos-option, .sidebar-style-option, .sidebar-menu-option",e).change(t)},a=function(e){var a="rounded"===e?"components-rounded":"components";a=App.isRTL()?a+"-rtl":a,$("#style_components").attr("href",App.getGlobalCssPath()+a+".min.css"),"undefined"!=typeof Cookies&&Cookies.set("layout-style-option",e)};return{init:function(){e(),$(".theme-panel .layout-style-option").change(function(){a($(this).val())}),"undefined"!=typeof Cookies&&"rounded"===Cookies.get("layout-style-option")&&(a(Cookies.get("layout-style-option")),$(".theme-panel .layout-style-option").val(Cookies.get("layout-style-option")))}}}();App.isAngularJsApp()===!1&&jQuery(document).ready(function(){Demo.init()});
var TableDatatablesManaged=function(){var e=function(){var e=$("#sample_1");e.dataTable({language:{aria:{sortAscending:": activate to sort column ascending",sortDescending:": activate to sort column descending"},emptyTable:"No data available in table",info:"Showing _START_ to _END_ of _TOTAL_ records",infoEmpty:"No records found",infoFiltered:"(filtered1 from _MAX_ total records)",lengthMenu:"Show _MENU_",search:"Search:",zeroRecords:"No matching records found",paginate:{previous:"Prev",next:"Next",last:"Last",first:"First"}},bStateSave:!0,lengthMenu:[[5,15,20,-1],[5,15,20,"All"]],pageLength:5,pagingType:"bootstrap_full_number",columnDefs:[{orderable:!1,targets:[0]},{searchable:!1,targets:[0]},{className:"dt-right"}],order:[[1,"asc"]]});jQuery("#sample_1_wrapper");e.find(".group-checkable").change(function(){var e=jQuery(this).attr("data-set"),t=jQuery(this).is(":checked");jQuery(e).each(function(){t?($(this).prop("checked",!0),$(this).parents("tr").addClass("active")):($(this).prop("checked",!1),$(this).parents("tr").removeClass("active"))})}),e.on("change","tbody tr .checkboxes",function(){$(this).parents("tr").toggleClass("active")})},t=function(){var e=$("#sample_1_2");e.dataTable({language:{aria:{sortAscending:": activate to sort column ascending",sortDescending:": activate to sort column descending"},emptyTable:"No data available in table",info:"Showing _START_ to _END_ of _TOTAL_ records",infoEmpty:"No records found",infoFiltered:"(filtered1 from _MAX_ total records)",lengthMenu:"Show _MENU_",search:"Search:",zeroRecords:"No matching records found",paginate:{previous:"Prev",next:"Next",last:"Last",first:"First"}},bStateSave:!1,lengthMenu:[[5,15,20,-1],[5,15,20,"All"]],pageLength:5,pagingType:"bootstrap_full_number",columnDefs:[{orderable:!1,targets:[0]},{searchable:!1,targets:[0]},{className:"dt-right"}],order:[[1,"asc"]],initComplete:function(){this.api().column(1).every(function(){var e=this,t=$('<select class="form-control input-sm"><option value="">Select</option></select>').appendTo($(e.footer()).empty()).on("change",function(){var t=$.fn.dataTable.util.escapeRegex($(this).val());e.search(t?"^"+t+"$":"",!0,!1).draw()});e.data().unique().sort().each(function(e,a){t.append('<option value="'+e+'">'+e+"</option>")})})}});jQuery("#sample_1_2_wrapper");e.find(".group-checkable").change(function(){var e=jQuery(this).attr("data-set"),t=jQuery(this).is(":checked");jQuery(e).each(function(){t?($(this).prop("checked",!0),$(this).parents("tr").addClass("active")):($(this).prop("checked",!1),$(this).parents("tr").removeClass("active"))})}),e.on("change","tbody tr .checkboxes",function(){$(this).parents("tr").toggleClass("active")})},a=function(){var e=$("#sample_2");e.dataTable({language:{aria:{sortAscending:": activate to sort column ascending",sortDescending:": activate to sort column descending"},emptyTable:"No data available in table",info:"Showing _START_ to _END_ of _TOTAL_ records",infoEmpty:"No records found",infoFiltered:"(filtered1 from _MAX_ total records)",lengthMenu:"Show _MENU_",search:"Search:",zeroRecords:"No matching records found",paginate:{previous:"Prev",next:"Next",last:"Last",first:"First"}},bStateSave:!0,pagingType:"bootstrap_extended",lengthMenu:[[5,15,20,-1],[5,15,20,"All"]],pageLength:5,columnDefs:[{orderable:!1,targets:[0]},{searchable:!1,targets:[0]}],order:[[1,"asc"]]});jQuery("#sample_2_wrapper");e.find(".group-checkable").change(function(){var e=jQuery(this).attr("data-set"),t=jQuery(this).is(":checked");jQuery(e).each(function(){t?$(this).prop("checked",!0):$(this).prop("checked",!1)})})},r=function(){var e=$("#sample_3");e.dataTable({language:{aria:{sortAscending:": activate to sort column ascending",sortDescending:": activate to sort column descending"},emptyTable:"No data available in table",info:"Showing _START_ to _END_ of _TOTAL_ records",infoEmpty:"No records found",infoFiltered:"(filtered1 from _MAX_ total records)",lengthMenu:"Show _MENU_",search:"Search:",zeroRecords:"No matching records found",paginate:{previous:"Prev",next:"Next",last:"Last",first:"First"}},bStateSave:!0,lengthMenu:[[6,15,20,-1],[6,15,20,"All"]],pageLength:6,columnDefs:[{orderable:!1,targets:[0]},{searchable:!1,targets:[0]}],order:[[1,"asc"]]});jQuery("#sample_3_wrapper");e.find(".group-checkable").change(function(){var e=jQuery(this).attr("data-set"),t=jQuery(this).is(":checked");jQuery(e).each(function(){t?$(this).prop("checked",!0):$(this).prop("checked",!1)})})},o=function(){var e=$("#sample_4");e.dataTable({language:{aria:{sortAscending:": activate to sort column ascending",sortDescending:": activate to sort column descending"},emptyTable:"No data available in table",info:"Showing _START_ to _END_ of _TOTAL_ records",infoEmpty:"No records found",infoFiltered:"(filtered1 from _MAX_ total records)",lengthMenu:"Show _MENU_",search:"Search:",zeroRecords:"No matching records found",paginate:{previous:"Prev",next:"Next",last:"Last",first:"First"}},bStateSave:!0,lengthMenu:[[6,15,20,-1],[6,15,20,"All"]],pageLength:6,columnDefs:[{orderable:!1,targets:[0]},{searchable:!1,targets:[0]}],order:[[1,"asc"]]});jQuery("#sample_4_wrapper");e.find(".group-checkable").change(function(){var e=jQuery(this).attr("data-set"),t=jQuery(this).is(":checked");jQuery(e).each(function(){t?$(this).prop("checked",!0):$(this).prop("checked",!1)})})},n=function(){var e=$("#sample_5");e.dataTable({language:{aria:{sortAscending:": activate to sort column ascending",sortDescending:": activate to sort column descending"},emptyTable:"No data available in table",info:"Showing _START_ to _END_ of _TOTAL_ records",infoEmpty:"No records found",infoFiltered:"(filtered1 from _MAX_ total records)",lengthMenu:"Show _MENU_",search:"Search:",zeroRecords:"No matching records found",paginate:{previous:"Prev",next:"Next",last:"Last",first:"First"}},footerCallback:function(e,t,a,r,o){var n=this.api(),s=function(e){return"string"==typeof e?1*e.replace(/[\$,]/g,""):"number"==typeof e?e:0};total=n.column(3).data().reduce(function(e,t){return s(e)+s(t)},0),pageTotal=n.column(3,{page:"current"}).data().reduce(function(e,t){return s(e)+s(t)},0),$(n.column(3).footer()).html("$"+pageTotal+" ( $"+total+" total)")},bStateSave:!0,lengthMenu:[[6,15,20,-1],[6,15,20,"All"]],pageLength:6,columnDefs:[{orderable:!1,targets:[0]},{searchable:!1,targets:[0]}],order:[[1,"asc"]]});jQuery("#sample_5_wrapper");e.find(".group-checkable").change(function(){var e=jQuery(this).attr("data-set"),t=jQuery(this).is(":checked");jQuery(e).each(function(){t?$(this).prop("checked",!0):$(this).prop("checked",!1)})})};return{init:function(){jQuery().dataTable&&(e(),t(),a(),r(),o(),n())}}}();App.isAngularJsApp()===!1&&jQuery(document).ready(function(){TableDatatablesManaged.init()});
!function(){angular.module("angular-jwt",["angular-jwt.options","angular-jwt.interceptor","angular-jwt.jwt","angular-jwt.authManager"]),angular.module("angular-jwt.authManager",[]).provider("authManager",function(){this.$get=["$rootScope","$injector","$location","jwtHelper","jwtInterceptor","jwtOptions",function(t,e,r,n,a,i){function o(t){var r=null;return r=Array.isArray(t)?e.invoke(t,this,{options:null}):t()}function u(t){if(Array.isArray(t)||angular.isFunction(t))return e.invoke(t,p,{});throw new Error("unauthenticatedRedirector must be a function")}function s(){var t=o(p.tokenGetter);return t?!n.isTokenExpired(t):void 0}function h(){t.isAuthenticated=!0}function c(){t.isAuthenticated=!1}function l(){t.$on("$locationChangeStart",function(){var e=o(p.tokenGetter);e&&(n.isTokenExpired(e)?t.$broadcast("tokenHasExpired",e):h())})}function d(){t.$on("unauthenticated",function(){u(p.unauthenticatedRedirector),c()})}function f(t,e){if(!e)return!1;var r=e.$$route?e.$$route:e.data;if(r&&r.requiresLogin===!0){var a=o(p.tokenGetter);(!a||n.isTokenExpired(a))&&(t.preventDefault(),u(p.unauthenticatedRedirector))}}var p=i.getConfig();t.isAuthenticated=!1;var g=e.has("$state")?"$stateChangeStart":"$routeChangeStart";return t.$on(g,f),{authenticate:h,unauthenticate:c,getToken:function(){return o(p.tokenGetter)},redirect:function(){return u(p.unauthenticatedRedirector)},checkAuthOnRefresh:l,redirectWhenUnauthenticated:d,isAuthenticated:s}}]}),angular.module("angular-jwt.interceptor",[]).provider("jwtInterceptor",function(){this.urlParam,this.authHeader,this.authPrefix,this.whiteListedDomains,this.tokenGetter;var t=this;this.$get=["$q","$injector","$rootScope","urlUtils","jwtOptions",function(e,r,n,a,i){function o(t){if(!a.isSameOrigin(t)&&!u.whiteListedDomains.length)throw new Error("As of v0.1.0, requests to domains other than the application's origin must be white listed. Use jwtOptionsProvider.config({ whiteListedDomains: [<domain>] }); to whitelist.");for(var e=a.urlResolve(t).hostname.toLowerCase(),r=0;r<u.whiteListedDomains.length;r++){var n=u.whiteListedDomains[r],i=n instanceof RegExp?n:new RegExp(n,"i");if(e.match(i))return!0}return a.isSameOrigin(t)?!0:!1}var u=angular.extend({},i.getConfig(),t);return{request:function(t){if(t.skipAuthorization||!o(t.url))return t;if(u.urlParam){if(t.params=t.params||{},t.params[u.urlParam])return t}else if(t.headers=t.headers||{},t.headers[u.authHeader])return t;var n=e.when(r.invoke(u.tokenGetter,this,{options:t}));return n.then(function(e){return e&&(u.urlParam?t.params[u.urlParam]=e:t.headers[u.authHeader]=u.authPrefix+e),t})},responseError:function(t){return 401===t.status&&n.$broadcast("unauthenticated",t),e.reject(t)}}}]}),angular.module("angular-jwt.jwt",[]).service("jwtHelper",["$window",function(t){this.urlBase64Decode=function(e){var r=e.replace(/-/g,"+").replace(/_/g,"/");switch(r.length%4){case 0:break;case 2:r+="==";break;case 3:r+="=";break;default:throw"Illegal base64url string!"}return t.decodeURIComponent(escape(t.atob(r)))},this.decodeToken=function(t){var e=t.split(".");if(3!==e.length)throw new Error("JWT must have 3 parts");var r=this.urlBase64Decode(e[1]);if(!r)throw new Error("Cannot decode the token");return angular.fromJson(r)},this.getTokenExpirationDate=function(t){var e=this.decodeToken(t);if("undefined"==typeof e.exp)return null;var r=new Date(0);return r.setUTCSeconds(e.exp),r},this.isTokenExpired=function(t,e){var r=this.getTokenExpirationDate(t);return e=e||0,null===r?!1:!(r.valueOf()>(new Date).valueOf()+1e3*e)}}]),angular.module("angular-jwt.options",[]).provider("jwtOptions",function(){var t={};this.config=function(e){t=e},this.$get=function(){function e(){this.config=angular.extend({},r,t)}var r={urlParam:null,authHeader:"Authorization",authPrefix:"Bearer ",whiteListedDomains:[],tokenGetter:function(){return null},loginPath:"/",unauthenticatedRedirectPath:"/",unauthenticatedRedirector:["$location",function(t){t.path(this.unauthenticatedRedirectPath)}]};return e.prototype.getConfig=function(){return this.config},new e}}),angular.module("angular-jwt.interceptor").service("urlUtils",function(){function t(t){var e=t;return r.setAttribute("href",e),e=r.href,r.setAttribute("href",e),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}function e(e){var r=angular.isString(e)?t(e):e;return r.protocol===n.protocol&&r.host===n.host}var r=document.createElement("a"),n=t(window.location.href);return{urlResolve:t,isSameOrigin:e}})}();
/*! angular-base64-upload - v0.1.23
* https://github.com/adonespitogo/angular-base64-upload
* Copyright (c) Adones Pitogo <pitogo.adones@gmail.com> [Sat Aug 05 2017]
* Licensed MIT */
!function(e,n){"use strict";e._arrayBufferToBase64=function(n){for(var t="",a=new Uint8Array(n),i=a.byteLength,r=0;r<i;r+=1)t+=String.fromCharCode(a[r]);return e.btoa(t)},e.angular.module("naif.base64",[]).directive("baseSixtyFourInput",["$window","$q",function(e,t){var a={onChange:"&",onAfterValidate:"&",parser:"&"},i=["onabort","onerror","onloadstart","onloadend","onprogress","onload"];return i.forEach(function(e){a[e]="&"}),{restrict:"A",require:"ngModel",scope:a,link:function(a,r,o,l){function f(e){if(o.maxnum&&o.multiple&&e){var n=e.length<=parseInt(o.maxnum);l.$setValidity("maxnum",n)}return e}function u(e){if(o.minnum&&o.multiple&&e){var n=e.length>=parseInt(o.minnum);l.$setValidity("minnum",n)}return e}function s(e){var n=!0;if(o.maxsize&&e){var t=1e3*parseFloat(o.maxsize);if(o.multiple)for(var a=0;a<e.length;a++){var i=e[a];if(i.filesize>t){n=!1;break}}else n=e.filesize<=t;l.$setValidity("maxsize",n)}return e}function c(e){var n=!0,t=1e3*parseFloat(o.minsize);if(o.minsize&&e){if(o.multiple)for(var a=0;a<e.length;a++){var i=e[a];if(i.filesize<t){n=!1;break}}else n=e.filesize>=t;l.$setValidity("minsize",n)}return e}function p(e){var n,t,a,i=!0;if(o.accept&&(t=o.accept.trim().replace(/[,\s]+/gi,"|").replace(/\./g,"\\.").replace(/\/\*/g,"/.*"),n=new RegExp(t)),o.accept&&e){if(o.multiple)for(var r=0;r<e.length;r++){var f=e[r];if(a="."+f.filename.split(".").pop(),!(i=n.test(f.filetype)||n.test(a)))break}else a="."+e.filename.split(".").pop(),i=n.test(e.filetype)||n.test(a);l.$setValidity("accept",i)}return e}function d(){var e=o.multiple?$:$[0];l.$setViewValue(e),s(e),c(e),f(e),u(e),p(e)}function m(e,n,t,a,i){t[e]=function(e){n()(e,t,a,z,$,i)}}function g(i,r,l){return function(f){var u,s=f.target.result,c=o.maxsize&&r.size>1024*o.maxsize;o.doNotParseIfOversize!==n&&c?l.base64=null:l.base64=e._arrayBufferToBase64(s),u=o.parser?t.when(a.parser()(r,l)):t.when(l),u.then(function(e){$.push(e),r.deferredObj.resolve()}),o.onload&&(a.onload&&"function"==typeof a.onload()?a.onload()(f,i,r,z,$,l):a.onload(f,z))}}function h(e,n,t){for(var r=i.length-1;r>=0;r--){var l=i[r];o[l]&&"onload"!==l&&m(l,a[l],e,n,t)}e.onload=g(e,n,t)}function y(){var n,a=[];for(n=z.length-1;n>=0;n--)z[n].deferredObj=t.defer(),a.push(z[n].deferredObj.promise);for(t.all(a).then(d),n=z.length-1;n>=0;n--){var i=new e.FileReader,r=z[n],o={};o.filetype=r.type,o.filename=r.name,o.filesize=r.size,h(i,r,o),i.readAsArrayBuffer(r)}}function v(e){o.onChange&&(a.onChange&&"function"==typeof a.onChange()?a.onChange()(e,z):a.onChange(e,z))}function V(e){if(o.onAfterValidate){for(var n=[],i=z.length-1;i>=0;i--)n.push(z[i].deferredObj.promise);t.all(n).then(function(){a.onAfterValidate&&"function"==typeof a.onAfterValidate()?a.onAfterValidate()(e,$,z):a.onAfterValidate(e,$,z)})}}var z=[],$=[];l&&(l.$isEmpty=function(e){return!e||(angular.isArray(e)?0===e.length:!e.base64)},a._clearInput=function(){r[0].value=""},a.$watch(function(){return l.$viewValue},function(e){l.$isEmpty(e)&&l.$dirty&&(a._clearInput(),l.$setValidity("maxnum",!0),l.$setValidity("minnum",!0),l.$setValidity("maxsize",!0),l.$setValidity("minsize",!0),l.$setValidity("accept",!0))}),r.on("change",function(e){$=[],$=angular.copy($),0===e.target.files.length?(z=[],d()):(z=e.target.files,y(),v(e),V(e)),o.allowSameFile&&a._clearInput()}))}}}])}(window);
//# sourceMappingURL=angular-base64-upload.min.js.map

!function(e,a){"object"==typeof exports&&"undefined"!=typeof module?module.exports=a():"function"==typeof define&&define.amd?define(a):e.moment=a()}(this,function(){"use strict";function e(){return Ea.apply(null,arguments)}function a(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function t(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function s(e){return void 0===e}function n(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function r(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function d(e,a){var t,s=[];for(t=0;t<e.length;++t)s.push(a(e[t],t));return s}function _(e,a){return Object.prototype.hasOwnProperty.call(e,a)}function i(e,a){for(var t in a)_(a,t)&&(e[t]=a[t]);return _(a,"toString")&&(e.toString=a.toString),_(a,"valueOf")&&(e.valueOf=a.valueOf),e}function o(e,a,t,s){return Ye(e,a,t,s,!0).utc()}function m(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function u(e){if(null==e._isValid){var a=m(e),t=Aa.call(a.parsedDateParts,function(e){return null!=e}),s=!isNaN(e._d.getTime())&&a.overflow<0&&!a.empty&&!a.invalidMonth&&!a.invalidWeekday&&!a.weekdayMismatch&&!a.nullInput&&!a.invalidFormat&&!a.userInvalidated&&(!a.meridiem||a.meridiem&&t);if(e._strict&&(s=s&&0===a.charsLeftOver&&0===a.unusedTokens.length&&void 0===a.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return s;e._isValid=s}return e._isValid}function l(e){var a=o(NaN);return null!=e?i(m(a),e):m(a).userInvalidated=!0,a}function M(e,a){var t,n,r;if(s(a._isAMomentObject)||(e._isAMomentObject=a._isAMomentObject),s(a._i)||(e._i=a._i),s(a._f)||(e._f=a._f),s(a._l)||(e._l=a._l),s(a._strict)||(e._strict=a._strict),s(a._tzm)||(e._tzm=a._tzm),s(a._isUTC)||(e._isUTC=a._isUTC),s(a._offset)||(e._offset=a._offset),s(a._pf)||(e._pf=m(a)),s(a._locale)||(e._locale=a._locale),Fa.length>0)for(t=0;t<Fa.length;t++)s(r=a[n=Fa[t]])||(e[n]=r);return e}function h(a){M(this,a),this._d=new Date(null!=a._d?a._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===za&&(za=!0,e.updateOffset(this),za=!1)}function L(e){return e instanceof h||null!=e&&null!=e._isAMomentObject}function c(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function Y(e){var a=+e,t=0;return 0!==a&&isFinite(a)&&(t=c(a)),t}function y(e,a,t){var s,n=Math.min(e.length,a.length),r=Math.abs(e.length-a.length),d=0;for(s=0;s<n;s++)(t&&e[s]!==a[s]||!t&&Y(e[s])!==Y(a[s]))&&d++;return d+r}function f(a){!1===e.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function p(a,t){var s=!0;return i(function(){if(null!=e.deprecationHandler&&e.deprecationHandler(null,a),s){for(var n,r=[],d=0;d<arguments.length;d++){if(n="","object"==typeof arguments[d]){n+="\n["+d+"] ";for(var _ in arguments[0])n+=_+": "+arguments[0][_]+", ";n=n.slice(0,-2)}else n=arguments[d];r.push(n)}f(a+"\nArguments: "+Array.prototype.slice.call(r).join("")+"\n"+(new Error).stack),s=!1}return t.apply(this,arguments)},t)}function k(a,t){null!=e.deprecationHandler&&e.deprecationHandler(a,t),Ja[a]||(f(t),Ja[a]=!0)}function D(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function T(e,a){var s,n=i({},e);for(s in a)_(a,s)&&(t(e[s])&&t(a[s])?(n[s]={},i(n[s],e[s]),i(n[s],a[s])):null!=a[s]?n[s]=a[s]:delete n[s]);for(s in e)_(e,s)&&!_(a,s)&&t(e[s])&&(n[s]=i({},n[s]));return n}function g(e){null!=e&&this.set(e)}function w(e,a){var t=e.toLowerCase();Ra[t]=Ra[t+"s"]=Ra[a]=e}function v(e){return"string"==typeof e?Ra[e]||Ra[e.toLowerCase()]:void 0}function S(e){var a,t,s={};for(t in e)_(e,t)&&(a=v(t))&&(s[a]=e[t]);return s}function H(e,a){Ca[e]=a}function b(e,a,t){var s=""+Math.abs(e),n=a-s.length;return(e>=0?t?"+":"":"-")+Math.pow(10,Math.max(0,n)).toString().substr(1)+s}function j(e,a,t,s){var n=s;"string"==typeof s&&(n=function(){return this[s]()}),e&&(Va[e]=n),a&&(Va[a[0]]=function(){return b(n.apply(this,arguments),a[1],a[2])}),t&&(Va[t]=function(){return this.localeData().ordinal(n.apply(this,arguments),e)})}function x(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function P(e,a){return e.isValid()?(a=O(a,e.localeData()),Ua[a]=Ua[a]||function(e){var a,t,s=e.match(Ia);for(a=0,t=s.length;a<t;a++)Va[s[a]]?s[a]=Va[s[a]]:s[a]=x(s[a]);return function(a){var n,r="";for(n=0;n<t;n++)r+=D(s[n])?s[n].call(a,e):s[n];return r}}(a),Ua[a](e)):e.localeData().invalidDate()}function O(e,a){function t(e){return a.longDateFormat(e)||e}var s=5;for(Ga.lastIndex=0;s>=0&&Ga.test(e);)e=e.replace(Ga,t),Ga.lastIndex=0,s-=1;return e}function W(e,a,t){ot[e]=D(a)?a:function(e,s){return e&&t?t:a}}function E(e,a){return _(ot,e)?ot[e](a._strict,a._locale):new RegExp(function(e){return A(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,a,t,s,n){return a||t||s||n}))}(e))}function A(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function F(e,a){var t,s=a;for("string"==typeof e&&(e=[e]),n(a)&&(s=function(e,t){t[a]=Y(e)}),t=0;t<e.length;t++)mt[e[t]]=s}function z(e,a){F(e,function(e,t,s,n){s._w=s._w||{},a(e,s._w,s,n)})}function J(e,a,t){null!=a&&_(mt,e)&&mt[e](a,t._a,t,e)}function N(e){return R(e)?366:365}function R(e){return e%4==0&&e%100!=0||e%400==0}function C(a,t){return function(s){return null!=s?(G(this,a,s),e.updateOffset(this,t),this):I(this,a)}}function I(e,a){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+a]():NaN}function G(e,a,t){e.isValid()&&!isNaN(t)&&("FullYear"===a&&R(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+a](t,e.month(),U(t,e.month())):e._d["set"+(e._isUTC?"UTC":"")+a](t))}function U(e,a){if(isNaN(e)||isNaN(a))return NaN;var t=function(e,a){return(e%a+a)%a}(a,12);return e+=(a-t)/12,1===t?R(e)?29:28:31-t%7%2}function V(e,a){var t;if(!e.isValid())return e;if("string"==typeof a)if(/^\d+$/.test(a))a=Y(a);else if(a=e.localeData().monthsParse(a),!n(a))return e;return t=Math.min(e.date(),U(e.year(),a)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](a,t),e}function K(a){return null!=a?(V(this,a),e.updateOffset(this,!0),this):I(this,"Month")}function $(){function e(e,a){return a.length-e.length}var a,t,s=[],n=[],r=[];for(a=0;a<12;a++)t=o([2e3,a]),s.push(this.monthsShort(t,"")),n.push(this.months(t,"")),r.push(this.months(t,"")),r.push(this.monthsShort(t,""));for(s.sort(e),n.sort(e),r.sort(e),a=0;a<12;a++)s[a]=A(s[a]),n[a]=A(n[a]);for(a=0;a<24;a++)r[a]=A(r[a]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+n.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function Z(e){var a=new Date(Date.UTC.apply(null,arguments));return e<100&&e>=0&&isFinite(a.getUTCFullYear())&&a.setUTCFullYear(e),a}function B(e,a,t){var s=7+a-t;return-((7+Z(e,0,s).getUTCDay()-a)%7)+s-1}function q(e,a,t,s,n){var r,d,_=1+7*(a-1)+(7+t-s)%7+B(e,s,n);return _<=0?d=N(r=e-1)+_:_>N(e)?(r=e+1,d=_-N(e)):(r=e,d=_),{year:r,dayOfYear:d}}function Q(e,a,t){var s,n,r=B(e.year(),a,t),d=Math.floor((e.dayOfYear()-r-1)/7)+1;return d<1?s=d+X(n=e.year()-1,a,t):d>X(e.year(),a,t)?(s=d-X(e.year(),a,t),n=e.year()+1):(n=e.year(),s=d),{week:s,year:n}}function X(e,a,t){var s=B(e,a,t),n=B(e+1,a,t);return(N(e)-s+n)/7}function ee(){function e(e,a){return a.length-e.length}var a,t,s,n,r,d=[],_=[],i=[],m=[];for(a=0;a<7;a++)t=o([2e3,1]).day(a),s=this.weekdaysMin(t,""),n=this.weekdaysShort(t,""),r=this.weekdays(t,""),d.push(s),_.push(n),i.push(r),m.push(s),m.push(n),m.push(r);for(d.sort(e),_.sort(e),i.sort(e),m.sort(e),a=0;a<7;a++)_[a]=A(_[a]),i[a]=A(i[a]),m[a]=A(m[a]);this._weekdaysRegex=new RegExp("^("+m.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+_.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+d.join("|")+")","i")}function ae(){return this.hours()%12||12}function te(e,a){j(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),a)})}function se(e,a){return a._meridiemParse}function ne(e){return e?e.toLowerCase().replace("_","-"):e}function re(e){var a=null;if(!At[e]&&"undefined"!=typeof module&&module&&module.exports)try{a=Ot._abbr;require("./locale/"+e),de(a)}catch(e){}return At[e]}function de(e,a){var t;return e&&(t=s(a)?ie(e):_e(e,a))&&(Ot=t),Ot._abbr}function _e(e,a){if(null!==a){var t=Et;if(a.abbr=e,null!=At[e])k("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),t=At[e]._config;else if(null!=a.parentLocale){if(null==At[a.parentLocale])return Ft[a.parentLocale]||(Ft[a.parentLocale]=[]),Ft[a.parentLocale].push({name:e,config:a}),null;t=At[a.parentLocale]._config}return At[e]=new g(T(t,a)),Ft[e]&&Ft[e].forEach(function(e){_e(e.name,e.config)}),de(e),At[e]}return delete At[e],null}function ie(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return Ot;if(!a(e)){if(t=re(e))return t;e=[e]}return function(e){for(var a,t,s,n,r=0;r<e.length;){for(a=(n=ne(e[r]).split("-")).length,t=(t=ne(e[r+1]))?t.split("-"):null;a>0;){if(s=re(n.slice(0,a).join("-")))return s;if(t&&t.length>=a&&y(n,t,!0)>=a-1)break;a--}r++}return null}(e)}function oe(e){var a,t=e._a;return t&&-2===m(e).overflow&&(a=t[lt]<0||t[lt]>11?lt:t[Mt]<1||t[Mt]>U(t[ut],t[lt])?Mt:t[ht]<0||t[ht]>24||24===t[ht]&&(0!==t[Lt]||0!==t[ct]||0!==t[Yt])?ht:t[Lt]<0||t[Lt]>59?Lt:t[ct]<0||t[ct]>59?ct:t[Yt]<0||t[Yt]>999?Yt:-1,m(e)._overflowDayOfYear&&(a<ut||a>Mt)&&(a=Mt),m(e)._overflowWeeks&&-1===a&&(a=yt),m(e)._overflowWeekday&&-1===a&&(a=ft),m(e).overflow=a),e}function me(e,a,t){return null!=e?e:null!=a?a:t}function ue(a){var t,s,n,r,d=[];if(!a._d){for(n=function(a){var t=new Date(e.now());return a._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}(a),a._w&&null==a._a[Mt]&&null==a._a[lt]&&function(e){var a,t,s,n,r,d,_,i;if(null!=(a=e._w).GG||null!=a.W||null!=a.E)r=1,d=4,t=me(a.GG,e._a[ut],Q(ye(),1,4).year),s=me(a.W,1),((n=me(a.E,1))<1||n>7)&&(i=!0);else{r=e._locale._week.dow,d=e._locale._week.doy;var o=Q(ye(),r,d);t=me(a.gg,e._a[ut],o.year),s=me(a.w,o.week),null!=a.d?((n=a.d)<0||n>6)&&(i=!0):null!=a.e?(n=a.e+r,(a.e<0||a.e>6)&&(i=!0)):n=r}s<1||s>X(t,r,d)?m(e)._overflowWeeks=!0:null!=i?m(e)._overflowWeekday=!0:(_=q(t,s,n,r,d),e._a[ut]=_.year,e._dayOfYear=_.dayOfYear)}(a),null!=a._dayOfYear&&(r=me(a._a[ut],n[ut]),(a._dayOfYear>N(r)||0===a._dayOfYear)&&(m(a)._overflowDayOfYear=!0),s=Z(r,0,a._dayOfYear),a._a[lt]=s.getUTCMonth(),a._a[Mt]=s.getUTCDate()),t=0;t<3&&null==a._a[t];++t)a._a[t]=d[t]=n[t];for(;t<7;t++)a._a[t]=d[t]=null==a._a[t]?2===t?1:0:a._a[t];24===a._a[ht]&&0===a._a[Lt]&&0===a._a[ct]&&0===a._a[Yt]&&(a._nextDay=!0,a._a[ht]=0),a._d=(a._useUTC?Z:function(e,a,t,s,n,r,d){var _=new Date(e,a,t,s,n,r,d);return e<100&&e>=0&&isFinite(_.getFullYear())&&_.setFullYear(e),_}).apply(null,d),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[ht]=24),a._w&&void 0!==a._w.d&&a._w.d!==a._d.getDay()&&(m(a).weekdayMismatch=!0)}}function le(e){var a,t,s,n,r,d,_=e._i,i=zt.exec(_)||Jt.exec(_);if(i){for(m(e).iso=!0,a=0,t=Rt.length;a<t;a++)if(Rt[a][1].exec(i[1])){n=Rt[a][0],s=!1!==Rt[a][2];break}if(null==n)return void(e._isValid=!1);if(i[3]){for(a=0,t=Ct.length;a<t;a++)if(Ct[a][1].exec(i[3])){r=(i[2]||" ")+Ct[a][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(i[4]){if(!Nt.exec(i[4]))return void(e._isValid=!1);d="Z"}e._f=n+(r||"")+(d||""),Le(e)}else e._isValid=!1}function Me(e,a,t,s,n,r){var d=[function(e){var a=parseInt(e,10);{if(a<=49)return 2e3+a;if(a<=999)return 1900+a}return a}(e),gt.indexOf(a),parseInt(t,10),parseInt(s,10),parseInt(n,10)];return r&&d.push(parseInt(r,10)),d}function he(e){var a=Gt.exec(function(e){return e.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}(e._i));if(a){var t=Me(a[4],a[3],a[2],a[5],a[6],a[7]);if(!function(e,a,t){if(e&&Ht.indexOf(e)!==new Date(a[0],a[1],a[2]).getDay())return m(t).weekdayMismatch=!0,t._isValid=!1,!1;return!0}(a[1],t,e))return;e._a=t,e._tzm=function(e,a,t){if(e)return Ut[e];if(a)return 0;var s=parseInt(t,10),n=s%100;return(s-n)/100*60+n}(a[8],a[9],a[10]),e._d=Z.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),m(e).rfc2822=!0}else e._isValid=!1}function Le(a){if(a._f!==e.ISO_8601)if(a._f!==e.RFC_2822){a._a=[],m(a).empty=!0;var t,s,n,r,d,_=""+a._i,i=_.length,o=0;for(n=O(a._f,a._locale).match(Ia)||[],t=0;t<n.length;t++)r=n[t],(s=(_.match(E(r,a))||[])[0])&&((d=_.substr(0,_.indexOf(s))).length>0&&m(a).unusedInput.push(d),_=_.slice(_.indexOf(s)+s.length),o+=s.length),Va[r]?(s?m(a).empty=!1:m(a).unusedTokens.push(r),J(r,s,a)):a._strict&&!s&&m(a).unusedTokens.push(r);m(a).charsLeftOver=i-o,_.length>0&&m(a).unusedInput.push(_),a._a[ht]<=12&&!0===m(a).bigHour&&a._a[ht]>0&&(m(a).bigHour=void 0),m(a).parsedDateParts=a._a.slice(0),m(a).meridiem=a._meridiem,a._a[ht]=function(e,a,t){var s;if(null==t)return a;return null!=e.meridiemHour?e.meridiemHour(a,t):null!=e.isPM?((s=e.isPM(t))&&a<12&&(a+=12),s||12!==a||(a=0),a):a}(a._locale,a._a[ht],a._meridiem),ue(a),oe(a)}else he(a);else le(a)}function ce(_){var o=_._i,c=_._f;return _._locale=_._locale||ie(_._l),null===o||void 0===c&&""===o?l({nullInput:!0}):("string"==typeof o&&(_._i=o=_._locale.preparse(o)),L(o)?new h(oe(o)):(r(o)?_._d=o:a(c)?function(e){var a,t,s,n,r;if(0===e._f.length)return m(e).invalidFormat=!0,void(e._d=new Date(NaN));for(n=0;n<e._f.length;n++)r=0,a=M({},e),null!=e._useUTC&&(a._useUTC=e._useUTC),a._f=e._f[n],Le(a),u(a)&&(r+=m(a).charsLeftOver,r+=10*m(a).unusedTokens.length,m(a).score=r,(null==s||r<s)&&(s=r,t=a));i(e,t||a)}(_):c?Le(_):function(_){var i=_._i;s(i)?_._d=new Date(e.now()):r(i)?_._d=new Date(i.valueOf()):"string"==typeof i?function(a){var t=It.exec(a._i);null===t?(le(a),!1===a._isValid&&(delete a._isValid,he(a),!1===a._isValid&&(delete a._isValid,e.createFromInputFallback(a)))):a._d=new Date(+t[1])}(_):a(i)?(_._a=d(i.slice(0),function(e){return parseInt(e,10)}),ue(_)):t(i)?function(e){if(!e._d){var a=S(e._i);e._a=d([a.year,a.month,a.day||a.date,a.hour,a.minute,a.second,a.millisecond],function(e){return e&&parseInt(e,10)}),ue(e)}}(_):n(i)?_._d=new Date(i):e.createFromInputFallback(_)}(_),u(_)||(_._d=null),_))}function Ye(e,s,n,r,d){var _={};return!0!==n&&!1!==n||(r=n,n=void 0),(t(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var a;for(a in e)if(e.hasOwnProperty(a))return!1;return!0}(e)||a(e)&&0===e.length)&&(e=void 0),_._isAMomentObject=!0,_._useUTC=_._isUTC=d,_._l=n,_._i=e,_._f=s,_._strict=r,function(e){var a=new h(oe(ce(e)));return a._nextDay&&(a.add(1,"d"),a._nextDay=void 0),a}(_)}function ye(e,a,t,s){return Ye(e,a,t,s,!1)}function fe(e,t){var s,n;if(1===t.length&&a(t[0])&&(t=t[0]),!t.length)return ye();for(s=t[0],n=1;n<t.length;++n)t[n].isValid()&&!t[n][e](s)||(s=t[n]);return s}function pe(e){var a=S(e),t=a.year||0,s=a.quarter||0,n=a.month||0,r=a.week||0,d=a.day||0,_=a.hour||0,i=a.minute||0,o=a.second||0,m=a.millisecond||0;this._isValid=function(e){for(var a in e)if(-1===pt.call($t,a)||null!=e[a]&&isNaN(e[a]))return!1;for(var t=!1,s=0;s<$t.length;++s)if(e[$t[s]]){if(t)return!1;parseFloat(e[$t[s]])!==Y(e[$t[s]])&&(t=!0)}return!0}(a),this._milliseconds=+m+1e3*o+6e4*i+1e3*_*60*60,this._days=+d+7*r,this._months=+n+3*s+12*t,this._data={},this._locale=ie(),this._bubble()}function ke(e){return e instanceof pe}function De(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Te(e,a){j(e,0,0,function(){var e=this.utcOffset(),t="+";return e<0&&(e=-e,t="-"),t+b(~~(e/60),2)+a+b(~~e%60,2)})}function ge(e,a){var t=(a||"").match(e);if(null===t)return null;var s=((t[t.length-1]||[])+"").match(Zt)||["-",0,0],n=60*s[1]+Y(s[2]);return 0===n?0:"+"===s[0]?n:-n}function we(a,t){var s,n;return t._isUTC?(s=t.clone(),n=(L(a)||r(a)?a.valueOf():ye(a).valueOf())-s.valueOf(),s._d.setTime(s._d.valueOf()+n),e.updateOffset(s,!1),s):ye(a).local()}function ve(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Se(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function He(e,a){var t,s,r,d=e,i=null;return ke(e)?d={ms:e._milliseconds,d:e._days,M:e._months}:n(e)?(d={},a?d[a]=e:d.milliseconds=e):(i=Bt.exec(e))?(t="-"===i[1]?-1:1,d={y:0,d:Y(i[Mt])*t,h:Y(i[ht])*t,m:Y(i[Lt])*t,s:Y(i[ct])*t,ms:Y(De(1e3*i[Yt]))*t}):(i=qt.exec(e))?(t="-"===i[1]?-1:(i[1],1),d={y:be(i[2],t),M:be(i[3],t),w:be(i[4],t),d:be(i[5],t),h:be(i[6],t),m:be(i[7],t),s:be(i[8],t)}):null==d?d={}:"object"==typeof d&&("from"in d||"to"in d)&&(r=function(e,a){var t;if(!e.isValid()||!a.isValid())return{milliseconds:0,months:0};a=we(a,e),e.isBefore(a)?t=je(e,a):((t=je(a,e)).milliseconds=-t.milliseconds,t.months=-t.months);return t}(ye(d.from),ye(d.to)),(d={}).ms=r.milliseconds,d.M=r.months),s=new pe(d),ke(e)&&_(e,"_locale")&&(s._locale=e._locale),s}function be(e,a){var t=e&&parseFloat(e.replace(",","."));return(isNaN(t)?0:t)*a}function je(e,a){var t={milliseconds:0,months:0};return t.months=a.month()-e.month()+12*(a.year()-e.year()),e.clone().add(t.months,"M").isAfter(a)&&--t.months,t.milliseconds=+a-+e.clone().add(t.months,"M"),t}function xe(e,a){return function(t,s){var n,r;return null===s||isNaN(+s)||(k(a,"moment()."+a+"(period, number) is deprecated. Please use moment()."+a+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),r=t,t=s,s=r),t="string"==typeof t?+t:t,n=He(t,s),Pe(this,n,e),this}}function Pe(a,t,s,n){var r=t._milliseconds,d=De(t._days),_=De(t._months);a.isValid()&&(n=null==n||n,_&&V(a,I(a,"Month")+_*s),d&&G(a,"Date",I(a,"Date")+d*s),r&&a._d.setTime(a._d.valueOf()+r*s),n&&e.updateOffset(a,d||_))}function Oe(e,a){var t,s=12*(a.year()-e.year())+(a.month()-e.month()),n=e.clone().add(s,"months");return t=a-n<0?(a-n)/(n-e.clone().add(s-1,"months")):(a-n)/(e.clone().add(s+1,"months")-n),-(s+t)||0}function We(e){var a;return void 0===e?this._locale._abbr:(null!=(a=ie(e))&&(this._locale=a),this)}function Ee(){return this._locale}function Ae(e,a){j(0,[e,e.length],0,a)}function Fe(e,a,t,s,n){var r;return null==e?Q(this,s,n).year:(r=X(e,s,n),a>r&&(a=r),function(e,a,t,s,n){var r=q(e,a,t,s,n),d=Z(r.year,0,r.dayOfYear);return this.year(d.getUTCFullYear()),this.month(d.getUTCMonth()),this.date(d.getUTCDate()),this}.call(this,e,a,t,s,n))}function ze(e,a){a[Yt]=Y(1e3*("0."+e))}function Je(e){return e}function Ne(e,a,t,s){var n=ie(),r=o().set(s,a);return n[t](r,e)}function Re(e,a,t){if(n(e)&&(a=e,e=void 0),e=e||"",null!=a)return Ne(e,a,t,"month");var s,r=[];for(s=0;s<12;s++)r[s]=Ne(e,s,t,"month");return r}function Ce(e,a,t,s){"boolean"==typeof e?(n(a)&&(t=a,a=void 0),a=a||""):(t=a=e,e=!1,n(a)&&(t=a,a=void 0),a=a||"");var r=ie(),d=e?r._week.dow:0;if(null!=t)return Ne(a,(t+d)%7,s,"day");var _,i=[];for(_=0;_<7;_++)i[_]=Ne(a,(_+d)%7,s,"day");return i}function Ie(e,a,t,s){var n=He(a,t);return e._milliseconds+=s*n._milliseconds,e._days+=s*n._days,e._months+=s*n._months,e._bubble()}function Ge(e){return e<0?Math.floor(e):Math.ceil(e)}function Ue(e){return 4800*e/146097}function Ve(e){return 146097*e/4800}function Ke(e){return function(){return this.as(e)}}function $e(e){return function(){return this.isValid()?this._data[e]:NaN}}function Ze(e){return(e>0)-(e<0)||+e}function Be(){if(!this.isValid())return this.localeData().invalidDate();var e,a,t,s=vs(this._milliseconds)/1e3,n=vs(this._days),r=vs(this._months);a=c((e=c(s/60))/60),s%=60,e%=60;var d=t=c(r/12),_=r%=12,i=n,o=a,m=e,u=s?s.toFixed(3).replace(/\.?0+$/,""):"",l=this.asSeconds();if(!l)return"P0D";var M=l<0?"-":"",h=Ze(this._months)!==Ze(l)?"-":"",L=Ze(this._days)!==Ze(l)?"-":"",Y=Ze(this._milliseconds)!==Ze(l)?"-":"";return M+"P"+(d?h+d+"Y":"")+(_?h+_+"M":"")+(i?L+i+"D":"")+(o||m||u?"T":"")+(o?Y+o+"H":"")+(m?Y+m+"M":"")+(u?Y+u+"S":"")}function qe(e,a,t){return"m"===t?a?"\u0445\u0432\u0456\u043b\u0456\u043d\u0430":"\u0445\u0432\u0456\u043b\u0456\u043d\u0443":"h"===t?a?"\u0433\u0430\u0434\u0437\u0456\u043d\u0430":"\u0433\u0430\u0434\u0437\u0456\u043d\u0443":e+" "+function(e,a){var t=e.split("_");return a%10==1&&a%100!=11?t[0]:a%10>=2&&a%10<=4&&(a%100<10||a%100>=20)?t[1]:t[2]}({mm:a?"\u0445\u0432\u0456\u043b\u0456\u043d\u0430_\u0445\u0432\u0456\u043b\u0456\u043d\u044b_\u0445\u0432\u0456\u043b\u0456\u043d":"\u0445\u0432\u0456\u043b\u0456\u043d\u0443_\u0445\u0432\u0456\u043b\u0456\u043d\u044b_\u0445\u0432\u0456\u043b\u0456\u043d",hh:a?"\u0433\u0430\u0434\u0437\u0456\u043d\u0430_\u0433\u0430\u0434\u0437\u0456\u043d\u044b_\u0433\u0430\u0434\u0437\u0456\u043d":"\u0433\u0430\u0434\u0437\u0456\u043d\u0443_\u0433\u0430\u0434\u0437\u0456\u043d\u044b_\u0433\u0430\u0434\u0437\u0456\u043d",dd:"\u0434\u0437\u0435\u043d\u044c_\u0434\u043d\u0456_\u0434\u0437\u0451\u043d",MM:"\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u044b_\u043c\u0435\u0441\u044f\u0446\u0430\u045e",yy:"\u0433\u043e\u0434_\u0433\u0430\u0434\u044b_\u0433\u0430\u0434\u043e\u045e"}[t],+e)}function Qe(e,a,t){return e+" "+function(e,a){if(2===a)return function(e){var a={m:"v",b:"v",d:"z"};if(void 0===a[e.charAt(0)])return e;return a[e.charAt(0)]+e.substring(1)}(e);return e}({mm:"munutenn",MM:"miz",dd:"devezh"}[t],e)}function Xe(e){return e>9?Xe(e%10):e}function ea(e,a,t){var s=e+" ";switch(t){case"m":return a?"jedna minuta":"jedne minute";case"mm":return s+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return a?"jedan sat":"jednog sata";case"hh":return s+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return s+=1===e?"dan":"dana";case"MM":return s+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return s+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}function aa(e){return e>1&&e<5&&1!=~~(e/10)}function ta(e,a,t,s){var n=e+" ";switch(t){case"s":return a||s?"p\xe1r sekund":"p\xe1r sekundami";case"m":return a?"minuta":s?"minutu":"minutou";case"mm":return a||s?n+(aa(e)?"minuty":"minut"):n+"minutami";break;case"h":return a?"hodina":s?"hodinu":"hodinou";case"hh":return a||s?n+(aa(e)?"hodiny":"hodin"):n+"hodinami";break;case"d":return a||s?"den":"dnem";case"dd":return a||s?n+(aa(e)?"dny":"dn\xed"):n+"dny";break;case"M":return a||s?"m\u011bs\xedc":"m\u011bs\xedcem";case"MM":return a||s?n+(aa(e)?"m\u011bs\xedce":"m\u011bs\xedc\u016f"):n+"m\u011bs\xedci";break;case"y":return a||s?"rok":"rokem";case"yy":return a||s?n+(aa(e)?"roky":"let"):n+"lety";break}}function sa(e,a,t,s){var n={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return a?n[t][0]:n[t][1]}function na(e,a,t,s){var n={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return a?n[t][0]:n[t][1]}function ra(e,a,t,s){var n={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return a?n[t][0]:n[t][1]}function da(e,a,t,s){var n={s:["m\xf5ne sekundi","m\xf5ni sekund","paar sekundit"],m:["\xfche minuti","\xfcks minut"],mm:[e+" minuti",e+" minutit"],h:["\xfche tunni","tund aega","\xfcks tund"],hh:[e+" tunni",e+" tundi"],d:["\xfche p\xe4eva","\xfcks p\xe4ev"],M:["kuu aja","kuu aega","\xfcks kuu"],MM:[e+" kuu",e+" kuud"],y:["\xfche aasta","aasta","\xfcks aasta"],yy:[e+" aasta",e+" aastat"]};return a?n[t][2]?n[t][2]:n[t][1]:s?n[t][0]:n[t][1]}function _a(e,a,t,s){var n="";switch(t){case"s":return s?"muutaman sekunnin":"muutama sekunti";case"m":return s?"minuutin":"minuutti";case"mm":n=s?"minuutin":"minuuttia";break;case"h":return s?"tunnin":"tunti";case"hh":n=s?"tunnin":"tuntia";break;case"d":return s?"p\xe4iv\xe4n":"p\xe4iv\xe4";case"dd":n=s?"p\xe4iv\xe4n":"p\xe4iv\xe4\xe4";break;case"M":return s?"kuukauden":"kuukausi";case"MM":n=s?"kuukauden":"kuukautta";break;case"y":return s?"vuoden":"vuosi";case"yy":n=s?"vuoden":"vuotta";break}return n=function(e,a){return e<10?a?mn[e]:on[e]:e}(e,s)+" "+n}function ia(e,a,t,s){var n={s:["thodde secondanim","thodde second"],m:["eka mintan","ek minute"],mm:[e+" mintanim",e+" mintam"],h:["eka horan","ek hor"],hh:[e+" horanim",e+" hor"],d:["eka disan","ek dis"],dd:[e+" disanim",e+" dis"],M:["eka mhoinean","ek mhoino"],MM:[e+" mhoineanim",e+" mhoine"],y:["eka vorsan","ek voros"],yy:[e+" vorsanim",e+" vorsam"]};return a?n[t][0]:n[t][1]}function oa(e,a,t){var s=e+" ";switch(t){case"m":return a?"jedna minuta":"jedne minute";case"mm":return s+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return a?"jedan sat":"jednog sata";case"hh":return s+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return s+=1===e?"dan":"dana";case"MM":return s+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return s+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}function ma(e,a,t,s){var n=e;switch(t){case"s":return s||a?"n\xe9h\xe1ny m\xe1sodperc":"n\xe9h\xe1ny m\xe1sodperce";case"m":return"egy"+(s||a?" perc":" perce");case"mm":return n+(s||a?" perc":" perce");case"h":return"egy"+(s||a?" \xf3ra":" \xf3r\xe1ja");case"hh":return n+(s||a?" \xf3ra":" \xf3r\xe1ja");case"d":return"egy"+(s||a?" nap":" napja");case"dd":return n+(s||a?" nap":" napja");case"M":return"egy"+(s||a?" h\xf3nap":" h\xf3napja");case"MM":return n+(s||a?" h\xf3nap":" h\xf3napja");case"y":return"egy"+(s||a?" \xe9v":" \xe9ve");case"yy":return n+(s||a?" \xe9v":" \xe9ve")}return""}function ua(e){return(e?"":"[m\xfalt] ")+"["+Yn[this.day()]+"] LT[-kor]"}function la(e){return e%100==11||e%10!=1}function Ma(e,a,t,s){var n=e+" ";switch(t){case"s":return a||s?"nokkrar sek\xfandur":"nokkrum sek\xfandum";case"m":return a?"m\xedn\xfata":"m\xedn\xfatu";case"mm":return la(e)?n+(a||s?"m\xedn\xfatur":"m\xedn\xfatum"):a?n+"m\xedn\xfata":n+"m\xedn\xfatu";case"hh":return la(e)?n+(a||s?"klukkustundir":"klukkustundum"):n+"klukkustund";case"d":return a?"dagur":s?"dag":"degi";case"dd":return la(e)?a?n+"dagar":n+(s?"daga":"d\xf6gum"):a?n+"dagur":n+(s?"dag":"degi");case"M":return a?"m\xe1nu\xf0ur":s?"m\xe1nu\xf0":"m\xe1nu\xf0i";case"MM":return la(e)?a?n+"m\xe1nu\xf0ir":n+(s?"m\xe1nu\xf0i":"m\xe1nu\xf0um"):a?n+"m\xe1nu\xf0ur":n+(s?"m\xe1nu\xf0":"m\xe1nu\xf0i");case"y":return a||s?"\xe1r":"\xe1ri";case"yy":return la(e)?n+(a||s?"\xe1r":"\xe1rum"):n+(a||s?"\xe1r":"\xe1ri")}}function ha(e,a,t,s){var n={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return a?n[t][0]:n[t][1]}function La(e){if(e=parseInt(e,10),isNaN(e))return!1;if(e<0)return!0;if(e<10)return 4<=e&&e<=7;if(e<100){var a=e%10;return La(0===a?e/10:a)}if(e<1e4){for(;e>=10;)e/=10;return La(e)}return e/=1e3,La(e)}function ca(e,a,t,s){return a?ya(t)[0]:s?ya(t)[1]:ya(t)[2]}function Ya(e){return e%10==0||e>10&&e<20}function ya(e){return Dn[e].split("_")}function fa(e,a,t,s){var n=e+" ";return 1===e?n+ca(0,a,t[0],s):a?n+(Ya(e)?ya(t)[1]:ya(t)[0]):s?n+ya(t)[1]:n+(Ya(e)?ya(t)[1]:ya(t)[2])}function pa(e,a,t){return t?a%10==1&&a%100!=11?e[2]:e[3]:a%10==1&&a%100!=11?e[0]:e[1]}function ka(e,a,t){return e+" "+pa(Tn[t],e,a)}function Da(e,a,t){return pa(Tn[t],e,a)}function Ta(e,a,t,s){var n="";if(a)switch(t){case"s":n="\u0915\u093e\u0939\u0940 \u0938\u0947\u0915\u0902\u0926";break;case"m":n="\u090f\u0915 \u092e\u093f\u0928\u093f\u091f";break;case"mm":n="%d \u092e\u093f\u0928\u093f\u091f\u0947";break;case"h":n="\u090f\u0915 \u0924\u093e\u0938";break;case"hh":n="%d \u0924\u093e\u0938";break;case"d":n="\u090f\u0915 \u0926\u093f\u0935\u0938";break;case"dd":n="%d \u0926\u093f\u0935\u0938";break;case"M":n="\u090f\u0915 \u092e\u0939\u093f\u0928\u093e";break;case"MM":n="%d \u092e\u0939\u093f\u0928\u0947";break;case"y":n="\u090f\u0915 \u0935\u0930\u094d\u0937";break;case"yy":n="%d \u0935\u0930\u094d\u0937\u0947";break}else switch(t){case"s":n="\u0915\u093e\u0939\u0940 \u0938\u0947\u0915\u0902\u0926\u093e\u0902";break;case"m":n="\u090f\u0915\u093e \u092e\u093f\u0928\u093f\u091f\u093e";break;case"mm":n="%d \u092e\u093f\u0928\u093f\u091f\u093e\u0902";break;case"h":n="\u090f\u0915\u093e \u0924\u093e\u0938\u093e";break;case"hh":n="%d \u0924\u093e\u0938\u093e\u0902";break;case"d":n="\u090f\u0915\u093e \u0926\u093f\u0935\u0938\u093e";break;case"dd":n="%d \u0926\u093f\u0935\u0938\u093e\u0902";break;case"M":n="\u090f\u0915\u093e \u092e\u0939\u093f\u0928\u094d\u092f\u093e";break;case"MM":n="%d \u092e\u0939\u093f\u0928\u094d\u092f\u093e\u0902";break;case"y":n="\u090f\u0915\u093e \u0935\u0930\u094d\u0937\u093e";break;case"yy":n="%d \u0935\u0930\u094d\u0937\u093e\u0902";break}return n.replace(/%d/i,e)}function ga(e){return e%10<5&&e%10>1&&~~(e/10)%10!=1}function wa(e,a,t){var s=e+" ";switch(t){case"m":return a?"minuta":"minut\u0119";case"mm":return s+(ga(e)?"minuty":"minut");case"h":return a?"godzina":"godzin\u0119";case"hh":return s+(ga(e)?"godziny":"godzin");case"MM":return s+(ga(e)?"miesi\u0105ce":"miesi\u0119cy");case"yy":return s+(ga(e)?"lata":"lat")}}function va(e,a,t){var s=" ";return(e%100>=20||e>=100&&e%100==0)&&(s=" de "),e+s+{mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"}[t]}function Sa(e,a,t){return"m"===t?a?"\u043c\u0438\u043d\u0443\u0442\u0430":"\u043c\u0438\u043d\u0443\u0442\u0443":e+" "+function(e,a){var t=e.split("_");return a%10==1&&a%100!=11?t[0]:a%10>=2&&a%10<=4&&(a%100<10||a%100>=20)?t[1]:t[2]}({mm:a?"\u043c\u0438\u043d\u0443\u0442\u0430_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442":"\u043c\u0438\u043d\u0443\u0442\u0443_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442",hh:"\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043e\u0432",dd:"\u0434\u0435\u043d\u044c_\u0434\u043d\u044f_\u0434\u043d\u0435\u0439",MM:"\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u0430_\u043c\u0435\u0441\u044f\u0446\u0435\u0432",yy:"\u0433\u043e\u0434_\u0433\u043e\u0434\u0430_\u043b\u0435\u0442"}[t],+e)}function Ha(e){return e>1&&e<5}function ba(e,a,t,s){var n=e+" ";switch(t){case"s":return a||s?"p\xe1r sek\xfand":"p\xe1r sekundami";case"m":return a?"min\xfata":s?"min\xfatu":"min\xfatou";case"mm":return a||s?n+(Ha(e)?"min\xfaty":"min\xfat"):n+"min\xfatami";break;case"h":return a?"hodina":s?"hodinu":"hodinou";case"hh":return a||s?n+(Ha(e)?"hodiny":"hod\xedn"):n+"hodinami";break;case"d":return a||s?"de\u0148":"d\u0148om";case"dd":return a||s?n+(Ha(e)?"dni":"dn\xed"):n+"d\u0148ami";break;case"M":return a||s?"mesiac":"mesiacom";case"MM":return a||s?n+(Ha(e)?"mesiace":"mesiacov"):n+"mesiacmi";break;case"y":return a||s?"rok":"rokom";case"yy":return a||s?n+(Ha(e)?"roky":"rokov"):n+"rokmi";break}}function ja(e,a,t,s){var n=e+" ";switch(t){case"s":return a||s?"nekaj sekund":"nekaj sekundami";case"m":return a?"ena minuta":"eno minuto";case"mm":return n+=1===e?a?"minuta":"minuto":2===e?a||s?"minuti":"minutama":e<5?a||s?"minute":"minutami":a||s?"minut":"minutami";case"h":return a?"ena ura":"eno uro";case"hh":return n+=1===e?a?"ura":"uro":2===e?a||s?"uri":"urama":e<5?a||s?"ure":"urami":a||s?"ur":"urami";case"d":return a||s?"en dan":"enim dnem";case"dd":return n+=1===e?a||s?"dan":"dnem":2===e?a||s?"dni":"dnevoma":a||s?"dni":"dnevi";case"M":return a||s?"en mesec":"enim mesecem";case"MM":return n+=1===e?a||s?"mesec":"mesecem":2===e?a||s?"meseca":"mesecema":e<5?a||s?"mesece":"meseci":a||s?"mesecev":"meseci";case"y":return a||s?"eno leto":"enim letom";case"yy":return n+=1===e?a||s?"leto":"letom":2===e?a||s?"leti":"letoma":e<5?a||s?"leta":"leti":a||s?"let":"leti"}}function xa(e,a,t,s){var n=function(e){var a=Math.floor(e%1e3/100),t=Math.floor(e%100/10),s=e%10,n="";a>0&&(n+=Qn[a]+"vatlh");t>0&&(n+=(""!==n?" ":"")+Qn[t]+"maH");s>0&&(n+=(""!==n?" ":"")+Qn[s]);return""===n?"pagh":n}(e);switch(t){case"mm":return n+" tup";case"hh":return n+" rep";case"dd":return n+" jaj";case"MM":return n+" jar";case"yy":return n+" DIS"}}function Pa(e,a,t,s){var n={s:["viensas secunds","'iensas secunds"],m:["'n m\xedut","'iens m\xedut"],mm:[e+" m\xeduts",e+" m\xeduts"],h:["'n \xfeora","'iensa \xfeora"],hh:[e+" \xfeoras",e+" \xfeoras"],d:["'n ziua","'iensa ziua"],dd:[e+" ziuas",e+" ziuas"],M:["'n mes","'iens mes"],MM:[e+" mesen",e+" mesen"],y:["'n ar","'iens ar"],yy:[e+" ars",e+" ars"]};return s?n[t][0]:a?n[t][0]:n[t][1]}function Oa(e,a,t){return"m"===t?a?"\u0445\u0432\u0438\u043b\u0438\u043d\u0430":"\u0445\u0432\u0438\u043b\u0438\u043d\u0443":"h"===t?a?"\u0433\u043e\u0434\u0438\u043d\u0430":"\u0433\u043e\u0434\u0438\u043d\u0443":e+" "+function(e,a){var t=e.split("_");return a%10==1&&a%100!=11?t[0]:a%10>=2&&a%10<=4&&(a%100<10||a%100>=20)?t[1]:t[2]}({mm:a?"\u0445\u0432\u0438\u043b\u0438\u043d\u0430_\u0445\u0432\u0438\u043b\u0438\u043d\u0438_\u0445\u0432\u0438\u043b\u0438\u043d":"\u0445\u0432\u0438\u043b\u0438\u043d\u0443_\u0445\u0432\u0438\u043b\u0438\u043d\u0438_\u0445\u0432\u0438\u043b\u0438\u043d",hh:a?"\u0433\u043e\u0434\u0438\u043d\u0430_\u0433\u043e\u0434\u0438\u043d\u0438_\u0433\u043e\u0434\u0438\u043d":"\u0433\u043e\u0434\u0438\u043d\u0443_\u0433\u043e\u0434\u0438\u043d\u0438_\u0433\u043e\u0434\u0438\u043d",dd:"\u0434\u0435\u043d\u044c_\u0434\u043d\u0456_\u0434\u043d\u0456\u0432",MM:"\u043c\u0456\u0441\u044f\u0446\u044c_\u043c\u0456\u0441\u044f\u0446\u0456_\u043c\u0456\u0441\u044f\u0446\u0456\u0432",yy:"\u0440\u0456\u043a_\u0440\u043e\u043a\u0438_\u0440\u043e\u043a\u0456\u0432"}[t],+e)}function Wa(e){return function(){return e+"\u043e"+(11===this.hours()?"\u0431":"")+"] LT"}}var Ea,Aa;Aa=Array.prototype.some?Array.prototype.some:function(e){for(var a=Object(this),t=a.length>>>0,s=0;s<t;s++)if(s in a&&e.call(this,a[s],s,a))return!0;return!1};var Fa=e.momentProperties=[],za=!1,Ja={};e.suppressDeprecationWarnings=!1,e.deprecationHandler=null;var Na;Na=Object.keys?Object.keys:function(e){var a,t=[];for(a in e)_(e,a)&&t.push(a);return t};var Ra={},Ca={},Ia=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Ga=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ua={},Va={},Ka=/\d/,$a=/\d\d/,Za=/\d{3}/,Ba=/\d{4}/,qa=/[+-]?\d{6}/,Qa=/\d\d?/,Xa=/\d\d\d\d?/,et=/\d\d\d\d\d\d?/,at=/\d{1,3}/,tt=/\d{1,4}/,st=/[+-]?\d{1,6}/,nt=/\d+/,rt=/[+-]?\d+/,dt=/Z|[+-]\d\d:?\d\d/gi,_t=/Z|[+-]\d\d(?::?\d\d)?/gi,it=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,ot={},mt={},ut=0,lt=1,Mt=2,ht=3,Lt=4,ct=5,Yt=6,yt=7,ft=8;j("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),j(0,["YY",2],0,function(){return this.year()%100}),j(0,["YYYY",4],0,"year"),j(0,["YYYYY",5],0,"year"),j(0,["YYYYYY",6,!0],0,"year"),w("year","y"),H("year",1),W("Y",rt),W("YY",Qa,$a),W("YYYY",tt,Ba),W("YYYYY",st,qa),W("YYYYYY",st,qa),F(["YYYYY","YYYYYY"],ut),F("YYYY",function(a,t){t[ut]=2===a.length?e.parseTwoDigitYear(a):Y(a)}),F("YY",function(a,t){t[ut]=e.parseTwoDigitYear(a)}),F("Y",function(e,a){a[ut]=parseInt(e,10)}),e.parseTwoDigitYear=function(e){return Y(e)+(Y(e)>68?1900:2e3)};var pt,kt=C("FullYear",!0);pt=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var a;for(a=0;a<this.length;++a)if(this[a]===e)return a;return-1},j("M",["MM",2],"Mo",function(){return this.month()+1}),j("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),j("MMMM",0,0,function(e){return this.localeData().months(this,e)}),w("month","M"),H("month",8),W("M",Qa),W("MM",Qa,$a),W("MMM",function(e,a){return a.monthsShortRegex(e)}),W("MMMM",function(e,a){return a.monthsRegex(e)}),F(["M","MM"],function(e,a){a[lt]=Y(e)-1}),F(["MMM","MMMM"],function(e,a,t,s){var n=t._locale.monthsParse(e,s,t._strict);null!=n?a[lt]=n:m(t).invalidMonth=e});var Dt=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Tt="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),gt="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),wt=it,vt=it;j("w",["ww",2],"wo","week"),j("W",["WW",2],"Wo","isoWeek"),w("week","w"),w("isoWeek","W"),H("week",5),H("isoWeek",5),W("w",Qa),W("ww",Qa,$a),W("W",Qa),W("WW",Qa,$a),z(["w","ww","W","WW"],function(e,a,t,s){a[s.substr(0,1)]=Y(e)});j("d",0,"do","day"),j("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),j("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),j("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),j("e",0,0,"weekday"),j("E",0,0,"isoWeekday"),w("day","d"),w("weekday","e"),w("isoWeekday","E"),H("day",11),H("weekday",11),H("isoWeekday",11),W("d",Qa),W("e",Qa),W("E",Qa),W("dd",function(e,a){return a.weekdaysMinRegex(e)}),W("ddd",function(e,a){return a.weekdaysShortRegex(e)}),W("dddd",function(e,a){return a.weekdaysRegex(e)}),z(["dd","ddd","dddd"],function(e,a,t,s){var n=t._locale.weekdaysParse(e,s,t._strict);null!=n?a.d=n:m(t).invalidWeekday=e}),z(["d","e","E"],function(e,a,t,s){a[s]=Y(e)});var St="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Ht="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),bt="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),jt=it,xt=it,Pt=it;j("H",["HH",2],0,"hour"),j("h",["hh",2],0,ae),j("k",["kk",2],0,function(){return this.hours()||24}),j("hmm",0,0,function(){return""+ae.apply(this)+b(this.minutes(),2)}),j("hmmss",0,0,function(){return""+ae.apply(this)+b(this.minutes(),2)+b(this.seconds(),2)}),j("Hmm",0,0,function(){return""+this.hours()+b(this.minutes(),2)}),j("Hmmss",0,0,function(){return""+this.hours()+b(this.minutes(),2)+b(this.seconds(),2)}),te("a",!0),te("A",!1),w("hour","h"),H("hour",13),W("a",se),W("A",se),W("H",Qa),W("h",Qa),W("k",Qa),W("HH",Qa,$a),W("hh",Qa,$a),W("kk",Qa,$a),W("hmm",Xa),W("hmmss",et),W("Hmm",Xa),W("Hmmss",et),F(["H","HH"],ht),F(["k","kk"],function(e,a,t){var s=Y(e);a[ht]=24===s?0:s}),F(["a","A"],function(e,a,t){t._isPm=t._locale.isPM(e),t._meridiem=e}),F(["h","hh"],function(e,a,t){a[ht]=Y(e),m(t).bigHour=!0}),F("hmm",function(e,a,t){var s=e.length-2;a[ht]=Y(e.substr(0,s)),a[Lt]=Y(e.substr(s)),m(t).bigHour=!0}),F("hmmss",function(e,a,t){var s=e.length-4,n=e.length-2;a[ht]=Y(e.substr(0,s)),a[Lt]=Y(e.substr(s,2)),a[ct]=Y(e.substr(n)),m(t).bigHour=!0}),F("Hmm",function(e,a,t){var s=e.length-2;a[ht]=Y(e.substr(0,s)),a[Lt]=Y(e.substr(s))}),F("Hmmss",function(e,a,t){var s=e.length-4,n=e.length-2;a[ht]=Y(e.substr(0,s)),a[Lt]=Y(e.substr(s,2)),a[ct]=Y(e.substr(n))});var Ot,Wt=C("Hours",!0),Et={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:Tt,monthsShort:gt,week:{dow:0,doy:6},weekdays:St,weekdaysMin:bt,weekdaysShort:Ht,meridiemParse:/[ap]\.?m?\.?/i},At={},Ft={},zt=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Jt=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Nt=/Z|[+-]\d\d(?::?\d\d)?/,Rt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Ct=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],It=/^\/?Date\((\-?\d+)/i,Gt=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,Ut={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};e.createFromInputFallback=p("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),e.ISO_8601=function(){},e.RFC_2822=function(){};var Vt=p("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=ye.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:l()}),Kt=p("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=ye.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:l()}),$t=["year","quarter","month","week","day","hour","minute","second","millisecond"];Te("Z",":"),Te("ZZ",""),W("Z",_t),W("ZZ",_t),F(["Z","ZZ"],function(e,a,t){t._useUTC=!0,t._tzm=ge(_t,e)});var Zt=/([\+\-]|\d\d)/gi;e.updateOffset=function(){};var Bt=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,qt=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;He.fn=pe.prototype,He.invalid=function(){return He(NaN)};var Qt=xe(1,"add"),Xt=xe(-1,"subtract");e.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",e.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var es=p("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});j(0,["gg",2],0,function(){return this.weekYear()%100}),j(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ae("gggg","weekYear"),Ae("ggggg","weekYear"),Ae("GGGG","isoWeekYear"),Ae("GGGGG","isoWeekYear"),w("weekYear","gg"),w("isoWeekYear","GG"),H("weekYear",1),H("isoWeekYear",1),W("G",rt),W("g",rt),W("GG",Qa,$a),W("gg",Qa,$a),W("GGGG",tt,Ba),W("gggg",tt,Ba),W("GGGGG",st,qa),W("ggggg",st,qa),z(["gggg","ggggg","GGGG","GGGGG"],function(e,a,t,s){a[s.substr(0,2)]=Y(e)}),z(["gg","GG"],function(a,t,s,n){t[n]=e.parseTwoDigitYear(a)}),j("Q",0,"Qo","quarter"),w("quarter","Q"),H("quarter",7),W("Q",Ka),F("Q",function(e,a){a[lt]=3*(Y(e)-1)}),j("D",["DD",2],"Do","date"),w("date","D"),H("date",9),W("D",Qa),W("DD",Qa,$a),W("Do",function(e,a){return e?a._dayOfMonthOrdinalParse||a._ordinalParse:a._dayOfMonthOrdinalParseLenient}),F(["D","DD"],Mt),F("Do",function(e,a){a[Mt]=Y(e.match(Qa)[0])});var as=C("Date",!0);j("DDD",["DDDD",3],"DDDo","dayOfYear"),w("dayOfYear","DDD"),H("dayOfYear",4),W("DDD",at),W("DDDD",Za),F(["DDD","DDDD"],function(e,a,t){t._dayOfYear=Y(e)}),j("m",["mm",2],0,"minute"),w("minute","m"),H("minute",14),W("m",Qa),W("mm",Qa,$a),F(["m","mm"],Lt);var ts=C("Minutes",!1);j("s",["ss",2],0,"second"),w("second","s"),H("second",15),W("s",Qa),W("ss",Qa,$a),F(["s","ss"],ct);var ss=C("Seconds",!1);j("S",0,0,function(){return~~(this.millisecond()/100)}),j(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),j(0,["SSS",3],0,"millisecond"),j(0,["SSSS",4],0,function(){return 10*this.millisecond()}),j(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),j(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),j(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),j(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),j(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),w("millisecond","ms"),H("millisecond",16),W("S",at,Ka),W("SS",at,$a),W("SSS",at,Za);var ns;for(ns="SSSS";ns.length<=9;ns+="S")W(ns,nt);for(ns="S";ns.length<=9;ns+="S")F(ns,ze);var rs=C("Milliseconds",!1);j("z",0,0,"zoneAbbr"),j("zz",0,0,"zoneName");var ds=h.prototype;ds.add=Qt,ds.calendar=function(a,t){var s=a||ye(),n=we(s,this).startOf("day"),r=e.calendarFormat(this,n)||"sameElse",d=t&&(D(t[r])?t[r].call(this,s):t[r]);return this.format(d||this.localeData().calendar(r,this,ye(s)))},ds.clone=function(){return new h(this)},ds.diff=function(e,a,t){var s,n,r;if(!this.isValid())return NaN;if(!(s=we(e,this)).isValid())return NaN;switch(n=6e4*(s.utcOffset()-this.utcOffset()),a=v(a)){case"year":r=Oe(this,s)/12;break;case"month":r=Oe(this,s);break;case"quarter":r=Oe(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-n)/864e5;break;case"week":r=(this-s-n)/6048e5;break;default:r=this-s}return t?r:c(r)},ds.endOf=function(e){return void 0===(e=v(e))||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))},ds.format=function(a){a||(a=this.isUtc()?e.defaultFormatUtc:e.defaultFormat);var t=P(this,a);return this.localeData().postformat(t)},ds.from=function(e,a){return this.isValid()&&(L(e)&&e.isValid()||ye(e).isValid())?He({to:this,from:e}).locale(this.locale()).humanize(!a):this.localeData().invalidDate()},ds.fromNow=function(e){return this.from(ye(),e)},ds.to=function(e,a){return this.isValid()&&(L(e)&&e.isValid()||ye(e).isValid())?He({from:this,to:e}).locale(this.locale()).humanize(!a):this.localeData().invalidDate()},ds.toNow=function(e){return this.to(ye(),e)},ds.get=function(e){return e=v(e),D(this[e])?this[e]():this},ds.invalidAt=function(){return m(this).overflow},ds.isAfter=function(e,a){var t=L(e)?e:ye(e);return!(!this.isValid()||!t.isValid())&&("millisecond"===(a=v(s(a)?"millisecond":a))?this.valueOf()>t.valueOf():t.valueOf()<this.clone().startOf(a).valueOf())},ds.isBefore=function(e,a){var t=L(e)?e:ye(e);return!(!this.isValid()||!t.isValid())&&("millisecond"===(a=v(s(a)?"millisecond":a))?this.valueOf()<t.valueOf():this.clone().endOf(a).valueOf()<t.valueOf())},ds.isBetween=function(e,a,t,s){return("("===(s=s||"()")[0]?this.isAfter(e,t):!this.isBefore(e,t))&&(")"===s[1]?this.isBefore(a,t):!this.isAfter(a,t))},ds.isSame=function(e,a){var t,s=L(e)?e:ye(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(a=v(a||"millisecond"))?this.valueOf()===s.valueOf():(t=s.valueOf(),this.clone().startOf(a).valueOf()<=t&&t<=this.clone().endOf(a).valueOf()))},ds.isSameOrAfter=function(e,a){return this.isSame(e,a)||this.isAfter(e,a)},ds.isSameOrBefore=function(e,a){return this.isSame(e,a)||this.isBefore(e,a)},ds.isValid=function(){return u(this)},ds.lang=es,ds.locale=We,ds.localeData=Ee,ds.max=Kt,ds.min=Vt,ds.parsingFlags=function(){return i({},m(this))},ds.set=function(e,a){if("object"==typeof e)for(var t=function(e){var a=[];for(var t in e)a.push({unit:t,priority:Ca[t]});return a.sort(function(e,a){return e.priority-a.priority}),a}(e=S(e)),s=0;s<t.length;s++)this[t[s].unit](e[t[s].unit]);else if(e=v(e),D(this[e]))return this[e](a);return this},ds.startOf=function(e){switch(e=v(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this},ds.subtract=Xt,ds.toArray=function(){return[this.year(),this.month(),this.date(),this.hour(),this.minute(),this.second(),this.millisecond()]},ds.toObject=function(){return{years:this.year(),months:this.month(),date:this.date(),hours:this.hours(),minutes:this.minutes(),seconds:this.seconds(),milliseconds:this.milliseconds()}},ds.toDate=function(){return new Date(this.valueOf())},ds.toISOString=function(){if(!this.isValid())return null;var e=this.clone().utc();return e.year()<0||e.year()>9999?P(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):D(Date.prototype.toISOString)?this.toDate().toISOString():P(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},ds.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",a="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",a="Z");var t="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",n=a+'[")]';return this.format(t+s+"-MM-DD[T]HH:mm:ss.SSS"+n)},ds.toJSON=function(){return this.isValid()?this.toISOString():null},ds.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},ds.unix=function(){return Math.floor(this.valueOf()/1e3)},ds.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},ds.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},ds.year=kt,ds.isLeapYear=function(){return R(this.year())},ds.weekYear=function(e){return Fe.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},ds.isoWeekYear=function(e){return Fe.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},ds.quarter=ds.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},ds.month=K,ds.daysInMonth=function(){return U(this.year(),this.month())},ds.week=ds.weeks=function(e){var a=this.localeData().week(this);return null==e?a:this.add(7*(e-a),"d")},ds.isoWeek=ds.isoWeeks=function(e){var a=Q(this,1,4).week;return null==e?a:this.add(7*(e-a),"d")},ds.weeksInYear=function(){var e=this.localeData()._week;return X(this.year(),e.dow,e.doy)},ds.isoWeeksInYear=function(){return X(this.year(),1,4)},ds.date=as,ds.day=ds.days=function(e){if(!this.isValid())return null!=e?this:NaN;var a=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=function(e,a){return"string"!=typeof e?e:isNaN(e)?"number"==typeof(e=a.weekdaysParse(e))?e:null:parseInt(e,10)}(e,this.localeData()),this.add(e-a,"d")):a},ds.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var a=(this.day()+7-this.localeData()._week.dow)%7;return null==e?a:this.add(e-a,"d")},ds.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var a=function(e,a){return"string"==typeof e?a.weekdaysParse(e)%7||7:isNaN(e)?null:e}(e,this.localeData());return this.day(this.day()%7?a:a-7)}return this.day()||7},ds.dayOfYear=function(e){var a=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?a:this.add(e-a,"d")},ds.hour=ds.hours=Wt,ds.minute=ds.minutes=ts,ds.second=ds.seconds=ss,ds.millisecond=ds.milliseconds=rs,ds.utcOffset=function(a,t,s){var n,r=this._offset||0;if(!this.isValid())return null!=a?this:NaN;if(null!=a){if("string"==typeof a){if(null===(a=ge(_t,a)))return this}else Math.abs(a)<16&&!s&&(a*=60);return!this._isUTC&&t&&(n=ve(this)),this._offset=a,this._isUTC=!0,null!=n&&this.add(n,"m"),r!==a&&(!t||this._changeInProgress?Pe(this,He(a-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,e.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?r:ve(this)},ds.utc=function(e){return this.utcOffset(0,e)},ds.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(ve(this),"m")),this},ds.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=ge(dt,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},ds.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?ye(e).utcOffset():0,(this.utcOffset()-e)%60==0)},ds.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},ds.isLocal=function(){return!!this.isValid()&&!this._isUTC},ds.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},ds.isUtc=Se,ds.isUTC=Se,ds.zoneAbbr=function(){return this._isUTC?"UTC":""},ds.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},ds.dates=p("dates accessor is deprecated. Use date instead.",as),ds.months=p("months accessor is deprecated. Use month instead",K),ds.years=p("years accessor is deprecated. Use year instead",kt),ds.zone=p("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,a){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,a),this):-this.utcOffset()}),ds.isDSTShifted=p("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!s(this._isDSTShifted))return this._isDSTShifted;var e={};if(M(e,this),(e=ce(e))._a){var a=e._isUTC?o(e._a):ye(e._a);this._isDSTShifted=this.isValid()&&y(e._a,a.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted});var _s=g.prototype;_s.calendar=function(e,a,t){var s=this._calendar[e]||this._calendar.sameElse;return D(s)?s.call(a,t):s},_s.longDateFormat=function(e){var a=this._longDateFormat[e],t=this._longDateFormat[e.toUpperCase()];return a||!t?a:(this._longDateFormat[e]=t.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},_s.invalidDate=function(){return this._invalidDate},_s.ordinal=function(e){return this._ordinal.replace("%d",e)},_s.preparse=Je,_s.postformat=Je,_s.relativeTime=function(e,a,t,s){var n=this._relativeTime[t];return D(n)?n(e,a,t,s):n.replace(/%d/i,e)},_s.pastFuture=function(e,a){var t=this._relativeTime[e>0?"future":"past"];return D(t)?t(a):t.replace(/%s/i,a)},_s.set=function(e){var a,t;for(t in e)D(a=e[t])?this[t]=a:this["_"+t]=a;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},_s.months=function(e,t){return e?a(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||Dt).test(t)?"format":"standalone"][e.month()]:a(this._months)?this._months:this._months.standalone},_s.monthsShort=function(e,t){return e?a(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[Dt.test(t)?"format":"standalone"][e.month()]:a(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},_s.monthsParse=function(e,a,t){var s,n,r;if(this._monthsParseExact)return function(e,a,t){var s,n,r,d=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=o([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return t?"MMM"===a?-1!==(n=pt.call(this._shortMonthsParse,d))?n:null:-1!==(n=pt.call(this._longMonthsParse,d))?n:null:"MMM"===a?-1!==(n=pt.call(this._shortMonthsParse,d))?n:-1!==(n=pt.call(this._longMonthsParse,d))?n:null:-1!==(n=pt.call(this._longMonthsParse,d))?n:-1!==(n=pt.call(this._shortMonthsParse,d))?n:null}.call(this,e,a,t);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(n=o([2e3,s]),t&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(n,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(n,"").replace(".","")+"$","i")),t||this._monthsParse[s]||(r="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),t&&"MMMM"===a&&this._longMonthsParse[s].test(e))return s;if(t&&"MMM"===a&&this._shortMonthsParse[s].test(e))return s;if(!t&&this._monthsParse[s].test(e))return s}},_s.monthsRegex=function(e){return this._monthsParseExact?(_(this,"_monthsRegex")||$.call(this),e?this._monthsStrictRegex:this._monthsRegex):(_(this,"_monthsRegex")||(this._monthsRegex=vt),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},_s.monthsShortRegex=function(e){return this._monthsParseExact?(_(this,"_monthsRegex")||$.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(_(this,"_monthsShortRegex")||(this._monthsShortRegex=wt),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},_s.week=function(e){return Q(e,this._week.dow,this._week.doy).week},_s.firstDayOfYear=function(){return this._week.doy},_s.firstDayOfWeek=function(){return this._week.dow},_s.weekdays=function(e,t){return e?a(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(t)?"format":"standalone"][e.day()]:a(this._weekdays)?this._weekdays:this._weekdays.standalone},_s.weekdaysMin=function(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin},_s.weekdaysShort=function(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort},_s.weekdaysParse=function(e,a,t){var s,n,r;if(this._weekdaysParseExact)return function(e,a,t){var s,n,r,d=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=o([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return t?"dddd"===a?-1!==(n=pt.call(this._weekdaysParse,d))?n:null:"ddd"===a?-1!==(n=pt.call(this._shortWeekdaysParse,d))?n:null:-1!==(n=pt.call(this._minWeekdaysParse,d))?n:null:"dddd"===a?-1!==(n=pt.call(this._weekdaysParse,d))?n:-1!==(n=pt.call(this._shortWeekdaysParse,d))?n:-1!==(n=pt.call(this._minWeekdaysParse,d))?n:null:"ddd"===a?-1!==(n=pt.call(this._shortWeekdaysParse,d))?n:-1!==(n=pt.call(this._weekdaysParse,d))?n:-1!==(n=pt.call(this._minWeekdaysParse,d))?n:null:-1!==(n=pt.call(this._minWeekdaysParse,d))?n:-1!==(n=pt.call(this._weekdaysParse,d))?n:-1!==(n=pt.call(this._shortWeekdaysParse,d))?n:null}.call(this,e,a,t);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(n=o([2e3,1]).day(s),t&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(n,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(n,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(n,"").replace(".",".?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),t&&"dddd"===a&&this._fullWeekdaysParse[s].test(e))return s;if(t&&"ddd"===a&&this._shortWeekdaysParse[s].test(e))return s;if(t&&"dd"===a&&this._minWeekdaysParse[s].test(e))return s;if(!t&&this._weekdaysParse[s].test(e))return s}},_s.weekdaysRegex=function(e){return this._weekdaysParseExact?(_(this,"_weekdaysRegex")||ee.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(_(this,"_weekdaysRegex")||(this._weekdaysRegex=jt),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},_s.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(_(this,"_weekdaysRegex")||ee.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(_(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=xt),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},_s.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(_(this,"_weekdaysRegex")||ee.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(_(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Pt),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},_s.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},_s.meridiem=function(e,a,t){return e>11?t?"pm":"PM":t?"am":"AM"},de("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var a=e%10;return e+(1===Y(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")}}),e.lang=p("moment.lang is deprecated. Use moment.locale instead.",de),e.langData=p("moment.langData is deprecated. Use moment.localeData instead.",ie);var is=Math.abs,os=Ke("ms"),ms=Ke("s"),us=Ke("m"),ls=Ke("h"),Ms=Ke("d"),hs=Ke("w"),Ls=Ke("M"),cs=Ke("y"),Ys=$e("milliseconds"),ys=$e("seconds"),fs=$e("minutes"),ps=$e("hours"),ks=$e("days"),Ds=$e("months"),Ts=$e("years"),gs=Math.round,ws={ss:44,s:45,m:45,h:22,d:26,M:11},vs=Math.abs,Ss=pe.prototype;Ss.isValid=function(){return this._isValid},Ss.abs=function(){var e=this._data;return this._milliseconds=is(this._milliseconds),this._days=is(this._days),this._months=is(this._months),e.milliseconds=is(e.milliseconds),e.seconds=is(e.seconds),e.minutes=is(e.minutes),e.hours=is(e.hours),e.months=is(e.months),e.years=is(e.years),this},Ss.add=function(e,a){return Ie(this,e,a,1)},Ss.subtract=function(e,a){return Ie(this,e,a,-1)},Ss.as=function(e){if(!this.isValid())return NaN;var a,t,s=this._milliseconds;if("month"===(e=v(e))||"year"===e)return a=this._days+s/864e5,t=this._months+Ue(a),"month"===e?t:t/12;switch(a=this._days+Math.round(Ve(this._months)),e){case"week":return a/7+s/6048e5;case"day":return a+s/864e5;case"hour":return 24*a+s/36e5;case"minute":return 1440*a+s/6e4;case"second":return 86400*a+s/1e3;case"millisecond":return Math.floor(864e5*a)+s;default:throw new Error("Unknown unit "+e)}},Ss.asMilliseconds=os,Ss.asSeconds=ms,Ss.asMinutes=us,Ss.asHours=ls,Ss.asDays=Ms,Ss.asWeeks=hs,Ss.asMonths=Ls,Ss.asYears=cs,Ss.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*Y(this._months/12):NaN},Ss._bubble=function(){var e,a,t,s,n,r=this._milliseconds,d=this._days,_=this._months,i=this._data;return r>=0&&d>=0&&_>=0||r<=0&&d<=0&&_<=0||(r+=864e5*Ge(Ve(_)+d),d=0,_=0),i.milliseconds=r%1e3,e=c(r/1e3),i.seconds=e%60,a=c(e/60),i.minutes=a%60,t=c(a/60),i.hours=t%24,d+=c(t/24),n=c(Ue(d)),_+=n,d-=Ge(Ve(n)),s=c(_/12),_%=12,i.days=d,i.months=_,i.years=s,this},Ss.clone=function(){return He(this)},Ss.get=function(e){return e=v(e),this.isValid()?this[e+"s"]():NaN},Ss.milliseconds=Ys,Ss.seconds=ys,Ss.minutes=fs,Ss.hours=ps,Ss.days=ks,Ss.weeks=function(){return c(this.days()/7)},Ss.months=Ds,Ss.years=Ts,Ss.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var a=this.localeData(),t=function(e,a,t){var s=He(e).abs(),n=gs(s.as("s")),r=gs(s.as("m")),d=gs(s.as("h")),_=gs(s.as("d")),i=gs(s.as("M")),o=gs(s.as("y")),m=n<=ws.ss&&["s",n]||n<ws.s&&["ss",n]||r<=1&&["m"]||r<ws.m&&["mm",r]||d<=1&&["h"]||d<ws.h&&["hh",d]||_<=1&&["d"]||_<ws.d&&["dd",_]||i<=1&&["M"]||i<ws.M&&["MM",i]||o<=1&&["y"]||["yy",o];return m[2]=a,m[3]=+e>0,m[4]=t,function(e,a,t,s,n){return n.relativeTime(a||1,!!t,e,s)}.apply(null,m)}(this,!e,a);return e&&(t=a.pastFuture(+this,t)),a.postformat(t)},Ss.toISOString=Be,Ss.toString=Be,Ss.toJSON=Be,Ss.locale=We,Ss.localeData=Ee,Ss.toIsoString=p("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Be),Ss.lang=es,j("X",0,0,"unix"),j("x",0,0,"valueOf"),W("x",rt),W("X",/[+-]?\d+(\.\d{1,3})?/),F("X",function(e,a,t){t._d=new Date(1e3*parseFloat(e,10))}),F("x",function(e,a,t){t._d=new Date(Y(e))}),e.version="2.19.3",function(e){Ea=e}(ye),e.fn=ds,e.min=function(){return fe("isBefore",[].slice.call(arguments,0))},e.max=function(){return fe("isAfter",[].slice.call(arguments,0))},e.now=function(){return Date.now?Date.now():+new Date},e.utc=o,e.unix=function(e){return ye(1e3*e)},e.months=function(e,a){return Re(e,a,"months")},e.isDate=r,e.locale=de,e.invalid=l,e.duration=He,e.isMoment=L,e.weekdays=function(e,a,t){return Ce(e,a,t,"weekdays")},e.parseZone=function(){return ye.apply(null,arguments).parseZone()},e.localeData=ie,e.isDuration=ke,e.monthsShort=function(e,a){return Re(e,a,"monthsShort")},e.weekdaysMin=function(e,a,t){return Ce(e,a,t,"weekdaysMin")},e.defineLocale=_e,e.updateLocale=function(e,a){if(null!=a){var t,s,n=Et;null!=(s=re(e))&&(n=s._config),(t=new g(a=T(n,a))).parentLocale=At[e],At[e]=t,de(e)}else null!=At[e]&&(null!=At[e].parentLocale?At[e]=At[e].parentLocale:null!=At[e]&&delete At[e]);return At[e]},e.locales=function(){return Na(At)},e.weekdaysShort=function(e,a,t){return Ce(e,a,t,"weekdaysShort")},e.normalizeUnits=v,e.relativeTimeRounding=function(e){return void 0===e?gs:"function"==typeof e&&(gs=e,!0)},e.relativeTimeThreshold=function(e,a){return void 0!==ws[e]&&(void 0===a?ws[e]:(ws[e]=a,"s"===e&&(ws.ss=a-1),!0))},e.calendarFormat=function(e,a){var t=e.diff(a,"days",!0);return t<-6?"sameElse":t<-1?"lastWeek":t<0?"lastDay":t<1?"sameDay":t<2?"nextDay":t<7?"nextWeek":"sameElse"},e.prototype=ds,e.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(e){return/^nm$/i.test(e)},meridiem:function(e,a,t){return e<12?t?"vm":"VM":t?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[M\xf4re om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}}),e.defineLocale("ar-dz",{months:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),monthsShort:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0627\u062d\u062f_\u0627\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u0623\u062d_\u0625\u062b_\u062b\u0644\u0627_\u0623\u0631_\u062e\u0645_\u062c\u0645_\u0633\u0628".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:0,doy:4}}),e.defineLocale("ar-kw",{months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:0,doy:12}});var Hs={1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",0:"0"},bs=function(e){return 0===e?0:1===e?1:2===e?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5},js={s:["\u0623\u0642\u0644 \u0645\u0646 \u062b\u0627\u0646\u064a\u0629","\u062b\u0627\u0646\u064a\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062b\u0627\u0646\u064a\u062a\u0627\u0646","\u062b\u0627\u0646\u064a\u062a\u064a\u0646"],"%d \u062b\u0648\u0627\u0646","%d \u062b\u0627\u0646\u064a\u0629","%d \u062b\u0627\u0646\u064a\u0629"],m:["\u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629","\u062f\u0642\u064a\u0642\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062f\u0642\u064a\u0642\u062a\u0627\u0646","\u062f\u0642\u064a\u0642\u062a\u064a\u0646"],"%d \u062f\u0642\u0627\u0626\u0642","%d \u062f\u0642\u064a\u0642\u0629","%d \u062f\u0642\u064a\u0642\u0629"],h:["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629","\u0633\u0627\u0639\u0629 \u0648\u0627\u062d\u062f\u0629",["\u0633\u0627\u0639\u062a\u0627\u0646","\u0633\u0627\u0639\u062a\u064a\u0646"],"%d \u0633\u0627\u0639\u0627\u062a","%d \u0633\u0627\u0639\u0629","%d \u0633\u0627\u0639\u0629"],d:["\u0623\u0642\u0644 \u0645\u0646 \u064a\u0648\u0645","\u064a\u0648\u0645 \u0648\u0627\u062d\u062f",["\u064a\u0648\u0645\u0627\u0646","\u064a\u0648\u0645\u064a\u0646"],"%d \u0623\u064a\u0627\u0645","%d \u064a\u0648\u0645\u064b\u0627","%d \u064a\u0648\u0645"],M:["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631","\u0634\u0647\u0631 \u0648\u0627\u062d\u062f",["\u0634\u0647\u0631\u0627\u0646","\u0634\u0647\u0631\u064a\u0646"],"%d \u0623\u0634\u0647\u0631","%d \u0634\u0647\u0631\u0627","%d \u0634\u0647\u0631"],y:["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645","\u0639\u0627\u0645 \u0648\u0627\u062d\u062f",["\u0639\u0627\u0645\u0627\u0646","\u0639\u0627\u0645\u064a\u0646"],"%d \u0623\u0639\u0648\u0627\u0645","%d \u0639\u0627\u0645\u064b\u0627","%d \u0639\u0627\u0645"]},xs=function(e){return function(a,t,s,n){var r=bs(a),d=js[e][bs(a)];return 2===r&&(d=d[t?0:1]),d.replace(/%d/i,a)}},Ps=["\u064a\u0646\u0627\u064a\u0631","\u0641\u0628\u0631\u0627\u064a\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064a\u0644","\u0645\u0627\u064a\u0648","\u064a\u0648\u0646\u064a\u0648","\u064a\u0648\u0644\u064a\u0648","\u0623\u063a\u0633\u0637\u0633","\u0633\u0628\u062a\u0645\u0628\u0631","\u0623\u0643\u062a\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062f\u064a\u0633\u0645\u0628\u0631"];e.defineLocale("ar-ly",{months:Ps,monthsShort:Ps,weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/\u200fM/\u200fYYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0635|\u0645/,isPM:function(e){return"\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0628\u0639\u062f %s",past:"\u0645\u0646\u0630 %s",s:xs("s"),m:xs("m"),mm:xs("m"),h:xs("h"),hh:xs("h"),d:xs("d"),dd:xs("d"),M:xs("M"),MM:xs("M"),y:xs("y"),yy:xs("y")},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Hs[e]}).replace(/,/g,"\u060c")},week:{dow:6,doy:12}}),e.defineLocale("ar-ma",{months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:6,doy:12}});var Os={1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"},Ws={"\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u0660":"0"};e.defineLocale("ar-sa",{months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a\u0648_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648_\u0623\u063a\u0633\u0637\u0633_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a\u0648_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648_\u0623\u063a\u0633\u0637\u0633_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0635|\u0645/,isPM:function(e){return"\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},preparse:function(e){return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g,function(e){return Ws[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Os[e]}).replace(/,/g,"\u060c")},week:{dow:0,doy:6}}),e.defineLocale("ar-tn",{months:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),monthsShort:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:1,doy:4}});var Es={1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"},As={"\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u0660":"0"},Fs=function(e){return 0===e?0:1===e?1:2===e?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5},zs={s:["\u0623\u0642\u0644 \u0645\u0646 \u062b\u0627\u0646\u064a\u0629","\u062b\u0627\u0646\u064a\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062b\u0627\u0646\u064a\u062a\u0627\u0646","\u062b\u0627\u0646\u064a\u062a\u064a\u0646"],"%d \u062b\u0648\u0627\u0646","%d \u062b\u0627\u0646\u064a\u0629","%d \u062b\u0627\u0646\u064a\u0629"],m:["\u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629","\u062f\u0642\u064a\u0642\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062f\u0642\u064a\u0642\u062a\u0627\u0646","\u062f\u0642\u064a\u0642\u062a\u064a\u0646"],"%d \u062f\u0642\u0627\u0626\u0642","%d \u062f\u0642\u064a\u0642\u0629","%d \u062f\u0642\u064a\u0642\u0629"],h:["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629","\u0633\u0627\u0639\u0629 \u0648\u0627\u062d\u062f\u0629",["\u0633\u0627\u0639\u062a\u0627\u0646","\u0633\u0627\u0639\u062a\u064a\u0646"],"%d \u0633\u0627\u0639\u0627\u062a","%d \u0633\u0627\u0639\u0629","%d \u0633\u0627\u0639\u0629"],d:["\u0623\u0642\u0644 \u0645\u0646 \u064a\u0648\u0645","\u064a\u0648\u0645 \u0648\u0627\u062d\u062f",["\u064a\u0648\u0645\u0627\u0646","\u064a\u0648\u0645\u064a\u0646"],"%d \u0623\u064a\u0627\u0645","%d \u064a\u0648\u0645\u064b\u0627","%d \u064a\u0648\u0645"],M:["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631","\u0634\u0647\u0631 \u0648\u0627\u062d\u062f",["\u0634\u0647\u0631\u0627\u0646","\u0634\u0647\u0631\u064a\u0646"],"%d \u0623\u0634\u0647\u0631","%d \u0634\u0647\u0631\u0627","%d \u0634\u0647\u0631"],y:["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645","\u0639\u0627\u0645 \u0648\u0627\u062d\u062f",["\u0639\u0627\u0645\u0627\u0646","\u0639\u0627\u0645\u064a\u0646"],"%d \u0623\u0639\u0648\u0627\u0645","%d \u0639\u0627\u0645\u064b\u0627","%d \u0639\u0627\u0645"]},Js=function(e){return function(a,t,s,n){var r=Fs(a),d=zs[e][Fs(a)];return 2===r&&(d=d[t?0:1]),d.replace(/%d/i,a)}},Ns=["\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062b\u0627\u0646\u064a \u064a\u0646\u0627\u064a\u0631","\u0634\u0628\u0627\u0637 \u0641\u0628\u0631\u0627\u064a\u0631","\u0622\u0630\u0627\u0631 \u0645\u0627\u0631\u0633","\u0646\u064a\u0633\u0627\u0646 \u0623\u0628\u0631\u064a\u0644","\u0623\u064a\u0627\u0631 \u0645\u0627\u064a\u0648","\u062d\u0632\u064a\u0631\u0627\u0646 \u064a\u0648\u0646\u064a\u0648","\u062a\u0645\u0648\u0632 \u064a\u0648\u0644\u064a\u0648","\u0622\u0628 \u0623\u063a\u0633\u0637\u0633","\u0623\u064a\u0644\u0648\u0644 \u0633\u0628\u062a\u0645\u0628\u0631","\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u0623\u0648\u0644 \u0623\u0643\u062a\u0648\u0628\u0631","\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u062b\u0627\u0646\u064a \u0646\u0648\u0641\u0645\u0628\u0631","\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u0623\u0648\u0644 \u062f\u064a\u0633\u0645\u0628\u0631"];e.defineLocale("ar",{months:Ns,monthsShort:Ns,weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/\u200fM/\u200fYYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0635|\u0645/,isPM:function(e){return"\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0628\u0639\u062f %s",past:"\u0645\u0646\u0630 %s",s:Js("s"),m:Js("m"),mm:Js("m"),h:Js("h"),hh:Js("h"),d:Js("d"),dd:Js("d"),M:Js("M"),MM:Js("M"),y:Js("y"),yy:Js("y")},preparse:function(e){return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g,function(e){return As[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Es[e]}).replace(/,/g,"\u060c")},week:{dow:6,doy:12}});var Rs={1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-\xfcnc\xfc",4:"-\xfcnc\xfc",100:"-\xfcnc\xfc",6:"-nc\u0131",9:"-uncu",10:"-uncu",30:"-uncu",60:"-\u0131nc\u0131",90:"-\u0131nc\u0131"};e.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ert\u0259si_\xc7\u0259r\u015f\u0259nb\u0259 ax\u015fam\u0131_\xc7\u0259r\u015f\u0259nb\u0259_C\xfcm\u0259 ax\u015fam\u0131_C\xfcm\u0259_\u015e\u0259nb\u0259".split("_"),weekdaysShort:"Baz_BzE_\xc7Ax_\xc7\u0259r_CAx_C\xfcm_\u015e\u0259n".split("_"),weekdaysMin:"Bz_BE_\xc7A_\xc7\u0259_CA_C\xfc_\u015e\u0259".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\xfcn saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[g\u0259l\u0259n h\u0259ft\u0259] dddd [saat] LT",lastDay:"[d\xfcn\u0259n] LT",lastWeek:"[ke\xe7\u0259n h\u0259ft\u0259] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \u0259vv\u0259l",s:"birne\xe7\u0259 saniyy\u0259",m:"bir d\u0259qiq\u0259",mm:"%d d\u0259qiq\u0259",h:"bir saat",hh:"%d saat",d:"bir g\xfcn",dd:"%d g\xfcn",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gec\u0259|s\u0259h\u0259r|g\xfcnd\xfcz|ax\u015fam/,isPM:function(e){return/^(g\xfcnd\xfcz|ax\u015fam)$/.test(e)},meridiem:function(e,a,t){return e<4?"gec\u0259":e<12?"s\u0259h\u0259r":e<17?"g\xfcnd\xfcz":"ax\u015fam"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0131nc\u0131|inci|nci|\xfcnc\xfc|nc\u0131|uncu)/,ordinal:function(e){if(0===e)return e+"-\u0131nc\u0131";var a=e%10;return e+(Rs[a]||Rs[e%100-a]||Rs[e>=100?100:null])},week:{dow:1,doy:7}}),e.defineLocale("be",{months:{format:"\u0441\u0442\u0443\u0434\u0437\u0435\u043d\u044f_\u043b\u044e\u0442\u0430\u0433\u0430_\u0441\u0430\u043a\u0430\u0432\u0456\u043a\u0430_\u043a\u0440\u0430\u0441\u0430\u0432\u0456\u043a\u0430_\u0442\u0440\u0430\u045e\u043d\u044f_\u0447\u044d\u0440\u0432\u0435\u043d\u044f_\u043b\u0456\u043f\u0435\u043d\u044f_\u0436\u043d\u0456\u045e\u043d\u044f_\u0432\u0435\u0440\u0430\u0441\u043d\u044f_\u043a\u0430\u0441\u0442\u0440\u044b\u0447\u043d\u0456\u043a\u0430_\u043b\u0456\u0441\u0442\u0430\u043f\u0430\u0434\u0430_\u0441\u043d\u0435\u0436\u043d\u044f".split("_"),standalone:"\u0441\u0442\u0443\u0434\u0437\u0435\u043d\u044c_\u043b\u044e\u0442\u044b_\u0441\u0430\u043a\u0430\u0432\u0456\u043a_\u043a\u0440\u0430\u0441\u0430\u0432\u0456\u043a_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u044d\u0440\u0432\u0435\u043d\u044c_\u043b\u0456\u043f\u0435\u043d\u044c_\u0436\u043d\u0456\u0432\u0435\u043d\u044c_\u0432\u0435\u0440\u0430\u0441\u0435\u043d\u044c_\u043a\u0430\u0441\u0442\u0440\u044b\u0447\u043d\u0456\u043a_\u043b\u0456\u0441\u0442\u0430\u043f\u0430\u0434_\u0441\u043d\u0435\u0436\u0430\u043d\u044c".split("_")},monthsShort:"\u0441\u0442\u0443\u0434_\u043b\u044e\u0442_\u0441\u0430\u043a_\u043a\u0440\u0430\u0441_\u0442\u0440\u0430\u0432_\u0447\u044d\u0440\u0432_\u043b\u0456\u043f_\u0436\u043d\u0456\u0432_\u0432\u0435\u0440_\u043a\u0430\u0441\u0442_\u043b\u0456\u0441\u0442_\u0441\u043d\u0435\u0436".split("_"),weekdays:{format:"\u043d\u044f\u0434\u0437\u0435\u043b\u044e_\u043f\u0430\u043d\u044f\u0434\u0437\u0435\u043b\u0430\u043a_\u0430\u045e\u0442\u043e\u0440\u0430\u043a_\u0441\u0435\u0440\u0430\u0434\u0443_\u0447\u0430\u0446\u0432\u0435\u0440_\u043f\u044f\u0442\u043d\u0456\u0446\u0443_\u0441\u0443\u0431\u043e\u0442\u0443".split("_"),standalone:"\u043d\u044f\u0434\u0437\u0435\u043b\u044f_\u043f\u0430\u043d\u044f\u0434\u0437\u0435\u043b\u0430\u043a_\u0430\u045e\u0442\u043e\u0440\u0430\u043a_\u0441\u0435\u0440\u0430\u0434\u0430_\u0447\u0430\u0446\u0432\u0435\u0440_\u043f\u044f\u0442\u043d\u0456\u0446\u0430_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),isFormat:/\[ ?[\u0412\u0432] ?(?:\u043c\u0456\u043d\u0443\u043b\u0443\u044e|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0443\u044e)? ?\] ?dddd/},weekdaysShort:"\u043d\u0434_\u043f\u043d_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0433.",LLL:"D MMMM YYYY \u0433., HH:mm",LLLL:"dddd, D MMMM YYYY \u0433., HH:mm"},calendar:{sameDay:"[\u0421\u0451\u043d\u043d\u044f \u045e] LT",nextDay:"[\u0417\u0430\u045e\u0442\u0440\u0430 \u045e] LT",lastDay:"[\u0423\u0447\u043e\u0440\u0430 \u045e] LT",nextWeek:function(){return"[\u0423] dddd [\u045e] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[\u0423 \u043c\u0456\u043d\u0443\u043b\u0443\u044e] dddd [\u045e] LT";case 1:case 2:case 4:return"[\u0423 \u043c\u0456\u043d\u0443\u043b\u044b] dddd [\u045e] LT"}},sameElse:"L"},relativeTime:{future:"\u043f\u0440\u0430\u0437 %s",past:"%s \u0442\u0430\u043c\u0443",s:"\u043d\u0435\u043a\u0430\u043b\u044c\u043a\u0456 \u0441\u0435\u043a\u0443\u043d\u0434",m:qe,mm:qe,h:qe,hh:qe,d:"\u0434\u0437\u0435\u043d\u044c",dd:qe,M:"\u043c\u0435\u0441\u044f\u0446",MM:qe,y:"\u0433\u043e\u0434",yy:qe},meridiemParse:/\u043d\u043e\u0447\u044b|\u0440\u0430\u043d\u0456\u0446\u044b|\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430/,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430)$/.test(e)},meridiem:function(e,a,t){return e<4?"\u043d\u043e\u0447\u044b":e<12?"\u0440\u0430\u043d\u0456\u0446\u044b":e<17?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u0430\u0440\u0430"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0456|\u044b|\u0433\u0430)/,ordinal:function(e,a){switch(a){case"M":case"d":case"DDD":case"w":case"W":return e%10!=2&&e%10!=3||e%100==12||e%100==13?e+"-\u044b":e+"-\u0456";case"D":return e+"-\u0433\u0430";default:return e}},week:{dow:1,doy:7}}),e.defineLocale("bg",{months:"\u044f\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"),monthsShort:"\u044f\u043d\u0440_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"),weekdays:"\u043d\u0435\u0434\u0435\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u044f\u0434\u0430_\u0447\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a_\u043f\u0435\u0442\u044a\u043a_\u0441\u044a\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u044f_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u044a\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[\u0414\u043d\u0435\u0441 \u0432] LT",nextDay:"[\u0423\u0442\u0440\u0435 \u0432] LT",nextWeek:"dddd [\u0432] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0430\u0442\u0430] dddd [\u0432] LT";case 1:case 2:case 4:case 5:return"[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0438\u044f] dddd [\u0432] LT"}},sameElse:"L"},relativeTime:{future:"\u0441\u043b\u0435\u0434 %s",past:"\u043f\u0440\u0435\u0434\u0438 %s",s:"\u043d\u044f\u043a\u043e\u043b\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:"\u043c\u0438\u043d\u0443\u0442\u0430",mm:"%d \u043c\u0438\u043d\u0443\u0442\u0438",h:"\u0447\u0430\u0441",hh:"%d \u0447\u0430\u0441\u0430",d:"\u0434\u0435\u043d",dd:"%d \u0434\u043d\u0438",M:"\u043c\u0435\u0441\u0435\u0446",MM:"%d \u043c\u0435\u0441\u0435\u0446\u0430",y:"\u0433\u043e\u0434\u0438\u043d\u0430",yy:"%d \u0433\u043e\u0434\u0438\u043d\u0438"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/,ordinal:function(e){var a=e%10,t=e%100;return 0===e?e+"-\u0435\u0432":0===t?e+"-\u0435\u043d":t>10&&t<20?e+"-\u0442\u0438":1===a?e+"-\u0432\u0438":2===a?e+"-\u0440\u0438":7===a||8===a?e+"-\u043c\u0438":e+"-\u0442\u0438"},week:{dow:1,doy:7}}),e.defineLocale("bm",{months:"Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_M\u025bkalo_Zuw\u025bnkalo_Zuluyekalo_Utikalo_S\u025btanburukalo_\u0254kut\u0254burukalo_Nowanburukalo_Desanburukalo".split("_"),monthsShort:"Zan_Few_Mar_Awi_M\u025b_Zuw_Zul_Uti_S\u025bt_\u0254ku_Now_Des".split("_"),weekdays:"Kari_Nt\u025bn\u025bn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),weekdaysShort:"Kar_Nt\u025b_Tar_Ara_Ala_Jum_Sib".split("_"),weekdaysMin:"Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"MMMM [tile] D [san] YYYY",LLL:"MMMM [tile] D [san] YYYY [l\u025br\u025b] HH:mm",LLLL:"dddd MMMM [tile] D [san] YYYY [l\u025br\u025b] HH:mm"},calendar:{sameDay:"[Bi l\u025br\u025b] LT",nextDay:"[Sini l\u025br\u025b] LT",nextWeek:"dddd [don l\u025br\u025b] LT",lastDay:"[Kunu l\u025br\u025b] LT",lastWeek:"dddd [t\u025bm\u025bnen l\u025br\u025b] LT",sameElse:"L"},relativeTime:{future:"%s k\u0254n\u0254",past:"a b\u025b %s b\u0254",s:"sanga dama dama",m:"miniti kelen",mm:"miniti %d",h:"l\u025br\u025b kelen",hh:"l\u025br\u025b %d",d:"tile kelen",dd:"tile %d",M:"kalo kelen",MM:"kalo %d",y:"san kelen",yy:"san %d"},week:{dow:1,doy:4}});var Cs={1:"\u09e7",2:"\u09e8",3:"\u09e9",4:"\u09ea",5:"\u09eb",6:"\u09ec",7:"\u09ed",8:"\u09ee",9:"\u09ef",0:"\u09e6"},Is={"\u09e7":"1","\u09e8":"2","\u09e9":"3","\u09ea":"4","\u09eb":"5","\u09ec":"6","\u09ed":"7","\u09ee":"8","\u09ef":"9","\u09e6":"0"};e.defineLocale("bn",{months:"\u099c\u09be\u09a8\u09c1\u09df\u09be\u09b0\u09c0_\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1\u09df\u09be\u09b0\u09bf_\u09ae\u09be\u09b0\u09cd\u099a_\u098f\u09aa\u09cd\u09b0\u09bf\u09b2_\u09ae\u09c7_\u099c\u09c1\u09a8_\u099c\u09c1\u09b2\u09be\u0987_\u0986\u0997\u09b8\u09cd\u099f_\u09b8\u09c7\u09aa\u09cd\u099f\u09c7\u09ae\u09cd\u09ac\u09b0_\u0985\u0995\u09cd\u099f\u09cb\u09ac\u09b0_\u09a8\u09ad\u09c7\u09ae\u09cd\u09ac\u09b0_\u09a1\u09bf\u09b8\u09c7\u09ae\u09cd\u09ac\u09b0".split("_"),monthsShort:"\u099c\u09be\u09a8\u09c1_\u09ab\u09c7\u09ac_\u09ae\u09be\u09b0\u09cd\u099a_\u098f\u09aa\u09cd\u09b0_\u09ae\u09c7_\u099c\u09c1\u09a8_\u099c\u09c1\u09b2_\u0986\u0997_\u09b8\u09c7\u09aa\u09cd\u099f_\u0985\u0995\u09cd\u099f\u09cb_\u09a8\u09ad\u09c7_\u09a1\u09bf\u09b8\u09c7".split("_"),weekdays:"\u09b0\u09ac\u09bf\u09ac\u09be\u09b0_\u09b8\u09cb\u09ae\u09ac\u09be\u09b0_\u09ae\u0999\u09cd\u0997\u09b2\u09ac\u09be\u09b0_\u09ac\u09c1\u09a7\u09ac\u09be\u09b0_\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf\u09ac\u09be\u09b0_\u09b6\u09c1\u0995\u09cd\u09b0\u09ac\u09be\u09b0_\u09b6\u09a8\u09bf\u09ac\u09be\u09b0".split("_"),weekdaysShort:"\u09b0\u09ac\u09bf_\u09b8\u09cb\u09ae_\u09ae\u0999\u09cd\u0997\u09b2_\u09ac\u09c1\u09a7_\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf_\u09b6\u09c1\u0995\u09cd\u09b0_\u09b6\u09a8\u09bf".split("_"),weekdaysMin:"\u09b0\u09ac\u09bf_\u09b8\u09cb\u09ae_\u09ae\u0999\u09cd\u0997_\u09ac\u09c1\u09a7_\u09ac\u09c3\u09b9\u0983_\u09b6\u09c1\u0995\u09cd\u09b0_\u09b6\u09a8\u09bf".split("_"),longDateFormat:{LT:"A h:mm \u09b8\u09ae\u09df",LTS:"A h:mm:ss \u09b8\u09ae\u09df",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u09b8\u09ae\u09df",LLLL:"dddd, D MMMM YYYY, A h:mm \u09b8\u09ae\u09df"},calendar:{sameDay:"[\u0986\u099c] LT",nextDay:"[\u0986\u0997\u09be\u09ae\u09c0\u0995\u09be\u09b2] LT",nextWeek:"dddd, LT",lastDay:"[\u0997\u09a4\u0995\u09be\u09b2] LT",lastWeek:"[\u0997\u09a4] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u09aa\u09b0\u09c7",past:"%s \u0986\u0997\u09c7",s:"\u0995\u09df\u09c7\u0995 \u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1",m:"\u098f\u0995 \u09ae\u09bf\u09a8\u09bf\u099f",mm:"%d \u09ae\u09bf\u09a8\u09bf\u099f",h:"\u098f\u0995 \u0998\u09a8\u09cd\u099f\u09be",hh:"%d \u0998\u09a8\u09cd\u099f\u09be",d:"\u098f\u0995 \u09a6\u09bf\u09a8",dd:"%d \u09a6\u09bf\u09a8",M:"\u098f\u0995 \u09ae\u09be\u09b8",MM:"%d \u09ae\u09be\u09b8",y:"\u098f\u0995 \u09ac\u099b\u09b0",yy:"%d \u09ac\u099b\u09b0"},preparse:function(e){return e.replace(/[\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef\u09e6]/g,function(e){return Is[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Cs[e]})},meridiemParse:/\u09b0\u09be\u09a4|\u09b8\u0995\u09be\u09b2|\u09a6\u09c1\u09aa\u09c1\u09b0|\u09ac\u09bf\u0995\u09be\u09b2|\u09b0\u09be\u09a4/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u09b0\u09be\u09a4"===a&&e>=4||"\u09a6\u09c1\u09aa\u09c1\u09b0"===a&&e<5||"\u09ac\u09bf\u0995\u09be\u09b2"===a?e+12:e},meridiem:function(e,a,t){return e<4?"\u09b0\u09be\u09a4":e<10?"\u09b8\u0995\u09be\u09b2":e<17?"\u09a6\u09c1\u09aa\u09c1\u09b0":e<20?"\u09ac\u09bf\u0995\u09be\u09b2":"\u09b0\u09be\u09a4"},week:{dow:0,doy:6}});var Gs={1:"\u0f21",2:"\u0f22",3:"\u0f23",4:"\u0f24",5:"\u0f25",6:"\u0f26",7:"\u0f27",8:"\u0f28",9:"\u0f29",0:"\u0f20"},Us={"\u0f21":"1","\u0f22":"2","\u0f23":"3","\u0f24":"4","\u0f25":"5","\u0f26":"6","\u0f27":"7","\u0f28":"8","\u0f29":"9","\u0f20":"0"};e.defineLocale("bo",{months:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f63\u0f94\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54".split("_"),monthsShort:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f63\u0f94\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54".split("_"),weekdays:"\u0f42\u0f5f\u0f60\u0f0b\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f42\u0f5f\u0f60\u0f0b\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),weekdaysShort:"\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),weekdaysMin:"\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0f51\u0f72\u0f0b\u0f62\u0f72\u0f44] LT",nextDay:"[\u0f66\u0f44\u0f0b\u0f49\u0f72\u0f53] LT",nextWeek:"[\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f55\u0fb2\u0f42\u0f0b\u0f62\u0f97\u0f7a\u0f66\u0f0b\u0f58], LT",lastDay:"[\u0f41\u0f0b\u0f66\u0f44] LT",lastWeek:"[\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f55\u0fb2\u0f42\u0f0b\u0f58\u0f50\u0f60\u0f0b\u0f58] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0f63\u0f0b",past:"%s \u0f66\u0f94\u0f53\u0f0b\u0f63",s:"\u0f63\u0f58\u0f0b\u0f66\u0f44",m:"\u0f66\u0f90\u0f62\u0f0b\u0f58\u0f0b\u0f42\u0f45\u0f72\u0f42",mm:"%d \u0f66\u0f90\u0f62\u0f0b\u0f58",h:"\u0f46\u0f74\u0f0b\u0f5a\u0f7c\u0f51\u0f0b\u0f42\u0f45\u0f72\u0f42",hh:"%d \u0f46\u0f74\u0f0b\u0f5a\u0f7c\u0f51",d:"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f45\u0f72\u0f42",dd:"%d \u0f49\u0f72\u0f53\u0f0b",M:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f45\u0f72\u0f42",MM:"%d \u0f5f\u0fb3\u0f0b\u0f56",y:"\u0f63\u0f7c\u0f0b\u0f42\u0f45\u0f72\u0f42",yy:"%d \u0f63\u0f7c"},preparse:function(e){return e.replace(/[\u0f21\u0f22\u0f23\u0f24\u0f25\u0f26\u0f27\u0f28\u0f29\u0f20]/g,function(e){return Us[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Gs[e]})},meridiemParse:/\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c|\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66|\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44|\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42|\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c"===a&&e>=4||"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44"===a&&e<5||"\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42"===a?e+12:e},meridiem:function(e,a,t){return e<4?"\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c":e<10?"\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66":e<17?"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44":e<20?"\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42":"\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c"},week:{dow:0,doy:6}}),e.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondenno\xf9",m:"ur vunutenn",mm:Qe,h:"un eur",hh:"%d eur",d:"un devezh",dd:Qe,M:"ur miz",MM:Qe,y:"ur bloaz",yy:function(e){switch(Xe(e)){case 1:case 3:case 4:case 5:case 9:return e+" bloaz";default:return e+" vloaz"}}},dayOfMonthOrdinalParse:/\d{1,2}(a\xf1|vet)/,ordinal:function(e){return e+(1===e?"a\xf1":"vet")},week:{dow:1,doy:4}}),e.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010der u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[pro\u0161lu] dddd [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:ea,mm:ea,h:ea,hh:ea,d:"dan",dd:ea,M:"mjesec",MM:ea,y:"godinu",yy:ea},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),e.defineLocale("ca",{months:{standalone:"gener_febrer_mar\xe7_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),format:"de gener_de febrer_de mar\xe7_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"),isFormat:/D[oD]?(\s)+MMMM/},monthsShort:"gen._febr._mar\xe7_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"),monthsParseExact:!0,weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"dg_dl_dt_dc_dj_dv_ds".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [de] YYYY",ll:"D MMM YYYY",LLL:"D MMMM [de] YYYY [a les] H:mm",lll:"D MMM YYYY, H:mm",LLLL:"dddd D MMMM [de] YYYY [a les] H:mm",llll:"ddd D MMM YYYY, H:mm"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[dem\xe0 a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"d'aqu\xed %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},dayOfMonthOrdinalParse:/\d{1,2}(r|n|t|\xe8|a)/,ordinal:function(e,a){var t=1===e?"r":2===e?"n":3===e?"r":4===e?"t":"\xe8";return"w"!==a&&"W"!==a||(t="a"),e+t},week:{dow:1,doy:4}});var Vs="leden_\xfanor_b\u0159ezen_duben_kv\u011bten_\u010derven_\u010dervenec_srpen_z\xe1\u0159\xed_\u0159\xedjen_listopad_prosinec".split("_"),Ks="led_\xfano_b\u0159e_dub_kv\u011b_\u010dvn_\u010dvc_srp_z\xe1\u0159_\u0159\xedj_lis_pro".split("_");e.defineLocale("cs",{months:Vs,monthsShort:Ks,monthsParse:function(e,a){var t,s=[];for(t=0;t<12;t++)s[t]=new RegExp("^"+e[t]+"$|^"+a[t]+"$","i");return s}(Vs,Ks),shortMonthsParse:function(e){var a,t=[];for(a=0;a<12;a++)t[a]=new RegExp("^"+e[a]+"$","i");return t}(Ks),longMonthsParse:function(e){var a,t=[];for(a=0;a<12;a++)t[a]=new RegExp("^"+e[a]+"$","i");return t}(Vs),weekdays:"ned\u011ble_pond\u011bl\xed_\xfater\xfd_st\u0159eda_\u010dtvrtek_p\xe1tek_sobota".split("_"),weekdaysShort:"ne_po_\xfat_st_\u010dt_p\xe1_so".split("_"),weekdaysMin:"ne_po_\xfat_st_\u010dt_p\xe1_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm",l:"D. M. YYYY"},calendar:{sameDay:"[dnes v] LT",nextDay:"[z\xedtra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v ned\u011bli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve st\u0159edu v] LT";case 4:return"[ve \u010dtvrtek v] LT";case 5:return"[v p\xe1tek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[v\u010dera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou ned\u011bli v] LT";case 1:case 2:return"[minul\xe9] dddd [v] LT";case 3:return"[minulou st\u0159edu v] LT";case 4:case 5:return"[minul\xfd] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"p\u0159ed %s",s:ta,m:ta,mm:ta,h:ta,hh:ta,d:ta,dd:ta,M:ta,MM:ta,y:ta,yy:ta},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("cv",{months:"\u043a\u04d1\u0440\u043b\u0430\u0447_\u043d\u0430\u0440\u04d1\u0441_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u04ab\u04d7\u0440\u0442\u043c\u0435_\u0443\u0442\u04d1_\u04ab\u0443\u0440\u043b\u0430_\u0430\u0432\u04d1\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448\u0442\u0430\u0432".split("_"),monthsShort:"\u043a\u04d1\u0440_\u043d\u0430\u0440_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u04ab\u04d7\u0440_\u0443\u0442\u04d1_\u04ab\u0443\u0440_\u0430\u0432\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448".split("_"),weekdays:"\u0432\u044b\u0440\u0441\u0430\u0440\u043d\u0438\u043a\u0443\u043d_\u0442\u0443\u043d\u0442\u0438\u043a\u0443\u043d_\u044b\u0442\u043b\u0430\u0440\u0438\u043a\u0443\u043d_\u044e\u043d\u043a\u0443\u043d_\u043a\u04d7\u04ab\u043d\u0435\u0440\u043d\u0438\u043a\u0443\u043d_\u044d\u0440\u043d\u0435\u043a\u0443\u043d_\u0448\u04d1\u043c\u0430\u0442\u043a\u0443\u043d".split("_"),weekdaysShort:"\u0432\u044b\u0440_\u0442\u0443\u043d_\u044b\u0442\u043b_\u044e\u043d_\u043a\u04d7\u04ab_\u044d\u0440\u043d_\u0448\u04d1\u043c".split("_"),weekdaysMin:"\u0432\u0440_\u0442\u043d_\u044b\u0442_\u044e\u043d_\u043a\u04ab_\u044d\u0440_\u0448\u043c".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7]",LLL:"YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7], HH:mm",LLLL:"dddd, YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7], HH:mm"},calendar:{sameDay:"[\u041f\u0430\u044f\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",nextDay:"[\u042b\u0440\u0430\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",lastDay:"[\u04d6\u043d\u0435\u0440] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",nextWeek:"[\u04aa\u0438\u0442\u0435\u0441] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",lastWeek:"[\u0418\u0440\u0442\u043d\u04d7] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",sameElse:"L"},relativeTime:{future:function(e){return e+(/\u0441\u0435\u0445\u0435\u0442$/i.exec(e)?"\u0440\u0435\u043d":/\u04ab\u0443\u043b$/i.exec(e)?"\u0442\u0430\u043d":"\u0440\u0430\u043d")},past:"%s \u043a\u0430\u044f\u043b\u043b\u0430",s:"\u043f\u04d7\u0440-\u0438\u043a \u04ab\u0435\u043a\u043a\u0443\u043d\u0442",m:"\u043f\u04d7\u0440 \u043c\u0438\u043d\u0443\u0442",mm:"%d \u043c\u0438\u043d\u0443\u0442",h:"\u043f\u04d7\u0440 \u0441\u0435\u0445\u0435\u0442",hh:"%d \u0441\u0435\u0445\u0435\u0442",d:"\u043f\u04d7\u0440 \u043a\u0443\u043d",dd:"%d \u043a\u0443\u043d",M:"\u043f\u04d7\u0440 \u0443\u0439\u04d1\u0445",MM:"%d \u0443\u0439\u04d1\u0445",y:"\u043f\u04d7\u0440 \u04ab\u0443\u043b",yy:"%d \u04ab\u0443\u043b"},dayOfMonthOrdinalParse:/\d{1,2}-\u043c\u04d7\u0448/,ordinal:"%d-\u043c\u04d7\u0448",week:{dow:1,doy:7}}),e.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn \xf4l",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},dayOfMonthOrdinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(e){var a="";return e>20?a=40===e||50===e||60===e||80===e||100===e?"fed":"ain":e>0&&(a=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"][e]),e+a},week:{dow:1,doy:4}}),e.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag".split("_"),weekdaysShort:"s\xf8n_man_tir_ons_tor_fre_l\xf8r".split("_"),weekdaysMin:"s\xf8_ma_ti_on_to_fr_l\xf8".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"p\xe5 dddd [kl.] LT",lastDay:"[i g\xe5r kl.] LT",lastWeek:"[i] dddd[s kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"f\xe5 sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en m\xe5ned",MM:"%d m\xe5neder",y:"et \xe5r",yy:"%d \xe5r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("de-at",{months:"J\xe4nner_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"J\xe4n._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:sa,mm:"%d Minuten",h:sa,hh:"%d Stunden",d:sa,dd:sa,M:sa,MM:sa,y:sa,yy:sa},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("de-ch",{months:"Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH.mm",LLLL:"dddd, D. MMMM YYYY HH.mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:na,mm:"%d Minuten",h:na,hh:"%d Stunden",d:na,dd:na,M:na,MM:na,y:na,yy:na},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("de",{months:"Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:ra,mm:"%d Minuten",h:ra,hh:"%d Stunden",d:ra,dd:ra,M:ra,MM:ra,y:ra,yy:ra},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var $s=["\u0796\u07ac\u0782\u07aa\u0787\u07a6\u0783\u07a9","\u078a\u07ac\u0784\u07b0\u0783\u07aa\u0787\u07a6\u0783\u07a9","\u0789\u07a7\u0783\u07a8\u0797\u07aa","\u0787\u07ad\u0795\u07b0\u0783\u07a9\u078d\u07aa","\u0789\u07ad","\u0796\u07ab\u0782\u07b0","\u0796\u07aa\u078d\u07a6\u0787\u07a8","\u0787\u07af\u078e\u07a6\u0790\u07b0\u0793\u07aa","\u0790\u07ac\u0795\u07b0\u0793\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa","\u0787\u07ae\u0786\u07b0\u0793\u07af\u0784\u07a6\u0783\u07aa","\u0782\u07ae\u0788\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa","\u0791\u07a8\u0790\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa"],Zs=["\u0787\u07a7\u078b\u07a8\u0787\u07b0\u078c\u07a6","\u0780\u07af\u0789\u07a6","\u0787\u07a6\u0782\u07b0\u078e\u07a7\u0783\u07a6","\u0784\u07aa\u078b\u07a6","\u0784\u07aa\u0783\u07a7\u0790\u07b0\u078a\u07a6\u078c\u07a8","\u0780\u07aa\u0786\u07aa\u0783\u07aa","\u0780\u07ae\u0782\u07a8\u0780\u07a8\u0783\u07aa"];e.defineLocale("dv",{months:$s,monthsShort:$s,weekdays:Zs,weekdaysShort:Zs,weekdaysMin:"\u0787\u07a7\u078b\u07a8_\u0780\u07af\u0789\u07a6_\u0787\u07a6\u0782\u07b0_\u0784\u07aa\u078b\u07a6_\u0784\u07aa\u0783\u07a7_\u0780\u07aa\u0786\u07aa_\u0780\u07ae\u0782\u07a8".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/M/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0789\u0786|\u0789\u078a/,isPM:function(e){return"\u0789\u078a"===e},meridiem:function(e,a,t){return e<12?"\u0789\u0786":"\u0789\u078a"},calendar:{sameDay:"[\u0789\u07a8\u0787\u07a6\u078b\u07aa] LT",nextDay:"[\u0789\u07a7\u078b\u07a6\u0789\u07a7] LT",nextWeek:"dddd LT",lastDay:"[\u0787\u07a8\u0787\u07b0\u0794\u07ac] LT",lastWeek:"[\u078a\u07a7\u0787\u07a8\u078c\u07aa\u0788\u07a8] dddd LT",sameElse:"L"},relativeTime:{future:"\u078c\u07ac\u0783\u07ad\u078e\u07a6\u0787\u07a8 %s",past:"\u0786\u07aa\u0783\u07a8\u0782\u07b0 %s",s:"\u0790\u07a8\u0786\u07aa\u0782\u07b0\u078c\u07aa\u0786\u07ae\u0785\u07ac\u0787\u07b0",m:"\u0789\u07a8\u0782\u07a8\u0793\u07ac\u0787\u07b0",mm:"\u0789\u07a8\u0782\u07a8\u0793\u07aa %d",h:"\u078e\u07a6\u0791\u07a8\u0787\u07a8\u0783\u07ac\u0787\u07b0",hh:"\u078e\u07a6\u0791\u07a8\u0787\u07a8\u0783\u07aa %d",d:"\u078b\u07aa\u0788\u07a6\u0780\u07ac\u0787\u07b0",dd:"\u078b\u07aa\u0788\u07a6\u0790\u07b0 %d",M:"\u0789\u07a6\u0780\u07ac\u0787\u07b0",MM:"\u0789\u07a6\u0790\u07b0 %d",y:"\u0787\u07a6\u0780\u07a6\u0783\u07ac\u0787\u07b0",yy:"\u0787\u07a6\u0780\u07a6\u0783\u07aa %d"},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/,/g,"\u060c")},week:{dow:7,doy:12}}),e.defineLocale("el",{monthsNominativeEl:"\u0399\u03b1\u03bd\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2_\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2_\u039c\u03ac\u03c1\u03c4\u03b9\u03bf\u03c2_\u0391\u03c0\u03c1\u03af\u03bb\u03b9\u03bf\u03c2_\u039c\u03ac\u03b9\u03bf\u03c2_\u0399\u03bf\u03cd\u03bd\u03b9\u03bf\u03c2_\u0399\u03bf\u03cd\u03bb\u03b9\u03bf\u03c2_\u0391\u03cd\u03b3\u03bf\u03c5\u03c3\u03c4\u03bf\u03c2_\u03a3\u03b5\u03c0\u03c4\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2_\u039f\u03ba\u03c4\u03ce\u03b2\u03c1\u03b9\u03bf\u03c2_\u039d\u03bf\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2_\u0394\u03b5\u03ba\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2".split("_"),monthsGenitiveEl:"\u0399\u03b1\u03bd\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5_\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5_\u039c\u03b1\u03c1\u03c4\u03af\u03bf\u03c5_\u0391\u03c0\u03c1\u03b9\u03bb\u03af\u03bf\u03c5_\u039c\u03b1\u0390\u03bf\u03c5_\u0399\u03bf\u03c5\u03bd\u03af\u03bf\u03c5_\u0399\u03bf\u03c5\u03bb\u03af\u03bf\u03c5_\u0391\u03c5\u03b3\u03bf\u03cd\u03c3\u03c4\u03bf\u03c5_\u03a3\u03b5\u03c0\u03c4\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5_\u039f\u03ba\u03c4\u03c9\u03b2\u03c1\u03af\u03bf\u03c5_\u039d\u03bf\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5_\u0394\u03b5\u03ba\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5".split("_"),months:function(e,a){return e?"string"==typeof a&&/D/.test(a.substring(0,a.indexOf("MMMM")))?this._monthsGenitiveEl[e.month()]:this._monthsNominativeEl[e.month()]:this._monthsNominativeEl},monthsShort:"\u0399\u03b1\u03bd_\u03a6\u03b5\u03b2_\u039c\u03b1\u03c1_\u0391\u03c0\u03c1_\u039c\u03b1\u03ca_\u0399\u03bf\u03c5\u03bd_\u0399\u03bf\u03c5\u03bb_\u0391\u03c5\u03b3_\u03a3\u03b5\u03c0_\u039f\u03ba\u03c4_\u039d\u03bf\u03b5_\u0394\u03b5\u03ba".split("_"),weekdays:"\u039a\u03c5\u03c1\u03b9\u03b1\u03ba\u03ae_\u0394\u03b5\u03c5\u03c4\u03ad\u03c1\u03b1_\u03a4\u03c1\u03af\u03c4\u03b7_\u03a4\u03b5\u03c4\u03ac\u03c1\u03c4\u03b7_\u03a0\u03ad\u03bc\u03c0\u03c4\u03b7_\u03a0\u03b1\u03c1\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae_\u03a3\u03ac\u03b2\u03b2\u03b1\u03c4\u03bf".split("_"),weekdaysShort:"\u039a\u03c5\u03c1_\u0394\u03b5\u03c5_\u03a4\u03c1\u03b9_\u03a4\u03b5\u03c4_\u03a0\u03b5\u03bc_\u03a0\u03b1\u03c1_\u03a3\u03b1\u03b2".split("_"),weekdaysMin:"\u039a\u03c5_\u0394\u03b5_\u03a4\u03c1_\u03a4\u03b5_\u03a0\u03b5_\u03a0\u03b1_\u03a3\u03b1".split("_"),meridiem:function(e,a,t){return e>11?t?"\u03bc\u03bc":"\u039c\u039c":t?"\u03c0\u03bc":"\u03a0\u039c"},isPM:function(e){return"\u03bc"===(e+"").toLowerCase()[0]},meridiemParse:/[\u03a0\u039c]\.?\u039c?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[\u03a3\u03ae\u03bc\u03b5\u03c1\u03b1 {}] LT",nextDay:"[\u0391\u03cd\u03c1\u03b9\u03bf {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[\u03a7\u03b8\u03b5\u03c2 {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[\u03c4\u03bf \u03c0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03bf] dddd [{}] LT";default:return"[\u03c4\u03b7\u03bd \u03c0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03b7] dddd [{}] LT"}},sameElse:"L"},calendar:function(e,a){var t=this._calendarEl[e],s=a&&a.hours();return D(t)&&(t=t.apply(a)),t.replace("{}",s%12==1?"\u03c3\u03c4\u03b7":"\u03c3\u03c4\u03b9\u03c2")},relativeTime:{future:"\u03c3\u03b5 %s",past:"%s \u03c0\u03c1\u03b9\u03bd",s:"\u03bb\u03af\u03b3\u03b1 \u03b4\u03b5\u03c5\u03c4\u03b5\u03c1\u03cc\u03bb\u03b5\u03c0\u03c4\u03b1",m:"\u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",mm:"%d \u03bb\u03b5\u03c0\u03c4\u03ac",h:"\u03bc\u03af\u03b1 \u03ce\u03c1\u03b1",hh:"%d \u03ce\u03c1\u03b5\u03c2",d:"\u03bc\u03af\u03b1 \u03bc\u03ad\u03c1\u03b1",dd:"%d \u03bc\u03ad\u03c1\u03b5\u03c2",M:"\u03ad\u03bd\u03b1\u03c2 \u03bc\u03ae\u03bd\u03b1\u03c2",MM:"%d \u03bc\u03ae\u03bd\u03b5\u03c2",y:"\u03ad\u03bd\u03b1\u03c2 \u03c7\u03c1\u03cc\u03bd\u03bf\u03c2",yy:"%d \u03c7\u03c1\u03cc\u03bd\u03b9\u03b1"},dayOfMonthOrdinalParse:/\d{1,2}\u03b7/,ordinal:"%d\u03b7",week:{dow:1,doy:4}}),e.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),e.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")}}),e.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),e.defineLocale("en-ie",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),e.defineLocale("en-nz",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),e.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_a\u016dgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_a\u016dg_sep_okt_nov_dec".split("_"),weekdays:"diman\u0109o_lundo_mardo_merkredo_\u0135a\u016ddo_vendredo_sabato".split("_"),weekdaysShort:"dim_lun_mard_merk_\u0135a\u016d_ven_sab".split("_"),weekdaysMin:"di_lu_ma_me_\u0135a_ve_sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-a de] MMMM, YYYY",LLL:"D[-a de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-a de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(e){return"p"===e.charAt(0).toLowerCase()},meridiem:function(e,a,t){return e>11?t?"p.t.m.":"P.T.M.":t?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodia\u016d je] LT",nextDay:"[Morga\u016d je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hiera\u016d je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"post %s",past:"anta\u016d %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},dayOfMonthOrdinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}});var Bs="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),qs="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),Qs=[/^ene/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i],Xs=/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;e.defineLocale("es-do",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?qs[e.month()]:Bs[e.month()]:Bs},monthsRegex:Xs,monthsShortRegex:Xs,monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,monthsParse:Qs,longMonthsParse:Qs,shortMonthsParse:Qs,weekdays:"domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY h:mm A",LLLL:"dddd, D [de] MMMM [de] YYYY h:mm A"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[ma\xf1ana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un a\xf1o",yy:"%d a\xf1os"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}});var en="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),an="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");e.defineLocale("es-us",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?an[e.month()]:en[e.month()]:en},monthsParseExact:!0,weekdays:"domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"MM/DD/YYYY",LL:"MMMM [de] D [de] YYYY",LLL:"MMMM [de] D [de] YYYY H:mm",LLLL:"dddd, MMMM [de] D [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[ma\xf1ana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un a\xf1o",yy:"%d a\xf1os"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:0,doy:6}});var tn="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),sn="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),nn=[/^ene/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i],rn=/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;e.defineLocale("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?sn[e.month()]:tn[e.month()]:tn},monthsRegex:rn,monthsShortRegex:rn,monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,monthsParse:nn,longMonthsParse:nn,shortMonthsParse:nn,weekdays:"domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[ma\xf1ana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un a\xf1o",yy:"%d a\xf1os"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),e.defineLocale("et",{months:"jaanuar_veebruar_m\xe4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_m\xe4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"p\xfchap\xe4ev_esmasp\xe4ev_teisip\xe4ev_kolmap\xe4ev_neljap\xe4ev_reede_laup\xe4ev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[T\xe4na,] LT",nextDay:"[Homme,] LT",nextWeek:"[J\xe4rgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s p\xe4rast",past:"%s tagasi",s:da,m:da,mm:da,h:da,hh:da,d:da,dd:"%d p\xe4eva",M:da,MM:da,y:da,yy:da},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),monthsParseExact:!0,weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});var dn={1:"\u06f1",2:"\u06f2",3:"\u06f3",4:"\u06f4",5:"\u06f5",6:"\u06f6",7:"\u06f7",8:"\u06f8",9:"\u06f9",0:"\u06f0"},_n={"\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9","\u06f0":"0"};e.defineLocale("fa",{months:"\u0698\u0627\u0646\u0648\u06cc\u0647_\u0641\u0648\u0631\u06cc\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06cc\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06cc\u0647_\u0627\u0648\u062a_\u0633\u067e\u062a\u0627\u0645\u0628\u0631_\u0627\u06a9\u062a\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062f\u0633\u0627\u0645\u0628\u0631".split("_"),monthsShort:"\u0698\u0627\u0646\u0648\u06cc\u0647_\u0641\u0648\u0631\u06cc\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06cc\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06cc\u0647_\u0627\u0648\u062a_\u0633\u067e\u062a\u0627\u0645\u0628\u0631_\u0627\u06a9\u062a\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062f\u0633\u0627\u0645\u0628\u0631".split("_"),weekdays:"\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647_\u062f\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200c\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647_\u062c\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),weekdaysShort:"\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647_\u062f\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200c\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647_\u062c\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),weekdaysMin:"\u06cc_\u062f_\u0633_\u0686_\u067e_\u062c_\u0634".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631|\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/,isPM:function(e){return/\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/.test(e)},meridiem:function(e,a,t){return e<12?"\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631":"\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631"},calendar:{sameDay:"[\u0627\u0645\u0631\u0648\u0632 \u0633\u0627\u0639\u062a] LT",nextDay:"[\u0641\u0631\u062f\u0627 \u0633\u0627\u0639\u062a] LT",nextWeek:"dddd [\u0633\u0627\u0639\u062a] LT",lastDay:"[\u062f\u06cc\u0631\u0648\u0632 \u0633\u0627\u0639\u062a] LT",lastWeek:"dddd [\u067e\u06cc\u0634] [\u0633\u0627\u0639\u062a] LT",sameElse:"L"},relativeTime:{future:"\u062f\u0631 %s",past:"%s \u067e\u06cc\u0634",s:"\u0686\u0646\u062f \u062b\u0627\u0646\u06cc\u0647",m:"\u06cc\u06a9 \u062f\u0642\u06cc\u0642\u0647",mm:"%d \u062f\u0642\u06cc\u0642\u0647",h:"\u06cc\u06a9 \u0633\u0627\u0639\u062a",hh:"%d \u0633\u0627\u0639\u062a",d:"\u06cc\u06a9 \u0631\u0648\u0632",dd:"%d \u0631\u0648\u0632",M:"\u06cc\u06a9 \u0645\u0627\u0647",MM:"%d \u0645\u0627\u0647",y:"\u06cc\u06a9 \u0633\u0627\u0644",yy:"%d \u0633\u0627\u0644"},preparse:function(e){return e.replace(/[\u06f0-\u06f9]/g,function(e){return _n[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return dn[e]}).replace(/,/g,"\u060c")},dayOfMonthOrdinalParse:/\d{1,2}\u0645/,ordinal:"%d\u0645",week:{dow:6,doy:12}});var on="nolla yksi kaksi kolme nelj\xe4 viisi kuusi seitsem\xe4n kahdeksan yhdeks\xe4n".split(" "),mn=["nolla","yhden","kahden","kolmen","nelj\xe4n","viiden","kuuden",on[7],on[8],on[9]];e.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xe4kuu_hein\xe4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kes\xe4_hein\xe4_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[t\xe4n\xe4\xe4n] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s p\xe4\xe4st\xe4",past:"%s sitten",s:_a,m:_a,mm:_a,h:_a,hh:_a,d:_a,dd:_a,M:_a,MM:_a,y:_a,yy:_a},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("fo",{months:"januar_februar_mars_apr\xedl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_m\xe1nadagur_t\xfdsdagur_mikudagur_h\xf3sdagur_fr\xedggjadagur_leygardagur".split("_"),weekdaysShort:"sun_m\xe1n_t\xfds_mik_h\xf3s_fr\xed_ley".split("_"),weekdaysMin:"su_m\xe1_t\xfd_mi_h\xf3_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[\xcd dag kl.] LT",nextDay:"[\xcd morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\xcd gj\xe1r kl.] LT",lastWeek:"[s\xed\xf0stu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s s\xed\xf0ani",s:"f\xe1 sekund",m:"ein minutt",mm:"%d minuttir",h:"ein t\xedmi",hh:"%d t\xedmar",d:"ein dagur",dd:"%d dagar",M:"ein m\xe1na\xf0i",MM:"%d m\xe1na\xf0ir",y:"eitt \xe1r",yy:"%d \xe1r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("fr-ca",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|e)/,ordinal:function(e,a){switch(a){default:case"M":case"Q":case"D":case"DDD":case"d":return e+(1===e?"er":"e");case"w":case"W":return e+(1===e?"re":"e")}}}),e.defineLocale("fr-ch",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|e)/,ordinal:function(e,a){switch(a){default:case"M":case"Q":case"D":case"DDD":case"d":return e+(1===e?"er":"e");case"w":case"W":return e+(1===e?"re":"e")}},week:{dow:1,doy:4}}),e.defineLocale("fr",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|)/,ordinal:function(e,a){switch(a){case"D":return e+(1===e?"er":"");default:case"M":case"Q":case"DDD":case"d":return e+(1===e?"er":"e");case"w":case"W":return e+(1===e?"re":"e")}},week:{dow:1,doy:4}});var un="jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),ln="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");e.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?ln[e.month()]:un[e.month()]:un},monthsParseExact:!0,weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[\xf4fr\xfbne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien min\xfat",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});e.defineLocale("gd",{months:["Am Faoilleach","An Gearran","Am M\xe0rt","An Giblean","An C\xe8itean","An t-\xd2gmhios","An t-Iuchar","An L\xf9nastal","An t-Sultain","An D\xe0mhair","An t-Samhain","An D\xf9bhlachd"],monthsShort:["Faoi","Gear","M\xe0rt","Gibl","C\xe8it","\xd2gmh","Iuch","L\xf9n","Sult","D\xe0mh","Samh","D\xf9bh"],monthsParseExact:!0,weekdays:["Did\xf2mhnaich","Diluain","Dim\xe0irt","Diciadain","Diardaoin","Dihaoine","Disathairne"],weekdaysShort:["Did","Dil","Dim","Dic","Dia","Dih","Dis"],weekdaysMin:["D\xf2","Lu","M\xe0","Ci","Ar","Ha","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[An-diugh aig] LT",nextDay:"[A-m\xe0ireach aig] LT",nextWeek:"dddd [aig] LT",lastDay:"[An-d\xe8 aig] LT",lastWeek:"dddd [seo chaidh] [aig] LT",sameElse:"L"},relativeTime:{future:"ann an %s",past:"bho chionn %s",s:"beagan diogan",m:"mionaid",mm:"%d mionaidean",h:"uair",hh:"%d uairean",d:"latha",dd:"%d latha",M:"m\xecos",MM:"%d m\xecosan",y:"bliadhna",yy:"%d bliadhna"},dayOfMonthOrdinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(e){return e+(1===e?"d":e%10==2?"na":"mh")},week:{dow:1,doy:4}}),e.defineLocale("gl",{months:"xaneiro_febreiro_marzo_abril_maio_xu\xf1o_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),monthsShort:"xan._feb._mar._abr._mai._xu\xf1._xul._ago._set._out._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"domingo_luns_martes_m\xe9rcores_xoves_venres_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._m\xe9r._xov._ven._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_m\xe9_xo_ve_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"\xe1s":"\xe1")+"] LT"},nextDay:function(){return"[ma\xf1\xe1 "+(1!==this.hours()?"\xe1s":"\xe1")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"\xe1s":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"\xe1":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"\xe1s":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(e){return 0===e.indexOf("un")?"n"+e:"en "+e},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),e.defineLocale("gom-latn",{months:"Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),monthsShort:"Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),weekdaysShort:"Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),weekdaysMin:"Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"A h:mm [vazta]",LTS:"A h:mm:ss [vazta]",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY A h:mm [vazta]",LLLL:"dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",llll:"ddd, D MMM YYYY, A h:mm [vazta]"},calendar:{sameDay:"[Aiz] LT",nextDay:"[Faleam] LT",nextWeek:"[Ieta to] dddd[,] LT",lastDay:"[Kal] LT",lastWeek:"[Fatlo] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s",past:"%s adim",s:ia,m:ia,mm:ia,h:ia,hh:ia,d:ia,dd:ia,M:ia,MM:ia,y:ia,yy:ia},dayOfMonthOrdinalParse:/\d{1,2}(er)/,ordinal:function(e,a){switch(a){case"D":return e+"er";default:case"M":case"Q":case"DDD":case"d":case"w":case"W":return e}},week:{dow:1,doy:4},meridiemParse:/rati|sokalli|donparam|sanje/,meridiemHour:function(e,a){return 12===e&&(e=0),"rati"===a?e<4?e:e+12:"sokalli"===a?e:"donparam"===a?e>12?e:e+12:"sanje"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"rati":e<12?"sokalli":e<16?"donparam":e<20?"sanje":"rati"}});var Mn={1:"\u0ae7",2:"\u0ae8",3:"\u0ae9",4:"\u0aea",5:"\u0aeb",6:"\u0aec",7:"\u0aed",8:"\u0aee",9:"\u0aef",0:"\u0ae6"},hn={"\u0ae7":"1","\u0ae8":"2","\u0ae9":"3","\u0aea":"4","\u0aeb":"5","\u0aec":"6","\u0aed":"7","\u0aee":"8","\u0aef":"9","\u0ae6":"0"};e.defineLocale("gu",{months:"\u0a9c\u0abe\u0aa8\u0acd\u0aaf\u0ac1\u0a86\u0ab0\u0ac0_\u0aab\u0ac7\u0aac\u0acd\u0ab0\u0ac1\u0a86\u0ab0\u0ac0_\u0aae\u0abe\u0ab0\u0acd\u0a9a_\u0a8f\u0aaa\u0acd\u0ab0\u0abf\u0ab2_\u0aae\u0ac7_\u0a9c\u0ac2\u0aa8_\u0a9c\u0ac1\u0ab2\u0abe\u0a88_\u0a91\u0a97\u0ab8\u0acd\u0a9f_\u0ab8\u0aaa\u0acd\u0a9f\u0ac7\u0aae\u0acd\u0aac\u0ab0_\u0a91\u0a95\u0acd\u0a9f\u0acd\u0aac\u0ab0_\u0aa8\u0ab5\u0ac7\u0aae\u0acd\u0aac\u0ab0_\u0aa1\u0abf\u0ab8\u0ac7\u0aae\u0acd\u0aac\u0ab0".split("_"),monthsShort:"\u0a9c\u0abe\u0aa8\u0acd\u0aaf\u0ac1._\u0aab\u0ac7\u0aac\u0acd\u0ab0\u0ac1._\u0aae\u0abe\u0ab0\u0acd\u0a9a_\u0a8f\u0aaa\u0acd\u0ab0\u0abf._\u0aae\u0ac7_\u0a9c\u0ac2\u0aa8_\u0a9c\u0ac1\u0ab2\u0abe._\u0a91\u0a97._\u0ab8\u0aaa\u0acd\u0a9f\u0ac7._\u0a91\u0a95\u0acd\u0a9f\u0acd._\u0aa8\u0ab5\u0ac7._\u0aa1\u0abf\u0ab8\u0ac7.".split("_"),monthsParseExact:!0,weekdays:"\u0ab0\u0ab5\u0abf\u0ab5\u0abe\u0ab0_\u0ab8\u0acb\u0aae\u0ab5\u0abe\u0ab0_\u0aae\u0a82\u0a97\u0ab3\u0ab5\u0abe\u0ab0_\u0aac\u0ac1\u0aa7\u0acd\u0ab5\u0abe\u0ab0_\u0a97\u0ac1\u0ab0\u0ac1\u0ab5\u0abe\u0ab0_\u0ab6\u0ac1\u0a95\u0acd\u0ab0\u0ab5\u0abe\u0ab0_\u0ab6\u0aa8\u0abf\u0ab5\u0abe\u0ab0".split("_"),weekdaysShort:"\u0ab0\u0ab5\u0abf_\u0ab8\u0acb\u0aae_\u0aae\u0a82\u0a97\u0ab3_\u0aac\u0ac1\u0aa7\u0acd_\u0a97\u0ac1\u0ab0\u0ac1_\u0ab6\u0ac1\u0a95\u0acd\u0ab0_\u0ab6\u0aa8\u0abf".split("_"),weekdaysMin:"\u0ab0_\u0ab8\u0acb_\u0aae\u0a82_\u0aac\u0ac1_\u0a97\u0ac1_\u0ab6\u0ac1_\u0ab6".split("_"),longDateFormat:{LT:"A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7",LTS:"A h:mm:ss \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7",LLLL:"dddd, D MMMM YYYY, A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7"},calendar:{sameDay:"[\u0a86\u0a9c] LT",nextDay:"[\u0a95\u0abe\u0ab2\u0ac7] LT",nextWeek:"dddd, LT",lastDay:"[\u0a97\u0a87\u0a95\u0abe\u0ab2\u0ac7] LT",lastWeek:"[\u0aaa\u0abe\u0a9b\u0ab2\u0abe] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0aae\u0abe",past:"%s \u0aaa\u0ac7\u0ab9\u0ab2\u0abe",s:"\u0a85\u0aae\u0ac1\u0a95 \u0aaa\u0ab3\u0acb",m:"\u0a8f\u0a95 \u0aae\u0abf\u0aa8\u0abf\u0a9f",mm:"%d \u0aae\u0abf\u0aa8\u0abf\u0a9f",h:"\u0a8f\u0a95 \u0a95\u0ab2\u0abe\u0a95",hh:"%d \u0a95\u0ab2\u0abe\u0a95",d:"\u0a8f\u0a95 \u0aa6\u0abf\u0ab5\u0ab8",dd:"%d \u0aa6\u0abf\u0ab5\u0ab8",M:"\u0a8f\u0a95 \u0aae\u0ab9\u0abf\u0aa8\u0acb",MM:"%d \u0aae\u0ab9\u0abf\u0aa8\u0acb",y:"\u0a8f\u0a95 \u0ab5\u0ab0\u0acd\u0ab7",yy:"%d \u0ab5\u0ab0\u0acd\u0ab7"},preparse:function(e){return e.replace(/[\u0ae7\u0ae8\u0ae9\u0aea\u0aeb\u0aec\u0aed\u0aee\u0aef\u0ae6]/g,function(e){return hn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Mn[e]})},meridiemParse:/\u0ab0\u0abe\u0aa4|\u0aac\u0aaa\u0acb\u0ab0|\u0ab8\u0ab5\u0abe\u0ab0|\u0ab8\u0abe\u0a82\u0a9c/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0ab0\u0abe\u0aa4"===a?e<4?e:e+12:"\u0ab8\u0ab5\u0abe\u0ab0"===a?e:"\u0aac\u0aaa\u0acb\u0ab0"===a?e>=10?e:e+12:"\u0ab8\u0abe\u0a82\u0a9c"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0ab0\u0abe\u0aa4":e<10?"\u0ab8\u0ab5\u0abe\u0ab0":e<17?"\u0aac\u0aaa\u0acb\u0ab0":e<20?"\u0ab8\u0abe\u0a82\u0a9c":"\u0ab0\u0abe\u0aa4"},week:{dow:0,doy:6}}),e.defineLocale("he",{months:"\u05d9\u05e0\u05d5\u05d0\u05e8_\u05e4\u05d1\u05e8\u05d5\u05d0\u05e8_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05d9\u05dc_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05d5\u05e1\u05d8_\u05e1\u05e4\u05d8\u05de\u05d1\u05e8_\u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8_\u05e0\u05d5\u05d1\u05de\u05d1\u05e8_\u05d3\u05e6\u05de\u05d1\u05e8".split("_"),monthsShort:"\u05d9\u05e0\u05d5\u05f3_\u05e4\u05d1\u05e8\u05f3_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05f3_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05f3_\u05e1\u05e4\u05d8\u05f3_\u05d0\u05d5\u05e7\u05f3_\u05e0\u05d5\u05d1\u05f3_\u05d3\u05e6\u05de\u05f3".split("_"),weekdays:"\u05e8\u05d0\u05e9\u05d5\u05df_\u05e9\u05e0\u05d9_\u05e9\u05dc\u05d9\u05e9\u05d9_\u05e8\u05d1\u05d9\u05e2\u05d9_\u05d7\u05de\u05d9\u05e9\u05d9_\u05e9\u05d9\u05e9\u05d9_\u05e9\u05d1\u05ea".split("_"),weekdaysShort:"\u05d0\u05f3_\u05d1\u05f3_\u05d2\u05f3_\u05d3\u05f3_\u05d4\u05f3_\u05d5\u05f3_\u05e9\u05f3".split("_"),weekdaysMin:"\u05d0_\u05d1_\u05d2_\u05d3_\u05d4_\u05d5_\u05e9".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [\u05d1]MMMM YYYY",LLL:"D [\u05d1]MMMM YYYY HH:mm",LLLL:"dddd, D [\u05d1]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[\u05d4\u05d9\u05d5\u05dd \u05d1\u05be]LT",nextDay:"[\u05de\u05d7\u05e8 \u05d1\u05be]LT",nextWeek:"dddd [\u05d1\u05e9\u05e2\u05d4] LT",lastDay:"[\u05d0\u05ea\u05de\u05d5\u05dc \u05d1\u05be]LT",lastWeek:"[\u05d1\u05d9\u05d5\u05dd] dddd [\u05d4\u05d0\u05d7\u05e8\u05d5\u05df \u05d1\u05e9\u05e2\u05d4] LT",sameElse:"L"},relativeTime:{future:"\u05d1\u05e2\u05d5\u05d3 %s",past:"\u05dc\u05e4\u05e0\u05d9 %s",s:"\u05de\u05e1\u05e4\u05e8 \u05e9\u05e0\u05d9\u05d5\u05ea",m:"\u05d3\u05e7\u05d4",mm:"%d \u05d3\u05e7\u05d5\u05ea",h:"\u05e9\u05e2\u05d4",hh:function(e){return 2===e?"\u05e9\u05e2\u05ea\u05d9\u05d9\u05dd":e+" \u05e9\u05e2\u05d5\u05ea"},d:"\u05d9\u05d5\u05dd",dd:function(e){return 2===e?"\u05d9\u05d5\u05de\u05d9\u05d9\u05dd":e+" \u05d9\u05de\u05d9\u05dd"},M:"\u05d7\u05d5\u05d3\u05e9",MM:function(e){return 2===e?"\u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd":e+" \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd"},y:"\u05e9\u05e0\u05d4",yy:function(e){return 2===e?"\u05e9\u05e0\u05ea\u05d9\u05d9\u05dd":e%10==0&&10!==e?e+" \u05e9\u05e0\u05d4":e+" \u05e9\u05e0\u05d9\u05dd"}},meridiemParse:/\u05d0\u05d7\u05d4"\u05e6|\u05dc\u05e4\u05e0\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d5\u05ea \u05d1\u05d5\u05e7\u05e8|\u05d1\u05d1\u05d5\u05e7\u05e8|\u05d1\u05e2\u05e8\u05d1/i,isPM:function(e){return/^(\u05d0\u05d7\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05d1\u05e2\u05e8\u05d1)$/.test(e)},meridiem:function(e,a,t){return e<5?"\u05dc\u05e4\u05e0\u05d5\u05ea \u05d1\u05d5\u05e7\u05e8":e<10?"\u05d1\u05d1\u05d5\u05e7\u05e8":e<12?t?'\u05dc\u05e4\u05e0\u05d4"\u05e6':"\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd":e<18?t?'\u05d0\u05d7\u05d4"\u05e6':"\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd":"\u05d1\u05e2\u05e8\u05d1"}});var Ln={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"},cn={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"};e.defineLocale("hi",{months:"\u091c\u0928\u0935\u0930\u0940_\u092b\u093c\u0930\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u0948\u0932_\u092e\u0908_\u091c\u0942\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0938\u094d\u0924_\u0938\u093f\u0924\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u0942\u092c\u0930_\u0928\u0935\u092e\u094d\u092c\u0930_\u0926\u093f\u0938\u092e\u094d\u092c\u0930".split("_"),monthsShort:"\u091c\u0928._\u092b\u093c\u0930._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u0948._\u092e\u0908_\u091c\u0942\u0928_\u091c\u0941\u0932._\u0905\u0917._\u0938\u093f\u0924._\u0905\u0915\u094d\u091f\u0942._\u0928\u0935._\u0926\u093f\u0938.".split("_"),monthsParseExact:!0,weekdays:"\u0930\u0935\u093f\u0935\u093e\u0930_\u0938\u094b\u092e\u0935\u093e\u0930_\u092e\u0902\u0917\u0932\u0935\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u0917\u0941\u0930\u0942\u0935\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930_\u0936\u0928\u093f\u0935\u093e\u0930".split("_"),weekdaysShort:"\u0930\u0935\u093f_\u0938\u094b\u092e_\u092e\u0902\u0917\u0932_\u092c\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094d\u0930_\u0936\u0928\u093f".split("_"),weekdaysMin:"\u0930_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),longDateFormat:{LT:"A h:mm \u092c\u091c\u0947",LTS:"A h:mm:ss \u092c\u091c\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u092c\u091c\u0947",LLLL:"dddd, D MMMM YYYY, A h:mm \u092c\u091c\u0947"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u0915\u0932] LT",nextWeek:"dddd, LT",lastDay:"[\u0915\u0932] LT",lastWeek:"[\u092a\u093f\u091b\u0932\u0947] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u092e\u0947\u0902",past:"%s \u092a\u0939\u0932\u0947",s:"\u0915\u0941\u091b \u0939\u0940 \u0915\u094d\u0937\u0923",m:"\u090f\u0915 \u092e\u093f\u0928\u091f",mm:"%d \u092e\u093f\u0928\u091f",h:"\u090f\u0915 \u0918\u0902\u091f\u093e",hh:"%d \u0918\u0902\u091f\u0947",d:"\u090f\u0915 \u0926\u093f\u0928",dd:"%d \u0926\u093f\u0928",M:"\u090f\u0915 \u092e\u0939\u0940\u0928\u0947",MM:"%d \u092e\u0939\u0940\u0928\u0947",y:"\u090f\u0915 \u0935\u0930\u094d\u0937",yy:"%d \u0935\u0930\u094d\u0937"},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return cn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Ln[e]})},meridiemParse:/\u0930\u093e\u0924|\u0938\u0941\u092c\u0939|\u0926\u094b\u092a\u0939\u0930|\u0936\u093e\u092e/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0930\u093e\u0924"===a?e<4?e:e+12:"\u0938\u0941\u092c\u0939"===a?e:"\u0926\u094b\u092a\u0939\u0930"===a?e>=10?e:e+12:"\u0936\u093e\u092e"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0930\u093e\u0924":e<10?"\u0938\u0941\u092c\u0939":e<17?"\u0926\u094b\u092a\u0939\u0930":e<20?"\u0936\u093e\u092e":"\u0930\u093e\u0924"},week:{dow:0,doy:6}}),e.defineLocale("hr",{months:{format:"sije\u010dnja_velja\u010de_o\u017eujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),standalone:"sije\u010danj_velja\u010da_o\u017eujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")},monthsShort:"sij._velj._o\u017eu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010der u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[pro\u0161lu] dddd [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:oa,mm:oa,h:oa,hh:oa,d:"dan",dd:oa,M:"mjesec",MM:oa,y:"godinu",yy:oa},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});var Yn="vas\xe1rnap h\xe9tf\u0151n kedden szerd\xe1n cs\xfct\xf6rt\xf6k\xf6n p\xe9nteken szombaton".split(" ");e.defineLocale("hu",{months:"janu\xe1r_febru\xe1r_m\xe1rcius_\xe1prilis_m\xe1jus_j\xfanius_j\xfalius_augusztus_szeptember_okt\xf3ber_november_december".split("_"),monthsShort:"jan_feb_m\xe1rc_\xe1pr_m\xe1j_j\xfan_j\xfal_aug_szept_okt_nov_dec".split("_"),weekdays:"vas\xe1rnap_h\xe9tf\u0151_kedd_szerda_cs\xfct\xf6rt\xf6k_p\xe9ntek_szombat".split("_"),weekdaysShort:"vas_h\xe9t_kedd_sze_cs\xfct_p\xe9n_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(e){return"u"===e.charAt(1).toLowerCase()},meridiem:function(e,a,t){return e<12?!0===t?"de":"DE":!0===t?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return ua.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return ua.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s m\xfalva",past:"%s",s:ma,m:ma,mm:ma,h:ma,hh:ma,d:ma,dd:ma,M:ma,MM:ma,y:ma,yy:ma},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("hy-am",{months:{format:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580\u056b_\u0583\u0565\u057f\u0580\u057e\u0561\u0580\u056b_\u0574\u0561\u0580\u057f\u056b_\u0561\u057a\u0580\u056b\u056c\u056b_\u0574\u0561\u0575\u056b\u057d\u056b_\u0570\u0578\u0582\u0576\u056b\u057d\u056b_\u0570\u0578\u0582\u056c\u056b\u057d\u056b_\u0585\u0563\u0578\u057d\u057f\u0578\u057d\u056b_\u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580\u056b_\u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056b_\u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b".split("_"),standalone:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580_\u0583\u0565\u057f\u0580\u057e\u0561\u0580_\u0574\u0561\u0580\u057f_\u0561\u057a\u0580\u056b\u056c_\u0574\u0561\u0575\u056b\u057d_\u0570\u0578\u0582\u0576\u056b\u057d_\u0570\u0578\u0582\u056c\u056b\u057d_\u0585\u0563\u0578\u057d\u057f\u0578\u057d_\u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580_\u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580_\u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580".split("_")},monthsShort:"\u0570\u0576\u057e_\u0583\u057f\u0580_\u0574\u0580\u057f_\u0561\u057a\u0580_\u0574\u0575\u057d_\u0570\u0576\u057d_\u0570\u056c\u057d_\u0585\u0563\u057d_\u057d\u057a\u057f_\u0570\u056f\u057f_\u0576\u0574\u0562_\u0564\u056f\u057f".split("_"),weekdays:"\u056f\u056b\u0580\u0561\u056f\u056b_\u0565\u0580\u056f\u0578\u0582\u0577\u0561\u0562\u0569\u056b_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b_\u0570\u056b\u0576\u0563\u0577\u0561\u0562\u0569\u056b_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569".split("_"),weekdaysShort:"\u056f\u0580\u056f_\u0565\u0580\u056f_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),weekdaysMin:"\u056f\u0580\u056f_\u0565\u0580\u056f_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0569.",LLL:"D MMMM YYYY \u0569., HH:mm",LLLL:"dddd, D MMMM YYYY \u0569., HH:mm"},calendar:{sameDay:"[\u0561\u0575\u057d\u0585\u0580] LT",nextDay:"[\u057e\u0561\u0572\u0568] LT",lastDay:"[\u0565\u0580\u0565\u056f] LT",nextWeek:function(){return"dddd [\u0585\u0580\u0568 \u056a\u0561\u0574\u0568] LT"},lastWeek:function(){return"[\u0561\u0576\u0581\u0561\u056e] dddd [\u0585\u0580\u0568 \u056a\u0561\u0574\u0568] LT"},sameElse:"L"},relativeTime:{future:"%s \u0570\u0565\u057f\u0578",past:"%s \u0561\u057c\u0561\u057b",s:"\u0574\u056b \u0584\u0561\u0576\u056b \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576",m:"\u0580\u0578\u057a\u0565",mm:"%d \u0580\u0578\u057a\u0565",h:"\u056a\u0561\u0574",hh:"%d \u056a\u0561\u0574",d:"\u0585\u0580",dd:"%d \u0585\u0580",M:"\u0561\u0574\u056b\u057d",MM:"%d \u0561\u0574\u056b\u057d",y:"\u057f\u0561\u0580\u056b",yy:"%d \u057f\u0561\u0580\u056b"},meridiemParse:/\u0563\u056b\u0577\u0565\u0580\u057e\u0561|\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561|\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576/,isPM:function(e){return/^(\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576)$/.test(e)},meridiem:function(e){return e<4?"\u0563\u056b\u0577\u0565\u0580\u057e\u0561":e<12?"\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561":e<17?"\u0581\u0565\u0580\u0565\u056f\u057e\u0561":"\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576"},dayOfMonthOrdinalParse:/\d{1,2}|\d{1,2}-(\u056b\u0576|\u0580\u0564)/,ordinal:function(e,a){switch(a){case"DDD":case"w":case"W":case"DDDo":return 1===e?e+"-\u056b\u0576":e+"-\u0580\u0564";default:return e}},week:{dow:1,doy:7}}),e.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(e,a){return 12===e&&(e=0),"pagi"===a?e:"siang"===a?e>=11?e:e+12:"sore"===a||"malam"===a?e+12:void 0},meridiem:function(e,a,t){return e<11?"pagi":e<15?"siang":e<19?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),e.defineLocale("is",{months:"jan\xfaar_febr\xfaar_mars_apr\xedl_ma\xed_j\xfan\xed_j\xfal\xed_\xe1g\xfast_september_okt\xf3ber_n\xf3vember_desember".split("_"),monthsShort:"jan_feb_mar_apr_ma\xed_j\xfan_j\xfal_\xe1g\xfa_sep_okt_n\xf3v_des".split("_"),weekdays:"sunnudagur_m\xe1nudagur_\xferi\xf0judagur_mi\xf0vikudagur_fimmtudagur_f\xf6studagur_laugardagur".split("_"),weekdaysShort:"sun_m\xe1n_\xferi_mi\xf0_fim_f\xf6s_lau".split("_"),weekdaysMin:"Su_M\xe1_\xder_Mi_Fi_F\xf6_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[\xed dag kl.] LT",nextDay:"[\xe1 morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\xed g\xe6r kl.] LT",lastWeek:"[s\xed\xf0asta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s s\xed\xf0an",s:Ma,m:Ma,mm:Ma,h:"klukkustund",hh:Ma,d:Ma,dd:Ma,M:Ma,MM:Ma,y:Ma,yy:Ma},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"domenica_luned\xec_marted\xec_mercoled\xec_gioved\xec_venerd\xec_sabato".split("_"),weekdaysShort:"dom_lun_mar_mer_gio_ven_sab".split("_"),weekdaysMin:"do_lu_ma_me_gi_ve_sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(e){return(/^[0-9].+$/.test(e)?"tra":"in")+" "+e},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),e.defineLocale("ja",{months:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u65e5\u66dc\u65e5_\u6708\u66dc\u65e5_\u706b\u66dc\u65e5_\u6c34\u66dc\u65e5_\u6728\u66dc\u65e5_\u91d1\u66dc\u65e5_\u571f\u66dc\u65e5".split("_"),weekdaysShort:"\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"),weekdaysMin:"\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY\u5e74M\u6708D\u65e5",LLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm",LLLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm dddd",l:"YYYY/MM/DD",ll:"YYYY\u5e74M\u6708D\u65e5",lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm",llll:"YYYY\u5e74M\u6708D\u65e5 HH:mm dddd"},meridiemParse:/\u5348\u524d|\u5348\u5f8c/i,isPM:function(e){return"\u5348\u5f8c"===e},meridiem:function(e,a,t){return e<12?"\u5348\u524d":"\u5348\u5f8c"},calendar:{sameDay:"[\u4eca\u65e5] LT",nextDay:"[\u660e\u65e5] LT",nextWeek:"[\u6765\u9031]dddd LT",lastDay:"[\u6628\u65e5] LT",lastWeek:"[\u524d\u9031]dddd LT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}\u65e5/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\u65e5";default:return e}},relativeTime:{future:"%s\u5f8c",past:"%s\u524d",s:"\u6570\u79d2",m:"1\u5206",mm:"%d\u5206",h:"1\u6642\u9593",hh:"%d\u6642\u9593",d:"1\u65e5",dd:"%d\u65e5",M:"1\u30f6\u6708",MM:"%d\u30f6\u6708",y:"1\u5e74",yy:"%d\u5e74"}}),e.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(e,a){return 12===e&&(e=0),"enjing"===a?e:"siyang"===a?e>=11?e:e+12:"sonten"===a||"ndalu"===a?e+12:void 0},meridiem:function(e,a,t){return e<11?"enjing":e<15?"siyang":e<19?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}}),e.defineLocale("ka",{months:{standalone:"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10d8_\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10d8_\u10db\u10d0\u10e0\u10e2\u10d8_\u10d0\u10de\u10e0\u10d8\u10da\u10d8_\u10db\u10d0\u10d8\u10e1\u10d8_\u10d8\u10d5\u10dc\u10d8\u10e1\u10d8_\u10d8\u10d5\u10da\u10d8\u10e1\u10d8_\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10dd_\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10d8_\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10d8_\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10d8_\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10d8".split("_"),format:"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10e1_\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10e1_\u10db\u10d0\u10e0\u10e2\u10e1_\u10d0\u10de\u10e0\u10d8\u10da\u10d8\u10e1_\u10db\u10d0\u10d8\u10e1\u10e1_\u10d8\u10d5\u10dc\u10d8\u10e1\u10e1_\u10d8\u10d5\u10da\u10d8\u10e1\u10e1_\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10e1_\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10e1_\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10e1_\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10e1_\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10e1".split("_")},monthsShort:"\u10d8\u10d0\u10dc_\u10d7\u10d4\u10d1_\u10db\u10d0\u10e0_\u10d0\u10de\u10e0_\u10db\u10d0\u10d8_\u10d8\u10d5\u10dc_\u10d8\u10d5\u10da_\u10d0\u10d2\u10d5_\u10e1\u10d4\u10e5_\u10dd\u10e5\u10e2_\u10dc\u10dd\u10d4_\u10d3\u10d4\u10d9".split("_"),weekdays:{standalone:"\u10d9\u10d5\u10d8\u10e0\u10d0_\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10d8_\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8".split("_"),format:"\u10d9\u10d5\u10d8\u10e0\u10d0\u10e1_\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10e1_\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1".split("_"),isFormat:/(\u10ec\u10d8\u10dc\u10d0|\u10e8\u10d4\u10db\u10d3\u10d4\u10d2)/},weekdaysShort:"\u10d9\u10d5\u10d8_\u10dd\u10e0\u10e8_\u10e1\u10d0\u10db_\u10dd\u10d7\u10ee_\u10ee\u10e3\u10d7_\u10de\u10d0\u10e0_\u10e8\u10d0\u10d1".split("_"),weekdaysMin:"\u10d9\u10d5_\u10dd\u10e0_\u10e1\u10d0_\u10dd\u10d7_\u10ee\u10e3_\u10de\u10d0_\u10e8\u10d0".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[\u10d3\u10e6\u10d4\u10e1] LT[-\u10d6\u10d4]",nextDay:"[\u10ee\u10d5\u10d0\u10da] LT[-\u10d6\u10d4]",lastDay:"[\u10d2\u10e3\u10e8\u10d8\u10dc] LT[-\u10d6\u10d4]",nextWeek:"[\u10e8\u10d4\u10db\u10d3\u10d4\u10d2] dddd LT[-\u10d6\u10d4]",lastWeek:"[\u10ec\u10d8\u10dc\u10d0] dddd LT-\u10d6\u10d4",sameElse:"L"},relativeTime:{future:function(e){return/(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10ec\u10d4\u10da\u10d8)/.test(e)?e.replace(/\u10d8$/,"\u10e8\u10d8"):e+"\u10e8\u10d8"},past:function(e){return/(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10d3\u10e6\u10d4|\u10d7\u10d5\u10d4)/.test(e)?e.replace(/(\u10d8|\u10d4)$/,"\u10d8\u10e1 \u10e3\u10d9\u10d0\u10dc"):/\u10ec\u10d4\u10da\u10d8/.test(e)?e.replace(/\u10ec\u10d4\u10da\u10d8$/,"\u10ec\u10da\u10d8\u10e1 \u10e3\u10d9\u10d0\u10dc"):void 0},s:"\u10e0\u10d0\u10db\u10d3\u10d4\u10dc\u10d8\u10db\u10d4 \u10ec\u10d0\u10db\u10d8",m:"\u10ec\u10e3\u10d7\u10d8",mm:"%d \u10ec\u10e3\u10d7\u10d8",h:"\u10e1\u10d0\u10d0\u10d7\u10d8",hh:"%d \u10e1\u10d0\u10d0\u10d7\u10d8",d:"\u10d3\u10e6\u10d4",dd:"%d \u10d3\u10e6\u10d4",M:"\u10d7\u10d5\u10d4",MM:"%d \u10d7\u10d5\u10d4",y:"\u10ec\u10d4\u10da\u10d8",yy:"%d \u10ec\u10d4\u10da\u10d8"},dayOfMonthOrdinalParse:/0|1-\u10da\u10d8|\u10db\u10d4-\d{1,2}|\d{1,2}-\u10d4/,ordinal:function(e){return 0===e?e:1===e?e+"-\u10da\u10d8":e<20||e<=100&&e%20==0||e%100==0?"\u10db\u10d4-"+e:e+"-\u10d4"},week:{dow:1,doy:7}});var yn={0:"-\u0448\u0456",1:"-\u0448\u0456",2:"-\u0448\u0456",3:"-\u0448\u0456",4:"-\u0448\u0456",5:"-\u0448\u0456",6:"-\u0448\u044b",7:"-\u0448\u0456",8:"-\u0448\u0456",9:"-\u0448\u044b",10:"-\u0448\u044b",20:"-\u0448\u044b",30:"-\u0448\u044b",40:"-\u0448\u044b",50:"-\u0448\u0456",60:"-\u0448\u044b",70:"-\u0448\u0456",80:"-\u0448\u0456",90:"-\u0448\u044b",100:"-\u0448\u0456"};e.defineLocale("kk",{months:"\u049b\u0430\u04a3\u0442\u0430\u0440_\u0430\u049b\u043f\u0430\u043d_\u043d\u0430\u0443\u0440\u044b\u0437_\u0441\u04d9\u0443\u0456\u0440_\u043c\u0430\u043c\u044b\u0440_\u043c\u0430\u0443\u0441\u044b\u043c_\u0448\u0456\u043b\u0434\u0435_\u0442\u0430\u043c\u044b\u0437_\u049b\u044b\u0440\u043a\u04af\u0439\u0435\u043a_\u049b\u0430\u0437\u0430\u043d_\u049b\u0430\u0440\u0430\u0448\u0430_\u0436\u0435\u043b\u0442\u043e\u049b\u0441\u0430\u043d".split("_"),monthsShort:"\u049b\u0430\u04a3_\u0430\u049b\u043f_\u043d\u0430\u0443_\u0441\u04d9\u0443_\u043c\u0430\u043c_\u043c\u0430\u0443_\u0448\u0456\u043b_\u0442\u0430\u043c_\u049b\u044b\u0440_\u049b\u0430\u0437_\u049b\u0430\u0440_\u0436\u0435\u043b".split("_"),weekdays:"\u0436\u0435\u043a\u0441\u0435\u043d\u0431\u0456_\u0434\u04af\u0439\u0441\u0435\u043d\u0431\u0456_\u0441\u0435\u0439\u0441\u0435\u043d\u0431\u0456_\u0441\u04d9\u0440\u0441\u0435\u043d\u0431\u0456_\u0431\u0435\u0439\u0441\u0435\u043d\u0431\u0456_\u0436\u04b1\u043c\u0430_\u0441\u0435\u043d\u0431\u0456".split("_"),weekdaysShort:"\u0436\u0435\u043a_\u0434\u04af\u0439_\u0441\u0435\u0439_\u0441\u04d9\u0440_\u0431\u0435\u0439_\u0436\u04b1\u043c_\u0441\u0435\u043d".split("_"),weekdaysMin:"\u0436\u043a_\u0434\u0439_\u0441\u0439_\u0441\u0440_\u0431\u0439_\u0436\u043c_\u0441\u043d".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0411\u04af\u0433\u0456\u043d \u0441\u0430\u0493\u0430\u0442] LT",nextDay:"[\u0415\u0440\u0442\u0435\u04a3 \u0441\u0430\u0493\u0430\u0442] LT",nextWeek:"dddd [\u0441\u0430\u0493\u0430\u0442] LT",lastDay:"[\u041a\u0435\u0448\u0435 \u0441\u0430\u0493\u0430\u0442] LT",lastWeek:"[\u04e8\u0442\u043a\u0435\u043d \u0430\u043f\u0442\u0430\u043d\u044b\u04a3] dddd [\u0441\u0430\u0493\u0430\u0442] LT",sameElse:"L"},relativeTime:{future:"%s \u0456\u0448\u0456\u043d\u0434\u0435",past:"%s \u0431\u04b1\u0440\u044b\u043d",s:"\u0431\u0456\u0440\u043d\u0435\u0448\u0435 \u0441\u0435\u043a\u0443\u043d\u0434",m:"\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442",mm:"%d \u043c\u0438\u043d\u0443\u0442",h:"\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442",hh:"%d \u0441\u0430\u0493\u0430\u0442",d:"\u0431\u0456\u0440 \u043a\u04af\u043d",dd:"%d \u043a\u04af\u043d",M:"\u0431\u0456\u0440 \u0430\u0439",MM:"%d \u0430\u0439",y:"\u0431\u0456\u0440 \u0436\u044b\u043b",yy:"%d \u0436\u044b\u043b"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0448\u0456|\u0448\u044b)/,ordinal:function(e){return e+(yn[e]||yn[e%10]||yn[e>=100?100:null])},week:{dow:1,doy:7}}),e.defineLocale("km",{months:"\u1798\u1780\u179a\u17b6_\u1780\u17bb\u1798\u17d2\u1797\u17c8_\u1798\u17b8\u1793\u17b6_\u1798\u17c1\u179f\u17b6_\u17a7\u179f\u1797\u17b6_\u1798\u17b7\u1790\u17bb\u1793\u17b6_\u1780\u1780\u17d2\u1780\u178a\u17b6_\u179f\u17b8\u17a0\u17b6_\u1780\u1789\u17d2\u1789\u17b6_\u178f\u17bb\u179b\u17b6_\u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6_\u1792\u17d2\u1793\u17bc".split("_"),monthsShort:"\u1798\u1780\u179a\u17b6_\u1780\u17bb\u1798\u17d2\u1797\u17c8_\u1798\u17b8\u1793\u17b6_\u1798\u17c1\u179f\u17b6_\u17a7\u179f\u1797\u17b6_\u1798\u17b7\u1790\u17bb\u1793\u17b6_\u1780\u1780\u17d2\u1780\u178a\u17b6_\u179f\u17b8\u17a0\u17b6_\u1780\u1789\u17d2\u1789\u17b6_\u178f\u17bb\u179b\u17b6_\u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6_\u1792\u17d2\u1793\u17bc".split("_"),weekdays:"\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799_\u1785\u17d0\u1793\u17d2\u1791_\u17a2\u1784\u17d2\u1782\u17b6\u179a_\u1796\u17bb\u1792_\u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd_\u179f\u17bb\u1780\u17d2\u179a_\u179f\u17c5\u179a\u17cd".split("_"),weekdaysShort:"\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799_\u1785\u17d0\u1793\u17d2\u1791_\u17a2\u1784\u17d2\u1782\u17b6\u179a_\u1796\u17bb\u1792_\u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd_\u179f\u17bb\u1780\u17d2\u179a_\u179f\u17c5\u179a\u17cd".split("_"),weekdaysMin:"\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799_\u1785\u17d0\u1793\u17d2\u1791_\u17a2\u1784\u17d2\u1782\u17b6\u179a_\u1796\u17bb\u1792_\u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd_\u179f\u17bb\u1780\u17d2\u179a_\u179f\u17c5\u179a\u17cd".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u1790\u17d2\u1784\u17c3\u1793\u17c1\u17c7 \u1798\u17c9\u17c4\u1784] LT",nextDay:"[\u179f\u17d2\u17a2\u17c2\u1780 \u1798\u17c9\u17c4\u1784] LT",nextWeek:"dddd [\u1798\u17c9\u17c4\u1784] LT",lastDay:"[\u1798\u17d2\u179f\u17b7\u179b\u1798\u17b7\u1789 \u1798\u17c9\u17c4\u1784] LT",lastWeek:"dddd [\u179f\u1794\u17d2\u178f\u17b6\u17a0\u17cd\u1798\u17bb\u1793] [\u1798\u17c9\u17c4\u1784] LT",sameElse:"L"},relativeTime:{future:"%s\u1791\u17c0\u178f",past:"%s\u1798\u17bb\u1793",s:"\u1794\u17c9\u17bb\u1793\u17d2\u1798\u17b6\u1793\u179c\u17b7\u1793\u17b6\u1791\u17b8",m:"\u1798\u17bd\u1799\u1793\u17b6\u1791\u17b8",mm:"%d \u1793\u17b6\u1791\u17b8",h:"\u1798\u17bd\u1799\u1798\u17c9\u17c4\u1784",hh:"%d \u1798\u17c9\u17c4\u1784",d:"\u1798\u17bd\u1799\u1790\u17d2\u1784\u17c3",dd:"%d \u1790\u17d2\u1784\u17c3",M:"\u1798\u17bd\u1799\u1781\u17c2",MM:"%d \u1781\u17c2",y:"\u1798\u17bd\u1799\u1786\u17d2\u1793\u17b6\u17c6",yy:"%d \u1786\u17d2\u1793\u17b6\u17c6"},week:{dow:1,doy:4}});var fn={1:"\u0ce7",2:"\u0ce8",3:"\u0ce9",4:"\u0cea",5:"\u0ceb",6:"\u0cec",7:"\u0ced",8:"\u0cee",9:"\u0cef",0:"\u0ce6"},pn={"\u0ce7":"1","\u0ce8":"2","\u0ce9":"3","\u0cea":"4","\u0ceb":"5","\u0cec":"6","\u0ced":"7","\u0cee":"8","\u0cef":"9","\u0ce6":"0"};e.defineLocale("kn",{months:"\u0c9c\u0ca8\u0cb5\u0cb0\u0cbf_\u0cab\u0cc6\u0cac\u0ccd\u0cb0\u0cb5\u0cb0\u0cbf_\u0cae\u0cbe\u0cb0\u0ccd\u0c9a\u0ccd_\u0c8f\u0caa\u0ccd\u0cb0\u0cbf\u0cb2\u0ccd_\u0cae\u0cc6\u0cd5_\u0c9c\u0cc2\u0ca8\u0ccd_\u0c9c\u0cc1\u0cb2\u0cc6\u0cd6_\u0c86\u0c97\u0cb8\u0ccd\u0c9f\u0ccd_\u0cb8\u0cc6\u0caa\u0ccd\u0c9f\u0cc6\u0c82\u0cac\u0cb0\u0ccd_\u0c85\u0c95\u0ccd\u0c9f\u0cc6\u0cc2\u0cd5\u0cac\u0cb0\u0ccd_\u0ca8\u0cb5\u0cc6\u0c82\u0cac\u0cb0\u0ccd_\u0ca1\u0cbf\u0cb8\u0cc6\u0c82\u0cac\u0cb0\u0ccd".split("_"),monthsShort:"\u0c9c\u0ca8_\u0cab\u0cc6\u0cac\u0ccd\u0cb0_\u0cae\u0cbe\u0cb0\u0ccd\u0c9a\u0ccd_\u0c8f\u0caa\u0ccd\u0cb0\u0cbf\u0cb2\u0ccd_\u0cae\u0cc6\u0cd5_\u0c9c\u0cc2\u0ca8\u0ccd_\u0c9c\u0cc1\u0cb2\u0cc6\u0cd6_\u0c86\u0c97\u0cb8\u0ccd\u0c9f\u0ccd_\u0cb8\u0cc6\u0caa\u0ccd\u0c9f\u0cc6\u0c82\u0cac_\u0c85\u0c95\u0ccd\u0c9f\u0cc6\u0cc2\u0cd5\u0cac_\u0ca8\u0cb5\u0cc6\u0c82\u0cac_\u0ca1\u0cbf\u0cb8\u0cc6\u0c82\u0cac".split("_"),monthsParseExact:!0,weekdays:"\u0cad\u0cbe\u0ca8\u0cc1\u0cb5\u0cbe\u0cb0_\u0cb8\u0cc6\u0cc2\u0cd5\u0cae\u0cb5\u0cbe\u0cb0_\u0cae\u0c82\u0c97\u0cb3\u0cb5\u0cbe\u0cb0_\u0cac\u0cc1\u0ca7\u0cb5\u0cbe\u0cb0_\u0c97\u0cc1\u0cb0\u0cc1\u0cb5\u0cbe\u0cb0_\u0cb6\u0cc1\u0c95\u0ccd\u0cb0\u0cb5\u0cbe\u0cb0_\u0cb6\u0ca8\u0cbf\u0cb5\u0cbe\u0cb0".split("_"),weekdaysShort:"\u0cad\u0cbe\u0ca8\u0cc1_\u0cb8\u0cc6\u0cc2\u0cd5\u0cae_\u0cae\u0c82\u0c97\u0cb3_\u0cac\u0cc1\u0ca7_\u0c97\u0cc1\u0cb0\u0cc1_\u0cb6\u0cc1\u0c95\u0ccd\u0cb0_\u0cb6\u0ca8\u0cbf".split("_"),weekdaysMin:"\u0cad\u0cbe_\u0cb8\u0cc6\u0cc2\u0cd5_\u0cae\u0c82_\u0cac\u0cc1_\u0c97\u0cc1_\u0cb6\u0cc1_\u0cb6".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0c87\u0c82\u0ca6\u0cc1] LT",nextDay:"[\u0ca8\u0cbe\u0cb3\u0cc6] LT",nextWeek:"dddd, LT",lastDay:"[\u0ca8\u0cbf\u0ca8\u0ccd\u0ca8\u0cc6] LT",lastWeek:"[\u0c95\u0cc6\u0cc2\u0ca8\u0cc6\u0caf] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0ca8\u0c82\u0ca4\u0cb0",past:"%s \u0cb9\u0cbf\u0c82\u0ca6\u0cc6",s:"\u0c95\u0cc6\u0cb2\u0cb5\u0cc1 \u0c95\u0ccd\u0cb7\u0ca3\u0c97\u0cb3\u0cc1",m:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca8\u0cbf\u0cae\u0cbf\u0cb7",mm:"%d \u0ca8\u0cbf\u0cae\u0cbf\u0cb7",h:"\u0c92\u0c82\u0ca6\u0cc1 \u0c97\u0c82\u0c9f\u0cc6",hh:"%d \u0c97\u0c82\u0c9f\u0cc6",d:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca6\u0cbf\u0ca8",dd:"%d \u0ca6\u0cbf\u0ca8",M:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca4\u0cbf\u0c82\u0c97\u0cb3\u0cc1",MM:"%d \u0ca4\u0cbf\u0c82\u0c97\u0cb3\u0cc1",y:"\u0c92\u0c82\u0ca6\u0cc1 \u0cb5\u0cb0\u0ccd\u0cb7",yy:"%d \u0cb5\u0cb0\u0ccd\u0cb7"},preparse:function(e){return e.replace(/[\u0ce7\u0ce8\u0ce9\u0cea\u0ceb\u0cec\u0ced\u0cee\u0cef\u0ce6]/g,function(e){return pn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return fn[e]})},meridiemParse:/\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf|\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6|\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8|\u0cb8\u0c82\u0c9c\u0cc6/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf"===a?e<4?e:e+12:"\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6"===a?e:"\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8"===a?e>=10?e:e+12:"\u0cb8\u0c82\u0c9c\u0cc6"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf":e<10?"\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6":e<17?"\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8":e<20?"\u0cb8\u0c82\u0c9c\u0cc6":"\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf"},dayOfMonthOrdinalParse:/\d{1,2}(\u0ca8\u0cc6\u0cd5)/,ordinal:function(e){return e+"\u0ca8\u0cc6\u0cd5"},week:{dow:0,doy:6}}),e.defineLocale("ko",{months:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),monthsShort:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),weekdays:"\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"),weekdaysShort:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),weekdaysMin:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"YYYY.MM.DD",LL:"YYYY\ub144 MMMM D\uc77c",LLL:"YYYY\ub144 MMMM D\uc77c A h:mm",LLLL:"YYYY\ub144 MMMM D\uc77c dddd A h:mm",l:"YYYY.MM.DD",ll:"YYYY\ub144 MMMM D\uc77c",lll:"YYYY\ub144 MMMM D\uc77c A h:mm",llll:"YYYY\ub144 MMMM D\uc77c dddd A h:mm"},calendar:{sameDay:"\uc624\ub298 LT",nextDay:"\ub0b4\uc77c LT",nextWeek:"dddd LT",lastDay:"\uc5b4\uc81c LT",lastWeek:"\uc9c0\ub09c\uc8fc dddd LT",sameElse:"L"},relativeTime:{future:"%s \ud6c4",past:"%s \uc804",s:"\uba87 \ucd08",ss:"%d\ucd08",m:"1\ubd84",mm:"%d\ubd84",h:"\ud55c \uc2dc\uac04",hh:"%d\uc2dc\uac04",d:"\ud558\ub8e8",dd:"%d\uc77c",M:"\ud55c \ub2ec",MM:"%d\ub2ec",y:"\uc77c \ub144",yy:"%d\ub144"},dayOfMonthOrdinalParse:/\d{1,2}(\uc77c|\uc6d4|\uc8fc)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\uc77c";case"M":return e+"\uc6d4";case"w":case"W":return e+"\uc8fc";default:return e}},meridiemParse:/\uc624\uc804|\uc624\ud6c4/,isPM:function(e){return"\uc624\ud6c4"===e},meridiem:function(e,a,t){return e<12?"\uc624\uc804":"\uc624\ud6c4"}});var kn={0:"-\u0447\u04af",1:"-\u0447\u0438",2:"-\u0447\u0438",3:"-\u0447\u04af",4:"-\u0447\u04af",5:"-\u0447\u0438",6:"-\u0447\u044b",7:"-\u0447\u0438",8:"-\u0447\u0438",9:"-\u0447\u0443",10:"-\u0447\u0443",20:"-\u0447\u044b",30:"-\u0447\u0443",40:"-\u0447\u044b",50:"-\u0447\u04af",60:"-\u0447\u044b",70:"-\u0447\u0438",80:"-\u0447\u0438",90:"-\u0447\u0443",100:"-\u0447\u04af"};e.defineLocale("ky",{months:"\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_"),monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"),weekdays:"\u0416\u0435\u043a\u0448\u0435\u043c\u0431\u0438_\u0414\u04af\u0439\u0448\u04e9\u043c\u0431\u04af_\u0428\u0435\u0439\u0448\u0435\u043c\u0431\u0438_\u0428\u0430\u0440\u0448\u0435\u043c\u0431\u0438_\u0411\u0435\u0439\u0448\u0435\u043c\u0431\u0438_\u0416\u0443\u043c\u0430_\u0418\u0448\u0435\u043c\u0431\u0438".split("_"),weekdaysShort:"\u0416\u0435\u043a_\u0414\u04af\u0439_\u0428\u0435\u0439_\u0428\u0430\u0440_\u0411\u0435\u0439_\u0416\u0443\u043c_\u0418\u0448\u0435".split("_"),weekdaysMin:"\u0416\u043a_\u0414\u0439_\u0428\u0439_\u0428\u0440_\u0411\u0439_\u0416\u043c_\u0418\u0448".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0411\u04af\u0433\u04af\u043d \u0441\u0430\u0430\u0442] LT",nextDay:"[\u042d\u0440\u0442\u0435\u04a3 \u0441\u0430\u0430\u0442] LT",nextWeek:"dddd [\u0441\u0430\u0430\u0442] LT",lastDay:"[\u041a\u0435\u0447\u0435 \u0441\u0430\u0430\u0442] LT",lastWeek:"[\u04e8\u0442\u043a\u0435\u043d \u0430\u043f\u0442\u0430\u043d\u044b\u043d] dddd [\u043a\u04af\u043d\u04af] [\u0441\u0430\u0430\u0442] LT",sameElse:"L"},relativeTime:{future:"%s \u0438\u0447\u0438\u043d\u0434\u0435",past:"%s \u043c\u0443\u0440\u0443\u043d",s:"\u0431\u0438\u0440\u043d\u0435\u0447\u0435 \u0441\u0435\u043a\u0443\u043d\u0434",m:"\u0431\u0438\u0440 \u043c\u04af\u043d\u04e9\u0442",mm:"%d \u043c\u04af\u043d\u04e9\u0442",h:"\u0431\u0438\u0440 \u0441\u0430\u0430\u0442",hh:"%d \u0441\u0430\u0430\u0442",d:"\u0431\u0438\u0440 \u043a\u04af\u043d",dd:"%d \u043a\u04af\u043d",M:"\u0431\u0438\u0440 \u0430\u0439",MM:"%d \u0430\u0439",y:"\u0431\u0438\u0440 \u0436\u044b\u043b",yy:"%d \u0436\u044b\u043b"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0447\u0438|\u0447\u044b|\u0447\u04af|\u0447\u0443)/,ordinal:function(e){return e+(kn[e]||kn[e%10]||kn[e>=100?100:null])},week:{dow:1,doy:7}}),e.defineLocale("lb",{months:"Januar_Februar_M\xe4erz_Abr\xebll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonndeg_M\xe9indeg_D\xebnschdeg_M\xebttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._M\xe9._D\xeb._M\xeb._Do._Fr._Sa.".split("_"),weekdaysMin:"So_M\xe9_D\xeb_M\xeb_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[G\xebschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:function(e){return La(e.substr(0,e.indexOf(" ")))?"a "+e:"an "+e},past:function(e){return La(e.substr(0,e.indexOf(" ")))?"viru "+e:"virun "+e},s:"e puer Sekonnen",m:ha,mm:"%d Minutten",h:ha,hh:"%d Stonnen",d:ha,dd:"%d Deeg",M:ha,MM:"%d M\xe9int",y:ha,yy:"%d Joer"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("lo",{months:"\u0ea1\u0eb1\u0e87\u0e81\u0ead\u0e99_\u0e81\u0eb8\u0ea1\u0e9e\u0eb2_\u0ea1\u0eb5\u0e99\u0eb2_\u0ec0\u0ea1\u0eaa\u0eb2_\u0e9e\u0eb6\u0e94\u0eaa\u0eb0\u0e9e\u0eb2_\u0ea1\u0eb4\u0e96\u0eb8\u0e99\u0eb2_\u0e81\u0ecd\u0ea5\u0eb0\u0e81\u0ebb\u0e94_\u0eaa\u0eb4\u0e87\u0eab\u0eb2_\u0e81\u0eb1\u0e99\u0e8d\u0eb2_\u0e95\u0eb8\u0ea5\u0eb2_\u0e9e\u0eb0\u0e88\u0eb4\u0e81_\u0e97\u0eb1\u0e99\u0ea7\u0eb2".split("_"),monthsShort:"\u0ea1\u0eb1\u0e87\u0e81\u0ead\u0e99_\u0e81\u0eb8\u0ea1\u0e9e\u0eb2_\u0ea1\u0eb5\u0e99\u0eb2_\u0ec0\u0ea1\u0eaa\u0eb2_\u0e9e\u0eb6\u0e94\u0eaa\u0eb0\u0e9e\u0eb2_\u0ea1\u0eb4\u0e96\u0eb8\u0e99\u0eb2_\u0e81\u0ecd\u0ea5\u0eb0\u0e81\u0ebb\u0e94_\u0eaa\u0eb4\u0e87\u0eab\u0eb2_\u0e81\u0eb1\u0e99\u0e8d\u0eb2_\u0e95\u0eb8\u0ea5\u0eb2_\u0e9e\u0eb0\u0e88\u0eb4\u0e81_\u0e97\u0eb1\u0e99\u0ea7\u0eb2".split("_"),weekdays:"\u0ead\u0eb2\u0e97\u0eb4\u0e94_\u0e88\u0eb1\u0e99_\u0ead\u0eb1\u0e87\u0e84\u0eb2\u0e99_\u0e9e\u0eb8\u0e94_\u0e9e\u0eb0\u0eab\u0eb1\u0e94_\u0eaa\u0eb8\u0e81_\u0ec0\u0eaa\u0ebb\u0eb2".split("_"),weekdaysShort:"\u0e97\u0eb4\u0e94_\u0e88\u0eb1\u0e99_\u0ead\u0eb1\u0e87\u0e84\u0eb2\u0e99_\u0e9e\u0eb8\u0e94_\u0e9e\u0eb0\u0eab\u0eb1\u0e94_\u0eaa\u0eb8\u0e81_\u0ec0\u0eaa\u0ebb\u0eb2".split("_"),weekdaysMin:"\u0e97_\u0e88_\u0ead\u0e84_\u0e9e_\u0e9e\u0eab_\u0eaa\u0e81_\u0eaa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"\u0ea7\u0eb1\u0e99dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0e95\u0ead\u0e99\u0ec0\u0e8a\u0ebb\u0ec9\u0eb2|\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87/,isPM:function(e){return"\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87"===e},meridiem:function(e,a,t){return e<12?"\u0e95\u0ead\u0e99\u0ec0\u0e8a\u0ebb\u0ec9\u0eb2":"\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87"},calendar:{sameDay:"[\u0ea1\u0eb7\u0ec9\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT",nextDay:"[\u0ea1\u0eb7\u0ec9\u0ead\u0eb7\u0ec8\u0e99\u0ec0\u0ea7\u0ea5\u0eb2] LT",nextWeek:"[\u0ea7\u0eb1\u0e99]dddd[\u0edc\u0ec9\u0eb2\u0ec0\u0ea7\u0ea5\u0eb2] LT",lastDay:"[\u0ea1\u0eb7\u0ec9\u0ea7\u0eb2\u0e99\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT",lastWeek:"[\u0ea7\u0eb1\u0e99]dddd[\u0ec1\u0ea5\u0ec9\u0ea7\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT",sameElse:"L"},relativeTime:{future:"\u0ead\u0eb5\u0e81 %s",past:"%s\u0e9c\u0ec8\u0eb2\u0e99\u0ea1\u0eb2",s:"\u0e9a\u0ecd\u0ec8\u0ec0\u0e97\u0ebb\u0ec8\u0eb2\u0ec3\u0e94\u0ea7\u0eb4\u0e99\u0eb2\u0e97\u0eb5",m:"1 \u0e99\u0eb2\u0e97\u0eb5",mm:"%d \u0e99\u0eb2\u0e97\u0eb5",h:"1 \u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87",hh:"%d \u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87",d:"1 \u0ea1\u0eb7\u0ec9",dd:"%d \u0ea1\u0eb7\u0ec9",M:"1 \u0ec0\u0e94\u0eb7\u0ead\u0e99",MM:"%d \u0ec0\u0e94\u0eb7\u0ead\u0e99",y:"1 \u0e9b\u0eb5",yy:"%d \u0e9b\u0eb5"},dayOfMonthOrdinalParse:/(\u0e97\u0eb5\u0ec8)\d{1,2}/,ordinal:function(e){return"\u0e97\u0eb5\u0ec8"+e}});var Dn={m:"minut\u0117_minut\u0117s_minut\u0119",mm:"minut\u0117s_minu\u010di\u0173_minutes",h:"valanda_valandos_valand\u0105",hh:"valandos_valand\u0173_valandas",d:"diena_dienos_dien\u0105",dd:"dienos_dien\u0173_dienas",M:"m\u0117nuo_m\u0117nesio_m\u0117nes\u012f",MM:"m\u0117nesiai_m\u0117nesi\u0173_m\u0117nesius",y:"metai_met\u0173_metus",yy:"metai_met\u0173_metus"};e.defineLocale("lt",{months:{format:"sausio_vasario_kovo_baland\u017eio_gegu\u017e\u0117s_bir\u017eelio_liepos_rugpj\u016b\u010dio_rugs\u0117jo_spalio_lapkri\u010dio_gruod\u017eio".split("_"),standalone:"sausis_vasaris_kovas_balandis_gegu\u017e\u0117_bir\u017eelis_liepa_rugpj\u016btis_rugs\u0117jis_spalis_lapkritis_gruodis".split("_"),isFormat:/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/},monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:{format:"sekmadien\u012f_pirmadien\u012f_antradien\u012f_tre\u010diadien\u012f_ketvirtadien\u012f_penktadien\u012f_\u0161e\u0161tadien\u012f".split("_"),standalone:"sekmadienis_pirmadienis_antradienis_tre\u010diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split("_"),isFormat:/dddd HH:mm/},weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_\u0160e\u0161".split("_"),weekdaysMin:"S_P_A_T_K_Pn_\u0160".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[\u0160iandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Pra\u0117jus\u012f] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prie\u0161 %s",s:function(e,a,t,s){return a?"kelios sekund\u0117s":s?"keli\u0173 sekund\u017ei\u0173":"kelias sekundes"},m:ca,mm:fa,h:ca,hh:fa,d:ca,dd:fa,M:ca,MM:fa,y:ca,yy:fa},dayOfMonthOrdinalParse:/\d{1,2}-oji/,ordinal:function(e){return e+"-oji"},week:{dow:1,doy:4}});var Tn={m:"min\u016btes_min\u016bt\u0113m_min\u016bte_min\u016btes".split("_"),mm:"min\u016btes_min\u016bt\u0113m_min\u016bte_min\u016btes".split("_"),h:"stundas_stund\u0101m_stunda_stundas".split("_"),hh:"stundas_stund\u0101m_stunda_stundas".split("_"),d:"dienas_dien\u0101m_diena_dienas".split("_"),dd:"dienas_dien\u0101m_diena_dienas".split("_"),M:"m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"),MM:"m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")};e.defineLocale("lv",{months:"janv\u0101ris_febru\u0101ris_marts_apr\u012blis_maijs_j\u016bnijs_j\u016blijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_j\u016bn_j\u016bl_aug_sep_okt_nov_dec".split("_"),weekdays:"sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[\u0160odien pulksten] LT",nextDay:"[R\u012bt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pag\u0101ju\u0161\u0101] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"p\u0113c %s",past:"pirms %s",s:function(e,a){return a?"da\u017eas sekundes":"da\u017e\u0101m sekund\u0113m"},m:Da,mm:ka,h:Da,hh:ka,d:Da,dd:ka,M:Da,MM:ka,y:Da,yy:ka},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var gn={words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,a){return 1===e?a[0]:e>=2&&e<=4?a[1]:a[2]},translate:function(e,a,t){var s=gn.words[t];return 1===t.length?a?s[0]:s[1]:e+" "+gn.correctGrammaticalCase(e,s)}};e.defineLocale("me",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010de u] LT",lastWeek:function(){return["[pro\u0161le] [nedjelje] [u] LT","[pro\u0161log] [ponedjeljka] [u] LT","[pro\u0161log] [utorka] [u] LT","[pro\u0161le] [srijede] [u] LT","[pro\u0161log] [\u010detvrtka] [u] LT","[pro\u0161log] [petka] [u] LT","[pro\u0161le] [subote] [u] LT"][this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:gn.translate,mm:gn.translate,h:gn.translate,hh:gn.translate,d:"dan",dd:gn.translate,M:"mjesec",MM:gn.translate,y:"godinu",yy:gn.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),e.defineLocale("mi",{months:"Kohi-t\u0101te_Hui-tanguru_Pout\u016b-te-rangi_Paenga-wh\u0101wh\u0101_Haratua_Pipiri_H\u014dngoingoi_Here-turi-k\u014dk\u0101_Mahuru_Whiringa-\u0101-nuku_Whiringa-\u0101-rangi_Hakihea".split("_"),monthsShort:"Kohi_Hui_Pou_Pae_Hara_Pipi_H\u014dngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),monthsRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,weekdays:"R\u0101tapu_Mane_T\u016brei_Wenerei_T\u0101ite_Paraire_H\u0101tarei".split("_"),weekdaysShort:"Ta_Ma_T\u016b_We_T\u0101i_Pa_H\u0101".split("_"),weekdaysMin:"Ta_Ma_T\u016b_We_T\u0101i_Pa_H\u0101".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [i] HH:mm",LLLL:"dddd, D MMMM YYYY [i] HH:mm"},calendar:{sameDay:"[i teie mahana, i] LT",nextDay:"[apopo i] LT",nextWeek:"dddd [i] LT",lastDay:"[inanahi i] LT",lastWeek:"dddd [whakamutunga i] LT",sameElse:"L"},relativeTime:{future:"i roto i %s",past:"%s i mua",s:"te h\u0113kona ruarua",m:"he meneti",mm:"%d meneti",h:"te haora",hh:"%d haora",d:"he ra",dd:"%d ra",M:"he marama",MM:"%d marama",y:"he tau",yy:"%d tau"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),e.defineLocale("mk",{months:"\u0458\u0430\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0458_\u0458\u0443\u043d\u0438_\u0458\u0443\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"),monthsShort:"\u0458\u0430\u043d_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"),weekdays:"\u043d\u0435\u0434\u0435\u043b\u0430_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u043e\u043a_\u043f\u0435\u0442\u043e\u043a_\u0441\u0430\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u0435_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u0430\u0431".split("_"),weekdaysMin:"\u043de_\u043fo_\u0432\u0442_\u0441\u0440_\u0447\u0435_\u043f\u0435_\u0441a".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[\u0414\u0435\u043d\u0435\u0441 \u0432\u043e] LT",nextDay:"[\u0423\u0442\u0440\u0435 \u0432\u043e] LT",nextWeek:"[\u0412\u043e] dddd [\u0432\u043e] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432\u043e] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[\u0418\u0437\u043c\u0438\u043d\u0430\u0442\u0430\u0442\u0430] dddd [\u0432\u043e] LT";case 1:case 2:case 4:case 5:return"[\u0418\u0437\u043c\u0438\u043d\u0430\u0442\u0438\u043e\u0442] dddd [\u0432\u043e] LT"}},sameElse:"L"},relativeTime:{future:"\u043f\u043e\u0441\u043b\u0435 %s",past:"\u043f\u0440\u0435\u0434 %s",s:"\u043d\u0435\u043a\u043e\u043b\u043a\u0443 \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:"\u043c\u0438\u043d\u0443\u0442\u0430",mm:"%d \u043c\u0438\u043d\u0443\u0442\u0438",h:"\u0447\u0430\u0441",hh:"%d \u0447\u0430\u0441\u0430",d:"\u0434\u0435\u043d",dd:"%d \u0434\u0435\u043d\u0430",M:"\u043c\u0435\u0441\u0435\u0446",MM:"%d \u043c\u0435\u0441\u0435\u0446\u0438",y:"\u0433\u043e\u0434\u0438\u043d\u0430",yy:"%d \u0433\u043e\u0434\u0438\u043d\u0438"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/,ordinal:function(e){var a=e%10,t=e%100;return 0===e?e+"-\u0435\u0432":0===t?e+"-\u0435\u043d":t>10&&t<20?e+"-\u0442\u0438":1===a?e+"-\u0432\u0438":2===a?e+"-\u0440\u0438":7===a||8===a?e+"-\u043c\u0438":e+"-\u0442\u0438"},week:{dow:1,doy:7}}),e.defineLocale("ml",{months:"\u0d1c\u0d28\u0d41\u0d35\u0d30\u0d3f_\u0d2b\u0d46\u0d2c\u0d4d\u0d30\u0d41\u0d35\u0d30\u0d3f_\u0d2e\u0d3e\u0d7c\u0d1a\u0d4d\u0d1a\u0d4d_\u0d0f\u0d2a\u0d4d\u0d30\u0d3f\u0d7d_\u0d2e\u0d47\u0d2f\u0d4d_\u0d1c\u0d42\u0d7a_\u0d1c\u0d42\u0d32\u0d48_\u0d13\u0d17\u0d38\u0d4d\u0d31\u0d4d\u0d31\u0d4d_\u0d38\u0d46\u0d2a\u0d4d\u0d31\u0d4d\u0d31\u0d02\u0d2c\u0d7c_\u0d12\u0d15\u0d4d\u0d1f\u0d4b\u0d2c\u0d7c_\u0d28\u0d35\u0d02\u0d2c\u0d7c_\u0d21\u0d3f\u0d38\u0d02\u0d2c\u0d7c".split("_"),monthsShort:"\u0d1c\u0d28\u0d41._\u0d2b\u0d46\u0d2c\u0d4d\u0d30\u0d41._\u0d2e\u0d3e\u0d7c._\u0d0f\u0d2a\u0d4d\u0d30\u0d3f._\u0d2e\u0d47\u0d2f\u0d4d_\u0d1c\u0d42\u0d7a_\u0d1c\u0d42\u0d32\u0d48._\u0d13\u0d17._\u0d38\u0d46\u0d2a\u0d4d\u0d31\u0d4d\u0d31._\u0d12\u0d15\u0d4d\u0d1f\u0d4b._\u0d28\u0d35\u0d02._\u0d21\u0d3f\u0d38\u0d02.".split("_"),monthsParseExact:!0,weekdays:"\u0d1e\u0d3e\u0d2f\u0d31\u0d3e\u0d34\u0d4d\u0d1a_\u0d24\u0d3f\u0d19\u0d4d\u0d15\u0d33\u0d3e\u0d34\u0d4d\u0d1a_\u0d1a\u0d4a\u0d35\u0d4d\u0d35\u0d3e\u0d34\u0d4d\u0d1a_\u0d2c\u0d41\u0d27\u0d28\u0d3e\u0d34\u0d4d\u0d1a_\u0d35\u0d4d\u0d2f\u0d3e\u0d34\u0d3e\u0d34\u0d4d\u0d1a_\u0d35\u0d46\u0d33\u0d4d\u0d33\u0d3f\u0d2f\u0d3e\u0d34\u0d4d\u0d1a_\u0d36\u0d28\u0d3f\u0d2f\u0d3e\u0d34\u0d4d\u0d1a".split("_"),weekdaysShort:"\u0d1e\u0d3e\u0d2f\u0d7c_\u0d24\u0d3f\u0d19\u0d4d\u0d15\u0d7e_\u0d1a\u0d4a\u0d35\u0d4d\u0d35_\u0d2c\u0d41\u0d27\u0d7b_\u0d35\u0d4d\u0d2f\u0d3e\u0d34\u0d02_\u0d35\u0d46\u0d33\u0d4d\u0d33\u0d3f_\u0d36\u0d28\u0d3f".split("_"),weekdaysMin:"\u0d1e\u0d3e_\u0d24\u0d3f_\u0d1a\u0d4a_\u0d2c\u0d41_\u0d35\u0d4d\u0d2f\u0d3e_\u0d35\u0d46_\u0d36".split("_"),longDateFormat:{LT:"A h:mm -\u0d28\u0d41",LTS:"A h:mm:ss -\u0d28\u0d41",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -\u0d28\u0d41",LLLL:"dddd, D MMMM YYYY, A h:mm -\u0d28\u0d41"},calendar:{sameDay:"[\u0d07\u0d28\u0d4d\u0d28\u0d4d] LT",nextDay:"[\u0d28\u0d3e\u0d33\u0d46] LT",nextWeek:"dddd, LT",lastDay:"[\u0d07\u0d28\u0d4d\u0d28\u0d32\u0d46] LT",lastWeek:"[\u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d",past:"%s \u0d2e\u0d41\u0d7b\u0d2a\u0d4d",s:"\u0d05\u0d7d\u0d2a \u0d28\u0d3f\u0d2e\u0d3f\u0d37\u0d19\u0d4d\u0d19\u0d7e",m:"\u0d12\u0d30\u0d41 \u0d2e\u0d3f\u0d28\u0d3f\u0d31\u0d4d\u0d31\u0d4d",mm:"%d \u0d2e\u0d3f\u0d28\u0d3f\u0d31\u0d4d\u0d31\u0d4d",h:"\u0d12\u0d30\u0d41 \u0d2e\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d42\u0d7c",hh:"%d \u0d2e\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d42\u0d7c",d:"\u0d12\u0d30\u0d41 \u0d26\u0d3f\u0d35\u0d38\u0d02",dd:"%d \u0d26\u0d3f\u0d35\u0d38\u0d02",M:"\u0d12\u0d30\u0d41 \u0d2e\u0d3e\u0d38\u0d02",MM:"%d \u0d2e\u0d3e\u0d38\u0d02",y:"\u0d12\u0d30\u0d41 \u0d35\u0d7c\u0d37\u0d02",yy:"%d \u0d35\u0d7c\u0d37\u0d02"},meridiemParse:/\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f|\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46|\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d|\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02|\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f/i,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f"===a&&e>=4||"\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d"===a||"\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02"===a?e+12:e},meridiem:function(e,a,t){return e<4?"\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f":e<12?"\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46":e<17?"\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d":e<20?"\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02":"\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f"}});var wn={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"},vn={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"};e.defineLocale("mr",{months:"\u091c\u093e\u0928\u0947\u0935\u093e\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u093e\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u090f\u092a\u094d\u0930\u093f\u0932_\u092e\u0947_\u091c\u0942\u0928_\u091c\u0941\u0932\u0948_\u0911\u0917\u0938\u094d\u091f_\u0938\u092a\u094d\u091f\u0947\u0902\u092c\u0930_\u0911\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u0935\u094d\u0939\u0947\u0902\u092c\u0930_\u0921\u093f\u0938\u0947\u0902\u092c\u0930".split("_"),monthsShort:"\u091c\u093e\u0928\u0947._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a._\u090f\u092a\u094d\u0930\u093f._\u092e\u0947._\u091c\u0942\u0928._\u091c\u0941\u0932\u0948._\u0911\u0917._\u0938\u092a\u094d\u091f\u0947\u0902._\u0911\u0915\u094d\u091f\u094b._\u0928\u094b\u0935\u094d\u0939\u0947\u0902._\u0921\u093f\u0938\u0947\u0902.".split("_"),monthsParseExact:!0,weekdays:"\u0930\u0935\u093f\u0935\u093e\u0930_\u0938\u094b\u092e\u0935\u093e\u0930_\u092e\u0902\u0917\u0933\u0935\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u0917\u0941\u0930\u0942\u0935\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930_\u0936\u0928\u093f\u0935\u093e\u0930".split("_"),weekdaysShort:"\u0930\u0935\u093f_\u0938\u094b\u092e_\u092e\u0902\u0917\u0933_\u092c\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094d\u0930_\u0936\u0928\u093f".split("_"),weekdaysMin:"\u0930_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),longDateFormat:{LT:"A h:mm \u0935\u093e\u091c\u0924\u093e",LTS:"A h:mm:ss \u0935\u093e\u091c\u0924\u093e",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u0935\u093e\u091c\u0924\u093e",LLLL:"dddd, D MMMM YYYY, A h:mm \u0935\u093e\u091c\u0924\u093e"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u0909\u0926\u094d\u092f\u093e] LT",nextWeek:"dddd, LT",lastDay:"[\u0915\u093e\u0932] LT",lastWeek:"[\u092e\u093e\u0917\u0940\u0932] dddd, LT",sameElse:"L"},relativeTime:{future:"%s\u092e\u0927\u094d\u092f\u0947",past:"%s\u092a\u0942\u0930\u094d\u0935\u0940",s:Ta,m:Ta,mm:Ta,h:Ta,hh:Ta,d:Ta,dd:Ta,M:Ta,MM:Ta,y:Ta,yy:Ta},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return vn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return wn[e]})},meridiemParse:/\u0930\u093e\u0924\u094d\u0930\u0940|\u0938\u0915\u093e\u0933\u0940|\u0926\u0941\u092a\u093e\u0930\u0940|\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0930\u093e\u0924\u094d\u0930\u0940"===a?e<4?e:e+12:"\u0938\u0915\u093e\u0933\u0940"===a?e:"\u0926\u0941\u092a\u093e\u0930\u0940"===a?e>=10?e:e+12:"\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0930\u093e\u0924\u094d\u0930\u0940":e<10?"\u0938\u0915\u093e\u0933\u0940":e<17?"\u0926\u0941\u092a\u093e\u0930\u0940":e<20?"\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940":"\u0930\u093e\u0924\u094d\u0930\u0940"},week:{dow:0,doy:6}}),e.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,a){return 12===e&&(e=0),"pagi"===a?e:"tengahari"===a?e>=11?e:e+12:"petang"===a||"malam"===a?e+12:void 0},meridiem:function(e,a,t){return e<11?"pagi":e<15?"tengahari":e<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),e.defineLocale("ms",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,a){return 12===e&&(e=0),"pagi"===a?e:"tengahari"===a?e>=11?e:e+12:"petang"===a||"malam"===a?e+12:void 0},meridiem:function(e,a,t){return e<11?"pagi":e<15?"tengahari":e<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}});var Sn={1:"\u1041",2:"\u1042",3:"\u1043",4:"\u1044",5:"\u1045",6:"\u1046",7:"\u1047",8:"\u1048",9:"\u1049",0:"\u1040"},Hn={"\u1041":"1","\u1042":"2","\u1043":"3","\u1044":"4","\u1045":"5","\u1046":"6","\u1047":"7","\u1048":"8","\u1049":"9","\u1040":"0"};e.defineLocale("my",{months:"\u1007\u1014\u103a\u1014\u101d\u102b\u101b\u102e_\u1016\u1031\u1016\u1031\u102c\u103a\u101d\u102b\u101b\u102e_\u1019\u1010\u103a_\u1027\u1015\u103c\u102e_\u1019\u1031_\u1007\u103d\u1014\u103a_\u1007\u1030\u101c\u102d\u102f\u1004\u103a_\u101e\u103c\u1002\u102f\u1010\u103a_\u1005\u1000\u103a\u1010\u1004\u103a\u1018\u102c_\u1021\u1031\u102c\u1000\u103a\u1010\u102d\u102f\u1018\u102c_\u1014\u102d\u102f\u101d\u1004\u103a\u1018\u102c_\u1012\u102e\u1007\u1004\u103a\u1018\u102c".split("_"),monthsShort:"\u1007\u1014\u103a_\u1016\u1031_\u1019\u1010\u103a_\u1015\u103c\u102e_\u1019\u1031_\u1007\u103d\u1014\u103a_\u101c\u102d\u102f\u1004\u103a_\u101e\u103c_\u1005\u1000\u103a_\u1021\u1031\u102c\u1000\u103a_\u1014\u102d\u102f_\u1012\u102e".split("_"),weekdays:"\u1010\u1014\u1004\u103a\u1039\u1002\u1014\u103d\u1031_\u1010\u1014\u1004\u103a\u1039\u101c\u102c_\u1021\u1004\u103a\u1039\u1002\u102b_\u1017\u102f\u1012\u1039\u1013\u101f\u1030\u1038_\u1000\u103c\u102c\u101e\u1015\u1010\u1031\u1038_\u101e\u1031\u102c\u1000\u103c\u102c_\u1005\u1014\u1031".split("_"),weekdaysShort:"\u1014\u103d\u1031_\u101c\u102c_\u1002\u102b_\u101f\u1030\u1038_\u1000\u103c\u102c_\u101e\u1031\u102c_\u1014\u1031".split("_"),weekdaysMin:"\u1014\u103d\u1031_\u101c\u102c_\u1002\u102b_\u101f\u1030\u1038_\u1000\u103c\u102c_\u101e\u1031\u102c_\u1014\u1031".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u101a\u1014\u1031.] LT [\u1019\u103e\u102c]",nextDay:"[\u1019\u1014\u1000\u103a\u1016\u103c\u1014\u103a] LT [\u1019\u103e\u102c]",nextWeek:"dddd LT [\u1019\u103e\u102c]",lastDay:"[\u1019\u1014\u1031.\u1000] LT [\u1019\u103e\u102c]",lastWeek:"[\u1015\u103c\u102e\u1038\u1001\u1032\u1037\u101e\u1031\u102c] dddd LT [\u1019\u103e\u102c]",sameElse:"L"},relativeTime:{future:"\u101c\u102c\u1019\u100a\u103a\u1037 %s \u1019\u103e\u102c",past:"\u101c\u103d\u1014\u103a\u1001\u1032\u1037\u101e\u1031\u102c %s \u1000",s:"\u1005\u1000\u1039\u1000\u1014\u103a.\u1021\u1014\u100a\u103a\u1038\u1004\u101a\u103a",m:"\u1010\u1005\u103a\u1019\u102d\u1014\u1005\u103a",mm:"%d \u1019\u102d\u1014\u1005\u103a",h:"\u1010\u1005\u103a\u1014\u102c\u101b\u102e",hh:"%d \u1014\u102c\u101b\u102e",d:"\u1010\u1005\u103a\u101b\u1000\u103a",dd:"%d \u101b\u1000\u103a",M:"\u1010\u1005\u103a\u101c",MM:"%d \u101c",y:"\u1010\u1005\u103a\u1014\u103e\u1005\u103a",yy:"%d \u1014\u103e\u1005\u103a"},preparse:function(e){return e.replace(/[\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040]/g,function(e){return Hn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Sn[e]})},week:{dow:1,doy:4}}),e.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),monthsParseExact:!0,weekdays:"s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag".split("_"),weekdaysShort:"s\xf8._ma._ti._on._to._fr._l\xf8.".split("_"),weekdaysMin:"s\xf8_ma_ti_on_to_fr_l\xf8".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i g\xe5r kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en m\xe5ned",MM:"%d m\xe5neder",y:"ett \xe5r",yy:"%d \xe5r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var bn={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"},jn={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"};e.defineLocale("ne",{months:"\u091c\u0928\u0935\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f\u0932_\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0937\u094d\u091f_\u0938\u0947\u092a\u094d\u091f\u0947\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u092d\u0947\u092e\u094d\u092c\u0930_\u0921\u093f\u0938\u0947\u092e\u094d\u092c\u0930".split("_"),monthsShort:"\u091c\u0928._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f._\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908._\u0905\u0917._\u0938\u0947\u092a\u094d\u091f._\u0905\u0915\u094d\u091f\u094b._\u0928\u094b\u092d\u0947._\u0921\u093f\u0938\u0947.".split("_"),monthsParseExact:!0,weekdays:"\u0906\u0907\u0924\u092c\u093e\u0930_\u0938\u094b\u092e\u092c\u093e\u0930_\u092e\u0919\u094d\u0917\u0932\u092c\u093e\u0930_\u092c\u0941\u0927\u092c\u093e\u0930_\u092c\u093f\u0939\u093f\u092c\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u092c\u093e\u0930_\u0936\u0928\u093f\u092c\u093e\u0930".split("_"),weekdaysShort:"\u0906\u0907\u0924._\u0938\u094b\u092e._\u092e\u0919\u094d\u0917\u0932._\u092c\u0941\u0927._\u092c\u093f\u0939\u093f._\u0936\u0941\u0915\u094d\u0930._\u0936\u0928\u093f.".split("_"),weekdaysMin:"\u0906._\u0938\u094b._\u092e\u0902._\u092c\u0941._\u092c\u093f._\u0936\u0941._\u0936.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"A\u0915\u094b h:mm \u092c\u091c\u0947",LTS:"A\u0915\u094b h:mm:ss \u092c\u091c\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947",LLLL:"dddd, D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947"},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return jn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return bn[e]})},meridiemParse:/\u0930\u093e\u0924\u093f|\u092c\u093f\u0939\u093e\u0928|\u0926\u093f\u0909\u0901\u0938\u094b|\u0938\u093e\u0901\u091d/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0930\u093e\u0924\u093f"===a?e<4?e:e+12:"\u092c\u093f\u0939\u093e\u0928"===a?e:"\u0926\u093f\u0909\u0901\u0938\u094b"===a?e>=10?e:e+12:"\u0938\u093e\u0901\u091d"===a?e+12:void 0},meridiem:function(e,a,t){return e<3?"\u0930\u093e\u0924\u093f":e<12?"\u092c\u093f\u0939\u093e\u0928":e<16?"\u0926\u093f\u0909\u0901\u0938\u094b":e<20?"\u0938\u093e\u0901\u091d":"\u0930\u093e\u0924\u093f"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u092d\u094b\u0932\u093f] LT",nextWeek:"[\u0906\u0909\u0901\u0926\u094b] dddd[,] LT",lastDay:"[\u0939\u093f\u091c\u094b] LT",lastWeek:"[\u0917\u090f\u0915\u094b] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s\u092e\u093e",past:"%s \u0905\u0917\u093e\u0921\u093f",s:"\u0915\u0947\u0939\u0940 \u0915\u094d\u0937\u0923",m:"\u090f\u0915 \u092e\u093f\u0928\u0947\u091f",mm:"%d \u092e\u093f\u0928\u0947\u091f",h:"\u090f\u0915 \u0918\u0923\u094d\u091f\u093e",hh:"%d \u0918\u0923\u094d\u091f\u093e",d:"\u090f\u0915 \u0926\u093f\u0928",dd:"%d \u0926\u093f\u0928",M:"\u090f\u0915 \u092e\u0939\u093f\u0928\u093e",MM:"%d \u092e\u0939\u093f\u0928\u093e",y:"\u090f\u0915 \u092c\u0930\u094d\u0937",yy:"%d \u092c\u0930\u094d\u0937"},week:{dow:0,doy:6}});var xn="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),Pn="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),On=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],Wn=/^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;e.defineLocale("nl-be",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?Pn[e.month()]:xn[e.month()]:xn},monthsRegex:Wn,monthsShortRegex:Wn,monthsStrictRegex:/^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:On,longMonthsParse:On,shortMonthsParse:On,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"zo_ma_di_wo_do_vr_za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"\xe9\xe9n minuut",mm:"%d minuten",h:"\xe9\xe9n uur",hh:"%d uur",d:"\xe9\xe9n dag",dd:"%d dagen",M:"\xe9\xe9n maand",MM:"%d maanden",y:"\xe9\xe9n jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}});var En="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),An="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),Fn=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],zn=/^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;e.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?An[e.month()]:En[e.month()]:En},monthsRegex:zn,monthsShortRegex:zn,monthsStrictRegex:/^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:Fn,longMonthsParse:Fn,shortMonthsParse:Fn,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"zo_ma_di_wo_do_vr_za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"\xe9\xe9n minuut",mm:"%d minuten",h:"\xe9\xe9n uur",hh:"%d uur",d:"\xe9\xe9n dag",dd:"%d dagen",M:"\xe9\xe9n maand",MM:"%d maanden",y:"\xe9\xe9n jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||e>=20?"ste":"de")},week:{dow:1,doy:4}}),e.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_m\xe5ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_m\xe5n_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_m\xe5_ty_on_to_fr_l\xf8".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I g\xe5r klokka] LT",lastWeek:"[F\xf8reg\xe5ande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein m\xe5nad",MM:"%d m\xe5nader",y:"eit \xe5r",yy:"%d \xe5r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var Jn={1:"\u0a67",2:"\u0a68",3:"\u0a69",4:"\u0a6a",5:"\u0a6b",6:"\u0a6c",7:"\u0a6d",8:"\u0a6e",9:"\u0a6f",0:"\u0a66"},Nn={"\u0a67":"1","\u0a68":"2","\u0a69":"3","\u0a6a":"4","\u0a6b":"5","\u0a6c":"6","\u0a6d":"7","\u0a6e":"8","\u0a6f":"9","\u0a66":"0"};e.defineLocale("pa-in",{months:"\u0a1c\u0a28\u0a35\u0a30\u0a40_\u0a2b\u0a3c\u0a30\u0a35\u0a30\u0a40_\u0a2e\u0a3e\u0a30\u0a1a_\u0a05\u0a2a\u0a4d\u0a30\u0a48\u0a32_\u0a2e\u0a08_\u0a1c\u0a42\u0a28_\u0a1c\u0a41\u0a32\u0a3e\u0a08_\u0a05\u0a17\u0a38\u0a24_\u0a38\u0a24\u0a70\u0a2c\u0a30_\u0a05\u0a15\u0a24\u0a42\u0a2c\u0a30_\u0a28\u0a35\u0a70\u0a2c\u0a30_\u0a26\u0a38\u0a70\u0a2c\u0a30".split("_"),monthsShort:"\u0a1c\u0a28\u0a35\u0a30\u0a40_\u0a2b\u0a3c\u0a30\u0a35\u0a30\u0a40_\u0a2e\u0a3e\u0a30\u0a1a_\u0a05\u0a2a\u0a4d\u0a30\u0a48\u0a32_\u0a2e\u0a08_\u0a1c\u0a42\u0a28_\u0a1c\u0a41\u0a32\u0a3e\u0a08_\u0a05\u0a17\u0a38\u0a24_\u0a38\u0a24\u0a70\u0a2c\u0a30_\u0a05\u0a15\u0a24\u0a42\u0a2c\u0a30_\u0a28\u0a35\u0a70\u0a2c\u0a30_\u0a26\u0a38\u0a70\u0a2c\u0a30".split("_"),weekdays:"\u0a10\u0a24\u0a35\u0a3e\u0a30_\u0a38\u0a4b\u0a2e\u0a35\u0a3e\u0a30_\u0a2e\u0a70\u0a17\u0a32\u0a35\u0a3e\u0a30_\u0a2c\u0a41\u0a27\u0a35\u0a3e\u0a30_\u0a35\u0a40\u0a30\u0a35\u0a3e\u0a30_\u0a38\u0a3c\u0a41\u0a71\u0a15\u0a30\u0a35\u0a3e\u0a30_\u0a38\u0a3c\u0a28\u0a40\u0a1a\u0a30\u0a35\u0a3e\u0a30".split("_"),weekdaysShort:"\u0a10\u0a24_\u0a38\u0a4b\u0a2e_\u0a2e\u0a70\u0a17\u0a32_\u0a2c\u0a41\u0a27_\u0a35\u0a40\u0a30_\u0a38\u0a3c\u0a41\u0a15\u0a30_\u0a38\u0a3c\u0a28\u0a40".split("_"),weekdaysMin:"\u0a10\u0a24_\u0a38\u0a4b\u0a2e_\u0a2e\u0a70\u0a17\u0a32_\u0a2c\u0a41\u0a27_\u0a35\u0a40\u0a30_\u0a38\u0a3c\u0a41\u0a15\u0a30_\u0a38\u0a3c\u0a28\u0a40".split("_"),longDateFormat:{LT:"A h:mm \u0a35\u0a1c\u0a47",LTS:"A h:mm:ss \u0a35\u0a1c\u0a47",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u0a35\u0a1c\u0a47",LLLL:"dddd, D MMMM YYYY, A h:mm \u0a35\u0a1c\u0a47"},calendar:{sameDay:"[\u0a05\u0a1c] LT",nextDay:"[\u0a15\u0a32] LT",nextWeek:"dddd, LT",lastDay:"[\u0a15\u0a32] LT",lastWeek:"[\u0a2a\u0a3f\u0a1b\u0a32\u0a47] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0a35\u0a3f\u0a71\u0a1a",past:"%s \u0a2a\u0a3f\u0a1b\u0a32\u0a47",s:"\u0a15\u0a41\u0a1d \u0a38\u0a15\u0a3f\u0a70\u0a1f",m:"\u0a07\u0a15 \u0a2e\u0a3f\u0a70\u0a1f",mm:"%d \u0a2e\u0a3f\u0a70\u0a1f",h:"\u0a07\u0a71\u0a15 \u0a18\u0a70\u0a1f\u0a3e",hh:"%d \u0a18\u0a70\u0a1f\u0a47",d:"\u0a07\u0a71\u0a15 \u0a26\u0a3f\u0a28",dd:"%d \u0a26\u0a3f\u0a28",M:"\u0a07\u0a71\u0a15 \u0a2e\u0a39\u0a40\u0a28\u0a3e",MM:"%d \u0a2e\u0a39\u0a40\u0a28\u0a47",y:"\u0a07\u0a71\u0a15 \u0a38\u0a3e\u0a32",yy:"%d \u0a38\u0a3e\u0a32"},preparse:function(e){return e.replace(/[\u0a67\u0a68\u0a69\u0a6a\u0a6b\u0a6c\u0a6d\u0a6e\u0a6f\u0a66]/g,function(e){return Nn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Jn[e]})},meridiemParse:/\u0a30\u0a3e\u0a24|\u0a38\u0a35\u0a47\u0a30|\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30|\u0a38\u0a3c\u0a3e\u0a2e/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0a30\u0a3e\u0a24"===a?e<4?e:e+12:"\u0a38\u0a35\u0a47\u0a30"===a?e:"\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30"===a?e>=10?e:e+12:"\u0a38\u0a3c\u0a3e\u0a2e"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0a30\u0a3e\u0a24":e<10?"\u0a38\u0a35\u0a47\u0a30":e<17?"\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30":e<20?"\u0a38\u0a3c\u0a3e\u0a2e":"\u0a30\u0a3e\u0a24"},week:{dow:0,doy:6}});var Rn="stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017adziernik_listopad_grudzie\u0144".split("_"),Cn="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015bnia_pa\u017adziernika_listopada_grudnia".split("_");e.defineLocale("pl",{months:function(e,a){return e?""===a?"("+Cn[e.month()]+"|"+Rn[e.month()]+")":/D MMMM/.test(a)?Cn[e.month()]:Rn[e.month()]:Rn},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017a_lis_gru".split("_"),weekdays:"niedziela_poniedzia\u0142ek_wtorek_\u015broda_czwartek_pi\u0105tek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_\u015br_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_\u015ar_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dzi\u015b o] LT",nextDay:"[Jutro o] LT",nextWeek:function(){switch(this.day()){case 0:return"[W niedziel\u0119 o] LT";case 2:return"[We wtorek o] LT";case 3:return"[W \u015brod\u0119 o] LT";case 6:return"[W sobot\u0119 o] LT";default:return"[W] dddd [o] LT"}},lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zesz\u0142\u0105 niedziel\u0119 o] LT";case 3:return"[W zesz\u0142\u0105 \u015brod\u0119 o] LT";case 6:return"[W zesz\u0142\u0105 sobot\u0119 o] LT";default:return"[W zesz\u0142y] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:wa,mm:wa,h:wa,hh:wa,d:"1 dzie\u0144",dd:"%d dni",M:"miesi\u0105c",MM:wa,y:"rok",yy:wa},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("pt-br",{months:"janeiro_fevereiro_mar\xe7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),monthsShort:"jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),weekdays:"Domingo_Segunda-feira_Ter\xe7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xe1bado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_S\xe1b".split("_"),weekdaysMin:"Do_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_S\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [\xe0s] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [\xe0s] HH:mm"},calendar:{sameDay:"[Hoje \xe0s] LT",nextDay:"[Amanh\xe3 \xe0s] LT",nextWeek:"dddd [\xe0s] LT",lastDay:"[Ontem \xe0s] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[\xdaltimo] dddd [\xe0s] LT":"[\xdaltima] dddd [\xe0s] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atr\xe1s",s:"poucos segundos",ss:"%d segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um m\xeas",MM:"%d meses",y:"um ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba"}),e.defineLocale("pt",{months:"janeiro_fevereiro_mar\xe7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),monthsShort:"jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),weekdays:"Domingo_Segunda-feira_Ter\xe7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xe1bado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_S\xe1b".split("_"),weekdaysMin:"Do_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_S\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje \xe0s] LT",nextDay:"[Amanh\xe3 \xe0s] LT",nextWeek:"dddd [\xe0s] LT",lastDay:"[Ontem \xe0s] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[\xdaltimo] dddd [\xe0s] LT":"[\xdaltima] dddd [\xe0s] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"h\xe1 %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um m\xeas",MM:"%d meses",y:"um ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),e.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"duminic\u0103_luni_mar\u021bi_miercuri_joi_vineri_s\xe2mb\u0103t\u0103".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_S\xe2m".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_S\xe2".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[m\xe2ine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s \xeen urm\u0103",s:"c\xe2teva secunde",m:"un minut",mm:va,h:"o or\u0103",hh:va,d:"o zi",dd:va,M:"o lun\u0103",MM:va,y:"un an",yy:va},week:{dow:1,doy:7}});var In=[/^\u044f\u043d\u0432/i,/^\u0444\u0435\u0432/i,/^\u043c\u0430\u0440/i,/^\u0430\u043f\u0440/i,/^\u043c\u0430[\u0439\u044f]/i,/^\u0438\u044e\u043d/i,/^\u0438\u044e\u043b/i,/^\u0430\u0432\u0433/i,/^\u0441\u0435\u043d/i,/^\u043e\u043a\u0442/i,/^\u043d\u043e\u044f/i,/^\u0434\u0435\u043a/i];e.defineLocale("ru",{months:{format:"\u044f\u043d\u0432\u0430\u0440\u044f_\u0444\u0435\u0432\u0440\u0430\u043b\u044f_\u043c\u0430\u0440\u0442\u0430_\u0430\u043f\u0440\u0435\u043b\u044f_\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f_\u043e\u043a\u0442\u044f\u0431\u0440\u044f_\u043d\u043e\u044f\u0431\u0440\u044f_\u0434\u0435\u043a\u0430\u0431\u0440\u044f".split("_"),standalone:"\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_")},monthsShort:{format:"\u044f\u043d\u0432._\u0444\u0435\u0432\u0440._\u043c\u0430\u0440._\u0430\u043f\u0440._\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433._\u0441\u0435\u043d\u0442._\u043e\u043a\u0442._\u043d\u043e\u044f\u0431._\u0434\u0435\u043a.".split("_"),standalone:"\u044f\u043d\u0432._\u0444\u0435\u0432\u0440._\u043c\u0430\u0440\u0442_\u0430\u043f\u0440._\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433._\u0441\u0435\u043d\u0442._\u043e\u043a\u0442._\u043d\u043e\u044f\u0431._\u0434\u0435\u043a.".split("_")},weekdays:{standalone:"\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043e\u0442\u0430".split("_"),format:"\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0443_\u0441\u0443\u0431\u0431\u043e\u0442\u0443".split("_"),isFormat:/\[ ?[\u0412\u0432] ?(?:\u043f\u0440\u043e\u0448\u043b\u0443\u044e|\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e|\u044d\u0442\u0443)? ?\] ?dddd/},weekdaysShort:"\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),monthsParse:In,longMonthsParse:In,shortMonthsParse:In,monthsRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i,monthsShortRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i,monthsStrictRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044f\u044c]|\u0444\u0435\u0432\u0440\u0430\u043b[\u044f\u044c]|\u043c\u0430\u0440\u0442\u0430?|\u0430\u043f\u0440\u0435\u043b[\u044f\u044c]|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044f\u044c]|\u0438\u044e\u043b[\u044f\u044c]|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043e\u043a\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043d\u043e\u044f\u0431\u0440[\u044f\u044c]|\u0434\u0435\u043a\u0430\u0431\u0440[\u044f\u044c])/i,monthsShortStrictRegex:/^(\u044f\u043d\u0432\.|\u0444\u0435\u0432\u0440?\.|\u043c\u0430\u0440[\u0442.]|\u0430\u043f\u0440\.|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044c\u044f.]|\u0438\u044e\u043b[\u044c\u044f.]|\u0430\u0432\u0433\.|\u0441\u0435\u043d\u0442?\.|\u043e\u043a\u0442\.|\u043d\u043e\u044f\u0431?\.|\u0434\u0435\u043a\.)/i,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0433.",LLL:"D MMMM YYYY \u0433., HH:mm",LLLL:"dddd, D MMMM YYYY \u0433., HH:mm"},calendar:{sameDay:"[\u0421\u0435\u0433\u043e\u0434\u043d\u044f \u0432] LT",nextDay:"[\u0417\u0430\u0432\u0442\u0440\u0430 \u0432] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",nextWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[\u0412\u043e] dddd [\u0432] LT":"[\u0412] dddd [\u0432] LT";switch(this.day()){case 0:return"[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u0435] dddd [\u0432] LT";case 1:case 2:case 4:return"[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439] dddd [\u0432] LT";case 3:case 5:case 6:return"[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e] dddd [\u0432] LT"}},lastWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[\u0412\u043e] dddd [\u0432] LT":"[\u0412] dddd [\u0432] LT";switch(this.day()){case 0:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u043e\u0435] dddd [\u0432] LT";case 1:case 2:case 4:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u044b\u0439] dddd [\u0432] LT";case 3:case 5:case 6:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u0443\u044e] dddd [\u0432] LT"}},sameElse:"L"},relativeTime:{future:"\u0447\u0435\u0440\u0435\u0437 %s",past:"%s \u043d\u0430\u0437\u0430\u0434",s:"\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434",m:Sa,mm:Sa,h:"\u0447\u0430\u0441",hh:Sa,d:"\u0434\u0435\u043d\u044c",dd:Sa,M:"\u043c\u0435\u0441\u044f\u0446",MM:Sa,y:"\u0433\u043e\u0434",yy:Sa},meridiemParse:/\u043d\u043e\u0447\u0438|\u0443\u0442\u0440\u0430|\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430/i,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430)$/.test(e)},meridiem:function(e,a,t){return e<4?"\u043d\u043e\u0447\u0438":e<12?"\u0443\u0442\u0440\u0430":e<17?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u0435\u0440\u0430"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0439|\u0433\u043e|\u044f)/,ordinal:function(e,a){switch(a){case"M":case"d":case"DDD":return e+"-\u0439";case"D":return e+"-\u0433\u043e";case"w":case"W":return e+"-\u044f";default:return e}},week:{dow:1,doy:4}});var Gn=["\u062c\u0646\u0648\u0631\u064a","\u0641\u064a\u0628\u0631\u0648\u0631\u064a","\u0645\u0627\u0631\u0686","\u0627\u067e\u0631\u064a\u0644","\u0645\u0626\u064a","\u062c\u0648\u0646","\u062c\u0648\u0644\u0627\u0621\u0650","\u0622\u06af\u0633\u067d","\u0633\u064a\u067e\u067d\u0645\u0628\u0631","\u0622\u06aa\u067d\u0648\u0628\u0631","\u0646\u0648\u0645\u0628\u0631","\u068a\u0633\u0645\u0628\u0631"],Un=["\u0622\u0686\u0631","\u0633\u0648\u0645\u0631","\u0627\u06b1\u0627\u0631\u0648","\u0627\u0631\u0628\u0639","\u062e\u0645\u064a\u0633","\u062c\u0645\u0639","\u0687\u0646\u0687\u0631"];e.defineLocale("sd",{months:Gn,monthsShort:Gn,weekdays:Un,weekdaysShort:Un,weekdaysMin:Un,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd\u060c D MMMM YYYY HH:mm"},meridiemParse:/\u0635\u0628\u062d|\u0634\u0627\u0645/,isPM:function(e){return"\u0634\u0627\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635\u0628\u062d":"\u0634\u0627\u0645"},calendar:{sameDay:"[\u0627\u0684] LT",nextDay:"[\u0633\u0680\u0627\u06bb\u064a] LT",nextWeek:"dddd [\u0627\u06b3\u064a\u0646 \u0647\u0641\u062a\u064a \u062a\u064a] LT",lastDay:"[\u06aa\u0627\u0644\u0647\u0647] LT",lastWeek:"[\u06af\u0632\u0631\u064a\u0644 \u0647\u0641\u062a\u064a] dddd [\u062a\u064a] LT",sameElse:"L"},relativeTime:{future:"%s \u067e\u0648\u0621",past:"%s \u0627\u06b3",s:"\u0686\u0646\u062f \u0633\u064a\u06aa\u0646\u068a",m:"\u0647\u06aa \u0645\u0646\u067d",mm:"%d \u0645\u0646\u067d",h:"\u0647\u06aa \u06aa\u0644\u0627\u06aa",hh:"%d \u06aa\u0644\u0627\u06aa",d:"\u0647\u06aa \u068f\u064a\u0646\u0647\u0646",dd:"%d \u068f\u064a\u0646\u0647\u0646",M:"\u0647\u06aa \u0645\u0647\u064a\u0646\u0648",MM:"%d \u0645\u0647\u064a\u0646\u0627",y:"\u0647\u06aa \u0633\u0627\u0644",yy:"%d \u0633\u0627\u0644"},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/,/g,"\u060c")},week:{dow:1,doy:4}}),e.defineLocale("se",{months:"o\u0111\u0111ajagem\xe1nnu_guovvam\xe1nnu_njuk\u010dam\xe1nnu_cuo\u014bom\xe1nnu_miessem\xe1nnu_geassem\xe1nnu_suoidnem\xe1nnu_borgem\xe1nnu_\u010dak\u010dam\xe1nnu_golggotm\xe1nnu_sk\xe1bmam\xe1nnu_juovlam\xe1nnu".split("_"),monthsShort:"o\u0111\u0111j_guov_njuk_cuo_mies_geas_suoi_borg_\u010dak\u010d_golg_sk\xe1b_juov".split("_"),weekdays:"sotnabeaivi_vuoss\xe1rga_ma\u014b\u014beb\xe1rga_gaskavahkku_duorastat_bearjadat_l\xe1vvardat".split("_"),weekdaysShort:"sotn_vuos_ma\u014b_gask_duor_bear_l\xe1v".split("_"),weekdaysMin:"s_v_m_g_d_b_L".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"MMMM D. [b.] YYYY",LLL:"MMMM D. [b.] YYYY [ti.] HH:mm",LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"},calendar:{sameDay:"[otne ti] LT",nextDay:"[ihttin ti] LT",nextWeek:"dddd [ti] LT",lastDay:"[ikte ti] LT",lastWeek:"[ovddit] dddd [ti] LT",sameElse:"L"},relativeTime:{future:"%s gea\u017ees",past:"ma\u014bit %s",s:"moadde sekunddat",m:"okta minuhta",mm:"%d minuhtat",h:"okta diimmu",hh:"%d diimmut",d:"okta beaivi",dd:"%d beaivvit",M:"okta m\xe1nnu",MM:"%d m\xe1nut",y:"okta jahki",yy:"%d jagit"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("si",{months:"\u0da2\u0db1\u0dc0\u0dcf\u0dbb\u0dd2_\u0db4\u0dd9\u0db6\u0dbb\u0dc0\u0dcf\u0dbb\u0dd2_\u0db8\u0dcf\u0dbb\u0dca\u0dad\u0dd4_\u0d85\u0db4\u0dca\u200d\u0dbb\u0dda\u0dbd\u0dca_\u0db8\u0dd0\u0dba\u0dd2_\u0da2\u0dd6\u0db1\u0dd2_\u0da2\u0dd6\u0dbd\u0dd2_\u0d85\u0d9c\u0ddd\u0dc3\u0dca\u0dad\u0dd4_\u0dc3\u0dd0\u0db4\u0dca\u0dad\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca_\u0d94\u0d9a\u0dca\u0dad\u0ddd\u0db6\u0dbb\u0dca_\u0db1\u0ddc\u0dc0\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca_\u0daf\u0dd9\u0dc3\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca".split("_"),monthsShort:"\u0da2\u0db1_\u0db4\u0dd9\u0db6_\u0db8\u0dcf\u0dbb\u0dca_\u0d85\u0db4\u0dca_\u0db8\u0dd0\u0dba\u0dd2_\u0da2\u0dd6\u0db1\u0dd2_\u0da2\u0dd6\u0dbd\u0dd2_\u0d85\u0d9c\u0ddd_\u0dc3\u0dd0\u0db4\u0dca_\u0d94\u0d9a\u0dca_\u0db1\u0ddc\u0dc0\u0dd0_\u0daf\u0dd9\u0dc3\u0dd0".split("_"),weekdays:"\u0d89\u0dbb\u0dd2\u0daf\u0dcf_\u0dc3\u0db3\u0dd4\u0daf\u0dcf_\u0d85\u0d9f\u0dc4\u0dbb\u0dd4\u0dc0\u0dcf\u0daf\u0dcf_\u0db6\u0daf\u0dcf\u0daf\u0dcf_\u0db6\u0dca\u200d\u0dbb\u0dc4\u0dc3\u0dca\u0db4\u0dad\u0dd2\u0db1\u0dca\u0daf\u0dcf_\u0dc3\u0dd2\u0d9a\u0dd4\u0dbb\u0dcf\u0daf\u0dcf_\u0dc3\u0dd9\u0db1\u0dc3\u0dd4\u0dbb\u0dcf\u0daf\u0dcf".split("_"),weekdaysShort:"\u0d89\u0dbb\u0dd2_\u0dc3\u0db3\u0dd4_\u0d85\u0d9f_\u0db6\u0daf\u0dcf_\u0db6\u0dca\u200d\u0dbb\u0dc4_\u0dc3\u0dd2\u0d9a\u0dd4_\u0dc3\u0dd9\u0db1".split("_"),weekdaysMin:"\u0d89_\u0dc3_\u0d85_\u0db6_\u0db6\u0dca\u200d\u0dbb_\u0dc3\u0dd2_\u0dc3\u0dd9".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [\u0dc0\u0dd0\u0db1\u0dd2] dddd, a h:mm:ss"},calendar:{sameDay:"[\u0d85\u0daf] LT[\u0da7]",nextDay:"[\u0dc4\u0dd9\u0da7] LT[\u0da7]",nextWeek:"dddd LT[\u0da7]",lastDay:"[\u0d8a\u0dba\u0dda] LT[\u0da7]",lastWeek:"[\u0db4\u0dc3\u0dd4\u0d9c\u0dd2\u0dba] dddd LT[\u0da7]",sameElse:"L"},relativeTime:{future:"%s\u0d9a\u0dd2\u0db1\u0dca",past:"%s\u0d9a\u0da7 \u0db4\u0dd9\u0dbb",s:"\u0dad\u0dad\u0dca\u0db4\u0dbb \u0d9a\u0dd2\u0dc4\u0dd2\u0db4\u0dba",m:"\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4\u0dc0",mm:"\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4 %d",h:"\u0db4\u0dd0\u0dba",hh:"\u0db4\u0dd0\u0dba %d",d:"\u0daf\u0dd2\u0db1\u0dba",dd:"\u0daf\u0dd2\u0db1 %d",M:"\u0db8\u0dcf\u0dc3\u0dba",MM:"\u0db8\u0dcf\u0dc3 %d",y:"\u0dc0\u0dc3\u0dbb",yy:"\u0dc0\u0dc3\u0dbb %d"},dayOfMonthOrdinalParse:/\d{1,2} \u0dc0\u0dd0\u0db1\u0dd2/,ordinal:function(e){return e+" \u0dc0\u0dd0\u0db1\u0dd2"},meridiemParse:/\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4|\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4|\u0db4\u0dd9.\u0dc0|\u0db4.\u0dc0./,isPM:function(e){return"\u0db4.\u0dc0."===e||"\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4"===e},meridiem:function(e,a,t){return e>11?t?"\u0db4.\u0dc0.":"\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4":t?"\u0db4\u0dd9.\u0dc0.":"\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4"}});var Vn="janu\xe1r_febru\xe1r_marec_apr\xedl_m\xe1j_j\xfan_j\xfal_august_september_okt\xf3ber_november_december".split("_"),Kn="jan_feb_mar_apr_m\xe1j_j\xfan_j\xfal_aug_sep_okt_nov_dec".split("_");e.defineLocale("sk",{months:Vn,monthsShort:Kn,weekdays:"nede\u013ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_\u0161t_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_\u0161t_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nede\u013eu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo \u0161tvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[v\u010dera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minul\xfa nede\u013eu o] LT";case 1:case 2:return"[minul\xfd] dddd [o] LT";case 3:return"[minul\xfa stredu o] LT";case 4:case 5:return"[minul\xfd] dddd [o] LT";case 6:return"[minul\xfa sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:ba,m:ba,mm:ba,h:ba,hh:ba,d:ba,dd:ba,M:ba,MM:ba,y:ba,yy:ba},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljek_torek_sreda_\u010detrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._\u010det._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_\u010de_pe_so".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[v\u010deraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prej\u0161njo] [nedeljo] [ob] LT";case 3:return"[prej\u0161njo] [sredo] [ob] LT";case 6:return"[prej\u0161njo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prej\u0161nji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"\u010dez %s",past:"pred %s",s:ja,m:ja,mm:ja,h:ja,hh:ja,d:ja,dd:ja,M:ja,MM:ja,y:ja,yy:ja},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),e.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\xebntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\xebn_Dhj".split("_"),weekdays:"E Diel_E H\xebn\xeb_E Mart\xeb_E M\xebrkur\xeb_E Enjte_E Premte_E Shtun\xeb".split("_"),weekdaysShort:"Die_H\xebn_Mar_M\xebr_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_M\xeb_E_P_Sh".split("_"),weekdaysParseExact:!0,meridiemParse:/PD|MD/,isPM:function(e){return"M"===e.charAt(0)},meridiem:function(e,a,t){return e<12?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot n\xeb] LT",nextDay:"[Nes\xebr n\xeb] LT",nextWeek:"dddd [n\xeb] LT",lastDay:"[Dje n\xeb] LT",lastWeek:"dddd [e kaluar n\xeb] LT",sameElse:"L"},relativeTime:{future:"n\xeb %s",past:"%s m\xeb par\xeb",s:"disa sekonda",m:"nj\xeb minut\xeb",mm:"%d minuta",h:"nj\xeb or\xeb",hh:"%d or\xeb",d:"nj\xeb dit\xeb",dd:"%d dit\xeb",M:"nj\xeb muaj",MM:"%d muaj",y:"nj\xeb vit",yy:"%d vite"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var $n={words:{m:["\u0458\u0435\u0434\u0430\u043d \u043c\u0438\u043d\u0443\u0442","\u0458\u0435\u0434\u043d\u0435 \u043c\u0438\u043d\u0443\u0442\u0435"],mm:["\u043c\u0438\u043d\u0443\u0442","\u043c\u0438\u043d\u0443\u0442\u0435","\u043c\u0438\u043d\u0443\u0442\u0430"],h:["\u0458\u0435\u0434\u0430\u043d \u0441\u0430\u0442","\u0458\u0435\u0434\u043d\u043e\u0433 \u0441\u0430\u0442\u0430"],hh:["\u0441\u0430\u0442","\u0441\u0430\u0442\u0430","\u0441\u0430\u0442\u0438"],dd:["\u0434\u0430\u043d","\u0434\u0430\u043d\u0430","\u0434\u0430\u043d\u0430"],MM:["\u043c\u0435\u0441\u0435\u0446","\u043c\u0435\u0441\u0435\u0446\u0430","\u043c\u0435\u0441\u0435\u0446\u0438"],yy:["\u0433\u043e\u0434\u0438\u043d\u0430","\u0433\u043e\u0434\u0438\u043d\u0435","\u0433\u043e\u0434\u0438\u043d\u0430"]},correctGrammaticalCase:function(e,a){return 1===e?a[0]:e>=2&&e<=4?a[1]:a[2]},translate:function(e,a,t){var s=$n.words[t];return 1===t.length?a?s[0]:s[1]:e+" "+$n.correctGrammaticalCase(e,s)}};e.defineLocale("sr-cyrl",{months:"\u0458\u0430\u043d\u0443\u0430\u0440_\u0444\u0435\u0431\u0440\u0443\u0430\u0440_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0431\u0430\u0440_\u043e\u043a\u0442\u043e\u0431\u0430\u0440_\u043d\u043e\u0432\u0435\u043c\u0431\u0430\u0440_\u0434\u0435\u0446\u0435\u043c\u0431\u0430\u0440".split("_"),monthsShort:"\u0458\u0430\u043d._\u0444\u0435\u0431._\u043c\u0430\u0440._\u0430\u043f\u0440._\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433._\u0441\u0435\u043f._\u043e\u043a\u0442._\u043d\u043e\u0432._\u0434\u0435\u0446.".split("_"),monthsParseExact:!0,weekdays:"\u043d\u0435\u0434\u0435\u0459\u0430_\u043f\u043e\u043d\u0435\u0434\u0435\u0459\u0430\u043a_\u0443\u0442\u043e\u0440\u0430\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043a_\u043f\u0435\u0442\u0430\u043a_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u043d\u0435\u0434._\u043f\u043e\u043d._\u0443\u0442\u043e._\u0441\u0440\u0435._\u0447\u0435\u0442._\u043f\u0435\u0442._\u0441\u0443\u0431.".split("_"),weekdaysMin:"\u043d\u0435_\u043f\u043e_\u0443\u0442_\u0441\u0440_\u0447\u0435_\u043f\u0435_\u0441\u0443".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[\u0434\u0430\u043d\u0430\u0441 \u0443] LT",nextDay:"[\u0441\u0443\u0442\u0440\u0430 \u0443] LT",nextWeek:function(){switch(this.day()){case 0:return"[\u0443] [\u043d\u0435\u0434\u0435\u0459\u0443] [\u0443] LT";case 3:return"[\u0443] [\u0441\u0440\u0435\u0434\u0443] [\u0443] LT";case 6:return"[\u0443] [\u0441\u0443\u0431\u043e\u0442\u0443] [\u0443] LT";case 1:case 2:case 4:case 5:return"[\u0443] dddd [\u0443] LT"}},lastDay:"[\u0458\u0443\u0447\u0435 \u0443] LT",lastWeek:function(){return["[\u043f\u0440\u043e\u0448\u043b\u0435] [\u043d\u0435\u0434\u0435\u0459\u0435] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u043f\u043e\u043d\u0435\u0434\u0435\u0459\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u0443\u0442\u043e\u0440\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u0435] [\u0441\u0440\u0435\u0434\u0435] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u0447\u0435\u0442\u0432\u0440\u0442\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u043f\u0435\u0442\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u0435] [\u0441\u0443\u0431\u043e\u0442\u0435] [\u0443] LT"][this.day()]},sameElse:"L"},relativeTime:{future:"\u0437\u0430 %s",past:"\u043f\u0440\u0435 %s",s:"\u043d\u0435\u043a\u043e\u043b\u0438\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:$n.translate,mm:$n.translate,h:$n.translate,hh:$n.translate,d:"\u0434\u0430\u043d",dd:$n.translate,M:"\u043c\u0435\u0441\u0435\u0446",MM:$n.translate,y:"\u0433\u043e\u0434\u0438\u043d\u0443",yy:$n.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});var Zn={words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,a){return 1===e?a[0]:e>=2&&e<=4?a[1]:a[2]},translate:function(e,a,t){var s=Zn.words[t];return 1===t.length?a?s[0]:s[1]:e+" "+Zn.correctGrammaticalCase(e,s)}};e.defineLocale("sr",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljak_utorak_sreda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sre._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010de u] LT",lastWeek:function(){return["[pro\u0161le] [nedelje] [u] LT","[pro\u0161log] [ponedeljka] [u] LT","[pro\u0161log] [utorka] [u] LT","[pro\u0161le] [srede] [u] LT","[pro\u0161log] [\u010detvrtka] [u] LT","[pro\u0161log] [petka] [u] LT","[pro\u0161le] [subote] [u] LT"][this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:Zn.translate,mm:Zn.translate,h:Zn.translate,hh:Zn.translate,d:"dan",dd:Zn.translate,M:"mesec",MM:Zn.translate,y:"godinu",yy:Zn.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),e.defineLocale("ss",{months:"Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),monthsShort:"Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),weekdays:"Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),weekdaysShort:"Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),weekdaysMin:"Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Namuhla nga] LT",nextDay:"[Kusasa nga] LT",nextWeek:"dddd [nga] LT",lastDay:"[Itolo nga] LT",lastWeek:"dddd [leliphelile] [nga] LT",sameElse:"L"},relativeTime:{future:"nga %s",past:"wenteka nga %s",s:"emizuzwana lomcane",m:"umzuzu",mm:"%d emizuzu",h:"lihora",hh:"%d emahora",d:"lilanga",dd:"%d emalanga",M:"inyanga",MM:"%d tinyanga",y:"umnyaka",yy:"%d iminyaka"},meridiemParse:/ekuseni|emini|entsambama|ebusuku/,meridiem:function(e,a,t){return e<11?"ekuseni":e<15?"emini":e<19?"entsambama":"ebusuku"},meridiemHour:function(e,a){return 12===e&&(e=0),"ekuseni"===a?e:"emini"===a?e>=11?e:e+12:"entsambama"===a||"ebusuku"===a?0===e?0:e+12:void 0},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:"%d",week:{dow:1,doy:4}}),e.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"s\xf6ndag_m\xe5ndag_tisdag_onsdag_torsdag_fredag_l\xf6rdag".split("_"),weekdaysShort:"s\xf6n_m\xe5n_tis_ons_tor_fre_l\xf6r".split("_"),weekdaysMin:"s\xf6_m\xe5_ti_on_to_fr_l\xf6".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [kl.] HH:mm",LLLL:"dddd D MMMM YYYY [kl.] HH:mm",lll:"D MMM YYYY HH:mm",llll:"ddd D MMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Ig\xe5r] LT",nextWeek:"[P\xe5] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"f\xf6r %s sedan",s:"n\xe5gra sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en m\xe5nad",MM:"%d m\xe5nader",y:"ett \xe5r",yy:"%d \xe5r"},dayOfMonthOrdinalParse:/\d{1,2}(e|a)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"e":1===a?"a":2===a?"a":"e")},week:{dow:1,doy:4}}),e.defineLocale("sw",{months:"Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),weekdays:"Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),weekdaysShort:"Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),weekdaysMin:"J2_J3_J4_J5_Al_Ij_J1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[leo saa] LT",nextDay:"[kesho saa] LT",nextWeek:"[wiki ijayo] dddd [saat] LT",lastDay:"[jana] LT",lastWeek:"[wiki iliyopita] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s baadaye",past:"tokea %s",s:"hivi punde",m:"dakika moja",mm:"dakika %d",h:"saa limoja",hh:"masaa %d",d:"siku moja",dd:"masiku %d",M:"mwezi mmoja",MM:"miezi %d",y:"mwaka mmoja",yy:"miaka %d"},week:{dow:1,doy:7}});var Bn={1:"\u0be7",2:"\u0be8",3:"\u0be9",4:"\u0bea",5:"\u0beb",6:"\u0bec",7:"\u0bed",8:"\u0bee",9:"\u0bef",0:"\u0be6"},qn={"\u0be7":"1","\u0be8":"2","\u0be9":"3","\u0bea":"4","\u0beb":"5","\u0bec":"6","\u0bed":"7","\u0bee":"8","\u0bef":"9","\u0be6":"0"};e.defineLocale("ta",{months:"\u0b9c\u0ba9\u0bb5\u0bb0\u0bbf_\u0baa\u0bbf\u0baa\u0bcd\u0bb0\u0bb5\u0bb0\u0bbf_\u0bae\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd_\u0b8f\u0baa\u0bcd\u0bb0\u0bb2\u0bcd_\u0bae\u0bc7_\u0b9c\u0bc2\u0ba9\u0bcd_\u0b9c\u0bc2\u0bb2\u0bc8_\u0b86\u0b95\u0bb8\u0bcd\u0b9f\u0bcd_\u0b9a\u0bc6\u0baa\u0bcd\u0b9f\u0bc6\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b85\u0b95\u0bcd\u0b9f\u0bc7\u0bbe\u0baa\u0bb0\u0bcd_\u0ba8\u0bb5\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b9f\u0bbf\u0b9a\u0bae\u0bcd\u0baa\u0bb0\u0bcd".split("_"),monthsShort:"\u0b9c\u0ba9\u0bb5\u0bb0\u0bbf_\u0baa\u0bbf\u0baa\u0bcd\u0bb0\u0bb5\u0bb0\u0bbf_\u0bae\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd_\u0b8f\u0baa\u0bcd\u0bb0\u0bb2\u0bcd_\u0bae\u0bc7_\u0b9c\u0bc2\u0ba9\u0bcd_\u0b9c\u0bc2\u0bb2\u0bc8_\u0b86\u0b95\u0bb8\u0bcd\u0b9f\u0bcd_\u0b9a\u0bc6\u0baa\u0bcd\u0b9f\u0bc6\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b85\u0b95\u0bcd\u0b9f\u0bc7\u0bbe\u0baa\u0bb0\u0bcd_\u0ba8\u0bb5\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b9f\u0bbf\u0b9a\u0bae\u0bcd\u0baa\u0bb0\u0bcd".split("_"),weekdays:"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bcd\u0bb1\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0b9f\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0baa\u0bc1\u0ba4\u0ba9\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0b9a\u0ba9\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8".split("_"),weekdaysShort:"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1_\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0bb3\u0bcd_\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd_\u0baa\u0bc1\u0ba4\u0ba9\u0bcd_\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0ba9\u0bcd_\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf_\u0b9a\u0ba9\u0bbf".split("_"),weekdaysMin:"\u0b9e\u0bbe_\u0ba4\u0bbf_\u0b9a\u0bc6_\u0baa\u0bc1_\u0bb5\u0bbf_\u0bb5\u0bc6_\u0b9a".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[\u0b87\u0ba9\u0bcd\u0bb1\u0bc1] LT",nextDay:"[\u0ba8\u0bbe\u0bb3\u0bc8] LT",nextWeek:"dddd, LT",lastDay:"[\u0ba8\u0bc7\u0bb1\u0bcd\u0bb1\u0bc1] LT",lastWeek:"[\u0b95\u0b9f\u0ba8\u0bcd\u0ba4 \u0bb5\u0bbe\u0bb0\u0bae\u0bcd] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0b87\u0bb2\u0bcd",past:"%s \u0bae\u0bc1\u0ba9\u0bcd",s:"\u0b92\u0bb0\u0bc1 \u0b9a\u0bbf\u0bb2 \u0bb5\u0bbf\u0ba8\u0bbe\u0b9f\u0bbf\u0b95\u0bb3\u0bcd",m:"\u0b92\u0bb0\u0bc1 \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0bae\u0bcd",mm:"%d \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd",h:"\u0b92\u0bb0\u0bc1 \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd",hh:"%d \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd",d:"\u0b92\u0bb0\u0bc1 \u0ba8\u0bbe\u0bb3\u0bcd",dd:"%d \u0ba8\u0bbe\u0b9f\u0bcd\u0b95\u0bb3\u0bcd",M:"\u0b92\u0bb0\u0bc1 \u0bae\u0bbe\u0ba4\u0bae\u0bcd",MM:"%d \u0bae\u0bbe\u0ba4\u0b99\u0bcd\u0b95\u0bb3\u0bcd",y:"\u0b92\u0bb0\u0bc1 \u0bb5\u0bb0\u0bc1\u0b9f\u0bae\u0bcd",yy:"%d \u0b86\u0ba3\u0bcd\u0b9f\u0bc1\u0b95\u0bb3\u0bcd"},dayOfMonthOrdinalParse:/\d{1,2}\u0bb5\u0ba4\u0bc1/,ordinal:function(e){return e+"\u0bb5\u0ba4\u0bc1"},preparse:function(e){return e.replace(/[\u0be7\u0be8\u0be9\u0bea\u0beb\u0bec\u0bed\u0bee\u0bef\u0be6]/g,function(e){return qn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Bn[e]})},meridiemParse:/\u0baf\u0bbe\u0bae\u0bae\u0bcd|\u0bb5\u0bc8\u0b95\u0bb1\u0bc8|\u0b95\u0bbe\u0bb2\u0bc8|\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd|\u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1|\u0bae\u0bbe\u0bb2\u0bc8/,meridiem:function(e,a,t){return e<2?" \u0baf\u0bbe\u0bae\u0bae\u0bcd":e<6?" \u0bb5\u0bc8\u0b95\u0bb1\u0bc8":e<10?" \u0b95\u0bbe\u0bb2\u0bc8":e<14?" \u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd":e<18?" \u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1":e<22?" \u0bae\u0bbe\u0bb2\u0bc8":" \u0baf\u0bbe\u0bae\u0bae\u0bcd"},meridiemHour:function(e,a){return 12===e&&(e=0),"\u0baf\u0bbe\u0bae\u0bae\u0bcd"===a?e<2?e:e+12:"\u0bb5\u0bc8\u0b95\u0bb1\u0bc8"===a||"\u0b95\u0bbe\u0bb2\u0bc8"===a?e:"\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd"===a&&e>=10?e:e+12},week:{dow:0,doy:6}}),e.defineLocale("te",{months:"\u0c1c\u0c28\u0c35\u0c30\u0c3f_\u0c2b\u0c3f\u0c2c\u0c4d\u0c30\u0c35\u0c30\u0c3f_\u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c3f_\u0c0f\u0c2a\u0c4d\u0c30\u0c3f\u0c32\u0c4d_\u0c2e\u0c47_\u0c1c\u0c42\u0c28\u0c4d_\u0c1c\u0c42\u0c32\u0c46\u0c56_\u0c06\u0c17\u0c38\u0c4d\u0c1f\u0c41_\u0c38\u0c46\u0c2a\u0c4d\u0c1f\u0c46\u0c02\u0c2c\u0c30\u0c4d_\u0c05\u0c15\u0c4d\u0c1f\u0c4b\u0c2c\u0c30\u0c4d_\u0c28\u0c35\u0c02\u0c2c\u0c30\u0c4d_\u0c21\u0c3f\u0c38\u0c46\u0c02\u0c2c\u0c30\u0c4d".split("_"),monthsShort:"\u0c1c\u0c28._\u0c2b\u0c3f\u0c2c\u0c4d\u0c30._\u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c3f_\u0c0f\u0c2a\u0c4d\u0c30\u0c3f._\u0c2e\u0c47_\u0c1c\u0c42\u0c28\u0c4d_\u0c1c\u0c42\u0c32\u0c46\u0c56_\u0c06\u0c17._\u0c38\u0c46\u0c2a\u0c4d._\u0c05\u0c15\u0c4d\u0c1f\u0c4b._\u0c28\u0c35._\u0c21\u0c3f\u0c38\u0c46.".split("_"),monthsParseExact:!0,weekdays:"\u0c06\u0c26\u0c3f\u0c35\u0c3e\u0c30\u0c02_\u0c38\u0c4b\u0c2e\u0c35\u0c3e\u0c30\u0c02_\u0c2e\u0c02\u0c17\u0c33\u0c35\u0c3e\u0c30\u0c02_\u0c2c\u0c41\u0c27\u0c35\u0c3e\u0c30\u0c02_\u0c17\u0c41\u0c30\u0c41\u0c35\u0c3e\u0c30\u0c02_\u0c36\u0c41\u0c15\u0c4d\u0c30\u0c35\u0c3e\u0c30\u0c02_\u0c36\u0c28\u0c3f\u0c35\u0c3e\u0c30\u0c02".split("_"),weekdaysShort:"\u0c06\u0c26\u0c3f_\u0c38\u0c4b\u0c2e_\u0c2e\u0c02\u0c17\u0c33_\u0c2c\u0c41\u0c27_\u0c17\u0c41\u0c30\u0c41_\u0c36\u0c41\u0c15\u0c4d\u0c30_\u0c36\u0c28\u0c3f".split("_"),weekdaysMin:"\u0c06_\u0c38\u0c4b_\u0c2e\u0c02_\u0c2c\u0c41_\u0c17\u0c41_\u0c36\u0c41_\u0c36".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0c28\u0c47\u0c21\u0c41] LT",nextDay:"[\u0c30\u0c47\u0c2a\u0c41] LT",nextWeek:"dddd, LT",lastDay:"[\u0c28\u0c3f\u0c28\u0c4d\u0c28] LT",lastWeek:"[\u0c17\u0c24] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0c32\u0c4b",past:"%s \u0c15\u0c4d\u0c30\u0c3f\u0c24\u0c02",s:"\u0c15\u0c4a\u0c28\u0c4d\u0c28\u0c3f \u0c15\u0c4d\u0c37\u0c23\u0c3e\u0c32\u0c41",m:"\u0c12\u0c15 \u0c28\u0c3f\u0c2e\u0c3f\u0c37\u0c02",mm:"%d \u0c28\u0c3f\u0c2e\u0c3f\u0c37\u0c3e\u0c32\u0c41",h:"\u0c12\u0c15 \u0c17\u0c02\u0c1f",hh:"%d \u0c17\u0c02\u0c1f\u0c32\u0c41",d:"\u0c12\u0c15 \u0c30\u0c4b\u0c1c\u0c41",dd:"%d \u0c30\u0c4b\u0c1c\u0c41\u0c32\u0c41",M:"\u0c12\u0c15 \u0c28\u0c46\u0c32",MM:"%d \u0c28\u0c46\u0c32\u0c32\u0c41",y:"\u0c12\u0c15 \u0c38\u0c02\u0c35\u0c24\u0c4d\u0c38\u0c30\u0c02",yy:"%d \u0c38\u0c02\u0c35\u0c24\u0c4d\u0c38\u0c30\u0c3e\u0c32\u0c41"},dayOfMonthOrdinalParse:/\d{1,2}\u0c35/,ordinal:"%d\u0c35",meridiemParse:/\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f|\u0c09\u0c26\u0c2f\u0c02|\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02|\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f"===a?e<4?e:e+12:"\u0c09\u0c26\u0c2f\u0c02"===a?e:"\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02"===a?e>=10?e:e+12:"\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f":e<10?"\u0c09\u0c26\u0c2f\u0c02":e<17?"\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02":e<20?"\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02":"\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f"},week:{dow:0,doy:6}}),e.defineLocale("tet",{months:"Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez".split("_"),weekdays:"Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu".split("_"),weekdaysShort:"Dom_Seg_Ters_Kua_Kint_Sext_Sab".split("_"),weekdaysMin:"Do_Seg_Te_Ku_Ki_Sex_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Ohin iha] LT",nextDay:"[Aban iha] LT",nextWeek:"dddd [iha] LT",lastDay:"[Horiseik iha] LT",lastWeek:"dddd [semana kotuk] [iha] LT",sameElse:"L"},relativeTime:{future:"iha %s",past:"%s liuba",s:"minutu balun",m:"minutu ida",mm:"minutus %d",h:"horas ida",hh:"horas %d",d:"loron ida",dd:"loron %d",M:"fulan ida",MM:"fulan %d",y:"tinan ida",yy:"tinan %d"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),e.defineLocale("th",{months:"\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21_\u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c_\u0e21\u0e35\u0e19\u0e32\u0e04\u0e21_\u0e40\u0e21\u0e29\u0e32\u0e22\u0e19_\u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21_\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19_\u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21_\u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21_\u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19_\u0e15\u0e38\u0e25\u0e32\u0e04\u0e21_\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19_\u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21".split("_"),monthsShort:"\u0e21.\u0e04._\u0e01.\u0e1e._\u0e21\u0e35.\u0e04._\u0e40\u0e21.\u0e22._\u0e1e.\u0e04._\u0e21\u0e34.\u0e22._\u0e01.\u0e04._\u0e2a.\u0e04._\u0e01.\u0e22._\u0e15.\u0e04._\u0e1e.\u0e22._\u0e18.\u0e04.".split("_"),monthsParseExact:!0,weekdays:"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a\u0e1a\u0e14\u0e35_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"),weekdaysShort:"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"),weekdaysMin:"\u0e2d\u0e32._\u0e08._\u0e2d._\u0e1e._\u0e1e\u0e24._\u0e28._\u0e2a.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 H:mm",LLLL:"\u0e27\u0e31\u0e19dddd\u0e17\u0e35\u0e48 D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 H:mm"},meridiemParse:/\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07|\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07/,isPM:function(e){return"\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07"===e},meridiem:function(e,a,t){return e<12?"\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07":"\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07"},calendar:{sameDay:"[\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",nextDay:"[\u0e1e\u0e23\u0e38\u0e48\u0e07\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",nextWeek:"dddd[\u0e2b\u0e19\u0e49\u0e32 \u0e40\u0e27\u0e25\u0e32] LT",lastDay:"[\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e27\u0e32\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",lastWeek:"[\u0e27\u0e31\u0e19]dddd[\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27 \u0e40\u0e27\u0e25\u0e32] LT",sameElse:"L"},relativeTime:{future:"\u0e2d\u0e35\u0e01 %s",past:"%s\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27",s:"\u0e44\u0e21\u0e48\u0e01\u0e35\u0e48\u0e27\u0e34\u0e19\u0e32\u0e17\u0e35",m:"1 \u0e19\u0e32\u0e17\u0e35",mm:"%d \u0e19\u0e32\u0e17\u0e35",h:"1 \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",hh:"%d \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",d:"1 \u0e27\u0e31\u0e19",dd:"%d \u0e27\u0e31\u0e19",M:"1 \u0e40\u0e14\u0e37\u0e2d\u0e19",MM:"%d \u0e40\u0e14\u0e37\u0e2d\u0e19",y:"1 \u0e1b\u0e35",yy:"%d \u0e1b\u0e35"}}),e.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"LT [ngayong araw]",nextDay:"[Bukas ng] LT",nextWeek:"LT [sa susunod na] dddd",lastDay:"LT [kahapon]",lastWeek:"LT [noong nakaraang] dddd",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}});var Qn="pagh_wa\u2019_cha\u2019_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");e.defineLocale("tlh",{months:"tera\u2019 jar wa\u2019_tera\u2019 jar cha\u2019_tera\u2019 jar wej_tera\u2019 jar loS_tera\u2019 jar vagh_tera\u2019 jar jav_tera\u2019 jar Soch_tera\u2019 jar chorgh_tera\u2019 jar Hut_tera\u2019 jar wa\u2019maH_tera\u2019 jar wa\u2019maH wa\u2019_tera\u2019 jar wa\u2019maH cha\u2019".split("_"),monthsShort:"jar wa\u2019_jar cha\u2019_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa\u2019maH_jar wa\u2019maH wa\u2019_jar wa\u2019maH cha\u2019".split("_"),monthsParseExact:!0,weekdays:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysShort:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysMin:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[DaHjaj] LT",nextDay:"[wa\u2019leS] LT",nextWeek:"LLL",lastDay:"[wa\u2019Hu\u2019] LT",lastWeek:"LLL",sameElse:"L"},relativeTime:{future:function(e){var a=e;return a=-1!==e.indexOf("jaj")?a.slice(0,-3)+"leS":-1!==e.indexOf("jar")?a.slice(0,-3)+"waQ":-1!==e.indexOf("DIS")?a.slice(0,-3)+"nem":a+" pIq"},past:function(e){var a=e;return a=-1!==e.indexOf("jaj")?a.slice(0,-3)+"Hu\u2019":-1!==e.indexOf("jar")?a.slice(0,-3)+"wen":-1!==e.indexOf("DIS")?a.slice(0,-3)+"ben":a+" ret"},s:"puS lup",m:"wa\u2019 tup",mm:xa,h:"wa\u2019 rep",hh:xa,d:"wa\u2019 jaj",dd:xa,M:"wa\u2019 jar",MM:xa,y:"wa\u2019 DIS",yy:xa},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var Xn={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'\xfcnc\xfc",4:"'\xfcnc\xfc",100:"'\xfcnc\xfc",6:"'nc\u0131",9:"'uncu",10:"'uncu",30:"'uncu",60:"'\u0131nc\u0131",90:"'\u0131nc\u0131"};e.defineLocale("tr",{months:"Ocak_\u015eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011fustos_Eyl\xfcl_Ekim_Kas\u0131m_Aral\u0131k".split("_"),monthsShort:"Oca_\u015eub_Mar_Nis_May_Haz_Tem_A\u011fu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Sal\u0131_\xc7ar\u015famba_Per\u015fembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_\xc7ar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_\xc7a_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\xfcn saat] LT",nextDay:"[yar\u0131n saat] LT",nextWeek:"[gelecek] dddd [saat] LT",lastDay:"[d\xfcn] LT",lastWeek:"[ge\xe7en] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \xf6nce",s:"birka\xe7 saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir g\xfcn",dd:"%d g\xfcn",M:"bir ay",MM:"%d ay",y:"bir y\u0131l",yy:"%d y\u0131l"},dayOfMonthOrdinalParse:/\d{1,2}'(inci|nci|\xfcnc\xfc|nc\u0131|uncu|\u0131nc\u0131)/,ordinal:function(e){if(0===e)return e+"'\u0131nc\u0131";var a=e%10;return e+(Xn[a]||Xn[e%100-a]||Xn[e>=100?100:null])},week:{dow:1,doy:7}}),e.defineLocale("tzl",{months:"Januar_Fevraglh_Mar\xe7_Avr\xefu_Mai_G\xfcn_Julia_Guscht_Setemvar_Listop\xe4ts_Noemvar_Zecemvar".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_G\xfcn_Jul_Gus_Set_Lis_Noe_Zec".split("_"),weekdays:"S\xfaladi_L\xfane\xe7i_Maitzi_M\xe1rcuri_Xh\xfaadi_Vi\xe9ner\xe7i_S\xe1turi".split("_"),weekdaysShort:"S\xfal_L\xfan_Mai_M\xe1r_Xh\xfa_Vi\xe9_S\xe1t".split("_"),weekdaysMin:"S\xfa_L\xfa_Ma_M\xe1_Xh_Vi_S\xe1".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiemParse:/d\'o|d\'a/i,isPM:function(e){return"d'o"===e.toLowerCase()},meridiem:function(e,a,t){return e>11?t?"d'o":"D'O":t?"d'a":"D'A"},calendar:{sameDay:"[oxhi \xe0] LT",nextDay:"[dem\xe0 \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[ieiri \xe0] LT",lastWeek:"[s\xfcr el] dddd [lasteu \xe0] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:Pa,m:Pa,mm:Pa,h:Pa,hh:Pa,d:Pa,dd:Pa,M:Pa,MM:Pa,y:Pa,yy:Pa},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),e.defineLocale("tzm-latn",{months:"innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minu\u1e0d",mm:"%d minu\u1e0d",h:"sa\u025ba",hh:"%d tassa\u025bin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}}),e.defineLocale("tzm",{months:"\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"),monthsShort:"\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"),weekdays:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),weekdaysShort:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),weekdaysMin:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u2d30\u2d59\u2d37\u2d45 \u2d34] LT",nextDay:"[\u2d30\u2d59\u2d3d\u2d30 \u2d34] LT",nextWeek:"dddd [\u2d34] LT",lastDay:"[\u2d30\u2d5a\u2d30\u2d4f\u2d5c \u2d34] LT",lastWeek:"dddd [\u2d34] LT",sameElse:"L"},relativeTime:{future:"\u2d37\u2d30\u2d37\u2d45 \u2d59 \u2d62\u2d30\u2d4f %s",past:"\u2d62\u2d30\u2d4f %s",s:"\u2d49\u2d4e\u2d49\u2d3d",m:"\u2d4e\u2d49\u2d4f\u2d53\u2d3a",mm:"%d \u2d4e\u2d49\u2d4f\u2d53\u2d3a",h:"\u2d59\u2d30\u2d44\u2d30",hh:"%d \u2d5c\u2d30\u2d59\u2d59\u2d30\u2d44\u2d49\u2d4f",d:"\u2d30\u2d59\u2d59",dd:"%d o\u2d59\u2d59\u2d30\u2d4f",M:"\u2d30\u2d62o\u2d53\u2d54",MM:"%d \u2d49\u2d62\u2d62\u2d49\u2d54\u2d4f",y:"\u2d30\u2d59\u2d33\u2d30\u2d59",yy:"%d \u2d49\u2d59\u2d33\u2d30\u2d59\u2d4f"},week:{dow:6,doy:12}}),e.defineLocale("uk",{months:{format:"\u0441\u0456\u0447\u043d\u044f_\u043b\u044e\u0442\u043e\u0433\u043e_\u0431\u0435\u0440\u0435\u0437\u043d\u044f_\u043a\u0432\u0456\u0442\u043d\u044f_\u0442\u0440\u0430\u0432\u043d\u044f_\u0447\u0435\u0440\u0432\u043d\u044f_\u043b\u0438\u043f\u043d\u044f_\u0441\u0435\u0440\u043f\u043d\u044f_\u0432\u0435\u0440\u0435\u0441\u043d\u044f_\u0436\u043e\u0432\u0442\u043d\u044f_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043d\u044f".split("_"),standalone:"\u0441\u0456\u0447\u0435\u043d\u044c_\u043b\u044e\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043d\u044c_\u043a\u0432\u0456\u0442\u0435\u043d\u044c_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u0435\u0440\u0432\u0435\u043d\u044c_\u043b\u0438\u043f\u0435\u043d\u044c_\u0441\u0435\u0440\u043f\u0435\u043d\u044c_\u0432\u0435\u0440\u0435\u0441\u0435\u043d\u044c_\u0436\u043e\u0432\u0442\u0435\u043d\u044c_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043d\u044c".split("_")},monthsShort:"\u0441\u0456\u0447_\u043b\u044e\u0442_\u0431\u0435\u0440_\u043a\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043b\u0438\u043f_\u0441\u0435\u0440\u043f_\u0432\u0435\u0440_\u0436\u043e\u0432\u0442_\u043b\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split("_"),weekdays:function(e,a){var t={nominative:"\u043d\u0435\u0434\u0456\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044f_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),accusative:"\u043d\u0435\u0434\u0456\u043b\u044e_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044e_\u0441\u0443\u0431\u043e\u0442\u0443".split("_"),genitive:"\u043d\u0435\u0434\u0456\u043b\u0456_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043a\u0430_\u0432\u0456\u0432\u0442\u043e\u0440\u043a\u0430_\u0441\u0435\u0440\u0435\u0434\u0438_\u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u0456_\u0441\u0443\u0431\u043e\u0442\u0438".split("_")};return e?t[/(\[[\u0412\u0432\u0423\u0443]\]) ?dddd/.test(a)?"accusative":/\[?(?:\u043c\u0438\u043d\u0443\u043b\u043e\u0457|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u043e\u0457)? ?\] ?dddd/.test(a)?"genitive":"nominative"][e.day()]:t.nominative},weekdaysShort:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0440.",LLL:"D MMMM YYYY \u0440., HH:mm",LLLL:"dddd, D MMMM YYYY \u0440., HH:mm"},calendar:{sameDay:Wa("[\u0421\u044c\u043e\u0433\u043e\u0434\u043d\u0456 "),nextDay:Wa("[\u0417\u0430\u0432\u0442\u0440\u0430 "),lastDay:Wa("[\u0412\u0447\u043e\u0440\u0430 "),nextWeek:Wa("[\u0423] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return Wa("[\u041c\u0438\u043d\u0443\u043b\u043e\u0457] dddd [").call(this);case 1:case 2:case 4:return Wa("[\u041c\u0438\u043d\u0443\u043b\u043e\u0433\u043e] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"\u0437\u0430 %s",past:"%s \u0442\u043e\u043c\u0443",s:"\u0434\u0435\u043a\u0456\u043b\u044c\u043a\u0430 \u0441\u0435\u043a\u0443\u043d\u0434",m:Oa,mm:Oa,h:"\u0433\u043e\u0434\u0438\u043d\u0443",hh:Oa,d:"\u0434\u0435\u043d\u044c",dd:Oa,M:"\u043c\u0456\u0441\u044f\u0446\u044c",MM:Oa,y:"\u0440\u0456\u043a",yy:Oa},meridiemParse:/\u043d\u043e\u0447\u0456|\u0440\u0430\u043d\u043a\u0443|\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430/,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430)$/.test(e)},meridiem:function(e,a,t){return e<4?"\u043d\u043e\u0447\u0456":e<12?"\u0440\u0430\u043d\u043a\u0443":e<17?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u043e\u0440\u0430"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0439|\u0433\u043e)/,ordinal:function(e,a){switch(a){case"M":case"d":case"DDD":case"w":case"W":return e+"-\u0439";case"D":return e+"-\u0433\u043e";default:return e}},week:{dow:1,doy:7}});var er=["\u062c\u0646\u0648\u0631\u06cc","\u0641\u0631\u0648\u0631\u06cc","\u0645\u0627\u0631\u0686","\u0627\u067e\u0631\u06cc\u0644","\u0645\u0626\u06cc","\u062c\u0648\u0646","\u062c\u0648\u0644\u0627\u0626\u06cc","\u0627\u06af\u0633\u062a","\u0633\u062a\u0645\u0628\u0631","\u0627\u06a9\u062a\u0648\u0628\u0631","\u0646\u0648\u0645\u0628\u0631","\u062f\u0633\u0645\u0628\u0631"],ar=["\u0627\u062a\u0648\u0627\u0631","\u067e\u06cc\u0631","\u0645\u0646\u06af\u0644","\u0628\u062f\u06be","\u062c\u0645\u0639\u0631\u0627\u062a","\u062c\u0645\u0639\u06c1","\u06c1\u0641\u062a\u06c1"];return e.defineLocale("ur",{months:er,monthsShort:er,weekdays:ar,weekdaysShort:ar,weekdaysMin:ar,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd\u060c D MMMM YYYY HH:mm"},meridiemParse:/\u0635\u0628\u062d|\u0634\u0627\u0645/,isPM:function(e){return"\u0634\u0627\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635\u0628\u062d":"\u0634\u0627\u0645"},calendar:{sameDay:"[\u0622\u062c \u0628\u0648\u0642\u062a] LT",nextDay:"[\u06a9\u0644 \u0628\u0648\u0642\u062a] LT",nextWeek:"dddd [\u0628\u0648\u0642\u062a] LT",lastDay:"[\u06af\u0630\u0634\u062a\u06c1 \u0631\u0648\u0632 \u0628\u0648\u0642\u062a] LT",lastWeek:"[\u06af\u0630\u0634\u062a\u06c1] dddd [\u0628\u0648\u0642\u062a] LT",sameElse:"L"},relativeTime:{future:"%s \u0628\u0639\u062f",past:"%s \u0642\u0628\u0644",s:"\u0686\u0646\u062f \u0633\u06cc\u06a9\u0646\u0688",m:"\u0627\u06cc\u06a9 \u0645\u0646\u0679",mm:"%d \u0645\u0646\u0679",h:"\u0627\u06cc\u06a9 \u06af\u06be\u0646\u0679\u06c1",hh:"%d \u06af\u06be\u0646\u0679\u06d2",d:"\u0627\u06cc\u06a9 \u062f\u0646",dd:"%d \u062f\u0646",M:"\u0627\u06cc\u06a9 \u0645\u0627\u06c1",MM:"%d \u0645\u0627\u06c1",y:"\u0627\u06cc\u06a9 \u0633\u0627\u0644",yy:"%d \u0633\u0627\u0644"},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/,/g,"\u060c")},week:{dow:1,doy:4}}),e.defineLocale("uz-latn",{months:"Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),monthsShort:"Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),weekdays:"Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),weekdaysShort:"Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),weekdaysMin:"Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[Bugun soat] LT [da]",nextDay:"[Ertaga] LT [da]",nextWeek:"dddd [kuni soat] LT [da]",lastDay:"[Kecha soat] LT [da]",lastWeek:"[O'tgan] dddd [kuni soat] LT [da]",sameElse:"L"},relativeTime:{future:"Yaqin %s ichida",past:"Bir necha %s oldin",s:"soniya",m:"bir daqiqa",mm:"%d daqiqa",h:"bir soat",hh:"%d soat",d:"bir kun",dd:"%d kun",M:"bir oy",MM:"%d oy",y:"bir yil",yy:"%d yil"},week:{dow:1,doy:7}}),e.defineLocale("uz",{months:"\u044f\u043d\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043b_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440_\u043e\u043a\u0442\u044f\u0431\u0440_\u043d\u043e\u044f\u0431\u0440_\u0434\u0435\u043a\u0430\u0431\u0440".split("_"),monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"),weekdays:"\u042f\u043a\u0448\u0430\u043d\u0431\u0430_\u0414\u0443\u0448\u0430\u043d\u0431\u0430_\u0421\u0435\u0448\u0430\u043d\u0431\u0430_\u0427\u043e\u0440\u0448\u0430\u043d\u0431\u0430_\u041f\u0430\u0439\u0448\u0430\u043d\u0431\u0430_\u0416\u0443\u043c\u0430_\u0428\u0430\u043d\u0431\u0430".split("_"),weekdaysShort:"\u042f\u043a\u0448_\u0414\u0443\u0448_\u0421\u0435\u0448_\u0427\u043e\u0440_\u041f\u0430\u0439_\u0416\u0443\u043c_\u0428\u0430\u043d".split("_"),weekdaysMin:"\u042f\u043a_\u0414\u0443_\u0421\u0435_\u0427\u043e_\u041f\u0430_\u0416\u0443_\u0428\u0430".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[\u0411\u0443\u0433\u0443\u043d \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",nextDay:"[\u042d\u0440\u0442\u0430\u0433\u0430] LT [\u0434\u0430]",nextWeek:"dddd [\u043a\u0443\u043d\u0438 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",lastDay:"[\u041a\u0435\u0447\u0430 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",lastWeek:"[\u0423\u0442\u0433\u0430\u043d] dddd [\u043a\u0443\u043d\u0438 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",sameElse:"L"},relativeTime:{future:"\u042f\u043a\u0438\u043d %s \u0438\u0447\u0438\u0434\u0430",past:"\u0411\u0438\u0440 \u043d\u0435\u0447\u0430 %s \u043e\u043b\u0434\u0438\u043d",s:"\u0444\u0443\u0440\u0441\u0430\u0442",m:"\u0431\u0438\u0440 \u0434\u0430\u043a\u0438\u043a\u0430",mm:"%d \u0434\u0430\u043a\u0438\u043a\u0430",h:"\u0431\u0438\u0440 \u0441\u043e\u0430\u0442",hh:"%d \u0441\u043e\u0430\u0442",d:"\u0431\u0438\u0440 \u043a\u0443\u043d",dd:"%d \u043a\u0443\u043d",M:"\u0431\u0438\u0440 \u043e\u0439",MM:"%d \u043e\u0439",y:"\u0431\u0438\u0440 \u0439\u0438\u043b",yy:"%d \u0439\u0438\u043b"},week:{dow:1,doy:7}}),e.defineLocale("vi",{months:"th\xe1ng 1_th\xe1ng 2_th\xe1ng 3_th\xe1ng 4_th\xe1ng 5_th\xe1ng 6_th\xe1ng 7_th\xe1ng 8_th\xe1ng 9_th\xe1ng 10_th\xe1ng 11_th\xe1ng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),monthsParseExact:!0,weekdays:"ch\u1ee7 nh\u1eadt_th\u1ee9 hai_th\u1ee9 ba_th\u1ee9 t\u01b0_th\u1ee9 n\u0103m_th\u1ee9 s\xe1u_th\u1ee9 b\u1ea3y".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysParseExact:!0,meridiemParse:/sa|ch/i,isPM:function(e){return/^ch$/i.test(e)},meridiem:function(e,a,t){return e<12?t?"sa":"SA":t?"ch":"CH"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [n\u0103m] YYYY",LLL:"D MMMM [n\u0103m] YYYY HH:mm",LLLL:"dddd, D MMMM [n\u0103m] YYYY HH:mm",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[H\xf4m nay l\xfac] LT",nextDay:"[Ng\xe0y mai l\xfac] LT",nextWeek:"dddd [tu\u1ea7n t\u1edbi l\xfac] LT",lastDay:"[H\xf4m qua l\xfac] LT",lastWeek:"dddd [tu\u1ea7n r\u1ed3i l\xfac] LT",sameElse:"L"},relativeTime:{future:"%s t\u1edbi",past:"%s tr\u01b0\u1edbc",s:"v\xe0i gi\xe2y",m:"m\u1ed9t ph\xfat",mm:"%d ph\xfat",h:"m\u1ed9t gi\u1edd",hh:"%d gi\u1edd",d:"m\u1ed9t ng\xe0y",dd:"%d ng\xe0y",M:"m\u1ed9t th\xe1ng",MM:"%d th\xe1ng",y:"m\u1ed9t n\u0103m",yy:"%d n\u0103m"},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}}),e.defineLocale("x-pseudo",{months:"J~\xe1\xf1\xfa\xe1~r\xfd_F~\xe9br\xfa~\xe1r\xfd_~M\xe1rc~h_\xc1p~r\xedl_~M\xe1\xfd_~J\xfa\xf1\xe9~_J\xfal~\xfd_\xc1\xfa~g\xfast~_S\xe9p~t\xe9mb~\xe9r_\xd3~ct\xf3b~\xe9r_\xd1~\xf3v\xe9m~b\xe9r_~D\xe9c\xe9~mb\xe9r".split("_"),monthsShort:"J~\xe1\xf1_~F\xe9b_~M\xe1r_~\xc1pr_~M\xe1\xfd_~J\xfa\xf1_~J\xfal_~\xc1\xfag_~S\xe9p_~\xd3ct_~\xd1\xf3v_~D\xe9c".split("_"),monthsParseExact:!0,weekdays:"S~\xfa\xf1d\xe1~\xfd_M\xf3~\xf1d\xe1\xfd~_T\xfa\xe9~sd\xe1\xfd~_W\xe9d~\xf1\xe9sd~\xe1\xfd_T~h\xfars~d\xe1\xfd_~Fr\xedd~\xe1\xfd_S~\xe1t\xfar~d\xe1\xfd".split("_"),weekdaysShort:"S~\xfa\xf1_~M\xf3\xf1_~T\xfa\xe9_~W\xe9d_~Th\xfa_~Fr\xed_~S\xe1t".split("_"),weekdaysMin:"S~\xfa_M\xf3~_T\xfa_~W\xe9_T~h_Fr~_S\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[T~\xf3d\xe1~\xfd \xe1t] LT",nextDay:"[T~\xf3m\xf3~rr\xf3~w \xe1t] LT",nextWeek:"dddd [\xe1t] LT",lastDay:"[\xdd~\xe9st~\xe9rd\xe1~\xfd \xe1t] LT",lastWeek:"[L~\xe1st] dddd [\xe1t] LT",sameElse:"L"},relativeTime:{future:"\xed~\xf1 %s",past:"%s \xe1~g\xf3",s:"\xe1 ~f\xe9w ~s\xe9c\xf3~\xf1ds",m:"\xe1 ~m\xed\xf1~\xfat\xe9",mm:"%d m~\xed\xf1\xfa~t\xe9s",h:"\xe1~\xf1 h\xf3~\xfar",hh:"%d h~\xf3\xfars",d:"\xe1 ~d\xe1\xfd",dd:"%d d~\xe1\xfds",M:"\xe1 ~m\xf3\xf1~th",MM:"%d m~\xf3\xf1t~hs",y:"\xe1 ~\xfd\xe9\xe1r",yy:"%d \xfd~\xe9\xe1rs"},dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),e.defineLocale("yo",{months:"S\u1eb9\u0301r\u1eb9\u0301_E\u0300re\u0300le\u0300_\u1eb8r\u1eb9\u0300na\u0300_I\u0300gbe\u0301_E\u0300bibi_O\u0300ku\u0300du_Ag\u1eb9mo_O\u0300gu\u0301n_Owewe_\u1ecc\u0300wa\u0300ra\u0300_Be\u0301lu\u0301_\u1ecc\u0300p\u1eb9\u0300\u0300".split("_"),monthsShort:"S\u1eb9\u0301r_E\u0300rl_\u1eb8rn_I\u0300gb_E\u0300bi_O\u0300ku\u0300_Ag\u1eb9_O\u0300gu\u0301_Owe_\u1ecc\u0300wa\u0300_Be\u0301l_\u1ecc\u0300p\u1eb9\u0300\u0300".split("_"),weekdays:"A\u0300i\u0300ku\u0301_Aje\u0301_I\u0300s\u1eb9\u0301gun_\u1eccj\u1ecd\u0301ru\u0301_\u1eccj\u1ecd\u0301b\u1ecd_\u1eb8ti\u0300_A\u0300ba\u0301m\u1eb9\u0301ta".split("_"),weekdaysShort:"A\u0300i\u0300k_Aje\u0301_I\u0300s\u1eb9\u0301_\u1eccjr_\u1eccjb_\u1eb8ti\u0300_A\u0300ba\u0301".split("_"),weekdaysMin:"A\u0300i\u0300_Aj_I\u0300s_\u1eccr_\u1eccb_\u1eb8t_A\u0300b".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[O\u0300ni\u0300 ni] LT",nextDay:"[\u1ecc\u0300la ni] LT",nextWeek:"dddd [\u1eccs\u1eb9\u0300 to\u0301n'b\u1ecd] [ni] LT",lastDay:"[A\u0300na ni] LT",lastWeek:"dddd [\u1eccs\u1eb9\u0300 to\u0301l\u1ecd\u0301] [ni] LT",sameElse:"L"},relativeTime:{future:"ni\u0301 %s",past:"%s k\u1ecdja\u0301",s:"i\u0300s\u1eb9ju\u0301 aaya\u0301 die",m:"i\u0300s\u1eb9ju\u0301 kan",mm:"i\u0300s\u1eb9ju\u0301 %d",h:"wa\u0301kati kan",hh:"wa\u0301kati %d",d:"\u1ecdj\u1ecd\u0301 kan",dd:"\u1ecdj\u1ecd\u0301 %d",M:"osu\u0300 kan",MM:"osu\u0300 %d",y:"\u1ecddu\u0301n kan",yy:"\u1ecddu\u0301n %d"},dayOfMonthOrdinalParse:/\u1ecdj\u1ecd\u0301\s\d{1,2}/,ordinal:"\u1ecdj\u1ecd\u0301 %d",week:{dow:1,doy:4}}),e.defineLocale("zh-cn",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u5468\u65e5_\u5468\u4e00_\u5468\u4e8c_\u5468\u4e09_\u5468\u56db_\u5468\u4e94_\u5468\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY\u5e74MMMD\u65e5",LL:"YYYY\u5e74MMMD\u65e5",LLL:"YYYY\u5e74MMMD\u65e5Ah\u70b9mm\u5206",LLLL:"YYYY\u5e74MMMD\u65e5ddddAh\u70b9mm\u5206",l:"YYYY\u5e74MMMD\u65e5",ll:"YYYY\u5e74MMMD\u65e5",lll:"YYYY\u5e74MMMD\u65e5 HH:mm",llll:"YYYY\u5e74MMMD\u65e5dddd HH:mm"},meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u51cc\u6668"===a||"\u65e9\u4e0a"===a||"\u4e0a\u5348"===a?e:"\u4e0b\u5348"===a||"\u665a\u4e0a"===a?e+12:e>=11?e:e+12},meridiem:function(e,a,t){var s=100*e+a;return s<600?"\u51cc\u6668":s<900?"\u65e9\u4e0a":s<1130?"\u4e0a\u5348":s<1230?"\u4e2d\u5348":s<1800?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:"[\u4eca\u5929]LT",nextDay:"[\u660e\u5929]LT",nextWeek:"[\u4e0b]ddddLT",lastDay:"[\u6628\u5929]LT",lastWeek:"[\u4e0a]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u5468)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\u65e5";case"M":return e+"\u6708";case"w":case"W":return e+"\u5468";default:return e}},relativeTime:{future:"%s\u5185",past:"%s\u524d",s:"\u51e0\u79d2",m:"1 \u5206\u949f",mm:"%d \u5206\u949f",h:"1 \u5c0f\u65f6",hh:"%d \u5c0f\u65f6",d:"1 \u5929",dd:"%d \u5929",M:"1 \u4e2a\u6708",MM:"%d \u4e2a\u6708",y:"1 \u5e74",yy:"%d \u5e74"},week:{dow:1,doy:4}}),e.defineLocale("zh-hk",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY\u5e74MMMD\u65e5",LL:"YYYY\u5e74MMMD\u65e5",LLL:"YYYY\u5e74MMMD\u65e5 HH:mm",LLLL:"YYYY\u5e74MMMD\u65e5dddd HH:mm",l:"YYYY\u5e74MMMD\u65e5",ll:"YYYY\u5e74MMMD\u65e5",lll:"YYYY\u5e74MMMD\u65e5 HH:mm",llll:"YYYY\u5e74MMMD\u65e5dddd HH:mm"},meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u51cc\u6668"===a||"\u65e9\u4e0a"===a||"\u4e0a\u5348"===a?e:"\u4e2d\u5348"===a?e>=11?e:e+12:"\u4e0b\u5348"===a||"\u665a\u4e0a"===a?e+12:void 0},meridiem:function(e,a,t){var s=100*e+a;return s<600?"\u51cc\u6668":s<900?"\u65e9\u4e0a":s<1130?"\u4e0a\u5348":s<1230?"\u4e2d\u5348":s<1800?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:"[\u4eca\u5929]LT",nextDay:"[\u660e\u5929]LT",nextWeek:"[\u4e0b]ddddLT",lastDay:"[\u6628\u5929]LT",lastWeek:"[\u4e0a]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u9031)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\u65e5";case"M":return e+"\u6708";case"w":case"W":return e+"\u9031";default:return e}},relativeTime:{future:"%s\u5167",past:"%s\u524d",s:"\u5e7e\u79d2",m:"1 \u5206\u9418",mm:"%d \u5206\u9418",h:"1 \u5c0f\u6642",hh:"%d \u5c0f\u6642",d:"1 \u5929",dd:"%d \u5929",M:"1 \u500b\u6708",MM:"%d \u500b\u6708",y:"1 \u5e74",yy:"%d \u5e74"}}),e.defineLocale("zh-tw",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY\u5e74MMMD\u65e5",LL:"YYYY\u5e74MMMD\u65e5",LLL:"YYYY\u5e74MMMD\u65e5 HH:mm",LLLL:"YYYY\u5e74MMMD\u65e5dddd HH:mm",l:"YYYY\u5e74MMMD\u65e5",ll:"YYYY\u5e74MMMD\u65e5",lll:"YYYY\u5e74MMMD\u65e5 HH:mm",llll:"YYYY\u5e74MMMD\u65e5dddd HH:mm"},meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u51cc\u6668"===a||"\u65e9\u4e0a"===a||"\u4e0a\u5348"===a?e:"\u4e2d\u5348"===a?e>=11?e:e+12:"\u4e0b\u5348"===a||"\u665a\u4e0a"===a?e+12:void 0},meridiem:function(e,a,t){var s=100*e+a;return s<600?"\u51cc\u6668":s<900?"\u65e9\u4e0a":s<1130?"\u4e0a\u5348":s<1230?"\u4e2d\u5348":s<1800?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:"[\u4eca\u5929]LT",nextDay:"[\u660e\u5929]LT",nextWeek:"[\u4e0b]ddddLT",lastDay:"[\u6628\u5929]LT",lastWeek:"[\u4e0a]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u9031)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\u65e5";case"M":return e+"\u6708";case"w":case"W":return e+"\u9031";default:return e}},relativeTime:{future:"%s\u5167",past:"%s\u524d",s:"\u5e7e\u79d2",m:"1 \u5206\u9418",mm:"%d \u5206\u9418",h:"1 \u5c0f\u6642",hh:"%d \u5c0f\u6642",d:"1 \u5929",dd:"%d \u5929",M:"1 \u500b\u6708",MM:"%d \u500b\u6708",y:"1 \u5e74",yy:"%d \u5e74"}}),e.locale("en"),e});
!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n){"use strict";!function(){var e=angular.module("angularModalService",[]);e.factory("ModalService",["$animate","$document","$compile","$controller","$http","$rootScope","$q","$templateRequest","$timeout",function(e,n,t,r,o,l,c,u,a){function i(){var o=this,i=function(e,n){var t=c.defer();return e?t.resolve(e):n?u(n,!0).then(function(e){t.resolve(e)},function(e){t.reject(e)}):t.reject("No template or templateUrl has been specified."),t.promise},s=function(n,t){var r=n.children();return r.length>0?e.enter(t,n,r[r.length-1]):e.enter(t,n)};o.showModal=function(o){var u=angular.element(n[0].body),p=c.defer(),d=o.controller;return d?(i(o.template,o.templateUrl).then(function(n){function i(n){m.resolve(n),e.leave(g).then(function(){v.resolve(n),d.$destroy(),$.close=null,p=null,m=null,S=null,$=null,g=null,d=null}),f&&f()}var d=(o.scope||l).$new(),f=l.$on("$locationChangeSuccess",i),m=c.defer(),v=c.defer(),$={$scope:d,close:function(e,n){void 0!==n&&null!==n||(n=0),a(function(){i(e)},n)}};o.inputs&&angular.extend($,o.inputs);var h=t(n),g=h(d);$.$element=g;var x=d[o.controllerAs],j=r(o.controller,$,!1,o.controllerAs);o.controllerAs&&x&&angular.extend(j,x),o.appendElement?s(o.appendElement,g):s(u,g);var S={controller:j,scope:d,element:g,close:m.promise,closed:v.promise};p.resolve(S)}).then(null,function(e){p.reject(e)}),p.promise):(p.reject("No controller has been specified."),p.promise)}}return new i}])}()}]);
//# sourceMappingURL=./dst/angular-modal-service.min.js.map
"format amd";!function(){"use strict";function a(a){return angular.isUndefined(a)||null===a}function b(){try{return require("moment")}catch(a){throw new Error("Please install moment via npm. Please reference to: https://github.com/urish/angular-moment")}}function c(c,d){if("undefined"==typeof d){if("function"!=typeof require)throw new Error("Moment cannot be found by angular-moment! Please reference to: https://github.com/urish/angular-moment");d=b()}return c.module("angularMoment",[]).constant("angularMomentConfig",{preprocess:null,timezone:null,format:null,statefulFilters:!0}).constant("moment",d).constant("amTimeAgoConfig",{withoutSuffix:!1,serverTime:null,titleFormat:null,fullDateThreshold:null,fullDateFormat:null,fullDateThresholdUnit:"day"}).directive("amTimeAgo",["$window","moment","amMoment","amTimeAgoConfig",function(b,d,e,f){return function(g,h,i){function j(){var a;if(p)a=p;else if(f.serverTime){var b=(new Date).getTime(),c=b-w+f.serverTime;a=d(c)}else a=d();return a}function k(){q&&(b.clearTimeout(q),q=null)}function l(a){var c=j().diff(a,v),d=t&&c>=t;if(d?h.text(a.format(u)):h.text(a.from(j(),r)),s&&z&&h.attr("title",a.format(s)),!d){var e=Math.abs(j().diff(a,"minute")),f=3600;e<1?f=1:e<60?f=30:e<180&&(f=300),q=b.setTimeout(function(){l(a)},1e3*f)}}function m(a){y&&h.attr("datetime",a)}function n(){if(k(),o){var a=e.preprocessDate(o);l(a),m(a.toISOString())}}var o,p,q=null,r=f.withoutSuffix,s=f.titleFormat,t=f.fullDateThreshold,u=f.fullDateFormat,v=f.fullDateThresholdUnit,w=(new Date).getTime(),x=i.amTimeAgo,y="TIME"===h[0].nodeName.toUpperCase(),z=!h.attr("title");g.$watch(x,function(b){return a(b)||""===b?(k(),void(o&&(h.text(""),m(""),o=null))):(o=b,void n())}),c.isDefined(i.amFrom)&&g.$watch(i.amFrom,function(b){p=a(b)||""===b?null:d(b),n()}),c.isDefined(i.amWithoutSuffix)&&g.$watch(i.amWithoutSuffix,function(a){"boolean"==typeof a?(r=a,n()):r=f.withoutSuffix}),i.$observe("amFullDateThreshold",function(a){t=a,n()}),i.$observe("amFullDateFormat",function(a){u=a,n()}),i.$observe("amFullDateThresholdUnit",function(a){v=a,n()}),g.$on("$destroy",function(){k()}),g.$on("amMoment:localeChanged",function(){n()})}}]).service("amMoment",["moment","$rootScope","$log","angularMomentConfig",function(a,b,d,e){var f=null;this.changeLocale=function(d,e){var f=a.locale(d,e);return c.isDefined(d)&&b.$broadcast("amMoment:localeChanged"),f},this.changeTimezone=function(c){a.tz&&a.tz.setDefault?(a.tz.setDefault(c),b.$broadcast("amMoment:timezoneChanged")):d.warn("angular-moment: changeTimezone() works only with moment-timezone.js v0.3.0 or greater."),e.timezone=c,f=c},this.preprocessDate=function(b){return f!==e.timezone&&this.changeTimezone(e.timezone),e.preprocess?e.preprocess(b):a(!isNaN(parseFloat(b))&&isFinite(b)?parseInt(b,10):b)}}]).filter("amParse",["moment",function(a){return function(b,c){return a(b,c)}}]).filter("amFromUnix",["moment",function(a){return function(b){return a.unix(b)}}]).filter("amUtc",["moment",function(a){return function(b){return a.utc(b)}}]).filter("amUtcOffset",["amMoment",function(a){function b(b,c){return a.preprocessDate(b).utcOffset(c)}return b}]).filter("amLocal",["moment",function(a){return function(b){return a.isMoment(b)?b.local():null}}]).filter("amTimezone",["amMoment","angularMomentConfig","$log",function(a,b,c){function d(b,d){var e=a.preprocessDate(b);return d?e.tz?e.tz(d):(c.warn("angular-moment: named timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js ?"),e):e}return d}]).filter("amCalendar",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(b,d,e){if(a(b))return"";var f=c.preprocessDate(b);return f.isValid()?f.calendar(d,e):""}return e.$stateful=d.statefulFilters,e}]).filter("amDifference",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(d,e,f,g){if(a(d))return"";var h=c.preprocessDate(d),i=a(e)?b():c.preprocessDate(e);return h.isValid()&&i.isValid()?h.diff(i,f,g):""}return e.$stateful=d.statefulFilters,e}]).filter("amDateFormat",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(b,d){if(a(b))return"";var e=c.preprocessDate(b);return e.isValid()?e.format(d):""}return e.$stateful=d.statefulFilters,e}]).filter("amDurationFormat",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b.duration(c,d).humanize(e)}return d.$stateful=c.statefulFilters,d}]).filter("amTimeAgo",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(d,e,f){var g,h;return a(d)?"":(d=c.preprocessDate(d),g=b(d),g.isValid()?(h=b(f),!a(f)&&h.isValid()?g.from(h,e):g.fromNow(e)):"")}return e.$stateful=d.statefulFilters,e}]).filter("amSubtract",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b(c).subtract(parseInt(d,10),e)}return d.$stateful=c.statefulFilters,d}]).filter("amAdd",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b(c).add(parseInt(d,10),e)}return d.$stateful=c.statefulFilters,d}]).filter("amStartOf",["moment","angularMomentConfig",function(b,c){function d(c,d){return a(c)?"":b(c).startOf(d)}return d.$stateful=c.statefulFilters,d}]).filter("amEndOf",["moment","angularMomentConfig",function(b,c){function d(c,d){return a(c)?"":b(c).endOf(d)}return d.$stateful=c.statefulFilters,d}]),"angularMoment"}var d=window&&window.process&&window.process.type;"function"==typeof define&&define.amd?define(["angular","moment"],c):"undefined"!=typeof module&&module&&module.exports&&"function"==typeof require&&!d?module.exports=c(require("angular"),require("moment")):c(angular,("undefined"!=typeof global?global:window).moment)}();
//# sourceMappingURL=angular-moment.min.js.map
var Dashboard=function(){return{initJQVMAP:function(){if(jQuery().vectorMap){var e=function(e){jQuery(".vmaps").hide(),jQuery("#vmap_"+e).show()},t=function(e){var t=jQuery("#vmap_"+e);if(1===t.size()){var a={map:"world_en",backgroundColor:null,borderColor:"#333333",borderOpacity:.5,borderWidth:1,color:"#c6c6c6",enableZoom:!0,hoverColor:"#c9dfaf",hoverOpacity:null,values:sample_data,normalizeFunction:"linear",scaleColors:["#b6da93","#909cae"],selectedColor:"#c9dfaf",selectedRegion:null,showTooltip:!0,onLabelShow:function(e,t,a){},onRegionOver:function(e,t){"ca"==t&&e.preventDefault()},onRegionClick:function(e,t,a){var i='You clicked "'+a+'" which has the code: '+t.toUpperCase();alert(i)}};a.map=e+"_en",t.width(t.parent().parent().width()),t.show(),t.vectorMap(a),t.hide()}};t("world"),t("usa"),t("europe"),t("russia"),t("germany"),e("world"),jQuery("#regional_stat_world").click(function(){e("world")}),jQuery("#regional_stat_usa").click(function(){e("usa")}),jQuery("#regional_stat_europe").click(function(){e("europe")}),jQuery("#regional_stat_russia").click(function(){e("russia")}),jQuery("#regional_stat_germany").click(function(){e("germany")}),$("#region_statistics_loading").hide(),$("#region_statistics_content").show(),App.addResizeHandler(function(){jQuery(".vmaps").each(function(){var e=jQuery(this);e.width(e.parent().width())})})}},initCalendar:function(){if(jQuery().fullCalendar){var e=new Date,t=e.getDate(),a=e.getMonth(),i=e.getFullYear(),l={};$("#calendar").width()<=400?($("#calendar").addClass("mobile"),l={left:"title, prev, next",center:"",right:"today,month,agendaWeek,agendaDay"}):($("#calendar").removeClass("mobile"),l=App.isRTL()?{right:"title",center:"",left:"prev,next,today,month,agendaWeek,agendaDay"}:{left:"title",center:"",right:"prev,next,today,month,agendaWeek,agendaDay"}),$("#calendar").fullCalendar("destroy"),$("#calendar").fullCalendar({disableDragging:!1,header:l,editable:!0,events:[{title:"All Day",start:new Date(i,a,1),backgroundColor:App.getBrandColor("yellow")},{title:"Long Event",start:new Date(i,a,t-5),end:new Date(i,a,t-2),backgroundColor:App.getBrandColor("blue")},{title:"Repeating Event",start:new Date(i,a,t-3,16,0),allDay:!1,backgroundColor:App.getBrandColor("red")},{title:"Repeating Event",start:new Date(i,a,t+6,16,0),allDay:!1,backgroundColor:App.getBrandColor("green")},{title:"Meeting",start:new Date(i,a,t+9,10,30),allDay:!1},{title:"Lunch",start:new Date(i,a,t,14,0),end:new Date(i,a,t,14,0),backgroundColor:App.getBrandColor("grey"),allDay:!1},{title:"Birthday",start:new Date(i,a,t+1,19,0),end:new Date(i,a,t+1,22,30),backgroundColor:App.getBrandColor("purple"),allDay:!1},{title:"Click for Google",start:new Date(i,a,28),end:new Date(i,a,29),backgroundColor:App.getBrandColor("yellow"),url:"http://google.com/"}]})}},initCharts:function(){function e(e,t,a,i){$('<div id="tooltip" class="chart-tooltip">'+i+"</div>").css({position:"absolute",display:"none",top:t-40,left:e-40,border:"0px solid #ccc",padding:"2px 6px","background-color":"#fff"}).appendTo("body").fadeIn(200)}if(jQuery.plot){var t=[["02/2013",1500],["03/2013",2500],["04/2013",1700],["05/2013",800],["06/2013",1500],["07/2013",2350],["08/2013",1500],["09/2013",1300],["10/2013",4600]];if(0!=$("#site_statistics").size()){$("#site_statistics_loading").hide(),$("#site_statistics_content").show();var a=($.plot($("#site_statistics"),[{data:t,lines:{fill:.6,lineWidth:0},color:["#f89f9f"]},{data:t,points:{show:!0,fill:!0,radius:5,fillColor:"#f89f9f",lineWidth:3},color:"#fff",shadowSize:0}],{xaxis:{tickLength:0,tickDecimals:0,mode:"categories",min:0,font:{lineHeight:14,style:"normal",variant:"small-caps",color:"#6F7B8A"}},yaxis:{ticks:5,tickDecimals:0,tickColor:"#eee",font:{lineHeight:14,style:"normal",variant:"small-caps",color:"#6F7B8A"}},grid:{hoverable:!0,clickable:!0,tickColor:"#eee",borderColor:"#eee",borderWidth:1}}),null);$("#site_statistics").bind("plothover",function(t,i,l){if($("#x").text(i.x.toFixed(2)),$("#y").text(i.y.toFixed(2)),l){if(a!=l.dataIndex){a=l.dataIndex,$("#tooltip").remove();l.datapoint[0].toFixed(2),l.datapoint[1].toFixed(2);e(l.pageX,l.pageY,l.datapoint[0],l.datapoint[1]+" visits")}}else $("#tooltip").remove(),a=null})}if(0!=$("#site_activities").size()){var i=null;$("#site_activities_loading").hide(),$("#site_activities_content").show();var l=[["DEC",300],["JAN",600],["FEB",1100],["MAR",1200],["APR",860],["MAY",1200],["JUN",1450],["JUL",1800],["AUG",1200],["SEP",600]];$.plot($("#site_activities"),[{data:l,lines:{fill:.2,lineWidth:0},color:["#BAD9F5"]},{data:l,points:{show:!0,fill:!0,radius:4,fillColor:"#9ACAE6",lineWidth:2},color:"#9ACAE6",shadowSize:1},{data:l,lines:{show:!0,fill:!1,lineWidth:3},color:"#9ACAE6",shadowSize:0}],{xaxis:{tickLength:0,tickDecimals:0,mode:"categories",min:0,font:{lineHeight:18,style:"normal",variant:"small-caps",color:"#6F7B8A"}},yaxis:{ticks:5,tickDecimals:0,tickColor:"#eee",font:{lineHeight:14,style:"normal",variant:"small-caps",color:"#6F7B8A"}},grid:{hoverable:!0,clickable:!0,tickColor:"#eee",borderColor:"#eee",borderWidth:1}});$("#site_activities").bind("plothover",function(t,a,l){if($("#x").text(a.x.toFixed(2)),$("#y").text(a.y.toFixed(2)),l&&i!=l.dataIndex){i=l.dataIndex,$("#tooltip").remove();l.datapoint[0].toFixed(2),l.datapoint[1].toFixed(2);e(l.pageX,l.pageY,l.datapoint[0],l.datapoint[1]+"M$")}}),$("#site_activities").bind("mouseleave",function(){$("#tooltip").remove()})}}},initEasyPieCharts:function(){jQuery().easyPieChart&&($(".easy-pie-chart .number.transactions").easyPieChart({animate:1e3,size:75,lineWidth:3,barColor:App.getBrandColor("yellow")}),$(".easy-pie-chart .number.visits").easyPieChart({animate:1e3,size:75,lineWidth:3,barColor:App.getBrandColor("green")}),$(".easy-pie-chart .number.bounce").easyPieChart({animate:1e3,size:75,lineWidth:3,barColor:App.getBrandColor("red")}),$(".easy-pie-chart-reload").click(function(){$(".easy-pie-chart .number").each(function(){var e=Math.floor(100*Math.random());$(this).data("easyPieChart").update(e),$("span",this).text(e)})}))},initSparklineCharts:function(){jQuery().sparkline&&($("#sparkline_bar").sparkline([8,9,10,11,10,10,12,10,10,11,9,12,11,10,9,11,13,13,12],{type:"bar",width:"100",barWidth:5,height:"55",barColor:"#f36a5b",negBarColor:"#e02222"}),$("#sparkline_bar2").sparkline([9,11,12,13,12,13,10,14,13,11,11,12,11,11,10,12,11,10],{type:"bar",width:"100",barWidth:5,height:"55",barColor:"#5c9bd1",negBarColor:"#e02222"}),$("#sparkline_bar5").sparkline([8,9,10,11,10,10,12,10,10,11,9,12,11,10,9,11,13,13,12],{type:"bar",width:"100",barWidth:5,height:"55",barColor:"#35aa47",negBarColor:"#e02222"}),$("#sparkline_bar6").sparkline([9,11,12,13,12,13,10,14,13,11,11,12,11,11,10,12,11,10],{type:"bar",width:"100",barWidth:5,height:"55",barColor:"#ffb848",negBarColor:"#e02222"}),$("#sparkline_line").sparkline([9,10,9,10,10,11,12,10,10,11,11,12,11,10,12,11,10,12],{type:"line",width:"100",height:"55",lineColor:"#ffb848"}))},initMorisCharts:function(){Morris.EventEmitter&&$("#sales_statistics").size()>0&&(dashboardMainChart=Morris.Area({element:"sales_statistics",padding:0,behaveLikeLine:!1,gridEnabled:!1,gridLineColor:!1,axes:!1,fillOpacity:1,data:[{period:"2011 Q1",sales:1400,profit:400},{period:"2011 Q2",sales:1100,profit:600},{period:"2011 Q3",sales:1600,profit:500},{period:"2011 Q4",sales:1200,profit:400},{period:"2012 Q1",sales:1550,profit:800}],lineColors:["#399a8c","#92e9dc"],xkey:"period",ykeys:["sales","profit"],labels:["Sales","Profit"],pointSize:0,lineWidth:0,hideHover:"auto",resize:!0}))},initChat:function(){var e=$("#chats"),t=$(".chats",e),a=$(".chat-form",e),i=$("input",a),l=$(".btn",a),o=function(a){a.preventDefault();var l=i.val();if(0!=l.length){var o=new Date,n=o.getHours()+":"+o.getMinutes(),r="";r+='<li class="out">',r+='<img class="avatar" alt="" src="'+Layout.getLayoutImgPath()+'avatar1.jpg"/>',r+='<div class="message">',r+='<span class="arrow"></span>',r+='<a href="#" class="name">Bob Nilson</a>&nbsp;',r+='<span class="datetime">at '+n+"</span>",r+='<span class="body">',r+=l,r+="</span>",r+="</div>",r+="</li>";t.append(r);i.val("");var s=function(){var t=0;return e.find("li.out, li.in").each(function(){t+=$(this).outerHeight()}),t};e.find(".scroller").slimScroll({scrollTo:s()})}};$("body").on("click",".message .name",function(e){e.preventDefault();var t=$(this).text();i.val("@"+t+":"),App.scrollTo(i)}),l.click(o),i.keypress(function(e){return 13==e.which?(o(e),!1):void 0})},initDashboardDaterange:function(){jQuery().daterangepicker&&($("#dashboard-report-range").daterangepicker({ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract("days",1),moment().subtract("days",1)],"Last 7 Days":[moment().subtract("days",6),moment()],"Last 30 Days":[moment().subtract("days",29),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract("month",1).startOf("month"),moment().subtract("month",1).endOf("month")]},locale:{format:"MM/DD/YYYY",separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",fromLabel:"From",toLabel:"To",customRangeLabel:"Custom",daysOfWeek:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],firstDay:1},opens:App.isRTL()?"right":"left"},function(e,t,a){"0"!=$("#dashboard-report-range").attr("data-display-range")&&$("#dashboard-report-range span").html(e.format("MMMM D, YYYY")+" - "+t.format("MMMM D, YYYY"))}),"0"!=$("#dashboard-report-range").attr("data-display-range")&&$("#dashboard-report-range span").html(moment().subtract("days",29).format("MMMM D, YYYY")+" - "+moment().format("MMMM D, YYYY")),$("#dashboard-report-range").show())},initAmChart1:function(){if("undefined"!=typeof AmCharts&&0!==$("#dashboard_amchart_1").size()){var e=[{date:"2012-01-05",distance:480,townName:"Miami",townName2:"Miami",townSize:10,latitude:25.83,duration:501},{date:"2012-01-06",distance:386,townName:"Tallahassee",townSize:7,latitude:30.46,duration:443},{date:"2012-01-07",distance:348,townName:"New Orleans",townSize:10,latitude:29.94,duration:405},{date:"2012-01-08",distance:238,townName:"Houston",townName2:"Houston",townSize:16,latitude:29.76,duration:309},{date:"2012-01-09",distance:218,townName:"Dalas",townSize:17,latitude:32.8,duration:287},{date:"2012-01-10",distance:349,townName:"Oklahoma City",townSize:11,latitude:35.49,duration:485},{date:"2012-01-11",distance:603,townName:"Kansas City",townSize:10,latitude:39.1,duration:890},{date:"2012-01-12",distance:534,townName:"Denver",townName2:"Denver",townSize:18,latitude:39.74,duration:810},{date:"2012-01-13",townName:"Salt Lake City",townSize:12,distance:425,duration:670,latitude:40.75,alpha:.4},{date:"2012-01-14",latitude:36.1,duration:470,townName:"Las Vegas",townName2:"Las Vegas",bulletClass:"lastBullet"},{date:"2012-01-15"}];AmCharts.makeChart("dashboard_amchart_1",{type:"serial",fontSize:12,fontFamily:"Open Sans",dataDateFormat:"YYYY-MM-DD",dataProvider:e,addClassNames:!0,startDuration:1,color:"#6c7b88",marginLeft:0,categoryField:"date",categoryAxis:{parseDates:!0,minPeriod:"DD",autoGridCount:!1,gridCount:50,gridAlpha:.1,gridColor:"#FFFFFF",axisColor:"#555555",dateFormats:[{period:"DD",format:"DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}]},valueAxes:[{id:"a1",title:"distance",gridAlpha:0,axisAlpha:0},{id:"a2",position:"right",gridAlpha:0,axisAlpha:0,labelsEnabled:!1},{id:"a3",title:"duration",position:"right",gridAlpha:0,axisAlpha:0,inside:!0,duration:"mm",durationUnits:{DD:"d. ",hh:"h ",mm:"min",ss:""}}],graphs:[{id:"g1",valueField:"distance",title:"distance",type:"column",fillAlphas:.7,valueAxis:"a1",balloonText:"[[value]] miles",legendValueText:"[[value]] mi",legendPeriodValueText:"total: [[value.sum]] mi",lineColor:"#08a3cc",alphaField:"alpha"},{id:"g2",valueField:"latitude",classNameField:"bulletClass",title:"latitude/city",type:"line",valueAxis:"a2",lineColor:"#786c56",lineThickness:1,legendValueText:"[[description]]/[[value]]",descriptionField:"townName",bullet:"round",bulletSizeField:"townSize",bulletBorderColor:"#02617a",bulletBorderAlpha:1,bulletBorderThickness:2,bulletColor:"#89c4f4",labelText:"[[townName2]]",labelPosition:"right",balloonText:"latitude:[[value]]",showBalloon:!0,animationPlayed:!0},{id:"g3",title:"duration",valueField:"duration",type:"line",valueAxis:"a3",lineAlpha:.8,lineColor:"#e26a6a",balloonText:"[[value]]",lineThickness:1,legendValueText:"[[value]]",bullet:"square",bulletBorderColor:"#e26a6a",bulletBorderThickness:1,bulletBorderAlpha:.8,dashLengthField:"dashLength",animationPlayed:!0}],chartCursor:{zoomable:!1,categoryBalloonDateFormat:"DD",cursorAlpha:0,categoryBalloonColor:"#e26a6a",categoryBalloonAlpha:.8,valueBalloonsEnabled:!1},legend:{bulletType:"round",equalWidths:!1,valueWidth:120,useGraphSettings:!0,color:"#6c7b88"}})}},initAmChart2:function(){if("undefined"!=typeof AmCharts&&0!==$("#dashboard_amchart_2").size()){var e="M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z",t="M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";AmCharts.makeChart("dashboard_amchart_2",{type:"map",theme:"light",pathToImages:"../assets/global/plugins/amcharts/ammap/images/",dataProvider:{map:"worldLow",linkToObject:"london",images:[{id:"london",color:"#009dc7",svgPath:e,title:"London",latitude:51.5002,longitude:-.1262,scale:1.5,zoomLevel:2.74,zoomLongitude:-20.1341,zoomLatitude:49.1712,lines:[{latitudes:[51.5002,50.4422],longitudes:[-.1262,30.5367]},{latitudes:[51.5002,46.948],longitudes:[-.1262,7.4481]},{latitudes:[51.5002,59.3328],longitudes:[-.1262,18.0645]},{latitudes:[51.5002,40.4167],longitudes:[-.1262,-3.7033]},{latitudes:[51.5002,46.0514],longitudes:[-.1262,14.506]},{latitudes:[51.5002,48.2116],longitudes:[-.1262,17.1547]},{latitudes:[51.5002,44.8048],longitudes:[-.1262,20.4781]},{latitudes:[51.5002,55.7558],longitudes:[-.1262,37.6176]},{latitudes:[51.5002,38.7072],longitudes:[-.1262,-9.1355]},{latitudes:[51.5002,54.6896],longitudes:[-.1262,25.2799]},{latitudes:[51.5002,64.1353],longitudes:[-.1262,-21.8952]},{latitudes:[51.5002,40.43],longitudes:[-.1262,-74]}],images:[{label:"Flights from London",svgPath:t,left:100,top:45,labelShiftY:5,color:"#d93d5e",labelColor:"#d93d5e",labelRollOverColor:"#d93d5e",labelFontSize:20},{label:"show flights from Vilnius",left:106,top:70,labelColor:"#6c7b88",labelRollOverColor:"#d93d5e",labelFontSize:11,linkToObject:"vilnius"}]},{id:"vilnius",color:"#009dc7",svgPath:e,title:"Vilnius",latitude:54.6896,longitude:25.2799,scale:1.5,zoomLevel:4.92,zoomLongitude:15.4492,zoomLatitude:50.2631,lines:[{latitudes:[54.6896,50.8371],longitudes:[25.2799,4.3676]},{latitudes:[54.6896,59.9138],longitudes:[25.2799,10.7387]},{latitudes:[54.6896,40.4167],longitudes:[25.2799,-3.7033]},{latitudes:[54.6896,50.0878],longitudes:[25.2799,14.4205]},{latitudes:[54.6896,48.2116],longitudes:[25.2799,17.1547]},{latitudes:[54.6896,44.8048],longitudes:[25.2799,20.4781]},{latitudes:[54.6896,55.7558],longitudes:[25.2799,37.6176]},{latitudes:[54.6896,37.9792],longitudes:[25.2799,23.7166]},{latitudes:[54.6896,54.6896],longitudes:[25.2799,25.2799]},{latitudes:[54.6896,51.5002],longitudes:[25.2799,-.1262]},{latitudes:[54.6896,53.3441],longitudes:[25.2799,-6.2675]}],images:[{label:"Flights from Vilnius",svgPath:t,left:100,top:45,labelShiftY:5,color:"#d93d5e",labelColor:"#d93d5e",labelRollOverColor:"#d93d5e",labelFontSize:20},{label:"show flights from London",left:106,top:70,labelColor:"#009dc7",labelRollOverColor:"#d93d5e",labelFontSize:11,linkToObject:"london"}]},{svgPath:e,title:"Brussels",latitude:50.8371,longitude:4.3676},{svgPath:e,title:"Prague",latitude:50.0878,longitude:14.4205},{svgPath:e,title:"Athens",latitude:37.9792,longitude:23.7166},{svgPath:e,title:"Reykjavik",latitude:64.1353,longitude:-21.8952},{svgPath:e,title:"Dublin",latitude:53.3441,longitude:-6.2675},{svgPath:e,title:"Oslo",latitude:59.9138,longitude:10.7387},{svgPath:e,title:"Lisbon",latitude:38.7072,longitude:-9.1355},{svgPath:e,title:"Moscow",latitude:55.7558,longitude:37.6176},{svgPath:e,title:"Belgrade",latitude:44.8048,longitude:20.4781},{svgPath:e,title:"Bratislava",latitude:48.2116,longitude:17.1547},{svgPath:e,title:"Ljubljana",latitude:46.0514,longitude:14.506},{svgPath:e,title:"Madrid",latitude:40.4167,longitude:-3.7033},{svgPath:e,title:"Stockholm",latitude:59.3328,longitude:18.0645},{svgPath:e,title:"Bern",latitude:46.948,longitude:7.4481},{svgPath:e,title:"Kiev",latitude:50.4422,longitude:30.5367},{svgPath:e,title:"Paris",latitude:48.8567,longitude:2.351},{svgPath:e,title:"New York",latitude:40.43,longitude:-74}]},zoomControl:{buttonFillColor:"#dddddd"},areasSettings:{unlistedAreasColor:"#15A892"},imagesSettings:{color:"#d93d5e",rollOverColor:"#d93d5e",selectedColor:"#009dc7"},linesSettings:{color:"#d93d5e",alpha:.4},backgroundZoomsToTop:!0,linesAboveImages:!0,"export":{enabled:!0,libs:{path:"http://www.amcharts.com/lib/3/plugins/export/libs/"}}})}},initAmChart3:function(){if("undefined"!=typeof AmCharts&&0!==$("#dashboard_amchart_3").size()){AmCharts.makeChart("dashboard_amchart_3",{type:"serial",addClassNames:!0,theme:"light",path:"../assets/global/plugins/amcharts/ammap/images/",autoMargins:!1,marginLeft:30,marginRight:8,marginTop:10,marginBottom:26,balloon:{adjustBorderColor:!1,horizontalPadding:10,verticalPadding:8,color:"#ffffff"},dataProvider:[{year:2009,income:23.5,expenses:21.1},{year:2010,income:26.2,expenses:30.5},{year:2011,income:30.1,expenses:34.9},{year:2012,income:29.5,expenses:31.1},{year:2013,income:30.6,expenses:28.2},{year:2014,income:34.1,expenses:32.9,dashLengthColumn:5,alpha:.2,additional:"(projection)"}],valueAxes:[{axisAlpha:0,position:"left"}],startDuration:1,graphs:[{alphaField:"alpha",balloonText:"<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",fillAlphas:1,title:"Income",type:"column",valueField:"income",dashLengthField:"dashLengthColumn"},{id:"graph2",balloonText:"<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",bullet:"round",lineThickness:3,bulletSize:7,bulletBorderAlpha:1,bulletColor:"#FFFFFF",useLineColorForBulletBorder:!0,bulletBorderThickness:3,fillAlphas:0,lineAlpha:1,title:"Expenses",valueField:"expenses"}],categoryField:"year",categoryAxis:{gridPosition:"start",axisAlpha:0,tickLength:0},"export":{enabled:!0}})}},initAmChart4:function(){if("undefined"!=typeof AmCharts&&0!==$("#dashboard_amchart_4").size()){var e=AmCharts.makeChart("dashboard_amchart_4",{type:"pie",theme:"light",path:"../assets/global/plugins/amcharts/ammap/images/",dataProvider:[{country:"Lithuania",value:260},{country:"Ireland",value:201},{country:"Germany",value:65},{country:"Australia",value:39},{country:"UK",value:19},{country:"Latvia",value:10}],valueField:"value",titleField:"country",outlineAlpha:.4,depth3D:15,balloonText:"[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",angle:30,"export":{enabled:!0}});jQuery(".chart-input").off().on("input change",function(){var t=jQuery(this).data("property"),a=e,i=Number(this.value);e.startDuration=0,"innerRadius"==t&&(i+="%"),a[t]=i,e.validateNow()})}},initWorldMapStats:function(){0!==$("#mapplic").size()&&($("#mapplic").mapplic({source:"../assets/global/plugins/mapplic/world.json",height:265,animate:!1,sidebar:!1,minimap:!1,locations:!0,deeplinking:!0,fullscreen:!1,hovertip:!0,zoombuttons:!1,clearbutton:!1,developer:!1,maxscale:2,skin:"mapplic-dark",zoom:!0}),$("#widget_sparkline_bar").sparkline([8,7,9,8.5,8,8.2,8,8.5,9,8,9],{type:"bar",width:"100",barWidth:5,height:"30",barColor:"#4db3a4",negBarColor:"#e02222"}),$("#widget_sparkline_bar2").sparkline([8,7,9,8.5,8,8.2,8,8.5,9,8,9],{type:"bar",width:"100",barWidth:5,height:"30",barColor:"#f36a5a",negBarColor:"#e02222"}),$("#widget_sparkline_bar3").sparkline([8,7,9,8.5,8,8.2,8,8.5,9,8,9],{type:"bar",width:"100",barWidth:5,height:"30",barColor:"#5b9bd1",negBarColor:"#e02222"}),$("#widget_sparkline_bar4").sparkline([8,7,9,8.5,8,8.2,8,8.5,9,8,9],{type:"bar",width:"100",barWidth:5,height:"30",barColor:"#9a7caf",negBarColor:"#e02222"}))},init:function(){this.initJQVMAP(),this.initCalendar(),this.initCharts(),this.initEasyPieCharts(),this.initSparklineCharts(),this.initChat(),this.initDashboardDaterange(),this.initMorisCharts(),this.initAmChart1(),this.initAmChart2(),this.initAmChart3(),this.initAmChart4(),this.initWorldMapStats()}}}();App.isAngularJsApp()===!1&&jQuery(document).ready(function(){Dashboard.init()});
!function(t,i){"object"==typeof exports?module.exports=i():"function"==typeof define&&define.amd?define(i):t.Spinner=i()}(this,function(){"use strict";function t(t,i){var e,o=document.createElement(t||"div");for(e in i)o[e]=i[e];return o}function i(t){for(var i=1,e=arguments.length;i<e;i++)t.appendChild(arguments[i]);return t}function e(t,i,e,o){var n=["opacity",i,~~(100*t),e,o].join("-"),r=.01+e/o*100,s=Math.max(1-(1-t)/i*(100-r),t),a=l.substring(0,l.indexOf("Animation")).toLowerCase(),c=a&&"-"+a+"-"||"";return d[n]||(p.insertRule("@"+c+"keyframes "+n+"{0%{opacity:"+s+"}"+r+"%{opacity:"+t+"}"+(r+.01)+"%{opacity:1}"+(r+i)%100+"%{opacity:"+t+"}100%{opacity:"+s+"}}",p.cssRules.length),d[n]=1),n}function o(t,i){var e,o,n=t.style;for(i=i.charAt(0).toUpperCase()+i.slice(1),o=0;o<c.length;o++)if(e=c[o]+i,void 0!==n[e])return e;if(void 0!==n[i])return i}function n(t,i){for(var e in i)t.style[o(t,e)||e]=i[e];return t}function r(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var o in e)void 0===t[o]&&(t[o]=e[o])}return t}function s(t,i){return"string"==typeof t?t:t[i%t.length]}function a(t){this.opts=r(t||{},a.defaults,u)}var l,c=["webkit","Moz","ms","O"],d={},p=function(){var e=t("style",{type:"text/css"});return i(document.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),u={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};a.defaults={},r(a.prototype,{spin:function(i){this.stop();var e=this,o=e.opts,r=e.el=n(t(0,{className:o.className}),{position:o.position,width:0,zIndex:o.zIndex});o.radius,o.length,o.width;if(n(r,{left:o.left,top:o.top}),i&&i.insertBefore(r,i.firstChild||null),r.setAttribute("role","progressbar"),e.lines(r,e.opts),!l){var s,a=0,c=(o.lines-1)*(1-o.direction)/2,d=o.fps,p=d/o.speed,u=(1-o.opacity)/(p*o.trail/100),f=p/o.lines;!function t(){a++;for(var i=0;i<o.lines;i++)s=Math.max(1-(a+(o.lines-i)*f)%p*u,o.opacity),e.opacity(r,i*o.direction+c,s,o);e.timeout=e.el&&setTimeout(t,~~(1e3/d))}()}return e},stop:function(){var t=this.el;return t&&(clearTimeout(this.timeout),t.parentNode&&t.parentNode.removeChild(t),this.el=void 0),this},lines:function(o,r){function a(i,e){return n(t(),{position:"absolute",width:r.length+r.width+"px",height:r.width+"px",background:i,boxShadow:e,transformOrigin:"left",transform:"rotate("+~~(360/r.lines*d+r.rotate)+"deg) translate("+r.radius+"px,0)",borderRadius:(r.corners*r.width>>1)+"px"})}for(var c,d=0,p=(r.lines-1)*(1-r.direction)/2;d<r.lines;d++)c=n(t(),{position:"absolute",top:1+~(r.width/2)+"px",transform:r.hwaccel?"translate3d(0,0,0)":"",opacity:r.opacity,animation:l&&e(r.opacity,r.trail,p+d*r.direction,r.lines)+" "+1/r.speed+"s linear infinite"}),r.shadow&&i(c,n(a("#000","0 0 4px #000"),{top:"2px"})),i(o,i(c,a(s(r.color,d),"0 0 1px rgba(0,0,0,.1)")));return o},opacity:function(t,i,e){i<t.childNodes.length&&(t.childNodes[i].style.opacity=e)}});var f=n(t("group"),{behavior:"url(#default#VML)"});return!o(f,"transform")&&f.adj?function(){function e(i,e){return t("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}p.addRule(".spin-vml","behavior:url(#default#VML)"),a.prototype.lines=function(t,o){function r(){return n(e("group",{coordsize:d+" "+d,coordorigin:-c+" "+-c}),{width:d,height:d})}function a(t,a,l){i(u,i(n(r(),{rotation:360/o.lines*t+"deg",left:~~a}),i(n(e("roundrect",{arcsize:o.corners}),{width:c,height:o.width,left:o.radius,top:-o.width>>1,filter:l}),e("fill",{color:s(o.color,t),opacity:o.opacity}),e("stroke",{opacity:0}))))}var l,c=o.length+o.width,d=2*c,p=2*-(o.width+o.length)+"px",u=n(r(),{position:"absolute",top:p,left:p});if(o.shadow)for(l=1;l<=o.lines;l++)a(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=o.lines;l++)a(l);return i(t,u)},a.prototype.opacity=function(t,i,e,o){var n=t.firstChild;o=o.shadow&&o.lines||0,n&&i+o<n.childNodes.length&&(n=(n=(n=n.childNodes[i+o])&&n.firstChild)&&n.firstChild)&&(n.opacity=e)}}():l=o(f,"animation"),a});
/*!
 * Ladda 1.0.5 (2017-09-24, 16:55)
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2017 Hakim El Hattab, http://hakim.se
 */

!function(t,e){"use strict";"object"==typeof exports?module.exports=e(require("spin.js")):"function"==typeof define&&define.amd?define(["spin"],e):t.Ladda=e(t.Spinner)}(this,function(t){"use strict";function e(t){if(void 0!==t){if(/ladda-button/i.test(t.className)||(t.className+=" ladda-button"),t.hasAttribute("data-style")||t.setAttribute("data-style","expand-right"),!t.querySelector(".ladda-label")){var e=document.createElement("span");e.className="ladda-label",r(t,e)}var a,u=t.querySelector(".ladda-spinner");u||((u=document.createElement("span")).className="ladda-spinner"),t.appendChild(u);var i,o={start:function(){return a||(a=n(t)),t.disabled=!0,t.setAttribute("data-loading",""),clearTimeout(i),a.spin(u),this.setProgress(0),this},startAfter:function(t){return clearTimeout(i),i=setTimeout(function(){o.start()},t),this},stop:function(){return o.isLoading()&&(t.disabled=!1,t.removeAttribute("data-loading")),clearTimeout(i),a&&(i=setTimeout(function(){a.stop()},1e3)),this},toggle:function(){return this.isLoading()?this.stop():this.start()},setProgress:function(e){e=Math.max(Math.min(e,1),0);var a=t.querySelector(".ladda-progress");0===e&&a&&a.parentNode?a.parentNode.removeChild(a):(a||((a=document.createElement("div")).className="ladda-progress",t.appendChild(a)),a.style.width=(e||0)*t.offsetWidth+"px")},enable:function(){return this.stop()},disable:function(){return this.stop(),t.disabled=!0,this},isLoading:function(){return t.hasAttribute("data-loading")},remove:function(){clearTimeout(i),t.disabled=!1,t.removeAttribute("data-loading"),a&&(a.stop(),a=null),d.splice(d.indexOf(o),1)}};return d.push(o),o}console.warn("Ladda button target must be defined.")}function a(t,e){for(;t.parentNode&&t.tagName!==e;)t=t.parentNode;return e===t.tagName?t:void 0}function u(t){var e=[];return["input","textarea","select"].forEach(function(a){for(var u=t.getElementsByTagName(a),n=0;n<u.length;n++)u[n].hasAttribute("required")&&e.push(u[n])}),e}function n(e){var a,u,n=e.offsetHeight;0===n&&(n=parseFloat(window.getComputedStyle(e).height)),n>32&&(n*=.8),e.hasAttribute("data-spinner-size")&&(n=parseInt(e.getAttribute("data-spinner-size"),10)),e.hasAttribute("data-spinner-color")&&(a=e.getAttribute("data-spinner-color")),e.hasAttribute("data-spinner-lines")&&(u=parseInt(e.getAttribute("data-spinner-lines"),10));var r=.2*n,i=.6*r,d=r<7?2:3;return new t({color:a||"#fff",lines:u||12,radius:r,length:i,width:d,zIndex:"auto",top:"auto",left:"auto",className:""})}function r(t,e){var a=document.createRange();a.selectNodeContents(t),a.surroundContents(e),t.appendChild(e)}function i(t,n){if("function"==typeof t.addEventListener){var r=e(t),i=-1;t.addEventListener("click",function(){var e=!0,d=a(t,"FORM");if(void 0!==d)if("function"==typeof d.checkValidity)e=d.checkValidity();else for(var o=u(d),s=0;s<o.length;s++){var F=o[s],l=F.getAttribute("type");if(""===F.value.replace(/^\s+|\s+$/g,"")&&(e=!1),"checkbox"!==l&&"radio"!==l||F.checked||(e=!1),"email"===l&&(e=/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i.test(F.value)),"url"===l&&(e=/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(F.value)),!e)break}e&&(r.startAfter(1),"number"==typeof n.timeout&&(clearTimeout(i),i=setTimeout(r.stop,n.timeout)),"function"==typeof n.callback&&n.callback.apply(null,[r]))},!1)}}var d=[];return{bind:function(t,e){var a;if("string"==typeof t)a=document.querySelectorAll(t);else{if("object"!=typeof t)throw new Error("target must be string or object");a=[t]}e=e||{};for(var u=0;u<a.length;u++)i(a[u],e)},create:e,stopAll:function(){for(var t=0,e=d.length;t<e;t++)d[t].stop()}}});
/*! angular-ladda 0.4.3 */
!function(e,n){"use strict";if("function"==typeof define&&define.amd)define(["angular","ladda"],n);else{if("undefined"==typeof module||"object"!=typeof module.exports)return n(e.angular,e.Ladda);module.exports=n(window.angular||require("angular"),require("ladda"))}}(this,function(e,n){"use strict";var t="angular-ladda";return e.module(t,[]).provider("ladda",function(){var n={style:"zoom-in"};return{setOption:function(t){e.extend(n,t)},$get:function(){return n}}}).directive("ladda",["ladda","$timeout",function(t,a){return{restrict:"A",priority:-1,link:function(r,i,d){a(function(){if(i.addClass("ladda-button"),e.isUndefined(i.attr("data-style"))&&i.attr("data-style",t.style||"zoom-in"),e.isUndefined(i.attr("data-spinner-size"))&&t.spinnerSize&&i.attr("data-spinner-size",t.spinnerSize),e.isUndefined(i.attr("data-spinner-color"))&&t.spinnerColor&&i.attr("data-spinner-color",t.spinnerColor),!i[0].querySelector(".ladda-label")){var a=document.createElement("span");a.className="ladda-label",e.element(a).append(i.contents()),i.append(a)}var o=n.create(i[0]);r.$watch(d.ladda,function(n){return n||e.isNumber(n)?(o.isLoading()||o.start(),void(e.isNumber(n)&&o.setProgress(n))):(o.stop(),void(d.ngDisabled&&i.attr("disabled",r.$eval(d.ngDisabled))))}),r.$on("$destroy",function(){o&&o.remove()})})}}}]),t});
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Sweetalert2=t()}(this,function(){"use strict";var e={title:"",titleText:"",text:"",html:"",type:null,customClass:"",target:"body",animation:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,showConfirmButton:!0,showCancelButton:!1,preConfirm:null,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:"#3085d6",confirmButtonClass:null,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:"#aaa",cancelButtonClass:null,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusCancel:!1,showCloseButton:!1,closeButtonAriaLabel:"Close this dialog",showLoaderOnConfirm:!1,imageUrl:null,imageWidth:null,imageHeight:null,imageAlt:"",imageClass:null,timer:null,width:500,padding:20,background:"#fff",input:null,inputPlaceholder:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputClass:null,inputAttributes:{},inputValidator:null,grow:!1,position:"center",progressSteps:[],currentProgressStep:null,progressStepsDistance:"40px",onBeforeOpen:null,onOpen:null,onClose:null,useRejections:!0},t=function(e){var t={};for(var n in e)t[e[n]]="swal2-"+e[n];return t},n=t(["container","shown","iosfix","modal","overlay","fade","show","hide","noanimation","close","title","content","buttonswrapper","confirm","cancel","icon","image","input","file","range","select","radio","checkbox","textarea","inputerror","validationerror","progresssteps","activeprogressstep","progresscircle","progressline","loading","styled","top","top-left","top-right","center","center-left","center-right","bottom","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen"]),o=t(["success","warning","info","question","error"]),r=function(e,t){(e=String(e).replace(/[^0-9a-f]/gi,"")).length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;for(var n="#",o=0;o<3;o++){var r=parseInt(e.substr(2*o,2),16);n+=("00"+(r=Math.round(Math.min(Math.max(0,r+r*t),255)).toString(16))).substr(r.length)}return n},i=function(e){console.warn("SweetAlert2: "+e)},a=function(e){console.error("SweetAlert2: "+e)},l={previousWindowKeyDown:null,previousActiveElement:null,previousBodyPadding:null},s=function(e){var t=c();t&&t.parentNode.removeChild(t);{if("undefined"!=typeof document){var o=document.createElement("div");o.className=n.container,o.innerHTML=u;("string"==typeof e.target?document.querySelector(e.target):e.target).appendChild(o);var r=d(),i=E(r,n.input),l=E(r,n.file),s=r.querySelector("."+n.range+" input"),p=r.querySelector("."+n.range+" output"),f=E(r,n.select),m=r.querySelector("."+n.checkbox+" input"),g=E(r,n.textarea);return i.oninput=function(){I.resetValidationError()},l.onchange=function(){I.resetValidationError()},s.oninput=function(){I.resetValidationError(),p.value=s.value},s.onchange=function(){I.resetValidationError(),s.previousSibling.value=s.value},f.onchange=function(){I.resetValidationError()},m.onchange=function(){I.resetValidationError()},g.oninput=function(){I.resetValidationError()},r}a("SweetAlert2 requires document to initialize")}},u=('\n <div role="dialog" aria-modal="true" aria-labelledby="'+n.title+'" aria-describedby="'+n.content+'" class="'+n.modal+'" tabindex="-1">\n   <ul class="'+n.progresssteps+'"></ul>\n   <div class="'+n.icon+" "+o.error+'">\n     <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n   </div>\n   <div class="'+n.icon+" "+o.question+'">?</div>\n   <div class="'+n.icon+" "+o.warning+'">!</div>\n   <div class="'+n.icon+" "+o.info+'">i</div>\n   <div class="'+n.icon+" "+o.success+'">\n     <div class="swal2-success-circular-line-left"></div>\n     <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n     <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n     <div class="swal2-success-circular-line-right"></div>\n   </div>\n   <img class="'+n.image+'" />\n   <h2 class="'+n.title+'" id="'+n.title+'"></h2>\n   <div id="'+n.content+'" class="'+n.content+'"></div>\n   <input class="'+n.input+'" />\n   <input type="file" class="'+n.file+'" />\n   <div class="'+n.range+'">\n     <output></output>\n     <input type="range" />\n   </div>\n   <select class="'+n.select+'"></select>\n   <div class="'+n.radio+'"></div>\n   <label for="'+n.checkbox+'" class="'+n.checkbox+'">\n     <input type="checkbox" />\n   </label>\n   <textarea class="'+n.textarea+'"></textarea>\n   <div class="'+n.validationerror+'" id="'+n.validationerror+'"></div>\n   <div class="'+n.buttonswrapper+'">\n     <button type="button" class="'+n.confirm+'">OK</button>\n     <button type="button" class="'+n.cancel+'">Cancel</button>\n   </div>\n   <button type="button" class="'+n.close+'">×</button>\n </div>\n').replace(/(^|\n)\s*/g,""),c=function(){return document.body.querySelector("."+n.container)},d=function(){return c()?c().querySelector("."+n.modal):null},p=function(e){return c()?c().querySelector("."+e):null},f=function(){return p(n.title)},m=function(){return p(n.content)},g=function(){return p(n.image)},b=function(){return p(n.progresssteps)},v=function(){return p(n.validationerror)},h=function(){return p(n.confirm)},y=function(){return p(n.cancel)},w=function(){return p(n.buttonswrapper)},C=function(){return p(n.close)},k=function(){var e=Array.from(d().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(e,t){return e=parseInt(e.getAttribute("tabindex")),t=parseInt(t.getAttribute("tabindex")),e>t?1:e<t?-1:0}),t=Array.prototype.slice.call(d().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));return function(e){var t=[];for(var n in e)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(e.concat(t))},x=function(e,t){return!!e.classList&&e.classList.contains(t)},S=function(e){if(e.focus(),"file"!==e.type){var t=e.value;e.value="",e.value=t}},A=function(e,t){if(e&&t){t.split(/\s+/).filter(Boolean).forEach(function(t){e.classList.add(t)})}},B=function(e,t){if(e&&t){t.split(/\s+/).filter(Boolean).forEach(function(t){e.classList.remove(t)})}},E=function(e,t){for(var n=0;n<e.childNodes.length;n++)if(x(e.childNodes[n],t))return e.childNodes[n]},P=function(e,t){t||(t="block"),e.style.opacity="",e.style.display=t},L=function(e){e.style.opacity="",e.style.display="none"},T=function(e){return e.offsetWidth||e.offsetHeight||e.getClientRects().length},q=function(){var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(var n in t)if(t.hasOwnProperty(n)&&void 0!==e.style[n])return t[n];return!1}(),V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},M=O({},e),N=[];"undefined"==typeof Promise&&a("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/limonte/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");var H=function(e){("string"==typeof e.target&&!document.querySelector(e.target)||"string"!=typeof e.target&&!e.target.appendChild)&&(i('Target parameter is not valid, defaulting to "body"'),e.target="body");var t=void 0,r=d(),l="string"==typeof e.target?document.querySelector(e.target):e.target;t=r&&l&&r.parentNode!==l.parentNode?s(e):r||s(e);for(var u in e)I.isValidParameter(u)||i('Unknown parameter "'+u+'"');t.style.width="number"==typeof e.width?e.width+"px":e.width,t.style.padding=e.padding+"px",t.style.background=e.background;for(var p=t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"),v=0;v<p.length;v++)p[v].style.background=e.background;var k=c(),x=f(),S=m(),E=w(),T=h(),q=y(),O=C();if(e.titleText?x.innerText=e.titleText:x.innerHTML=e.title.split("\n").join("<br />"),e.text||e.html){if("object"===V(e.html))if(S.innerHTML="",0 in e.html)for(var M=0;M in e.html;M++)S.appendChild(e.html[M].cloneNode(!0));else S.appendChild(e.html.cloneNode(!0));else e.html?S.innerHTML=e.html:e.text&&(S.textContent=e.text);P(S)}else L(S);if(e.position in n&&A(k,n[e.position]),e.grow&&"string"==typeof e.grow){var N="grow-"+e.grow;N in n&&A(k,n[N])}e.showCloseButton?(O.setAttribute("aria-label",e.closeButtonAriaLabel),P(O)):L(O),t.className=n.modal,e.customClass&&A(t,e.customClass);var H=b(),j=parseInt(null===e.currentProgressStep?I.getQueueStep():e.currentProgressStep,10);e.progressSteps.length?(P(H),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(H),j>=e.progressSteps.length&&i("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),e.progressSteps.forEach(function(t,o){var r=document.createElement("li");if(A(r,n.progresscircle),r.innerHTML=t,o===j&&A(r,n.activeprogressstep),H.appendChild(r),o!==e.progressSteps.length-1){var i=document.createElement("li");A(i,n.progressline),i.style.width=e.progressStepsDistance,H.appendChild(i)}})):L(H);for(var R=d().querySelectorAll("."+n.icon),U=0;U<R.length;U++)L(R[U]);if(e.type){var W=!1;for(var D in o)if(e.type===D){W=!0;break}if(!W)return a("Unknown alert type: "+e.type),!1;var K=t.querySelector("."+n.icon+"."+o[e.type]);if(P(K),e.animation)switch(e.type){case"success":A(K,"swal2-animate-success-icon"),A(K.querySelector(".swal2-success-line-tip"),"swal2-animate-success-line-tip"),A(K.querySelector(".swal2-success-line-long"),"swal2-animate-success-line-long");break;case"error":A(K,"swal2-animate-error-icon"),A(K.querySelector(".swal2-x-mark"),"swal2-animate-x-mark")}}var z=g();e.imageUrl?(z.setAttribute("src",e.imageUrl),z.setAttribute("alt",e.imageAlt),P(z),e.imageWidth?z.setAttribute("width",e.imageWidth):z.removeAttribute("width"),e.imageHeight?z.setAttribute("height",e.imageHeight):z.removeAttribute("height"),z.className=n.image,e.imageClass&&A(z,e.imageClass)):L(z),e.showCancelButton?q.style.display="inline-block":L(q),e.showConfirmButton?function(e,t){e.style.removeProperty?e.style.removeProperty(t):e.style.removeAttribute(t)}(T,"display"):L(T),e.showConfirmButton||e.showCancelButton?P(E):L(E),T.innerHTML=e.confirmButtonText,q.innerHTML=e.cancelButtonText,T.setAttribute("aria-label",e.confirmButtonAriaLabel),q.setAttribute("aria-label",e.cancelButtonAriaLabel),e.buttonsStyling&&(T.style.backgroundColor=e.confirmButtonColor,q.style.backgroundColor=e.cancelButtonColor),T.className=n.confirm,A(T,e.confirmButtonClass),q.className=n.cancel,A(q,e.cancelButtonClass),e.buttonsStyling?(A(T,n.styled),A(q,n.styled)):(B(T,n.styled),B(q,n.styled),T.style.backgroundColor=T.style.borderLeftColor=T.style.borderRightColor="",q.style.backgroundColor=q.style.borderLeftColor=q.style.borderRightColor=""),!0===e.animation?B(t,n.noanimation):A(t,n.noanimation),e.showLoaderOnConfirm&&!e.preConfirm&&i("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://limonte.github.io/sweetalert2/#ajax-request")},j=function(){null===l.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(l.previousBodyPadding=document.body.style.paddingRight,document.body.style.paddingRight=function(){if("ontouchstart"in window||navigator.msMaxTouchPoints)return 0;var e=document.createElement("div");e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}()+"px")},R=function(){if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&!x(document.body,n.iosfix)){var e=document.body.scrollTop;document.body.style.top=-1*e+"px",A(document.body,n.iosfix)}},I=function e(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];if(void 0===o[0])return a("SweetAlert2 expects at least 1 attribute!"),!1;var s=O({},M);switch(V(o[0])){case"string":s.title=o[0],s.html=o[1],s.type=o[2];break;case"object":O(s,o[0]),s.extraParams=o[0].extraParams,"email"===s.input&&null===s.inputValidator&&(s.inputValidator=function(e){return new Promise(function(t,n){/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e)?t():n("Invalid email address")})}),"url"===s.input&&null===s.inputValidator&&(s.inputValidator=function(e){return new Promise(function(t,n){/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e)?t():n("Invalid URL")})});break;default:return a('Unexpected type of argument! Expected "string" or "object", got '+V(o[0])),!1}H(s);var u=c(),p=d();return new Promise(function(t,o){s.timer&&(p.timeout=setTimeout(function(){e.closeModal(s.onClose),s.useRejections?o("timer"):t({dismiss:"timer"})},s.timer));var i=function(e){if(!(e=e||s.input))return null;switch(e){case"select":case"textarea":case"file":return E(p,n[e]);case"checkbox":return p.querySelector("."+n.checkbox+" input");case"radio":return p.querySelector("."+n.radio+" input:checked")||p.querySelector("."+n.radio+" input:first-child");case"range":return p.querySelector("."+n.range+" input");default:return E(p,n.input)}};s.input&&setTimeout(function(){var e=i();e&&S(e)},0);for(var O=function(n){s.showLoaderOnConfirm&&e.showLoading(),s.preConfirm?s.preConfirm(n,s.extraParams).then(function(o){e.closeModal(s.onClose),t(o||n)},function(t){e.hideLoading(),t&&e.showValidationError(t)}):(e.closeModal(s.onClose),t(s.useRejections?n:{value:n}))},M=function(n){var a=n||window.event,l=a.target||a.srcElement,u=h(),c=y(),d=u&&(u===l||u.contains(l)),p=c&&(c===l||c.contains(l));switch(a.type){case"mouseover":case"mouseup":s.buttonsStyling&&(d?u.style.backgroundColor=r(s.confirmButtonColor,-.1):p&&(c.style.backgroundColor=r(s.cancelButtonColor,-.1)));break;case"mouseout":s.buttonsStyling&&(d?u.style.backgroundColor=s.confirmButtonColor:p&&(c.style.backgroundColor=s.cancelButtonColor));break;case"mousedown":s.buttonsStyling&&(d?u.style.backgroundColor=r(s.confirmButtonColor,-.2):p&&(c.style.backgroundColor=r(s.cancelButtonColor,-.2)));break;case"click":if(d&&e.isVisible())if(e.disableButtons(),s.input){var f=function(){var e=i();if(!e)return null;switch(s.input){case"checkbox":return e.checked?1:0;case"radio":return e.checked?e.value:null;case"file":return e.files.length?e.files[0]:null;default:return s.inputAutoTrim?e.value.trim():e.value}}();s.inputValidator?(e.disableInput(),s.inputValidator(f,s.extraParams).then(function(){e.enableButtons(),e.enableInput(),O(f)},function(t){e.enableButtons(),e.enableInput(),t&&e.showValidationError(t)})):O(f)}else O(!0);else p&&e.isVisible()&&(e.disableButtons(),e.closeModal(s.onClose),s.useRejections?o("cancel"):t({dismiss:"cancel"}))}},N=p.querySelectorAll("button"),I=0;I<N.length;I++)N[I].onclick=M,N[I].onmouseover=M,N[I].onmouseout=M,N[I].onmousedown=M;C().onclick=function(){e.closeModal(s.onClose),s.useRejections?o("close"):t({dismiss:"close"})},u.onclick=function(n){n.target===u&&s.allowOutsideClick&&(e.closeModal(s.onClose),s.useRejections?o("overlay"):t({dismiss:"overlay"}))};var U=w(),W=h(),D=y();s.reverseButtons?W.parentNode.insertBefore(D,W):W.parentNode.insertBefore(W,D);var K=function(e,t){for(var n=k(s.focusCancel),o=0;o<n.length;o++){(e+=t)===n.length?e=0:-1===e&&(e=n.length-1);var r=n[e];if(T(r))return r.focus()}},z=function(n){var r=n||window.event;if("Enter"===r.key){if(r.target===i()){if("textarea"===r.target.tagName.toLowerCase())return;e.clickConfirm(),r.preventDefault()}}else if("Tab"===r.key){for(var a=r.target||r.srcElement,l=k(s.focusCancel),u=-1,c=0;c<l.length;c++)if(a===l[c]){u=c;break}r.shiftKey?K(u,-1):K(u,1),r.stopPropagation(),r.preventDefault()}else-1!==["ArrowLeft","ArrowRight","ArrowUp","Arrowdown"].indexOf(r.key)?document.activeElement===W&&T(D)?D.focus():document.activeElement===D&&T(W)&&W.focus():"Escape"!==r.key&&"Esc"!==r.key||!0!==s.allowEscapeKey||(e.closeModal(s.onClose),s.useRejections?o("esc"):t({dismiss:"esc"}))};window.onkeydown&&window.onkeydown.toString()===z.toString()||(l.previousWindowKeyDown=window.onkeydown,window.onkeydown=z),s.buttonsStyling&&(W.style.borderLeftColor=s.confirmButtonColor,W.style.borderRightColor=s.confirmButtonColor),e.hideLoading=e.disableLoading=function(){s.showConfirmButton||(L(W),s.showCancelButton||L(w())),B(U,n.loading),B(p,n.loading),p.removeAttribute("aria-busy"),W.disabled=!1,D.disabled=!1},e.getTitle=function(){return f()},e.getContent=function(){return m()},e.getInput=function(){return i()},e.getImage=function(){return g()},e.getButtonsWrapper=function(){return w()},e.getConfirmButton=function(){return h()},e.getCancelButton=function(){return y()},e.enableButtons=function(){W.disabled=!1,D.disabled=!1},e.disableButtons=function(){W.disabled=!0,D.disabled=!0},e.enableConfirmButton=function(){W.disabled=!1},e.disableConfirmButton=function(){W.disabled=!0},e.enableInput=function(){var e=i();if(!e)return!1;if("radio"===e.type)for(var t=e.parentNode.parentNode.querySelectorAll("input"),n=0;n<t.length;n++)t[n].disabled=!1;else e.disabled=!1},e.disableInput=function(){var e=i();if(!e)return!1;if(e&&"radio"===e.type)for(var t=e.parentNode.parentNode.querySelectorAll("input"),n=0;n<t.length;n++)t[n].disabled=!0;else e.disabled=!0},e.showValidationError=function(e){var t=v();t.innerHTML=e,P(t);var o=i();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedBy",n.validationerror),S(o),A(o,n.inputerror))},e.resetValidationError=function(){var e=v();L(e);var t=i();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedBy"),B(t,n.inputerror))},e.getProgressSteps=function(){return s.progressSteps},e.setProgressSteps=function(e){s.progressSteps=e,H(s)},e.showProgressSteps=function(){P(b())},e.hideProgressSteps=function(){L(b())},e.enableButtons(),e.hideLoading(),e.resetValidationError();for(var Z=["input","file","range","select","radio","checkbox","textarea"],Q=void 0,Y=0;Y<Z.length;Y++){var _=n[Z[Y]],$=E(p,_);if(Q=i(Z[Y])){for(var J in Q.attributes)if(Q.attributes.hasOwnProperty(J)){var X=Q.attributes[J].name;"type"!==X&&"value"!==X&&Q.removeAttribute(X)}for(var F in s.inputAttributes)Q.setAttribute(F,s.inputAttributes[F])}$.className=_,s.inputClass&&A($,s.inputClass),L($)}var G=void 0;switch(s.input){case"text":case"email":case"password":case"number":case"tel":case"url":(Q=E(p,n.input)).value=s.inputValue,Q.placeholder=s.inputPlaceholder,Q.type=s.input,P(Q);break;case"file":(Q=E(p,n.file)).placeholder=s.inputPlaceholder,Q.type=s.input,P(Q);break;case"range":var ee=E(p,n.range),te=ee.querySelector("input"),ne=ee.querySelector("output");te.value=s.inputValue,te.type=s.input,ne.value=s.inputValue,P(ee);break;case"select":var oe=E(p,n.select);if(oe.innerHTML="",s.inputPlaceholder){var re=document.createElement("option");re.innerHTML=s.inputPlaceholder,re.value="",re.disabled=!0,re.selected=!0,oe.appendChild(re)}G=function(e){for(var t in e){var n=document.createElement("option");n.value=t,n.innerHTML=e[t],s.inputValue.toString()===t&&(n.selected=!0),oe.appendChild(n)}P(oe),oe.focus()};break;case"radio":var ie=E(p,n.radio);ie.innerHTML="",G=function(e){for(var t in e){var o=document.createElement("input"),r=document.createElement("label"),i=document.createElement("span");o.type="radio",o.name=n.radio,o.value=t,s.inputValue.toString()===t&&(o.checked=!0),i.innerHTML=e[t],r.appendChild(o),r.appendChild(i),r.for=o.id,ie.appendChild(r)}P(ie);var a=ie.querySelectorAll("input");a.length&&a[0].focus()};break;case"checkbox":var ae=E(p,n.checkbox),le=i("checkbox");le.type="checkbox",le.value=1,le.id=n.checkbox,le.checked=Boolean(s.inputValue);var se=ae.getElementsByTagName("span");se.length&&ae.removeChild(se[0]),(se=document.createElement("span")).innerHTML=s.inputPlaceholder,ae.appendChild(se),P(ae);break;case"textarea":var ue=E(p,n.textarea);ue.value=s.inputValue,ue.placeholder=s.inputPlaceholder,P(ue);break;case null:break;default:a('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'+s.input+'"')}"select"!==s.input&&"radio"!==s.input||(s.inputOptions instanceof Promise?(e.showLoading(),s.inputOptions.then(function(t){e.hideLoading(),G(t)})):"object"===V(s.inputOptions)?G(s.inputOptions):a("Unexpected type of inputOptions! Expected object or Promise, got "+V(s.inputOptions))),function(e,t,o){var r=c(),i=d();null!==t&&"function"==typeof t&&t(i),e?(A(i,n.show),A(r,n.fade),B(i,n.hide)):B(i,n.fade),P(i),r.style.overflowY="hidden",q&&!x(i,n.noanimation)?i.addEventListener(q,function e(){i.removeEventListener(q,e),r.style.overflowY="auto"}):r.style.overflowY="auto",A(document.documentElement,n.shown),A(document.body,n.shown),A(r,n.shown),j(),R(),l.previousActiveElement=document.activeElement,null!==o&&"function"==typeof o&&setTimeout(function(){o(i)})}(s.animation,s.onBeforeOpen,s.onOpen),s.allowEnterKey?s.focusCancel&&T(D)?D.focus():s.focusConfirm&&T(W)?W.focus():K(-1,1):document.activeElement&&document.activeElement.blur(),c().scrollTop=0})};return I.isVisible=function(){return!!d()},I.queue=function(e){N=e;var t=function(){N=[],document.body.removeAttribute("data-swal2-queue-step")},n=[];return new Promise(function(e,o){!function r(i,a){i<N.length?(document.body.setAttribute("data-swal2-queue-step",i),I(N[i]).then(function(e){n.push(e),r(i+1,a)},function(e){t(),o(e)})):(t(),e(n))}(0)})},I.getQueueStep=function(){return document.body.getAttribute("data-swal2-queue-step")},I.insertQueueStep=function(e,t){return t&&t<N.length?N.splice(t,0,e):N.push(e)},I.deleteQueueStep=function(e){void 0!==N[e]&&N.splice(e,1)},I.close=I.closeModal=function(e){var t=c(),o=d();if(o){B(o,n.show),A(o,n.hide),clearTimeout(o.timeout),function(){if(window.onkeydown=l.previousWindowKeyDown,l.previousActiveElement&&l.previousActiveElement.focus){var e=window.scrollX,t=window.scrollY;l.previousActiveElement.focus(),e&&t&&window.scrollTo(e,t)}}();var r=function(){t.parentNode&&t.parentNode.removeChild(t),B(document.documentElement,n.shown),B(document.body,n.shown),null!==l.previousBodyPadding&&(document.body.style.paddingRight=l.previousBodyPadding,l.previousBodyPadding=null),function(){if(x(document.body,n.iosfix)){var e=parseInt(document.body.style.top,10);B(document.body,n.iosfix),document.body.style.top="",document.body.scrollTop=-1*e}}()};q&&!x(o,n.noanimation)?o.addEventListener(q,function e(){o.removeEventListener(q,e),x(o,n.hide)&&r()}):r(),null!==e&&"function"==typeof e&&setTimeout(function(){e(o)})}},I.clickConfirm=function(){return h().click()},I.clickCancel=function(){return y().click()},I.showLoading=I.enableLoading=function(){var e=d();e||I(""),e=d();var t=w(),o=h(),r=y();P(t),P(o,"inline-block"),A(t,n.loading),A(e,n.loading),o.disabled=!0,r.disabled=!0,e.setAttribute("aria-busy",!0),e.focus()},I.isValidParameter=function(t){return e.hasOwnProperty(t)||"extraParams"===t},I.setDefaults=function(e){if(!e||"object"!==(void 0===e?"undefined":V(e)))return a("the argument for setDefaults() is required and has to be a object");for(var t in e)I.isValidParameter(t)||(i('Unknown parameter "'+t+'"'),delete e[t]);O(M,e)},I.resetDefaults=function(){M=O({},e)},I.noop=function(){},I.version="6.11.5",I.default=I,I}),window.Sweetalert2&&(window.sweetAlert=window.swal=window.Sweetalert2);
(function() {
    'use strict';

    // Check we have sweet alert js included
    if (angular.isUndefined(window.swal)) {
        throw "Please make sure Sweet Alert 2 is included! https://github.com/limonte/sweetalert2";
    }

    angular.module('swangular', [])
        .provider('swangular', function ProvideSwangular(){

            return({
                setDefaults: setDefaults,
                $get: ['$compile', '$http', '$rootScope', '$q', '$controller', '$injector', '$templateCache', instantiateSwangular]
            });

            function setDefaults(options) {
                swal.setDefaults(options);
            }

            function instantiateSwangular($compile, $http, $rootScope, $q, $controller, $injector, $templateCache) {

                /*
                 *
                 * Sweet Alert functions
                 * The four functions below are just convenience methods
                 *
                 * ex. Swangular.alert("This is a warning message");
                 *
                 */
                function swal_alert(message, customOptions) {

                    var options = angular.extend({
                        title: "Alert",
                        text: message,
                        type: "warning",
                        showCancelButton: false
                    }, customOptions);

                    return swal(options);

                }

                function swal_info(message, customOptions) {

                    var options = angular.extend({
                        title: "Info",
                        text: message,
                        type: "info",
                        showCancelButton: false
                    }, customOptions);

                    return swal(options);

                }

                function swal_success(message, customOptions) {

                    var options = angular.extend({
                        title: "Success",
                        text: message,
                        type: "success",
                        showCancelButton: false
                    }, customOptions);

                    return swal(options);

                }

                function swal_confirm(message, customOptions) {

                    var options = angular.extend({
                        title: "Alert",
                        text: message,
                        type: "warning"
                    }, customOptions);

                    return swal(options);

                }

                /*
                 *
                 * HTML Sweet Alert function
                 * Use this for for passing html that will be compiled to Angular
                 * You can pass an HTML string directly via 'html' option, or you can pass a link to template via 'templateHtml' option.
                 *
                 *  ex. Swangular.html({title: "Please fill in!",scope: $scope,templateHtml: '/templates/template.html'})
                 *         .then(function() { console.log("Done"); })
                 *
                 */
                function swal_open(options){

                    var resolve = angular.extend({}, options.resolve);

                    angular.forEach(resolve, function (value, key) {
                        resolve[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
                    });

                    return $q.all({
                        html: _getHtml(options),
                        locals: $q.all(resolve)
                    }).then(function(setup){

                        var scope = options.scope,
                            controller = options.controller,
                            controllerAsOption = options.controllerAs,
                            preConfirm = options.preConfirm;

                        delete options.html;
                        delete options.htmlTemplate;
                        delete options.resolve;
                        delete options.scope;
                        delete options.controller;
                        delete options.controllerAs;
                        delete options.preConfirm;

                        var locals = setup.locals;

                        options.html = setup.html;

                        scope = scope ? scope.$new() : $rootScope.$new();

                        function transform(func){
                            return function(){
                                return func().then(function (result){
                                    return {resolved: true, value: result};
                                },function(reason){
                                    return {resolved: false, value: reason};
                                });
                            };
                        }

                        function transformBack(result){
                            if (result.resolved) {
                                return result.value;
                            }
                            return Promise.reject(result.value);
                        }

                        if (controller){

                            var controllerAs;

                            if (controllerAsOption && angular.isString(controllerAsOption)) {
                                controllerAs = controllerAsOption;
                            }

                            var controllerInstance = $controller(controller, angular.extend(
                                locals,
                                {
                                    $scope: scope
                                }), false, controllerAs);

                            if (typeof preConfirm === 'string'){
                                options.preConfirm = function(){
                                    return scope.$apply(transform(controllerInstance[preConfirm])).then(transformBack);
                                };
                            }

                        }

                        if (typeof preConfirm === 'function'){
                            options.preConfirm = function(){
                                return scope.$apply(transform(preConfirm)).then(transformBack)
                            };
                        }

                        var prom = $q.when(swal(options));
                        var html = document.getElementsByClassName('swal2-modal')[0];

                        // If there is a form, trigger the button on press of enter button
                        var form = html.getElementsByTagName('form');
                        if(form[0]) {
                            form[0].onkeyup = function(event) {
                                event.stopPropagation();
                                if (event.keyCode === 13) {
                                    html.querySelector('.swal2-confirm').click();
                                }
                            };
                        }

                        $compile(html)(scope);

                        return prom;

                    });

                }

                function _getHtml(options){

                    if(options.htmlTemplate) {
                        return _getTemplate(options.htmlTemplate)
                    } else {
                        return options.html;
                    }

                }

                function _getTemplate(tmpl) {
                    return $http.get(tmpl, {cache: $templateCache}).then(function(res) {
                        return res.data || '';
                    });
                }

                /*
                 *
                 * Base Sweet Alert function
                 * Use this for for a direct mapping to sweetalert,
                 * by either passing an options object or by passing up to 3 string arguments
                 *
                 * ex. 1: Swangular.swal("Good job!", "You clicked the button!", "success")
                 *
                 * ex. 2: Swangular.swal({title: "Auto close alert!", text: "I will close in 2 seconds.", timer: 2000});
                 *
                 */
                function swal_base(arg1, arg2, arg3) {

                    // In case of options
                    if(arg1 !== null && typeof arg1 === 'object') {
                        return swal(arg1)
                    }

                    // In case of: title, text, type
                    else {
                        return swal(arg1, arg2, arg3);
                    }
                }

                /*
                 * SweetAlert2 Global Methods
                 */

                function close() {
                    $rootScope.$evalAsync(function(){
                        swal.close();
                    });
                }

                function disableButtons() {
                    $rootScope.$evalAsync(function(){
                        swal.disableButtons();
                    });
                }

                function enableButtons() {
                    $rootScope.$evalAsync(function(){
                        swal.enableButtons();
                    });
                }

                function disableConfirmButton() {
                    $rootScope.$evalAsync(function(){
                        swal.disableConfirmButton();
                    });
                }

                function enableConfirmButton() {
                    $rootScope.$evalAsync(function(){
                        swal.enableConfirmButton();
                    });
                }

                function clickConfirm() {
                    $rootScope.$evalAsync(function(){
                        swal.clickConfirm();
                    });
                }

                function clickCancel() {
                    $rootScope.$evalAsync(function(){
                        swal.showLoading();
                    });
                }

                function showLoading() {
                    $rootScope.$evalAsync(function(){
                        swal.clickCancel();
                    });
                }

                function hideLoading() {
                    $rootScope.$evalAsync(function(){
                        swal.hideLoading();
                    });
                }

                function setDefaults(options) {
                    $rootScope.$evalAsync(function(){
                        swal.setDefaults(options);
                    });
                }

                return {
                    alert: swal_alert,
                    confirm: swal_confirm,
                    info: swal_info,
                    success: swal_success,
                    open: swal_open,
                    swal: swal_base,
                    closeModal: close,
                    close: close,
                    disableButtons: disableButtons,
                    enableButtons: enableButtons,
                    disableConfirmButton: disableConfirmButton,
                    enableConfirmButton: enableConfirmButton,
                    clickConfirm: clickConfirm,
                    clickCancel: clickCancel,
                    showLoading: showLoading,
                    enableLoading: showLoading,
                    hideLoading: hideLoading,
                    disableLoading: hideLoading,
                    setDefaults: setDefaults
                }

            }

        });

})();

"use strict";!function(a){function b(a){var b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return b[c]}function c(){var a={},b=null,c={style:"fill",direction:"horizontal",randomProgress:!0};this.profile=function(c,d){if(1==arguments.length){if(b)throw Error("Default profile already set.");b=c}else{if(a[c])throw Error("Profile ["+c+"] aready set.");a[c]=d}},this.$get=function(){return{getProfile:function(d){return d&&a[d]?a[d]:b||c}}}}function d(c,d,e){return{restrict:"A",transclude:!0,scope:{progressButton:"&",pbStyle:"@",pbDirection:"@",pbProfile:"@"},template:'<span class="content" ng-transclude></span><span class="progress"><span class="progress-inner" ng-style="progressStyles" ng-class="{ notransition: !allowProgressTransition }"></span></span>',controller:function(){},link:function(f,g,h){function i(){var a=d.getProfile(f.pbProfile);f.pbStyle=f.pbStyle||a.style||"fill","lateral-lines"!=f.pbStyle?f.pbDirection=f.pbDirection||a.direction||"horizontal":f.pbDirection="vertical",f.pbPerspective=0==f.pbStyle.indexOf("rotate")||0==f.pbStyle.indexOf("flip-open"),f.pbRandomProgress=h.pbRandomProgress?"false"!==h.pbRandomProgress:a.randomProgress||!0}function j(a){f.progressStyles[o]=100*a+"%"}function k(){var a=0;return e(function(){a+=(1-a)*Math.random()*.5,j(a)},200)}function l(){f.$apply(function(){f.disabled=!1})}function m(a){function b(a){("opacity"===a.propertyName||a.originalEvent&&"opacity"===a.originalEvent.propertyName)&&(g.off(n,b),f.$apply(function(){f.allowProgressTransition=!1,j(0),f.progressStyles.opacity=1}))}if(n&&(f.progressStyles.opacity=0,g.on(n,b)),"number"==typeof a){var c=a>=0?"state-success":"state-error";g.addClass(c),setTimeout(function(){g.removeClass(c),l()},1500)}else l();g.removeClass("state-loading")}i();var n=b(g[0]),o="vertical"==f.pbDirection?"height":"width";if(f.pbPerspective){var p=a.element('<span class="progress-wrap"></span>');p.append(g.children()),g.append(p),g.addClass("progress-button-perspective")}f.progressStyles={},f.disabled=!1,f.allowProgressTransition=!1,g.addClass("progress-button"),g.addClass("progress-button-dir-"+f.pbDirection),g.addClass("progress-button-style-"+f.pbStyle),f.$watch("disabled",function(a){g.toggleClass("disabled",a)}),g.on("click",function(){f.$apply(function(){if(!f.disabled){f.disabled=!0,g.addClass("state-loading"),f.allowProgressTransition=!0;var a=null;c.when(f.progressButton()).then(function(){j(1),a&&e.cancel(a),m(1)},function(){a&&e.cancel(a),m(-1)},function(a){!f.pbRandomProgress&&j(a)}),f.pbRandomProgress&&(a=k())}})})}}}var e=a.module("angular-progress-button-styles",[]);e.provider("progressButtonConfig",c),e.directive("progressButton",d),d.$inject=["$q","progressButtonConfig","$interval"]}(angular);
/*!
 * angular-translate - v2.16.0 - 2017-11-01
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

/**
 * @ngdoc overview
 * @name pascalprecht.translate
 *
 * @description
 * The main module which holds everything together.
 */
runTranslate.$inject = ['$translate'];
$translate.$inject = ['$STORAGE_KEY', '$windowProvider', '$translateSanitizationProvider', 'pascalprechtTranslateOverrider'];
$translateDefaultInterpolation.$inject = ['$interpolate', '$translateSanitization'];
translateDirective.$inject = ['$translate', '$interpolate', '$compile', '$parse', '$rootScope'];
translateAttrDirective.$inject = ['$translate', '$rootScope'];
translateCloakDirective.$inject = ['$translate', '$rootScope'];
translateFilterFactory.$inject = ['$parse', '$translate'];
$translationCache.$inject = ['$cacheFactory'];
angular.module('pascalprecht.translate', ['ng'])
  .run(runTranslate);

function runTranslate($translate) {

  'use strict';

  var key = $translate.storageKey(),
    storage = $translate.storage();

  var fallbackFromIncorrectStorageValue = function () {
    var preferred = $translate.preferredLanguage();
    if (angular.isString(preferred)) {
      $translate.use(preferred);
      // $translate.use() will also remember the language.
      // So, we don't need to call storage.put() here.
    } else {
      storage.put(key, $translate.use());
    }
  };

  fallbackFromIncorrectStorageValue.displayName = 'fallbackFromIncorrectStorageValue';

  if (storage) {
    if (!storage.get(key)) {
      fallbackFromIncorrectStorageValue();
    } else {
      $translate.use(storage.get(key))['catch'](fallbackFromIncorrectStorageValue);
    }
  } else if (angular.isString($translate.preferredLanguage())) {
    $translate.use($translate.preferredLanguage());
  }
}

runTranslate.displayName = 'runTranslate';

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateSanitizationProvider
 *
 * @description
 *
 * Configurations for $translateSanitization
 */
angular.module('pascalprecht.translate').provider('$translateSanitization', $translateSanitizationProvider);

function $translateSanitizationProvider () {

  'use strict';

  var $sanitize,
      $sce,
      currentStrategy = null, // TODO change to either 'sanitize', 'escape' or ['sanitize', 'escapeParameters'] in 3.0.
      hasConfiguredStrategy = false,
      hasShownNoStrategyConfiguredWarning = false,
      strategies;

  /**
   * Definition of a sanitization strategy function
   * @callback StrategyFunction
   * @param {string|object} value - value to be sanitized (either a string or an interpolated value map)
   * @param {string} mode - either 'text' for a string (translation) or 'params' for the interpolated params
   * @return {string|object}
   */

  /**
   * @ngdoc property
   * @name strategies
   * @propertyOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Following strategies are built-in:
   * <dl>
   *   <dt>sanitize</dt>
   *   <dd>Sanitizes HTML in the translation text using $sanitize</dd>
   *   <dt>escape</dt>
   *   <dd>Escapes HTML in the translation</dd>
   *   <dt>sanitizeParameters</dt>
   *   <dd>Sanitizes HTML in the values of the interpolation parameters using $sanitize</dd>
   *   <dt>escapeParameters</dt>
   *   <dd>Escapes HTML in the values of the interpolation parameters</dd>
   *   <dt>escaped</dt>
   *   <dd>Support legacy strategy name 'escaped' for backwards compatibility (will be removed in 3.0)</dd>
   * </dl>
   *
   */

  strategies = {
    sanitize: function (value, mode/*, context*/) {
      if (mode === 'text') {
        value = htmlSanitizeValue(value);
      }
      return value;
    },
    escape: function (value, mode/*, context*/) {
      if (mode === 'text') {
        value = htmlEscapeValue(value);
      }
      return value;
    },
    sanitizeParameters: function (value, mode/*, context*/) {
      if (mode === 'params') {
        value = mapInterpolationParameters(value, htmlSanitizeValue);
      }
      return value;
    },
    escapeParameters: function (value, mode/*, context*/) {
      if (mode === 'params') {
        value = mapInterpolationParameters(value, htmlEscapeValue);
      }
      return value;
    },
    sce: function (value, mode, context) {
      if (mode === 'text') {
        value = htmlTrustValue(value);
      } else if (mode === 'params') {
        if (context !== 'filter') {
          // do html escape in filter context #1101
          value = mapInterpolationParameters(value, htmlEscapeValue);
        }
      }
      return value;
    },
    sceParameters: function (value, mode/*, context*/) {
      if (mode === 'params') {
        value = mapInterpolationParameters(value, htmlTrustValue);
      }
      return value;
    }
  };
  // Support legacy strategy name 'escaped' for backwards compatibility.
  // TODO should be removed in 3.0
  strategies.escaped = strategies.escapeParameters;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#addStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Adds a sanitization strategy to the list of known strategies.
   *
   * @param {string} strategyName - unique key for a strategy
   * @param {StrategyFunction} strategyFunction - strategy function
   * @returns {object} this
   */
  this.addStrategy = function (strategyName, strategyFunction) {
    strategies[strategyName] = strategyFunction;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#removeStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Removes a sanitization strategy from the list of known strategies.
   *
   * @param {string} strategyName - unique key for a strategy
   * @returns {object} this
   */
  this.removeStrategy = function (strategyName) {
    delete strategies[strategyName];
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#useStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Selects a sanitization strategy. When an array is provided the strategies will be executed in order.
   *
   * @param {string|StrategyFunction|array} strategy The sanitization strategy / strategies which should be used. Either a name of an existing strategy, a custom strategy function, or an array consisting of multiple names and / or custom functions.
   * @returns {object} this
   */
  this.useStrategy = function (strategy) {
    hasConfiguredStrategy = true;
    currentStrategy = strategy;
    return this;
  };

  /**
   * @ngdoc object
   * @name pascalprecht.translate.$translateSanitization
   * @requires $injector
   * @requires $log
   *
   * @description
   * Sanitizes interpolation parameters and translated texts.
   *
   */
  this.$get = ['$injector', '$log', function ($injector, $log) {

    var cachedStrategyMap = {};

    var applyStrategies = function (value, mode, context, selectedStrategies) {
      angular.forEach(selectedStrategies, function (selectedStrategy) {
        if (angular.isFunction(selectedStrategy)) {
          value = selectedStrategy(value, mode, context);
        } else if (angular.isFunction(strategies[selectedStrategy])) {
          value = strategies[selectedStrategy](value, mode, context);
        } else if (angular.isString(strategies[selectedStrategy])) {
          if (!cachedStrategyMap[strategies[selectedStrategy]]) {
            try {
              cachedStrategyMap[strategies[selectedStrategy]] = $injector.get(strategies[selectedStrategy]);
            } catch (e) {
              cachedStrategyMap[strategies[selectedStrategy]] = function() {};
              throw new Error('pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: \'' + selectedStrategy + '\'');
            }
          }
          value = cachedStrategyMap[strategies[selectedStrategy]](value, mode, context);
        } else {
          throw new Error('pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: \'' + selectedStrategy + '\'');
        }
      });
      return value;
    };

    // TODO: should be removed in 3.0
    var showNoStrategyConfiguredWarning = function () {
      if (!hasConfiguredStrategy && !hasShownNoStrategyConfiguredWarning) {
        $log.warn('pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details.');
        hasShownNoStrategyConfiguredWarning = true;
      }
    };

    if ($injector.has('$sanitize')) {
      $sanitize = $injector.get('$sanitize');
    }
    if ($injector.has('$sce')) {
      $sce = $injector.get('$sce');
    }

    return {
      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translateSanitization#useStrategy
       * @methodOf pascalprecht.translate.$translateSanitization
       *
       * @description
       * Selects a sanitization strategy. When an array is provided the strategies will be executed in order.
       *
       * @param {string|StrategyFunction|array} strategy The sanitization strategy / strategies which should be used. Either a name of an existing strategy, a custom strategy function, or an array consisting of multiple names and / or custom functions.
       */
      useStrategy: (function (self) {
        return function (strategy) {
          self.useStrategy(strategy);
        };
      })(this),

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translateSanitization#sanitize
       * @methodOf pascalprecht.translate.$translateSanitization
       *
       * @description
       * Sanitizes a value.
       *
       * @param {string|object} value The value which should be sanitized.
       * @param {string} mode The current sanitization mode, either 'params' or 'text'.
       * @param {string|StrategyFunction|array} [strategy] Optional custom strategy which should be used instead of the currently selected strategy.
       * @param {string} [context] The context of this call: filter, service. Default is service
       * @returns {string|object} sanitized value
       */
      sanitize: function (value, mode, strategy, context) {
        if (!currentStrategy) {
          showNoStrategyConfiguredWarning();
        }

        if (!strategy && strategy !== null) {
          strategy = currentStrategy;
        }

        if (!strategy) {
          return value;
        }

        if (!context) {
          context = 'service';
        }

        var selectedStrategies = angular.isArray(strategy) ? strategy : [strategy];
        return applyStrategies(value, mode, context, selectedStrategies);
      }
    };
  }];

  var htmlEscapeValue = function (value) {
    var element = angular.element('<div></div>');
    element.text(value); // not chainable, see #1044
    return element.html();
  };

  var htmlSanitizeValue = function (value) {
    if (!$sanitize) {
      throw new Error('pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as \'escape\'.');
    }
    return $sanitize(value);
  };

  var htmlTrustValue = function (value) {
    if (!$sce) {
      throw new Error('pascalprecht.translate.$translateSanitization: Error cannot find $sce service.');
    }
    return $sce.trustAsHtml(value);
  };

  var mapInterpolationParameters = function (value, iteratee, stack) {
    if (angular.isDate(value)) {
      return value;
    } else if (angular.isObject(value)) {
      var result = angular.isArray(value) ? [] : {};

      if (!stack) {
        stack = [];
      } else {
        if (stack.indexOf(value) > -1) {
          throw new Error('pascalprecht.translate.$translateSanitization: Error cannot interpolate parameter due recursive object');
        }
      }

      stack.push(value);
      angular.forEach(value, function (propertyValue, propertyKey) {

        /* Skipping function properties. */
        if (angular.isFunction(propertyValue)) {
          return;
        }

        result[propertyKey] = mapInterpolationParameters(propertyValue, iteratee, stack);
      });
      stack.splice(-1, 1); // remove last

      return result;
    } else if (angular.isNumber(value)) {
      return value;
    } else if (value === true || value === false) {
      return value;
    } else if (!angular.isUndefined(value) && value !== null) {
      return iteratee(value);
    } else {
      return value;
    }
  };
}

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateProvider
 * @description
 *
 * $translateProvider allows developers to register translation-tables, asynchronous loaders
 * and similar to configure translation behavior directly inside of a module.
 *
 */
angular.module('pascalprecht.translate')
  .constant('pascalprechtTranslateOverrider', {})
  .provider('$translate', $translate);

function $translate($STORAGE_KEY, $windowProvider, $translateSanitizationProvider, pascalprechtTranslateOverrider) {

  'use strict';

  var $translationTable = {},
    $preferredLanguage,
    $availableLanguageKeys = [],
    $languageKeyAliases,
    $fallbackLanguage,
    $fallbackWasString,
    $uses,
    $nextLang,
    $storageFactory,
    $storageKey = $STORAGE_KEY,
    $storagePrefix,
    $missingTranslationHandlerFactory,
    $interpolationFactory,
    $interpolatorFactories = [],
    $loaderFactory,
    $cloakClassName = 'translate-cloak',
    $loaderOptions,
    $notFoundIndicatorLeft,
    $notFoundIndicatorRight,
    $postCompilingEnabled = false,
    $forceAsyncReloadEnabled = false,
    $nestedObjectDelimeter = '.',
    $isReady = false,
    $keepContent = false,
    loaderCache,
    directivePriority = 0,
    statefulFilter = true,
    postProcessFn,
    uniformLanguageTagResolver = 'default',
    languageTagResolver = {
      'default' : function (tag) {
        return (tag || '').split('-').join('_');
      },
      java : function (tag) {
        var temp = (tag || '').split('-').join('_');
        var parts = temp.split('_');
        return parts.length > 1 ? (parts[0].toLowerCase() + '_' + parts[1].toUpperCase()) : temp;
      },
      bcp47 : function (tag) {
        var temp = (tag || '').split('_').join('-');
        var parts = temp.split('-');
        return parts.length > 1 ? (parts[0].toLowerCase() + '-' + parts[1].toUpperCase()) : temp;
      },
      'iso639-1' : function (tag) {
        var temp = (tag || '').split('_').join('-');
        var parts = temp.split('-');
        return parts[0].toLowerCase();
      }
    };

  var version = '2.16.0';

  // tries to determine the browsers language
  var getFirstBrowserLanguage = function () {

    // internal purpose only
    if (angular.isFunction(pascalprechtTranslateOverrider.getLocale)) {
      return pascalprechtTranslateOverrider.getLocale();
    }

    var nav = $windowProvider.$get().navigator,
      browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
      i,
      language;

    // support for HTML 5.1 "navigator.languages"
    if (angular.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return null;
  };
  getFirstBrowserLanguage.displayName = 'angular-translate/service: getFirstBrowserLanguage';

  // tries to determine the browsers locale
  var getLocale = function () {
    var locale = getFirstBrowserLanguage() || '';
    if (languageTagResolver[uniformLanguageTagResolver]) {
      locale = languageTagResolver[uniformLanguageTagResolver](locale);
    }
    return locale;
  };
  getLocale.displayName = 'angular-translate/service: getLocale';

  /**
   * @name indexOf
   * @private
   *
   * @description
   * indexOf polyfill. Kinda sorta.
   *
   * @param {array} array Array to search in.
   * @param {string} searchElement Element to search for.
   *
   * @returns {int} Index of search element.
   */
  var indexOf = function (array, searchElement) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === searchElement) {
        return i;
      }
    }
    return -1;
  };

  /**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string} The string stripped of whitespace from both ends
   */
  var trim = function () {
    return this.toString().replace(/^\s+|\s+$/g, '');
  };

  /**
   * @name lowercase
   * @private
   *
   * @description
   * Return the lowercase string only if the type is string
   *
   * @returns {string} The string all in lowercase
   */
  var lowercase = function (string) {
    return angular.isString(string) ? string.toLowerCase() : string;
  };

  var negotiateLocale = function (preferred) {
    if (!preferred) {
      return;
    }

    var avail = [],
      locale = lowercase(preferred),
      i = 0,
      n = $availableLanguageKeys.length;

    for (; i < n; i++) {
      avail.push(lowercase($availableLanguageKeys[i]));
    }

    // Check for an exact match in our list of available keys
    i = indexOf(avail, locale);
    if (i > -1) {
      return $availableLanguageKeys[i];
    }

    if ($languageKeyAliases) {
      var alias;
      for (var langKeyAlias in $languageKeyAliases) {
        if ($languageKeyAliases.hasOwnProperty(langKeyAlias)) {
          var hasWildcardKey = false;
          var hasExactKey = Object.prototype.hasOwnProperty.call($languageKeyAliases, langKeyAlias) &&
            lowercase(langKeyAlias) === lowercase(preferred);

          if (langKeyAlias.slice(-1) === '*') {
            hasWildcardKey = lowercase(langKeyAlias.slice(0, -1)) === lowercase(preferred.slice(0, langKeyAlias.length - 1));
          }
          if (hasExactKey || hasWildcardKey) {
            alias = $languageKeyAliases[langKeyAlias];
            if (indexOf(avail, lowercase(alias)) > -1) {
              return alias;
            }
          }
        }
      }
    }

    // Check for a language code without region
    var parts = preferred.split('_');

    if (parts.length > 1 && indexOf(avail, lowercase(parts[0])) > -1) {
      return parts[0];
    }

    // If everything fails, return undefined.
    return;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translations
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a new translation table for specific language key.
   *
   * To register a translation table for specific language, pass a defined language
   * key as first parameter.
   *
   * <pre>
   *  // register translation table for language: 'de_DE'
   *  $translateProvider.translations('de_DE', {
   *    'GREETING': 'Hallo Welt!'
   *  });
   *
   *  // register another one
   *  $translateProvider.translations('en_US', {
   *    'GREETING': 'Hello world!'
   *  });
   * </pre>
   *
   * When registering multiple translation tables for for the same language key,
   * the actual translation table gets extended. This allows you to define module
   * specific translation which only get added, once a specific module is loaded in
   * your app.
   *
   * Invoking this method with no arguments returns the translation table which was
   * registered with no language key. Invoking it with a language key returns the
   * related translation table.
   *
   * @param {string} langKey A language key.
   * @param {object} translationTable A plain old JavaScript object that represents a translation table.
   *
   */
  var translations = function (langKey, translationTable) {

    if (!langKey && !translationTable) {
      return $translationTable;
    }

    if (langKey && !translationTable) {
      if (angular.isString(langKey)) {
        return $translationTable[langKey];
      }
    } else {
      if (!angular.isObject($translationTable[langKey])) {
        $translationTable[langKey] = {};
      }
      angular.extend($translationTable[langKey], flatObject(translationTable));
    }
    return this;
  };

  this.translations = translations;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#cloakClassName
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the class name for `translate-cloak` directive.
   * Default class name is `translate-cloak`.
   *
   * @param {string} name translate-cloak class name
   */
  this.cloakClassName = function (name) {
    if (!name) {
      return $cloakClassName;
    }
    $cloakClassName = name;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#nestedObjectDelimeter
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the delimiter for namespaced translations.
   * Default delimiter is `.`.
   *
   * @param {string} delimiter namespace separator
   */
  this.nestedObjectDelimeter = function (delimiter) {
    if (!delimiter) {
      return $nestedObjectDelimeter;
    }
    $nestedObjectDelimeter = delimiter;
    return this;
  };

  /**
   * @name flatObject
   * @private
   *
   * @description
   * Flats an object. This function is used to flatten given translation data with
   * namespaces, so they are later accessible via dot notation.
   */
  var flatObject = function (data, path, result, prevKey) {
    var key, keyWithPath, keyWithShortPath, val;

    if (!path) {
      path = [];
    }
    if (!result) {
      result = {};
    }
    for (key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue;
      }
      val = data[key];
      if (angular.isObject(val)) {
        flatObject(val, path.concat(key), result, key);
      } else {
        keyWithPath = path.length ? ('' + path.join($nestedObjectDelimeter) + $nestedObjectDelimeter + key) : key;
        if (path.length && key === prevKey) {
          // Create shortcut path (foo.bar == foo.bar.bar)
          keyWithShortPath = '' + path.join($nestedObjectDelimeter);
          // Link it to original path
          result[keyWithShortPath] = '@:' + keyWithPath;
        }
        result[keyWithPath] = val;
      }
    }
    return result;
  };
  flatObject.displayName = 'flatObject';

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#addInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Adds interpolation services to angular-translate, so it can manage them.
   *
   * @param {object} factory Interpolation service factory
   */
  this.addInterpolation = function (factory) {
    $interpolatorFactories.push(factory);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMessageFormatInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use interpolation functionality of messageformat.js.
   * This is useful when having high level pluralization and gender selection.
   */
  this.useMessageFormatInterpolation = function () {
    return this.useInterpolation('$translateMessageFormatInterpolation');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which interpolation style to use as default, application-wide.
   * Simply pass a factory/service name. The interpolation service has to implement
   * the correct interface.
   *
   * @param {string} factory Interpolation service name.
   */
  this.useInterpolation = function (factory) {
    $interpolationFactory = factory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useSanitizeStrategy
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Simply sets a sanitation strategy type.
   *
   * @param {string} value Strategy type.
   */
  this.useSanitizeValueStrategy = function (value) {
    $translateSanitizationProvider.useStrategy(value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#preferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use for translation
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **prefer**.
   * It is recommended to call this after {@link pascalprecht.translate.$translate#fallbackLanguage fallbackLanguage()}.
   *
   * @param {string} langKey A language key.
   */
  this.preferredLanguage = function (langKey) {
    if (langKey) {
      setupPreferredLanguage(langKey);
      return this;
    }
    return $preferredLanguage;
  };
  var setupPreferredLanguage = function (langKey) {
    if (langKey) {
      $preferredLanguage = langKey;
    }
    return $preferredLanguage;
  };
  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicator
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found. E.g. when
   * setting the indicator as 'X' and one tries to translate a translation id
   * called `NOT_FOUND`, this will result in `X NOT_FOUND X`.
   *
   * Internally this methods sets a left indicator and a right indicator using
   * `$translateProvider.translationNotFoundIndicatorLeft()` and
   * `$translateProvider.translationNotFoundIndicatorRight()`.
   *
   * **Note**: These methods automatically add a whitespace between the indicators
   * and the translation id.
   *
   * @param {string} indicator An indicator, could be any string.
   */
  this.translationNotFoundIndicator = function (indicator) {
    this.translationNotFoundIndicatorLeft(indicator);
    this.translationNotFoundIndicatorRight(indicator);
    return this;
  };

  /**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found left to the
   * translation id.
   *
   * @param {string} indicator An indicator.
   */
  this.translationNotFoundIndicatorLeft = function (indicator) {
    if (!indicator) {
      return $notFoundIndicatorLeft;
    }
    $notFoundIndicatorLeft = indicator;
    return this;
  };

  /**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found right to the
   * translation id.
   *
   * @param {string} indicator An indicator.
   */
  this.translationNotFoundIndicatorRight = function (indicator) {
    if (!indicator) {
      return $notFoundIndicatorRight;
    }
    $notFoundIndicatorRight = indicator;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#fallbackLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use when missing translations
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **fallback**.
   *
   * @param {string||array} langKey A language key.
   *
   */
  this.fallbackLanguage = function (langKey) {
    fallbackStack(langKey);
    return this;
  };

  var fallbackStack = function (langKey) {
    if (langKey) {
      if (angular.isString(langKey)) {
        $fallbackWasString = true;
        $fallbackLanguage = [langKey];
      } else if (angular.isArray(langKey)) {
        $fallbackWasString = false;
        $fallbackLanguage = langKey;
      }
      if (angular.isString($preferredLanguage) && indexOf($fallbackLanguage, $preferredLanguage) < 0) {
        $fallbackLanguage.push($preferredLanguage);
      }

      return this;
    } else {
      if ($fallbackWasString) {
        return $fallbackLanguage[0];
      } else {
        return $fallbackLanguage;
      }
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#use
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Set which translation table to use for translation by given language key. When
   * trying to 'use' a language which isn't provided, it'll throw an error.
   *
   * You actually don't have to use this method since `$translateProvider#preferredLanguage`
   * does the job too.
   *
   * @param {string} langKey A language key.
   */
  this.use = function (langKey) {
    if (langKey) {
      if (!$translationTable[langKey] && (!$loaderFactory)) {
        // only throw an error, when not loading translation data asynchronously
        throw new Error('$translateProvider couldn\'t find translationTable for langKey: \'' + langKey + '\'');
      }
      $uses = langKey;
      return this;
    }
    return $uses;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#resolveClientLocale
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * This returns the current browser/client's language key. The result is processed with the configured uniform tag resolver.
   *
   * @returns {string} the current client/browser language key
   */
  this.resolveClientLocale = function () {
    return getLocale();
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storageKey
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which key must represent the choosed language by a user in the storage.
   *
   * @param {string} key A key for the storage.
   */
  var storageKey = function (key) {
    if (!key) {
      if ($storagePrefix) {
        return $storagePrefix + $storageKey;
      }
      return $storageKey;
    }
    $storageKey = key;
    return this;
  };

  this.storageKey = storageKey;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useUrlLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateUrlLoader` extension service as loader.
   *
   * @param {string} url Url
   * @param {Object=} options Optional configuration object
   */
  this.useUrlLoader = function (url, options) {
    return this.useLoader('$translateUrlLoader', angular.extend({url : url}, options));
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStaticFilesLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateStaticFilesLoader` extension service as loader.
   *
   * @param {Object=} options Optional configuration object
   */
  this.useStaticFilesLoader = function (options) {
    return this.useLoader('$translateStaticFilesLoader', options);
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use any other service as loader.
   *
   * @param {string} loaderFactory Factory name to use
   * @param {Object=} options Optional configuration object
   */
  this.useLoader = function (loaderFactory, options) {
    $loaderFactory = loaderFactory;
    $loaderOptions = options || {};
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLocalStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateLocalStorage` service as storage layer.
   *
   */
  this.useLocalStorage = function () {
    return this.useStorage('$translateLocalStorage');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useCookieStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateCookieStorage` service as storage layer.
   */
  this.useCookieStorage = function () {
    return this.useStorage('$translateCookieStorage');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use custom service as storage layer.
   */
  this.useStorage = function (storageFactory) {
    $storageFactory = storageFactory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storagePrefix
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets prefix for storage key.
   *
   * @param {string} prefix Storage key prefix
   */
  this.storagePrefix = function (prefix) {
    if (!prefix) {
      return prefix;
    }
    $storagePrefix = prefix;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandlerLog
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use built-in log handler when trying to translate
   * a translation Id which doesn't exist.
   *
   * This is actually a shortcut method for `useMissingTranslationHandler()`.
   *
   */
  this.useMissingTranslationHandlerLog = function () {
    return this.useMissingTranslationHandler('$translateMissingTranslationHandlerLog');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandler
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Expects a factory name which later gets instantiated with `$injector`.
   * This method can be used to tell angular-translate to use a custom
   * missingTranslationHandler. Just build a factory which returns a function
   * and expects a translation id as argument.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.useMissingTranslationHandler('customHandler');
   *  });
   *
   *  app.factory('customHandler', function (dep1, dep2) {
   *    return function (translationId) {
   *      // something with translationId and dep1 and dep2
   *    };
   *  });
   * </pre>
   *
   * @param {string} factory Factory name
   */
  this.useMissingTranslationHandler = function (factory) {
    $missingTranslationHandlerFactory = factory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#usePostCompiling
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If post compiling is enabled, all translated values will be processed
   * again with AngularJS' $compile.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.usePostCompiling(true);
   *  });
   * </pre>
   *
   * @param {string} factory Factory name
   */
  this.usePostCompiling = function (value) {
    $postCompilingEnabled = !(!value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#forceAsyncReload
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If force async reload is enabled, async loader will always be called
   * even if $translationTable already contains the language key, adding
   * possible new entries to the $translationTable.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.forceAsyncReload(true);
   *  });
   * </pre>
   *
   * @param {boolean} value - valid values are true or false
   */
  this.forceAsyncReload = function (value) {
    $forceAsyncReloadEnabled = !(!value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#uniformLanguageTag
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which language tag should be used as a result when determining
   * the current browser language.
   *
   * This setting must be set before invoking {@link pascalprecht.translate.$translateProvider#methods_determinePreferredLanguage determinePreferredLanguage()}.
   *
   * <pre>
   * $translateProvider
   *   .uniformLanguageTag('bcp47')
   *   .determinePreferredLanguage()
   * </pre>
   *
   * The resolver currently supports:
   * * default
   *     (traditionally: hyphens will be converted into underscores, i.e. en-US => en_US)
   *     en-US => en_US
   *     en_US => en_US
   *     en-us => en_us
   * * java
   *     like default, but the second part will be always in uppercase
   *     en-US => en_US
   *     en_US => en_US
   *     en-us => en_US
   * * BCP 47 (RFC 4646 & 4647)
   *     en-US => en-US
   *     en_US => en-US
   *     en-us => en-US
   *
   * See also:
   * * http://en.wikipedia.org/wiki/IETF_language_tag
   * * http://www.w3.org/International/core/langtags/
   * * http://tools.ietf.org/html/bcp47
   *
   * @param {string|object} options - options (or standard)
   * @param {string} options.standard - valid values are 'default', 'bcp47', 'java'
   */
  this.uniformLanguageTag = function (options) {

    if (!options) {
      options = {};
    } else if (angular.isString(options)) {
      options = {
        standard : options
      };
    }

    uniformLanguageTagResolver = options.standard;

    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#determinePreferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to try to determine on its own which language key
   * to set as preferred language. When `fn` is given, angular-translate uses it
   * to determine a language key, otherwise it uses the built-in `getLocale()`
   * method.
   *
   * The `getLocale()` returns a language key in the format `[lang]_[country]` or
   * `[lang]` depending on what the browser provides.
   *
   * Use this method at your own risk, since not all browsers return a valid
   * locale (see {@link pascalprecht.translate.$translateProvider#methods_uniformLanguageTag uniformLanguageTag()}).
   *
   * @param {Function=} fn Function to determine a browser's locale
   */
  this.determinePreferredLanguage = function (fn) {

    var locale = (fn && angular.isFunction(fn)) ? fn() : getLocale();

    if (!$availableLanguageKeys.length) {
      $preferredLanguage = locale;
    } else {
      $preferredLanguage = negotiateLocale(locale) || locale;
    }

    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#registerAvailableLanguageKeys
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a set of language keys the app will work with. Use this method in
   * combination with
   * {@link pascalprecht.translate.$translateProvider#determinePreferredLanguage determinePreferredLanguage}.
   * When available languages keys are registered, angular-translate
   * tries to find the best fitting language key depending on the browsers locale,
   * considering your language key convention.
   *
   * @param {object} languageKeys Array of language keys the your app will use
   * @param {object=} aliases Alias map.
   */
  this.registerAvailableLanguageKeys = function (languageKeys, aliases) {
    if (languageKeys) {
      $availableLanguageKeys = languageKeys;
      if (aliases) {
        $languageKeyAliases = aliases;
      }
      return this;
    }
    return $availableLanguageKeys;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoaderCache
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a cache for internal $http based loaders.
   * {@link pascalprecht.translate.$translationCache $translationCache}.
   * When false the cache will be disabled (default). When true or undefined
   * the cache will be a default (see $cacheFactory). When an object it will
   * be treat as a cache object itself: the usage is $http({cache: cache})
   *
   * @param {object} cache boolean, string or cache-object
   */
  this.useLoaderCache = function (cache) {
    if (cache === false) {
      // disable cache
      loaderCache = undefined;
    } else if (cache === true) {
      // enable cache using AJS defaults
      loaderCache = true;
    } else if (typeof(cache) === 'undefined') {
      // enable cache using default
      loaderCache = '$translationCache';
    } else if (cache) {
      // enable cache using given one (see $cacheFactory)
      loaderCache = cache;
    }
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#directivePriority
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets the default priority of the translate directive. The standard value is `0`.
   * Calling this function without an argument will return the current value.
   *
   * @param {number} priority for the translate-directive
   */
  this.directivePriority = function (priority) {
    if (priority === undefined) {
      // getter
      return directivePriority;
    } else {
      // setter with chaining
      directivePriority = priority;
      return this;
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#statefulFilter
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Since AngularJS 1.3, filters which are not stateless (depending at the scope)
   * have to explicit define this behavior.
   * Sets whether the translate filter should be stateful or stateless. The standard value is `true`
   * meaning being stateful.
   * Calling this function without an argument will return the current value.
   *
   * @param {boolean} state - defines the state of the filter
   */
  this.statefulFilter = function (state) {
    if (state === undefined) {
      // getter
      return statefulFilter;
    } else {
      // setter with chaining
      statefulFilter = state;
      return this;
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#postProcess
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * The post processor will be intercept right after the translation result. It can modify the result.
   *
   * @param {object} fn Function or service name (string) to be called after the translation value has been set / resolved. The function itself will enrich every value being processed and then continue the normal resolver process
   */
  this.postProcess = function (fn) {
    if (fn) {
      postProcessFn = fn;
    } else {
      postProcessFn = undefined;
    }
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#keepContent
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If keepContent is set to true than translate directive will always use innerHTML
   * as a default translation
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.keepContent(true);
   *  });
   * </pre>
   *
   * @param {boolean} value - valid values are true or false
   */
  this.keepContent = function (value) {
    $keepContent = !(!value);
    return this;
  };

  /**
   * @ngdoc object
   * @name pascalprecht.translate.$translate
   * @requires $interpolate
   * @requires $log
   * @requires $rootScope
   * @requires $q
   *
   * @description
   * The `$translate` service is the actual core of angular-translate. It expects a translation id
   * and optional interpolate parameters to translate contents.
   *
   * <pre>
   *  $translate('HEADLINE_TEXT').then(function (translation) {
   *    $scope.translatedText = translation;
   *  });
   * </pre>
   *
   * @param {string|array} translationId A token which represents a translation id
   *                                     This can be optionally an array of translation ids which
   *                                     results that the function returns an object where each key
   *                                     is the translation id and the value the translation.
   * @param {object=} [interpolateParams={}] An object hash for dynamic values
   * @param {string=} [interpolationId=undefined] The id of the interpolation to use (use default unless set via useInterpolation())
   * @param {string=} [defaultTranslationText=undefined] the optional default translation text that is written as
   *                                        as default text in case it is not found in any configured language
   * @param {string=} [forceLanguage=false] A language to be used instead of the current language
   * @param {string=} [sanitizeStrategy=undefined] force sanitize strategy for this call instead of using the configured one (use default unless set)
   * @returns {object} promise
   */
  this.$get = ['$log', '$injector', '$rootScope', '$q', function ($log, $injector, $rootScope, $q) {

    var Storage,
      defaultInterpolator = $injector.get($interpolationFactory || '$translateDefaultInterpolation'),
      pendingLoader = false,
      interpolatorHashMap = {},
      langPromises = {},
      fallbackIndex,
      startFallbackIteration;

    var $translate = function (translationId, interpolateParams, interpolationId, defaultTranslationText, forceLanguage, sanitizeStrategy) {
      if (!$uses && $preferredLanguage) {
        $uses = $preferredLanguage;
      }
      var uses = (forceLanguage && forceLanguage !== $uses) ? // we don't want to re-negotiate $uses
        (negotiateLocale(forceLanguage) || forceLanguage) : $uses;

      // Check forceLanguage is present
      if (forceLanguage) {
        loadTranslationsIfMissing(forceLanguage);
      }

      // Duck detection: If the first argument is an array, a bunch of translations was requested.
      // The result is an object.
      if (angular.isArray(translationId)) {
        // Inspired by Q.allSettled by Kris Kowal
        // https://github.com/kriskowal/q/blob/b0fa72980717dc202ffc3cbf03b936e10ebbb9d7/q.js#L1553-1563
        // This transforms all promises regardless resolved or rejected
        var translateAll = function (translationIds) {
          var results = {}; // storing the actual results
          var promises = []; // promises to wait for
          // Wraps the promise a) being always resolved and b) storing the link id->value
          var translate = function (translationId) {
            var deferred = $q.defer();
            var regardless = function (value) {
              results[translationId] = value;
              deferred.resolve([translationId, value]);
            };
            // we don't care whether the promise was resolved or rejected; just store the values
            $translate(translationId, interpolateParams, interpolationId, defaultTranslationText, forceLanguage, sanitizeStrategy).then(regardless, regardless);
            return deferred.promise;
          };
          for (var i = 0, c = translationIds.length; i < c; i++) {
            promises.push(translate(translationIds[i]));
          }
          // wait for all (including storing to results)
          return $q.all(promises).then(function () {
            // return the results
            return results;
          });
        };
        return translateAll(translationId);
      }

      var deferred = $q.defer();

      // trim off any whitespace
      if (translationId) {
        translationId = trim.apply(translationId);
      }

      var promiseToWaitFor = (function () {
        var promise = langPromises[uses] || langPromises[$preferredLanguage];

        fallbackIndex = 0;

        if ($storageFactory && !promise) {
          // looks like there's no pending promise for $preferredLanguage or
          // $uses. Maybe there's one pending for a language that comes from
          // storage.
          var langKey = Storage.get($storageKey);
          promise = langPromises[langKey];

          if ($fallbackLanguage && $fallbackLanguage.length) {
            var index = indexOf($fallbackLanguage, langKey);
            // maybe the language from storage is also defined as fallback language
            // we increase the fallback language index to not search in that language
            // as fallback, since it's probably the first used language
            // in that case the index starts after the first element
            fallbackIndex = (index === 0) ? 1 : 0;

            // but we can make sure to ALWAYS fallback to preferred language at least
            if (indexOf($fallbackLanguage, $preferredLanguage) < 0) {
              $fallbackLanguage.push($preferredLanguage);
            }
          }
        }
        return promise;
      }());

      if (!promiseToWaitFor) {
        // no promise to wait for? okay. Then there's no loader registered
        // nor is a one pending for language that comes from storage.
        // We can just translate.
        determineTranslation(translationId, interpolateParams, interpolationId, defaultTranslationText, uses, sanitizeStrategy).then(deferred.resolve, deferred.reject);
      } else {
        var promiseResolved = function () {
          // $uses may have changed while waiting
          if (!forceLanguage) {
            uses = $uses;
          }
          determineTranslation(translationId, interpolateParams, interpolationId, defaultTranslationText, uses, sanitizeStrategy).then(deferred.resolve, deferred.reject);
        };
        promiseResolved.displayName = 'promiseResolved';

        promiseToWaitFor['finally'](promiseResolved)['catch'](angular.noop); // we don't care about errors here, already handled
      }
      return deferred.promise;
    };

    /**
     * @name applyNotFoundIndicators
     * @private
     *
     * @description
     * Applies not fount indicators to given translation id, if needed.
     * This function gets only executed, if a translation id doesn't exist,
     * which is why a translation id is expected as argument.
     *
     * @param {string} translationId Translation id.
     * @returns {string} Same as given translation id but applied with not found
     * indicators.
     */
    var applyNotFoundIndicators = function (translationId) {
      // applying notFoundIndicators
      if ($notFoundIndicatorLeft) {
        translationId = [$notFoundIndicatorLeft, translationId].join(' ');
      }
      if ($notFoundIndicatorRight) {
        translationId = [translationId, $notFoundIndicatorRight].join(' ');
      }
      return translationId;
    };

    /**
     * @name useLanguage
     * @private
     *
     * @description
     * Makes actual use of a language by setting a given language key as used
     * language and informs registered interpolators to also use the given
     * key as locale.
     *
     * @param {string} key Locale key.
     */
    var useLanguage = function (key) {
      $uses = key;

      // make sure to store new language key before triggering success event
      if ($storageFactory) {
        Storage.put($translate.storageKey(), $uses);
      }

      $rootScope.$emit('$translateChangeSuccess', {language : key});

      // inform default interpolator
      defaultInterpolator.setLocale($uses);

      var eachInterpolator = function (interpolator, id) {
        interpolatorHashMap[id].setLocale($uses);
      };
      eachInterpolator.displayName = 'eachInterpolatorLocaleSetter';

      // inform all others too!
      angular.forEach(interpolatorHashMap, eachInterpolator);
      $rootScope.$emit('$translateChangeEnd', {language : key});
    };

    /**
     * @name loadAsync
     * @private
     *
     * @description
     * Kicks off registered async loader using `$injector` and applies existing
     * loader options. When resolved, it updates translation tables accordingly
     * or rejects with given language key.
     *
     * @param {string} key Language key.
     * @return {Promise} A promise.
     */
    var loadAsync = function (key) {
      if (!key) {
        throw 'No language key specified for loading.';
      }

      var deferred = $q.defer();

      $rootScope.$emit('$translateLoadingStart', {language : key});
      pendingLoader = true;

      var cache = loaderCache;
      if (typeof(cache) === 'string') {
        // getting on-demand instance of loader
        cache = $injector.get(cache);
      }

      var loaderOptions = angular.extend({}, $loaderOptions, {
        key : key,
        $http : angular.extend({}, {
          cache : cache
        }, $loaderOptions.$http)
      });

      var onLoaderSuccess = function (data) {
        var translationTable = {};
        $rootScope.$emit('$translateLoadingSuccess', {language : key});

        if (angular.isArray(data)) {
          angular.forEach(data, function (table) {
            angular.extend(translationTable, flatObject(table));
          });
        } else {
          angular.extend(translationTable, flatObject(data));
        }
        pendingLoader = false;
        deferred.resolve({
          key : key,
          table : translationTable
        });
        $rootScope.$emit('$translateLoadingEnd', {language : key});
      };
      onLoaderSuccess.displayName = 'onLoaderSuccess';

      var onLoaderError = function (key) {
        $rootScope.$emit('$translateLoadingError', {language : key});
        deferred.reject(key);
        $rootScope.$emit('$translateLoadingEnd', {language : key});
      };
      onLoaderError.displayName = 'onLoaderError';

      $injector.get($loaderFactory)(loaderOptions)
        .then(onLoaderSuccess, onLoaderError);

      return deferred.promise;
    };

    if ($storageFactory) {
      Storage = $injector.get($storageFactory);

      if (!Storage.get || !Storage.put) {
        throw new Error('Couldn\'t use storage \'' + $storageFactory + '\', missing get() or put() method!');
      }
    }

    // if we have additional interpolations that were added via
    // $translateProvider.addInterpolation(), we have to map'em
    if ($interpolatorFactories.length) {
      var eachInterpolationFactory = function (interpolatorFactory) {
        var interpolator = $injector.get(interpolatorFactory);
        // setting initial locale for each interpolation service
        interpolator.setLocale($preferredLanguage || $uses);
        // make'em recognizable through id
        interpolatorHashMap[interpolator.getInterpolationIdentifier()] = interpolator;
      };
      eachInterpolationFactory.displayName = 'interpolationFactoryAdder';

      angular.forEach($interpolatorFactories, eachInterpolationFactory);
    }

    /**
     * @name getTranslationTable
     * @private
     *
     * @description
     * Returns a promise that resolves to the translation table
     * or is rejected if an error occurred.
     *
     * @param langKey
     * @returns {Q.promise}
     */
    var getTranslationTable = function (langKey) {
      var deferred = $q.defer();
      if (Object.prototype.hasOwnProperty.call($translationTable, langKey)) {
        deferred.resolve($translationTable[langKey]);
      } else if (langPromises[langKey]) {
        var onResolve = function (data) {
          translations(data.key, data.table);
          deferred.resolve(data.table);
        };
        onResolve.displayName = 'translationTableResolver';
        langPromises[langKey].then(onResolve, deferred.reject);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    /**
     * @name getFallbackTranslation
     * @private
     *
     * @description
     * Returns a promise that will resolve to the translation
     * or be rejected if no translation was found for the language.
     * This function is currently only used for fallback language translation.
     *
     * @param langKey The language to translate to.
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @param sanitizeStrategy
     * @returns {Q.promise}
     */
    var getFallbackTranslation = function (langKey, translationId, interpolateParams, Interpolator, sanitizeStrategy) {
      var deferred = $q.defer();

      var onResolve = function (translationTable) {
        if (Object.prototype.hasOwnProperty.call(translationTable, translationId) && translationTable[translationId] !== null) {
          Interpolator.setLocale(langKey);
          var translation = translationTable[translationId];
          if (translation.substr(0, 2) === '@:') {
            getFallbackTranslation(langKey, translation.substr(2), interpolateParams, Interpolator, sanitizeStrategy)
              .then(deferred.resolve, deferred.reject);
          } else {
            var interpolatedValue = Interpolator.interpolate(translationTable[translationId], interpolateParams, 'service', sanitizeStrategy, translationId);
            interpolatedValue = applyPostProcessing(translationId, translationTable[translationId], interpolatedValue, interpolateParams, langKey);

            deferred.resolve(interpolatedValue);

          }
          Interpolator.setLocale($uses);
        } else {
          deferred.reject();
        }
      };
      onResolve.displayName = 'fallbackTranslationResolver';

      getTranslationTable(langKey).then(onResolve, deferred.reject);

      return deferred.promise;
    };

    /**
     * @name getFallbackTranslationInstant
     * @private
     *
     * @description
     * Returns a translation
     * This function is currently only used for fallback language translation.
     *
     * @param langKey The language to translate to.
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @param sanitizeStrategy sanitize strategy override
     *
     * @returns {string} translation
     */
    var getFallbackTranslationInstant = function (langKey, translationId, interpolateParams, Interpolator, sanitizeStrategy) {
      var result, translationTable = $translationTable[langKey];

      if (translationTable && Object.prototype.hasOwnProperty.call(translationTable, translationId) && translationTable[translationId] !== null) {
        Interpolator.setLocale(langKey);
        result = Interpolator.interpolate(translationTable[translationId], interpolateParams, 'filter', sanitizeStrategy, translationId);
        result = applyPostProcessing(translationId, translationTable[translationId], result, interpolateParams, langKey, sanitizeStrategy);
        // workaround for TrustedValueHolderType
        if (!angular.isString(result) && angular.isFunction(result.$$unwrapTrustedValue)) {
          var result2 = result.$$unwrapTrustedValue();
          if (result2.substr(0, 2) === '@:') {
            return getFallbackTranslationInstant(langKey, result2.substr(2), interpolateParams, Interpolator, sanitizeStrategy);
          }
        } else if (result.substr(0, 2) === '@:') {
          return getFallbackTranslationInstant(langKey, result.substr(2), interpolateParams, Interpolator, sanitizeStrategy);
        }
        Interpolator.setLocale($uses);
      }

      return result;
    };


    /**
     * @name translateByHandler
     * @private
     *
     * Translate by missing translation handler.
     *
     * @param translationId
     * @param interpolateParams
     * @param defaultTranslationText
     * @param sanitizeStrategy sanitize strategy override
     *
     * @returns translation created by $missingTranslationHandler or translationId is $missingTranslationHandler is
     * absent
     */
    var translateByHandler = function (translationId, interpolateParams, defaultTranslationText, sanitizeStrategy) {
      // If we have a handler factory - we might also call it here to determine if it provides
      // a default text for a translationid that can't be found anywhere in our tables
      if ($missingTranslationHandlerFactory) {
        return $injector.get($missingTranslationHandlerFactory)(translationId, $uses, interpolateParams, defaultTranslationText, sanitizeStrategy);
      } else {
        return translationId;
      }
    };

    /**
     * @name resolveForFallbackLanguage
     * @private
     *
     * Recursive helper function for fallbackTranslation that will sequentially look
     * for a translation in the fallbackLanguages starting with fallbackLanguageIndex.
     *
     * @param fallbackLanguageIndex
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @param defaultTranslationText
     * @param sanitizeStrategy
     * @returns {Q.promise} Promise that will resolve to the translation.
     */
    var resolveForFallbackLanguage = function (fallbackLanguageIndex, translationId, interpolateParams, Interpolator, defaultTranslationText, sanitizeStrategy) {
      var deferred = $q.defer();

      if (fallbackLanguageIndex < $fallbackLanguage.length) {
        var langKey = $fallbackLanguage[fallbackLanguageIndex];
        getFallbackTranslation(langKey, translationId, interpolateParams, Interpolator, sanitizeStrategy).then(
          function (data) {
            deferred.resolve(data);
          },
          function () {
            // Look in the next fallback language for a translation.
            // It delays the resolving by passing another promise to resolve.
            return resolveForFallbackLanguage(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator, defaultTranslationText, sanitizeStrategy).then(deferred.resolve, deferred.reject);
          }
        );
      } else {
        // No translation found in any fallback language
        // if a default translation text is set in the directive, then return this as a result
        if (defaultTranslationText) {
          deferred.resolve(defaultTranslationText);
        } else {
          var missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams, defaultTranslationText);

          // if no default translation is set and an error handler is defined, send it to the handler
          // and then return the result if it isn't undefined
          if ($missingTranslationHandlerFactory && missingTranslationHandlerTranslation) {
            deferred.resolve(missingTranslationHandlerTranslation);
          } else {
            deferred.reject(applyNotFoundIndicators(translationId));
          }
        }
      }
      return deferred.promise;
    };

    /**
     * @name resolveForFallbackLanguageInstant
     * @private
     *
     * Recursive helper function for fallbackTranslation that will sequentially look
     * for a translation in the fallbackLanguages starting with fallbackLanguageIndex.
     *
     * @param fallbackLanguageIndex
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @param sanitizeStrategy
     * @returns {string} translation
     */
    var resolveForFallbackLanguageInstant = function (fallbackLanguageIndex, translationId, interpolateParams, Interpolator, sanitizeStrategy) {
      var result;

      if (fallbackLanguageIndex < $fallbackLanguage.length) {
        var langKey = $fallbackLanguage[fallbackLanguageIndex];
        result = getFallbackTranslationInstant(langKey, translationId, interpolateParams, Interpolator, sanitizeStrategy);
        if (!result && result !== '') {
          result = resolveForFallbackLanguageInstant(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator);
        }
      }
      return result;
    };

    /**
     * Translates with the usage of the fallback languages.
     *
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @param defaultTranslationText
     * @param sanitizeStrategy
     * @returns {Q.promise} Promise, that resolves to the translation.
     */
    var fallbackTranslation = function (translationId, interpolateParams, Interpolator, defaultTranslationText, sanitizeStrategy) {
      // Start with the fallbackLanguage with index 0
      return resolveForFallbackLanguage((startFallbackIteration > 0 ? startFallbackIteration : fallbackIndex), translationId, interpolateParams, Interpolator, defaultTranslationText, sanitizeStrategy);
    };

    /**
     * Translates with the usage of the fallback languages.
     *
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @param sanitizeStrategy
     * @returns {String} translation
     */
    var fallbackTranslationInstant = function (translationId, interpolateParams, Interpolator, sanitizeStrategy) {
      // Start with the fallbackLanguage with index 0
      return resolveForFallbackLanguageInstant((startFallbackIteration > 0 ? startFallbackIteration : fallbackIndex), translationId, interpolateParams, Interpolator, sanitizeStrategy);
    };

    var determineTranslation = function (translationId, interpolateParams, interpolationId, defaultTranslationText, uses, sanitizeStrategy) {

      var deferred = $q.defer();

      var table = uses ? $translationTable[uses] : $translationTable,
        Interpolator = (interpolationId) ? interpolatorHashMap[interpolationId] : defaultInterpolator;

      // if the translation id exists, we can just interpolate it
      if (table && Object.prototype.hasOwnProperty.call(table, translationId) && table[translationId] !== null) {
        var translation = table[translationId];

        // If using link, rerun $translate with linked translationId and return it
        if (translation.substr(0, 2) === '@:') {

          $translate(translation.substr(2), interpolateParams, interpolationId, defaultTranslationText, uses, sanitizeStrategy)
            .then(deferred.resolve, deferred.reject);
        } else {
          //
          var resolvedTranslation = Interpolator.interpolate(translation, interpolateParams, 'service', sanitizeStrategy, translationId);
          resolvedTranslation = applyPostProcessing(translationId, translation, resolvedTranslation, interpolateParams, uses);
          deferred.resolve(resolvedTranslation);
        }
      } else {
        var missingTranslationHandlerTranslation;
        // for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
        if ($missingTranslationHandlerFactory && !pendingLoader) {
          missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams, defaultTranslationText);
        }

        // since we couldn't translate the inital requested translation id,
        // we try it now with one or more fallback languages, if fallback language(s) is
        // configured.
        if (uses && $fallbackLanguage && $fallbackLanguage.length) {
          fallbackTranslation(translationId, interpolateParams, Interpolator, defaultTranslationText, sanitizeStrategy)
            .then(function (translation) {
              deferred.resolve(translation);
            }, function (_translationId) {
              deferred.reject(applyNotFoundIndicators(_translationId));
            });
        } else if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
          // looks like the requested translation id doesn't exists.
          // Now, if there is a registered handler for missing translations and no
          // asyncLoader is pending, we execute the handler
          if (defaultTranslationText) {
            deferred.resolve(defaultTranslationText);
          } else {
            deferred.resolve(missingTranslationHandlerTranslation);
          }
        } else {
          if (defaultTranslationText) {
            deferred.resolve(defaultTranslationText);
          } else {
            deferred.reject(applyNotFoundIndicators(translationId));
          }
        }
      }
      return deferred.promise;
    };

    var determineTranslationInstant = function (translationId, interpolateParams, interpolationId, uses, sanitizeStrategy) {

      var result, table = uses ? $translationTable[uses] : $translationTable,
        Interpolator = defaultInterpolator;

      // if the interpolation id exists use custom interpolator
      if (interpolatorHashMap && Object.prototype.hasOwnProperty.call(interpolatorHashMap, interpolationId)) {
        Interpolator = interpolatorHashMap[interpolationId];
      }

      // if the translation id exists, we can just interpolate it
      if (table && Object.prototype.hasOwnProperty.call(table, translationId) && table[translationId] !== null) {
        var translation = table[translationId];

        // If using link, rerun $translate with linked translationId and return it
        if (translation.substr(0, 2) === '@:') {
          result = determineTranslationInstant(translation.substr(2), interpolateParams, interpolationId, uses, sanitizeStrategy);
        } else {
          result = Interpolator.interpolate(translation, interpolateParams, 'filter', sanitizeStrategy, translationId);
          result = applyPostProcessing(translationId, translation, result, interpolateParams, uses, sanitizeStrategy);
        }
      } else {
        var missingTranslationHandlerTranslation;
        // for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
        if ($missingTranslationHandlerFactory && !pendingLoader) {
          missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams, sanitizeStrategy);
        }

        // since we couldn't translate the inital requested translation id,
        // we try it now with one or more fallback languages, if fallback language(s) is
        // configured.
        if (uses && $fallbackLanguage && $fallbackLanguage.length) {
          fallbackIndex = 0;
          result = fallbackTranslationInstant(translationId, interpolateParams, Interpolator, sanitizeStrategy);
        } else if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
          // looks like the requested translation id doesn't exists.
          // Now, if there is a registered handler for missing translations and no
          // asyncLoader is pending, we execute the handler
          result = missingTranslationHandlerTranslation;
        } else {
          result = applyNotFoundIndicators(translationId);
        }
      }

      return result;
    };

    var clearNextLangAndPromise = function (key) {
      if ($nextLang === key) {
        $nextLang = undefined;
      }
      langPromises[key] = undefined;
    };

    var applyPostProcessing = function (translationId, translation, resolvedTranslation, interpolateParams, uses, sanitizeStrategy) {
      var fn = postProcessFn;

      if (fn) {

        if (typeof(fn) === 'string') {
          // getting on-demand instance
          fn = $injector.get(fn);
        }
        if (fn) {
          return fn(translationId, translation, resolvedTranslation, interpolateParams, uses, sanitizeStrategy);
        }
      }

      return resolvedTranslation;
    };

    var loadTranslationsIfMissing = function (key) {
      if (!$translationTable[key] && $loaderFactory && !langPromises[key]) {
        langPromises[key] = loadAsync(key).then(function (translation) {
          translations(translation.key, translation.table);
          return translation;
        });
      }
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#preferredLanguage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the language key for the preferred language.
     *
     * @param {string} langKey language String or Array to be used as preferredLanguage (changing at runtime)
     *
     * @return {string} preferred language key
     */
    $translate.preferredLanguage = function (langKey) {
      if (langKey) {
        setupPreferredLanguage(langKey);
      }
      return $preferredLanguage;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#cloakClassName
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the configured class name for `translate-cloak` directive.
     *
     * @return {string} cloakClassName
     */
    $translate.cloakClassName = function () {
      return $cloakClassName;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#nestedObjectDelimeter
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the configured delimiter for nested namespaces.
     *
     * @return {string} nestedObjectDelimeter
     */
    $translate.nestedObjectDelimeter = function () {
      return $nestedObjectDelimeter;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#fallbackLanguage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the language key for the fallback languages or sets a new fallback stack.
     * It is recommended to call this before {@link pascalprecht.translate.$translateProvider#preferredLanguage preferredLanguage()}.
     *
     * @param {string=} langKey language String or Array of fallback languages to be used (to change stack at runtime)
     *
     * @return {string||array} fallback language key
     */
    $translate.fallbackLanguage = function (langKey) {
      if (langKey !== undefined && langKey !== null) {
        fallbackStack(langKey);

        // as we might have an async loader initiated and a new translation language might have been defined
        // we need to add the promise to the stack also. So - iterate.
        if ($loaderFactory) {
          if ($fallbackLanguage && $fallbackLanguage.length) {
            for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
              if (!langPromises[$fallbackLanguage[i]]) {
                langPromises[$fallbackLanguage[i]] = loadAsync($fallbackLanguage[i]);
              }
            }
          }
        }
        $translate.use($translate.use());
      }
      if ($fallbackWasString) {
        return $fallbackLanguage[0];
      } else {
        return $fallbackLanguage;
      }

    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#useFallbackLanguage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Sets the first key of the fallback language stack to be used for translation.
     * Therefore all languages in the fallback array BEFORE this key will be skipped!
     *
     * @param {string=} langKey Contains the langKey the iteration shall start with. Set to false if you want to
     * get back to the whole stack
     */
    $translate.useFallbackLanguage = function (langKey) {
      if (langKey !== undefined && langKey !== null) {
        if (!langKey) {
          startFallbackIteration = 0;
        } else {
          var langKeyPosition = indexOf($fallbackLanguage, langKey);
          if (langKeyPosition > -1) {
            startFallbackIteration = langKeyPosition;
          }
        }

      }

    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#proposedLanguage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the language key of language that is currently loaded asynchronously.
     *
     * @return {string} language key
     */
    $translate.proposedLanguage = function () {
      return $nextLang;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#storage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns registered storage.
     *
     * @return {object} Storage
     */
    $translate.storage = function () {
      return Storage;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#negotiateLocale
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns a language key based on available languages and language aliases. If a
     * language key cannot be resolved, returns undefined.
     *
     * If no or a falsy key is given, returns undefined.
     *
     * @param {string} [key] Language key
     * @return {string|undefined} Language key or undefined if no language key is found.
     */
    $translate.negotiateLocale = negotiateLocale;

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#use
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Tells angular-translate which language to use by given language key. This method is
     * used to change language at runtime. It also takes care of storing the language
     * key in a configured store to let your app remember the choosed language.
     *
     * When trying to 'use' a language which isn't available it tries to load it
     * asynchronously with registered loaders.
     *
     * Returns promise object with loaded language file data or string of the currently used language.
     *
     * If no or a falsy key is given it returns the currently used language key.
     * The returned string will be ```undefined``` if setting up $translate hasn't finished.
     * @example
     * $translate.use("en_US").then(function(data){
       *   $scope.text = $translate("HELLO");
       * });
     *
     * @param {string=} key Language key
     * @return {object|string} Promise with loaded language data or the language key if a falsy param was given.
     */
    $translate.use = function (key) {
      if (!key) {
        return $uses;
      }

      var deferred = $q.defer();
      deferred.promise.then(null, angular.noop); // AJS "Possibly unhandled rejection"

      $rootScope.$emit('$translateChangeStart', {language : key});

      // Try to get the aliased language key
      var aliasedKey = negotiateLocale(key);
      // Ensure only registered language keys will be loaded
      if ($availableLanguageKeys.length > 0 && !aliasedKey) {
        return $q.reject(key);
      }

      if (aliasedKey) {
        key = aliasedKey;
      }

      // if there isn't a translation table for the language we've requested,
      // we load it asynchronously
      $nextLang = key;
      if (($forceAsyncReloadEnabled || !$translationTable[key]) && $loaderFactory && !langPromises[key]) {
        langPromises[key] = loadAsync(key).then(function (translation) {
          translations(translation.key, translation.table);
          deferred.resolve(translation.key);
          if ($nextLang === key) {
            useLanguage(translation.key);
          }
          return translation;
        }, function (key) {
          $rootScope.$emit('$translateChangeError', {language : key});
          deferred.reject(key);
          $rootScope.$emit('$translateChangeEnd', {language : key});
          return $q.reject(key);
        });
        langPromises[key]['finally'](function () {
          clearNextLangAndPromise(key);
        })['catch'](angular.noop); // we don't care about errors (clearing)
      } else if (langPromises[key]) {
        // we are already loading this asynchronously
        // resolve our new deferred when the old langPromise is resolved
        langPromises[key].then(function (translation) {
          if ($nextLang === translation.key) {
            useLanguage(translation.key);
          }
          deferred.resolve(translation.key);
          return translation;
        }, function (key) {
          // find first available fallback language if that request has failed
          if (!$uses && $fallbackLanguage && $fallbackLanguage.length > 0 && $fallbackLanguage[0] !== key) {
            return $translate.use($fallbackLanguage[0]).then(deferred.resolve, deferred.reject);
          } else {
            return deferred.reject(key);
          }
        });
      } else {
        deferred.resolve(key);
        useLanguage(key);
      }

      return deferred.promise;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#resolveClientLocale
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * This returns the current browser/client's language key. The result is processed with the configured uniform tag resolver.
     *
     * @returns {string} the current client/browser language key
     */
    $translate.resolveClientLocale = function () {
      return getLocale();
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#storageKey
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the key for the storage.
     *
     * @return {string} storage key
     */
    $translate.storageKey = function () {
      return storageKey();
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#isPostCompilingEnabled
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether post compiling is enabled or not
     *
     * @return {bool} storage key
     */
    $translate.isPostCompilingEnabled = function () {
      return $postCompilingEnabled;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#isForceAsyncReloadEnabled
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether force async reload is enabled or not
     *
     * @return {boolean} forceAsyncReload value
     */
    $translate.isForceAsyncReloadEnabled = function () {
      return $forceAsyncReloadEnabled;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#isKeepContent
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether keepContent or not
     *
     * @return {boolean} keepContent value
     */
    $translate.isKeepContent = function () {
      return $keepContent;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#refresh
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Refreshes a translation table pointed by the given langKey. If langKey is not specified,
     * the module will drop all existent translation tables and load new version of those which
     * are currently in use.
     *
     * Refresh means that the module will drop target translation table and try to load it again.
     *
     * In case there are no loaders registered the refresh() method will throw an Error.
     *
     * If the module is able to refresh translation tables refresh() method will broadcast
     * $translateRefreshStart and $translateRefreshEnd events.
     *
     * @example
     * // this will drop all currently existent translation tables and reload those which are
     * // currently in use
     * $translate.refresh();
     * // this will refresh a translation table for the en_US language
     * $translate.refresh('en_US');
     *
     * @param {string} langKey A language key of the table, which has to be refreshed
     *
     * @return {promise} Promise, which will be resolved in case a translation tables refreshing
     * process is finished successfully, and reject if not.
     */
    $translate.refresh = function (langKey) {
      if (!$loaderFactory) {
        throw new Error('Couldn\'t refresh translation table, no loader registered!');
      }

      $rootScope.$emit('$translateRefreshStart', {language : langKey});

      var deferred = $q.defer(), updatedLanguages = {};

      //private helper
      function loadNewData(languageKey) {
        var promise = loadAsync(languageKey);
        //update the load promise cache for this language
        langPromises[languageKey] = promise;
        //register a data handler for the promise
        promise.then(function (data) {
            //clear the cache for this language
            $translationTable[languageKey] = {};
            //add the new data for this language
            translations(languageKey, data.table);
            //track that we updated this language
            updatedLanguages[languageKey] = true;
          },
          //handle rejection to appease the $q validation
          angular.noop);
        return promise;
      }

      //set up post-processing
      deferred.promise.then(
        function () {
          for (var key in $translationTable) {
            if ($translationTable.hasOwnProperty(key)) {
              //delete cache entries that were not updated
              if (!(key in updatedLanguages)) {
                delete $translationTable[key];
              }
            }
          }
          if ($uses) {
            useLanguage($uses);
          }
        },
        //handle rejection to appease the $q validation
        angular.noop
      )['finally'](
        function () {
          $rootScope.$emit('$translateRefreshEnd', {language : langKey});
        }
      );

      if (!langKey) {
        // if there's no language key specified we refresh ALL THE THINGS!
        var languagesToReload = $fallbackLanguage && $fallbackLanguage.slice() || [];
        if ($uses && languagesToReload.indexOf($uses) === -1) {
          languagesToReload.push($uses);
        }
        $q.all(languagesToReload.map(loadNewData)).then(deferred.resolve, deferred.reject);

      } else if ($translationTable[langKey]) {
        //just refresh the specified language cache
        loadNewData(langKey).then(deferred.resolve, deferred.reject);

      } else {
        deferred.reject();
      }

      return deferred.promise;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#instant
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns a translation instantly from the internal state of loaded translation. All rules
     * regarding the current language, the preferred language of even fallback languages will be
     * used except any promise handling. If a language was not found, an asynchronous loading
     * will be invoked in the background.
     *
     * @param {string|array} translationId A token which represents a translation id
     *                                     This can be optionally an array of translation ids which
     *                                     results that the function's promise returns an object where
     *                                     each key is the translation id and the value the translation.
     * @param {object=} [interpolateParams={}] Params
     * @param {string=} [interpolationId=undefined] The id of the interpolation to use (use default unless set via useInterpolation())
     * @param {string=} [forceLanguage=false] A language to be used instead of the current language
     * @param {string=} [sanitizeStrategy=undefined] force sanitize strategy for this call instead of using the configured one (use default unless set)
     *
     * @return {string|object} translation
     */
    $translate.instant = function (translationId, interpolateParams, interpolationId, forceLanguage, sanitizeStrategy) {

      // we don't want to re-negotiate $uses
      var uses = (forceLanguage && forceLanguage !== $uses) ? // we don't want to re-negotiate $uses
        (negotiateLocale(forceLanguage) || forceLanguage) : $uses;

      // Detect undefined and null values to shorten the execution and prevent exceptions
      if (translationId === null || angular.isUndefined(translationId)) {
        return translationId;
      }

      // Check forceLanguage is present
      if (forceLanguage) {
        loadTranslationsIfMissing(forceLanguage);
      }

      // Duck detection: If the first argument is an array, a bunch of translations was requested.
      // The result is an object.
      if (angular.isArray(translationId)) {
        var results = {};
        for (var i = 0, c = translationId.length; i < c; i++) {
          results[translationId[i]] = $translate.instant(translationId[i], interpolateParams, interpolationId, forceLanguage, sanitizeStrategy);
        }
        return results;
      }

      // We discarded unacceptable values. So we just need to verify if translationId is empty String
      if (angular.isString(translationId) && translationId.length < 1) {
        return translationId;
      }

      // trim off any whitespace
      if (translationId) {
        translationId = trim.apply(translationId);
      }

      var result, possibleLangKeys = [];
      if ($preferredLanguage) {
        possibleLangKeys.push($preferredLanguage);
      }
      if (uses) {
        possibleLangKeys.push(uses);
      }
      if ($fallbackLanguage && $fallbackLanguage.length) {
        possibleLangKeys = possibleLangKeys.concat($fallbackLanguage);
      }
      for (var j = 0, d = possibleLangKeys.length; j < d; j++) {
        var possibleLangKey = possibleLangKeys[j];
        if ($translationTable[possibleLangKey]) {
          if (typeof $translationTable[possibleLangKey][translationId] !== 'undefined') {
            result = determineTranslationInstant(translationId, interpolateParams, interpolationId, uses, sanitizeStrategy);
          }
        }
        if (typeof result !== 'undefined') {
          break;
        }
      }

      if (!result && result !== '') {
        if ($notFoundIndicatorLeft || $notFoundIndicatorRight) {
          result = applyNotFoundIndicators(translationId);
        } else {
          // Return translation of default interpolator if not found anything.
          result = defaultInterpolator.interpolate(translationId, interpolateParams, 'filter', sanitizeStrategy);

          // looks like the requested translation id doesn't exists.
          // Now, if there is a registered handler for missing translations and no
          // asyncLoader is pending, we execute the handler
          var missingTranslationHandlerTranslation;
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams, sanitizeStrategy);
          }

          if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
            result = missingTranslationHandlerTranslation;
          }
        }
      }

      return result;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#versionInfo
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the current version information for the angular-translate library
     *
     * @return {string} angular-translate version
     */
    $translate.versionInfo = function () {
      return version;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#loaderCache
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the defined loaderCache.
     *
     * @return {boolean|string|object} current value of loaderCache
     */
    $translate.loaderCache = function () {
      return loaderCache;
    };

    // internal purpose only
    $translate.directivePriority = function () {
      return directivePriority;
    };

    // internal purpose only
    $translate.statefulFilter = function () {
      return statefulFilter;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#isReady
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether the service is "ready" to translate (i.e. loading 1st language).
     *
     * See also {@link pascalprecht.translate.$translate#methods_onReady onReady()}.
     *
     * @return {boolean} current value of ready
     */
    $translate.isReady = function () {
      return $isReady;
    };

    var $onReadyDeferred = $q.defer();
    $onReadyDeferred.promise.then(function () {
      $isReady = true;
    });

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#onReady
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Calls the function provided or resolved the returned promise after the service is "ready" to translate (i.e. loading 1st language).
     *
     * See also {@link pascalprecht.translate.$translate#methods_isReady isReady()}.
     *
     * @param {Function=} fn Function to invoke when service is ready
     * @return {object} Promise resolved when service is ready
     */
    $translate.onReady = function (fn) {
      var deferred = $q.defer();
      if (angular.isFunction(fn)) {
        deferred.promise.then(fn);
      }
      if ($isReady) {
        deferred.resolve();
      } else {
        $onReadyDeferred.promise.then(deferred.resolve);
      }
      return deferred.promise;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#getAvailableLanguageKeys
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * This function simply returns the registered language keys being defined before in the config phase
     * With this, an application can use the array to provide a language selection dropdown or similar
     * without any additional effort
     *
     * @returns {object} returns the list of possibly registered language keys and mapping or null if not defined
     */
    $translate.getAvailableLanguageKeys = function () {
      if ($availableLanguageKeys.length > 0) {
        return $availableLanguageKeys;
      }
      return null;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#getTranslationTable
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns translation table by the given language key.
     *
     * Unless a language is provided it returns a translation table of the current one.
     * Note: If translation dictionary is currently downloading or in progress
     * it will return null.
     *
     * @param {string} langKey A token which represents a translation id
     *
     * @return {object} a copy of angular-translate $translationTable
     */
    $translate.getTranslationTable = function (langKey) {
      langKey = langKey || $translate.use();
      if (langKey && $translationTable[langKey]) {
        return angular.copy($translationTable[langKey]);
      }
      return null;
    };

    // Whenever $translateReady is being fired, this will ensure the state of $isReady
    var globalOnReadyListener = $rootScope.$on('$translateReady', function () {
      $onReadyDeferred.resolve();
      globalOnReadyListener(); // one time only
      globalOnReadyListener = null;
    });
    var globalOnChangeListener = $rootScope.$on('$translateChangeEnd', function () {
      $onReadyDeferred.resolve();
      globalOnChangeListener(); // one time only
      globalOnChangeListener = null;
    });

    if ($loaderFactory) {

      // If at least one async loader is defined and there are no
      // (default) translations available we should try to load them.
      if (angular.equals($translationTable, {})) {
        if ($translate.use()) {
          $translate.use($translate.use());
        }
      }

      // Also, if there are any fallback language registered, we start
      // loading them asynchronously as soon as we can.
      if ($fallbackLanguage && $fallbackLanguage.length) {
        var processAsyncResult = function (translation) {
          translations(translation.key, translation.table);
          $rootScope.$emit('$translateChangeEnd', {language : translation.key});
          return translation;
        };
        for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
          var fallbackLanguageId = $fallbackLanguage[i];
          if ($forceAsyncReloadEnabled || !$translationTable[fallbackLanguageId]) {
            langPromises[fallbackLanguageId] = loadAsync(fallbackLanguageId).then(processAsyncResult);
          }
        }
      }
    } else {
      $rootScope.$emit('$translateReady', {language : $translate.use()});
    }

    return $translate;
  }];
}

$translate.displayName = 'displayName';

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateDefaultInterpolation
 * @requires $interpolate
 *
 * @description
 * Uses angular's `$interpolate` services to interpolate strings against some values.
 *
 * Be aware to configure a proper sanitization strategy.
 *
 * See also:
 * * {@link pascalprecht.translate.$translateSanitization}
 *
 * @return {object} $translateDefaultInterpolation Interpolator service
 */
angular.module('pascalprecht.translate').factory('$translateDefaultInterpolation', $translateDefaultInterpolation);

function $translateDefaultInterpolation ($interpolate, $translateSanitization) {

  'use strict';

  var $translateInterpolator = {},
      $locale,
      $identifier = 'default';

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#setLocale
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Sets current locale (this is currently not use in this interpolation).
   *
   * @param {string} locale Language key or locale.
   */
  $translateInterpolator.setLocale = function (locale) {
    $locale = locale;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#getInterpolationIdentifier
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Returns an identifier for this interpolation service.
   *
   * @returns {string} $identifier
   */
  $translateInterpolator.getInterpolationIdentifier = function () {
    return $identifier;
  };

  /**
   * @deprecated will be removed in 3.0
   * @see {@link pascalprecht.translate.$translateSanitization}
   */
  $translateInterpolator.useSanitizeValueStrategy = function (value) {
    $translateSanitization.useStrategy(value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#interpolate
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Interpolates given value agains given interpolate params using angulars
   * `$interpolate` service.
   *
   * Since AngularJS 1.5, `value` must not be a string but can be anything input.
   *
   * @param {string} value translation
   * @param {object} [interpolationParams={}] interpolation params
   * @param {string} [context=undefined] current context (filter, directive, service)
   * @param {string} [sanitizeStrategy=undefined] sanitize strategy (use default unless set)
   * @param {string} translationId current translationId
   *
   * @returns {string} interpolated string
   */
  $translateInterpolator.interpolate = function (value, interpolationParams, context, sanitizeStrategy, translationId) { // jshint ignore:line
    interpolationParams = interpolationParams || {};
    interpolationParams = $translateSanitization.sanitize(interpolationParams, 'params', sanitizeStrategy, context);

    var interpolatedText;
    if (angular.isNumber(value)) {
      // numbers are safe
      interpolatedText = '' + value;
    } else if (angular.isString(value)) {
      // strings must be interpolated (that's the job here)
      interpolatedText = $interpolate(value)(interpolationParams);
      interpolatedText = $translateSanitization.sanitize(interpolatedText, 'text', sanitizeStrategy, context);
    } else {
      // neither a number or a string, cant interpolate => empty string
      interpolatedText = '';
    }

    return interpolatedText;
  };

  return $translateInterpolator;
}

$translateDefaultInterpolation.displayName = '$translateDefaultInterpolation';

angular.module('pascalprecht.translate').constant('$STORAGE_KEY', 'NG_TRANSLATE_LANG_KEY');

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translate
 * @requires $interpolate,
 * @requires $compile,
 * @requires $parse,
 * @requires $rootScope
 * @restrict AE
 *
 * @description
 * Translates given translation id either through attribute or DOM content.
 * Internally it uses $translate service to translate the translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=} translate Translation id which could be either string or interpolated string.
 * @param {string=} translate-values Values to pass into translation id. Can be passed as object literal string or interpolated object.
 * @param {string=} translate-attr-ATTR translate Translation id and put it into ATTR attribute.
 * @param {string=} translate-default will be used unless translation was successful
 * @param {string=} translate-sanitize-strategy defines locally sanitize strategy
 * @param {boolean=} translate-compile (default true if present) defines locally activation of {@link pascalprecht.translate.$translateProvider#methods_usePostCompiling}
 * @param {boolean=} translate-keep-content (default true if present) defines that in case a KEY could not be translated, that the existing content is left in the innerHTML}
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="TranslateCtrl">

        <pre translate="TRANSLATION_ID"></pre>
        <pre translate>TRANSLATION_ID</pre>
        <pre translate translate-attr-title="TRANSLATION_ID"></pre>
        <pre translate="{{translationId}}"></pre>
        <pre translate>{{translationId}}</pre>
        <pre translate="WITH_VALUES" translate-values="{value: 5}"></pre>
        <pre translate translate-values="{value: 5}">WITH_VALUES</pre>
        <pre translate="WITH_VALUES" translate-values="{{values}}"></pre>
        <pre translate translate-values="{{values}}">WITH_VALUES</pre>
        <pre translate translate-attr-title="WITH_VALUES" translate-values="{{values}}"></pre>
        <pre translate="WITH_CAMEL_CASE_KEY" translate-value-camel-case-key="Hi"></pre>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value}}',
          'WITH_CAMEL_CASE_KEY': 'The interpolation key is camel cased: {{camelCaseKey}}'
        }).preferredLanguage('en');

      });

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
        };
      });
    </file>
    <file name="scenario.js">
      it('should translate', function () {
        inject(function ($rootScope, $compile) {
          $rootScope.translationId = 'TRANSLATION_ID';

          element = $compile('<p translate="TRANSLATION_ID"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate="{{translationId}}"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate>TRANSLATION_ID</p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate>{{translationId}}</p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate translate-attr-title="TRANSLATION_ID"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.attr('title')).toBe('Hello there!');

          element = $compile('<p translate="WITH_CAMEL_CASE_KEY" translate-value-camel-case-key="Hello"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('The interpolation key is camel cased: Hello');
        });
      });
    </file>
   </example>
 */
.directive('translate', translateDirective);
function translateDirective($translate, $interpolate, $compile, $parse, $rootScope) {

  'use strict';

  /**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string} The string stripped of whitespace from both ends
   */
  var trim = function() {
    return this.toString().replace(/^\s+|\s+$/g, '');
  };

  /**
   * @name lowercase
   * @private
   *
   * @description
   * Return the lowercase string only if the type is string
   *
   * @returns {string} The string all in lowercase
   */
  var lowercase = function (string) {
    return angular.isString(string) ? string.toLowerCase() : string;
  };

  return {
    restrict: 'AE',
    scope: true,
    priority: $translate.directivePriority(),
    compile: function (tElement, tAttr) {

      var translateValuesExist = (tAttr.translateValues) ?
        tAttr.translateValues : undefined;

      var translateInterpolation = (tAttr.translateInterpolation) ?
        tAttr.translateInterpolation : undefined;

      var translateSanitizeStrategyExist = (tAttr.translateSanitizeStrategy) ?
        tAttr.translateSanitizeStrategy : undefined;

      var translateValueExist = tElement[0].outerHTML.match(/translate-value-+/i);

      var interpolateRegExp = '^(.*)(' + $interpolate.startSymbol() + '.*' + $interpolate.endSymbol() + ')(.*)',
          watcherRegExp = '^(.*)' + $interpolate.startSymbol() + '(.*)' + $interpolate.endSymbol() + '(.*)';

      return function linkFn(scope, iElement, iAttr) {

        scope.interpolateParams = {};
        scope.preText = '';
        scope.postText = '';
        scope.translateNamespace = getTranslateNamespace(scope);
        var translationIds = {};

        var initInterpolationParams = function (interpolateParams, iAttr, tAttr) {
          // initial setup
          if (iAttr.translateValues) {
            angular.extend(interpolateParams, $parse(iAttr.translateValues)(scope.$parent));
          }
          // initially fetch all attributes if existing and fill the params
          if (translateValueExist) {
            for (var attr in tAttr) {
              if (Object.prototype.hasOwnProperty.call(iAttr, attr) && attr.substr(0, 14) === 'translateValue' && attr !== 'translateValues') {
                var attributeName = lowercase(attr.substr(14, 1)) + attr.substr(15);
                interpolateParams[attributeName] = tAttr[attr];
              }
            }
          }
        };

        // Ensures any change of the attribute "translate" containing the id will
        // be re-stored to the scope's "translationId".
        // If the attribute has no content, the element's text value (white spaces trimmed off) will be used.
        var observeElementTranslation = function (translationId) {

          // Remove any old watcher
          if (angular.isFunction(observeElementTranslation._unwatchOld)) {
            observeElementTranslation._unwatchOld();
            observeElementTranslation._unwatchOld = undefined;
          }

          if (angular.equals(translationId , '') || !angular.isDefined(translationId)) {
            var iElementText = trim.apply(iElement.text());

            // Resolve translation id by inner html if required
            var interpolateMatches = iElementText.match(interpolateRegExp);
            // Interpolate translation id if required
            if (angular.isArray(interpolateMatches)) {
              scope.preText = interpolateMatches[1];
              scope.postText = interpolateMatches[3];
              translationIds.translate = $interpolate(interpolateMatches[2])(scope.$parent);
              var watcherMatches = iElementText.match(watcherRegExp);
              if (angular.isArray(watcherMatches) && watcherMatches[2] && watcherMatches[2].length) {
                observeElementTranslation._unwatchOld = scope.$watch(watcherMatches[2], function (newValue) {
                  translationIds.translate = newValue;
                  updateTranslations();
                });
              }
            } else {
              // do not assigne the translation id if it is empty.
              translationIds.translate = !iElementText ? undefined : iElementText;
            }
          } else {
            translationIds.translate = translationId;
          }
          updateTranslations();
        };

        var observeAttributeTranslation = function (translateAttr) {
          iAttr.$observe(translateAttr, function (translationId) {
            translationIds[translateAttr] = translationId;
            updateTranslations();
          });
        };

        // initial setup with values
        initInterpolationParams(scope.interpolateParams, iAttr, tAttr);

        var firstAttributeChangedEvent = true;
        iAttr.$observe('translate', function (translationId) {
          if (typeof translationId === 'undefined') {
            // case of element "<translate>xyz</translate>"
            observeElementTranslation('');
          } else {
            // case of regular attribute
            if (translationId !== '' || !firstAttributeChangedEvent) {
              translationIds.translate = translationId;
              updateTranslations();
            }
          }
          firstAttributeChangedEvent = false;
        });

        for (var translateAttr in iAttr) {
          if (iAttr.hasOwnProperty(translateAttr) && translateAttr.substr(0, 13) === 'translateAttr' && translateAttr.length > 13) {
            observeAttributeTranslation(translateAttr);
          }
        }

        iAttr.$observe('translateDefault', function (value) {
          scope.defaultText = value;
          updateTranslations();
        });

        if (translateSanitizeStrategyExist) {
          iAttr.$observe('translateSanitizeStrategy', function (value) {
            scope.sanitizeStrategy = $parse(value)(scope.$parent);
            updateTranslations();
          });
        }

        if (translateValuesExist) {
          iAttr.$observe('translateValues', function (interpolateParams) {
            if (interpolateParams) {
              scope.$parent.$watch(function () {
                angular.extend(scope.interpolateParams, $parse(interpolateParams)(scope.$parent));
              });
            }
          });
        }

        if (translateValueExist) {
          var observeValueAttribute = function (attrName) {
            iAttr.$observe(attrName, function (value) {
              var attributeName = lowercase(attrName.substr(14, 1)) + attrName.substr(15);
              scope.interpolateParams[attributeName] = value;
            });
          };
          for (var attr in iAttr) {
            if (Object.prototype.hasOwnProperty.call(iAttr, attr) && attr.substr(0, 14) === 'translateValue' && attr !== 'translateValues') {
              observeValueAttribute(attr);
            }
          }
        }

        // Master update function
        var updateTranslations = function () {
          for (var key in translationIds) {
            if (translationIds.hasOwnProperty(key) && translationIds[key] !== undefined) {
              updateTranslation(key, translationIds[key], scope, scope.interpolateParams, scope.defaultText, scope.translateNamespace);
            }
          }
        };

        // Put translation processing function outside loop
        var updateTranslation = function(translateAttr, translationId, scope, interpolateParams, defaultTranslationText, translateNamespace) {
          if (translationId) {
            // if translation id starts with '.' and translateNamespace given, prepend namespace
            if (translateNamespace && translationId.charAt(0) === '.') {
              translationId = translateNamespace + translationId;
            }

            $translate(translationId, interpolateParams, translateInterpolation, defaultTranslationText, scope.translateLanguage, scope.sanitizeStrategy)
              .then(function (translation) {
                applyTranslation(translation, scope, true, translateAttr);
              }, function (translationId) {
                applyTranslation(translationId, scope, false, translateAttr);
              });
          } else {
            // as an empty string cannot be translated, we can solve this using successful=false
            applyTranslation(translationId, scope, false, translateAttr);
          }
        };

        var applyTranslation = function (value, scope, successful, translateAttr) {
          if (!successful) {
            if (typeof scope.defaultText !== 'undefined') {
              value = scope.defaultText;
            }
          }
          if (translateAttr === 'translate') {
            // default translate into innerHTML
            if (successful || (!successful && !$translate.isKeepContent() && typeof iAttr.translateKeepContent === 'undefined')) {
              iElement.empty().append(scope.preText + value + scope.postText);
            }
            var globallyEnabled = $translate.isPostCompilingEnabled();
            var locallyDefined = typeof tAttr.translateCompile !== 'undefined';
            var locallyEnabled = locallyDefined && tAttr.translateCompile !== 'false';
            if ((globallyEnabled && !locallyDefined) || locallyEnabled) {
              $compile(iElement.contents())(scope);
            }
          } else {
            // translate attribute
            var attributeName = iAttr.$attr[translateAttr];
            if (attributeName.substr(0, 5) === 'data-') {
              // ensure html5 data prefix is stripped
              attributeName = attributeName.substr(5);
            }
            attributeName = attributeName.substr(15);
            iElement.attr(attributeName, value);
          }
        };

        if (translateValuesExist || translateValueExist || iAttr.translateDefault) {
          scope.$watch('interpolateParams', updateTranslations, true);
        }

        // Replaced watcher on translateLanguage with event listener
        scope.$on('translateLanguageChanged', updateTranslations);

        // Ensures the text will be refreshed after the current language was changed
        // w/ $translate.use(...)
        var unbind = $rootScope.$on('$translateChangeSuccess', updateTranslations);

        // ensure translation will be looked up at least one
        if (iElement.text().length) {
          if (iAttr.translate) {
            observeElementTranslation(iAttr.translate);
          } else {
            observeElementTranslation('');
          }
        } else if (iAttr.translate) {
          // ensure attribute will be not skipped
          observeElementTranslation(iAttr.translate);
        }
        updateTranslations();
        scope.$on('$destroy', unbind);
      };
    }
  };
}

/**
 * Returns the scope's namespace.
 * @private
 * @param scope
 * @returns {string}
 */
function getTranslateNamespace(scope) {
  'use strict';
  if (scope.translateNamespace) {
    return scope.translateNamespace;
  }
  if (scope.$parent) {
    return getTranslateNamespace(scope.$parent);
  }
}

translateDirective.displayName = 'translateDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translate-attr
 * @restrict A
 *
 * @description
 * Translates attributes like translate-attr-ATTR, but with an object like ng-class.
 * Internally it uses `translate` service to translate translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=} translate-attr Object literal mapping attributes to translation ids.
 * @param {string=} translate-values Values to pass into the translation ids. Can be passed as object literal string.
 * @param {string=} translate-sanitize-strategy defines locally sanitize strategy
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="TranslateCtrl">

        <input translate-attr="{ placeholder: translationId, title: 'WITH_VALUES' }" translate-values="{value: 5}" />

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value}}',
        }).preferredLanguage('en');

      });

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
        };
      });
    </file>
    <file name="scenario.js">
      it('should translate', function () {
        inject(function ($rootScope, $compile) {
          $rootScope.translationId = 'TRANSLATION_ID';

          element = $compile('<input translate-attr="{ placeholder: translationId, title: 'WITH_VALUES' }" translate-values="{ value: 5 }" />')($rootScope);
          $rootScope.$digest();
          expect(element.attr('placeholder)).toBe('Hello there!');
          expect(element.attr('title)).toBe('The following value is dynamic: 5');
        });
      });
    </file>
   </example>
 */
.directive('translateAttr', translateAttrDirective);
function translateAttrDirective($translate, $rootScope) {

  'use strict';

  return {
    restrict: 'A',
    priority: $translate.directivePriority(),
    link: function linkFn(scope, element, attr) {

      var translateAttr,
          translateValues,
          translateSanitizeStrategy,
          previousAttributes = {};

      // Main update translations function
      var updateTranslations = function () {
        angular.forEach(translateAttr, function (translationId, attributeName) {
          if (!translationId) {
            return;
          }
          previousAttributes[attributeName] = true;

          // if translation id starts with '.' and translateNamespace given, prepend namespace
          if (scope.translateNamespace && translationId.charAt(0) === '.') {
            translationId = scope.translateNamespace + translationId;
          }
          $translate(translationId, translateValues, attr.translateInterpolation, undefined, scope.translateLanguage, translateSanitizeStrategy)
            .then(function (translation) {
              element.attr(attributeName, translation);
            }, function (translationId) {
              element.attr(attributeName, translationId);
            });
        });

        // Removing unused attributes that were previously used
        angular.forEach(previousAttributes, function (flag, attributeName) {
          if (!translateAttr[attributeName]) {
            element.removeAttr(attributeName);
            delete previousAttributes[attributeName];
          }
        });
      };

      // Watch for attribute changes
      watchAttribute(
        scope,
        attr.translateAttr,
        function (newValue) { translateAttr = newValue; },
        updateTranslations
      );
      // Watch for value changes
      watchAttribute(
        scope,
        attr.translateValues,
        function (newValue) { translateValues = newValue; },
        updateTranslations
      );
      // Watch for sanitize strategy changes
      watchAttribute(
        scope,
        attr.translateSanitizeStrategy,
        function (newValue) { translateSanitizeStrategy = newValue; },
        updateTranslations
      );

      if (attr.translateValues) {
        scope.$watch(attr.translateValues, updateTranslations, true);
      }

      // Replaced watcher on translateLanguage with event listener
      scope.$on('translateLanguageChanged', updateTranslations);

      // Ensures the text will be refreshed after the current language was changed
      // w/ $translate.use(...)
      var unbind = $rootScope.$on('$translateChangeSuccess', updateTranslations);

      updateTranslations();
      scope.$on('$destroy', unbind);
    }
  };
}

function watchAttribute(scope, attribute, valueCallback, changeCallback) {
  'use strict';
  if (!attribute) {
    return;
  }
  if (attribute.substr(0, 2) === '::') {
    attribute = attribute.substr(2);
  } else {
    scope.$watch(attribute, function(newValue) {
      valueCallback(newValue);
      changeCallback();
    }, true);
  }
  valueCallback(scope.$eval(attribute));
}

translateAttrDirective.displayName = 'translateAttrDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateCloak
 * @requires $translate
 * @restrict A
 *
 * $description
 * Adds a `translate-cloak` class name to the given element where this directive
 * is applied initially and removes it, once a loader has finished loading.
 *
 * This directive can be used to prevent initial flickering when loading translation
 * data asynchronously.
 *
 * The class name is defined in
 * {@link pascalprecht.translate.$translateProvider#cloakClassName $translate.cloakClassName()}.
 *
 * @param {string=} translate-cloak If a translationId is provided, it will be used for showing
 *                                  or hiding the cloak. Basically it relies on the translation
 *                                  resolve.
 */
.directive('translateCloak', translateCloakDirective);

function translateCloakDirective($translate, $rootScope) {

  'use strict';

  return {
    compile : function (tElement) {
      var applyCloak = function (element) {
          element.addClass($translate.cloakClassName());
        },
        removeCloak = function (element) {
          element.removeClass($translate.cloakClassName());
        };
      applyCloak(tElement);

      return function linkFn(scope, iElement, iAttr) {
        //Create bound functions that incorporate the active DOM element.
        var iRemoveCloak = removeCloak.bind(this, iElement), iApplyCloak = applyCloak.bind(this, iElement);
        if (iAttr.translateCloak && iAttr.translateCloak.length) {
          // Register a watcher for the defined translation allowing a fine tuned cloak
          iAttr.$observe('translateCloak', function (translationId) {
            $translate(translationId).then(iRemoveCloak, iApplyCloak);
          });
          $rootScope.$on('$translateChangeSuccess', function () {
            $translate(iAttr.translateCloak).then(iRemoveCloak, iApplyCloak);
          });
        } else {
          $translate.onReady(iRemoveCloak);
        }
      };
    }
  };
}

translateCloakDirective.displayName = 'translateCloakDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateNamespace
 * @restrict A
 *
 * @description
 * Translates given translation id either through attribute or DOM content.
 * Internally it uses `translate` filter to translate translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=} translate namespace name which could be either string or interpolated string.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div translate-namespace="CONTENT">

        <div>
            <h1 translate>.HEADERS.TITLE</h1>
            <h1 translate>.HEADERS.WELCOME</h1>
        </div>

        <div translate-namespace=".HEADERS">
            <h1 translate>.TITLE</h1>
            <h1 translate>.WELCOME</h1>
        </div>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'CONTENT': {
            'HEADERS': {
                TITLE: 'Title'
            }
          },
          'CONTENT.HEADERS.WELCOME': 'Welcome'
        }).preferredLanguage('en');

      });

    </file>
   </example>
 */
.directive('translateNamespace', translateNamespaceDirective);

function translateNamespaceDirective() {

  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function () {
      return {
        pre: function (scope, iElement, iAttrs) {
          scope.translateNamespace = getTranslateNamespace(scope);

          if (scope.translateNamespace && iAttrs.translateNamespace.charAt(0) === '.') {
            scope.translateNamespace += iAttrs.translateNamespace;
          } else {
            scope.translateNamespace = iAttrs.translateNamespace;
          }
        }
      };
    }
  };
}

/**
 * Returns the scope's namespace.
 * @private
 * @param scope
 * @returns {string}
 */
function getTranslateNamespace(scope) {
  'use strict';
  if (scope.translateNamespace) {
    return scope.translateNamespace;
  }
  if (scope.$parent) {
    return getTranslateNamespace(scope.$parent);
  }
}

translateNamespaceDirective.displayName = 'translateNamespaceDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateLanguage
 * @restrict A
 *
 * @description
 * Forces the language to the directives in the underlying scope.
 *
 * @param {string=} translate language that will be negotiated.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div>

        <div>
            <h1 translate>HELLO</h1>
        </div>

        <div translate-language="de">
            <h1 translate>HELLO</h1>
        </div>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider
          .translations('en',{
            'HELLO': 'Hello world!'
          })
          .translations('de',{
            'HELLO': 'Hallo Welt!'
          })
          .preferredLanguage('en');

      });

    </file>
   </example>
 */
.directive('translateLanguage', translateLanguageDirective);

function translateLanguageDirective() {

  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function () {
      return function linkFn(scope, iElement, iAttrs) {

        iAttrs.$observe('translateLanguage', function (newTranslateLanguage) {
          scope.translateLanguage = newTranslateLanguage;
        });

        scope.$watch('translateLanguage', function(){
          scope.$broadcast('translateLanguageChanged');
        });
      };
    }
  };
}

translateLanguageDirective.displayName = 'translateLanguageDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc filter
 * @name pascalprecht.translate.filter:translate
 * @requires $parse
 * @requires pascalprecht.translate.$translate
 * @function
 *
 * @description
 * Uses `$translate` service to translate contents. Accepts interpolate parameters
 * to pass dynamized values though translation.
 *
 * @param {string} translationId A translation id to be translated.
 * @param {*=} interpolateParams Optional object literal (as hash or string) to pass values into translation.
 *
 * @returns {string} Translated text.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="TranslateCtrl">

        <pre>{{ 'TRANSLATION_ID' | translate }}</pre>
        <pre>{{ translationId | translate }}</pre>
        <pre>{{ 'WITH_VALUES' | translate:'{value: 5}' }}</pre>
        <pre>{{ 'WITH_VALUES' | translate:values }}</pre>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en', {
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value}}'
        });
        $translateProvider.preferredLanguage('en');

      });

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
        };
      });
    </file>
   </example>
 */
.filter('translate', translateFilterFactory);

function translateFilterFactory($parse, $translate) {

  'use strict';

  var translateFilter = function (translationId, interpolateParams, interpolation, forceLanguage) {
    if (!angular.isObject(interpolateParams)) {
      var ctx = this || {
        '__SCOPE_IS_NOT_AVAILABLE': 'More info at https://github.com/angular/angular.js/commit/8863b9d04c722b278fa93c5d66ad1e578ad6eb1f'
        };
      interpolateParams = $parse(interpolateParams)(ctx);
    }

    return $translate.instant(translationId, interpolateParams, interpolation, forceLanguage);
  };

  if ($translate.statefulFilter()) {
    translateFilter.$stateful = true;
  }

  return translateFilter;
}

translateFilterFactory.displayName = 'translateFilterFactory';

angular.module('pascalprecht.translate')

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translationCache
 * @requires $cacheFactory
 *
 * @description
 * The first time a translation table is used, it is loaded in the translation cache for quick retrieval. You
 * can load translation tables directly into the cache by consuming the
 * `$translationCache` service directly.
 *
 * @return {object} $cacheFactory object.
 */
  .factory('$translationCache', $translationCache);

function $translationCache($cacheFactory) {

  'use strict';

  return $cacheFactory('translations');
}

$translationCache.displayName = '$translationCache';
return 'pascalprecht.translate';

}));

/*!
 * angular-translate - v2.16.0 - 2017-11-01
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

$translateStaticFilesLoader.$inject = ['$q', '$http'];
angular.module('pascalprecht.translate')
/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateStaticFilesLoader
 * @requires $q
 * @requires $http
 *
 * @description
 * Creates a loading function for a typical static file url pattern:
 * "lang-en_US.json", "lang-de_DE.json", etc. Using this builder,
 * the response of these urls must be an object of key-value pairs.
 *
 * @param {object} options Options object, which gets prefix, suffix, key, and fileMap
 */
.factory('$translateStaticFilesLoader', $translateStaticFilesLoader);

function $translateStaticFilesLoader($q, $http) {

  'use strict';

  return function (options) {

    if (!options || (!angular.isArray(options.files) && (!angular.isString(options.prefix) || !angular.isString(options.suffix)))) {
      throw new Error('Couldn\'t load static files, no files and prefix or suffix specified!');
    }

    if (!options.files) {
      options.files = [{
        prefix: options.prefix,
        suffix: options.suffix
      }];
    }

    var load = function (file) {
      if (!file || (!angular.isString(file.prefix) || !angular.isString(file.suffix))) {
        throw new Error('Couldn\'t load static file, no prefix or suffix specified!');
      }

      var fileUrl = [
        file.prefix,
        options.key,
        file.suffix
      ].join('');

      if (angular.isObject(options.fileMap) && options.fileMap[fileUrl]) {
        fileUrl = options.fileMap[fileUrl];
      }

      return $http(angular.extend({
        url: fileUrl,
        method: 'GET'
      }, options.$http))
        .then(function(result) {
          return result.data;
        }, function () {
          return $q.reject(options.key);
        });
    };

    var promises = [],
        length = options.files.length;

    for (var i = 0; i < length; i++) {
      promises.push(load({
        prefix: options.files[i].prefix,
        key: options.key,
        suffix: options.files[i].suffix
      }));
    }

    return $q.all(promises)
      .then(function (data) {
        var length = data.length,
            mergedData = {};

        for (var i = 0; i < length; i++) {
          for (var key in data[i]) {
            mergedData[key] = data[i][key];
          }
        }

        return mergedData;
      });
  };
}

$translateStaticFilesLoader.displayName = '$translateStaticFilesLoader';
return 'pascalprecht.translate';

}));

/**
 * @license angular-recaptcha build:2017-11-22
 * https://github.com/vividcortex/angular-recaptcha
 * Copyright (c) 2017 VividCortex
**/


!function(a){"use strict";a.module("vcRecaptcha",[])}(angular),function(a){"use strict";function b(){throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create')}a.module("vcRecaptcha").provider("vcRecaptchaService",function(){var c=this,d={};c.onLoadFunctionName="vcRecaptchaApiLoaded",c.setDefaults=function(b){a.copy(b,d)},c.setSiteKey=function(a){d.key=a},c.setTheme=function(a){d.theme=a},c.setStoken=function(a){d.stoken=a},c.setSize=function(a){d.size=a},c.setType=function(a){d.type=a},c.setLang=function(a){d.lang=a},c.setBadge=function(a){d.badge=a},c.setOnLoadFunctionName=function(a){c.onLoadFunctionName=a},c.$get=["$rootScope","$window","$q","$document","$interval",function(e,f,g,h,i){function j(){return l?g.when(l):n}function k(){if(!l)throw new Error("reCaptcha has not been loaded yet.")}var l,m=g.defer(),n=m.promise,o={};f.vcRecaptchaApiLoadedCallback=f.vcRecaptchaApiLoadedCallback||[];var p=function(){l=f.grecaptcha,m.resolve(l)};if(f.vcRecaptchaApiLoadedCallback.push(p),f[c.onLoadFunctionName]=function(){f.vcRecaptchaApiLoadedCallback.forEach(function(a){a()})},a.isDefined(f.grecaptcha))p();else if(f.document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]'))var q=i(function(){a.isDefined(f.grecaptcha)&&(i.cancel(q),p())},25);else{var r=f.document.createElement("script");r.async=!0,r.defer=!0,r.src="https://www.google.com/recaptcha/api.js?onload="+c.onLoadFunctionName+"&render=explicit",h.find("body")[0].appendChild(r)}return{create:function(a,c){return c.sitekey=c.key||d.key,c.theme=c.theme||d.theme,c.stoken=c.stoken||d.stoken,c.size=c.size||d.size,c.type=c.type||d.type,c.hl=c.lang||d.lang,c.badge=c.badge||d.badge,c.sitekey&&40===c.sitekey.length||b(),j().then(function(b){var d=b.render(a,c);return o[d]=a,d})},reload:function(a){k(),l.reset(a),e.$broadcast("reCaptchaReset",a)},execute:function(a){k(),l.execute(a)},useLang:function(a,b){var c=o[a];if(!c)throw new Error("reCaptcha Widget ID not exists",a);var d=c.querySelector("iframe");if(!b)return d&&d.src&&/[?&]hl=\w+/.test(d.src)?d.src.replace(/.+[?&]hl=(\w+)([^\w].+)?/,"$1"):null;if(d&&d.src){var e=d.src;/[?&]hl=/.test(e)?e=e.replace(/([?&]hl=)\w+/,"$1"+b):e+=(-1===e.indexOf("?")?"?":"&")+"hl="+b,d.src=e}},getResponse:function(a){return k(),l.getResponse(a)},getInstance:function(a){return o[a]},destroy:function(a){delete o[a]}}}]})}(angular),function(a){"use strict";a.module("vcRecaptcha").directive("vcRecaptcha",["$document","$timeout","vcRecaptchaService",function(b,c,d){return{restrict:"A",require:"?^^form",scope:{response:"=?ngModel",key:"=?",stoken:"=?",theme:"=?",size:"=?",type:"=?",lang:"=?",badge:"=?",tabindex:"=?",required:"=?",onCreate:"&",onSuccess:"&",onExpire:"&"},link:function(e,f,g,h){function i(){h&&h.$setValidity("recaptcha",null),l()}function j(){c(function(){e.response="",k(),e.onExpire({widgetId:e.widgetId})})}function k(){h&&h.$setValidity("recaptcha",!1===e.required?null:Boolean(e.response))}function l(){d.destroy(e.widgetId),a.element(b[0].querySelectorAll(".pls-container")).parent().remove()}e.widgetId=null,h&&a.isDefined(g.required)&&e.$watch("required",k);var m=e.$watch("key",function(b){var h=function(a){c(function(){e.response=a,k(),e.onSuccess({response:a,widgetId:e.widgetId})})};d.create(f[0],{callback:h,key:b,stoken:e.stoken||g.stoken||null,theme:e.theme||g.theme||null,type:e.type||g.type||null,lang:e.lang||g.lang||null,tabindex:e.tabindex||g.tabindex||null,size:e.size||g.size||null,badge:e.badge||g.badge||null,"expired-callback":j}).then(function(b){k(),e.widgetId=b,e.onCreate({widgetId:b}),e.$on("$destroy",i),e.$on("reCaptchaReset",function(c,d){(a.isUndefined(d)||b===d)&&(e.response="",k())})}),m()})}}}])}(angular);
// https://github.com/Gillardo/bootstrap-ui-datetime-picker
// Version: 2.4.4
// Released: 2016-09-19 
angular.module("ui.bootstrap.datetimepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).constant("uiDatetimePickerConfig", { dateFormat: "yyyy-MM-dd HH:mm", defaultTime: "00:00:00", html5Types: { date: "yyyy-MM-dd", "datetime-local": "yyyy-MM-ddTHH:mm:ss.sss", month: "yyyy-MM" }, initialPicker: "date", reOpenDefault: !1, enableDate: !0, enableTime: !0, buttonBar: { show: !0, now: { show: !0, text: "Now" }, today: { show: !0, text: "Today" }, clear: { show: !0, text: "Clear" }, date: { show: !0, text: "Date" }, time: { show: !0, text: "Time" }, close: { show: !0, text: "Close" } }, closeOnDateSelection: !0, closeOnTimeNow: !0, appendToBody: !1, altInputFormats: [], ngModelOptions: {}, saveAs: !1, readAs: !1 }).controller("DateTimePickerController", ["$scope", "$element", "$attrs", "$compile", "$parse", "$document", "$timeout", "$uibPosition", "dateFilter", "uibDateParser", "uiDatetimePickerConfig", "$rootScope", function(a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(c) { var d = v[0],
            e = b[0].contains(c.target),
            f = void 0 !== d.contains && d.contains(c.target);!a.isOpen || e || f || a.$apply(function() { a.close(!1) }) }

    function n(c) { 27 === c.which && a.isOpen ? (c.preventDefault(), c.stopPropagation(), a.$apply(function() { a.close(!1) }), b[0].focus()) : 40 !== c.which || a.isOpen || (c.preventDefault(), c.stopPropagation(), a.$apply(function() { a.isOpen = !0 })) }

    function o(a) { return a.replace(/([A-Z])/g, function(a) { return "-" + a.toLowerCase() }) }

    function p(b) { var c = j.parse(b, w, a.date); if (isNaN(c))
            for (var d = 0; d < C.length; d++)
                if (c = j.parse(b, C[d], a.date), !isNaN(c)) return c;
        return c }

    function q(a) { if (angular.isNumber(a) && !isNaN(a) && (a = new Date(a)), !a) return null; if (angular.isDate(a) && !isNaN(a)) return a; if (angular.isString(a)) { var b = p(a); if (!isNaN(b)) return j.toTimezone(b, u.timezone) } else; }

    function r(b) { return a.datepickerOptions.minDate && b < a.datepickerOptions.minDate ? !1 : !(a.datepickerOptions.maxDate && b > a.datepickerOptions.maxDate) }

    function s(a, b) { var d = a || b; return c.ngRequired || c.required || d ? (angular.isNumber(d) && (d = new Date(d)), d ? angular.isDate(d) && !isNaN(d) ? r(d) : angular.isDate(new Date(d)) && !isNaN(new Date(d).valueOf()) ? r(new Date(d)) : angular.isString(d) ? !isNaN(p(b)) && r(p(b)) : !1 : !0) : !0 } var t, u, v, w = k.dateFormat,
        x = {},
        y = [],
        z = angular.isDefined(c.closeOnDateSelection) ? a.$parent.$eval(c.closeOnDateSelection) : k.closeOnDateSelection,
        A = angular.isDefined(c.closeOnTimeNow) ? a.$parent.$eval(c.closeOnTimeNow) : k.closeOnTimeNow,
        B = angular.isDefined(c.datepickerAppendToBody) ? a.$parent.$eval(c.datepickerAppendToBody) : k.appendToBody,
        C = angular.isDefined(c.altInputFormats) ? a.$parent.$eval(c.altInputFormats) : k.altInputFormats,
        D = angular.isDefined(c.saveAs) ? a.$parent.$eval(c.saveAs) || c.saveAs : k.saveAs,
        E = angular.isDefined(c.readAs) ? a.$parent.$eval(c.readAs) : k.readAs;
    this.init = function(e) {
        function g(a) { if (t.$isEmpty(a)) return a; var b = new Date(a); return angular.isDate(b) && !isNaN(b) ? b : a }

        function h(a) { return !a || angular.isString(a) || !angular.isDate(a) || isNaN(a) ? a : "ISO" === D ? a.toISOString() : "json" === D ? a.toJSON() : "number" === D ? a.valueOf() : i ? j.fromTimezone(a, u.timezone).toLocaleString() : (w = w.replace(/M!/, "MM").replace(/d!/, "dd"), j.filter(j.fromTimezone(a, u.timezone), w)) } if (t = e, u = t.$options || k.ngModelOptions, a.buttonBar = angular.isDefined(c.buttonBar) ? a.$parent.$eval(c.buttonBar) : k.buttonBar, a.enableDate = angular.isDefined(a.enableDate) ? a.enableDate : k.enableDate, a.enableTime = angular.isDefined(a.enableTime) ? a.enableTime : k.enableTime, a.initialPicker = angular.isDefined(c.initialPicker) ? c.initialPicker : a.enableDate ? k.initialPicker : "time", a.reOpenDefault = angular.isDefined(c.reOpenDefault) ? c.reOpenDefault : k.reOpenDefault, "date" == a.initialPicker && !a.enableDate) throw new Error("datetimePicker can't have initialPicker set to date and have enableDate set to false.");
        a.showPicker = a.enableDate ? a.initialPicker : "time"; var i = !1; if (k.html5Types[c.type] ? (w = k.html5Types[c.type], i = !0) : (w = c.datetimePicker || k.dateFormat, c.$observe("datetimePicker", function(a) { var b = a || k.dateFormat; if (b !== w && (w = b, t.$modelValue = null, !w)) throw new Error("datetimePicker must have a date format specified.") })), !w) throw new Error("datetimePicker must have a date format specified."); var l = angular.element('<div date-picker-wrap><div uib-datepicker></div></div><div time-picker-wrap><div uib-timepicker style="margin:0 auto"></div></div>');
        u ? (timezone = u.timezone, a.ngModelOptions = angular.copy(u), a.ngModelOptions.timezone = null, a.ngModelOptions.updateOnDefault === !0 && (a.ngModelOptions.updateOn = a.ngModelOptions.updateOn ? a.ngModelOptions.updateOn + " default" : "default"), l.attr("ng-model-options", "ngModelOptions")) : timezone = null, l.attr({ "ng-model": "date", "ng-change": "dateSelection(date)" }); var m = angular.element(l.children()[0]);
        a.datepickerOptions || (a.datepickerOptions = {}), i && "month" === c.type && (a.datepickerOptions.datepickerMode = "month", a.datepickerOptions.minMode = "month"), m.attr("datepicker-options", "datepickerOptions"), angular.isDefined(a.datepickerOptions.datepickerMode) || (a.datepickerOptions.datepickerMode = "day"); var r = angular.element(l.children()[1]);
        a.timepickerOptions || (a.timepickerOptions = {}); for (var x in a.timepickerOptions) r.attr(o(x), "timepickerOptions." + x);
        angular.forEach(["minDate", "maxDate", "initDate"], function(b) { a.datepickerOptions[b] && ("minDate" == b ? r.attr("min", "datepickerOptions.minDate") : "maxDate" == b && r.attr("max", "datepickerOptions.maxDate")) }), i ? t.$formatters.push(function(b) { return a.date = j.fromTimezone(b, u.timezone), b }) : (t.$$parserName = "datetime", t.$validators.datetime = s, t.$parsers.unshift(q), t.$formatters.push(function(b) { return t.$isEmpty(b) ? (a.date = b, b) : (a.date = j.fromTimezone(b, u.timezone), w = w.replace(/M!/, "MM").replace(/d!/, "dd"), j.filter(a.date, w)) })), D && (angular.isFunction(D) ? t.$parsers.push(D) : t.$parsers.push(h), angular.isFunction(E) ? t.$formatters.push(E) : t.$formatters.push(g)), t.$viewChangeListeners.push(function() { a.date = p(t.$viewValue) }), b.bind("keydown", n), v = d(l)(a), l.remove(), B ? f.find("body").append(v) : b.after(v) }, a.getText = function(b) { return a.buttonBar[b].text || k.buttonBar[b].text }, a.keydown = function(c) { 27 === c.which && (a.close(!1), b[0].focus()) }, a.doShow = function(b) { return angular.isDefined(a.buttonBar[b].show) ? a.buttonBar[b].show : k.buttonBar[b].show }, a.dateSelection = function(d, e) { if (a.enableTime && "time" === a.showPicker && (d || null != d) && (angular.isDefined(a.date) && null != a.date || (a.date = new Date), d && null != d)) { var f = new Date(a.date);
            f.setHours(d.getHours()), f.setMinutes(d.getMinutes()), f.setSeconds(d.getSeconds()), f.setMilliseconds(d.getMilliseconds()), d = f } if (angular.isDefined(d)) { if (!a.date) { var g = angular.isDefined(c.defaultTime) ? c.defaultTime : k.defaultTime,
                    h = new Date("2001-01-01 " + g);
                isNaN(h) || null == d || (d.setHours(h.getHours()), d.setMinutes(h.getMinutes()), d.setSeconds(h.getSeconds()), d.setMilliseconds(h.getMilliseconds())) }
            a.date = d } var f = a.date ? i(a.date, w) : null;
        b.val(f), t.$setViewValue(f), z && ("time" != a.showPicker && null != f ? a.enableTime ? a.open("time") : a.close(!1) : A && "time" === a.showPicker && null != f && "now" === e && a.close(!1)) }, a.$watch("isOpen", function(c) { if (a.dropdownStyle = { display: c ? "block" : "none" }, c) { x.openDate = a.date; var d = B ? h.offset(b) : h.position(b);
            B ? a.dropdownStyle.top = d.top + b.prop("offsetHeight") + "px" : a.dropdownStyle.top = void 0, a.dropdownStyle.left = d.left + "px", g(function() { a.$broadcast("uib:datepicker.focus"), f.bind("click", m) }, 0, !1), a.open(a.showPicker) } else f.unbind("click", m) }), a.isDisabled = function(b) { "today" !== b && "now" !== b || (b = j.fromTimezone(new Date, timezone)); var c = {}; return angular.forEach(["minDate", "maxDate"], function(b) { a.datepickerOptions[b] ? angular.isDate(a.datepickerOptions[b]) ? c[b] = j.fromTimezone(new Date(a.datepickerOptions[b]), timezone) : c[b] = new Date(i(a.datepickerOptions[b], "medium")) : c[b] = null }), a.datepickerOptions && c.minDate && a.compare(b, c.minDate) < 0 || c.maxDate && a.compare(b, c.maxDate) > 0 }, a.compare = function(a, b) { return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate()) }, a.select = function(b, c) { angular.isDefined(c) && (c.preventDefault(), c.stopPropagation()); var d = null; if ("today" === b || "now" == b) { var e = new Date;
            angular.isDate(a.date) ? (d = new Date(a.date), d.setFullYear(e.getFullYear(), e.getMonth(), e.getDate()), d.setHours(e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds())) : d = e }
        a.dateSelection(d, b) }, a.open = function(b, c) { angular.isDefined(c) && (c.preventDefault(), c.stopPropagation()), g(function() { a.showPicker = b }, 0), "time" == b && g(function() { a.date = p(t.$viewValue) }, 50) }, a.close = function(c, d) { angular.isDefined(d) && (d.preventDefault(), d.stopPropagation()), a.isOpen = !1, a.enableDate && a.enableTime && (a.showPicker = a.reOpenDefault === !1 ? "date" : a.reOpenDefault), angular.isDefined(c) ? a.whenClosed({ args: { closePressed: c, openDate: x.openDate || null, closeDate: a.date } }) : b[0].focus() }, a.$on("$destroy", function() { a.isOpen === !0 && (l.$$phase || a.$apply(function() { a.close() })), y.forEach(function(a) { a() }), v.remove(), b.unbind("keydown", n), f.unbind("click", m) }) }]).directive("datetimePicker", function() { return { restrict: "A", require: ["ngModel", "datetimePicker"], controller: "DateTimePickerController", scope: { isOpen: "=?", datepickerOptions: "=?", timepickerOptions: "=?", enableDate: "=?", enableTime: "=?", initialPicker: "=?", reOpenDefault: "=?", whenClosed: "&" }, link: function(a, b, c, d) { var e = d[0],
                f = d[1];
            f.init(e) } } }).directive("datePickerWrap", function() { return { restrict: "EA", replace: !0, transclude: !0, templateUrl: "template/date-picker.html" } }).directive("timePickerWrap", function() { return { restrict: "EA", replace: !0, transclude: !0, templateUrl: "template/time-picker.html" } }), angular.module("ui.bootstrap.datetimepicker").run(["$templateCache", function(a) { "use strict";
    a.put("template/date-picker.html", '<ul class="dropdown-menu dropdown-menu-left datetime-picker-dropdown" ng-if="isOpen && showPicker == \'date\'" ng-style=dropdownStyle style=left:inherit ng-keydown=keydown($event) ng-click="$event.preventDefault(); $event.stopPropagation()"><li style="padding:0 5px 5px 5px" class=date-picker-menu><div ng-transclude></div></li><li style=padding:5px ng-if=buttonBar.show><span class="btn-group pull-left" style=margin-right:10px ng-if="doShow(\'today\') || doShow(\'clear\')"><button type=button class="btn btn-sm btn-info" ng-if="doShow(\'today\')" ng-click="select(\'today\', $event)" ng-disabled="isDisabled(\'today\')">{{ getText(\'today\') }}</button> <button type=button class="btn btn-sm btn-danger" ng-if="doShow(\'clear\')" ng-click="select(\'clear\', $event)">{{ getText(\'clear\') }}</button></span> <span class="btn-group pull-right" ng-if="(doShow(\'time\') && enableTime) || doShow(\'close\')"><button type=button class="btn btn-sm btn-default" ng-if="doShow(\'time\') && enableTime" ng-click="open(\'time\', $event)">{{ getText(\'time\')}}</button> <button type=button class="btn btn-sm btn-success" ng-if="doShow(\'close\')" ng-click="close(true, $event)">{{ getText(\'close\') }}</button></span> <span class=clearfix></span></li></ul>'), a.put("template/time-picker.html", '<ul class="dropdown-menu dropdown-menu-left datetime-picker-dropdown" ng-if="isOpen && showPicker == \'time\'" ng-style=dropdownStyle style=left:inherit ng-keydown=keydown($event) ng-click="$event.preventDefault(); $event.stopPropagation()"><li style="padding:0 5px 5px 5px" class=time-picker-menu><div ng-transclude></div></li><li style=padding:5px ng-if=buttonBar.show><span class="btn-group pull-left" style=margin-right:10px ng-if="doShow(\'now\') || doShow(\'clear\')"><button type=button class="btn btn-sm btn-info" ng-if="doShow(\'now\')" ng-click="select(\'now\', $event)" ng-disabled="isDisabled(\'now\')">{{ getText(\'now\') }}</button> <button type=button class="btn btn-sm btn-danger" ng-if="doShow(\'clear\')" ng-click="select(\'clear\', $event)">{{ getText(\'clear\') }}</button></span> <span class="btn-group pull-right" ng-if="(doShow(\'date\') && enableDate) || doShow(\'close\')"><button type=button class="btn btn-sm btn-default" ng-if="doShow(\'date\') && enableDate" ng-click="open(\'date\', $event)">{{ getText(\'date\')}}</button> <button type=button class="btn btn-sm btn-success" ng-if="doShow(\'close\')" ng-click="close(true, $event)">{{ getText(\'close\') }}</button></span> <span class=clearfix></span></li></ul>') }]);
