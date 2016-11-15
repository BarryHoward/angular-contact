import angular from 'angular';

import { ContactController } from './controllers/contact.js';

angular
  .module('app', [])
  .controller('ContactController', ContactController);