import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),

  children: DS.hasMany('category', { inverse: 'parent' }),
  parent: DS.belongsTo('category', { inverse: 'children' }),

  expenses: DS.hasMany('expense', { inverse: 'category' }),

  // create sum of all money
  allMoney: Ember.computed.mapBy('expenses', 'money'),
  sumMoney: Ember.computed.sum('allMoney'),

  // child: Ember.computed.mapBy('children', 'expenses'),

  // ch: Ember.computed.map('children', function(chore, index) {
  //   return chore.get('expenses').map((item) => {
  //     return item.get('id');
  //   });
  // }),

  isValid: Ember.computed.empty('name')
});
