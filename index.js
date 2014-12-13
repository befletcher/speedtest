var mod = require('./mod');

var options = {
  testFile: 's3.amazonaws.com/zilla-nodetest/amaranth.png',
  minutes: 5 // 0 forces one-time run for testing
}

mod.run(options);