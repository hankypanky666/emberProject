import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    deleteCategory(category) {
      this.sendAction('deleteCategory', category);
    },

    deleteExpense(expense) {
      this.sendAction('deleteExpense', expense);
    },

    expenseEdit(expense) {
      this.sendAction('expenseEdit', expense);
    },

    saveExpense(expense, category) {
      this.sendAction('saveExpense', expense, category);
    },

    cancelExpenseEdit(expense) {
      this.sendAction('cancelExpenseEdit', expense);
    }

  }

});