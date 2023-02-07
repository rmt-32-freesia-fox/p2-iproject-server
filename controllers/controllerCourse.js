const axios = require('axios');
class ControllerCourse {
  static async twelevCourse(req, res, next) {
    try {
      console.log(req.query);
      const { page, search } = req.query;
      const { data } = await axios({
        method: 'get',
        url: `https://youtube.googleapis.com/youtube/v3/search?`,
        params: {
          part: 'snippet',
          maxResults: '8',
          q: `tutorial ${search}`,
          regionCode: 'id',
          type: 'video',
          videoCategoryId: '28',
          key: process.env.YT_KEY,
          pageToken: page,
        },
      });
      res.status(200).json({ tokenNext: data.nextPageToken, tokenPrev: data.prevPageToken, totalPage: data.pageInfo.totalResults, items: data.items });
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
          key: process.env.YT_KEY,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerCourse;
