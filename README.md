# YogaClassAssignment

## Tech Stack

**Client:** React JS

**Server:** Node JS, Express JS

**Database:** Mongo DB

## Database model/schema

    name: { type: "String", required: true },
    email: { type: "String", required: true },
    password:{type: "String", required: true},
    age: { type: "Number", required: true },
    batch: { type: "String", required : true,default:"none"},
    paymentStatus: { type: "String", required : true, default: "pending" },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    month : { type: "String" , required: true, default: "none"},
    
batch : stores the batch selected by user</br>
paymentStatus: stores whether the user paid fees or is it pending</br>
month: it keeps in check like if a user paid for April month and then as May(new month) starts it shows payment modal for user to pay fees for next month
  
## Live Link

https://yoga-qzal.onrender.com/

Clone the project

```bash
  git clone https://github.com/PRALIVE/YogaAssignment.git
```

Install dependencies

```bash
  npm install
```

```bash
  cd frontend/
  npm install
```

Start the server

```bash
  npm run start
```
Start the Client

```bash
  //open new terminal
  cd frontend
  npm start
```

  
# Features

### Authenticaton
![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/loginpage.png)
![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/registerpage.png)

If email is not valid

![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/invalidemail.png)

If age is not between 18 and 65

![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/wrongage.png)

If password and confirm password are not same

![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/confirminvalid.png)

### Welcome Screen
![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/mainpage.png)
### User Profile
![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/userpage.png)
### If payment is pending of a User
If a new user is registered or a new month has come it start showing payment modal

![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/newuser.png)
### Payment 
When user click on Pay Fees button two options comes</br>
Press Yes if user want to make payment</br>
Press No to cancel the payment</br>
If batch is none and no batch is selected paymnet won't be done.It will show a warning.

![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/paymentmodal.png)
![](https://github.com/PRALIVE/YogaAssignment/blob/main/screenshots/warning.png)
