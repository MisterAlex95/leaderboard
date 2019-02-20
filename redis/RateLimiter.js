const client = require('./index');

client.on("error", function (err) {
  console.error("Error " + err);
});

function rateLimiter(name, cb) {
  // const d = new Date();
  // const currentMinute = d.getMinutes();
  const currentKey = `${name}`;//:${currentMinute}`;

  client.get(currentKey, (err, value) => {
    let expire = false;
    if (value && value >= 5) {
      cb(false);
    } else {
      client.multi()
        .incr(currentKey, (err, reply) => { })
        .expire(currentKey, 60, (err, nbr) => {
          expire = (nbr) ? true : false;
        })
        .exec((err, reply) => {
          cb(expire);
        });
    }
  });
}

module.exports = {
  rateLimiter
};
