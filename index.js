var speedtest = require('./speedtest');

var options = {
  testFile: 's3.amazonaws.com/zilla-nodetest/amaranth.png',
  minutes: 0 // 0 forces one-time run for testing
}

speedtest.run(options);