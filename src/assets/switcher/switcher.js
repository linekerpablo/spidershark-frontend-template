jQuery(document).ready(function($) {
	
	var colors = '';
	var server_url = ''; 
	var folder_url = 'css/colors/'; 

	// Style switcher
    $(".hide-color").show(5000);
 	$('#custumize-style').animate({
        left: '-134px'
    });

    $('#custumize-style .switcher').click(function(e) {
        e.preventDefault();
        var div = $('#custumize-style');
        if (div.css('left') === '-134px') {
            $('#custumize-style').animate({
                left: '0px'
            });

            // open switcher and add class open
            $(this).addClass('open');
            $(this).removeClass('closed');

        } else {
            $('#custumize-style').animate({
                left: '-134px'
            });

            // close switcher and add closed
            $(this).addClass('closed');
            $(this).removeClass('open');

        }
    })
	
 
	
		
	//Text Color change:
    $("#custom-color li a").click(function() {

            $("#custom_styles").remove();

    $(".modal-body").append('<textarea rows="10" id="custom_styles" style="width:100%; background:#f6f6f6;"></textarea>');
        var elm = $('#color_pick').val($(this).data('color'));
console.log($("#custom_styles").text());
console.log(elm);
            $("head #CustomColor").remove();
            $("head").append("<style id='CustomColor'> "+CustomCss(elm)+"<\/style>");
            $("#custom_styles").text("@charset 'UTF-8';/******************************************;*	Theme Name: Juno;*	Theme URI: http://juno.dealsontips.com;*	Description: This is a coming soon theme;*	Version: 1.0;*	Author: Yogesh Raj;*	Author URI: http://www.dealsontips.com;* Generated code for styling Juno;**************************************************/"+CustomCss(elm));
        $("#custom_styles").format({method: 'css'});
        return false;
    }); 

	//button-reset:	
    $('#button-reset a').click(function(e) {
        $('body').css('background', '#fff');
        $("#colors-style").attr("href", folder_url + "yellow.css");
        //$.cookie('layout_color',  server_url + 'yellow.css');
		
		//menu reset:
        $('#wrapper').removeClass();
        $('#wrapper').addClass('container');
        $('.menu-position li a').parent().parent().find('a').removeClass('active');
        $('#menu-left-bottom').addClass('active');
        //$.cookie('layout_menuPosition', '');
		
		//container-height reset:
        $('#container-height-fixed').trigger('click');
    });
    
    $('#custom').colorPicker({
        customBG: '#FFF',
        color: '#0C7F75',
        opacity: false,
        noRGBr: true,
    noRGBg: true, // same as above
    noRGBb: true,
        readOnly: true,
        renderCallback: function($elm) { 
            $("head #CustomColor").remove();
            $("#custom_styles").text('');
            $("head").append("<style id='CustomColor'> "+CustomCss($elm)+"<\/style>"); 
            $("#custom_styles").val("@charset 'UTF-8';/******************************************;*	Theme Name: Juno;*	Theme URI: http://juno.dealsontips.com;*	Description: This is a coming soon theme;*	Version: 1.0;*	Author: Yogesh Raj;*	Author URI: http://www.dealsontips.com;* Generated code for styling Juno;**************************************************/"+CustomCss($elm));
            $("#custom_styles").format({method: 'css'});
            return false;
      },
    });
});

function ColorLuminance(hex, lum) {

	         // validate hex string
	         hex = String(hex).replace(/[^0-9a-f]/gi, '');
	        if (hex.length < 6) {
		        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	         }
	        lum = lum || 0;

	        // convert to decimal and change luminosity
	        var rgb = "#", c, i;
	       for (i = 0; i < 3; i++) {
		       c = parseInt(hex.substr(i*2,2), 16);
		       c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		       rgb += ("00"+c).substr(c.length);
	      }

	      return rgb;
}

function ColorText(hex) {
    
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
}
function ColorLight(hex, light) {
    
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return "rgba("+r+","+g+","+b+", "+light+")";
}

function CustomCss(data) {
    
    var CssString = "a {";
    CssString += "color:  "+data.val()+";";
	CssString += "text-decoration: none;";
    CssString += "outline: 0;";
    CssString += "cursor: pointer;";
    CssString += "}";
    CssString += "a:hover {";
	CssString += "color: "+ColorLuminance(data.val(), -0.2)+";";
	CssString += "text-decoration: none;";
    CssString += "}";
    CssString += "a:focus {";
	CssString += "outline: 0;";
	CssString += "color:  "+data.val()+";";
	CssString += "outline-offset: -2px;";
	CssString += "text-decoration: none;";
    CssString += "}";
    CssString += ".scroll-up a {";
	CssString += "background-color: #F5F5F5;";
	CssString += "color: "+data.val()+";";
    CssString += "}";
    CssString += ".dividing-border::after {";
    CssString += "background-color: "+data.val()+";";
    CssString += "}";
    CssString += ".dividing-border::before {";
    CssString += "border: 1px solid "+data.val()+";";
    CssString += "background: "+data.val()+" repeat scroll 0 0;";
    CssString += "}";
    CssString += ".dividing-border::after {";
    CssString += "background-color: "+data.val()+";";
    CssString += "}";
    CssString += ".tooltip-inner{ background-color: "+data.val()+"; }";
    CssString += ".tooltip.top .tooltip-arrow{ border-top-color: "+data.val()+"; }";
    CssString += ".btn-success{ background: "+data.val()+"; color:"+ColorText(data.val())+"}";
    CssString += ".btn-success:hover{ background: "+ColorLuminance(data.val(), -0.2)+"; color:"+ColorText(ColorLuminance(data.val(), -0.2))+"}";
    CssString += ".btn-success:focus:active,.btn-success:focus{ background-color: "+ColorLuminance(data.val(), -0.2)+"; }";
    CssString += ".sidebar-nav > .sidebar-brand a{";
    CssString += "color: "+data.val()+";";
    CssString += "}";
    CssString += ".nav > li > a{ color: #f0f0f0; border-left: 5px inset transparent; }";
    CssString += ".nav > li > a:focus, .nav > li > a:hover {";
    CssString += "color: "+data.val()+";";
    CssString += "border-left: 5px inset "+data.val()+";";
    CssString += "}";
    CssString += ".nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {";
    CssString += "color: "+data.val()+";";
    CssString += "border-left: 5px inset "+data.val()+";";
    CssString += "}";
    CssString += ".nav-pills > .sidebar-brand.active > a,";
    CssString += ".nav-pills > .sidebar-brand.active > a:hover,";
    CssString += ".nav-pills > .sidebar-brand.active > a:focus {";
    CssString += "color: "+data.val()+";";
    CssString += "}";
    CssString += ".btn-menu {";
    CssString += "color: "+ColorText(data.val())+";";
    CssString += "background-color: "+ColorLight(data.val(), 0.8)+";";
    CssString += "}";
    CssString += ".btn-menu:hover, .btn-menu:focus, .btn-menu:active {";
    CssString += "background-color: "+data.val()+";";
    CssString += "color: "+ColorText(data.val())+";";
    CssString += "}";
    CssString += ".home .form-control{";
    CssString += "border-color: "+data.val()+";";
    CssString += "color: #f0f0f0;";
    CssString += "}";
    CssString += ".home .input-group-addon{";
    CssString += "border-color: "+data.val()+";";
    CssString += "}";
    CssString += ".intro .subscription-form .form-control:focus{";
    CssString += "border-color: "+data.val()+";";
    CssString += "}";
    CssString += ".subscription .small-para{";
    CssString += "color: "+data.val()+";";
    CssString += "}";
    CssString += ".service-row .service-box .service-icon{";
    CssString += "color: "+data.val()+";";
    CssString += "border: 2px solid "+data.val()+";";
    CssString += "}";
    CssString += ".service-row .service-box:hover  .service-icon {";
    CssString += "background-color:  "+data.val()+";";
    CssString += "border-color: "+data.val()+";";
    CssString += "}";
    CssString += ".service-row > div:hover > .service-box{";
    CssString += " border-color: "+data.val()+";";
    CssString += "}";
    CssString += ".testimonial .carousel-indicators li {";
    CssString += "border-color: "+data.val()+";";
    CssString += "}";
    CssString += ".testimonial .carousel-indicators .active {";
    CssString += "border-color: "+data.val()+";";
    CssString += "background-color: "+data.val()+";";
    CssString += "}";
    CssString += ".carousel-content .nav-roundslide a:hover {";
    CssString += "width: 150px;";
    CssString += "color: "+data.val()+";";
    CssString += "background: rgba(15, 15, 15, 0.5);";
    CssString += "}";
    CssString += ".carousel-content .nav-roundslide h3 {";
    CssString += " color: "+data.val()+";";
    CssString += "}";
    CssString += ".portfolio-item .portfolio-overlay{";
    CssString += "background: "+ColorLight(data.val(), 0.8)+";";
    CssString += "}";
    CssString += ".portfolio-item .work-link i{";
    CssString += "border: 2px solid "+ColorText(data.val())+";";
    CssString += "color: "+ColorText(data.val())+";";
    CssString += "}";
    CssString += ".team-list .panel-default > .panel-footer{";
    CssString += "background-color: "+data.val()+";";
    CssString += "border-color: "+data.val()+";";
    CssString += "color: "+ColorText(data.val())+";";
    CssString += "}";
    CssString += ".team-list .team-circle{";
    CssString += "border: 3px solid "+data.val()+";";
    CssString += "}";
    CssString += ".team-list .panel .panel-footer .btn-success:hover{";
    CssString += "color:  "+ColorLuminance(data.val(), -0.2)+";";
    CssString += "background-color: "+ColorText(ColorLuminance(data.val(), -0.2))+";";
    CssString += "}";
    CssString += ".team-list .panel .panel-footer .active{";
    CssString += "color:  "+ColorLuminance(data.val(), -0.2)+";";
    CssString += "background-color: "+ColorText(ColorLuminance(data.val(), -0.2))+";";
    CssString += "}";
    CssString += ".project-detail .lead{";
    CssString += "color: "+data.val()+";";
    CssString += "margin-bottom: 15px;";
    CssString += "}";
    CssString += ".project-detail .rotate-square {";
    CssString += "color: "+data.val()+";";
    CssString += "border: 2px solid "+data.val()+";";
    CssString += "}";
    CssString += ".project-detail .rotate-square:hover {";
    CssString += "background-color: transparent;";
    CssString += "}";
    CssString += ".project-detail .project-icon{";
    CssString += " color: "+data.val()+";";
    CssString += "}";
    CssString += ".contact .contact-social-link a .social-icon{";
    CssString += "color: "+ColorText(data.val())+";";
    CssString += "background-color: "+data.val()+";";
    CssString += "}";
    CssString += ".contact .contact-social-link a .social-icon:hover{";
    CssString += "color: "+ColorText(ColorLuminance(data.val(), -0.2))+";";
    CssString += "background-color: "+ColorLuminance(data.val(), -0.2)+";";
    CssString += "}";
    CssString += ".contact-form .form-control{";
    CssString += "background-color: #fff;";
    CssString += "border: 1px solid transparent;";
    CssString += "}";
    CssString += ".contact-form .form-control:focus{";
    CssString += "border: 1px solid "+data.val()+";";
    CssString += "}";
    CssString += ".footer-holder h5 {";
    CssString += "color: #f0f0f0;";
    CssString += "margin: 0 0 14px;";
    CssString += "}";
    CssString += ".footer-holder .phone a, .footer-holder .email a{";
    CssString += "color: "+data.val()+";";
    CssString += "}";
    CssString += ".footer-holder ul a {";
    CssString += "color: "+data.val()+";";
    CssString += "}";
    CssString += ".footer-holder .phone a:hover, .footer-holder .email a:hover, .footer-holder ul a:hover {";
    CssString += "color: #FFFFFF;";
    CssString += "}";
    CssString += ".footer-holder .email {";
    CssString += "color: "+data.val()+";";
    CssString += "}";
    
    return CssString;
}


$(document).ready(function() {
  // Initialize the tooltip.
  $('#copy-button').tooltip();

  // When the copy button is clicked, select the value of the text box, attempt
  // to execute the copy command, and trigger event to update tooltip message
  // to indicate whether the text was successfully copied.
  $('#copy-button').bind('click', function() {
    var input = document.querySelector('#custom_styles');
    input.setSelectionRange(0, input.value.length + 1);
    try {
      var success = document.execCommand('copy');
      if (success) {
        $('#copy-button').trigger('copied', ['Copied!']);
      } else {
        $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
      }
    } catch (err) {
      $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
    }
  });

  // Handler for updating the tooltip message.
  $('#copy-button').bind('copied', function(event, message) {
    $(this).attr('title', message)
        .tooltip('fixTitle')
        .tooltip('show')
        .attr('title', "Copy to Clipboard")
        .tooltip('fixTitle');
  });
});