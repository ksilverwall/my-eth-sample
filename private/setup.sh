#!/bin/sh
mkdir -p .tmp/node01 .tmp/node02                            
docker-compose run --rm geth init --datadir .tmp/node01 ./files/shared/genesis.json 
docker-compose run --rm geth init --datadir .tmp/node02 ./files/shared/genesis.json 
