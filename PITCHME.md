
# Blog 

###### NOSQL Databases (0432 L 777)
###### SoSe 17

by

Akarsh Seggemu, Budankailu Sameer Kumar Subudhi and Sonali Bhatnagar

---

# Agenda
- Problem statement
- Goal
- NOSQl Databases Functions
- Why are we using these Databases?
- Technology stack
- Plan

---

# Problem statement
- Is it possible to use 3 NOSQL databases in a blog application ?
- Which parts of the blog application should use which NOSQL database?

---

# Goal
####To use 3 NOSQL databases in a Blog Application.
We wish to implement a Blog Application that is connected to 3 NOSQL databases (MongoDB,Redis,Neo4j) performing 
storage for various parts of the application.</br>
Here Author can:
 - Create a Blog page   
 - Modify contents of Blog page
 
The Blog website is created using Node.js and we use HTML and CSS 3 for its formatting.
 
 ---
# NOSQl Databases Functions
- MongoDB - Storing Author's Data 
- Redis - For storing the Data of Blog Post using key-value pair 
- Neo4j - Storing relationship between Authors and their posts

---

# Why are we using these Databases?
###MongoDB:
- We have a dynamic schema
- We can easily add/delete the new fields to our Author's data
- Whole structure of our Author's data stored can be easily modified
- Data will be highly available and scalable

##Redis
- Redis is very fast 
- Making updates in key-value stored blog data is easier 
- Supports variety of programming languages and data types
- Atomic execution of commands

##Neo4j
- Easy to store relationships without using concepts like Foreign Keys 
- It has more expressive and simpler data model 
- Other NOSQL databases stores sets of disconnected aggregates hence its difficult to store connected data in them
- Easy to traverse in among connected values using cypher query and find insights 

---
# Technology stack
- Node.js
- HTML 5, CSS 3
- Documentation
  - Markdown ((GitHub-Flavored) Markdown Editor, Atom)
  - Dropbox paper 
  - Wiki (if time permits)

---
# Plan
Task | week number
------------ | ------------- 
Kick-off meeting | week 1
Literature research | week 1, 2
Tasks discussed/Implementaiion starting | week 2
Pitch presentation | week 2
Reviews of initial implementation | week 3
Final Implementation | week 4,5
Final presentation | week 6

---

Thank you <br />
& <br />
Questions ?
