FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false app &&\
	apt-get update &&\
	{ \
        echo debconf debconf/frontend select Noninteractive; \
        echo mysql-community-server mysql-community-server/data-dir \
            select ''; \
        echo mysql-community-server mysql-community-server/root-pass \
            password 'root'; \
        echo mysql-community-server mysql-community-server/re-root-pass \
            password 'root'; \
        echo mysql-community-server mysql-community-server/remove-test-db \
            select true; \
    } | debconf-set-selections \
    && apt-get update && apt-get install -y mysql-server \
    && service mysql start


ENV HOME=/home/app

COPY package.json $HOME/bluebank/
RUN chown -R app:app $HOME/*

USER app 
WORKDIR $HOME/bluebank/
RUN npm cache clean && npm install --silent --progress=false

USER root
COPY . $HOME/bluebank/
RUN chown -R app:app $HOME/*
RUN mysqld_safe --skip-grant-tables &&\
	  mysql -u root -e "CREATE DATABASE bluebank" &&\
	  mysql -u root < $HOME/bluebank/dump/bluebank.all.sql 
USER app
EXPOSE 3000


CMD ["node", "app.js"]