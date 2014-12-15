var fs = require('fs'),
    http = require('http'),
    moment = require('moment');

module.exports = {

    speedResults: [],
    task: undefined,
    fileName: '',

    run: function (options) {
        var reqOptions = {
            fileId: moment().format('YYYYMMDD-hmmss'),
            req: {
                host: options.host,
                path: options.path
            }
        }
        speedResults = [];

        
        reqOptions.fileName = 'results/results-' + reqOptions.fileId + '.js';
        fs.writeFile(reqOptions.fileName, "var speedtest = [];\n", function (err) {
            if (err) throw err;
            console.log('created file:', reqOptions.fileName);
        });

        if (options.minutes <= 0 || !options.minutes) {
            // run once
            this.makeRequest(reqOptions);

        } else {
            // run repeatedly
            var me = this;
            var delay = options.minutes * 60 * 1000; //minutes
            task = setInterval(function () {
                me.makeRequest(reqOptions);
            }, delay);
        }
    },

    makeRequest: function (options) {
        var testResults = {};
        var start = moment();
        testResults.start = start.format();
        console.log('new request...');
        var req = http.get(options.req, function(res) {
            res.setEncoding('binary');
            res.on('data', function(chunk) {});
            res.on('end', function() {
                var end = moment();
                testResults.end = end.format();
                testResults.duration = end.diff(start)/1000;
                testResults.bytes = req.res.client.bytesRead;
                testResults.speed = testResults.bytes*0.000008/testResults.duration;
                speedResults.push(testResults.speed);

                var sum = speedResults.reduce(function(a,b) {
                    return a+b;
                });
                testResults.avg = Math.round(sum/speedResults.length*100)/100;
                var resultsString = JSON.stringify(testResults); // + ",\n";
                resultsString = 'speedtest.push(' + resultsString + ');';
                console.log(resultsString);

                fs.appendFile(options.fileName, resultsString, function (err) {
                    if (err) throw err;
                    console.log('results written to file:', testResults.speed);
                    console.log('');
                });                
            });
        });
    }
}