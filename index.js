function retrieveUserRepository(){
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
			  'url' :result[i].html_url,
			  'id': result[i].id
		  }
			  
		  var  repositoryItem = $('<div class="repo row"><div class="name col-sm-5">Repository Name:'+repoObj.name+'</div> <div class="url col-sm-5">URL:<a href='+repoObj.url+' target="_blank">Link to Repository</a></div><div class="link col-sm-2"><input type="button" value="Issue" class="issue-button"/></div></div>');
		  $('.results').append(repositoryItem);

		  $('.issue-button').click(function(){
			createIssue(repoObj);
		  });
	  }
   }
});
}
function createIssue(repoObj){
	$('.repository-name').html(repoObj.name);
	$('.repository-name').attr('id',repoObj.id);
	$('.results').hide();
	$('.issue-form').show();
}

function submitIssue() {
	var username = document.querySelector('input[name="username"]').value;
	var repoId = $('.repository-name').attr('id');
	var title = $('input[name="issue-title"]').val();
  
	var body = $('input[name="description"]').val();
	
	var payload = {
	  "title": title,
	  "body": body
	};
	var url = "https://api.github.com/repos/{:owner}/{:repo}/issues";

	url= url.replace('{:owner}',username).replace('{:repo}',repoId);
	
	$.ajax({
    url: url,
	type: 'POST',
	dataType: "json",
	accepts: "application/json application/vnd.github+json",
	contentType:"application/json",
	data:JSON.stringify(payload),
	headers: {"Authorization": "auth token"},
    success: function(result){
		console.log("result");
	}
	});
}