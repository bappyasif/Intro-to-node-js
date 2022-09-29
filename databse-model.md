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


<div class="top">
                    <% if(loggedIn) { %>
                        <h2><span style="font-size: 2em; color: Tomato;"><i class="fa-solid fa-user-astronaut fa-2xl"></i></span><span class="author"><%= msg.author_name %></span></h2>
                    <% } else { %>
                        <h2><span><i class="fa-solid fa-user-astronaut fa-2xl"></i></span><span class="author">Annonymous</span></h2>
                    <% } %>
                    <h2><span><i class="fa-solid fa-message fa-2xl"></i></span><span><%= msg.title %></span></h2>
                </div>
                <div class="bottom">
                    <p><span style="font-size: 3em; color: Tomato;"><i class="fa-solid fa-envelope fa-2xl"></i></span><span><%= msg.body %></span></p>
                    <% if(loggedIn) { %>
                        <p><span><i class="fa-solid fa-calendar-days fa-2xl"></i></span><span class="d-posted"><%= msg.posted_date %></span></p>
                    <% } else { %>
                        <p><span><i class="fa-solid fa-calendar-days fa-2xl"></i></span><span class="d-posted">Some Day</span></p>
                    <% } %>
                </div>