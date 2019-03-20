'use strict';

var $ = require('jquery');
var Elasticsearch = require('elasticsearch-browser/elasticsearch');
var Handlebars = require('handlebars');

Handlebars.registerHelper('raw', function(options) {
  return options.fn(this);
});

$('#search').on('keyup focus', function() {
  var $search = $(this);

  if ($search.val().length >= 3) {
    $('.search .animation').css('display', 'flex');
    $('.search .results').html('');

    var template = Handlebars.compile(
      '{{#if error}}<p class="error">{{error}}</p>{{else}}<ul>{{#each matches}}<li><a href="{{url}}"><label>{{component}} :: {{version}}</label><span class="score">Score {{score}}</span><div class="head">{{head}}</div><div class="body">{{body}}</div></a></li>{{/each}}</ul>{{/if}}'
    );

    var client = new Elasticsearch.Client({
      host: $search.data('host'),
      httpAuth: $search.data('auth')
    });

    client.search({
      q: $search.val()
    }).then(function (body) {
      var context = {
        matches: [],
        error: ''
      };

      $.each(body.hits.hits, function(index, hit) {
        context.matches.push({
          url: hit._source.url,
          component: hit._source.component,
          version: hit._source.version == 'master' ? 'latest' : hit._source.version,
          head: hit._source.title,
          body: hit._source.text.substr(0, 100) + ' ...',
          score: Math.round(hit._score)
        });
      });

      if (context.matches.length == 0) {
        context.error = 'No matching result found'
      }

      $('.search .results')
        .html(template(context))
        .show();
    }, function (error) {
      if (window.console) {
        console.trace(error.message);
      }

      var context = {
        error: 'Failed to load results'
      };

      $('.search .results')
        .html(template(context))
        .show();
    });
  }
});

$('#search').on('blur', function() {
  $('.search .results').hide('');
});
