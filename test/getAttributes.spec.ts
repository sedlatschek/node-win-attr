import 'mocha';
import { expect } from 'chai';
import { getAttributesSync } from '../src';
import {
  createDummyDirSync,
  createDummyFileSync,
  describeUnix,
  describeWin,
  testAttributes,
} from './helpers';

describeWin('getAttributes', () => {
  for (const attribute of testAttributes) {
    it(`retrieves '${attribute.toString()}' for a directory on windows`, () => {
      const dir = createDummyDirSync(attribute);
      const attr = getAttributesSync(dir);

      expect(attr[attribute]).to.be.true;
      for (const missing of testAttributes.filter((a) => a !== attribute)) {
        expect(attr[missing]).to.be.false;
      }
    });

    it(`retrieves '${attribute.toString()}' for a file on windows`, () => {
      const file = createDummyFileSync(attribute);
      const attr = getAttributesSync(file);

      expect(attr[attribute]).to.be.true;
      for (const missing of testAttributes.filter((a) => a !== attribute)) {
        expect(attr[missing]).to.be.false;
      }
    });
  }
});

describeUnix('getAttributes', () => {
  for (const attribute of testAttributes) {
    it('throws exception for a directory on unix', () => {
      const dir = createDummyDirSync(attribute);
      expect(() => getAttributesSync(dir))
        .to.throw(`Can not reference win-attr addon on ${process.platform}.`);
    });

    it('throws exception for a file on unix', () => {
      const file = createDummyFileSync();
      expect(() => getAttributesSync(file))
        .to.throw(`Can not reference win-attr addon on ${process.platform}.`);
    });
  }
});
