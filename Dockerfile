FROM openjdk:8
MAINTAINER Rushikesh Jachak rushikesh.jachak@iiitb.org

# Install python and ansible
RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "python3-pip"]
RUN ["apt-get", "-y", "install", "ansible"]
RUN ["apt-get", "-y", "install", "openssh-server","sshpass"]

## Install docker inside the webserver container
RUN pip3 install docker
RUN curl -sSL https://get.docker.com/ | sh
ENV SHARE_DIR /usr/local/share
WORKDIR .
# copy jar file and resource modules
COPY ./target/virtuallab-0.0.1-SNAPSHOT.jar ./
COPY ./src/main/resources/ ./src/main/resources