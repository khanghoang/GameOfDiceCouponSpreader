describe('Dice User Model', function() {
  it('should create Dice User with uid', function* () {

    let diceUser = new DiceUsers({
      uid: '123456'
    });
    try {
      yield diceUser.save();
    } catch (e) {
      expect(e).to.be.null;
    }

    expect(diceUser.uid).to.be.equal('123456');
    yield diceUser.remove();
  });
});
