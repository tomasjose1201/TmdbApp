// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.tmdbapp', // App bundle ID
  name: 'TmdbApp', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-popular', {
  url: '/popular/'
});
var topRatedView = app.views.create('#view-toprated', {
  url: '/toprated/'
});
var latestView = app.views.create('#view-latest', {
  url: '/latest/'
});

var apiUrl = "https://api.themoviedb.org/3";
var apiKey = "1f6c2b740992f9ca43b7a8c8d4f25c81";
var compiledMovieList;
var template;
var configuration;

function startApp(){

	template = $$('#movie-list').html();
	compiledMovieList = Template7.compile(template);

	app.request.json(apiUrl + '/configuration?api_key='+apiKey, function (data) {
		configuration = data;

		app.request.json(apiUrl + '/movie/top_rated?api_key='+apiKey+'&language=en-US&page=1', function (data) {

			for(var i=0; i<data.results.length; i++)
			{
				data.results[i].poster_url = configuration.images.base_url + configuration.images.poster_sizes[3] + data.results[i].backdrop_path
			}

			console.log(data);

			$$("#movie-list").html(compiledMovieList(data));

		});
	});
}

document.addEventListener('deviceready', startApp, false);