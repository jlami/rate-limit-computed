import throttled from "rate-limit-computed/throttled";
import debounced from "rate-limit-computed/debounced";
import Ember from "ember";

export default {
  name: 'extend-ember-computed',
  initialize: function() {
    Ember.computed.throttle = throttled;
    Ember.computed.debounce = debounced;
  }
};
