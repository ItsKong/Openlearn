# Step 1: Use the official Node.js image
FROM node:23

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all project files into the container
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# Step 6: Expose the port Next.js will run on
EXPOSE 3000

# Step 7: Run the app (for production)
CMD npm start

