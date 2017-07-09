module.exports = function (moneo, mongoosedb) {
    // declaration for mongoose Schema
    var Schema = mongoosedb.Schema;

    // user schema
    var UserSchema = new Schema({
        name: {
            type: String,
            //setting the nodeProperty to false; as this schema property isn't required in neo4j graph db
            nodeProperty: true,
            default: ''
        },
        email: {
            type: String,
            //setting the nodeProperty to false; as this schema property isn't required in neo4j graph db
            nodeProperty: false,
            default: ''
        },
        user: {
            type: String,
            //setting the nodeProperty to false; as this schema property isn't required in neo4j graph db
            nodeProperty: false,
            default: ''
        },
        pass: {
            type: String,
            //setting the nodeProperty to false; as this schema property isn't required in neo4j graph db
            nodeProperty: false,
            default: ''
        },
        country: {
            type: String,
            //setting the nodeProperty to false; as this schema property isn't required in neo4j graph db
            nodeProperty: false,
            default: ''
        },
        image: {
            type: String,
            //setting the nodeProperty to false; as this schema property isn't required in neo4j graph db
            nodeProperty: false,
            default: ''
        },
        tags: {
            //setting the nodeProperty to true; as this schema property needs to be exported to neo4j graph db
            type: [String],
            nodeProperty: true,
            default: ''
        },
        blogposts: {
            //setting the nodeProperty to true; as this schema property needs to be exported to neo4j graph db
            type: [mongoosedb.Schema.Types.ObjectId],
            ref: 'Blogpost',
            nodeProperty: true
        }
    });

    // pushing the data into neo4j graph db
    UserSchema.plugin(moneo);

    // declaration of mongoose data model
    var usermodel = mongoosedb.model('User', UserSchema);

    /*
    // running a cypherQuery for the data model this query will fetch all the nodes and return all the nodes.
    usermodel.cypherQuery({ query: 'match (n:User) return n limit 1' }, function (err, res) {
        console.log("Result of user model " + res);
    });
    */

    // data model is returned
    return usermodel;
}