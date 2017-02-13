/**
 * Fichier contenant toutes les constantes du projet
 * @author Anas Neumann <anas.neumann.isamm@gmail.com>
 * @since 01/02/2017
 * @version 1.0
 */
angular.module('sustainapp.constantes')
	.constant('config', {
	    remoteServer : 'http://192.168.43.195:8085',
	    localServer : 'http://127.0.0.1:8085'
	})
	.value('session', {});