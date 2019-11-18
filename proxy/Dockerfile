FROM nginx:1.13.9-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8686
CMD ["nginx", "-g", "daemon off;"]