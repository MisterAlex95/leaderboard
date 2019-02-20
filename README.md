# Leaderboard

## What is the benefit of using Redis to implement the rate limiter? 

Using Redis to implement the rate limiter 
Use Redis in the implementation of the rate limiter to save the database of calls that could overload. 
Redis allows precisely to limit the number of requests.
Especially in our case, we use SQLite which has a system of "Concurrent Access" which could lengthen the time of the requests if this number is too important simultaneously.

Redis has specifics functions to implement a rate limiter like `expire` which use to specify a lifetime of a key.

## OLD README

## How to setup

I assume that you already use a `terminal` and know how it works. 

We will need differents tools : redis, node and npm (or yarn).

### Prerequisites
#### OSX
On `OSX` we will use `brew` you can download it using this command line:
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
After this, you can install wget using:
```bash
brew install wget
```
#### Unix/Linux
*On `Ubuntu` or other `linux's distribution` I assume you already have wget.*

---

### Redis

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

If you are on Windows download from this page: https://github.com/dmajkic/redis/downloads
the `redis-2.4.5-win32-win64.zip`

Now you have : `redis-cli`, `redis-benchmark`, `redis-check-aof`, `redis-check-rdb`, `redis-sentinel` and `redis-server`.

*/!\ If any errors happens let's check the `redis.io` website.*


### NodeJS

Next, you need to install NodeJS if you don't have it.

#### OSX
Like you previously installed `brew`, you just have to execute this command line:
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
For any else distribution report to this page https://nodejs.org/en/download/package-manager/


---

### Docker
 To generate the image:
 ```bash
 docker build -t alex/leaderboard .
 ```

Questions:

 - Si il y a des requêtes erronées type POST sans score ou sans playerName je dois seulement renvoyer une réponse avec le status 500 ou je peux specifier le message ("Header parameter 'PlayerName' is missing." ou "Body parameter 'score' is missing") ? (Ce qui me semble plus utile pour le potentiel client.)
 - Je peux utiliser les libs que je souhaite (je pense notamment à sequelize) ?

