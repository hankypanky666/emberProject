import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    saveCategory(category, parentCategory) {
      this.sendAction('saveCategory', category, parentCategory);
    },

    discardSaveCategory(category, mainCategory) {
      this.sendAction('discardSaveCategory', category, mainCategory);
    }
  }

});
