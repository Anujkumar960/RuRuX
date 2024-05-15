# Student Portal

## Introduction
Welcome to Student Portal! This ReactJS website, powered by Node.js and Express.js on the backend, enables comprehensive admin CRUD operations on student details, including marks. It also features report card generation for individual students, ensuring easy access to essential academic data.

## Project Type
Frontend and Backend

## Deployed App
Frontend: https://studentportal96.netlify.app/ </br>
Backend: https://rurux.onrender.com/

## Directory Structure
``` bash
Rurux/ 
├─ Backend/
    ├─ src
      ├─ config
         ├─ config.js
      ├─ controller
         ├─ admin.controller.js
         ├─ authorization.controller.js
         ├─ performance.controller.js
      ├─ middleware
         ├─ auth.middleare.js
         ├─ rolebased.middleware.js
      ├─ Model
         ├─ blacklist.schema.js
         ├─ marks.schema.js
         ├─ stream.model.js
         ├─ subject.schema .js
         ├─ user.schema.js
      ├─ Router
         ├─ admin.Router.js
         ├─ authorization.router.js
         ├─ user.route.js
    ├─ index.js
├─ Frontend/Student_Portal
    ├─ public/
    ├─ src/
‎      ├─ Admin
‎      ├─ Components
      ├─ Context
      ├─ Dashboard
      ├─ Pages
      ├─ Routes
      ├─ Student performance
      ├─ Routes
    ├─ index.html
    ├─ package.json
    ├─ package-lock.json
```


## Features
Key Features of the Application
- Detailed Information: Access comprehensive details about each student's academic records and personal information.
- User Authentication: Securely log in and access the portal with JWT-based user authentication.
- Admin Dashboard: Manage student data effortlessly with a robust admin dashboard, allowing full CRUD operations on student details and report card generation.

## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running: </br>
Step 1: Clone the repository on terminal </br>
Step 2: Move to the Student_Portal folder </br>
Step 3: Install dependencies with the command ``` npm install``` </br>
Step 4: After the node modules have been installed, to start the app, run the command ``` npm run dev``` </br>

```bash
git clone https://github.com/Anujkumar960/RuRux.git
cd atlasion-app
npm install 
npm run dev
```

## Usage
<strong> Home Page </strong>
<ul>
   <li>Visit the Studnt Website. </li>
   <li>Explore the homepage to understand more about the website. </li>
   <li>Navigate to specific sections or Various pages through the functional navbar. </li>
   <li>Login/Register using the button in the navbar.</li>
</ul>

![Screenshot 2024-05-15 101438](https://github.com/Anujkumar960/RuRux/assets/154539617/12e7bf0a-9b8a-4540-bca3-b9a75d111543)

</hr>

<strong>Product Pages</strong>
 - Login-Page

 ![Screenshot 2024-05-15 101458](https://github.com/Anujkumar960/RuRux/assets/154539617/f3ac3d4c-1532-42bc-9e57-b1cb23785495)


 - Student Details

  ![Screenshot 2024-05-15 101541](https://github.com/Anujkumar960/RuRux/assets/154539617/22c7cd76-3738-43d2-bd39-cc2309997a3d)


 - Subject-Page

  ![Screenshot 2024-05-15 101554](https://github.com/Anujkumar960/RuRux/assets/154539617/cdff685e-c1de-4253-82e4-9fafa898215b)

 - Student-Performance-Page

   ![Screenshot 2024-05-15 101628](https://github.com/Anujkumar960/RuRux/assets/154539617/31a2a577-0467-42ed-a15a-7a3cc969a20e)

 

<br><br>


## Credentials
In order to be able to access the Admin Dashboard, enter these credentials in the Login Page :
```bash
Email : krishna96@gmail.com
Password : 1234
```

In order to be able to access the Student Dashboard, enter these credentials in the Login Page :
```bash
Email : aryan@gmail.com
Password : 1234
```

## APIs Used
Server - https://rurux.onrender.com/

## API Endpoints
In case of Backend Applications provide a list of your API endpoints, methods, brief descriptions, and examples of request/response.
GET /students - list of all students
POST /register - register new user
POST /login - authentication of existing user

## Technology Stack
- HTML
- CSS
- ReactJS
- Node js
- Express js
