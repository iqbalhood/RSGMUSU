$(document).ready(function() {
// check_login();
$("#alert").attr('class', '');
$("#alert").hide();
$("#do_logout").hide();
console.log("COOOKIE APPS ->"+document.cookie);


    $(document).on('click','#do_login',function(){
    
      console.log("DIKLIK");
    
            $("#alert").attr('class', '');
            
            //show loading
            $("#alert").addClass('alert alert-danger');
            $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> please wait...");
            $("#alert").show();
            
            var username      = $("#username").val();
            var password      = $("#password").val();
            var nama          = "";

            if(username.length === 0){
                $("#alert_username").html("username can't be empty");
                $("#username").focus();
        
                $("#alert").addClass('alert alert-danger');
                $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> username can't be empty");
                $("#alert").show();
              }
              else if(password.length === 0){
                $("#alert_password").html("password can't be empty");
                $("#password").focus();
        
                $("#alert").addClass('alert alert-danger');
                $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> password can't be empty");
                $("#alert").show();
              }else{


                    // var encodedString = 'username=' +
                    // encodeURIComponent(this.username) +
                    // '&password=' +
                    // encodeURIComponent(this.password);

                    // console.log(encodeURIComponent(this.password));

                    // $http({
                    //     method: 'POST',
                    //     url: 'userauth.php',
                    //     data: encodedString,
                    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    // })
                    
                    // .success(function(data) {
                    //         //console.log(data);
                    //         if ( data.trim() === 'correct') {
                    //             window.location.href = 'welcome.php';
                    //         } else {
                    //             $scope.errorMsg = "Username and password do not match.";
                    //         }
                    // })
                    
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                      if (this.readyState == 4 && this.status == 200) {
                       // console.log("username="+username+"&password="+password);
                       // document.getElementById("demo").innerHTML = this.responseText;
                        console.log(" POST LOGIN  "+this.responseText );
                        var obj = JSON.parse(this.responseText);

                        if(obj.status=="correct"){
                                $("#do_logout").hide();
                                console.log("LOGIN BERHASIl");
                                document.cookie = "username="+username+";"
                                document.cookie = "akses="+obj.akses+";";
                               window.location.href = 'home.html';

                        }else{
                            console.log("LOGIN GAGAL");
                            document.cookie = "username=wrong;akses=wrong";
                            window.location.href = 'index.html';
                        }

                      }
                    };
                    xhttp.open("POST", "../config/userauth.php", true);
                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhttp.send("username="+username+"&password="+password);
              }

            setTimeout(function(){
               
                console.log("Redirecting To Login Page");
               // window.location.href = 'index.html';
                
                // if(isAdmin === false)
                // {
                //     $("#alert").addClass('alert alert-danger');
                //     $("#alert").html("<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a> you're not admin");
                //     $("#alert").show();
                // }
            }, 5000); //hide loader after 5000 ms (5s)
    
    });




});