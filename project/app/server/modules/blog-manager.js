require('../../../app');

var blogTitleReply = [];
var blogPostKey = [];
var blogTextareaReply = '';

exports.addBlog = function (req, callback) {

    var newData = {
        id: 0,
        name: req.body['blogTitle'],
        category: req.body['category'],
        author: req.session.user._id
    };

    redisclient.incr('id', function (err, id) {
        var blogId = id;
        newData.id = blogId;
        redisclient.sadd("blogPost", blogId);
        redisclient.hmset(blogId, 'blogTitle', newData.name, 'blogTextarea', req.body['blogTextarea'], 'category', newData.category, 'userId', newData.author);
        //Post updates in Mongo & implicitly push to neo4j 
        new BlogpostModel(newData).save(
            function (err, res) {
                if (err) {
                    console.error(err);
                } else {
                    UserModel.update(
                        { _id: newData.author },
                        {
                            $addToSet: {
                                tags: newData.category,
                                blogposts: res.id
                            }
                        },
                        { upsert: true },
                        function (err, res) {
                            if (err) {
                                console.error(err);
                            }
                        }
                    )
                }
            }
        );
    });
}

exports.getBlog = function (newData, callback) {

    redisclient.smembers("blogPost", function (err, results) {

        var blogPost = results;

        blogTitleReply = [];
        for (var i in blogPost) {
            blogPostKey.push(blogPost[i]);
            redisclient.hget(blogPost[i], "blogTitle", function (err, reply) {
                blogTitleReply.push(reply.toString());
            });
        }
    });
    const mergeArrToJSON = (a, b) => a.map((item, i) => ({
        [item]: b[i]
    }))

    return { blogTitleReply: blogTitleReply.reverse().slice(0, 11), blogId: blogPostKey.reverse().slice(0, 11) };
}
exports.getBlogData = function (newData, callback) {

    redisclient.hget(newData, "blogTextarea", function (err, reply) {
        blogTextareaReply = reply.toString();
    });

    return { blogTextareaReply: blogTextareaReply }
}