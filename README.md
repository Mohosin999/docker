# 🐳 Node.js App with Docker

## 📚 Table of Contents

- [Dockerfile লেখার সিরিয়াল (Order)](#-dockerfile-লেখার-সিরিয়াল-order)
- [Folder Structure](#-folder-structure)
- [Docker Commands](#-docker-commands)
- [host.docker.internal](#-hostdockerinternal)

### Q: If we use Docker Compose, do we still need a Dockerfile?

A: Yes, in most cases.

Docker Compose does not replace the Dockerfile. The Dockerfile builds the image, and Docker Compose runs containers using that image. Without a Dockerfile, Compose has nothing to build (unless you use a ready-made image like mongo or redis).

### Q: Where should we create the Dockerfile in a Node.js application?

A: You should create the Dockerfile in the root directory of your Node.js project — the same level as `package.json`.

Example structure:

```
api/
├── src/
├── package.json
├── Dockerfile   👈 here
├── .dockerignore 👈 also create this file & keep node_modules inside it.
```

This allows Docker to access your dependencies and source code properly.

## 📌 Dockerfile লেখার সিরিয়াল (Order)

- FROM → কোন base image ব্যবহার করবে
- WORKDIR → কাজের directory সেট করা
- COPY → project file কপি করা
- RUN → dependency install করা
- EXPOSE → কোন port expose করবে
- CMD (বা ENTRYPOINT) → app কীভাবে run হবে

Below is a simple example Dockerfile:

```
# 1️⃣ Base Image
FROM node:20-alpine

# 2️⃣ Working Directory
WORKDIR /app

# 3️⃣ Copy package files
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy rest of the files
COPY . .

# 6️⃣ Expose port
EXPOSE 5000

# 7️⃣ Run app
CMD ["npm", "start"]
```

## 📍 Folder Structure

```
├── myapp
  ├── api (This is a service or application)
     ├──src
     ├──.dockerignore
     ├──Dockerfile
     ├──package.json
  ├── docker-compose.yaml
```

## 🔹 Docker Commands

🧹 Clean unused Docker resources

Removes unused containers, networks, images, and cache to free space.

```
docker system prune
```

📦 Show all images

Shows all Docker images stored in your system.

```
docker images
```

📋 Show running containers

Shows only running containers.

```
docker ps
```

📋 Show all containers (running + stopped)

Shows all containers including stopped ones.

```
docker ps -a
```

📋 Show last created container

Shows the latest created container (even if stopped).

```
docker ps -la
```

🔍 Inspect container or service

Shows detailed information (IP, network, ports, volumes, etc).

```
docker inspect service_name
```

🔄 Restart a specific service (Docker Compose)

Restarts only a specific service.

```
docker-compose restart demo-api
```

🚀 Start containers

Starts all services defined in docker-compose.yaml.

```
docker-compose up
```

🔨 Build and start

Rebuilds images and then starts containers.

```
docker-compose up --build
```

Use this when:

- You changed Dockerfile
- You changed dependencies

🛑 Stop and remove containers

Stops and removes containers, networks, etc.

```
docker-compose down
```

📜 Show logs

Shows logs of a specific container.

```
docker logs container_name
```

🌐 Show all Docker networks

Lists all available Docker networks.

```
docker network ls
```

🛑 Stop container

```
docker stop container_name
```

❌ Remove container

```
docker rm container_name
```

❌ Remove image

```
docker rmi image_name
```

📂 Enter inside container

```
docker exec -it container_name sh
```

Or if bash exists:

```
docker exec -it container_name bash
```

📊 See container resource usage

```
docker stats
```

🧱 Show Docker volumes

```
docker volume ls
```

❌ Remove unused volumes

```
docker volume prune
```

### 🔹 Build and Run Manually (Without Docker Compose)

🏗️ Build Docker image

Creates a Docker image from your Dockerfile.

```
docker build -t my-test-api .
```

Explanation:

```
-t → tag name

my-test-api → image name

. → current folder
```

▶️ Run container manually

```
docker run -it --rm -p 4000:8080 --name my-test-api-con my-test-api
```

Explanation:

```
-it → interactive terminal

--rm → remove container after stop

-p 4000:8080 → map port 4000 (host) to 8080 (container)

--name my-test-api-con → container name

my-test-api → image name
```

❓ What is my-test-api-con?

con means container.

If you use docker run, you must run this command every time you want to start the app.

👉 That’s why in development we use docker-compose instead.

## 🌍 host.docker.internal

This is a special DNS name.

It allows a Docker container to access your host machine.

Example:
If your database runs on your local machine (not inside Docker),
you can connect from container using:

host.docker.internal:5432

👉 Works mainly on Windows & Mac.
On Linux, you may need extra configuration.
