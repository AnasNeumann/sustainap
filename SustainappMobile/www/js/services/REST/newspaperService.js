/**
 * WS pour la reception du journal d'actualités
 * @author Anas Neumann <anas.neumann.isamm@gmail.com>
 * @since 28/04/2017
 * @version 1.0
 */
angular.module('sustainapp.services')
 .factory('newspaperService', function($http, config) {
	 return {
		getNews : function() {
			return $http.get(config.remoteServer+"/newspaper");
		}
	};
});