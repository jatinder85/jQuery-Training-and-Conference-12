var express   = require('express'),
    Faker     = require('Faker'),
    fs        = require('fs'),
    _         = require('underscore'),

    site      = express.createServer(),
    staticDir = express['static'];

var fakeData = [];

for (var i = 0; i < 1000; i++) {
  fakeData.push(Faker.Helpers.userCard());
}

module.exports = function(base, port) {
  opts = {
    port :      port || 8000,
    baseDir :   (base || '.') + '/'
  };

  site.configure(function() {
    [ 'content', 'exercises', 'templates', 'data', 'assets' ]
      .forEach(function(dir) {
        site.use('/' + dir, staticDir(opts.baseDir + dir));
      });

    site.use(express.bodyParser());
  });

  site.get("/", function(req, res) {
    fs.createReadStream(opts.baseDir + 'index.html').pipe(res);
  });

  site.get("/favicon.ico", function(req, res) {
    fs.createReadStream(opts.baseDir + '/assets/img/favicon.ico').pipe(res);
  });

  site.get("/data/search.json", function(req, res) {
    console.log('A result is guaranteed for', fakeData[0].name);

    var query = req.query.q;
    var results = [];

    if (!query || !query.trim()) {
      console.log('Query was empty');
    } else {
      console.log('Received query', query);

      results = _.filter(fakeData, function(item) {
        var possibles = [ item.name, item.username, item.company.name ];
        return _.any(possibles, function(p) {
          return p.toLowerCase().match(query.toLowerCase());
        });
      });
    }

    // simulate latency
    setTimeout(function() {
      res.end(JSON.stringify({ results : results }));
    }, 500);
  });

  site.get('/data/search/sample.json', function(req, res) {
    var sample = [];

    for (var i = 0; i < 10; i++) {
      sample.push(fakeData[i]);
    }

    res.end(JSON.stringify({ results : sample }));
  });

  site.post("/data/save", function(req, res) {
    console.log('Server received', req.body);
    var data = req.body;
    data.saved = true;

    // simulate latency
    setTimeout(function() {
      res.end(JSON.stringify(data));
    }, 500);
  });

  // Actually listen
  site.listen(opts.port || null);
  console.log("Now serving Bocoup Training Goodness at http://localhost:" + (opts.port || ''));
};
