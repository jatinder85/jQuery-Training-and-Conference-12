(function( window ) {

  var Srchr, Template, UI;

  Srchr = {

    isLocked: false,

    init: function() {

      // Initialize UI event bindings
      UI.init();

      // Request Templates for UI display
      Template.init();
    },

    query: function( qry ) {
      // If we're currently in progress, return early
      if ( this.isLocked ) {
        return;
      }

      // Lockout any requests until this is released
      // in the success callback
      this.isLocked = true;

      // Make a request for the given query string
      $.ajax({
        url: "/data/search",
        data: qry,
        type: "GET",
        dataType: "json",
        success: $.proxy(function( data ) {
          // Process and render the response results
          this.process( data.results );

          // release the query lock
          this.isLocked = false;
        }, this )
      });
    },

    process: function( records ) {
      var template = Template.cache["person-detailed"];

      // This is a bit too "hard coded" :()
      this.render(
        template({
          people: $.map( records, function( record ) {
            var a = record.address;

            return $.extend({}, record, {
              address: [ a.street, a.city, a.state, a.zipcode ].join(", ")
            });
            /*
            r = record
            a = r.address
            {
              name: r.name
              company: r.company,
              address: [ a.street, a.city, a.state, a.zipcode ].join(", ")
            }
            */
          })
        })
      );
    },

    render: function( html ) {
      UI.cache.results.html( html );
    },


    // barf. like and unlike are too similar

    like: function( target ) {
      var liked, li;

      liked = UI.cache.liked;
      li = $("<li>", {
        id: btoa(target),
        text: target
      });

      liked.append( li );
      liked.find(".no-results").hide();
    },

    unlike: function( target ) {
      var liked, li;

      liked = UI.cache.liked;
      li = liked.find( "li:contains(" + target + ")" );

      li.remove();
      liked.find(".no-results").show();
    }
  };

  Template = {
    names: {
      "person-detailed": "/templates/person-detailed.tmpl"
    },

    cache: {},

    init: function() {
      $.each( this.names, $.proxy(function( key, path ) {
        this.request( key, path );
      }, this) );
    },

    // request template by key/path or return existing
    request: function( key, path ) {

      // Template may already exist, if so, return immediately
      if ( this.cache[ key ] ) {
        return this.cache[ key ];
      }

      var callback = $.proxy(function( data ) {
        // "Register" the template in the cache
        this.cache[ key ] = _.tmpl( data );
      }, this );

      $.get( path, callback );
    }
  };

  UI = {
    selectors: [
      "searchForm",
      "results",
      "liked"
    ],
    // Cached jQuery
    cache: {},

    init: function() {
      $.each( this.selectors, function( k, selector ) {
        UI.cache[ selector ] = $( "#" + selector );
      });

      this.bind();
    },

    bind: function() {
      var nodes = this.cache;

      // Bind form submission events
      nodes.searchForm.on( "submit", function( event ) {
        var $this, serialized;

        $this = $(this);
        serialized = $this.serialize();

        // Prevent the page from making an actual GET action request
        event.preventDefault();

        // If the serialized string length is more then 2 chars
        // "q=" then do magical search query
        if ( serialized.length > 2 ) {
          Srchr.query( serialized );
        }
      });

      // Bind like/unlike button events
      nodes.results.on( "click", ".like,.remove", function( event ) {
        var $this, method;

        $this = $(this);
        method = $this.hasClass("remove") ? "unlike" : "like";

        // barf. this is horrible.
        Srchr[ method ]( $this.parent("li").find("h2").text() );
      });
    }
  };

  // Exose this public API
  window.Srchr = Srchr;

}( this ));


$(function() {
  Srchr.init();
});
