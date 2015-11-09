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

  it('submitAsList', function *(done) {

    // add 2 dummy users
    var dicer1 = new DiceUsers({uid: '1'});
    yield dicer1.save();

    var dicer2 = new DiceUsers({uid: '2'});
    yield dicer2.save();

    var count = 0;

    // mock the `getPromiseFromSubmit` function
    CouponController.getPromiseFromSubmit = function() {
      return new Promise(function(resolve, reject) {
        count++;
        resolve();
      });
    }

    yield CouponController.submitAsList('123456');
    expect(count).to.be.equal(2);
    done();

    // clean up
    yield DiceUsers.remove({});
  })

  it('should create user', function *() {
    var uid = '123456';
    var user = yield CouponController.createDiceUser('123456');
    expect(user instanceof DiceUsers).to.be.true;
  })

  it('return error if uid is not numbers', function *() {
    var uid = '123456-abc';
    var user = yield CouponController.createDiceUser(uid);
    expect(user instanceof Error).to.be.true;
  })

  it('return error when duplicate users', function *() {
    var uid = '123456';
    var user = yield CouponController.createDiceUser('123456');
    var user2 = yield CouponController.createDiceUser('123456');
    expect(user2 instanceof Error).to.be.true;
  })
})

