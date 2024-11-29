# Week 07 Day 04 Task - Rate Limiting & Error Handling in NestJS

## Description
This project invloves the implementation of rate limiting and error handling middleware in a NestJS application. The rate limiter is applied using the `@nestjs/throttler` package to prevent excessive requests to the server, while the error handler middleware ensures proper handling and logging of errors.

## Features
- **Rate Limiting**: Limits the number of requests a user can make within a given time frame using `ThrottlerModule`.
- **Error Handling**: Custom middleware to catch errors, return appropriate HTTP responses, and log errors for debugging.


