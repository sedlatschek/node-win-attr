import AttributeSetting from './AttributeSetting';
import FileAttribute from './FileAttribute';
const attr = process.platform === 'win32'
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
export function getAttributes(path: string): Promise<AttributeSetting> {
  return new Promise<AttributeSetting>((resolve, reject) => {
    try {
      const result: AttributeSetting = getAttributesSync(path);
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
export function getAttributesSync(path: string): AttributeSetting {
  if (!attr) {
    throw new ReferenceError(PLATFORM_ERROR);
  }
  return attr.getAttributes(path);
}

/**
 * Set the given Windows filesystem attribute settings for a given path.
 *
 * @param {string} path
 * @param {Record<FileAttribute, boolean>} settings
 */
export function setAttributes(path: string, settings: Record<FileAttribute, boolean>): Promise<void> {
  // TODO
  return new Promise((resolve) => resolve());
}

/**
 * Set the given Windows filesystem attribute settings for a given path.
 *
 * @param {string} path
 * @param {Record<FileAttribute, boolean>} settings
 */
 export function setAttributesSync(path: string, settings: Record<FileAttribute, boolean>): void {
  if (!attr) {
    throw new ReferenceError(PLATFORM_ERROR);
  }
  // TODO
}

export * from './AttributeSetting';
export * from './FileAttribute';

export default {
  getAttributes,
  getAttributesSync,
  setAttributes,
  setAttributesSync,
}
