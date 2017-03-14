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
	'about':'Null'
};

function getSelected(selection){
			window.selected = selection.options[selection.selectedIndex].text
			alert(window.selected);
		}

		function addHTML(){
			var dummy = '<form id="dummy" onsubmit="return false;">Nazwa twojego projektu <input class="dummy" type="text" name="project" id="dummy_input"></form>'
			if(document.getElementById('zwzt').checked){
				document.getElementById('wrapper').innerHTML += dummy
				window.user = true
			}
			else{
				var element = document.getElementById('dummy')
				element.parentNode.removeChild(element)
				window.user = false
			}
		}

		window.fbAsyncInit = function() {
			FB.init({
				appId: '1181298505271725',
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

			  	FB.api('/me/likes?limit=100&since=2017-01-16T19:25:16+0000',
				'GET',
				{"limit":"100"},
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
				 	window.data_passed['about'] = respone['about']
				});

			}, {scope: 'publish_actions, user_likes, user_posts, user_about_me, user_birthday, user_education_history, user_work_history'});

			


			if(window.user) {
				var project = document.getElementById('dummy_input')
				alert(project['value'])
				window.data_passed['project'] = project['value']};


			var data_to_pass = {
				age: 2,
				name: 'Bob'
			}
			alert(window.selected);
			console.log(window.data_passed);
			postItems(data_to_pass);
			console.log('Sent');

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
				{"limit":"100"},
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
			$.ajax({
				type: 'POST',
				url: '/api/submit',
				data: window.data_passed,
				success: function() {
					console.log('Success!')
				},
				error: function() {
					console.log('Server Error!')
				}
			});
		};