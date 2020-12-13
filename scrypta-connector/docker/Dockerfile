FROM mongo:bionic

RUN apt-get -qq update
RUN apt-get install -y software-properties-common make build-essential
RUN apt-get install -y git git-core curl wget nano zip

# CREATING ROOT BASIC CONFIGURATION FILE
RUN mkdir /root/.lyra
RUN echo "datadir=/opt/data/lyra" > /root/.lyra/lyra.conf
RUN echo "rpcuser=rpc" >> /root/.lyra/lyra.conf
RUN echo "rpcpassword=password" >> /root/.lyra/lyra.conf

# CLONING REPO
WORKDIR /opt
RUN mkdir /opt/data
RUN mkdir /opt/data/lyra
RUN mkdir /opt/data/idanode
RUN git clone https://github.com/scryptachain/scrypta-idanodejs
WORKDIR /opt/scrypta-idanodejs

# INSTALL NODEJS
RUN curl -q https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs
RUN npm install -g npm

# SETTING UP MONGODB
RUN mkdir -p mongodb_data configdb && chown -R mongodb:mongodb mongodb_data configdb
RUN ulimit -n 640000

# BUILDING IDANODE
RUN npm install
RUN npm run build
RUN node docker/create_conf.js

# DOWNLOADING WALLET
RUN wget https://github.com/scryptachain/scrypta/releases/download/2.0.1/lyra-2.0.1-linux-server.zip
RUN unzip lyra-2.0.1-linux-server.zip
RUN mv lyrad /usr/bin/lyrad
RUN mv lyra-cli /usr/bin/lyra-cli
RUN rm -rf bin
RUN rm lyra-2.0.1-linux-server.zip

# COPY BOOTSTRAP SCRIPT
COPY bootstrap_blockchain.sh /opt/bootstrap_blockchain.sh
COPY bootstrap_idanode.sh /opt/bootstrap_idanode.sh
RUN chmod 777 /opt/bootstrap_blockchain.sh
RUN chmod 777 /opt/bootstrap_idanode.sh

# FINAL OPERATIONS
WORKDIR /opt/scrypta-idanodejs
EXPOSE 3001
ENTRYPOINT [ "/opt/scrypta-idanodejs/run.sh" ]
CMD tail -f /dev/null