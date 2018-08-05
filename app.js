//import libraries
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var multer  =   require('multer');
var path = require('path');
//var serveIndex = require('serve-index');
var fs = require('fs');  // add filesystem

//create neccessary objects
var app = express();
var router = express.Router();

//you need to update wp with your own database name
var db = monk('localhost:27017/wp');


//use objects in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', router);

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/rmit/mad2017b/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now()+ path.extname(file.originalname));
  }
});
var upload = multer({ storage : storage }).array('myfile',6);


//CLIENT SIDE ROUTING
app.set('views', __dirname+'/views');

// app.get('/student', function(req, res){
// 	res.render('student.ejs');

// });
app.get('/course', function(req, res){
	res.render('course.ejs');

});

app.get('/apk', function(req, res){
	res.render('apk.ejs');

});

//for Thanh

router.get('/recipes', function(req, res) {
    req.db.collection('recipes').find({},{"limit": 100000000},function(e,docs){
        res.json(docs);
    });
});

router.get('/recipes/:id', function(req, res){
	req.db.collection('recipes').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/recipes/:id', function(req, res){
	req.db.collection('recipes').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/recipes', function(req, res){
	req.db.collection('recipes').insert(req.body, function(e, docs){
		res.json(docs);
	});
});


router.put('/recipes/', function(req, res){
	req.db.collection('recipes').update({_id: req.body._id}, {
		id: req.body.id, 
		title: req.body.title, 
		cuisine: req.body.cuisine,
		description: req.body.description,
		category: req.body.category,
		subcategory: req.body.subcategory,
		imageUrl: req.body.imageUrl,
		primaryIngredient: req.body.primaryIngredient

		});

	req.db.collection('recipes').findOne({_id: req.body._id}, function(e, doc){
		res.json(doc);
	})
});

//end of rescepi

//for myky

//for Thanh

router.get('/events', function(req, res) {
    req.db.collection('events').find({},{"limit": 100000000},function(e,docs){
        res.json(docs);
    });
});

router.get('/events/:id', function(req, res){
	req.db.collection('events').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/events/:id', function(req, res){
	req.db.collection('events').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/events', function(req, res){
	req.db.collection('events').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

// Title
// Location
// Date
// Time
// Description
// ImageUrl

router.put('/events/', function(req, res){
	req.db.collection('events').update({_id: req.body._id}, {
		id: req.body.id, 
		title: req.body.title, 
		date: req.body.date,
		time: req.body.time,
		description: req.body.description,
		imageUrl: req.body.imageUrl

		});

	req.db.collection('events').findOne({_id: req.body._id}, function(e, doc){
		res.json(doc);
	})
});



//for assignment 1:
//product
router.get('/products', function(req, res) {
    req.db.collection('products').find({},{"limit": 100000000},function(e,docs){
        res.json(docs);
    });
});

router.get('/products/byType/:productTypeId', function(req, res) {
    req.db.collection('products').find({productType: req.params.productTypeId},{"limit": 100000000},function(e,docs){
        res.json(docs);
    });
});

router.get('/products/:id', function(req, res){
	req.db.collection('products').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/products/:id', function(req, res){
	req.db.collection('products').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/products', function(req, res){
	console.log(req.body);
	req.db.collection('products').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

router.put('/products/', function(req, res){
	req.db.collection('products').update({_id: req.body._id}, {
		id: req.body.id, 
		name: req.body.name, 
		price: req.body.price,
		description: req.body.description,
		brand: req.body.brand,
		producer: req.body.producer,
		imageUrl: req.body.imageUrl,
		productType: req.body.productType

		});

	req.db.collection('products').findOne({_id: req.body._id}, function(e, doc){
		res.json(doc);
	})
});


//productType
//productType
router.get('/productTypes', function(req, res) {
    req.db.collection('productTypes').find({},{"limit": 100000000},function(e,docs){
        res.json(docs);
    });
});

router.get('/productTypes/:id', function(req, res){
	req.db.collection('productTypes').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/productTypes/:id', function(req, res){
	req.db.collection('productTypes').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/productTypes', function(req, res){
	console.log(req.body);
	req.db.collection('productTypes').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

router.put('/productTypes/', function(req, res){
	req.db.collection('productTypes').update({_id: req.body._id}, {
		id: req.body.id, 
		name: req.body.name
		});

	req.db.collection('productTypes').findOne({_id: req.body._id}, function(e, doc){
		res.json(doc);
	})
});


//shoppingCart
router.get('/shoppingCarts', function(req, res) {
    req.db.collection('shoppingCarts').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});

router.get('/shoppingCarts/:id', function(req, res){
	req.db.collection('shoppingCarts').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/shoppingCarts/:id', function(req, res){
	req.db.collection('shoppingCarts').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/shoppingCarts', function(req, res){
	console.log(req.body);
	req.db.collection('shoppingCarts').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

router.put('/shoppingCarts/', function(req, res){
	req.db.collection('shoppingCarts').update({_id: req.body._id}, {
		id: req.body.id, 
		name: req.body.name
		});

	req.db.collection('shoppingCarts').findOne({_id: req.body._id}, function(e, doc){
		res.json(doc);
	})
});





//student
router.get('/students', function(req, res) {
    req.db.collection('students').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});

router.get('/students/:id', function(req, res){
	req.db.collection('students').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/students/:id', function(req, res){
	req.db.collection('students').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/students', function(req, res){
	console.log(req.body);
	req.db.collection('students').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

router.put('/students/', function(req, res){
	req.db.collection('students').update({_id: req.body._id}, {
		age: req.body.age, 
		name: req.body.name, 
		});

	req.db.collection('students').findOne({_id: req.body._id}, function(e, doc){
		res.json(doc);
	})
});


router.get('/students', function(req, res) {
    req.db.collection('students').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});


//order
router.get('/orders', function(req, res) {
    req.db.collection('orders').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});

router.get('/orders/:id', function(req, res){
	req.db.collection('orders').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/orders/:id', function(req, res){
	req.db.collection('orders').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/orders', function(req, res){
	console.log(req.body);
	req.db.collection('orders').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

router.put('/orders/', function(req, res){
	req.db.collection('orders').update({_id: req.body._id}, {
		id: req.body.id, 
		customer: req.body.customer, 
		address: req.body.address, 

		total: req.body.total, 
		orderDate: req.body.orderDate});

	req.db.collection('orders').findOne({_id: req.body._id}, function(e, doc){
		res.json(doc);
	})
});


router.get('/orders', function(req, res) {
    req.db.collection('orders').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});



router.delete('/feedback/:id', function(req, res){
	req.db.collection('feedbacks').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/feedbacks', function(req, res){
	console.log(req.body);
	req.db.collection('feedbacks').insert(req.body, function(e, docs){
		res.json(docs);
	});
});


//
router.get('/agencies', function(req, res) {
    req.db.collection('agencies').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});
router.get('/agencies/:id', function(req, res){
	req.db.collection('agencies').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});


router.delete('/agencies/:id', function(req, res){
	req.db.collection('agencies').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/agencies', function(req, res){
	console.log(req.body);
	req.db.collection('agencies').insert(req.body, function(e, docs){
		res.json(docs);
	});
});


//cases
router.get('/cases', function(req, res, next) {
   console.log(req.method);
   next();

});

router.get('/cases', function(req, res) {
    req.db.collection('cases').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});

router.delete('/cases/:id', function(req, res){
	req.db.collection('cases').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/cases', function(req, res){
	console.log(req.body);
	req.db.collection('cases').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

//incidents

router.get('/incidents', function(req, res) {
    req.db.collection('incidents').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});
router.get('/incidents/:id', function(req, res){
	req.db.collection('incidents').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/incidents/:id', function(req, res){
	req.db.collection('incidents').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/incidents', function(req, res){
	console.log(req.body);
	req.db.collection('incidents').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

//places
router.get('/places', function(req, res) {
    req.db.collection('places').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});
router.get('/places/:id', function(req, res){
	req.db.collection('places').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.delete('/places/:id', function(req, res){
	req.db.collection('places').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/places', function(req, res){
	req.db.collection('places').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

router.put('/places/', function(req, res){
	req.db.collection('places').update({_id: req.body._id}, {
		id: req.body.id, 
		name: req.body.name, 
		price: req.body.price,
		impression: req.body.impression,
		address: req.body.address,
		lat: req.body.lat,
		lon: req.body.lon,
		style: req.body.style,
		photo1: req.body.photo1,
		photo2: req.body.photo2,
		photo3: req.body.photo3

		});

	req.db.collection('places').findOne({_id: req.body._id}, function(e, doc){
		res.json(doc);
	})
});

// req.db.collection('places').insert(req.body, function(e, docs){
// 		res.json(docs);
// 	});

//req.db.collection('devicetrackings').insert({"imei": req.body.imei, "lat": req.body.lat, "lon": req.body.lon, "datetime":new Date()}, function(e, docs){
//abc

//hotspots
function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = toRad(lat2-lat1);  // Javascript functions in radians
  var dLon = toRad(lon2-lon1); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}
function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

router.get('/hotspots', function(req, res) {
    req.db.collection('hotspots').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});
router.get('/hotspots/:id', function(req, res){
	req.db.collection('hotspots').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.get('/hotspotsAnHour', function(req, res){
	req.db.collection('hotspots').find({"datetime": {$gte: new Date(new Date().getTime()-1000000*60*60*2)}}, function(e, doc){
		res.json(doc);
	})
});

router.get('/hotspotsAnHour100000km/:lat/:lon', function(req, res){

	var newdocs = [];
	var lat = req.params.lat;
	var lon = req.params.lon;

	req.db.collection('hotspots').find({"datetime": {$gte: new Date(new Date().getTime()-1000000*60*60*2)}}, function(e, docs){
		//only within 100000 km
		for(var i=0; i<docs.length; i++)
		{
			doc = docs[i];
			console.log(distance(lat, lon, doc.lat, doc.lon));
			if(distance(lat, lon, doc.lat, doc.lon)<100000)
			{
				newdocs.push(doc);
			}
		}
		console.log(newdocs);
		
		res.json(newdocs);
	});
});

		

router.delete('/hotspots/:id', function(req, res){
	req.db.collection('hotspots').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/hotspots', function(req, res){
	console.log(req.body);
	//console.log(req);

	req.db.collection('hotspots').insert({"lat": req.body.lat, "lon": req.body.lon, "datetime":new Date()}, function(e, docs){
		res.json(docs);
	});
});

router.post('/devicetrackings', function(req, res){
	console.log(req.body);
	//console.log(req);
	req.db.collection('devicetrackings').insert({"imei": req.body.imei, "lat": req.body.lat, "lon": req.body.lon, "datetime":new Date()}, function(e, docs){
		res.json(docs);
	});
});

router.get('/devicetrackings/:imei', function(req, res){
	console.log(req.params.imei);
	req.db.collection('devicetrackings').findOne({imei: req.params.imei},{limit: 1, sort: {datetime: -1} }, function(e,doc){
		res.json(doc);
	});
});

router.get('/devicetrackings', function(req, res){
	req.db.collection('devicetrackings').find({}, function(e, docs){
		res.json(docs);
	});
});

router.get('/devicetrackingsall/:imei', function(req, res){
	req.db.collection('devicetrackings').find({imei: req.params.imei}, function(e, docs){
		res.json(docs);
	});
});

//tracker vs trackee
router.post('/trackpairs', function(req, res){
	req.db.collection('trackpairs').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

router.get('/trackpairs', function(req, res){
	req.db.collection('trackpairs').find({}, function(e, docs){
		res.json(docs);
	});
});

router.get('/trackpairs/:tracker', function(req, res){
	req.db.collection('trackpairs').find({tracker: req.params.tracker}, function(e, docs){
		res.json(docs);
	});
});

//clear the trackpairs
router.post('/trackpairs/delete/:tracker', function(req, res){
	req.db.collection('trackpairs').remove({tracker: req.params.tracker}, function(e, docs){
		res.json(docs);
	});
});

//clear the trackpairs
router.post('/trackpairs/delete/:tracker/:trackee', function(req, res){
	req.db.collection('trackpairs').remove({tracker: req.params.tracker, trackee: req.params.trackee}, function(e, docs){
		res.json(docs);
	});
});

// END
router.get('/students', function(req, res, next) {
   console.log(req.method);
   next();

});

//SERVER SIDE ROUTING
router.get('/students', function(req, res) {
    req.db.collection('students').find({},{"limit": 100000},function(e,docs){
        res.json(docs);
    });
});

router.get('/student/:id', function(req, res){
	req.db.collection('students').findOne({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});



router.get('/courses', function(req, res){
	req.db.collection('courses').find({}, function(e, doc){
		res.json(doc);
	});
});

router.get('/studentByCourse/:courseId', function(req, res){
	req.db.collection('TimeTable').find({courseId: req.params.courseId}, function(err, timetables){
		var studentIds = timetables.map(function(c) { return c.studentId; });
		req.db.collection('students').find({_id: {$in: studentIds}}, function(e, doc){
			res.json(doc);
		})
	});
});

router.get('/availableStudentByCourse/:courseId', function(req, res){
	req.db.collection('TimeTable').find({courseId: req.params.courseId}, function(err, timetables){
		var studentIds = timetables.map(function(c) { return c.studentId; });
		//only one change from $in to $nin
		req.db.collection('students').find({_id: {$nin: studentIds}}, function(e, doc){
			res.json(doc);
		})
	});
});

router.post('/enrolment', function(req, res){
	console.log(req.body);
	req.db.collection('TimeTable').insert(req.body, function(e, docs){
		res.json(docs);
	});
});


router.get('/student/search/:name', function(req, res){
	var query = {
	  name: {
	    $regex: '^'+req.params.name+'',
	    $options: 'i' //i: ignore case, m: multiline, etc
	  }
	};
	req.db.collection('students').find(query, function(e, doc){
		res.json(doc);
	})
});

router.put('/student/:id', function(req, res){
	req.db.collection('students').update({_id: req.params.id}, {name: req.body.name, yob: req.body.yob});
	req.db.collection('students').findById(req.params.id, function(e, doc){
		res.json(doc);
	})
});

router.delete('/student/:id', function(req, res){
	req.db.collection('students').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

router.post('/students', function(req, res){
	console.log(req.body);
	req.db.collection('students').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

router.post('/students/addCourse', function(req, res){

});

//upload file
router.post('/api/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file. Please check."+ err);
        }
        //res.end("File is uploaded. <a href='apk/'>Click here to go back</a>");

        res.redirect('/apk');
    });
});
//get list of files
router.get('/download', function(req, res) { // create download route

  var dir= '/rmit/mad2017b/uploads/'; // get the path to the uploads folder

  console.log(dir);

  fs.readdir(dir, function(err, list) { // read directory return  error or list of files

    if (err) 
    	return res.json(err);
    else
    	res.json(list);
  });

});
//download file
router.get('/download/:file(*)', function(req, res){ // file(*) this routes all types of file

  var file = '/rmit/mad2017b/uploads/'+req.params.file;

  console.log(file);

  res.download(file); // magic of download fuction

});

app.listen(8080);