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

  static submit = (uid, coupon) -> {
    request("/event/god/coupon",
            {
              formData: {
                couponNumber : coupon,
                uid : uid,
                language : 'en'
              }
            }, function(error, res, body) {
              if (error) {
                alert('Failed to verify a coupon.');
                return;
              }

              var data = body;

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
            })
  }
}

exports default CouponController;
