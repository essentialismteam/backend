# backend

## Endpoints

### Authentication

`/auth/register`

**Method:** POST

**Description:** Register user in the system so they may log in and use the service.

Structure of request object:
```
{
    username: "admin",  // required
    password: "password",   // required
    first_name: "John", // required
    last_name: "Doe"    // defaults to null
}
```


`/auth/login`

**Method:** POST

**Description:** Log user into the system so they may access other endpoints.

Structure of request object:
```
{
    username: "admin",  // required
    password: "password",   // required
}
```

### User Info

`/users/:id`

**Method:** PUT

**Description:** Update username, password, first name and last name of user.

Structure of request object:
```
{
    username: "admin",
    password: "password",
    first_name: "John",
    last_name: "Doe"
}
```


`/users/:id`

**Method:** GET

**Description:** Retrieve all information about a user, except the user's password.

Structure of response:
```
{
    "id": 1,
    "username": "admin",
    "first_name": "John",
    "last_name": "Doe",
    "journal": "I want to have fun and be able to do lots of adventurous things.", // does not show up in response if user has not posted a journal entry
    "values": [
        {
            "value": "Athletic ability",
            "id": 1
        },
        {
            "value": "Living in the moment",
            "id": 6
        },
        {
            "value": "Sense of humor",
            "id": 13
        }
    ], // defaults to an empty array if user has not submitted values
    "projects": [
        {
            "id": 1,
            "project": "Skydiving certification"
        },
        {
            "id": 2,
            "project": "Weekend dogwalking"
        },
        {
            "id": 3,
            "project": "Full-time job -- long commute"
        }
    ] // defaults to an empty array if user has not submitted projects
}
```
### Values

`/values`

**Method:** GET

**Description:** Returns all values from which a user is able to select.

Structure of response:
```
[
    {
        "id": 1,
        "value_name": "Athletic ability"
    },
    {
        "id": 2,
        "value_name": "Art and literature"
    },
    {
        "id": 3,
        "value_name": "Creativity, discovering or inventing things to make a difference in the world"
    },
    // ...etc
]
```

### User Values

`/users/:id/values`

**Method:** POST

**Description:** Lets a user submit a value. Only one value can be submitted per request, but the response will return all existing values for that user.

Structure of request object:
```
{
    value_id: 1 // developer must retrieve value id from the /values endpoint, required
}
```

Structure of response:
```
[
    {
        "value": "Athletic ability",
        "id": 1
    },
    // ...etc
]
```


`/users/:id/values`

**Method:** PUT

**Description:** Lets a user update a value. Only one value can be updated per request.

Structure of request object:
```
{
    old_value_id: 1, // id of current value the user wants to change, required
    value_id: 2 // id of new value, required
}
```

Structure of response:
```
{
    "id": 2,
    "value_name": "Art and literature"
}
```


`/users/:id/values`

**Method:** DELETE

**Description:** Lets a user delete a value. Only one value can be deleted per request.

Structure of request object:
```
{
    value_id: 2 // required
}
```

Structure of response:
```
{
    "message": <message denoting success or failure>
}
```

### User Journal

`/users/:id/journal`

**Method:** POST

**Description:** Lets a user submit a journal entry about their value choices. The response returns the entry as well as the journal id.

Structure of request object:
```
{
    journal_entry: "I selected these values because I believe in them." // required
}
```

Structure of response:
```
{
    "id": 1,
    "journal_entry": "I selected these values because I believe in them."
}
```


`/users/:id/journal`

**Method:** PUT

**Description:** Lets a user update their journal entry.

Structure of request object:
```
{
    journal_entry: "I selected these values because I believe in them, and I have some new thoughts." // required
}
```

Structure of response:
```
{
    "journal_entry": "I selected these values because I believe in them, and I have some new thoughts."
}
```


`/users/:id/journal`

**Method:** DELETE

**Description:** Lets a user delete their journal entry. This endpoint does not require a request body; it uses the URL param to locate the appropriate journal entry.

Structure of response:
```
{
    "message": <message denoting success or failure>
}
```

### User Projects

`/users/:id/projects`

**Method:** POST

**Description:** Lets a user add a project to their profile. Only one project can be submitted per request.

Structure of request object:
```
{
    project_name: "Skydiving certification" // required
}
```

Structure of response:
```
{
    "id": 1,
    "project_name": "Skydiving certification",
    "user_id": 1  
}
```


`/users/:id/projects`

**Method:** PUT

**Description:** Lets a user update a project. Only one project can be updated per request.

Structure of request object:
```
{
    project_name: "Skydiving lessons for certification", // required
    id: 1 // developer must retrieve the project id from the /users/:id/projects POST response, required
}
```

Structure of response:
```
{
    "id": 1,
    "project_name": "Skydiving lessons for certification",
    "user_id": 1  
}
```


`/users/:id/projects`

**Method:** DELETE

**Description:** Lets a user delete a project. Only one project can be deleted per request.

Structure of request object:
```
{
    id: 1 // developer must retrieve the project id from the /users/:id/projects POST response, required
}
```

Structure of response:
```
{
    "message": <message denoting success or failure>
}
```