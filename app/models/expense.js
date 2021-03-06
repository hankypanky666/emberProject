import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  category: DS.belongsTo('category', { inverse: 'expenses'}),
  money: DS.attr('number'),
  description: DS.attr('string'),
  createdAt: DS.attr('string'),

  isValid: Ember.computed.empty('money'),

});
