require('../../../app');

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:123456@localhost:7474');

var resultCategory = '';
var resultTitle = '';
var authorId ='';

exports.getAuthorId = function(req, callback) {
  authorId = req.session.user._id;
  console.log("authorId: "+authorId);
  return authorId;
}

db.cypher({
    query: 'MATCH (n:Blogpost) WHERE n.author<>"'+authorId+'" RETURN n AS Recommended LIMIT 1'
}, function (err, results) {
    if (err) throw err;
      resultCategory = results.map(function(item){ return item.n.properties.category }).toString();
      return resultCategory;
});

db.cypher({
    query: 'MATCH (n:Blogpost) WHERE n.category="Fiction" AND n.author<>"'+authorId+'" RETURN n AS Recommended LIMIT 1'
}, function (err, results) {
    if (err) throw err;
      resultTitle = results.map(function(item){ return item.n.properties.title }).toString();
      return resultTitle;
});



exports.getRecommendation = function(recomData, callback) {
  return { resultCategory: resultCategory, resultTitle: resultTitle };
}
