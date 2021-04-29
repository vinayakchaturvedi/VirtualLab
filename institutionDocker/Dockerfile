FROM python:3.8-slim-buster
MAINTAINER Rushikesh Jachak rushikesh.jachak@iiitb.org

RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "python3-pip"]
RUN ["apt-get", "-y", "install", "openssh-server","sshpass","curl"]

# Install docker inside the webserver container
RUN pip3 install docker
RUN curl -sSL https://get.docker.com/ | sh
ENV SHARE_DIR /usr/local/share

##createuser virtuallab
RUN useradd -ms /bin/bash virtuallab