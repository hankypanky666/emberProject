import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  queryParams: 'date',
  isSetedstartDay: true,

  dateChanged: Ember.observer('date', function () {
    if(Ember.get(this, 'date') && Ember.get(this, 'date').split('&').length > 1) {
      let dates = Ember.get(this, 'date').split('&');
      Ember.set(this, 'startDay', dates[0]);
      Ember.set(this, 'endDay', dates[1]);
    } else {
      Ember.set(this, 'startDay', null);
      Ember.set(this, 'endDay', null);
    }
  }),

  actions: {

    selectStartDay(startDay) {
      if(startDay) {
        this.set('isSetedstartDay', false);
        this.set('minDate', startDay);
        this.set('date', moment(startDay).format('YYYY-MM-DD'));
      }
    },

    selectEndDay(endDay) {
      if(endDay) {
        this.set('date', moment(this.get('minDate')).format('YYYY-MM-DD') + '&' + moment(endDay).format('YYYY-MM-DD'));
      }
    }
  },

  chartOptions: {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Total amount by category'
    },
  }

});
