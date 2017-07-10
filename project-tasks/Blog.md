# Blog 

https://d2mxuefqeaa7sj.cloudfront.net/s_8364220F338C8BBF4D3470132BBF60EC14AFDB7067263E24B3237365AC0E6FB5_1496865151975_Untitled.png


NOSQL, SoSe 2017

by 

Akarsh Seggemu, 
Sonali Bhatnagar and 
Budankailu Sameer Kumar Subudhi

# Goal

Create a blog website that should uses any three nosql databases

## Inspirations

The article regarding nosql database has inspired us to use nosql databased for our project https://www.thoughtworks.com/de/insights/blog/nosql-databases-overview
[](https://www.thoughtworks.com/de/insights/blog/nosql-databases-overview)

## Ideas
| **Description**             |
| --------------------------- |
| Graph db - Neo4j            |
| Documentstore - Mongodb     |
| Document store - Rethink DB |
| Key value store - Redis     |

https://d2mxuefqeaa7sj.cloudfront.net/s_8364220F338C8BBF4D3470132BBF60EC14AFDB7067263E24B3237365AC0E6FB5_1499350585130_Database+Diagram.png

# Architecture:

Blog Website 
3 pages: Home,Blog post, Author
To store Blog post: Redis
Author: MongoDB
Author session : RIAK
Graph: Author-Blog post (Neo4j)(option)


# Sample data

http://www.lipsum.com/

## Action items
[x] Meeting to discuss on project @Sonali B @Sameer S
  Agenda:
      [x] What Nosql to use, pros n cons
      [x] Try to look for source code using python if any found for these
[x] Meeting to discuss initial implementation @Sonali B @Sameer S @akarsh s
[x] Meeting to discuss final implementation @akarsh s @Sonali B @Sameer S 
  Agenda:
      [x] Blog post creation
      [x] Inline comments for project
[x] Tasks
  [x] Author page @akarsh s
  [x] Registration page @Sameer S
  [x] Login page @Sameer S
  [x] Blog post page creation @Sonali B 
  [x] Connection to redis @Sonali B 
  [x] Retrieval of Blogs on Home page @Sonali B 
  [x] Creation of a new dynamic page to show blog data @Sonali B 
  [x] Issues to be addressed: Confirm message on Blog data store and refresh issue while retrieving data from Redis @Sonali B
  [x] Add category to blogdata page @Sonali B
  [x] Add css to pages @Sonali B
  [x] Presentation @akarsh s
    [x] Preparation @akarsh s @Sonali B
    [x] Modifications @akarsh s @Sonali B
  [x] Neo4J @akarsh s
    [x] Connect mongodb to neo4j @akarsh s
    [x] Show mongodb data in neo4j @akarsh s
  [x] Code clean up and project structure - 1 @akarsh s @Sonali B
  [x] Code clean up 2 @akarsh s
  [x] Code clean up 3 @akarsh s 
  [x] Added new library moneo for adding data simultaneous in neo4j and mongodb @akarsh s
  [x] Demo project (https://github.com/akarsh/test-for-moneo) for showing the implementation of the neo4j and mongodb. @akarsh s
  [x] Updating readme and project documentation 1 @akarsh s 
  [x] Storing Category in Redis
  [x] Session storage in Rethinkdb @akarsh s
  [x] Last presentation @akarsh s @Sonali B @Sameer S
    [x] Preparation @akarsh s @Sonali B @Sameer S 
    [x] Create UML Diagram of Architecture @Sonali B
    [x] Presentation template @akarsh s 
    [x] Live demo video @akarsh s 
    [x] Literature @akarsh s 
    [x] Logos @akarsh s 
    [x] Screenshots of databases - backup
      [x] Redis @Sonali B 
      [x] Rethink @akarsh s 
      [x] Neo4j @akarsh s 
      [x] Mongodb @akarsh s 
  [x] Code clean up 4 @akarsh s 
  [x] Displaying blog post in user page @akarsh s 
  [x] Solved gitignore issue @akarsh s 
  [x] UI improvements @akarsh s 
    [x] Add CSS @akarsh s 
    [x] Indentation and template in Jade @akarsh s 
  [x] Display data from neo4j by using cypher Query @akarsh s 
  [x] Continuous Integration - Travis CI @akarsh s


# Literature research

Definition of nosql and how many different providers are available in the nosql market
http://nosql-database.org/

Article by martin fowler regarding polyglot persistence 
https://martinfowler.com/bliki/PolyglotPersistence.html

NoSQL academic projects
https://ecs.syr.edu/faculty/fawcett/handouts/webpages/BlogNoSql.htm

Redis vs Riak
https://db-engines.com/en/system/Redis%3BRiak+KV

Using redis in node.js
https://www.sitepoint.com/using-redis-node-js/

Using python and Mongodb
https://realpython.com/blog/python/introduction-to-mongodb-and-python/

Keystone supports MongoDB 
http://keystonejs.com/
We can also use Redis instead of MongoDB for user session
http://keystonejs.com/docs/configuration/

Found a git repo that implements the user login/registration feature. It’s implemented using node.js and mongoDB as it’s backend.
https://github.com/braitsch/node-login.git

Neo4J
https://www.npmjs.com/package/neo4j#usage


     Users collection
      - id
      - name
      - email
      ...
    
    Posts collection
      - id
      - title
      - content
      ...
      - user_id

mongo has no joins so you would have to select posts for the user id in a separate query

you could query for users that comment posts with `iot` tag
as soon as you have the id's of users from neo4j, you can do a simple mongodb query
like select users where ids in ...
and an array of these IDs

https://neo4j.com/blog/neo4j-doc-manager-polyglot-persistence-mongodb/

https://github.com/mongodb-labs/mongo-connector

Neo4j - docmanager
https://neo4j.com/developer/mongodb/

Moneo plugin/middleware for integrating mongodb and neo4j
https://github.com/srfrnk/moneo

Moneo - plugin for neo4j and mongoose (mongodb)
https://www.npmjs.com/package/moneo

Rethink DB
https://www.rethinkdb.com/

Rethink DB - Session storage
https://www.npmjs.com/package/connect-rethinkdb

Why not using Riak for session storage

https://github.com/frank06/connect-riak/issues/7


[frank06/connect-riak#7](https://github.com/frank06/connect-riak/issues/7)
Connect-riak is not in development & causes errors.

