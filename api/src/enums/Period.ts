const time = 1000;

enum Period {
  TEN_SECONDS     = (time * 10),
  THIRTY_SECONDS  = (time * 30),
  ONE_MINUTE      = (time * 60),
  FIVE_MINUTES    = (time * 60 * 5),
  TEN_MINUTES     = (time * 60 * 10),
  HALF_HOUR       = (time * 60 * 30),
  HOUR            = (time * 60 * 60),
  DAILY           = (time * 60 * 60 * 24)
}

export default Period