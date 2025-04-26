# Product-Management-Portal

## Description
A role based product submission portal for users. User can add products with the basic details. Admins can view all the products and basic analytics data via dashboard.

## Frontend website - Hosted on VERCEL
[Website](https://product-management-portal-alpha.vercel.app)

## Backend web service - Hosted on RENDER

[Base Api](https://products-management-portal-backend.onrender.com)

[API-Docs](https://products-management-portal-backend.onrender.com/api-docs)

## Built With
- React ( Version : >18 )
- Vite
- TailwindCSS
- Node js ( Version : >20 | Type : Module )
- Express js
- MongoDB

## Features
1. User authenticaton
- Login : Authenticates user with email and password. Creates a new account if user doesn't exist.
2. Role based views
- User can add product
- Admin can view latest added products
- Admin can view basic analytics like total users and total products
3. Product
- User will fill add prodct form
- User can add  different variants in each product  
4. User experience
- Mobile-first UI design
- Responsive UI (Mobile & Web)

## Folder Structure
The project folder structure is organized as follows:

- `react-web/`: Contains the website code
- `node-api/`: Contains the backend code

```bash
git clone https://github.com/Kushal1402/Product-Management-Portal.git
```

```bash
cd Product-Management-Portal
```


## Frontend
```bash
cd react-web
```
- Make .env in root folder i.e **react-web**
- Copy .env.example contents to .env
- Do necessary changes as required
```bash
npm install # Install dependencies for react appication
npm run dev # Start localhost at 5173 port
```
- Open *[localhost](http://localhost:5173)* to access web

## Backend
```bash
cd node-api
```
- Make .env in root folder i.e **node-api**
- Copy .env.example contents to .env
- Do necessary changes as required
```bash
npm install # Install dependencies for node apis
npm start # Start node server at 9005 port
```
- Open *[swagger](http://localhost:9005/api-docs)* for api documentation

### Coding & Development Standards Followed For Backend
- Swagger API documentation (authenticated)
- RESTful APIs
- Comments in code

### Coding & Development Standards Followed For Frontweb
- Components based structure
- Lazy loading contents
- Commenting
- Code splitting
- Ghost loading for data views
- Role based authentication
- Error route page

### Swagger Access Creds
```json
{
    user: "Developer"
    password: "Developer@2025" 
}
```

### Example Admin Creds 
```json
{
  "email": "admin.developer@gmail.com",
  "password": "Admin@123#",
  "role": "admin"
}
```

### Example User Creds
```json
{
    email: "mike@gmail.com",
    password: "Mike@123#",
    role: "user"
}
```

## Author
👤 Kushal Doshi