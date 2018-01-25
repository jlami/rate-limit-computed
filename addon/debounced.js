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

  var methodFn = function(key, value, oldValue) {
    if (!this.get('isDestroyed')) {
        __value = method.call(this, key, value, oldValue);
        if (!this.get('isDestroying')) {
          join(this, this.set, key, __value);//updates computed.cache and notifies dependents
        }
    }
  };
  
  let getset = {
    get(key, value, oldValue) {
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
    },
    set(key, value) {
      return value;//ember computed does the caching
    }
  }

  args.push(getset);
  return computed.apply(this, args);

}
