$(function() {
  var searchForm = $('#searchForm');
  var results = $('#results');
  var liked = $('#liked');
  var templateCache = {};
  var submitting = false;

  var srchr = {
    init : function() {
      results.on('click', '.like', function() {
        var name = $(this).closest('li').find('h2').text();
        srchr.like(name);
      });

      results.on('click', '.remove', function() {
        $(this).closest('li').remove();
      });

      searchForm.on('submit', function(event) {
        event.preventDefault();

        if (submitting) { return; }

        var form = $(this);
        var query = $.trim(form.find('input.search-query').val());

        if (!query) { return; }

        submitting = true;

        var btn = form.find('.btn').addClass('disabled');
        var template = srchr.loadTemplate('/templates/people-detailed.tmpl');
        var results = $.ajax({
          url : '/data/search.json',
          data : { q : query },
          type : 'GET',
          dataType : 'json'
        });

        $.when(template, results).done(function(tpl, data) {
          srchr.showResults(data[0], tpl);
          btn.removeClass('disabled');
          submitting = false;
        });
      });
    },

    showResults : function(data, tpl) {
      var html = tpl({ people : data.results });
      results.html(html);
    },

    loadTemplate : function(name) {
      if (templateCache[name]) {
        return templateCache[name];
      }

      var dfd = $.Deferred();

      $.ajax({
        url : name,
        dataType : 'text',
        success : function(tpl) {
          templateCache[name] = _.template(tpl);
          dfd.resolve(templateCache[name]);
        }
      });

      return dfd.promise();
    },

    like : function(name) {
      liked.find('.no-results').remove();

      $('<li>', {
        text : name
      }).appendTo(liked);
    }
  };

  srchr.init();
});
