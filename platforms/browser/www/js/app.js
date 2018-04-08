// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.tmdbapp', // App bundle ID
  name: 'TmdbApp', // App name
  theme: 'auto', // Automatic theme detection
  // App routes
  routes: routes,
});

// Init/Create views
var popularView = app.views.create('#view-popular', {
  url: '/popular/'
});
var topRatedView = app.views.create('#view-toprated', {
  url: '/toprated/'
});
var latestView = app.views.create('#view-latest', {
  url: '/latest/'
});
var searchView = app.views.create('#view-search', {
  //url: '/search/'
});

var apiUrl = "https://api.themoviedb.org/3";
var apiKey = "1f6c2b740992f9ca43b7a8c8d4f25c81";
var compiledMovieList;
var template;
var configuration;

//onInit: top-rated page
$$(document).on('page:init', '.page[data-name="home"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  var page = e.detail;
  console.log(page.name);
  document.addEventListener('deviceready', startAppTopRatedList, false);
});

//onInit: popular page
$$(document).on('page:init', '.page[data-name="popular"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  var page = e.detail;
  console.log(page.name);
  document.addEventListener('deviceready', startAppPopularList, false);
});

//onInit: latest page
$$(document).on('page:init', '.page[data-name="latest"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  var page = e.detail;
  console.log(page.name);
  document.addEventListener('deviceready', startAppLatestList, false);
});

//onInit: search page
$$(document).on('page:init', '.page[data-name="search"]', function (e) {

//Este evento só é chamado quando alguma coisa é mudada dentro do formulário 
  $$('#my-form').on('change', function (e) {

  	//formData recebe um objeto com todos os inputs do formulário. Para acessar um determinado valor: formData.nameHTMLdoCampo
  	  formData = app.form.convertToData(this);
  	  console.log(formData);
  	  console.log(formData.option);
  	  console.log(formData.search);
  	  console.log(formData.toggle);

  	  //Como buscar valores do campo tipo Toggle
  	  /*if(formData.toggle == 'true') {
  	  	console.log("Peguei o valor desse campo");
  	  }*/

  	  /*if(formData.toggle != 'true') {
  	  	formData.toggle = 'false';
  	  }*/

  	  searchQuery = apiUrl + '/search/movie?api_key='+apiKey+'&language=en-US&query='+ formData.search +'&page=1&include_adult=false';

  	  console.log(searchQuery);

  	  document.addEventListener('deviceready', function() {
  	  	startAppSearch(searchQuery);
  	  }, false);

	  });
});

function startAppSearch(query){

	app.request.json(apiUrl + '/configuration?api_key='+apiKey, function (data) {
		configuration = data;

		app.request.json(query, function (data) {

			for(var i=0; i<data.results.length; i++)
			{
				data.results[i].poster_url = configuration.images.base_url + configuration.images.poster_sizes[3] + data.results[i].backdrop_path
			}

			template = $$('#movie-list-search').html();
			compiledMovieList = Template7.compile(template);

			$$("#movie-list-search").html(compiledMovieList(data));

		});
	});
}


function startAppTopRatedList(){

	template = $$('#movie-list-top-rated').html();
	compiledMovieList = Template7.compile(template);

	app.request.json(apiUrl + '/configuration?api_key='+apiKey, function (data) {
		configuration = data;

		app.request.json(apiUrl + '/movie/top_rated?api_key='+apiKey+'&language=en-US&page=1', function (data) {

			for(var i=0; i<data.results.length; i++)
			{
				data.results[i].poster_url = configuration.images.base_url + configuration.images.poster_sizes[3] + data.results[i].backdrop_path
			}

			console.log(data);

			$$("#movie-list-top-rated").html(compiledMovieList(data));

		});
	});
}

function startAppPopularList(){

	template = $$('#movie-list-popular').html();
	compiledMovieList = Template7.compile(template);

	app.request.json(apiUrl + '/configuration?api_key='+apiKey, function (data) {
		configuration = data;

		app.request.json(apiUrl + '/movie/popular?api_key='+apiKey+'&language=en-US&page=1', function (data) {

			for(var i=0; i<data.results.length; i++)
			{
				data.results[i].poster_url = configuration.images.base_url + configuration.images.poster_sizes[3] + data.results[i].backdrop_path
			}

			console.log(data);

			$$("#movie-list-popular").html(compiledMovieList(data));

		});
	});
}

function startAppLatestList(){

	template = $$('#movie-list-latest').html();
	compiledMovieList = Template7.compile(template);

	app.request.json(apiUrl + '/configuration?api_key='+apiKey, function (data) {
		configuration = data;

		app.request.json(apiUrl + '/movie/upcoming?api_key='+apiKey+'&language=en-US', function (data) {

			for(var i=0; i<data.results.length; i++)
			{
				data.results[i].poster_url = configuration.images.base_url + configuration.images.poster_sizes[3] + data.results[i].backdrop_path
			}

			console.log(data);

			$$("#movie-list-latest").html(compiledMovieList(data));

		});
	});
}