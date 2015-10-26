import DesignManager from '../managers/DesignManager';

class DesignController {
  static index = async (req, res, next) => {

    let data;

    try {
      data = await DesignManager.getDesignsWithPagination(req.query, {});
    } catch (e) {
      next(e);
    }

    res.render('designs/index', {
      designs: data.data,
      pageCount: data.pageCount,
      itemCount: data.itemCount
    });
  }

  static approvedPage = async (req, res, next) => {

    let data;

    try {
      data = await DesignManager
      .getDesignsWithPagination(req.query, {status: 'approved'});
    } catch (e) {
      next(e);
    }

    res.render('designs/index', {
      originUrl: req.originalUrl,
      designs: data.data,
      pageCount: data.pageCount,
      itemCount: data.itemCount
    });
  }

  static rejectedPage = async (req, res, next) => {

    let data;

    try {
      data = await DesignManager
      .getDesignsWithPagination(req.query, {status: 'rejected'});
    } catch (e) {
      next(e);
    }

    res.render('designs/index', {
      originUrl: req.originalUrl,
      designs: data.data,
      pageCount: data.pageCount,
      itemCount: data.itemCount
    });
  }

  static pendingPage = async (req, res, next) => {

    let data;

    try {
      data = await DesignManager
      .getDesignsWithPagination(req.query, {status: 'pending'});
    } catch (e) {
      next(e);
    }

    res.render('designs/index', {
      originUrl: req.originalUrl,
      designs: data.data,
      pageCount: data.pageCount,
      itemCount: data.itemCount
    });
  }

  static approve = async (req, res, next) => {
    if (!req.params.id) {
      next(new Error('Error: design id is missing'));
    }

    let id = req.params.id;

    let design = await Designs.findOne({_id: id});

    try {
      await DesignManager.approveDesign(design);
    } catch (e) {
      next(e);
    }

    res.redirect(req.query.originURL || '/admin/designs');
  }

  static reject = async (req, res, next) => {
    if (!req.params.id) {
      next(new Error('Error: design id is missing'));
    }

    let id = req.params.id;

    let design = await Designs.findOne({_id: id});

    try {
      await DesignManager.rejectDesign(design);
    } catch (e) {
      next(e);
    }

    res.redirect(req.query.originURL || '/admin/designs');
  }
}

export default DesignController;
