(function (angular, _) {
    "use strict";

    angular.module('prerial').service('ContainerService', ContainerService);

    ContainerService.$inject = ['$document'];

    var DATA_KEY = 'pre-container-id',
        POOL_SIZE = 3;

    var $body,
        containerBase = document.createElement('div');

    /**
     * Expands containers pool on demand
     * @param {Array} pool Array of containers
     * @returns {{container: Object, inUse: boolean, id: string, rel: null}}
     */
    function expandPool(pool) {
        var $elem = angular.element(containerBase.cloneNode(false)),
            uid = _.uniqueId('pre-container-'),
            newContainer = {container: $elem, inUse: false, id: uid, rel: null};

        $elem.appendTo($body).data(DATA_KEY, uid);
        pool.push(newContainer);

        return newContainer;
    }

    /**
     * Initializes containers pool
     * @param {Array} pool Array of containers
     */
    function initPool(pool) {
        var i = POOL_SIZE;
        $body = angular.element(document.body);

        /**
         * Pre-populate the pool of containers
         */
        while (i > 0) {
            expandPool(pool);
            i--;
        }
    }

    function ContainerService() {
        /**
         * Holds an array of available containers
         * @type {Array}
         */
        this.containers = [];
    }

    ContainerService.prototype = {
        /**
         * Returns next available container
         * @param {Element|jQuery} [rel] Related element which requests the container
         * Related element can be used to create a temporary relationship between the component which requests a container and
         * a container itself. It can be used to prevent container hiding when clicking over the rel component.
         * @returns {jQuery}
         */
        getContainer: function (rel) {
            /**
             * Pre-populate pool of containers on first use
             */
            if (!this.containers.length) {
                initPool(this.containers);
            }

            var context = _.find(this.containers, {inUse: false});
            if (!context) {
                context = expandPool(this.containers);
            }
            context.inUse = true;
            context.rel = rel;

            return context.container;
        },
        /**
         * Releases container from use and marks it as available
         * Returns element to pristine state by removing event bindings, in-line styles and CSS classes (data preserved)
         * @param {Element} elem DOM element of the container
         * @returns {ContainerService}
         */
        releaseContainer: function (elem) {
            var $elem = angular.element(elem),
                uid = $elem.data(DATA_KEY),
                context = this.getContainerContext(uid);

            if (context) {
                context.inUse = false;
                context.rel = null;
                $elem.removeAttr('style').removeAttr('class').off().empty();
            }
            return this;
        },
        /**
         * Returns an array of all containers currently in-use
         * @param {Element|jQuery} [rel] Related element used to obtain active container only related to the given object
         * @returns {Array} Array of containers
         */
        getActiveContainers: function (rel) {
            var filter = {inUse: true};
            if (rel !== undefined) {
                filter.rel = rel;
            }

            return _.chain(this.containers).filter(filter).map(function (n) {
                return n.container;
            }).valueOf();
        },
        /**
         * Return container context object by container id
         * @param {string|Element|jQuery} id Unique container id or element.
         * @returns {Object}
         */
        getContainerContext: function (id) {
            var context, uid;
            if (_.isString(id)) {
                context = _.find(this.containers, {id: id});
            } else {
                uid = angular.element(id).data(DATA_KEY);
                context = uid ? _.find(this.containers, {id: uid}) : undefined;
            }
            return context;
        },
        /**
         * Releases all containers
         * @returns {ContainerService}
         */
        releaseAll: function () {
            var me = this, active = this.getActiveContainers();
            _.each(active, function (container) {
                me.releaseContainer(container);
            });
            return this;
        }
    };

}(angular, _));