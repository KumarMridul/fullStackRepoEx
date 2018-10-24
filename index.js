const accessToken="c99a33cfb9263446ed0ce215d71dcc1368bd55a4";
function retrieveUserRepository(){
	$('.issue-form').hide();
	$('.results').show();
	$('.results').html('');
	var username=document.querySelector('input[name="username"]').value,
		url='https://api.github.com/users/{username}/repos';
		
	if(username.length>0)
		url=url.replace('{username}',username);
	
	$.ajax({
    url: url,
    type: 'GET',
    success: function(result){
		
      for(var i=0;i<result.length;i++){
		  var repoObj ={
			  'name':result[i].name,
			  'url' :result[i].html_url
		  }
			  
		  var  repositoryItem = $('<div class="repo row"><div class="name col-sm-5">Repository Name:<span class="repo-name">'+repoObj.name+'</span></div> <div class="url col-sm-5">URL:<a href='+repoObj.url+' target="_blank">Link to Repository</a></div><div class="link col-sm-2"><input type="button" value="Issue" id='+result[i].name+' class="issue-button"/></div></div>');
		  $('.results').append(repositoryItem);

		  $('#'+result[i].name).click(function(event){
			createIssue(repoObj);
		  });
	  }
   }
});
}
function createIssue(repoObj){
	$('.repo-name').html(repoObj.name);
	$('.repo-name').attr('id',repoObj.name);
	$('.results').hide();
	$('input[name="issue-title"]').val('');
	$('input[name="description"]').val('');
	$('.issue-form').show();
}

function submitIssue() {
	var username = document.querySelector('input[name="username"]').value;
	var repoName = $('.repo-name').attr('id');
	var title = $('input[name="issue-title"]').val();
  
	var body = $('textarea[name="description"]').val();
	
	var payload = {
	  "title": title,
	  "body": body
	};
	var url = "https://api.github.com/repos/{:owner}/{:repo}/issues"+'?access_token='+accessToken;

	url= url.replace('{:owner}',username).replace('{:repo}',repoName);
	
	$.ajax({
    url: url,
	type: 'POST',
	dataType: "json",
	mode: "cors",
	cache: "no-cache",
	headers: {
	"Content-Type": "application/json; charset=utf-8"
	},
	data:JSON.stringify(payload),
    success: function(result){
		alert('Issue submitted for repository: '+repoName);
		$('.issue-form').hide();
		$('.results').show();
	}
	});
}