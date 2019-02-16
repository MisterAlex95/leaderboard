# Leaderboard

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

