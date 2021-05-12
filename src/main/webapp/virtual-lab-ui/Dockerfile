## Stage 1 - Lets build the "deployable package"
FROM node:10.19.0-alpine as frontend-build
WORKDIR /frontend

# Step 1 - Download all package dependencies first.
# We will redownload dependencies only when packages change.
COPY ./src/main/webapp/virtual-lab-ui/package.json ./src/main/webapp/virtual-lab-ui/package-lock.json ./
RUN npm install

# Step 2 - Copy all source and run build
COPY ./src/main/webapp/virtual-lab-ui/. .
RUN npm run build

## Stage 2 - Let's build a minimal image with the "deployable package"
FROM nginx:1.12-alpine
COPY --from=frontend-build ./frontend/build /usr/share/nginx/html
EXPOSE 80
COPY ./src/main/webapp/virtual-lab-ui/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]