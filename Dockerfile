FROM ubuntu:latest

RUN apt-get update && apt-get install -y software-properties-common && apt-get clean
RUN apt-get update && add-apt-repository -y ppa:ethereum/ethereum && apt-get clean
RUN apt-get update && apt-get -y install ethereum && apt-get clean
