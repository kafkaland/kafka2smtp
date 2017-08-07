const mapper = require('./../src/mapper');
const assert = require('chai').assert;

describe('Mapper Unit Tests', function () {

  it('should get a payload (Number) from the JSON', function () {
    var output = mapper({payload: 123});
    assert.equal(output, 123);
  });

  it('should get a payload (Object) from the JSON', function () {
    var output = mapper({payload: {key1:1, key2:'value2'}});
    assert.deepEqual(output, {key1:1, key2:'value2'});
  });

});