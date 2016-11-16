const CLASS_URL = "https://class-server.herokuapp.com/collections/barry_contact_homework"

function ContactController($scope, $http){

	function init(){
		$http.get(CLASS_URL).then(function(response){
      		$scope.contacts = response.data;
	      	console.log($scope.contacts);
			$scope.error = {};
			$scope.error.name = "Name cannot be left empty!  Fool!"
			$scope.error.email = "Email cannot be left empty!  Fool!"
			$scope.error.website = "Website cannot be left empty!  Fool!";
			$scope.error.text = "Speak up, fool!  Message cannot be left empty!";
			$scope.formInfo ={};
			$scope.click = false;
			$scope.class = {};
			$scope.class.submit = "is-danger";
    	});

	}

	init ();


	$scope.totalCheck = function (error){
		if (!error.name && !error.email && !error.website && !error.text){
			$scope.click = true;
			$scope.class.submit = "is-success";
			
		} else {
			$scope.click =false;
			$scope.class.submit = "is-danger";
		}
	}


	$scope.addContact = function(form){
		if ($scope.click){
			$http.post(CLASS_URL, form).then(function(response){
				$scope.contacts.push(response.data);
				console.log(response.data)});
				init();
		}
	};

	$scope.delete = function (contact) {
		$http.delete(CLASS_URL + "/" + contact._id).then(function (response) {
			$scope.contacts = $scope.contacts.filter(function(element){
				return element._id !== contact._id;
			});
		});

		init();
	};

	$scope.validName = function(name){
		if (name === ""){
			$scope.error.name = "Name cannot be left empty!  Fool!";
			$scope.class.name = [];

		} else {
			$scope.error.name =null;
			$scope.class.name = ["input-pass"];

		}
		$scope.totalCheck($scope.error);

	}
	$scope.validEmail = function(email){
		if (email){
			if (!email.includes("@")){
				$scope.error.email = "Where your head at?  You must have an @!";
				$scope.class.email = [];
			} else {
				$scope.error.email =null;
				$scope.class.email = ["input-pass"];
			}
		} else {
			$scope.error.email = "Email cannot be left empty!  Fool!";
			$scope.class.email = [];
		}
		$scope.totalCheck($scope.error);
	}
	$scope.validWebsite = function(website){	
		if (website){
			website = website.toLowerCase();
			if (!(website.startsWith("http://") || (website.startsWith("https://")))){
				$scope.error.website = "Mr. T says you need some Http://";
				$scope.class.website = [];
			} else {
				$scope.error.website =null;
				$scope.class.website = ["input-pass"];
			}
		} else {
			$scope.error.website = "Website cannot be left empty!  Fool!";
			$scope.class.website = [];
		}
		$scope.totalCheck($scope.error);
	}

	$scope.validText = function(text){
		if (text === ""){
			$scope.error.text = "Speak up, fool!  Message cannot be left empty!";
			$scope.class.email = [];
		} else {
			$scope.error.text =null;
			$scope.class.text = ["input-pass"];
		}
		$scope.totalCheck($scope.error);
	}

}

ContactController.$inject = ['$scope', '$http'];
export { ContactController };