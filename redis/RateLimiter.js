const client = require('./index');

client.on("error", function (err) {
  console.err("Error " + err);
});

async function rateLimiter(PlayerName) {
  const d = new Date();
  const currentMinute = d.getMinutes();
  const currentKey = `${PlayerName}:${currentMinute}`;

  client.get(currentKey, (err, value) => {
    let expire = false;
    if (value && value >= 5) {
      return false;
    } else {
      client.multi()
        .incr(currentKey, (err, reply) => {})
        .expire(currentKey, 60, (err, nbr) => {
          expire = (nbr) ? true : false;
        })
        .exec((err, reply) => {
          return expire;
        });
    }
  });
}


module.exports = {
  rateLimiter
};
