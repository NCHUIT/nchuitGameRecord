FROM ubuntu
MAINTAINER Lego Chiang

RUN apt-get install -y software-properties-common python
RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs

WORKDIR /opt/app

ADD . /opt/app
RUN npm install

EXPOSE 3000

CMD ["/usr/bin/node", "app.js"]

