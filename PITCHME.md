
# Blog 

###### NOSQL Databases (0432 L 777)
###### SoSe 17

by

Akarsh Seggemu, Budankailu Sameer Kumar Subudhi and Sonali Bhatnagar

---

# Agenda
- Blog application
- Problem statement
- Goal
- NOSQl Databases Functions
- Why are we using these Databases?
- Technology stack
- Plan

---

# Blog application
- It is created using Node.js, HTML5 and CSS 3.
- Features: 
  - Create a Blog post   
  - Modify contents of Blog post
  - User accounts i.e. author, admin

---

# Problem statement
- Is it possible to use 3 NOSQL databases in a blog application ?
- Which parts of the blog application should use which NOSQL database?

---

# Goal
- To use 3 NOSQL databases in a Blog Application.
- In the blog application:
  - Author data is stored in MongoDB  
  - Blog posts data is stored in Redis
  - Neo4j for Author-Blog post relation
  - Author session is stored in Riak (back up for Neo4j)
 
---
 
# NOSQl Databases Functions
- MongoDB - Storing Author's Data 
- Redis - For storing the Data of Blog Post using key-value pair 
- Neo4j - Storing relationship between Authors and their posts

---

## Why are we using these 3 Databases?
- MongoDB
- Redis
- Neo4j

---

## Why are we using these 3 Databases? (2)
### MongoDB:
- We have a dynamic schema
- We can easily add/delete the new fields to our Author's data
- Whole structure of our Author's data stored can be easily modified
- Data will be highly available and scalable

---

## Why are we using these 3 Databases? (3)
### Redis
- Redis is very fast 
- Making updates in key-value stored blog data is easier 
- Supports variety of programming languages and data types
- Atomic execution of commands

---

## Why are we using these 3 Databases? (4)
### Neo4j
- Easy to store relationships without using concepts like Foreign Keys 
- It has more expressive and simpler data model 
- Other NOSQL databases stores sets of disconnected aggregates hence its difficult to store connected data in them
- Easy to traverse in among connected values using cypher query and find insights 

---

# Technology stack
- Node.js & Python
- HTML 5, CSS 3
- Documentation
  - Markdown ((GitHub-Flavored) Markdown Editor, Atom)
  - Dropbox paper 
  - Wiki (if time permits)

---

# Plan
Task | Week number
------------ | ------------- 
Kick-off meeting | Week 1
Literature research | Week 1, 2
Tasks discussed & Initial mplementaiion | Week 2
Pitch presentation | Week 2
Reviews of initial implementation | Week 3
Final Implementation | Week 4,5
Final presentation | Week 6

---

Thank you <br />
& <br />
Questions ?
