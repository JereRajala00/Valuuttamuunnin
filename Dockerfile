FROM centos

EXPOSE 80

RUN yum install httpd -y

COPY . /var/www/html

CMD ["usr/sbin/httpd", "-D", "FOREGROUND"]

# Launch container with syntax "docker run --name <container name> -dit -p 80:80 <image name>"