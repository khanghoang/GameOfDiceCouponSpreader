import request from 'request';
import constantMirror from 'constant-mirror';

const Status  = constantMirror(
  'SUCCESS',
  'UNKNOWN_COUPON',
  'DECRYPTION_FAILED',
  'UNKNOWN_USERKEY',
  'INVALID_COUNTRY_CODE',
  'INVALID_LANGUAGE_CODE',
  'PROMOTION_REWARD_FAILED',
  'ALREADY_USED_COUPON',
  'OVER_TOTAL_LIMIT_COUPON',
  'DUPLICATE_PARTICIPATION_COUPON'
);

class CouponController {

  static postToCreateDiceUser = async (req, res, next) => {
    if (!req.body.uid) {
      next(new Error('invalid uid'));
    }

    let result = await CouponController.createDiceUser(req.body.uid);
    let message = '';

    if (result instanceof DiceUsers) {
      message = 'Okie, we got you';
    } else {
      // error
      message = result.toString();
    }

    res.render('coupon/register', {
      flash: {
        info: message
      }
    });
  }

  static getRegisterDiceUserPage = (req, res, next) => {
    res.render('coupon/register', {
    });
  }

  static postCoupon = async (req, res, next) => {
    if (!req.body.coupon) {
      next(new Error('invalid coupon'));
    }

    let coupon = req.body.coupon;
    await CouponController.submitAsList(coupon);
    res.render('coupon/postCoupon', {
      flash: {
        info: "Ok, coupon is sent"
      }
    });
  }

  static getPostCouponPage = (req, res, next) => {
    res.render('coupon/postCoupon', {
    });
  }

  static createDiceUser = async (uid) => {
    let user = new DiceUsers({uid: uid});
    try {
      await user.save();
    } catch (e) {
      return e;
    }

    return user;
  }

  static submitAsList = async (coupon) => {
    let users = await DiceUsers.find({});
    // I know what I'm doing
    users.map(u => CouponController.getPromiseFromSubmit(u.uid, coupon))
  }

  static submitForAnUser = async (uid, coupon) => {
    let data;
    try {
      data = await CouponController.getPromiseFromSubmit(uid, coupon);
    } catch (e) {
      return "Wrong coupon code.";
    }
    if(data.resultSetExt.result == 'true') {
      var usrMsg = data.resultSetExt.message;
      usrMsg = "";
      if(usrMsg == null || usrMsg == "null" || usrMsg == ""){
        usrMsg = Status.SUCCESS;
      }
      return usrMsg;
    } else {
      switch(data.resultSetExt.message) {
        case Status.UNKNOWN_COUPON:
          return "Wrong coupon code.";
        break;
        case Status.DECRYPTION_FAILED:
        case Status.UNKNOWN_COUPON:
          return "Invalid Joycity membership number.";
        break;
        case Status.INVALID_COUNTRY_CODE:
          return "Entered code cannot be used in current country.\nPlease check the list of countries available for use of coupon and try again.";
        break;
        case Status.PROMOTION_REWARD_FAILED:
          return "Failed to send rewards.\nPlease contact customer support.";
        break;
        case Status.ALREADY_USED_COUPON:
          alert("This coupon code has already been used.");
        break;
        case Status.OVER_TOTAL_LIMIT_COUPON:
          return "Coupon registration has been finished on a first-come first-served basis.";
        break;
        case Status.DUPLICATE_PARTICIPATION_COUPON:
          return "Coupon registration has been finished on a first-come first-served basis.";
        break;
        case Status.DUPLICATE_PARTICIPATION_COUPON:
          return "You have already been participated in coupon event.";
        break;
        return "You have already been participated in coupon event.";
        break;
        default :
          return 'Failed to verify a coupon.';
        break;
      }
    }
  }

  static getPromiseFromSubmit = (uid, coupon) => {
    return new Promise(function(resolve, reject) {
      request.post("http://promotion.joycity.com/event/god/coupon",
              {
                form: {
                  couponNumber : coupon,
                  uid : uid,
                  language : 'en'
                }
              }, function(error, res, body) {
                console.log(error, res.statusCode, body);
                if (error) {
                  reject(new Error('Failed to verify a coupon.'));
                  return;
                }

                var data = body;

                resolve(data);

              })
    })
  }
}

export default CouponController;
