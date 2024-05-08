FROM node:16

WORKDIR /app

COPY package.json ./
# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Install Truffle globally
RUN npm install -g truffle

# Install Truffle tools
RUN npm install @truffle/hdwallet-provider truffle-plugin-verify truffle-assertions
RUN npm install @openzeppelin/contracts
RUN npm install chai dotenv

# Install dependencies
ARG CACHE_INVALIDATE=1
RUN npm install

# After installing the dependencies, copy the rest of your application to the image
COPY . .

# Set the command to run when the container starts
CMD ["truffle", "test"]
# Use a base image that includes a web server, such as Nginx
FROM nginx:latest

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy HTML, CSS, and JavaScript files into the container
COPY index.html .
COPY script.js .
COPY style.css .


# Expose port 80 to allow access to the web server
EXPOSE 80
