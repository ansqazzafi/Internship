
# Week07 Day04
## NestJS Global Exception Filter for Twilio, Stripe and all other services & Rate Limiting

## Overview  
This project includes the implementation of a **global exception filter** and **rate limiting** in a NestJS application. These features enhance error handling and ensure the security and performance of the application.

### Features  
1. **Custom Exception Filter**  
   - Handles errors from **Twilio**, **Stripe**, and other services.  
   - Defines a unified error response format for consistent error reporting across the application.  

2. **Global Scope**  
   - The exception filter is set globally to catch all exceptions without the need for individual service configurations.

3. **Rate Limiting**  
   - Implemented using **@nestjs/throttler** to prevent abuse by limiting the number of requests per user.  
   - Protects against DDoS attacks and ensures fair usage.

### Learning Objectives  
- Understand and implement **global exception filters** for error handling in NestJS.  
- Explore **rate limiting middleware** to manage API usage effectively.  
- Explore **Error Handler middleware** to manage error.  
- Gain insights into best practices for error handling and performance optimization.  

--- 
