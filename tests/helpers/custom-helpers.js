import Ember from "ember";

export function getController(app, name) {
  Ember.assert('helper must be given a controller name', !!name);
  return app.__container__.lookup('controller:' + name);
}