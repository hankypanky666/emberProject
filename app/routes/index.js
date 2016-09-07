import Ember from 'ember';

export default Ember.Route.extend({

  model() {

    return Ember.RSVP.hash({
      category: this.store.findAll('category').then((result) => {
        return result.filter(function (item) {
          return item.get('parent').content === null; // О_о
        });
      })
    });

  },

  setupController(controller, model) {
    const category = model.category;
    this._super(controller, category);
  },


  actions: {
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

    deleteExpense(expense) {
      expense.destroyRecord();
    },

    expenseEdit(expense) {
      expense.set('isEditing', true);
    },

    saveExpense(expense, category) {
      expense.set('isEditing', false);
      expense.save();
    }

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
