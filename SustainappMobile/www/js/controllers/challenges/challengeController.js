/**
 * Controller pour l'affichage d'un challenge
 * @author Anas Neumann <anas.neumann.isamm@gmail.com>
 * @since 19/03/2017
 * @version 1.0
 */
angular.module('sustainapp.controllers')
.controller('challengeController', function($scope, $stateParams, $ionicModal, $state, $ionicPopover, sessionService, fileService, challengeService, participationService) {

	/**
	 * Entrée dans la page
	 */
	$scope.$on('$ionicView.beforeEnter', function() {
			loadChallenge();
        });
	
	/**
	 * Fonction de chargement de toutes les informations sur le challenge
	 */
	var loadChallenge = function(){
		$scope.challengeModel = {};
		$scope.challengeModel.loaded = false;
		$scope.title = "...";
		
		$scope.challengeModel.emptyFile = true;
		$scope.challengeModel.edit = false;
		$scope.challengeModel.iconEdit = false;
		$scope.challengeModel.file  = null;
		
		$scope.challengeModel.emptyParticipationFile = true;
		$scope.challengeModel.editParticipationFile = false;
		$scope.challengeModel.participationFile = null;
		$scope.challengeModel.displayParticipationFile = null;
		$scope.challengeModel.selectedProfile = {};
		$scope.challengeModel.allProfiles = [];
		$scope.challengeModel.participation = {};
		$scope.challengeModel.participation.title = "";
		$scope.challengeModel.participation.about = "";
		
		$scope.challengeModel.allErrors = [];	
		challengeService.getById($stateParams.id, sessionService.get('id')).then(function(response){
			var result = response.data;
			if(result.code == 1) {
				$scope.challengeModel.loaded = true;
				$scope.title = result.challenge.name;
				$scope.challengeModel.challenge = result.challenge;
				$scope.challengeModel.name = result.challenge.name;
				$scope.challengeModel.about = result.challenge.about;
				$scope.challengeModel.owner = result.owner;
				$scope.challengeModel.currentVote = result.currentVote;
				$scope.challengeModel.allProfiles = result.lightProfiles;
				$scope.challengeModel.selectedProfile = result.lightProfiles[0];
				$scope.challengeModel.isOpen = result.isOpen;
				$scope.challengeModel.isAdmin = result.isAdmin;
				$scope.challengeModel.participations = result.participations;
				$scope.challengeModel.displayIcon = "img/challenge/default.png";
				if(null != result.challenge.icon){
					$scope.challengeModel.displayIcon = "data:image/jpeg;base64,"+ result.challenge.icon;
				}
				$ionicPopover.fromTemplateUrl('templates/challenges/popover-profiles.html', {
				    scope: $scope
				  }).then(function(popover) {
				    $scope.popoverProfiles = popover;
				  });
			}
		});
	};
	
	/**
	 * Modification des informations du challenge
	 */
	$scope.updateChallenge = function(){
		var data = new FormData();
		data.append("name", $scope.challengeModel.name);
		data.append("about", $scope.challengeModel.about);
		data.append("challenge", $scope.challengeModel.challenge.id);
		data.append("sessionId", sessionService.get('id'));
		data.append("sessionToken", sessionService.get('token'));
		challengeService.update(data).success(function(result) {
			if(result.code == 1){
				$scope.challengeModel.allErrors = [];	
				$scope.challengeModel.challenge.name = $scope.challengeModel.name;
				$scope.challengeModel.challenge.about = $scope.challengeModel.about;
				$scope.challengeModel.edit = false;
				$scope.challengeModel.iconEdit = false;
	    	} else {
	    		$scope.challengeModel.allErrors = result.errors;
	    	}
	    });
	}
	
	/**
	 * Modification de l'icon d'un challenge
	 */
	$scope.icon = function(newFile){
		fileService.getFile(newFile, 100, 600, 600).then(function(imageData) {			
			var data = new FormData();
			data.append("file", imageData);
			data.append("challenge", $scope.challengeModel.challenge.id);
			data.append("sessionId", sessionService.get('id'));
			data.append("sessionToken", sessionService.get('token'));
			challengeService.icon(data).success(function(result) {
				if(result.code == 1){
					$scope.challengeModel.file = imageData;
					$scope.challengeModel.displayIcon = "data:image/jpeg;base64,"+imageData;
					$scope.challengeModel.iconEdit = false;
		    	}
		    });
		 }, function(err) {
		 });
	};
	
	/**
	 * Modification de l'image d'une nouvelle participation
	 */
	$scope.chooseParticipationFile = function(newFile){
		fileService.getFile(newFile, 100, 700, 300).then(function(imageData) {			
			$scope.challengeModel.participationFile = imageData;
			$scope.challengeModel.displayParticipationFile = "data:image/jpeg;base64,"+imageData;
			$scope.challengeModel.emptyParticipationFile = false;
			$scope.challengeModel.editParticipationFile = false;
		 }, function(err) {
		 });
	}
	
   /**
    * Modal de confirmation de la suppression d'un challenge
    */
   $ionicModal.fromTemplateUrl('templates/common/modalDelete.html', {
	     scope: $scope
	   }).then(function(modal) {
	     $scope.modal = modal;
	   });
   
   /**
    * Modal de particiaption
    */
   $ionicModal.fromTemplateUrl('templates/challenges/participateModal.html', {
	     scope: $scope
	   }).then(function(modal) {
	     $scope.participateModal = modal;
	   });
   
   
    /**
	 * Suppression définitive d'un chalenge
	 */
	$scope.confirmDelete = function(){
		$scope.modal.hide();
		var data = new FormData();
		data.append("challenge", $scope.challengeModel.challenge.id);
		data.append("sessionId", sessionService.get('id'));
		data.append("sessionToken", sessionService.get('token'));
		challengeService.deleteById(data).success(function(result) {
			if(result.code == 1){
				$state.go('tab.challenges');
	    	}
	    });
		return;
	};
	
	/**
	 * fonction d'ouverture du menu de choix du profile ou de la team
	 */
	$scope.openProfiles = function($event){
		$scope.popoverProfiles.show($event);
	}
	
	/**
	 * fonction de changement du choix du profile ou de la team
	 */
	$scope.changeProfiles = function(profile){
		$scope.popoverProfiles.hide();
		$scope.challengeModel.selectedProfile = profile
	}
	
	/**
	 * fix freeze screen
	 */
	$scope.$on('modal.hidden', function() {
		$scope.popoverProfiles.hide();
	});
	
	/**
	 * Ajout d'une participation
	 */
	$scope.participate = function(){
		var data = new FormData();
		data.append("challenge", $scope.challengeModel.challenge.id);
		data.append("title", $scope.challengeModel.participation.title);
		data.append("about", $scope.challengeModel.participation.about);
		data.append("targetType", $scope.challengeModel.selectedProfile.type);
		data.append("targetId", $scope.challengeModel.selectedProfile.id);
		data.append("sessionId", sessionService.get('id'));
		data.append("sessionToken", sessionService.get('token'));
		if(null != $scope.challengeModel.participationFile) {
			data.append("file", $scope.challengeModel.participationFile);
		}
		participationService.create(data).success(function(result) {
			if(result.code == 1){				
				$scope.challengeModel.allErrors = [];
				var participation = {
						"participation" : {
							"title" : $scope.challengeModel.participation.title,
							"about" : $scope.challengeModel.participation.about,
							"document" : $scope.challengeModel.participation.participationFile,
							"timestamps" : "now"
						},
						"isOwner" : true,
						"alreadyVoted" : false,
						"owner" : $scope.challengeModel.selectedProfile
				};
				$scope.challengeModel.participations.push(participation);
				$scope.participateModal.hide();
				$scope.challengeModel.emptyParticipationFile = true;
				$scope.challengeModel.editParticipationFile = false;
				$scope.challengeModel.participationFile = null;
				$scope.challengeModel.displayParticipationFile = null;
				$scope.challengeModel.participation.title = "";
				$scope.challengeModel.participation.about = "";
	    	} else {
	    		$scope.challengeModel.allErrors = result.errors;
	    	}
	    });
		return;
	}
	
	/**
	 * Ajout d'un vote
	 */
	$scope.vote = function(elt){
		var data = new FormData();
		data.append("participation", elt.participation.id);
		data.append("sessionId", sessionService.get('id'));
		data.append("sessionToken", sessionService.get('token'));
		participationService.vote(data).success(function(result) {
			if(result.code == 1){			
				if(elt.participation.id != $scope.challengeModel.currentVote){
					angular.forEach($scope.challengeModel.participations, function(value, key) {
						  if(value.participation.id == $scope.challengeModel.currentVote){
							  value.nbrVotes-=1;
						  }
						});
					$scope.challengeModel.currentVote =  elt.participation.id;
					elt.nbrVotes +=1;
				} else {
					$scope.challengeModel.currentVote = null;
					elt.nbrVotes -=1;
				}
			}
		});
		return;
	}
	
	/**
	 * Suppression d'une participation
	 */
	$scope.deleteParticipation = function(participation){
		
	}
	
	/**
	 * Visualisation de tout les votes d'une participation
	 */
	$scope.getVotes = function(participation){
		
	}
	
});