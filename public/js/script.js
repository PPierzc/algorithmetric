var selected = 'Architekt';
var project = 'null';
var user = false;
var data_passed = {
	'email':'',
	'likes':[],
	'posts':[],
	'project':'Null'
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

			  	FB.api('/me', 'get', {'fields':'email'}, function(response){
			  		alert(response['email']);
			  		window.data_passed.email = response['email'];
			  	});

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
				 	window.data_passed['posts'] = posts_array
				});

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
				 	window.data_passed['likes'] = likes_array
				})

			}, {scope: 'publish_actions, user_likes, user_posts, email'});

			


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