---
slug: auth-basic
title: Basic Authentication
---

# Authentication Using Basic Auth

Basic Authentication is a simple authentication scheme built into the HTTP protocol. It involves sending a username and password with each request. Here's how to authenticate using Basic Auth in our API.

## Overview

Basic Authentication involves sending the username and password with each request, encoded in the request header. This method is simple but less secure compared to other authentication mechanisms like OAuth.

### Authentication Header

To authenticate using Basic Auth, the client must include an Authorization header in the request with the value "Basic" followed by a base64-encoded string of "username:password".

### Example:

```bash
Authorization: Basic base64(username:password)
```

### Example

#### Request

```http
GET /api/resource HTTP/1.1
Host: example.com
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

#### Response

Upon successful authentication, the server responds with the requested resource.

## Security Considerations

Basic Authentication sends credentials with every request, which can be intercepted if not used over HTTPS.
Avoid storing sensitive information such as passwords in plaintext. Hashing passwords before storage is recommended.
Regularly rotate passwords to minimize the risk of unauthorized access.

## Conclusion

Basic Authentication provides a simple way to authenticate requests by including a username and password in the request header. While it's easy to implement, it's essential to use HTTPS to encrypt communication and avoid sending sensitive information in plaintext.
