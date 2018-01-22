import Ember from "ember";

const {
  run,
  computed
  } = Ember;

const {
  debounce,
  join,
  cancel
  } = run;

export default function debouncedProperty() {

  var args = [].slice.apply(arguments);
  var rate = args.pop();
  var method = args.pop();

  var __value = null;
  var __next = null;
  var __onDestroy = false;
  var __isNotifying = false;

  var methodFn = function(key, value, oldValue) {

    if (!this.get('isDestroyed')) {
      if (!__isNotifying) {
        let tags = Ember.meta(this).readableTags();
        let tag = tags && tags[key];
        let rev = tag && tag.value();
        __value = method.call(this, key, value, oldValue);
        __isNotifying = (!tag || tag.validate(rev));
        
        if (!this.get('isDestroying')) {
          join(this, 'notifyPropertyChange', key);
        }
      }
    }

  };

  args.push(function(key, value, oldValue) {
    if (__isNotifying) {
      __isNotifying = false;
      return __value;
    }
    
    if (!__onDestroy) {
      var _super = this.willDestroy;
      this.willDestroy = function() {
        cancel(__next);
        _super.apply(this);
      };
      __onDestroy = true;
    }
    __next = debounce(this, methodFn, key, value, oldValue, rate, false);
    return __value;
  });
  return computed.apply(this, args);

}
