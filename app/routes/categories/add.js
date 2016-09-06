import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('category');
  },

  actions: {

    saveCategory(newCategory) {
      newCategory.save().then(() => {
        this.transitionTo('index');
      });
    },

    willTransition() {
      this.controller.get('model').rollbackAttributes();
    }

  }

});
