# Authenticate

> ### Main flow
1. Carlos wants to authenticate informing: `email` and `password`;
2. The app checks if the email is valid (should have `@domain`);
3. The app checks if password is valid (`6+ characters`);
4. The app checks if the user is registered;
5. The app checks if the user password matches the input password;
6. The app returns an `authenticated token` to carlos.

> ### Alternative flow - Step 2 - Invalid email
1. The app returns an error (`invalid email`);

> ### Alternative flow - Step 3 - Invalid password
1. The app returns an error (`invalid password`);

> ### Alternative flow - Step 4 - User does not exist
1. The app returns an error (`email or password invalid`);

> ### Alternative flow - Step 5 - The passwords does not match
1. The app returns an error (`email or password invalid`);
