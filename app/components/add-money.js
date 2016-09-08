import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

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
