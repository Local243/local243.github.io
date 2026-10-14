# Static site image for CapRover.
# CapRover terminates TLS (Let's Encrypt) and proxies to this container on port 80.
FROM nginx:1.28-alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf

COPY index.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY images /usr/share/nginx/html/images
COPY data /usr/share/nginx/html/data

EXPOSE 80
