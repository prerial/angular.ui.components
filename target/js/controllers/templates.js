angular.module('prerial').run(['$templateCache', function ($templateCache) {
    'use strict';

    $templateCache.put('templates/modal.html',
      "<div class=\"pre-window-wrapper\">" +
      "<div class=\"pre-window\"><button ng-click=\"hide()\" class=\"close pre-icon-close-box\" type=\"button\"></button>" +
      "<div class=\"pre-window-header\"><h3>Modal window</h3></div><div class=\"pre-window-body\"></div>" +
      "<div class=\"pre-window-footer\" ng-click=\"hide()\" style='height:50px'><button class=\"btn apply btn-primary\">OK</button> <button class=\"btn cancel btn-secondary\">Cancel</button></div>" +
      "</div></div>"
    );

    $templateCache.put('templates/modalbody.html',
      "<div style='width:200px;height:60px;margin:20px'>Hello Modal!</div>"
    );

}]);
