import AttributeSetting from './AttributeSetting';
import FileAttribute from './FileAttribute';
const attr = require('bindings')('attr');

/**
 * Get the Windows filesystem attributes to a given path.
 *
 * @param {string} path
 * @returns Windows filesystem attributes
 */
export function getAttributes(path: string): Promise<AttributeSetting> {
  return new Promise<AttributeSetting>((resolve, reject) => {
    try {
      const result: AttributeSetting = attr.getAttributes(path);
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
  return attr.getAttributes(path);
}

/**
 * Set the given Windows filesystem attribute flag settings for a given path.
 *
 * @param {string} path
 */
export function setAttributes(path: string, attributes: AttributeSetting): Promise<void> {
  // TODO
  return new Promise((resolve) => resolve());
}

/**
 * Set the given Windows filesystem attribute flag settings for a given path.
 *
 * @param {string} path
 * @param {AttributeSetting} settings
 */
 export function setAttributesSync(path: string, settings: AttributeSetting): void {
  // TODO
}

/**
 * Add the given Windows filesystem attribute flat for a given path.
 *
 * @param path
 * @param settings
 */
export function addAttribute(path: string, settings: FileAttribute): Promise<void> {
  // TODO
  return new Promise((resolve) => resolve());
}

/**
 * Add the given Windows filesystem attribute flat for a given path.
 * @param path
 * @param settings
 */
export function addAttributeSync(path: string, settings: FileAttribute): void {
  // TODO
}

export * from './AttributeSetting';
export * from './FileAttribute';

export default {
  getAttributes,
  getAttributesSync,
  setAttributes,
  setAttributesSync,
  addAttribute,
  addAttributeSync,
}
