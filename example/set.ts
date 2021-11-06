import { setAttributes, SetAttributes, FileAttribute } from '../src';

(async () => {
  const settings: SetAttributes = {
    [FileAttribute.Hidden]: false,
    [FileAttribute.Readonly]: false,
  };
  console.log(await setAttributes('example', settings));
})();
