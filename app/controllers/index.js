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
    },

    showChart(model) {
      this._updateCharData(model);
      this.set('isShowChartCliked', !this.get('isShowChartCliked'));
    }
  },

  chartOptions: {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Total amount by category'
    },
  },

  contentDidChange: Ember.observer('content.@each.isLoaded', function() {
    // add redraw logic here. ex:
    let model = this.get('content');
    this._updateCharData(model);
  }),

  _updateCharData(model) {
    let series = [{
      name: 'total',
      data: []
    }];
    //console.log(series);
    model.forEach((item) => {
      if(!item.get('isNew')){
        item.get('expenses').then((res) => {
          series[0].data.push({
            name: item.get('name'),
            y: item.get('amount')
          });
        });
      }
    });
    this.set('series', series);
  }

});
