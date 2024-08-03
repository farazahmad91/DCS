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
    alertDiv.fadeIn(1000);
    setTimeout(() => {
        alertDiv.fadeOut('slow', () => {
            alertDiv.remove();
        });
    }, 2000);
}

function IsValidate(cls) {
    let isValid = true;
    const textBoxes = $("." + cls);
    textBoxes.each(function () {
        if ($(this).val().trim() === '') {
            $(this).addClass("border border-2 border-danger");
            if ($(this).next('.error-message').length === 0) {
                Info(-1, 'Please fill in the required field');
                //$(this).after('<span class="error-message">Please fill in the required field</span>');
            }
            isValid = false;
        } else {
            $(this).removeClass("border border-danger").addClass("border-success");
            $(this).next('.error-message').remove();
        }
    });
    textBoxes.off('input').on('input', function () {
        IsValidate(cls);
    });
    return isValid;
}

   