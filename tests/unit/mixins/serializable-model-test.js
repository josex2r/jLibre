import Ember from 'ember';
import SerializableModelMixin from '../../../mixins/serializable-model';
import { module, test } from 'qunit';

module('Unit | Mixin | serializable model');

// Replace this with your real tests.
test('it works', function(assert) {
  var SerializableModelObject = Ember.Object.extend(SerializableModelMixin);
  var subject = SerializableModelObject.create();
  assert.ok(subject);
});
