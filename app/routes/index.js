import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({

  queryParams: {
    date: {refreshModel: true}
  },

  model(params) {
    //console.log(params);
    if (params.date) {
      return Ember.RSVP.hash({
        category: this.store.findAll('category', { reload: true }).then((result) => {
          return result.map((item) => {
            return item;
          });
        }).then((response) => {
          return response.filter((item) => {
            item.get('expenses').then(f => {
              return f.filter(item => {
                if(params.date.split('&').length > 1) {
                  var startAt = params.date.split('&')[0];
                  var endAt = params.date.split('&')[1];
                }
                let start = startAt ? startAt : moment(params.date);
                let end =  endAt ? endAt : moment(moment().format('YYYY-MM-DD'));
                let range = moment.range(start, end);

                //console.log('start:', start);
                //console.log('end:', end);
                //console.log('date:', moment(item.get('createdAt')));
                //console.log(range.contains(moment(item.get('createdAt'))));
                return range.contains(moment(item.get('createdAt')));
              });
            }).then((res) => {
              item.set('expenses', res);
            });
            return item.get('parent').content === null;
          });
        }),
        save: this.store.createRecord('category'),
      });
    }
    return Ember.RSVP.hash({
      category: this.store.findAll('category').then((result) => {

        return result.filter(function (item) {
          //item.set('expenses', q);
          return item.get('parent').content === null;
        });
      }),

      save: this.store.createRecord('category'),
    });
  },

  setupController(controller, model) {
    const category = model.category;
    const saveCategory = model.save;
    const today = moment();

    //const saveSubCategory = model.saveSub;

    this._super(controller, category);

    controller.set('save', saveCategory);

    // filter params
    controller.set('day', today.format('YYYY-MM-DD'));
    controller.set('weekly', today.subtract(7, "days").format('YYYY-MM-DD'));
    controller.set('month', today.subtract(30, "days").format('YYYY-MM-DD'));

  },

  actions: {

    // Main actions
    deleteCategory(category) {
      let child_deletions = this._recurssiveDeleteCategories(category.get('children'));
      let expenses_deletions = this._recurssiveDeleteCategories(category.get('expenses'));

      Ember.RSVP.all([child_deletions, expenses_deletions]).then(() => {
        return category.destroyRecord().then(() => {
          this.controller.get('model').removeObject(category); // ничего лучше не придумал, тк родитель всегда
          // оставался в дереве(
        });
      });

    },

    // Categories actions
    createMainCategory(category) {
      category.set('addClicked', true);
    },

    saveCategory(newCategory, parentCategory) {
      newCategory.set('isClickUpdate', false);
      if (parentCategory) {
        newCategory.set('addSubClicked', false);
        parentCategory.get('children').pushObject(newCategory);

        newCategory.save().then(() => {
          parentCategory.save();
        });
      } else {
        newCategory.save().then(() => {
          this.controller.get('save').set('addClicked', false);
          this.refresh();                                       // SOS this is NORMALLY?
        });
      }
    },

    willTransition() {
      this.controller.get('save').rollbackAttributes();
    },

    discardSaveCategory(category, mainCategory) {
      if (mainCategory) {
        this.controller.get('save').set('addClicked', false);
        this.controller.get('save').set('name', null);
      }

      if (category.get('isNew')) {
        category.set('name', null);
        category.set('addSubClicked', false);
      }
      category.set('isClickUpdate', false);
      //category.rollbackAttributes();
    },

    isClickedSubCategory(category) {
      category.set('saveSub', this.store.createRecord('category'));
      category.get('saveSub').set('addSubClicked', true);
    },

    isClickedUpdate(category) {
      category.set('isClickUpdate', true);
    },

    // Money actions
    isClickedAddMoney(category) {
      category.set('saveMoney', this.store.createRecord('expense'));
      category.get('saveMoney').set('addMoneyClicked', true);
    },

    cancelAddMoney(category) {
      category.get('saveMoney').set('addMoneyClicked', false);
    },

    saveMoney(category, money) {
      money.set('createdAt', moment().format('YYYY-MM-DD'));
      category.get('expenses').pushObject(money);

      money.save().then(() => {
        category.save();
        category.get('saveMoney').set('addMoneyClicked', false);
      });
    },

    // Expenses actions
    deleteExpense(expense) {
      expense.destroyRecord();
    },

    expenseEdit(expense) {
      expense.set('isEditing', true);
    },

    saveExpense(expense) {
      expense.set('isEditing', false);
      expense.save();
    },

    cancelExpenseEdit(expense) {
      expense.set('isEditing', false);
      expense.rollbackAttributes();
    },

    // filters


  },



  _recurssiveDeleteCategories(categories) {
    return categories.map((child) => {

      // if (child.get('children') && (child.get('children').content.length > 0)) {
      //   this._recurssiveDeleteCategories(child.get('children'));
      // }

      return child.destroyRecord().then(() => {
        if (child.get('expenses')) {
          child.get('expenses').map((item) => {
            return item.destroyRecord();
          });
        }
      });
    });
  }

});
