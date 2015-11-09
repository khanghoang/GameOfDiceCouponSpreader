import request from 'request';

describe('Submit coupon', function() {
  it('should return invalid error when submitting invalid coupon', function(done) {
    var uid = '990318';
    var couponNumber = 'invalid-coupon';
    var alert = function(str) {
      console.log(str);
    };

    request("/event/god/coupon",
            {
              formData: {
                couponNumber : couponNumber,
                uid : uid,
                language : 'en'}
            },
            function(error, res, body) {
              expect(error).to.be.not.null;
              done();
            })
  })
})

// (function() {
//   var uid = '990318';
//   var coupon = 'invalid-coupon';
//   request("/event/god/coupon",
//           formData: {
//             couponNumber : couponNumber,
//             uid : uid,
//             language : 'en'},
//             function(error, res, body) {
//               if (error) {
//                 alert('Failed to verify a coupon.');
//                 return;
//               }
//
//               var data = body;
//               var alert = function(str) {
//                 console.log(str);
//               };
//
//               expect(data.resultSetExt.message).to.equal('UNKNOWN_COUPON');
//
//               // if(data.resultSetExt.result == 'true') {
//               //   var usrMsg = data.resultSetExt.message;
//               //   usrMsg = "";
//               //   if(usrMsg == null || usrMsg == "null" || usrMsg == ""){
//               //     usrMsg = "Coupon registration complete.";
//               //   }
//               //   alert(usrMsg);
//               // } else {
//               //   switch(data.resultSetExt.message) {
//               //     case "UNKNOWN_COUPON":
//               //       alert("Wrong coupon code.");
//               //     break;
//               //     case "DECRYPTION_FAILED":
//               //       case "UNKNOWN_USERKEY":
//               //       alert("Invalid Joycity membership number.");
//               //     break;
//               //     case "INVALID_COUNTRY_CODE":
//               //       case "INVALID_LANGUAGE_CODE":
//               //       alert("Entered code cannot be used in current country.\nPlease check the list of countries available for use of coupon and try again.");
//               //     break;
//               //     case "PROMOTION_REWARD_FAILED":
//               //       alert("Failed to send rewards.\nPlease contact customer support.");
//               //     break;
//               //     case "ALREADY_USED_COUPON":
//               //       alert("This coupon code has already been used.");
//               //     break;
//               //     case "OVER_TOTAL_LIMIT_COUPON":
//               //       alert("Coupon registration has been finished on a first-come first-served basis.");
//               //     break;
//               //     case "DUPLICATE_PARTICIPATION_COUPON":
//               //       alert("You have already been participated in coupon event.");
//               //     break;
//               //     default :
//               //       alert('Failed to verify a coupon.');
//               //     break;
//               //   }
//               // }
//             })
// })()
//
