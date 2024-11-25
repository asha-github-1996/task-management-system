# MERN Stack - Task management System

- Demo is deployed on render in free version so it will take few seconds to load initially.

## Demo: https://task-management-system-f655.onrender.com/

## Installation process

1. #### Clone the repo using this command

   ```bash
   git clone https://github.com/asha-github-1996/task-management-system.git
   ```

2. #### Install npm packages

   1. install backend packages

   ```bash
   cd task-management-system
   npm install
   ```

   2. Install frontend packages

   ```bash
   cd task-management-system
   cd frontend
   npm install
   ```

3. Go to the parent folder of task-management-system & create .env for connection, JWT_SECRET, MONGODB.

   ```bash
   cd task-management-system
   sudo nano .env
   ```

   ##### sample code for backend .env

   ```env
   MONGODB=YOUR_MONGODB_URI
   JWT_SECRET=YOUR_JWT_SECRET
   ```

   5. Run the Express server only by using this command

   ```bash
   cd task-management-system
   npm run dev
   ```

4. Run the React client only by using this command

   ```bash
   cd task-management-system
   cd frontend
   npm run dev
   ```

   ### Server runs on http://localhost:3001 and client on http://localhost:3000
