const { default: axios } = require('axios');
class ControllerApi {
  static async motivation(req, res, next) {
    try {
      const { data } = await axios({
        url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.MOTIVATE_API,
          'X-RapidAPI-Host': process.env.MOTIVATE_HOST,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

}
module.exports = ControllerApi;
