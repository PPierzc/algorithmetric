var selected = 'Architekt';
var project = 'null';
var user = false;
var data_passed = {
	'likes':[],
	'posts':[],
	'project':'Null',
	'age':{},
	'education':[],
	'work':[],
	'about':'Null',
	'personality':selected
};

function getSelected(selection){
			window.selected = selection.options[selection.selectedIndex].text
			alert(window.selected);
		}

		function addHTML(){
			var dummy = '<form id="dummy" onsubmit="return false;">Nazwa twojego projektu <input class="dummy" type="text" name="project" id="dummy_input"><br /><br /></form>'
			if(document.getElementById('zwzt').checked){
				document.getElementById('wrapper').innerHTML += dummy
				window.user = true;
			}
			else{
				var element = document.getElementById('dummy')
				element.parentNode.removeChild(element)
				window.user = false;
			}
		}

		function enableButton(){
			var enabled = '<a id="submit" class="btn btn-outline btn-xl" onclick="postItems()">Wyślij Dane</a>'
			var disabled = '<a id="submit" alt="Wyraź zgodę na przetwarzanie danych" class="btn btn-outline btn-xl disabled">Wyślij Dane</a>'
			if(document.getElementById('agree').checked){
				var element = document.getElementById('submit')
				element.parentNode.removeChild(element)
				document.getElementById('submit-button').innerHTML += enabled
				window.user = true
			}
			else{
				var element = document.getElementById('submit')
				element.parentNode.removeChild(element)
				document.getElementById('submit-button').innerHTML += disabled
				window.user = false
			}
		}


		window.fbAsyncInit = function() {
			FB.init({
				appId: '987623197972591',
				cookie: true,
				xfbml: true,
				version: 'v2.8'
			});
			FB.AppEvents.logPageView();
		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		function myFacebookLogin() {
			FB.login(function(){
			  	FB.api('/me/feed', 'get');

			  	FB.api('/me/posts?limit=100',
				'GET',
				{"limit":"100"},
				 function(response){
				 	var posts_array = response['data']
				 	var l_length = posts_array.length
				 	console.log(l_length)
				 	//for (var i = 0; i < l_length; i++) {
				 	//	console.log(posts_array[i])	
				 	//}
				 	window.data_passed['posts'] = posts_array
				});

			  	FB.api('/me/likes?limit=100',
				'GET',
				{"limit":"10"0},
				 function(response){
				 	var likes_array = response['data']
				 	var l_length = likes_array.length
				 	console.log(l_length)
				 	//for (var i = 0; i < l_length; i++) {
				 	//	console.log(likes_array[i])
				 	//}
				 	window.data_passed['likes'] = likes_array
				});

				FB.api('/me',
				'GET',
				{"fields":"about,education,work,age_range"},
				function(response){
				 	console.dir(response)
				 	window.data_passed['age'] = response['age_range']
				 	window.data_passed['education'] = response['education']
				 	window.data_passed['work'] = response['work']
				 	window.data_passed['about'] = response['about']
				 	console.dir(window.data_passed)
				});

			}, {scope: 'user_likes, user_posts, user_about_me, user_birthday, user_education_history, user_work_history'});

			if(window.user) {
				var project = document.getElementById('dummy_input')
				alert(project['value'])
				window.data_passed['project'] = project['value']};

			}

		function getLikes() {
			FB.api('/me/likes?limit=100&since=2016-03-16T19:25:16+0000',
				'GET',
				{"limit":"100"},
				 function(response){
				 	var likes_array = response['data']
				 	var l_length = likes_array.length
				 	console.log(l_length)
				 	for (var i = 0; i < l_length; i++) {
				 		console.log(likes_array[i])
				 	}
				})
		};

		function getPosts() {
			FB.api('/me/posts?limit=100',
				'GET',
				{"limit":"10"0},
				 function(response){
				 	var posts_array = response['data']
				 	var l_length = posts_array.length
				 	console.log(l_length)
				 	for (var i = 0; i < l_length; i++) {
				 		console.log(posts_array[i])
				 	}
				})
		};

		function postItems(){
			console.log("Logging");
			window.data_passed.personality = window.selected;
			if(document.getElementById('dummy_input') != null) {
				window.data_passed.project = document.getElementById('dummy_input').value;
			}
			$.ajax({
				type: 'POST',
				url: '/api/submit',
				data: window.data_passed,
				success: function() {
					window.location.href = "/submitted";
					console.log("Hurray!");
				},
				error: function() {
					alert('Ups coś poszło nie tak :( \n Spróbuj ponownie :)')
				}
			});
		};