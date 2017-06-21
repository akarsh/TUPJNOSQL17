//Redis connection
var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

var blogTitleReply = [];
var blogTextareaReply = [];

exports.addBlog = function(newData, callback)
{
	client.incr('id', function(err, id) {
	var blogId = id;
	client.sadd("blogPost", blogId);	
    client.hmset(blogId, 'blogTitle', newData.blogTitle, 'blogTextarea', newData.blogTextarea);
});
}

exports.getBlog = function(newData, callback)
{

	client.smembers("blogPost", function(err,results) {

    var blogPost = results;
  		
  	blogTitleReply= [];
  	blogTextareaReply = [];

    for (var i in blogPost) {
     client.hget(blogPost[i],"blogTitle", function(err,reply) {
        blogTitleReply.push({blogTitle: reply.toString()});
    });


    client.hget(blogPost[i],"blogTextarea", function(err,reply) {
        blogTextareaReply.push({blogTextarea: reply.toString()});
    });
    }
});
  return blogTitleReply;

 // console.log(blogTitleReply) 
 // console.log(blogTextareaReply) 
	
}