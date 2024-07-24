# Use an official Node runtime as a parent image
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install



# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Bundle app source
COPY . .

# Run Prisma migrations using npx to utilize the local Prisma CLI
# RUN npx prisma migrate deploy

# Make port available to the world outside this container
EXPOSE 3000



# Run app when the container launches
CMD ["node", "dist/src/main.js"]