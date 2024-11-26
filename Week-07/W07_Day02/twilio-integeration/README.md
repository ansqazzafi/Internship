# Week 07 - Day 02: Twilio Integration with NestJS

## Task Overview
This task involves integrating Twilio services with a NestJS application to provide two key functionalities:

1. **Sending a Verification Code via SMS**: A POST endpoint that generates a random 4-digit verification code and sends it to the receiver's phone number using Twilio's SMS service.
2. **Making a Voice Call**: A POST endpoint that triggers a voice call to the receiver's phone number using Twilio's Voice API, playing a pre-defined message from a URL.

## Features

- **SMS Verification Endpoint** (`POST /twilio`):
  - Sends a random 4-digit verification code to the specified phone number via SMS using Twilio's messaging API.
  
- **Voice Call Endpoint** (`POST /twilio/make-call`):
  - Initiates a voice call to the specified phone number and plays a pre-defined message using Twilio's Voice API.

## Installation

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Set up the following environment variables:
   - `TWILIO_ACCOUNT_SID`: Your Twilio account SID.
   - `TWILIO_AUTH_TOKEN`: Your Twilio authentication token.
   - `TWILIO_PHONE_NUMBER`: Your Twilio phone number used for sending SMS and making calls.

3. Ensure the NestJS application is running:
   ```bash
   npm run start
   ```

## API Endpoints

### 1. Send Verification Code via SMS
- **Endpoint**: `POST /twilio`
- **Body**:
  ```json
  {
    "to": "<receiver_phone_number>"
  }
  ```
- **Response**:
  - `success: true` on success, with the response from Twilio.
  - `success: false` on failure, with an error message.

### 2. Make a Voice Call
- **Endpoint**: `POST /twilio/make-call`
- **Body**:
  ```json
  {
    "to": "<receiver_phone_number>"
  }
  ```
- **Response**:
  - `success: true` on success, with the response from Twilio.
  - `success: false` on failure, with an error message.
