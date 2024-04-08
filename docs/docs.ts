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
"tags": [{"name": "users"}, {"name": "admins"}, {"name": "super admins"}, {"name": "companies"}, {"name": "trips"}, {"name": "trip days"}, {"name": "busses"}, {"name": "bookings"}],
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
        
    },
    "/admins/signup": {
        
    },
    "/admins/requestResetPassword": {

    },
    "/admins/resetPassword": {
        
    }
}}

export default docs