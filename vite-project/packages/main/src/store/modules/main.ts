import { defineStore } from 'pinia';
import { store } from '@/store';

import { rand, deepCopy, debounce } from '@/utils';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    mainList: [],
    activeId: '',
  }),
  getters: {
    getMainList() {
      return this.mainList;
    },
    getActiveId() {
      return this.activeId;
    },
    getActiveStyle() {
      let comp = this.mainList.find((t) => t.id == this.activeId);
      return comp.style ? comp.style : {};
    },
  },
  actions: {
    setMainList(list) {
      this.mainList = list;
    },
    setActiveId(id) {
      this.activeId = id;
    },
    addMainListItem(item) {
      const id = rand(10000, 99999);
      this.mainList.push({
        id,
        ...deepCopy(item),
      });
    },
    setStyleConfig(config) {
      let index = this.mainList.findIndex((t) => t.id === this.activeId);
      if (index > -1) {
        this.mainList[index].style = config;
      }
    },
  },
});
