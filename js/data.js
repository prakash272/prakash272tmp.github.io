function validEmail(email) { // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function validateHuman(honeypot) {
  if (honeypot) {  //if hidden form filled up
    console.log("Robot Detected!");
    return true;
  } else {
    console.log("Welcome Human!");
  }
}

function handleFormSubmit(event){
	// event.preventDefault();     
	all_data = []
	var username = document.getElementById("username").value;
	var partyname = document.getElementById("partyname").value;
	var date = document.getElementById("date").value;
	var address = document.getElementById("address").value;
	var details = document.getElementById("details").value;
	
	var elementcount = $("#memberdata").children().length;
	for (var i = 1; i <= elementcount; i++) {	
		var membername = document.getElementById("membername"+ i ).value;
		var headname = document.getElementById("headname"+ i).value;
		var job_type = document.getElementById("job_type"+ i).value;
		all_data.push({date:date,
					party_name:partyname,
					address:address,
					member_name:membername,
					head_name:headname,
					job_type:job_type,
					extra_details:details,
					entry_by:username
					})
	}
	// Conditions
	if (username != '' && partyname != '' && date != '' && address != '' && membername != '' && job_type != '') 
	{
		// Get the form instance
        // var $form = $(event.target);

		var url= $('#gform').attr("action");
		var redirectUrl = 'data.html';
		// show the loading
		// $('#gform').prepend($('<span></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));
		var xhr = $.post(url, $('#gform').serialize(), function(data) {
            console.log("Success! Data: " + data.statusText);
            $(location).attr('href',redirectUrl);
        })
            .fail(function(data) {
                console.warn("Error! Data: " + data.statusText);
                // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
                if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                    //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
                    $(location).attr('href',redirectUrl);                
                }
            });
                
		// return false;
	    // document.location.href = url;
	}	
	else 
	{
		alert("All fields are required.....!");
		return false;
	}		     		
}



$(document).ready(function(){
      var date_input=$('input[name="date"]');
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);

      $("#add_more").click(function(){
		    
      		var count = $("#memberdata").children().length;
            number = count + 1
            
            input = '<div class="row">'+
            '<div class="col-sm-4">'+
            '<input type="text" name="member_name' + number + '" id="membername'+ number +'" placeholder="member name *">'+
          '</div>'+
          '<div class="col-sm-4">'+
            '<input type="text" name="head_name' + number + '" id="headname'+ number +'" placeholder="belong to name *">  '+
          '</div>'+
          '<div class="col-sm-4">'+
            '<select id="job_type'+ number +'" name="job_type'+ number +'">'+
            '<optgroup label="Normal">'+
              '<option value="Normal-Full-Day">Full-Day</option>'+
              '<option value="Normal-Half-Day">Half-Day</option>'+
              '<option value="Normal-Night">Night</option>'+
              '<option value="Normal-Day+Night">Day+Night</option>'+
            '</optgroup>'+
            '<optgroup label="VIP">'+
              '<option value="VIP-Local">Local</option>'+
              '<option value="VIP-Imported">Imported</option>'+
            '</optgroup>'+
            '<optgroup label="VIP-Couple">'+
              '<option value="VIP-Couple-Local">Local</option>'+
              '<option value="VIP-Couple-Imported">Imported</option>'+
            '</optgroup>'+
            '</select> '+
          '</div>'+
          '</div>'
          // now add input div to memberdata div
		    $( "#memberdata" ).append( input );
		});

});

