#include <map>
#include <napi.h>
#include <windows.h>

const std::map<DWORD, std::string> attr_map = {
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

bool valid_parameters(const Napi::CallbackInfo& info) {
  if (info.Length() < 1) {
    return false;
  }
  if (!info[0].IsString()) {
    return false;
  }
  return true;
}

Napi::Value GetAttributes(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // check parameters
  if (!valid_parameters(info)) {
    Napi::TypeError::New(env, "Invalid arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  // cast path parameter
  std::string str = info[0].ToString().Utf8Value();
  const char* path = str.c_str();

  // retrieve attributes
  DWORD attr = GetFileAttributes(path);

  // build result
  Napi::Object obj = Napi::Object::New(env);
  for (auto it = attr_map.begin(); it != attr_map.end(); ++it) {
    obj.Set(
      Napi::String::New(env, it->second),
      Napi::Boolean::New(env, attr & it->first)
    );
  }

  return obj;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(
    Napi::String::New(env, "getAttributes"),
    Napi::Function::New(env, GetAttributes)
  );
  return exports;
}

NODE_API_MODULE(winsibility, Init)
