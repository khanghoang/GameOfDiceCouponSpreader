// to use generators stuffs in mocha tests
require('co-mocha');

import {expect} from 'chai';

import connectToDatabase from '../../app/config/database';
import loadModels from '../../app/utils/loadModels';

const mongoose = require('mongoose');
const mockgoose = require('mockgoose');

// mock the mongoose
mockgoose(mongoose);

before(function* () {
  // manually connect MOCKGOOSE db
  connectToDatabase({}, mongoose);
  yield loadModels();

  GLOBAL.mockgoose = mockgoose;
  GLOBAL.expect = expect;

  GLOBAL.DesignController =
    require('../../app/controllers/api/v1/DesignController');
  GLOBAL.DesignManager =
    require('../../app/managers/DesignManager');
});
