<!DOCTYPE html>
<html>
<head>
  <title>Create Upload Features Using Ajax in Laravel</title>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>

<div class="container">
  <h1>Create Upload Features Using Ajax in Laravel</h1>
  <form action="{{ url('upload') }}" enctype="multipart/form-data" method="POST">
  	<div class="alert alert-danger print-error-msg" style="display:none">
      <ul></ul>
    </div>

    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <div class="form-group">
      <label>Judul:</label>
      <input type="text" name="judul" class="form-control" placeholder="Masukkan Judul">
    </div>

	  <div class="form-group">
      <label>Gambar:</label>
      <input type="file" name="gambar" class="form-control">
    </div>

    <div class="form-group">
      <button class="btn btn-success upload-image" type="submit">Kirim</button>
    </div>
  </form>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="http://malsup.github.com/jquery.form.js"></script>
<script type="text/javascript">
  $("body").on("click",".upload-image",function(e){
    $(this).parents("form").ajaxForm(options);
  });

  var options = { 
    complete: function(response) 
    {
    	if($.isEmptyObject(response.responseJSON.error)){
    		$("input[name='judul']").val('');
    		alert('Upload gambar berhasil.');
    	}else{
    		printErrorMsg(response.responseJSON.error);
    	}
    }
  };

  function printErrorMsg (msg) {
	$(".print-error-msg").find("ul").html('');
	$(".print-error-msg").css('display','block');
	$.each( msg, function( key, value ) {
		$(".print-error-msg").find("ul").append('<li>'+value+'</li>');
	});
  }
</script>

</body>
</html>