import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  queryParams: 'date',
  isSetedstartDay: true,

  actions: {

    selectStartDay(startDay) {
      if(startDay) {
        this.set('isSetedstartDay', false);
      }
      this.set('minDate', startDay);
      this.set('date', moment(startDay).format('YYYY-MM-DD'));
    },

    selectEndDay(endDay) {
      this.set('date', moment(this.get('minDate')).format('YYYY-MM-DD') + '&' + moment(endDay).format('YYYY-MM-DD'));
    }
  }

});
