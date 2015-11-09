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

