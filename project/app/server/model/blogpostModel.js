module.exports = function (moneo, mongoosedb) {
    // declaration for mongoose Schema
    var Schema = mongoosedb.Schema;

    // user schema
    var BlogpostSchema = new Schema({
        id: {
            type: Number,
            //setting the nodeProperty to true; as this schema property needs to be exported to neo4j graph db
            nodeProperty: true
        },
        name: {
            type: String,
            //setting the nodeProperty to true; as this schema property needs to be exported to neo4j graph db
            nodeProperty: true
        },
        category: {
            type: String,
            //setting the nodeProperty to true; as this schema property needs to be exported to neo4j graph db
            nodeProperty: true
        },
        author: {
            type: mongoosedb.Schema.Types.ObjectId,
            ref: 'User',
            //setting the nodeProperty to true; as this schema property needs to be exported to neo4j graph db
            nodeProperty: true
        }
    });

    // pushing the data into neo4j graph db
    BlogpostSchema.plugin(moneo);

    // declaration of mongoose data model
    var blogpostmodel = mongoosedb.model('Blogpost', BlogpostSchema);

    // running a cypherQuery for the data model this query will fetch all the nodes and return all the nodes.
    blogpostmodel.cypherQuery({ query: 'match (n:Blogpost) return n limit 1' }, function (err, res) {
        console.log("Result of user model " + res);
    });

    // data model is returned
    return blogpostmodel;
}