# Week 04 Day02 
## NestJS Role-Based Access Control (RBAC) Example

This 1st Task of the Day 02 consist of Simplest NestJS app demonstrates role-based access control using a custom `RoleGuard`. The app has a `POST` route `/checkAuthorized`, where only users with the `"admin"` role in the request body can access it. 

- **Valid Request**: If the role is `"admin"`, the response is `"Hello, Admin"`.
- **Invalid Request**: If the role is not `"admin"`, a `403 Forbidden` response with `"You are not authorized"` is returned.

### Test
- Use `thunderClient` or Postman to send a `POST` request with `{ user: "admin" }` in the body. if User are Admin it will return `Hello Admin` otherwise it will throw `403 Forbidden`

---


Certainly! Here's a concise README file that explains both the **Logging Interceptor** and **Transform Response Interceptor** in NestJS, in 10 lines:




## NestJS Interceptors: Logging & Response Transformation

This 2nd Task of the Day 02 project demonstrates two custom interceptors in NestJS: one for logging request durations and another for transforming outgoing responses.

## Features:
1. **Log Interceptor**:
   - Logs the duration of each HTTP request in milliseconds.
   - Outputs the HTTP method, URL, status code, and request duration.

2. **Transform Response Interceptor**:
   - Transforms outgoing responses into a standard format with `statusCode`, `message`, and `data`.
   - Wraps the response data in a structured format for consistency.


```
