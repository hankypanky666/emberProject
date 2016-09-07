import Ember from 'ember';

export default Ember.Route.extend({

  model() {

    return Ember.RSVP.hash({
      category: this.store.findAll('category').then((result) => {
        return result.filter(function (item) {
          return item.get('parent').content === null; // О_о
        });
      }),

      save: this.store.createRecord('category')
  });

  },

  setupController(controller, model) {
    const category = model.category;
    const saveCategory = model.save;

    this._super(controller, category);

    controller.set('save', saveCategory);

  },

  actions: {

    // Main actions
    deleteCategory(category) {
      let child_deletions = this._recurssiveDeleteCategories(category.get('children'));
      let expenses_deletions = this._recurssiveDeleteCategories(category.get('expenses'));

      Ember.RSVP.all([child_deletions, expenses_deletions]).then(() => {
        return category.destroyRecord().then(() => {
          this.controller.get('model').removeObject(category); // ничего лучше не придумал, тк родитель всегда
          // оставался в дереве(
        });
      });

    },

    // Categories actions
    createMainCategory(category) {
      category.set('addClicked', true);
    },

    saveCategory(newCategory) {
      newCategory.save().then(() => {
        this.controller.get('save').set('addClicked', false);
      });
    },

    // Expenses actions
    deleteExpense(expense) {
      expense.destroyRecord();
    },

    expenseEdit(expense) {
      expense.set('isEditing', true);
    },

    saveExpense(expense) {
      expense.set('isEditing', false);
      expense.save();
    },

    cancelExpenseEdit(expense) {
      expense.set('isEditing', false);
      expense.rollbackAttributes();
    },

  },

  _recurssiveDeleteCategories(categories) {
    return categories.map((child) => {

      // if (child.get('children') && (child.get('children').content.length > 0)) {
      //   this._recurssiveDeleteCategories(child.get('children'));
      // }

      return child.destroyRecord().then(() => {
        if (child.get('expenses')) {
          child.get('expenses').map((item) => {
            return item.destroyRecord();
          });
        }
      });
    });
  }

});