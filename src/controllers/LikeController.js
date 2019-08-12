const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    if (devId !== user) {
      const loggedDev = await Dev.findById(user);
      const targetDev = await Dev.findById(devId);

      if (!targetDev) {
        return res.status(400).json({ error: 'Dev not exists.' });
      }

      // eslint-disable-next-line no-underscore-dangle
      if (targetDev.likes.includes(loggedDev._id)) {
        const loggedSocket = req.connectedUsers[user];
        const targetSocket = req.connectedUsers[devId];

        // TODO: Store message to unlogged users
        if (loggedSocket) {
          req.io.to(loggedSocket).emit('match', targetDev);
        }

        if (targetSocket) {
          req.io.to(targetSocket).emit('match', loggedDev);
        }
      }

      // eslint-disable-next-line no-underscore-dangle
      loggedDev.likes.push(targetDev._id);

      await loggedDev.save();

      return res.json(loggedDev);
    }
    return res.json({ message: 'You can´t like yourself, dude!' });
  },
};
