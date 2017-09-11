var request = require('request');

var GITHUB_USER = "dawadhakpabokhang";
var GITHUB_TOKEN = "67e8d115254c7d38a0f240517fe063286025986e";

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'dawadhakpabokhang',
      'Authorization': 'token 67e8d115254c7d38a0f240517fe063286025986e'
    }
  }

  request(options, function(error, response, body) {
      // handle an error from request
      if (error) {
        // call the callback function with the error
        callback(error);
        return;
      }

      if (response && response.statusCode === 200) {
        // Request OK, parse data
        var json = JSON.parse(body);
        for (contributor of json){
          contributor.avatar_url
          console.log(contributor.avatar_url);
        }
        return;
      }
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
