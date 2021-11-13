import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmdirSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { FileAttribute } from '../src';

const tmpDir = join(__dirname, 'temp');
const curPlatformIsWin = process.platform.startsWith('win');

enum AttribMode {
  Add,
  Remove,
}

/**
 * Change attribute to filesystem path.
 *
 * @param {string} path
 * @param {AttribMode} mode
 * @param {FileAttribute} attribute
 */
function attrib(path: string, mode: AttribMode, attribute: FileAttribute): void {
  const action = mode === AttribMode.Add ? '+' : '-';
  execSync(`attrib ${action}${getAttributeLetter(attribute)} "${path}" /s /d`);
}

/**
 * Describe a "suite" that is skipped on every other platform besides unix.
 */
export const describeUnix = !curPlatformIsWin ? describe : describe.skip;
/**
 * Describe a "suite" that is skipped on every other platform besides windows.
 */
export const describeWin = curPlatformIsWin ? describe : describe.skip;

/**
 * Array of test attributes.
 */
export const testAttributes = [
  FileAttribute.Archive,
  FileAttribute.Hidden,
  FileAttribute.Readonly,
  FileAttribute.System,
  FileAttribute.NotContentIndexed,
];

/**
 * Object of test attributes with only false as value.
 */
export const testAttributesFalse = testAttributes.reduce((a, c) => Object.assign(a, { [c]: false }), {});

/**
 * Get the letter for an attribute to be used with the attrib windows command.
 *
 * @param {FileAttribute} attribute
 * @returns Letter to the attribute.
 */
function getAttributeLetter(attribute: FileAttribute): string {
  if (attribute === FileAttribute.NotContentIndexed) {
    return 'i';
  }
  return attribute.toString().charAt(0).toLowerCase();
}

/**
 * Get the path of a dummy directory.
 *
 * @param name
 * @returns Path of dummy directory.
 */
function getDummyDirPath(name?: string): string {
  return name
    ? resolve(tmpDir, name)
    : join(tmpDir, 'dummy');
}

/**
 * Create a dummy directory.
 *
 * @param attributes
 * @param name
 * @returns {string} Path of the created directory.
 */
export function createDummyDirSync(attribute?: FileAttribute, name?: string): string {
  const path = getDummyDirPath(name);

  if (existsSync(path)) {
    removeDummyDirSync(path);
  }
  mkdirSync(path, { recursive: true });

  if (attribute) {
    attrib(path, AttribMode.Add, attribute);
  }

  return path;
}

/**
 * Remove a dummy directory.
 *
 * @param name
 */
export function removeDummyDirSync(name?: string): void {
  const path = getDummyDirPath(name);
  if (existsSync(path)) {
    attrib(path, AttribMode.Remove, FileAttribute.Archive);
    attrib(path, AttribMode.Remove, FileAttribute.Hidden);
    attrib(path, AttribMode.Remove, FileAttribute.Readonly);
    attrib(path, AttribMode.Remove, FileAttribute.System);
    rmdirSync(path);
  }
}

/**
 * Get the path of a dummy file.
 *
 * @param name
 * @returns Path of dummy file.
 */
 function getDummyFilePath(name?: string): string {
  return name
    ? resolve(tmpDir, name)
    : join(tmpDir, 'dummy.txt');
}

/**
 * Create a dummy directory.
 *
 * @param attributes
 * @param name
 * @returns {string} Path of the created directory.
 */
 export function createDummyFileSync(attribute?: FileAttribute, name?: string): string {
  const path = getDummyFilePath(name);

  if (existsSync(path)) {
    removeDummyFileSync(path);
  }
  writeFileSync(path, 'I am a dummy.\n');

  attrib(path, AttribMode.Remove, FileAttribute.Archive);
  if (attribute) {
    attrib(path, AttribMode.Add, attribute);
  }

  return path;
}

/**
 * Remove a dummy directory.
 *
 * @param name
 */
 export function removeDummyFileSync(name?: string): void {
  const path = getDummyFilePath(name);
  if (existsSync(path)) {
    attrib(path, AttribMode.Remove, FileAttribute.Readonly);
    rmSync(path);
  }
}
