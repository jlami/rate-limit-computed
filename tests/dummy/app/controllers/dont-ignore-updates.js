// BEGIN-SNIPPET debounce-throttle-example
import Ember from "ember";

const {
  computed
  } = Ember;

export default Ember.Controller.extend({

  cubedTriggered: 0,
  
  testTrigger: Ember.observer('squared', function() {
    
  }),

  squared: computed.debounce('count', function() {
    var count = this.get('count');
    if (this.get('count') === 1) {
      this.incrementProperty('count');
    }
    this.incrementProperty('squaredTriggered');
    return count * count;
  }
  , 16
  ),

  count: 0,

  actions: {
    plusOne: function() {
      this.incrementProperty('count');
    },
  }

});
// END-SNIPPET
