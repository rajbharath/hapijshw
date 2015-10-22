var Hapi = require('hapi');
var Good = require('good');
var Inert = require('inert');

var server = new Hapi.Server();

server.connection({ port: 4000 });

// Registering Logging dependency
server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, function (err) {
  if(err) {
    throw err;
  }
  server.start(function(){
    server.log('info', 'Server running at '+ server.info.uri);
  });
});

// Serving Static files
server.register(Inert, function (err) {
    if (err) {
        throw err;
    }

    server.route({
      method: 'GET',
      path: '/{name}',
      handler: function(request, reply) {
        reply('{ name: '+ request.params.name +'}');
      }
    });

});

// Serving Normal http requests
server.route({
        method: 'GET',
        path: '/home',
        handler: function (request, reply) {
            reply.file('./public/home.html');
        }
    });


    server.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        reply('Hello World');
      }
    });
