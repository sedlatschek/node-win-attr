import 'mocha';
import { expect } from 'chai';
import { getAttributesSync, setAttributesSync } from '../src';
import {
  createDummyDirSync,
  createDummyFileSync,
  describeUnix,
  describeWin,
  getDummyDirPath,
  getDummyFilePath,
  testAttributes,
  testAttributesFalse,
} from './helpers';

describeWin('setAttributes', () => {
  for (const attribute of testAttributes) {
    it(`sets ${attribute.toString()} for a directory on windows`, () => {
      const dir = createDummyDirSync();
      const attr1 = getAttributesSync(dir);

      for (const missing of testAttributes) {
        expect(attr1[missing]).to.be.false;
      }

      setAttributesSync(dir, { [attribute]: true });
      const attr2 = getAttributesSync(dir);

      expect(attr2[attribute]).to.be.true;
      for (const missing of testAttributes.filter((a) => a !== attribute)) {
        expect(attr2[missing]).to.be.false;
      }
    });

    it(`sets ${attribute.toString()} for a file on windows`, () => {
      const file = createDummyFileSync();
      const attr1 = getAttributesSync(file);

      for (const missing of testAttributes) {
        expect(attr1[missing]).to.be.false;
      }

      setAttributesSync(file, { [attribute]: true });
      const attr2 = getAttributesSync(file);

      expect(attr2[attribute]).to.be.true;
      for (const missing of testAttributes.filter((a) => a !== attribute)) {
        expect(attr2[missing]).to.be.false;
      }
    });
  }

  it('throws exception for non existing path', () => {
    expect(() => setAttributesSync('nonexisting', {}))
      .to.throw('File or directory not found');
  });

  describeWin('keeps previously existing attributes:', () => {
    before(() => {
      const dir = createDummyDirSync(undefined, 'keeps');
      setAttributesSync(dir, testAttributesFalse);
    });
    for (let i = 0; i < testAttributes.length; i += 1) {
      it(`when adding ${testAttributes[i].toString()} to a directory`, () => {
        const dir = getDummyDirPath('keeps');
        setAttributesSync(dir, { [testAttributes[i]]: true });
        const attr = getAttributesSync(dir);
        for (let j = 0; j < testAttributes.length; j += 1) {
          if (j <= i) {
            expect(attr[testAttributes[j]]).to.be.true;
          } else {
            expect(attr[testAttributes[j]]).to.be.false;
          }
        }
      });
    }
  });

  describeWin('keeps previously existing attributes:', () => {
    before(() => {
      const file = createDummyFileSync(undefined, 'keeps.txt');
      setAttributesSync(file, testAttributesFalse);
    });
    for (let i = 0; i < testAttributes.length; i += 1) {
      it(`when adding ${testAttributes[i].toString()} to a file`, () => {
        const file = getDummyFilePath('keeps.txt');
        setAttributesSync(file, { [testAttributes[i]]: true });
        const attr = getAttributesSync(file);
        for (let j = 0; j < testAttributes.length; j += 1) {
          if (j <= i) {
            expect(attr[testAttributes[j]]).to.be.true;
          } else {
            expect(attr[testAttributes[j]]).to.be.false;
          }
        }
      });
    }
  });
});

describeUnix('setAttributes', () => {
  for (const attribute of testAttributes) {
    it('throws exception for a directory on unix', () => {
      const dir = createDummyDirSync();
      expect(() => setAttributesSync(dir, { [attribute]: true }))
        .to.throw(`Can not reference win-attr addon on ${process.platform}.`);
    });

    it('throws exception for a file on unix', () => {
      const file = createDummyFileSync();
      expect(() => setAttributesSync(file, { [attribute]: true }))
        .to.throw(`Can not reference win-attr addon on ${process.platform}.`);
    });
  }
});
