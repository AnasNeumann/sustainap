/**
 * Fichier principal de routing de l'application
 * @author Anas Neumann <anas.neumann.isamm@gmail.com>
 * @since 01/02/2017
 * @version 1.0
 */
angular.module('sustainapp', ['ionic', 'sustainapp.controllers', 'sustainapp.services', 'sustainapp.constantes', 'ngCordova', 'pascalprecht.translate', 'ngSanitize', 'ionic.rating', 'ngDraggable', 'ngStomp', 'chart.js'])

/**
 * DEMARAGE DE SUSTAINAPP
 */
.run(function($ionicPlatform, $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(false);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(null != window.plugin){ // uniquement sur mobile => Gestion des notifications locales
	    window.plugin.notification.local.onadd = function (id, state, json) {
	        var notification = {
	            id: id,
	            state: state,
	            json: json
	        };
	        $timeout(function() {
	            $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
	        });
	    };
    }
  });
})

/**
 * ROUTING DE SUSTAINAPP
 */
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider, $sceDelegateProvider, $cordovaInAppBrowserProvider, $httpProvider) {
  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/common/tabs.html'
  })
  .state('tab.administration', {
    url: '/administration/menu',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/menu.html',
        controller: 'administrationController'
      }
    }
  })
  .state('tab.administration-reports', {
    url: '/administration/reports',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/reports.html',
        controller: 'reportsController'
      }
    }
  })
  .state('tab.administration-courses', {
    url: '/administration/courses',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/courses.html',
        controller: 'coursesDataController'
      }
    }
  })
  .state('tab.administration-challenges', {
    url: '/administration/challenges',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/challenges.html',
        controller: 'challengesDataController'
      }
    }
  })
  .state('tab.administration-research', {
    url: '/administration/research',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/research.html',
        controller: 'researchDataController'
      }
    }
  })
  .state('tab.administration-profiles', {
    url: '/administration/profiles',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/profiles.html',
        controller: 'profilesDataController'
      }
    }
  })
  .state('tab.administration-admins', {
    url: '/administration/admins',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/admins.html',
        controller: 'adminsController'
      }
    }
  })
  .state('tab.administration-cities', {
    url: '/administration/cities',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/cities.html',
        controller: 'citiesController'
      }
    }
  })
  .state('tab.administration-cities-dada', {
    url: '/administration/citiesdata',
    views: {
      'tab-news': {
        templateUrl: 'templates/administration/cities-data.html',
        controller: 'citiesDataController'
      }
    }
  })
  .state('tab.teams', {
    url: '/team/all',
    views: {
      'tab-news': {
        templateUrl: 'templates/teams/teams-main.html',
        controller: 'teamsController'
      }
    }
  })
  .state('tab.team-one', {
    url: '/team/:id',
    views: {
      'tab-news': {
        templateUrl: 'templates/teams/team-one.html',
        controller: 'teamController'
      }
    }
  })
  .state('tab.profile', {
    url: '/profile/:id',
    views: {
      'tab-news': {
        templateUrl: 'templates/profile/profile-main.html',
        controller: 'profileController'
      }
    }
  })
  .state('tab.report', {
    url: '/report',
    views: {
      'tab-news': {
        templateUrl: 'templates/reports/report-main.html',
        controller: 'reportController'
      }
    }
  })
  .state('tab.news', {
    url: '/news',
    views: {
      'tab-news': {
        templateUrl: 'templates/news/news-main.html',
        controller: 'newsController'
      }
    }
  })
  .state('tab.challenges', {
      url: '/challenges',
      views: {
        'tab-challenges': {
          templateUrl: 'templates/challenges/challenges-main.html',
          controller: 'challengesController'
        }
      }
    })
    .state('tab.challenge-one', {
      url: '/challenges/:id',
      views: {
        'tab-challenges': {
          templateUrl: 'templates/challenges/challenge-one.html',
          controller: 'challengeController'
        }
      }
    })
    .state('tab.certificates', {
	  url: '/certificates',
	  views: {
	    'tab-certificates': {
	      templateUrl: 'templates/certificates/certificates-main.html',
	      controller: 'certificatesController'
	    }
	  }
    })
    .state('tab.cours-one', {
	  url: '/cours/:id',
	  views: {
	    'tab-certificates': {
	      templateUrl: 'templates/certificates/cours-one.html',
	      controller: 'coursController'
	    }
	  }
    })
    .state('tab.topic-one', {
	  url: '/topic/:id',
	  views: {
	    'tab-certificates': {
	      templateUrl: 'templates/certificates/topic-one.html',
	      controller: 'topicController'
	    }
	  }
    })
    .state('tab.questions', {
	  url: '/questions/:id',
	  views: {
	    'tab-certificates': {
	      templateUrl: 'templates/certificates/questions-main.html',
	      controller: 'questionsController'
	    }
	  }
    })
    .state('tab.question', {
	  url: '/question/:id',
	  views: {
	    'tab-certificates': {
	      templateUrl: 'templates/certificates/question-one.html',
	      controller: 'questionController'
	    }
	  }
    })
    .state('tab.quiz', {
	  url: '/quiz/:id',
	  views: {
	    'tab-certificates': {
	      templateUrl: 'templates/quiz/quiz-one.html',
	      controller: 'quizController'
	    }
	  }
    })
    .state('tab.notifications', {
	  url: '/notifications',
	  views: {
	    'tab-notifications': {
	      templateUrl: 'templates/notifications/notifications-main.html',
	      controller: 'notificationsController'
	    }
	  }
    })
    .state('tab.map', {
  	  url: '/map',
  	  views: {
  	    'tab-news': {
  	      templateUrl: 'templates/cities/map.html',
  	      controller: 'mapController'
  	    }
  	  }
    })
    .state('tab.place', {
  	  url: '/place/:id',
  	  views: {
  	    'tab-news': {
  	      templateUrl: 'templates/cities/place.html',
  	      controller: 'placeController'
  	    }
  	  }
    })
    .state('tab.city', {
  	  url: '/city/:id',
  	  views: {
  	    'tab-news': {
  	      templateUrl: 'templates/cities/city.html',
  	      controller: 'cityController'
  	    }
  	  }
    });
  $urlRouterProvider.otherwise('/tab/news');


  /**
   * Préférence pour le scroll native
   */
   if (!ionic.Platform.isIOS()) {
	   $ionicConfigProvider.scrolling.jsScrolling(false);
   }

   /**
	* Autoriser les urls provenant de ces sites web
	*/
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'https://www.youtube.com/embed/**',
		'https://maps.google.com/**',
		"https://www.cirrelt.ca/**",
		"https://www.ulaval.ca/**",
		"http://legisquebec.gouv.qc.ca/**",
		"https://www.uprodit.com/**",
		"https://play.google.com/**",
		"http://sustainapp.cirrelt.ca/**",
		"https://sustainapp.cirrelt.ca/**",
		"http://localhost:8100/**",
		"http://127.0.0.1:8100/**"
	]);


	/**
	 * Blacklister les urls provenants de ces sites web
	 */
	$sceDelegateProvider.resourceUrlBlacklist([
	]);

	/**
	 * Permettre l'ouverture de liens externe
	 */
	 var defaultOptions = {
		    location: 'no',
		    clearcache: 'no',
		    toolbar: 'no'
		  };
	 document.addEventListener("deviceready", function () {
		    $cordovaInAppBrowserProvider.setDefaultOptions(options)
     }, false);

  /**
   * SYSTEME DE TRADUCTION
   */
  $translateProvider.useStaticFilesLoader({prefix: 'i18n/', suffix: '.json'});
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
  $translateProvider.registerAvailableLanguageKeys(['en','fr'], {'en_US': 'en', 'en_UK': 'en', 'fr_FR': 'fr', 'fr_BE': 'fr'})
  .determinePreferredLanguage();
  $translateProvider.use();
});

/**
 * DIRECTIVES
 */
angular.module('sustainapp.directives', []);

/**
 * CONSTANTES
 */
angular.module('sustainapp.constantes', []);

/**
 * CONTROLLERS
 */
angular.module('sustainapp.controllers', []);

/**
 * SERVICES
 */
angular.module('sustainapp.services', []);

