(function() {
  $(".form-email input, .form-email textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      var name = $form.find('#name').val();
      var email = $form.find('#email').val();
      var message = $form.find('#message').val();

      // Check for white space in name for Success/Fail message
      var firstName = name;
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }

      event.preventDefault();

      var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

      if (email.length > 0 && name.length > 0 && message.length > 0) {
         // prevent default submit behaviour
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if ( !emailRegex.test(email) ) {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
            $('#success > .alert-danger').append("<strong>Please use a valid email.");
            $('#success > .alert-danger').append('</div>');
          }
          else {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              // Success message
              $('#success').html("<div class='alert alert-success'>");
              $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
              $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
              $('#success > .alert-success').append('</div>');
              //clear all fields
              $('#contactForm').trigger("reset");
            }
            else if (xmlhttp.status != 200 && xmlhttp.status != 0) {
              // Fail message
              $('#success').html("<div class='alert alert-danger'>");
              $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
              $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please send it as an email to hello@latticemarkets.com!");
              $('#success > .alert-danger').append('</div>');
            }
          }
        };
        var parameters = "email=" +(email)+ "&name=" +encodeURIComponent(name)+ "&message=" +encodeURIComponent(message);
        xmlhttp.open("GET", "api/contact_us.php?" + parameters, true);
        xmlhttp.send();
      }
      else {
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
        $('#success > .alert-danger').append("<strong>Please fill all the fields to send the message.");
        $('#success > .alert-danger').append('</div>');
      }
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });
})();
