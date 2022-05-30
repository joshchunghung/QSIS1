FROM nginx:latest
RUN mkdir -p /etc/nginx/sites-available/
COPY nginx.conf /etc/nginx/nginx.conf
COPY docker_nginx_qsis.conf /etc/nginx/sites-available/

RUN mkdir -p /etc/nginx/sites-enabled/\
    && ln -s /etc/nginx/sites-available/docker_nginx_qsis.conf /etc/nginx/sites-enabled/


CMD ["nginx", "-g", "daemon off;"]