class Helper {
  static async handleResponse(res, code, bool, message, data) {
    res.status(code).json({
      success: bool,
      message: message,
      data
    })
  }
}

export default Helper;