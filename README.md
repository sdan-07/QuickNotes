# Quick Notes

A full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. This project was developed primarily as a practical implementation of containerization using Docker and cloud deployment orchestration on AWS (ECR and ECS).

## Features
* Note creation with automatic, exact timestamp logging.
* Full TypeScript integration across both frontend and backend for enhanced type safety.
* Containerized architecture using Docker for consistent environments.
* Fully deployed on AWS using Elastic Container Registry (ECR) and Elastic Container Service (ECS) behind an Application Load Balancer.

## Tech Stack
* **Frontend:** React, Vite, TypeScript
* **Backend:** Node.js, Express, TypeScript
* **Database:** MongoDB
* **DevOps/Infrastructure:** Docker, AWS (ECR, ECS, ALB)

## Project Structure
The workspace is organized containing both the frontend and backend applications, alongside the deployment configurations.

* `backend/`: Node.js and Express API server source code, along with `.env` and `tsconfig.json`.
* `frontend/`: React user interface powered by Vite, including ESLint and TypeScript configurations.
* `dockerfile`: Docker configuration instructions for building the application image.
* `.dockerignore`: Exclusions to optimize the Docker build context.
* `.gitignore`: Git version control exclusions.

## Local Development

### Prerequisites
* Node.js installed locally
* MongoDB (local instance or MongoDB Atlas cluster)
* Docker Desktop (optional, for local container testing)

### Installation Steps
1. Clone the repository to your local machine.
2. Navigate to the `backend` directory and run `npm install` to download server dependencies.
3. Navigate to the `frontend` directory and run `npm install` to download client dependencies.
4. Create a `.env` file in the `backend` directory (for MongoDB URI and ports) and the `frontend` directory (for API URLs).
5. Start the backend development server using your defined script (e.g., `npm run dev`).
6. Start the frontend development server to interact with the UI locally.

## Docker & Deployment

### Building the Container
To build the Docker image locally, execute the following command from the root directory:
`docker build -t quicknotes .`

### AWS Deployment Workflow
1. Authenticate your Docker CLI to your AWS ECR registry.
2. Tag your local Docker image to match your specific ECR repository URI.
3. Push the tagged image to AWS ECR.
4. Create or update an ECS Task Definition referencing the newly pushed image.
5. Deploy or update the ECS Service to provision the containers behind your Application Load Balancer.

## Application Interface
<img width="1871" height="825" alt="image" src="https://github.com/user-attachments/assets/1f010bf6-3f0f-4b4f-8586-06d706e37434" />


## Author
**Soumyadip Dan**
