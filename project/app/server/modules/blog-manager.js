var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});



exports.addBlog = function(newData, callback)
{
	client.set('blogTittle', newData.blogTitle, redis.print);
	client.set('blogData', newData.blogTextarea, redis.print);
}