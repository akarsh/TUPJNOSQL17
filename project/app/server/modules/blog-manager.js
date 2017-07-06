require('../../../app');

var blogTitleReply = [];
var blogPostKey = [];
var blogTextareaReply = '';

exports.addBlog = function(newData, callback)
{
	redisclient.incr('id', function(err, id) {
	var blogId = id;
	redisclient.sadd("blogPost", blogId);	
    redisclient.hmset(blogId, 'blogTitle', newData.blogTitle, 'blogTextarea', newData.blogTextarea,'category',newData.category,'userId', newData.userId);
});
}

exports.getBlog = function(newData, callback)
{

	redisclient.smembers("blogPost", function(err,results) {

    var blogPost = results;
  		
  	blogTitleReply= [];
    for (var i in blogPost) {
      blogPostKey.push(blogPost[i]);
       redisclient.hget(blogPost[i],"blogTitle", function(err,reply) {
          blogTitleReply.push(reply.toString());
      });
    }
});
const mergeArrToJSON = (a, b) => a.map((item, i) => ({
  [item]: b[i]
}))

  return {blogTitleReply:blogTitleReply.reverse().slice(0,11), blogId: blogPostKey.reverse().slice(0,11)};
}
exports.getBlogData = function(newData, callback)
{

 redisclient.hget(newData,"blogTextarea", function(err,reply) {
      blogTextareaReply = reply.toString();
 });

 return {blogTextareaReply: blogTextareaReply}
}