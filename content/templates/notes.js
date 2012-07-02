// # Templates
//
// It's common to use JavaScript to update the HTML of your page, and often
// the contents of that HTML are based on some data. One way to achieve this
// is to build up an HTML string and then insert it into the page.
$.ajax('/data/people.json', {
  success : function(resp) {
    var html = '';
    $.each(resp.people, function(idx, person) {
      html +=   '<li>' +
                  '<h2>' + person.name + '</h2>' +
                  '<p>' + person.bio + '</p>' +
                '</li>';
    });
    $('#target').html(html);
  }
});

// We could improve this approach a little by using $.map to iterate over the
// response and build up an array, then use `.join()` to turn that array into
// the string we need.
$.ajax('/data/people.json', {
  success : function(resp) {
    var html = $.map(resp.people, function(person) {
      return  '<li>' +
                '<h2>' + person.name + '</h2>' +
                '<p>' + person.bio + '</p>' +
              '</li>';
    }).join('');

    $('#target').html(html);
  }
});

// We could make this a little nicer by implementing a very basic templating
// system inside our success callback.
$.ajax('/data/people.json', {
  success : function(resp) {
    var tpl = '<li>' +
                '<h2>{{name}}</h2>' +
                '<p>{{bio}}</p>' +
              '</li>';

    var html = $.map(resp.people, function(person) {
      return tpl
        .replace('{{name}}', person.name)
        .replace('{{bio}}', person.bio);
    }).join(' ');

    $('#target').html(html);
  }
});

// We could even create a *very* naive templating function that lets us pass
// in a template string and the data to use with it.
function template(tpl, data) {
  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      tpl = tpl.replace('{{' + k + '}}', data[k]);
    }
  }

  return tpl;
}

$.ajax('/data/people.json', {
  success : function(resp) {
    var tpl = '<li>' +
                '<h2>{{name}}</h2>' +
                '<p>{{bio}}</p>' +
              '</li>';

    var html = $.map(resp.people, function(person) {
      return template(tpl, person);
    }).join(' ');

    $('#target').html(html);
  }
});

// We could keep going, but luckily other people have already done this for us.
// For example, the Underscore library includes `_.template`, and there are
// many other templating libraries as well.
$.ajax('/data/people.json', {
  success : function(resp) {
    var tpl = '<li>' +
                '<h2><%= name %></h2>' +
                '<p><%= bio %></p>' +
              '</li>';

    var html = $.map(resp.people, function(person) {
      return _.template(tpl)(person);
    }).join(' ');

    $('#target').html(html);
  }
});

// Part of the point of using a templating library is to let us get our
// HTML out of our JavaScript, so we really want to get our templates out of
// our JavaScript, too.
//
// One option is to include our template in our HTML.
$.ajax('/data/people.json', {
  success : function(resp) {
    var tpl = $('#tpl-person').text();

    var html = $.map(resp.people, function(person) {
      return _.template(tpl)(person);
    }).join(' ');

    $('#target').html(html);
  }
});

// When we store our template in HTML, it gets loaded with every page load;
// we can't take advantage of caching.
//
// Another option is to load our template via AJAX when we need it,
// and cache the response so we don't have to keep loading it. The `$.when`
// method makes this easy.
function loadTemplate(url) {
  var templateCache = window._templateCache = window._templateCache || {};

  if (templateCache[url]) {
    return templateCache[url];
  }

  return $.ajax(url, {
    dataType : 'text',
    success : function(tpl) {
      templateCache[url] = tpl;
    }
  });
}

$.ajax('/data/people.json', {
  success : function(resp) {
    $.when(loadTemplate('/templates/person.tmpl')).then(function(tpl) {
      var html = $.map(resp.people, function(person) {
        return _.template(tpl)(person);
      }).join(' ');

      $('#target').html(html);
    });
  }
});

// If you're using RequireJS, you can also use its `text!` plugin to specify
// a text dependency such as a template.

// With templating libraries, we get great features like iteration, so we can
// simplify our code even further.
function loadTemplate(url) {
  var templateCache = window._templateCache = window._templateCache || {};

  if (templateCache[url]) {
    return templateCache[url];
  }

  return $.ajax(url, {
    dataType : 'text',
    success : function(tpl) {
      templateCache[url] = tpl;
    }
  });
}

$.ajax('/data/people.json', {
  success : function(resp) {
    $.when(loadTemplate('/templates/people.tmpl')).then(function(tpl) {
      var html = _.template(tpl)(resp);
      $('#target').html(html);
    });
  }
});

// When we call Underscore's `template()` method, it creates a function;
// we don't want to do this over and over again for the same template, so
// we can store the function for re-use. To do this, we need to create our own
// deferred.
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

$.ajax('/data/people.json', {
  success : function(resp) {
    $.when(loadTemplate('/templates/people.tmpl')).done(function(tpl) {
      var html = tpl(resp);
      $('#target').html(html);
    });
  }
});
