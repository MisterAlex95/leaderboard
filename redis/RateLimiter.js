const client = require('./index');

client.on("error", function (err) {
  console.log("Error " + err);
});

function rateLimiter(PlayerName, cb) {
  const d = new Date();
  const currentMinute = d.getMinutes();
  const currentKey = `${PlayerName}:${currentMinute}`;

  client.get(currentKey, (err, value) => {
    let expire = false;
    if (value && value >= 5) {
      cb(false);
    } else {
      client.multi()
        .incr(currentKey, (err, reply) => {
        })
        .expire(currentKey, 60, (err, nbr) => {
          expire = (nbr) ? true : false;
          console.log(`EXPIRE ${expire}`)
        })
        .exec((err, reply) => {
          // console.log(`EXEC: ${reply}`)
          // console.log(`EXEC: ${err}`)
          cb(expire);
        });
    }
  });
}


module.exports = {
  rateLimiter
};
