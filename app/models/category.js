import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),

  children: DS.hasMany('category', { inverse: 'parent'}),
  parent: DS.belongsTo('category', { inverse: 'children'}),

  expenses: DS.hasMany('expense', { inverse: 'category'}),

  // create sum of all money
  selfExpensesAmounts: Ember.computed.mapBy('expenses', 'money'),
  dates: Ember.computed.mapBy('expenses', 'createdAt'),
  selfExpensesAmountsSum: Ember.computed.sum('parseFloatMoney'),
  subCategoriesAmounts: Ember.computed.mapBy('children', 'selfExpensesAmountsSum'),
  subCategoriesAmountsSum: Ember.computed.sum('subCategoriesAmounts'),
  amount: Ember.computed('selfExpensesAmountsSum', 'subCategoriesAmountsSum', function() {
    return Ember.get(this, 'selfExpensesAmountsSum') + Ember.get(this, 'subCategoriesAmountsSum');
  }),

  changeselfExpensesAmounts: Ember.observer('amount', function () {
    //console.log(Ember.get(this, 'name'));
    //console.log(Ember.get(this, 'amount'));
    return Ember.get(this, 'amount');
  }),

  parseFloatMoney: Ember.computed('selfExpensesAmounts', function () {
    return Ember.get(this, 'selfExpensesAmounts').map((item) => {
      return parseFloat(item);
    });
  }),

  isValid: Ember.computed.empty('name')
});
