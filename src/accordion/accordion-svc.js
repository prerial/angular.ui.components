/**
 * Created by Mikhail on 1/31/2016.
 */
(function () {
    'use strict';

    function accordionService() {

        return {

            panes:{},

            addPane: function(pane) {
                this.panes[pane.idx] = pane;
            },

            togglePane: function(idx) {
                var paneIsHidden = this.panes[idx].scope.accordionPaneShow;
                for(var key in this.panes) {
                    if (this.panes.hasOwnProperty(key)) {
                        this.panes[key].scope.accordionPaneShow = false;
                    }
                }
                this.panes[idx].scope.accordionPaneShow = !paneIsHidden;
            }
        };
    }

    angular.module('prerial').factory('accordionService', accordionService);

})();
