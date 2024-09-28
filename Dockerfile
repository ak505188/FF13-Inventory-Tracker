# https://medium.com/@ravipatel.it/automating-docker-image-creation-and-push-to-docker-hub-for-a-react-app-using-github-actions-7fa092751fc0
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

# Copy the build output to the web server's directory.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world.
EXPOSE 80

# Command to run the web server.
CMD ["nginx", "-g", "daemon off;"]
