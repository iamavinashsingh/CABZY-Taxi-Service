# /users/register

This endpoint allows a new user to register.

## Description

• Method: POST  
• URL: /users/register  
• Access: Public

## Request Body

• fullname.firstname (string, minimum length 3)  
• fullname.lastname (string, minimum length 3)  
• email (valid email string)  
• password (string, minimum length 5)

## Possible Responses

• 201: Registration successful (returns token and user data)  
• 400: Validation errors or missing fields  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 201,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
}
```

### Error Response

```json
{
  "status": 400,
  "message": "Validation errors",
  "errors": [
    {
      "field": "email",
      "message": "Email is invalid"
    },
    {
      "field": "password",
      "message": "Password must be at least 5 characters long"
    }
  ]
}
```

## /users/login

This endpoint allows a user to log in.

## Description

• Method: POST  
• URL: /users/login  
• Access: Public

## Request Body

• email (valid email string)  
• password (string, minimum length 8)

## Possible Responses

• 200: Login successful  
• 400: Validation errors or missing fields  
• 401: Invalid email or password  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
}
```

### Error Response

```json
{
  "status": 401,
  "message": "Invalid email or password"
}
```

## /users/profile

This endpoint allows a user to get their profile information.

## Description

• Method: GET  
• URL: /users/profile  
• Access: Private (requires authentication)

## Possible Responses

• 200: Profile retrieved successfully  
• 401: Unauthorized (if the user is not authenticated)  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 200,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response

```json
{
  "status": 401,
  "message": "Unauthorized"
}
```

## /users/logout

This endpoint allows a user to log out.

## Description

• Method: GET  
• URL: /users/logout  
• Access: Private (requires authentication)

## Possible Responses

• 200: Logout successful  
• 401: Unauthorized (if the user is not authenticated)  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 200,
  "message": "Logged out"
}
```

### Error Response

```json
{
  "status": 401,
  "message": "Unauthorized"
}
```


## /captains/register

This endpoint allows a new captain to register.

## Description

• Method: POST  
• URL: /captains/register  
• Access: Public

## Request Body

• fullname.firstname (string, minimum length 3)  
• fullname.lastname (string, minimum length 3)  
• email (valid email string)  
• password (string, minimum length 6)  
• vehicle.color (string, minimum length 3)  
• vehicle.plate (string, minimum length 3)  
• vehicle.capacity (integer, minimum value 1)  
• vehicle.vehicleType (string, one of 'car', 'motorcycle', 'auto')

## Possible Responses

• 201: Registration successful (returns token and captain data)  
• 400: Validation errors or missing fields  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 201,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
}
```

### Error Response

```json
{
  "status": 400,
  "message": "Validation errors",
  "errors": [
    {
      "field": "email",
      "message": "Email is invalid"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters long"
    }
  ]
}
```

## /captains/login

This endpoint allows a captain to log in.

## Description

• Method: POST  
• URL: /captains/login  
• Access: Public

## Request Body

• email (valid email string)  
• password (string, minimum length 6)

## Possible Responses

• 200: Login successful  
• 400: Validation errors or missing fields  
• 401: Invalid email or password  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "id": "60d0fe4f5311236168a109ca",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
}
```

### Error Response

```json
{
  "status": 401,
  "message": "Invalid email or password"
}
```

## /captains/profile

This endpoint allows a captain to get their profile information.

## Description

• Method: GET  
• URL: /captains/profile  
• Access: Private (requires authentication)

## Possible Responses

• 200: Profile retrieved successfully  
• 401: Unauthorized (if the captain is not authenticated)  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 200,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Response

```json
{
  "status": 401,
  "message": "Unauthorized"
}
```

## /captains/logout

This endpoint allows a captain to log out.

## Description

• Method: GET  
• URL: /captains/logout  
• Access: Private (requires authentication)

## Possible Responses

• 200: Logout successful  
• 401: Unauthorized (if the captain is not authenticated)  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 200,
  "message": "Logged out"
}
```

### Error Response

```json
{
  "status": 401,
  "message": "Unauthorized"
}
```

## /rides/get-fare

This endpoint allows a user to get the fare estimate for a ride.

## Description

• Method: GET  
• URL: /rides/get-fare  
• Access: Private (requires authentication)

## Query Parameters

• pickup (string, minimum length 3)  
• destination (string, minimum length 3)

## Possible Responses

• 200: Fare retrieved successfully  
• 400: Validation errors or missing fields  
• 401: Unauthorized (if the user is not authenticated)  
• 500: Server error

## Example Response

### Success Response

```json
{
  "status": 200,
  "message": "Fare retrieved successfully",
  "data": {
    "auto": 150,
    "car": 250,
    "bike": 100
  }
}
```

### Error Response

```json
{
  "status": 401,
  "message": "Unauthorized"
}
```
