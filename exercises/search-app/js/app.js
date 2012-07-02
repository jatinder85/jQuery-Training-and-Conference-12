$(function() {

	$("input[type='submit']").on("click", function( e ) {
		
		function loadTemplate(url) {
		  var templateCache = window._templateCache = window._templateCache || {};
		  var dfd = $.Deferred();

		  if (templateCache[url]) {
			return templateCache[url];
		  }

		  $.ajax(url, {
			dataType : 'text',
			success : function(tpl) {
			  templateCache[url] = _.template(tpl);
			  dfd.resolve(templateCache[url]);
			}
		  });

		  return dfd.promise();
		}
		
		e.preventDefault();
		
		$.ajax("/data/search.json?q=" + $("input[type='text']").attr("value"), {
		
		  dataType : 'json',
		  success : function(resp) {
			
			console.log(resp);
			
			$.when( loadTemplate('/templates/people-detailed.tmpl') ).done(function(tpl) {
			 
			  var html = tpl( /* */ );
			  
			  $('#results').html( html );
			});
			
		  }
		});
	});

}());