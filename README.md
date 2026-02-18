# 🐳 Node.js App with Docker

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

### 📌 Dockerfile লেখার সিরিয়াল (Order)

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

### Let's Build a New Image

Since we have dockerfile, let's build it

- docker system prune
- docker images
- docker ps -la
- 👉 docker build -t my-test-api .
- docker run -it --rm -p 4000:8080 --name my-test-api-con my-test-api

my-test-api-con = con means
amra jotobar application run korte chaibo totobar ai docker run ta dite hobe. amra aivbae korbo na, amra docker compose file nibo, ata nibo amra root e

```
├── api
    - src
    - .dockerignore
    - Dockerfile
    - package.json
├── docker-compose.yaml
```

- docker-compose up --build (use --build if you want to rebuild it)
