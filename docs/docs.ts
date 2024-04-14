const docs = {
"openapi": "3.0.0",
"info": {
    "title": "Easy Booking API",
    "description": "Backend API that allows users to book thier bus trips in a quick, secure, satisfying way",
    "version": "1.0.0"
},
"components": {
    "schemas": {
        "user": {
            "type": "object",
            "properties": {
                "UserId": {"type": "number"},
                "Name": {"type": "string"},
                "Email": {"type": "string" },
                "EmailVerified": {"type": "boolean"},
                "PhoneNumber": {"type": "string" },
                "PhoneNumberVerified": {"type": "boolean"},
                "Password": {"type": "string" }
            }
        },
        "admin": {
            "type": "object",
            "properties": {
                "AdminId": {"type": "number"},
                "Name": {"type": "string"},
                "Email": {"type": "string"},
                "PhoneNumber": {"type": "string"},
                "Password": {"type": "string"},
                "CompanyId": {"type": "number"}
            }
        },
        "super admin": {
            "type": "object",
            "properties": {
                "SuperAdminId": {"type": "number"},
                "Name": {"type": "string"},
                "Email": {"type": "string"},
                "Password": {"type": "string"},
                "CompanyId": {"type": "numbe"}
            }
        },
        "company": {
            "type": "object",
            "properties": {
                "CompanyId": {"type": "string"},
                "Name": {"type": "string"},
                "Email": {"type": "string"},
                "PhoneNumber": {"type": "string"},
                "JoinDate": {"type": "string"}
            }
        },
        "bus": {
            "type": "object",
            "properties": {
                "BusId": {"type": "number"},
                "Size": {"type": "number"},
                "DisplayName": {"type": "string"},
                "SerialNumber": {"type": "string"},
                "PlateNumber": {"type": "string"},
                "CompanyId": {"type": "number"}
            }
        },
        "trip": {
            "type": "object",
            "properties": {
                "TripId": {"type": "number"},
                "DepartureStation": {"type": "string"},
                "ArrivalStation": {"type": "string"},
                "StartTime": {"type": "string"},
                "EndTime": {"type": "string"},
                "Cost": {"type": "number"},
                "BusId": {"type": "number"}
            }
        },
        "trip days": {
            "type": "object",
            "properties": {
                "TripId": {"type": "number"},
                "Day": {"type": "string"}
            }
        },
        "bookings": {
            "type": "object",
            "properties": {
                "UserId": {"type": "number"},
                "TripId": {"type": "number"},
                "Date": {"type": "string"},
                "SeatsNo":{"type":  "number"}
            }
        }
    },
    "securitySchemes": {  
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        },
        "user": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        },
        "admin": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        },
        "superAdmin": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
},
"servers": [ { "url": "http://localhost:3333/" } ],
"tags": [{"name": "users"}, {"name": "admins"}, {"name": "superAdmins"}, {"name": "buses"}, {"name": "companies"}, {"name": "trips"}, {"name": "tripDays"}, {"name": "userTrips"}],
"paths": {
    "/users/signup": {
        "post": {
            "tags": ["users"],
            "summary": "register a new user",
            "description": "register a new user with provided email, name and password",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Name": {"type": "string"},
                                "Email": {"type": "string"},
                                "PhoneNumber": {"type": "string"},
                                "Password": {"type": "string"}
                            },
                            "required": ["Name", "Email", "Password"]
                        }
                    }
                }
            },
            "responses": {
                "400": {
                    "description": "email already exists",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {"type": "string"}
                                }
                            }
                        }
                    }
                },
                "201": {
                    "description": "user registered Successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {"type": "string"}
                                }
                            }
                        }
                    }
                },
                "500": {"description": "Server error"}
            }
        }
    },
    "/users/login": {
        "post": {
            "tags": ["users"],
            "summary": "try to login a user using Email and Password",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Email": {"type": "string"},
                                "Password": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "user logged in Successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "token": {"type": "string"},
                                    "message": {"type": "string"}
                                }
                            }
                        }
                    }
                },
                "500": {"description": "Server error"}
            }
        }
    },
    "/users/": {
        "post": {
            "tags": ["users"],
            "summary": "create new user",
            "description": "create new user",
            "requestBody": {
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "UserName": {
                                "type": "string"
                            },
                            "Password": {
                                "type": "string"                                    
                            },
                            "Role": {
                                "type": "string",
                                "description": "user role (buyer or seller)"
                            }
                        },
                        "required": ["Username", "Password"]
                    }
                }
            }
            },
            "responses": {
                "201": {
                    "description": "user created Successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "user name already exists"
                },
                "500": {
                    "description": "Server error"
                }
            }
        }
    },
    "/users/requestVerifyEmail": {
        "post": {
            "description": "request to verify user eamil",
            "tags": ["users"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Email": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {"description": "an eamil has been sent to verify user eamil"},
                "400": {"description": "no such user with provided eamil"}
            }
        }
    },
    "/users/verifyEmail": {
        "post": {
            "description": "request to verify user eamil",
            "tags": ["users"],
            "parameters": [
                {
                    "name": "token",
                    "in": "query",
                    "required": true,
                    "description": "the token signed by the server to verify user eamil",
                    "schema": {"type": "string"}
                }
            ],
            "responses": {
                "200": {"description": "user eamil has been verfied Successfully"},
                "400": {"description": "invalid token"}
            }
        }
    },
    "/users/requestResetPassword": {
        "post": {
            "description": "request to reset user password",
            "tags": ["users"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Email": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {"description": "an eamil has been sent to reset user password"},
                "400": {"description": "no such user with provided eamil"}
            }
        }
    },
    "/users/resetPassword": {
        "post": {
            "description": "request to resest user password",
            "tags": ["users"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Password": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "parameters": [
                {
                    "name": "token",
                    "in": "query",
                    "required": true,
                    "description": "the token signed by the server to verify user eamil",
                    "schema": {"type": "string"}
                }
            ],
            "responses": {
                "200": {"description": "user password has been reset Successfully"},
                "400": {"description": "invalid token"}
            }
        }
    },
    "/users/{id}": {
    "get": {
        "tags": ["users"],
        "summary": "get user by id",
        "security": [{"BearerAuth": []}],
        "description": "Retrieve user details by their ID.",
        "parameters": [
        {
            "name": "id",
            "in": "path",
            "description": "ID of the user to retrieve",
            "required": true,
            "schema": {
            "type": "integer",
            "format": "int64"
            }
        }
        ],
        "responses": {
        "200": {
            "description": "Successful response",
            "content": {
            "application/json": {
                "schema": {
                "type": "object",
                "properties": {
                    "UserId": {
                    "type": "integer",
                    "description": "User ID"
                    },
                    "Name": {
                    "type": "string",
                    "description": "User Name"
                    },
                    "Email": {
                    "type": "string",
                    "description": "user email"
                    },
                    "PhoneNumber": {
                    "type": "integer",
                    "description": "user Phone Number"
                    }
                }
                }
            }
            }
        },
        "400": {
            "description": "User not found"
        },
        "500": {
            "description": "Server error"
        }
        }
    },
    "delete": {
        "tags": ["users"],
        "summary": "delete user",
        "description": "delete user by id",
        "parameters": [
        {
            "name": "id",
            "in": "path",
            "description": "ID of the user to delete",
            "required": true,
            "schema": {
            "type": "integer",
            "format": "int64"
            }
        }
        ],
        "responses": {
        "200": {
            "description": "user deleted",
            "content": {
            "application/json": {
                "schema": {
                "type": "object",
                "properties": {
                    "message": {
                    "type": "string"
                    }
                }
                }
            }
            }
        },
        "400": {
            "description": "User not found"
        },
        "500": {
            "description": "Server error"
        }
        }
    }
    },
    "/admins": {
        "get": {
            "tags": ["admins"],
            "description": "get all admins",
            "responses": {
                "200": {"description": "admins retrieved Successfully"},
                "500": {"description": "server error"}
            }
        }
    },
    "/admins/{id}": {
        "get": {
            "tags": ["admins"],
            "description": "get an admin by his id",
            "parameters": [
                {
                    "required": true,
                    "name": "id",
                    "in": "path",
                    "description": "id of the admin to get data for"
                }
            ],
            "responses": {
                "200": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object"
                            }
                        }
                    }
                }
            }
        }
    },
    "/admins/login": {
      "post": {
        "tags": ["admins"],
        "description": "login an admin",
        "requestBody": {
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "Email": {"type": "string"},
                            "Password": {"type": "string"}
                        }
                    }
                }
            }
        },
        "responses": {
            "200": {"description": "admin logged in successfully and a token returned"},
            "400": {"description": "incorrect credentials"}
        }
      }  
    },
    "/admins/signup": {
        "post": {
            "tags": ["admins"],
            "description": "create new admin",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Name": {"type": "string"},
                                "Email": {"type": "string"},
                                "PhoneNumber": {"type": "string"},
                                "Password": {"type": "string"},
                                "CompanyId": {"type": "number"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "admin created successfully"},
                "400": {"description": "invalid input data"}
            }
        }
    },
    "/admins/requestResetPassword": {
        "post": {
            "tags": ["admins"],
            "description": "reset password for an admin",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Email": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {"description": "an mail with url to resest admin's password has been sent to his email"},
                "400": {"description": "invalid email"}
            }
        }
    },
    "/admins/resetPassword": {
        "post": {
            "tags": ["admins"],
            "description": "reset admin password with new password",
            "parameters": [
                {
                    "name": "token",
                    "in": "query",
                    "required": true,
                    "schema": {"type": "string"}
                }
            ],
            "requestBody": {
                "required": true,
                "description": "new password",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Password": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {"description": "admin password has been reset successfully"},
                "400": {"description": "invalid token"}
            }
        }
    },
    "/superAdmins": {
        "post": {
            "tags": ["superAdmins"],
            "description": "create new super admin",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Name": {"type": "string"},
                                "Email": {"type": "string"},
                                "Password": {"type": "string"},
                                "CompanyId": {"type": "number"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "super admin created successfully"},
                "400": {"description": "invalid input"}
            }
        }
    },
    "/superAdmins/{id}": {
        "get": {
            "tags": ["superAdmins"],
            "description": "get super admin info by his id",
            "parameters": [
                {
                    "name": "id",
                    "required": true,
                    "in": "path",
                    "schema": {"type": "number"}
                }
            ],
            "responses": {
                "200": {"description": "super admin info retrieved successfully"},
                "400": {"description": "invalid super admin id"}
            }
        },
        "put": {
            "tags": ["superAdmins"],
            "description": "update super admin info",
            "parameters": [
                {
                    "name": "id",
                    "required": true,
                    "in": "path",
                    "schema": {"type": "number"}
                }
            ],
            "responses": {
                "200": {"description": "super admin info updated successfully"},
                "400": {"description": "invalid super admin id"}
            }
        },
        "delete": {
            "tags": ["superAdmins"],
            "description": "delete super admin info",
            "parameters": [
                {
                    "name": "id",
                    "required": true,
                    "in": "path",
                    "schema": {"type": "number"}
                }
            ],
            "responses": {
                "200": {"description": "super admin deleted successfully"},
                "400": {"description": "invalid super admin id"}
            }
        }
    },
    "/buses": {
        "post": {
            "tags": ["buses"],
            "description": "create new bus",
            "security": [ {"bearer": ["admin"]} ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "DisplayName": {"type": "string"},
                                "SerialNumber": {"type": "string"},
                                "PlateNumber": {"type": "string"},
                                "Size": {"type": "number"},
                                "CompanyId": {"type": "number"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "bus has been created successfully"},
                "400": {"description": "invalid input"}
            }
        }
    },
    "/buses/{id}": {
        "get": {
            "tags": ["buses"],
            "description": "get bus info by it's id",
            "security": [{"bearer": ["admin"]}],
            "parameters": [
                {
                    "name": "id",
                    "required": true,
                    "in": "path",
                    "description": "id of the bus to get data about",
                    "schema": {"type": "number", "format": "int64"}
                }
            ],
            "responses": {
                "200": {"description": "bus info retrieved successfully"},
                "500": {"description": "server error"}
            }
        },
        "put": {
            "tags": ["buses"],
            "description": "update bus info",
            "security": [{"bearer": ["admin"]}],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "DisplayName": {"type": "string"},
                                "SerialNumber": {"type": "string"},
                                "PlateNumber": {"type": "string"},
                                "Size": {"type": "number"},
                                "CompanyId": {"type": "number"}
                            }
                        }
                    }
                }
            },
            "parameters": [
                {
                    "name": "id",
                    "required": true,
                    "in": "path",
                    "description": "id of the bus to update it's data",
                    "schema": {"type": "number", "format": "int64"}
                }
            ],
            "responses": {
                "200": {"description": "bus info updated successfully"},
                "400": {"description": "invalid input"}
            }
        },
        "delete": {
            "tags": ["buses"],
            "description": "update bus info",
            "security": [{"bearer": ["admin"]}],
            "parameters": [
                {
                    "name": "id",
                    "required": true,
                    "in": "path",
                    "description": "id of the bus to be deleted",
                    "schema": {"type": "number", "format": "int64"}
                }
            ],
            "responses": {
                "200": {"description": "bus has been deleted successfully"},
                "500": {"description": "server error"}
            }
        }
    },
    "/companies": {
        "post": {
            "tags": ["companies"],
            "description": "create new company",
            "security": [{"bearer": ["superAdmin"]}],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Name": {"type": "string"},
                                "Email": {"type": "string"},
                                "PhoneNumber": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "company has been created successfully"},
                "400": {"description": "invalid input"}
            }
        }
    },
    "/companies/{id}": {
        "get": {
            "tags": ["companies"],
            "description": "get company info",
            "security": [{"bearer": ["superAdmin"]}],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "description": "id of the company to get info about",
                    "schema": {"type": "number"},
                    "required": true
                }
            ],
            "responses": {
                "200": {"description": "company info retrieved successfully"},
                "400": {"description": "invalid company id provided"}
            }
        },
        "put": {
            "tags": ["companies"],
            "description": "update company",
            "security": [{"bearer": ["superAdmin"]}],
            "parameters": [
                {
                    "name": "id",
                    "schema": {"type": "number"},
                    "in": "path",
                    "description": "id of the company to get info about",
                    "required": true
                }
            ],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "Name": {"type": "string"},
                                "Email": {"type": "string"},
                                "PhoneNumber": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {"description": "company info updated successfully"},
                "400": {"description": "invalid input"}
            }
        },
        "delete":{
            "tags": ["companies"],
            "description": "delete company",
            "security": [{"bearer": ["superAdmin"]}],
            "parameters": [
                {
                    "name": "id",
                    "schema": {"type": "number"},
                    "in": "path",
                    "description": "id of the company to get info about",
                    "required": true
                }
            ],
            "responses": {
                "200": {"description": "company deleted successfully"},
                "400": {"description": "invalid company id provided"}
            }
        }
    },
    "/trips": {
        "post": {
            "tags": ["trips"],
            "description": "create new trip",
            "security": [{"bearer": ["admin"]}],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "DepartureStation": {"type": "string"},
                                "ArrivalStation": {"type": "string"},
                                "StartTime": {"type": "string"},
                                "EndTime": {"type": "string"},
                                "BusId": {"type": "number"},
                                "Cost": {"type": "number"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "trip has been created successfully"},
                "400": {"description": "invalid input"}
            }
        }
    },
    "/trips/{id}": {
        "get": {
            "tags": ["trips"],
            "description": "get trip info by id",
            "security": [{"bearer": ["admin"]}],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "schema": {"type": "number"},
                    "required": true
                }
            ],
            "responses": {
                "200": {"description": "trip info retrieved successfully"},
                "400": {"description": "invalid trip id"}
            }
        },
        "put": {
            "tags": ["trips"],
            "description": "update trip info",
            "security": [{"bearer": ["admin"]}],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "schema": {"type": "number"},
                    "required": true
                }
            ],
            "responses": {
                "200": {"description": "trip info updated successfully"},
                "400": {"description": "invalid trip id"}
            }
        },
        "delete": {
            "tags": ["trips"],
            "description": "delete trip",
            "security": [{"bearer": ["admin"]}],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "schema": {"type": "number"},
                    "required": true
                }
            ],
            "responses": {
                "200": {"description": "trip info deleted successfully"},
                "400": {"description": "invalid trip id"}
            }
        }
    },
    "/tripDays": {
        "post": {
            "tags": ["tripDays"],
            "description": "add a provided day to the trip's working days",
            "security": [{"bearer": ["admin"]}],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "TripId": {"type": "number"},
                                "day": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "day added successfully"},
                "400": {"description": "invalid day or tripId"}
            }
        },
        "delete": {
            "tags": ["tripDays"],
            "description": "delete a provided day from the trip's working days",
            "security": [{"bearer": ["admin"]}],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "TripId": {"type": "number"},
                                "day": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "day deleted successfully"},
                "400": {"description": "invalid day or tripId"}
            }
        }
    },
    "/tripDays/{id}": {
        "get": {
            "tags": ["tripDays"],
            "description": "get trip's working days",
            "security": [{"bearer": ["admin"]}],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {"type": "number"}
                }
            ],
            "responses": {
                "200": {"description": "trip's days retrieved successfully"},
                "400": {"description": "invalid trip id"}
            }
        }
    },
    "/userTrips/{id}": {
        "get": {
            "tags": ["userTrips"],
            "description": "get all user's bookings by his id",
            "security": [{"bearer": ["admin", "user"]}],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {"type": "number"}
                }
            ],
            "responses": {
                "200": {"description": "user's trips retrieved successfully"},
                "400": {"description": "invalid user id"}
            }
        }
    },
    "/userTrips": {
        "post": {
            "tags": ["userTrips"],
            "description": "create a booking for user",
            "security": [{"bearer": ["admin", "user"]}],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "UserId": {"type": "number"},
                                "TripId": {"type": "number"},
                                "Date": {"type": "string"},
                                "SeatsNo": {"type": "number"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "user's booking created successfully"},
                "400": {"description": "invalid input"}
            }
        },
        "put": {
            "tags": ["userTrips"],
            "description": "put user's booking",
            "security": [{"bearer": ["admin", "user"]}],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "UserId": {"type": "number"},
                                "TripId": {"type": "number"},
                                "Date": {"type": "string"},
                                "SeatsNo": {"type": "number"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "user's booking updated successfully"},
                "400": {"description": "invalid input"}
            }
        },
        "delete": {
            "tags": ["userTrips"],
            "description": "delete user's booking",
            "security": [{"bearer": ["admin", "user"]}],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "UserId": {"type": "number"},
                                "TripId": {"type": "number"},
                                "Date": {"type": "string"},
                                "SeatsNo": {"type": "number"}
                            }
                        }
                    }
                }
            },
            "responses": {
                "201": {"description": "user's booking deleted successfully"},
                "400": {"description": "invalid input"}
            }
        }
    }
}}

export default docs