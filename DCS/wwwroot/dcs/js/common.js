function Info(statusCode, message) {
    const typeMap = {
        1: ['success', 'fa fa-check'],
        '-1': ['danger', 'fa fa-close'],
        2: ['info', '']
    };
    const [type, iconClass] = typeMap[statusCode] || ['primary', ''];
    const alertDiv = $(`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${iconClass ? `<i class="${iconClass}" id="fafa" style="background-color:white; border-radius:10% 40% 10% 40%;"></i>` : '  '}
           ${message}
            <button type="button" class="btn-close" style="font-size:10px;" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
    $('.alert-container').append(alertDiv);

    // Show alert quickly
    alertDiv.fadeIn(500); // Faster fade-in

    // Hide alert quickly
    setTimeout(() => {
        alertDiv.fadeOut(500, () => { // Faster fade-out
            alertDiv.remove();
        });
    }, 2000); // Shorter duration before fading out
}


function IsValidate() {
    let isValid = true;
    $('.inputValidate').each(function () {
        const $this = $(this);
        console.log($this);
        if ($this.val().trim() === '' || $this.val().trim() == 0) {
            $this.addClass("border border-2 border-danger");
            if ($this.next('.error-message').length < 1) {
                $this.after('<div class="error-message text-danger">This field is required</div>');
            }
            isValid = false;
        } else {
            $this.removeClass("border border-2 border-danger").addClass("border-success");
            $this.next('.error-message').remove();
        }
    });

    return isValid;
}

function Show_Loader() {
    debugger;
    jQuery(".overlay-spinner").show();

}

function Hide_Loader() {

    jQuery(".overlay-spinner").hide();

}


   