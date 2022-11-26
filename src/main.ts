import store from './globalState/vuex-store'
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import {ELauncherMessageType, IIngameBridgeEvent, ingameBridge} from "@/game/ingame-bridge";
import { floWorkerService } from './flo-integration/flo-worker.service';
import { IDownloadMapData } from './game/game.types';
import type { IEndpoint } from './background-thread/endpoint/endpoint.service';

const { ipcRenderer } = window.require('electron');

Vue.config.productionTip = false

new Vue({
  store: store.original,
  router,
  render: h => h(App),
}).$mount('#app')

ipcRenderer.on("w3c-endpoint-selected", async (_: unknown, endpoint: IEndpoint) => {
  await store.dispatch.init(endpoint)
  ingameBridge.initialize();
  floWorkerService.initialize();
})

ingameBridge.on(ELauncherMessageType.MAP_DOWNLOAD, async (event: IIngameBridgeEvent) => {
  const eventData = event.data as IDownloadMapData;
  const pi = event.playerInstance;
  const progressFunc = (progressPercent: number) => {
      ingameBridge.sendMapDownloadProgress(pi, eventData, progressPercent);
  };

  const isSuccess = await store.getters.fileService.downloadMap(eventData.mapFile, eventData.basePath, progressFunc);

  if (isSuccess) {
      setTimeout(() => {
          ingameBridge.sendMapDownloadComplete(pi, eventData);
      }, 1000);
  }
  else {
      ingameBridge.sendMapDownloadFailed(pi, eventData);
  }
});