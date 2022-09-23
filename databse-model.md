**schema**
user: 
    > first name : string
    > last name : string
    > username : string / email
    > password : string => hash & salt
    > status : string
    > messages : array => {
            uid: string, 
            m_title: string, 
            m_body: string, 
            timestamp: date
        }

**members can write anonymous posts**

**members can see who the author of a post is**

**but outside they can only see the story and wonder who wrote it**

procesflow: 
    * registration: 
      * a record will be created for that user with password hash
      * login page / will be directly redirected to "member space"
    * login: 
      * will give user credentials
      * passportjs local strategy will authenticate user
    * memeberspace: 
      * members can post messages as annonymous
      * other memebrs can see who author was
    * unauthorized:
      * they can not see who actual author was
      * they can see messasge as from anonymous authors