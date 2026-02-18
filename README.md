# 🐳 Docker

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
├── .dockerignore 👈 must create this file & keep node_modules inside it.
```

This allows Docker to access your dependencies and source code properly.
