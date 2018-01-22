import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { getController } from '../helpers/custom-helpers';
var App;

module('Ember.computed.debounce Integration Tests', {

  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }

});

test("Ember.computed.debounce updates property values correctly", function(assert) {
  assert.expect(12);
  visit('/');

  var controller = getController(App, 'index');

  andThen(function () {

    assert.equal(controller.get('count'), 0, 'The count begins at 0');
    assert.equal(controller.get('squaredTriggered'), 1, 'The computed property was triggered once during setup.');
    assert.equal(find('#squaredValue').text(), '0', 'The Screen reflects the correct initial value.');
    assert.equal(controller.get('squared'), 0, 'The computed property is set correctly during setup.');

    click('#plusOne');

    andThen(function() {
      assert.equal(controller.get('count'), 1, 'The count was incremented to 1.');
      assert.equal(controller.get('squaredTriggered'), 2, 'The computed property triggers correctly.');
      assert.equal(find('#squaredValue').text(), '1', 'The Screen reflects the correct updated value.');
      assert.equal(controller.get('squared'), 1, 'The computed property reflects the correct value.');
    });

    click('#triggerThree');

    andThen(function() {
      assert.equal(controller.get('count'), 4, 'The count was incremented to 4.');
      assert.equal(controller.get('squaredTriggered'), 3, 'The computed property triggered only once.');
      assert.equal(find('#squaredValue').text(), '16', 'The Screen reflects the correct value of 4x4.');
      assert.equal(controller.get('squared'), 16, 'The computed property reflects the correct value of 4x4.');
    });

  });

});

test("Ember.computed.debounce does not ignore update triggers", function(assert) {
  assert.expect(8);
  visit('/dont-ignore-updates');

  var controller = getController(App, 'dont-ignore-updates');

  andThen(function () {

    assert.equal(controller.get('count'), 0, 'The count begins at 0');
    assert.equal(controller.get('squaredTriggered'), 1, 'The computed property was triggered once during setup.');
    assert.equal(find('#squaredValue').text(), '0', 'The Screen reflects the correct initial value.');
    assert.equal(controller.get('squared'), 0, 'The computed property is set correctly during setup.');

    click('#plusOne');

    andThen(function() {
      assert.equal(controller.get('count'), 2, 'The count was incremented to 2.');
      assert.equal(controller.get('squaredTriggered'), 3, 'The computed property triggers correctly.');
      assert.equal(find('#squaredValue').text(), '4', 'The Screen reflects the correct updated value.');
      assert.equal(controller.get('squared'), 4, 'The computed property reflects the correct value.');
    });

  });
});