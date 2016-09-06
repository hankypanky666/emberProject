import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('categories', function() {
    this.route('add');
    this.route('addSubcategory', { path: '/:category_id' });
    this.route('addMoney', { path: '/:id' });
  });
});

export default Router;
