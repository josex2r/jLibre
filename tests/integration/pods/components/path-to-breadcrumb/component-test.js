import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('path-to-breadcrumb', 'Integration | Component | path to breadcrumb', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{path-to-breadcrumb}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#path-to-breadcrumb}}
      template block text
    {{/path-to-breadcrumb}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
