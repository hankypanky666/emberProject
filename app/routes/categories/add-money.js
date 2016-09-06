import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return Ember.RSVP.hash({
      parent: this.store.find('category', params.id),
      children: this.store.createRecord('expense')
    });
  },

  actions: {

    saveMoney(money) {
      // create relations
      this.controller.get('model.parent').get('expenses').pushObject(money);

      money.save().then(() => {
        this.controller.get('model.parent').save();
        this.transitionTo('index');
      });
    },

    willTransition() {
      this.controller.get('model.children').reload(); // reloading model for create sumMoney
      this.controller.get('model.children').rollbackAttributes();
    }

  }

});
