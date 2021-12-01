# Create account

> ### Main flow
1. Carlos wants to create a new user account informing: `name`, `email` and `password`;
2. The app checks if the email is valid (should have `@domain`);
3. The app checks if password is valid (`6+ characters`);
4. The app checks if already exist an user with the same email;
5. The app encrypts the password;
6. The app registers carlos;
7. The app returns data from carlos account.

> ### Alternative flow - Invalid email
1. The app returns an error;

> ### Alternative flow - Invalid password
1. The app returns an error;

> ### Alternative flow - User already exists
1. The app returns an error;

