import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return Ember.RSVP.hash({
      model: this.store.find('category', params.cat_id),
      children: this.store.createRecord('category')
    });
  },

  actions: {

    saveCategory(newCategory) {
      // create relations
      this.controller.get('model.parent').get('children').pushObject(newCategory);

      newCategory.save().then(() => {
        this.controller.get('model.parent').save();
        this.transitionTo('index');
      });
    },

    willTransition() {
      this.controller.get('model.children').rollbackAttributes();
    }

  }

});
