# Task Learniti

A sample app in react native with following functionalities

## APP INSTRUCTIONS

### Steps to use:

1. Initially the app will check whether the user has already logged in. If yes, then the screen will redirect to Dashboard directly. If not, then it will be navigated to Login Screen.

   ![alt text](/screenshots/1.jpg)

2. Login Screen. If the user doesn't have account, clicking on Sign Up will redirect to Sign Up screen.

   ![alt text](/screenshots/2.jpg)

3. Sign Up Screen. The user should create an account with password more than 8 characters.

   ![alt text](/screenshots/3.jpg)

4. After logging in, the Dashboard screen will appear. The user can sign out anytime by clicking on "Log Out" button.

   ![alt text](/screenshots/4.jpg)

5. On scrolling, the new posts will load from the API with pagination.

   ![alt text](/screenshots/5.jpg)

6. When there is no data from API, the list stops fetching from API.

   ![alt text](/screenshots/6.jpg)

7. Scan the NFC tag, if there is a mismatch in the verification the device produces a beep sound.

8. If a transfer order is completed, it will be updated to the server and the next transfer order will be opened in the screen. It will return to the Batch screen, once all the transfer orders are completed.

9. In case, the BLE device is disconnected in the middle of the process, it will be indicated in the app and it will try to reconnect to the BLE device.

   ![alt text](/Screenshots%20IGloves%20App/Screenshot_1576872285.png)
