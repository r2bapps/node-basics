# Exercise 01: Basic Blog API

Read the following articles:

**Status codes**: https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html
**REST methods**: https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html

## Entities
* User
* Post
* Comment

### User
* id: string
* name: string
* surname: string
* surname2: string
* creationDate: Date
* lastModificationDate: Date

### Post
* id: string
* title: string
* subitle: string
* text: string
* tags: [string]
* creationDate: Date
* lastModificationDate: Date
* userId: string
* comments: [Comment]

### Comment
* id: string
* text: string
* creationDate: Date
* lastModificationDate: Date
* userId: string