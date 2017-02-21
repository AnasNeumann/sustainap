/**
 * Controller for teams managments
 * @author Anas Neumann <anas.neumann.isamm@gmail.com>
 * @since 17/02/2017
 * @version 1.0
 */
angular.module('sustainapp.controllers')
.controller('teamController', function($scope, $stateParams, teamService, sessionService, teamRole, fileService) {
	
	/**
	 * Entrée dans la page
	 */
	$scope.$on('$ionicView.beforeEnter', function() {
			loadTeam();
        });
	
	/**
	 * Chargement des informations sur la team
	 */
	var loadTeam = function(){
		$scope.teamModel = {};
		$scope.teamModel.loaded = false;
		$scope.teamModel.edit = false;
		$scope.teamModel.displayAvatar = "img/common/defaultAvatarMin.png";
		$scope.teamModel.avatarEdit = false;
		$scope.teamModel.file  = null;
		$scope.teamModel.allErrors = [];	
		teamService.getById($stateParams.id, sessionService.get('id')).then(function(response){
			var result = response.data;
			if(result.code == 1) {
				$scope.teamModel.loaded = true;
				$scope.teamModel.team  = result.team;
				$scope.teamModel.owner  = result.owner;
				$scope.teamModel.members  = result.members;
				$scope.teamModel.requests  = result.requests;
				$scope.teamModel.participations = result.participations;
				$scope.teamModel.role = result.role;
				$scope.teamModel.name = result.team.name;
				if(null != result.team.avatar){
					$scope.teamModel.displayAvatar = "data:image/jpeg;base64,"+ result.team.avatar;
				}
	   		}
    	});
	};
	
	/**
	 * Modification du nom d'une équipe
	 */
	$scope.updateTeam = function(){
    	var data = new FormData();
		data.append("name", $scope.teamModel.name);
		data.append("team", $scope.teamModel.team.id);
		data.append("sessionId", sessionService.get('id'));
		data.append("sessionToken", sessionService.get('token'));
		teamService.update(data).success(function(result) {
			if(result.code == 1){
				$scope.teamModel.allErrors = [];	
				$scope.teamModel.team.name = $scope.teamModel.name;
				$scope.teamModel.edit = false;
				$scope.teamModel.avatarEdit = false;
	    	} else {
	    		$scope.teamModel.allErrors = result.errors;
	    	}
	    });
	}
	
	/**
	 * Modification de l'avatar d'une équipe
	 */
	$scope.avatar = function(newFile){
		fileService.getFile(newFile, 100, 600, 600).then(function(imageData) {			
			var data = new FormData();
			data.append("file", imageData);
			data.append("team", $scope.teamModel.team.id);
			data.append("sessionId", sessionService.get('id'));
			data.append("sessionToken", sessionService.get('token'));
			teamService.avatar(data).success(function(result) {
				if(result.code == 1){
					$scope.teamModel.file = imageData;
					$scope.teamModel.displayAvatar = "data:image/jpeg;base64,"+imageData;
					$scope.teamModel.avatarEdit = false;
		    	}
		    });
		 }, function(err) {
		 });		
	}
	
});
