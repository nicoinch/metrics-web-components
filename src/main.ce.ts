import { defineCustomElement } from 'vue';
import './style.css';
import I18nHost from './i18n/I18nHost.vue';
import MetricsCounter from './components/metrics-counter/MetricsCounter.ce.vue';
import DisplayMetrics from './components/metrics-display/MetricsDisplay.ce.vue';
import ControlPane from './components/control-pane/ControlPane.ce.vue';
import LocalePicker from './components/locale-picker/LocalePicker.ce.vue';
import DarkModeSwitcher from './components/dark-mode-switcher/DarkModeSwitcher.ce.vue';

const I18nHostElement = defineCustomElement(I18nHost);
customElements.define('wc-i18n-host', I18nHostElement);
const MetricsCounterElement = defineCustomElement(MetricsCounter);
customElements.define('wc-metrics-counter', MetricsCounterElement);
const DisplayMetricsElement = defineCustomElement(DisplayMetrics);
customElements.define('wc-display-metrics', DisplayMetricsElement);
const ControlPaneElement = defineCustomElement(ControlPane);
customElements.define('wc-control-pane', ControlPaneElement);
const LocalePickerElement = defineCustomElement(LocalePicker);
customElements.define('wc-locale-picker', LocalePickerElement);
const DarkModeSwitcherElement = defineCustomElement(DarkModeSwitcher);
customElements.define('wc-dark-mode-switcher', DarkModeSwitcherElement);

declare module 'vue' {
    export interface GlobalComponents {
        I18nHostElement: typeof I18nHostElement;
        MetricsCounterElement: typeof MetricsCounterElement;
        DisplayMetricsElement: typeof DisplayMetricsElement;
        ControlPaneElement: typeof ControlPaneElement;
        LocalePickerElement: typeof LocalePickerElement;
        DarkModeSwitcherElement: typeof DarkModeSwitcherElement;
    }
}
