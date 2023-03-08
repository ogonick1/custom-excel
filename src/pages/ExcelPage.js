import { Excel } from '../components/excel/Excel';
import { Formula } from '../components/formula/Formula';
import { Header } from '../components/header/Header';
import { Table } from '../components/table/Table';
import { Toolbar } from '../components/toolbar/Toolbar';
import { createStore } from '../core/createStore';
import { Page } from '../core/Page';
import { debounce, storage } from '../core/utils';
import { rootReducer } from '../redux/rootReducer';
import { normalizeInitialState } from '../redux/initialState';

function storageName(param) {
  return `excel:${param}`;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();

    const state = storage(storageName(params));
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    // eslint-disable-next-line no-shadow
    const stateListener = debounce((state) => {
      console.log('App State: ', state);
      storage(storageName(params), state);
    }, 1000);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
