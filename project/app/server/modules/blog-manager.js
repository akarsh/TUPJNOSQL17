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
    client.hmset(blogId, 'blogTitle', newData.blogTitle, 'blogTextarea', newData.blogTextarea,'category',newData.category,'userId', newData.userId);
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
    }
});
  return {blogTitleReply:blogTitleReply.reverse().slice(0,11)};
}



exports.getBlogData = function(newData, callback)
{

  client.smembers("blogPost", function(err,results) {

    var blogPost = results;

    console.log(results, 'sdhfuhsud');
      
    blogTitleReply= [];
    blogTextareaReply = [];
     for (var i in blogPost) {
        client.hget(blogPost[i],"blogTextarea", function(err,reply) {
        blogTextareaReply.push({blogTextarea: reply.toString()});
    });
    }
});
  return {blogTextareaReply:blogTextareaReply.reverse().slice(0,11)};
}




// To be implemented

/* 

exports.getBlog = function(newData, callback)
{

  client.smembers("blogPost", function(err,results) {

    var blogPost = results;
      
    blogTitleReply= [];
    blogTextareaReply = [];
    blogPostKey = results;

    for (var i in blogPost) {
     client.hget(blogPost[i],"blogTitle", function(err,reply) {
        blogTitleReply.push(reply.toString());
    });
    }
});

  const mergeArrToJSON = (a, b) => a.map((item, i) => ({
    [item]: b[i]
  }));

  const merge = mergeArrToJSON(blogPostKey.reverse().slice(0,11), blogTitleReply.reverse().slice(0,11));

  return {merge};
}



exports.getBlogData = function(newData, callback)
{

  client.smembers("blogPost", function(err,results) {

    var blogPost = results;
      
    blogTitleReply= [];
    blogTextareaReply = [];
    blogPostKey = results;

     for (var i in blogPost) {
        client.hget(blogPost[i],"blogTextarea", function(err,reply) {
        blogTextareaReply.push(reply.toString());
    });
    }
});


const mergeArrToJSON = (a, b) => a.map((item, i) => ({
  [item]: b[i]
}))

console.log(mergeArrToJSON(blogPostKey.reverse().slice(0,11), blogTextareaReply.reverse().slice(0,11)), 'sidharth');

  return {blogTextareaReply:blogTextareaReply};
}
*/
