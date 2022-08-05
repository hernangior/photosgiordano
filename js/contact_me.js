$(function() {

    //jQuery.support.cors = true;

    function showSuccessMsg(){
        // Success message
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-success')
            .append("<strong>Sua mensagem foi enviada. </strong>");
        $('#success > .alert-success')
            .append('</div>');
    }

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {

            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            $.ajax({
                type: "POST",
                //dataType: 'json',
                //crossDomain: true,
                //headers: { 'Access-Control-Allow-Origin': "*"},
                data: {
                    "entry.52904792": name,
                    "entry.1665733173": email,
                    "entry.1129926948": message,

                    //dlut: "1659705172628",
                    //fvv: 1,
                    //partialResponse: '[null,null,"7385271245913055562"]',
                    //pageHistory: 0,
                    //fbzx: '7385271245913055562'
                },
                cache: false,
                url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScSb0xiEF75ZZwf9WGCbX6OSu6uhuM6LqP-iYrmbMaHjate-Q/formResponse",
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Sua mensagem foi enviada. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function(error) {

                    if ((!error.responseText) && (!error.status)){
                        showSuccessMsg()
                    }else{
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Desculpe " + firstName + ", parece que estou com problemas. Por favor tente novamente mais tarde!");
                        $('#success > .alert-danger').append('</div>');
                    }

                    //clear all fields
                    $('#contactForm').trigger("reset");

                },
            })

        },

        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
