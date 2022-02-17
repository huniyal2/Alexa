GET  /reviews?rating=2&storeType=GOOGLEPLAYSTORE&date=2018-08-02  ---- To  Get reviews based request query filter which are optional

POST  /reviews              to create new review all fields are required  in request body   sample request   {
	"review": "testing review",
	"author": "test author",
	"review_source": "GOOGLEPLAYSTORE",
	"rating": 5,
	"title": "test title",
	"product_name": "test product",
	"reviewed_date": "2018-01-12T02:27:03.000Z"
}



GET   /store/:storeType/month/:month             ----  ex- /store/GOOGLEPLAYSTORE/month/7   to get average monthly review for a particular  store             month in [1-12]
                                                storeType in - [GOOGLEPLAYSTORE, ITUNES]

GET /store/:storeType/rating                -------------ex - /store/Googleplaystore/rating
                                                            storeType in - [GOOGLEPLAYSTORE, ITUNES]
                                                        to get each rating count for a particularstore