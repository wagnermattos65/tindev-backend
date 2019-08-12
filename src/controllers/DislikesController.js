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
      loggedDev.dislikes.push(targetDev._id);

      await loggedDev.save();

      return res.json(loggedDev);
    }
    return res.json({ message: 'You can´t dislike yourself, dude!' });
  },
};
