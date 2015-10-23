require('co-mocha');

import {expect} from 'chai';
import connectToDatabase from '../app/config/database';
import loadModels from '../app/utils/loadModels';
import fs from 'fs';

const mongoose = require('mongoose');
const mockgoose = require('mockgoose');

// mock the mongoose
mockgoose(mongoose);

before(function* () {
  // manually connect MOCKGOOSE db
  connectToDatabase({}, mongoose);
  yield loadModels();
});

describe('Design Model', function() {
  it('should have correct type', function* () {
    let design = new Designs({status: 'approved'});
    try {
      yield design.save();
    } catch (e) {
      expect(e).to.be.null;
    }

    yield design.remove();
  });

  it('should raise error when type is not valid', function* () {
    let design = new Designs({status: 'invalid-type'});
    try {
      yield design.save();
    } catch (err) {
      expect(err).to.not.be.null;
    }
  });
});