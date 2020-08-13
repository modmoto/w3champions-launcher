import {LauncherStrategy} from "@/update-handling/LauncherStrategy";

const { exec, execSync, spawn } = window.require("child_process");
const fs = window.require("fs");
const { remote } = window.require("electron");

export class WindowsLauncher extends LauncherStrategy {
    turnOnLocalFiles(): void {
        exec("reg add \"HKEY_CURRENT_USER\\Software\\Blizzard Entertainment\\Warcraft III\" /v \"Allow Local Files\" /t REG_DWORD /d 1 /f", function(err: Error) {
            if (err) {
                throw err;
            }
        });
    }

    getDefaultPathWc3(): string {
        if (fs.existsSync("C:/Program Files (x86)/Warcraft III/_retail_")) {
            return "C:/Program Files (x86)/Warcraft III/_retail_";
        }
        return "C:/Program Files (x86)/Warcraft III";
    }

    getDefaultPathMap(): string {
        const documentPath = remote.app.getPath("documents");
        if (fs.existsSync(`${documentPath}/Warcraft III/_retail_`)
            && !fs.existsSync(`${documentPath}/Warcraft III/_retail_/Maps`)) {
            fs.mkdirSync(`${documentPath}/Warcraft III/_retail_/Maps`);
        } else if (fs.existsSync(`${documentPath}/Warcraft III`)
            && !fs.existsSync(`${documentPath}/Warcraft III/Maps`)) {
            fs.mkdirSync(`${documentPath}/Warcraft III/Maps`);
        }

        return fs.existsSync(`${documentPath}/Warcraft III/_retail_/Maps`)
            ? `${documentPath}/Warcraft III/_retail_/Maps`
            : `${documentPath}/Warcraft III/Maps`;
    }

    getDefaultBnetPath(): string {
        return "C:/Program Files (x86)/Battle.net";
    }

    startWc3Process(bnetPath: string): void {
        const runningProcesses = execSync("tasklist /FI \"STATUS eq RUNNING").toString();
        const indexOf = runningProcesses.indexOf("Battle.net.exe");
        if (indexOf === -1) {
            console.log("starting bnet before w3c")
            exec(`"${bnetPath}/Battle.net.exe"`)
            setTimeout(() => this.spawnW3Process(bnetPath), 10000);
        } else {
            this.spawnW3Process(bnetPath);
        }
    }

    private spawnW3Process(bnetPath: string) {
        const bnetPathWithExe = `${bnetPath}/Battle.net.exe`;
        const ls = spawn(bnetPathWithExe, ['--exec="launch W3"'], {
            detached: true,
            windowsVerbatimArguments: true,
            stdio: 'ignore',
        });
        ls.unref();
    }

    getCopyCommand(from: string, to: string) {
        return `Xcopy "${from}" "${to}" /E /I`
    }
}
