#!/bin/sh
mkdir -p .tmp/node01 .tmp/node02                            
cp -r files/node01/keystore .tmp/node01/keystore            
cp -r files/node02/keystore .tmp/node02/keystore            
docker-compose run --rm geth init --datadir .tmp/node01 ./files/shared/genesis.json 
docker-compose run --rm geth init --datadir .tmp/node02 ./files/shared/genesis.json 
