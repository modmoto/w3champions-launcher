#include <napi.h>
#include <iostream>
#include <Windows.h>
#include <string>

#define VK_SPACE    0x20 // space key
#define VK_ENTER    0x0D // enter key
#define VK_ESCAPE   0x1B // escape key
#define VK_F01      0x6F // f1 key
#define VK_F02      0x70 // f2 key
#define VK_F03      0x71 // f3 key
#define VK_F10      0x79 // f10 key
#define VK_F12      0x7B // f12 key

Napi::Boolean ReleaseModifier(UINT modifier)
{
    INPUT ipModifer;
    ipModifer.type = INPUT_KEYBOARD;
    ipModifer.ki.time = 0;
    ipModifer.ki.dwExtraInfo = 0;
    ipModifer.ki.wVk = modifier;
    ipModifer.ki.dwFlags = KEYEVENTF_KEYUP;
    SendInput(1, &ipModifer, sizeof(INPUT));

    return Napi::Boolean();
}

Napi::Boolean ReleaseLControl(const Napi::CallbackInfo& info) { return ReleaseModifier(VK_LCONTROL); }
Napi::Boolean ReleaseLAlt(const Napi::CallbackInfo& info) { return ReleaseModifier(VK_LMENU); }

Napi::Boolean HoldModifier(UINT modifier)
{
    INPUT ipModifer;
    ipModifer.type = INPUT_KEYBOARD;
    ipModifer.ki.time = 0;
    ipModifer.ki.dwExtraInfo = 0;
    ipModifer.ki.wVk = modifier;

    ipModifer.ki.wScan = MapVirtualKey(modifier, MAPVK_VK_TO_VSC);
    ipModifer.ki.dwFlags = KEYEVENTF_SCANCODE;
    SendInput(1, &ipModifer, sizeof(INPUT));

    return Napi::Boolean();
}

Napi::Boolean HoldLControl(const Napi::CallbackInfo& info) { return HoldModifier(VK_LCONTROL); }
Napi::Boolean HoldLAlt(const Napi::CallbackInfo& info) { return HoldModifier(VK_LMENU); }

Napi::Boolean PressKey(UINT key)
{
    INPUT ip;
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = MapVirtualKey(key, MAPVK_VK_TO_VSC);
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;
    ip.ki.wVk = key;
    ip.ki.dwFlags = KEYEVENTF_SCANCODE;

    SendInput(1, &ip, sizeof(INPUT));

    ip.ki.dwFlags = KEYEVENTF_KEYUP;
    SendInput(1, &ip, sizeof(INPUT));

    return Napi::Boolean();
}

Napi::Boolean PressNum8(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD8); }
Napi::Boolean PressNum7(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD7); }
Napi::Boolean PressNum5(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD5); }
Napi::Boolean PressNum4(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD4); }
Napi::Boolean PressNum2(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD2); }
Napi::Boolean PressNum1(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD1); }
Napi::Boolean PressNumlock(const Napi::CallbackInfo& info) { return PressKey(VK_NUMLOCK); }
Napi::Boolean PressSpace(const Napi::CallbackInfo& info) { return PressKey(VK_SPACE); }

Napi::Boolean PressEnter(const Napi::CallbackInfo& info) { return PressKey(VK_ENTER); }
Napi::Boolean PressEscape(const Napi::CallbackInfo& info) { return PressKey(VK_ESCAPE); }
Napi::Boolean PressF10(const Napi::CallbackInfo& info) { return PressKey(VK_F10); }
Napi::Boolean PressF12(const Napi::CallbackInfo& info) { return PressKey(VK_F12); }

Napi::Boolean PressF1(const Napi::CallbackInfo& info) { return PressKey(VK_F01); }
Napi::Boolean PressF2(const Napi::CallbackInfo& info) { return PressKey(VK_F02); }
Napi::Boolean PressF3(const Napi::CallbackInfo& info) { return PressKey(VK_F03); }


Napi::Object init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "pressNum1"), Napi::Function::New(env, PressNum1));
    exports.Set(Napi::String::New(env, "pressNum2"), Napi::Function::New(env, PressNum2));
    exports.Set(Napi::String::New(env, "pressNum4"), Napi::Function::New(env, PressNum4));
    exports.Set(Napi::String::New(env, "pressNum5"), Napi::Function::New(env, PressNum5));
    exports.Set(Napi::String::New(env, "pressNum7"), Napi::Function::New(env, PressNum7));
    exports.Set(Napi::String::New(env, "pressNum8"), Napi::Function::New(env, PressNum8));

    exports.Set(Napi::String::New(env, "pressNumLock"), Napi::Function::New(env, PressNumlock));
    exports.Set(Napi::String::New(env, "pressSpace"), Napi::Function::New(env, PressSpace));

    exports.Set(Napi::String::New(env, "pressEnter"), Napi::Function::New(env, PressEnter));
    exports.Set(Napi::String::New(env, "pressEscape"), Napi::Function::New(env, PressEscape));
    exports.Set(Napi::String::New(env, "pressF10"), Napi::Function::New(env, PressF10));
    exports.Set(Napi::String::New(env, "pressF12"), Napi::Function::New(env, PressF12));

    exports.Set(Napi::String::New(env, "pressF1"), Napi::Function::New(env, PressF1));
    exports.Set(Napi::String::New(env, "pressF2"), Napi::Function::New(env, PressF2));
    exports.Set(Napi::String::New(env, "pressF3"), Napi::Function::New(env, PressF3));

    exports.Set(Napi::String::New(env, "holdCtrl"), Napi::Function::New(env, HoldLControl));
    exports.Set(Napi::String::New(env, "holdAlt"), Napi::Function::New(env, HoldLAlt));
    exports.Set(Napi::String::New(env, "releaseCtrl"), Napi::Function::New(env, ReleaseLControl));
    exports.Set(Napi::String::New(env, "releaseAlt"), Napi::Function::New(env, ReleaseLAlt));

    return exports;
};

NODE_API_MODULE(send_keys_native, init);
