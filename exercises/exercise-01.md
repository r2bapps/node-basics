# Exercise 01: Basic Blog API

## Entities
* User
* Post
* Comment

### User
* id: string
* name: string
* surname: string
* surname2: string

### Post
* id: string
* title: string
* subitle: string
* text: string
* tags: [string]
* creationDate: Date
* lastModificationDate: Date
* user: User
* comments: [Comment]

### Comment
* id: string
* text: string
* creationDate: Date
* user: User
* comments: [Comment]