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
    },

    isClickedSubCategory(category) {
      this.sendAction('isClickedSubCategory', category);
    },

    discardSaveCategory(category, mainCategory) {
      this.sendAction('discardSaveCategory', category, mainCategory);
    },

    saveCategory(category, parentCategory) {
      this.sendAction('saveCategory', category, parentCategory);
    },

    isClickedAddMoney(category) {
      this.sendAction('isClickedAddMoney', category);
    },

    cancelAddMoney(category) {
      this.sendAction('cancelAddMoney', category);
    },

    saveMoney(category, money) {
      this.sendAction('saveMoney', category, money);
    }

  }

});
