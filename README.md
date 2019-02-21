# Leaderboard

## _What is the benefit of using Redis to implement the rate limiter?_

Using Redis to implement the rate limiter 
Use Redis in the implementation of the rate limiter to save the database of calls that could overload. 
Redis allows precisely to limit the number of requests.
Especially in our case, we use SQLite which has a system of "Concurrent Access" which could lengthen the time of the requests if this number is too important simultaneously.

Redis has specifics functions to implement a rate limiter like `expire` which use to specify a lifetime of a key.

---

## Documentation

You can access to the documentation of the API by running the node instance and access to `localhost:3001/documentation` 

---

## Try the API

You can access to the documentation and test the API from this link:
 - `leaderboard.alexdana.me/documentation` 
 - `leaderboard.alexdana.me/leaderboard/` 

---

## How to deploy

You can deploy this project using `pm2`.
To setup a first deployement
```bash
pm2 deploy production setup
```

and to deploy the project:
```bash
pm2 deploy production
```

---

## Docker
 To generate the image:
 ```bash
  docker build -t leaderboard .
```

Prepare the environement:
```bash
 docker pull redis # Download an instance of redis
 docker network create redis-node # create a network to let the redis instance and our instance (node) communicate
```

To start the project with the image :
```bash
 docker run -d --net redis-node --name instance_redis redis
 docker run -d --net redis-node -p 3001:3001 --name instance_node leaderboard
 ```

To reset all instance:
```bash
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
```

---

# Setup

### How to setup without docker

We will need differents tools : redis, node, npm (or yarn) and pm2.

## Redis

First you need to install `redis`.

If you have `wget`, execute these commands:
```bash
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
make test
sudo make install
```

or if you don't have it, just download the `tar.gz` from this link: http://download.redis.io/redis-stable.tar.gz
and execute these commands:

```bash
tar xvzf redis-stable.tar.gz
cd redis-stable
make
sudo make install
```

Now you have : `redis-cli`, `redis-benchmark`, `redis-check-aof`, `redis-check-rdb`, `redis-sentinel` and `redis-server`.


## NodeJS

Next, you need to install NodeJS if you don't have it.

#### OSX
```bash
brew install node
```
If it already installed, update it using:
```bash
brew upgrade node
```

#### Unix/Linux
For ubuntu:
```bash
sudo apt update
sudo apt install nodejs npm
```

## PM2
You only need to install it using npm or yarn
```bash
npm install pm2 -g
```

---

# How to run it

You need to prepare the project:
```bash
npm install
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all # If you want to add 100.000 entries
```

You need to run an instance of redis:
```bash
redis-server
```

and launch a node instance:
```bash
NODE_ENV=production npm start
```
If the `NODE_ENV` is mission the project will be run in development mode.
