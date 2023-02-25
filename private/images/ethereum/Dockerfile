FROM ubuntu:latest

RUN apt-get update && apt-get install -y software-properties-common && apt-get clean
RUN apt-get update && add-apt-repository -y ppa:ethereum/ethereum && apt-get clean
RUN apt-get update && apt-get -y install ethereum && apt-get clean
RUN apt-get update && apt-get -y install curl ssh git && apt-get clean

# RUN git clone --depth=1 https://github.com/ethereum/go-ethereum.git -b v1.11.2
# RUN cd go-ethereum && make geth
