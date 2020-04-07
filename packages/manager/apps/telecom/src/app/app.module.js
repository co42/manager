/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved, import/extensions */
import 'babel-polyfill';
import 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-ui-bootstrap';
import 'angular-ui-validate';
import 'angular-cookies';
import 'script-loader!angular-dynamic-locale/dist/tmhDynamicLocale.min.js';
import 'angular-flash-alert';
import 'angular-inview';
import 'angular-messages';
import 'angular-password';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-translate';
import 'angular-translate-loader-partial';
import 'angular-translate-storage-cookie';
import 'angular-translate-storage-local';
import 'script-loader!moment/min/moment.min.js';
import 'script-loader!fullcalendar/dist/fullcalendar.js';
import 'angular-ui-calendar';
import 'script-loader!ui-select/dist/select.js';
import 'script-loader!jquery-ui/ui/version.js';
import 'script-loader!jquery-ui/ui/plugin.js';
import 'script-loader!jquery-ui/ui/widget.js';
import 'script-loader!jquery-ui/ui/data.js';
import 'script-loader!jquery-ui/ui/scroll-parent.js';
import 'script-loader!jquery-ui/ui/safe-active-element.js';
import 'script-loader!jquery-ui/ui/safe-blur.js';
import 'script-loader!jquery-ui/ui/widgets/mouse.js';
import 'script-loader!jquery-ui/ui/widgets/sortable.js';
import 'script-loader!jquery-ui/ui/widgets/draggable.js';
import 'angular-ui-sortable';
import 'script-loader!@bower_components/angular-ui-utils/ui-utils.js';
import 'angular-validation-match';
import 'bootstrap';
import 'script-loader!CSV-JS/csv.js';
import 'script-loader!d3/build/d3.js';
import 'script-loader!jquery.cookie/jquery.cookie.js';
import 'matchmedia-polyfill';
import 'matchmedia-ng';
import 'script-loader!messenger/build/js/messenger.js';
import 'script-loader!messenger/build/js/messenger-theme-future.js';
import 'script-loader!messenger/build/js/messenger-theme-flat.js';
import 'ng-csv';
import 'script-loader!ngSmoothScroll/angular-smooth-scroll.js';
import 'script-loader!intl-tel-input/build/js/intlTelInput.min.js';
import 'script-loader!intl-tel-input/lib/libphonenumber/build/utils.js';
import 'script-loader!international-phone-number/releases/international-phone-number.js';
import 'ovh-api-services';
import 'script-loader!jquery.scrollto';
import '@ovh-ux/ng-ovh-contracts';
import 'script-loader!urijs/src/URI.min.js';
import 'script-loader!urijs/src/URITemplate.js';
import 'script-loader!leaflet/dist/leaflet-src.js';
import 'angular-leaflet-directive';
import 'ovh-angular-responsive-tabs';
import 'ng-slide-down';
import 'script-loader!angularjs-scroll-glue/src/scrollglue.js';
import 'ovh-angular-timeline/dist/ovh-angular-timeline.js';
import 'ovh-angular-ui-confirm-modal';
import 'ovh-ng-input-password';
import 'ovh-ui-angular';
import 'angular-translate-loader-pluggable';
import '@ovh-ux/manager-telecom-styles';
import 'script-loader!bootstrap-tour/build/js/bootstrap-tour-standalone.min.js';
/* eslint-enable */

import 'bootstrap-tour/build/css/bootstrap-tour.min.css';

import moduleName from './app';

import './telecom/telecom.constant';
import './telecom/telecom';
import '../components/components.bundle';
import './config/all';

export default moduleName;
