var express = require('express');
var router = express.Router();

/* GET all listing per type. */
router.get('/:type', function(req, res, next) {
	var myqry;
	var type = req.params.type;
	var options = req.query;


	switch(type) {
	case "fiscal":
		/* monthly code block */
		break;
    case "monthly":
        /* daily code block */
        break;
    default :
        /* hourly code block */
        myqry = "SELECT service_id,service_name,status_code, sum(h00) as h00, sum(h01) as h01, sum(h02) as h02, sum(h03) as h03, "
			+ "sum(h04) as h04, sum(h05) as h05, sum(h06) as h06, sum(h07) as h07, sum(h08) as h08, "
			+ "sum(h09) as h09, sum(h10) as h10, sum(h11) as h11, sum(h12) as h12, sum(h13) as h13, " 
			+ "sum(h14) as h14, sum(h15) as h15, sum(h16) as h16, sum(h17) as h17, sum(h18) as h18, "
			+ "sum(h19) as h19, sum(h20) as h20, sum(h21) as h21, sum(h22) as h22, sum(h23) as h23 "
			+ "from Xavier_Tool.tbl_stats_hourly_summary tshs "
			+ "where date(txn_date) = date(now()) "
			+ "group by service_id,status_code;";
	}

	connection.query(myqry,function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		/* If there is error, we send the error in the error section with 500 status */
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			/* If there is no error, all is good and response is 200OK. */
	  	}
  	});
});


/* GET all listing per type per service_id. */
router.get('/:type/:id', function(req, res, next) {
	var myqry;
	var id = req.params.id;
	var type = req.params.type;
	var options = req.query;


	switch(type) {
	case "fiscal":
		/* monthly code block */
		break;
    case "monthly":
        /* daily code block */
        break;
    default :
        /* hourly code block */
    	var filter = (id) ? "and service_id =" +id+"" : "";
        myqry = "SELECT service_id,service_name,status_code, sum(h00) as h00, sum(h01) as h01, sum(h02) as h02, sum(h03) as h03, "
			+ "sum(h04) as h04, sum(h05) as h05, sum(h06) as h06, sum(h07) as h07, sum(h08) as h08, "
			+ "sum(h09) as h09, sum(h10) as h10, sum(h11) as h11, sum(h12) as h12, sum(h13) as h13, " 
			+ "sum(h14) as h14, sum(h15) as h15, sum(h16) as h16, sum(h17) as h17, sum(h18) as h18, "
			+ "sum(h19) as h19, sum(h20) as h20, sum(h21) as h21, sum(h22) as h22, sum(h23) as h23 "
			+ "from Xavier_Tool.tbl_stats_hourly_summary tshs "
			+ "where date(txn_date) = date(now()) "
			+ filter
			+ " group by service_id,status_code";
	}
		console.log(myqry);
	connection.query(myqry,function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		/* If there is error, we send the error in the error section with 500 status */
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			/* If there is no error, all is good and response is 200OK. */
	  	}
  	});
});

module.exports = router;