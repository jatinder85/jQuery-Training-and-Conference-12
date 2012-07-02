$(function() {

  var search, tmpl;

  // Handle form submit.
  $("#searchForm").on("submit", function(event) {
    event.preventDefault();

    var form = $(this);
    var query = form.find("[name='q']").val();

    // If the query is empty or a search is in-progress, abort.
    if (search || /^\s*$/.test(query)) { return; }

    // If a template hasn't already been fetched, fetch it.
    if (!tmpl) { tmpl = $.get("/templates/people-detailed.tmpl"); }

    // Make a search request.
    search = $.getJSON("/data/search", {q: query});

    // When we have the template and search results...
    $.when(tmpl, search).then(function(tmpl, data) {
      // wat
      tmpl = tmpl[0];
      data = data[0];

      // Build object with person property.
      var html;

      if (data.results && data.results.length > 0) {
        html = _.template(tmpl)({ people : data.results });
      } else {
        html = '<li>No results found</li>';
      }

      // Render view.
      $("#results").html(html);

      // No longer making a request.
      search = null;
    });
  });

  var results = $("#results");
  var liked = $("#liked");

  // Like a person.
  results.on("click", "a.like", function(event) {
    event.preventDefault();

    var result = $(this).closest(".result");
    var name = result.find("h2").text();

    // Remove any existing "no results" listitem.
    liked.find(".no-results").remove();

    // Create and append a new listitem. Template?
    $("<li/>").text(name).appendTo(liked);
  });

  // Remove a person.
  results.on("click", "a.remove", function(event) {
    event.preventDefault();
    $(this).closest(".result").remove();
  });

});
