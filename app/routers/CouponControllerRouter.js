import {Router as router} from 'express';
import CouponController from '../controllers/CouponController';

class DesignControllerRouter {
  static route() {
    this.router = router();

    let controller = CouponController;

    // this is the API
    this.router.post('/coupon/create',
                     controller.postCoupon);
    this.router.post('/dicer/register', controller.postToCreateDiceUser);

    // this is for CMS
    this.router.get('/coupon/create', controller.getPostCouponPage);
    this.router.get('/dicer/register', controller.getRegisterDiceUserPage);

    return this.router;
  }
}

export default DesignControllerRouter;
