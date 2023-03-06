Sample to create private block chain
---

## Exewcute in local

### STEP 1: Setup Data directory

```
docker-compose run --rm init
```

### STEP 2: Boot Services in Container

```
docker-compose up -d
```

### STEP 3: Create Transaction


```
docker-compose run --rm geth
```

```
eth.getBalance('a2217dd10357c20ace9b1a7dd71625151cfcf386')
eth.getBalance('6ce0ba981dd9b3bc259bbd868be14f957dbe6dcf')
eth.sendTransaction({from: '0x6ce0ba981dd9b3bc259bbd868be14f957dbe6dcf', to: '0xa2217dd10357c20ace9b1a7dd71625151cfcf386', value: 25000, gasPrice: 0, gas: 50000})
```
