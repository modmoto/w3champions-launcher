import store from '../globalState/vuex-store'

export abstract class HotKeyState {
    abstract enterGame(): HotKeyState;
    abstract exitGame(): HotKeyState;
    abstract pressEnter(): HotKeyState;
    abstract pressEscape(): HotKeyState;
    abstract pressF10(): HotKeyState;
    abstract pressF12(): HotKeyState;

    public keysActivated() {
        return this.constructor.name === InGameState.name;
    }

    public toggle(): HotKeyState {
        const volume = 0.5;
        if (!this.keysActivated()) {
            const audio = new Audio('/sound/PeonReady1.mp3');
            audio.currentTime = 0.3;
            audio.volume = volume;
            audio.play();

            console.log("turn on HotKeys manually")
            return new InGameState();
        }

        console.log("turn Off HotKeys manually")
        const audio = new Audio('/sound/PeonDeath.mp3');
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play();
        return new NotInGameState();
    }
}

export class ChatState extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.disbleHotKeys();
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        return new InGameState();
    }

    pressEscape(): HotKeyState {
        return new InGameState();
    }

    pressF10(): HotKeyState {
        return this;
    }

    pressF12(): HotKeyState {
        return this;
    }
}

class MenuState extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.disbleHotKeys();
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        return this;
    }

    pressEscape(): HotKeyState {
        console.log("escape from menu state")
        return new InGameState();
    }

    pressF10(): HotKeyState {
        console.log("f10 from menu state")
        return new InGameState();
    }

    pressF12(): HotKeyState {
        return this;
    }
}

class InChatLogState extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.disbleHotKeys();
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        return new InGameState();
    }

    pressEscape(): HotKeyState {
        return new InGameState();
    }

    pressF10(): HotKeyState {
        return this;
    }

    pressF12(): HotKeyState {
        return new InGameState();
    }
}

export class InGameState extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.enableHotKeys();
    }

    enterGame(): HotKeyState {
        return this;
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        return new ChatState();
    }

    pressEscape(): HotKeyState {
        return this;
    }

    pressF10(): HotKeyState {
        return new MenuState();
    }

    pressF12(): HotKeyState {
        return new InChatLogState();
    }
}

export class NotInGameState extends HotKeyState {
    constructor() {
        super();
        if (store) {
            store.dispatch.hotKeys.disbleHotKeys();
        }
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return this;
    }

    pressEnter(): HotKeyState {
        return this;
    }

    pressEscape(): HotKeyState {
        return this;
    }

    pressF10(): HotKeyState {
        return this;
    }

    pressF12(): HotKeyState {
        return this;
    }
}

