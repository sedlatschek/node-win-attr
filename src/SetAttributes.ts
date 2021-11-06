import FileAttribute from './FileAttribute';

interface SetAttributes {
  /**
   * A file or directory that is an archive file or directory. Applications typically use this
   * attribute to mark files for backup or removal.
   */
  [FileAttribute.Archive]?: boolean,

  /**
   * The file or directory is hidden. It is not included in an ordinary directory listing.
   */
  [FileAttribute.Hidden]?: boolean,

  /**
   * A file that does not have other attributes set. This attribute is valid only when used alone.
   */
  [FileAttribute.Normal]?: boolean,

  /**
   * The file or directory is not to be indexed by the content indexing service.
   */
  [FileAttribute.NotContentIndexed]?: boolean,

  /**
   * The data of a file is not available immediately. This attribute indicates that the file data
   * is physically moved to offline storage. This attribute is used by Remote Storage, which is
   * the hierarchical storage management software. Applications should not arbitrarily change
   * this attribute.
   */
  [FileAttribute.Offline]?: boolean,

  /**
   * A file or directory that the operating system uses a part of, or uses exclusively.
   */
  [FileAttribute.System]?: boolean,

  /**
   * A file that is read-only. Applications can read the file, but cannot write to it or delete
   * it. This attribute is not honored on directories. For more information, see You cannot view
   * or change the Read-only or the System attributes of folders in Windows Server 2003, in
   * Windows XP, in Windows Vista or in Windows 7.
   */
  [FileAttribute.Readonly]?: boolean,

  /**
   * The handle that identifies a directory.
   */
  [FileAttribute.Directory]?: boolean,

  /**
   * A file that is being used for temporary storage. File systems avoid writing data back to
   * mass storage if sufficient cache memory is available, because typically, an application
   * deletes a temporary file after the handle is closed. In that scenario, the system can
   * entirely avoid writing the data. Otherwise, the data is written after the handle is closed.
   */
  [FileAttribute.Temporary]?: boolean,
}

export default SetAttributes;
