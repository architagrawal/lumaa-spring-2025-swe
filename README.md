# Project Setup Guide
## Initial Setup

Clone the repository:
```bash
git clone https://github.com/architagrawal/lumaa-spring-2025-swe.git
cd lumaa-spring-2025-swe
```


## Setup Instructions

This project includes a setup script that automates the environment configuration. Follow these steps to get started:

1. **Modify Environment Variables**  
   - Open `.env.example` in both task-backend and task-frontend.Update the required fields according to your configuration.  
   - Save the file without changing its format.  

2. **Run the Setup Script**  
   - Ensure you have PostgreSQL running on your system.  
   - Execute the following command to generate the `.env` file and complete the setup:  
     ```bash
     ./setup.sh
     ```

This script will handle all necessary setup steps, ensuring your environment is correctly configured like creating the .env file, installing the required node modules and creating the required tables in sql.

## Running the Application

1. **Backend**:  
  Start the backend server using:  
  ```bash
  npm start
  ```
  
2. **Frontend**:  
  Start the backend server using:  
  ```bash
  npm run dev
  ```
3. **Open the link in browser:** 
```bash
http://localhost:5173/login
```

## Video Walkthrough of my project:
[Video Walkthrough](https://drive.google.com/file/d/139X8S3UreZ1oLi0GqXjJkYr4XLPpZKsN/view?usp=sharing)

If the video does not play, please copy and paste this link in your browser:
```bash
https://drive.google.com/file/d/139X8S3UreZ1oLi0GqXjJkYr4XLPpZKsN/view?usp=sharing
```

## Salary Expectation:

$8000 - $10500 per month (based on experience and location in California)

