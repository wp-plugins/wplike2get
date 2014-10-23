/*
 jquery.gplusone.js - http://socialmediaautomat.com/jquery-gplusone-js.php
 Copyright (c) 2011 Stephan Helbig
 This plugin available for use in all personal or commercial projects under both MIT and GPL licenses.
 */

(function ($) {
	$.fn.gplusone = function (options) {

		//Set the default values, use comma to separate the settings
		var defaults = {
			mode               : 'insert',											//insert|append
			size               : 'standard',										//small|medium|standard|tall
			count              : true,												//true|false
			href               : false,												//false|url
			lang               : 'en-US',											//en-US|en-GB|de|es|fr|...
			hideafterlike      : false,								//true|false (only possible with mode: 'insert')
			googleanalytics    : false,							//true|false
			onlike             : "return true;",
			onunlike           : "return true;"
		}

		var options = $.extend(defaults, options);

		return this.each(function () {
			var o = options;
			var obj = $(this);
			var dynUrl = document.location;
			var dynTitle = document.title.replace("'", '&apos;');

			if (!o.href) {
				o.href = dynUrl;
			}
			var strcount = 'false';
			if (o.count) {
				strcount = 'true';
			}
			(function () {
				var e = document.createElement('script');
				e.async = true;
				e.src = document.location.protocol + '//apis.google.com/js/plusone.js';
				$(e).append("{lang: '" + o.lang + "'}");

				$('head').append(e);
				var e = document.createElement('script');
				var hidefunc = '';
				if (o.hideafterlike) {
					hidefunc = '$(obj).hide();';
				}
				var gfunclike = '';
				var gfuncunlike = '';

				if (o.googleanalytics) {
					if (typeof pageTracker != 'undefined') {
						gfunclike = "pageTracker._trackEvent('google+', 'plussed', document.location);";
						gfuncunlike = "pageTracker._trackEvent('google+', 'unplussed', document.location);";
					}
					if (typeof _gaq != 'undefined') {
						gfunclike = "_gaq.push(['_trackEvent', 'google+', 'plussed', document.location]);";
						gfuncunlike = "_gaq.push(['_trackEvent', 'google+', 'unplussed', document.location]);";
					}
					if (typeof ga != 'undefined') {
						gfunclike = "ga('send', 'event', 'google+', 'plussed', document.location);";
						gfuncunlike = "ga('send', 'event', 'google+', 'unplussed', document.location);";
					}
				}

				$(e).append("function gplus_callback(r){if(r.state=='on'){" + hidefunc + gfunclike + o.onlike + "}else{" + gfuncunlike + o.onunlike + "}}");
				$('head').append(e);
			}());

			var thtml = '<g:plusone size="' + o.size + '" callback="gplus_callback" href="' + o.href + '" count="' + strcount + '"></g:plusone>';
			if (o.mode == 'insert')
				$(obj).html(thtml);
			else
				$(obj).append(thtml);
		});
	}
})(jQuery);