import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('category').then((result) => {
      return result.filter(function (item) {
        return item.get('parent').content === null; // О_о
      });
    });
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

    }
  },

  _recurssiveDeleteCategories(categories) {
    return categories.map((child) => {

      // if (child.get('children') && (child.get('children').content.length > 0)) {
      //   this._recurssiveDeleteCategories(child.get('children'));
      // }

      if (child.get('expenses')) {
        child.get('expenses').map((item) => {
          return item.destroyRecord();
        });
      }

      return child.destroyRecord();
    });
  }

});
