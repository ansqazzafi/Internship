
# Subscription Service with Twilio, Stripe, and UserSubscription

This project provides subscription management with **Twilio**, **Stripe**, and **UserSubscription** modules.

1. Install dependencies:
   ```
   npm install @nestjs/common @nestjs/core stripe twilio mongoose
   ```

2. **Twilio Module**: Sends subscription confirmation messages via SMS to the user’s phone number.

3. **Stripe Module**: Manages Stripe customer creation and subscription plans (Basic, Standard, Premium).

4. **UserSubscription Module**: Handles storing user data and subscription status in MongoDB.

5. **Endpoints**:
   - `POST user-subscription/customers`: Creates a new customer.
   - `POST user-subscription/subscriptions`: Creates a new subscription.it will return a clientSecret to frontend to verify Payment after verified it will be activated
   - `POST user-subscription` : handleWebhook: it will send a confirmation message to customer that Plan has been activated and saved remaining details to Database

6. After successful subscription, user receives a confirmation message.

7. Use `.env` to set **Stripe** and **Twilio** API keys.

8. Run the app with `npm run start`.

9. Ensure your MongoDB instance is running for data storage.
```