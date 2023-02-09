class Controller {
  static home(req, res, next) {
    res.status(200).json({
      message: 'Server is live!',
    });
  }
}

module.exports = Controller;
