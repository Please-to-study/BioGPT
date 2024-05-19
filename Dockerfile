# Step 1: Use an official Node.js runtime as a parent image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json file
COPY package.json ./

# Step 4: Install dependencies using yarn
RUN yarn install

# Step 5: Bundle the app source inside the Docker image
COPY . .

# Step 6: Build your app
RUN npm run build

# Step 7: Your app binds to port 3000, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Step 8: Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/main"]