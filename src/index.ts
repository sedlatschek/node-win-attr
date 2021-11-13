import GetAttributes from './GetAttributes';
import SetAttributes from './SetAttributes';
const attr = process.platform.startsWith('win')
  /* eslint-disable-next-line @typescript-eslint/no-var-requires */
  ? require('bindings')('attr')
  : null;

const PLATFORM_ERROR = `Can not reference win-attr addon on ${process.platform}.`;

/**
 * Get the Windows filesystem attributes to a given path.
 *
 * @param {string} path
 * @returns Windows filesystem attributes
 */
export function getAttributes(path: string): Promise<GetAttributes> {
  return new Promise<GetAttributes>((resolve, reject) => {
    try {
      const result: GetAttributes = getAttributesSync(path);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Get the Windows filesystem attributes to a given path.
 *
 * @param {string} path
 * @returns Windows filesystem attributes
 */
export function getAttributesSync(path: string): GetAttributes {
  if (!attr) {
    throw new ReferenceError(PLATFORM_ERROR);
  }
  return attr.getAttributes(path);
}

/**
 * Set the given Windows filesystem attribute settings for a given path.
 *
 * @param {string} path
 * @param {SetAttributes} settings
 * @returns Whether the operation succeeded.
 */
export function setAttributes(path: string, settings: SetAttributes): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const result: boolean = setAttributesSync(path, settings);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Set the given Windows filesystem attribute settings for a given path.
 *
 * @param {string} path
 * @param {SetAttributes} settings
 * @returns Whether the operation succeeded.
 */
 export function setAttributesSync(path: string, settings: SetAttributes): boolean {
  if (!attr) {
    throw new ReferenceError(PLATFORM_ERROR);
  }
  return attr.setAttributes(path, settings);
}

export { default as GetAttributes } from './GetAttributes';
export { default as FileAttribute } from './FileAttribute';
export { default as SetAttributes } from './SetAttributes';

export default {
  getAttributes,
  getAttributesSync,
  setAttributes,
  setAttributesSync,
}
