var express = require('express');
var router = express.Router();
var path = require("path");
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('./client/index.html', { title: 'Express' });
	res.sendFile(path.join(__dirname + "/client/index.html"));
});
router.get('/druid',function (req,res) {
	console.log("a");
	var Druid = require('druid-query');
	var   Client = Druid.Client;
	var query = Druid.Query;
	var  client = new Client('http://localhost:8084');
	var q1 = client.groupBy();
	q1.dataSource('wikipedia');
	q1.granularity('all');
	q1
	  .dimensions(['language'])
	  .aggregation('longSum', 'rows1','count')
	  .aggregation('doubleSum', 'e', 'events')
	  .aggregation('doubleSum', 'randomNumberSum', 'outColumn')
	  .postAggregation('arithmetic', 'avg_random', '/', [
	    Druid.Query.postAggregation('fieldAccess', 'rand', 'randomNumberSum'),
	    Druid.Query.postAggregation('fieldAccess', 'ro', 'rows1')
	  ])
	  .interval(Date.UTC(2012, 9, 1), Date.UTC(2020, 0, 1));
		q1.exec(function(err, result) {
		  if (err) {
	   	 // handle error...
			console.log(err);
	  	}
	  	else {
	  	  //beCoolWith(result);
			console.log("aa");
			//res.end("it works");
			console.log(result);
			res.setHeader("Access-Control-Allow-Origin","*");
			res.send(result);
			}
		});
});

module.exports = router;
