import { createApp, defineCustomElement } from 'vue';
import './style.css';
import App from './App.vue';
import { i18n } from './i18n/i18n';
import I18nHost from './i18n/I18nHost.vue';
import Counter from './components/metrics-counter/MetricsCounter.ce.vue';
import Display from './components/metrics-display/MetricsDisplay.ce.vue';

const I18nHostElement = defineCustomElement(I18nHost);
const CounterElement = defineCustomElement(Counter);
const DisplayElement = defineCustomElement(Display);
customElements.define('m-i18n-host', I18nHostElement);
customElements.define('m-counter', CounterElement);
customElements.define('m-display', DisplayElement);

createApp(App).use(i18n).mount('#app');
