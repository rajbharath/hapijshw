var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ port: 4000 });

server.start(function(){
  console.log("Server running at " + server.info.uri);
});


server.register(require('inert'), function (err) {
    if (err) {
        throw err;
    }

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

    server.route({
      method: 'GET',
      path: '/{name}',
      handler: function(request, reply) {
        reply('{ name: '+ request.params.name +'}');
      }
    });

});
