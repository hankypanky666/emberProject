import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    deleteCategory(category) {
      this.sendAction('deleteCategory', category); // это хорошая практика?
    }
  }

});
