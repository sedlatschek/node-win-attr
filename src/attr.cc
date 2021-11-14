#include <map>
#include <napi.h>
#include <windows.h>

const std::map<DWORD, std::string> get_attr_map = {
  { FILE_ATTRIBUTE_READONLY, "readonly" },
  { FILE_ATTRIBUTE_HIDDEN, "hidden" },
  { FILE_ATTRIBUTE_SYSTEM, "system" },
  { FILE_ATTRIBUTE_DIRECTORY, "directory" },
  { FILE_ATTRIBUTE_ARCHIVE, "archive" },
  { FILE_ATTRIBUTE_DEVICE, "device" },
  { FILE_ATTRIBUTE_NORMAL, "normal" },
  { FILE_ATTRIBUTE_TEMPORARY, "temporary" },
  { FILE_ATTRIBUTE_SPARSE_FILE, "sparseFile" },
  { FILE_ATTRIBUTE_REPARSE_POINT, "reparsePoint" },
  { FILE_ATTRIBUTE_COMPRESSED, "compressed" },
  { FILE_ATTRIBUTE_OFFLINE, "offline" },
  { FILE_ATTRIBUTE_NOT_CONTENT_INDEXED, "notContentIndexed" },
  { FILE_ATTRIBUTE_ENCRYPTED, "encrypted" },
  { FILE_ATTRIBUTE_INTEGRITY_STREAM, "integrityStream" },
  { FILE_ATTRIBUTE_VIRTUAL, "virtual" },
  { FILE_ATTRIBUTE_NO_SCRUB_DATA, "noScrubData" },
  { FILE_ATTRIBUTE_EA, "ea" },
  { FILE_ATTRIBUTE_PINNED, "pinned" },
  { FILE_ATTRIBUTE_UNPINNED, "unpinned" },
  { FILE_ATTRIBUTE_RECALL_ON_OPEN, "recallOnOpen" },
  { FILE_ATTRIBUTE_RECALL_ON_DATA_ACCESS, "recallOnDataAccess" },
  { FILE_ATTRIBUTE_STRICTLY_SEQUENTIAL, "strictlySequential" }
};

Napi::Value GetAttributes(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // check parameters
  if (info.Length() != 1 || !info[0].IsString()) {
    Napi::TypeError::New(env, "Invalid arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  // cast path parameter
  std::string str = info[0].ToString().Utf8Value();
  const char* path = str.c_str();

  // retrieve attributes
  DWORD attr = GetFileAttributes(path);

  // handle errors
  if (attr == INVALID_FILE_ATTRIBUTES) {
    if (GetLastError() == ERROR_FILE_NOT_FOUND) {
      Napi::Error::New(env, "File or directory not found").ThrowAsJavaScriptException();
    } else {
      Napi::Error::New(env, "Invalid file attributes").ThrowAsJavaScriptException();
    }
    return env.Null();
  }

  // build result
  Napi::Object obj = Napi::Object::New(env);
  for (auto it = get_attr_map.begin(); it != get_attr_map.end(); ++it) {
    obj.Set(
      Napi::String::New(env, it->second),
      Napi::Boolean::New(env, attr & it->first)
    );
  }

  return obj;
}

const std::map<DWORD, std::string> set_attr_map = {
  { FILE_ATTRIBUTE_READONLY, "readonly" },
  { FILE_ATTRIBUTE_HIDDEN, "hidden" },
  { FILE_ATTRIBUTE_SYSTEM, "system" },
  { FILE_ATTRIBUTE_ARCHIVE, "archive" },
  { FILE_ATTRIBUTE_NORMAL, "normal" },
  { FILE_ATTRIBUTE_TEMPORARY, "temporary" },
  { FILE_ATTRIBUTE_OFFLINE, "offline" },
  { FILE_ATTRIBUTE_NOT_CONTENT_INDEXED, "notContentIndexed" },
};

Napi::Value SetAttributes(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // check parameters
  if (info.Length() != 2 || !info[0].IsString() || !info[1].IsObject()) {
    Napi::TypeError::New(env, "Invalid arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  // cast parameters
  std::string str = info[0].ToString().Utf8Value();
  const char* path = str.c_str();
  Napi::Object obj = info[1].ToObject();

  // retrieve attributes
  DWORD attr = GetFileAttributes(path);

  // handle errors
  if (attr == INVALID_FILE_ATTRIBUTES) {
    if (GetLastError() == ERROR_FILE_NOT_FOUND) {
      Napi::Error::New(env, "File or directory not found").ThrowAsJavaScriptException();
    } else {
      Napi::Error::New(env, "Invalid file attributes").ThrowAsJavaScriptException();
    }
    return env.Null();
  }

  for (auto it = set_attr_map.begin(); it != set_attr_map.end(); ++it) {
    if (obj.Has(it->second)) {
      BOOL value = obj.Get(it->second).ToBoolean();
      // flag is set
      if (value) {
        // flag is true
        attr = attr | it->first;
      } else {
        // flag is false
        attr = attr & ~it->first;
      }
    }
  }

  BOOL result = SetFileAttributes(path, attr);

  return Napi::Boolean::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(
    Napi::String::New(env, "getAttributes"),
    Napi::Function::New(env, GetAttributes)
  );
  exports.Set(
    Napi::String::New(env, "setAttributes"),
    Napi::Function::New(env, SetAttributes)
  );
  return exports;
}

NODE_API_MODULE(winattr, Init)
