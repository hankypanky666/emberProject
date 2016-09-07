import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),

  children: DS.hasMany('category', { inverse: 'parent'}),
  parent: DS.belongsTo('category', { inverse: 'children'}),

  expenses: DS.hasMany('expense', { inverse: 'category'}),

  // create sum of all money
  selfExpensesAmounts: Ember.computed.mapBy('expenses', 'money'),
  selfExpensesAmountsSum: Ember.computed.sum('parseFloatMoney'),
  subCategoriesAmounts: Ember.computed.mapBy('children', 'selfExpensesAmountsSum'),
  subCategoriesAmountsSum: Ember.computed.sum('subCategoriesAmounts'),
  amount: Ember.computed('selfExpensesAmountsSum', 'subCategoriesAmountsSum', function() {
    return Ember.get(this, 'selfExpensesAmountsSum') + Ember.get(this, 'subCategoriesAmountsSum');
  }),

  // changeselfExpensesAmounts: Ember.observer('selfExpensesAmounts', function () {
  //   console.log(Ember.get(this, 'selfExpensesAmounts'));
  // }),

  parseFloatMoney: Ember.computed('selfExpensesAmounts', function () {
    return Ember.get(this, 'selfExpensesAmounts').map((item) => {
      return parseFloat(item);
    });
  }),

  isValid: Ember.computed.empty('name')
});