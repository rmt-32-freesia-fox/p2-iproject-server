const axios = require('axios');
class ControllerCourse {
  static async twelevCourse(req, res, next) {
    try {
      const { page } = req.query;
      const dataCourse = await axios({
        method: 'get',
        url: `https://youtube.googleapis.com/youtube/v3/search?`,
        params: {
          part: 'snippet',
          maxResults: '8',
          q: 'tutorial',
          regionCode: 'id',
          type: 'video',
          videoCategoryId: '28',
          key: process.env.YT_key,
          pageToken: page,
        },
      });
      res.status(200).json(dataCourse.data.items);
    } catch (error) {
      next(error);
    }
  }
  static async forSearch(req, res, next) {
    try {
      const { tutorial, page } = req.query;
      const dataSearch = await axios({
        method: 'get',
        url: `https://youtube.googleapis.com/youtube/v3/search?`,
        params: {
          part: 'snippet',
          maxResults: '12',
          q: `tutorial ${tutorial}`,
          regionCode: 'id',
          type: 'video',
          videoCategoryId: '28',
          key: process.env.YT_key,
          pageToken: page,
        },
      });
      res.status(200).json(dataSearch.data);
    } catch (error) {
      next(error);
    }
  }
  static async videoById(req, res, next) {
    try {
      const { videoid } = req.query;
      const { data } = await axios({
        url: 'https://youtube.googleapis.com/youtube/v3/videos',
        params: {
          part: 'snippet,contentDetails,statistics',
          id: videoid,
          key: process.env.YT_key,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerCourse;
