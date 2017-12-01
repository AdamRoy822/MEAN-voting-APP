'use strict';


module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);

  app.route('/userlist').get(users.getuserlist);
  app.route('/userlist').post(users.postuserlist);
  app.route('/userlist/:id').delete(users.deleteuserlistid);
  app.route('/userlist/:id').get(users.getuserlistid);
  app.route('/userlist/:id').put(users.putuserlistid);
  
  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
