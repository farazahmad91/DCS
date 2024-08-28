
window.CreateMedicineReport = function () {
    debugger
    if (!validateInvoiceFields()) {
        alert('Please fill all the Required fields.');
        return;
    }

    let treatment = {
        DrId: $('#doctor').val(),
        Email: $('#txtEmail').val(),
        Diagnosis: $('#txtDiagnosis').val(),
        Description: $('#Description').val(),
        Medications: []
    };
    Show_Loader();
    $('.rowClass').each(function (index, element) {
        let medicineName = $(element).find('input[id^="txtMedicineName"]').val();
        let dosage = $(element).find('input[id^="txtDosage"]').val();
        let frequency = $(element).find('input[id^="txtFrequency"]').val();
        let followUpDate = $(element).find('input[id^="txtFollowUpDate"]').val();

        console.log(`Medicine ${index}:`, {
            Name: medicineName,
            Dosage: dosage,
            Frequency: frequency,
            FollowUpDate: followUpDate
        });

        let medicine = {
            Name: medicineName,
            Dosage: dosage,
            Frequency: frequency,
            FollowUpDate: followUpDate
        };

        treatment.Medications.push(medicine);
    });
    
    console.log('Treatment:', treatment);
   
    $.ajax({
        url: '/AddTreatment',
        type: 'POST',
        data: JSON.stringify(treatment),
        contentType: 'application/json',
        success: function (res) {
            Hide_Loader();
            Info(res.statusCode, res.responseText);
            Onload();
        },
        error: function (error) {
            Info(error.statusCode, error.responseText);
        }
    });
}

function validateInvoiceFields() {
    let isValid = true;

    if ($('#doctor').val().trim() === '') {
        isValid = false;
    }
    if ($('#txtEmail').val().trim() === '') {
        isValid = false;
    }
    if ($('#txtDiagnosis').val().trim() === '') {
        isValid = false;
    }
    if ($('#Description').val().trim() === '') {
        isValid = false;
    }

    $('.rowClass').each(function () {
        let isRowValid = true;

        $(this).find('input').each(function () {
            if ($(this).val().trim() === '') {
                isRowValid = false;
                return false;
            }
        });

        if (!isRowValid) {
            isValid = false;
            return false;
        }
    });

    return isValid;
}

$(document).ready(function () {
    Onload();
    OnloadProjectId();
});

function Onload() {
    var projectId = 0;
    projectId = $("#ddlproid").val();
    var param = {
        Id: $("#txtpid").val(),
        Date: $("#txtdate").val(),
        ProjectId: projectId,
        PageLength: $("#ddltypetop").val(),
    };
    $.post('/_TreatmentList', param).done(function (res) {

        $("#tList").html(res);
    }).fail(function () {
        alert("error");
    });
}

function OnloadProjectId() {
    $.post('/UserListInJson').done(function (res) {
        var options = '<option value="0">Project Id</option>';
        for (var i = 0; i < res.length; i++) {
            options += '<option value="' + res[i].projectId + '">' + res[i].projectId + '</option>';
        }
        $('#ddlproid').html(options);
    }).fail(function (xhr) {
        Info(-1, xhr.responseText);
    });
}

function medicationList(Id) {
    let param = {
        id: Id,
    };
    $.post("/_MedicationList", param)
        .done(function (res) {
            $("#treatPV").html(res);
            $("#MedicationList_Modal").modal("show");
        })
        .fail(function () {
            alert("error");
        });
}

function CreateTreatment() {
    $.post("/CreateTreatment")
        .done(function (res) {
            $("#treatPV").html(res);
            $("#AddTreatment_Modal").modal("show");
        })
        .fail(function () {
            alert("error");
        });
}



let count = 1;
$(document).ready(() => {
    $('#tbody').on('click', '#btnaddnew', function (e) {
        e.preventDefault();
        let currentRow = $(this).closest('.rowClass');
        let isValid = validateRow(currentRow);

        if (isValid) {
            let dynamicRowHTML = `
                            <tr class="rowClass">
                                <td>
                                    <input type="text" class="form-control" id="txtMedicineName${count}" placeholder="Please Enter Name" />
                                </td>
                                <td>
                                        <input type="text" id="txtDosage${count}" class="form-control" placeholder="Please Enter Dosage" />
                                </td>
                                <td>
                                        <input type="text" id="txtFrequency${count}" class="form-control" placeholder="Please Enter Frequency" />
                                </td>
                                <td>
                                        <input type="date" id="txtFollowUpDate${count}" class="form-control" placeholder="Please Enter Follow Date" />
                                </td>
                                <td>
                                    <div class="d-inline-flex gap-3">
                                        <button class="btn btn-outline-danger remove">
                                                <i class="mdi mdi-delete"></i>
                                        </button>
                                            <button class="btn btn-primary" id="btnaddnew">
                                            Add
                                        </button>
                                    </div>
                                </td>
                            </tr>`;

            $('#tbody tr:last').before(dynamicRowHTML);
            count++;
        } else {
            alert('Please fill all the fields before adding a new row.');
        }
    });

    $('#tbody').on('click', '.remove', function () {
        $(this).closest('.rowClass').remove();
    });

    function validateRow(row) {
        let isValid = true;
        row.find('input').each(function () {
            if ($(this).val() === '' || $(this).val() == null) {
                isValid = false;
            }
        });
        return isValid;
    }

    window.CreateMedicineReport = function () {
        debugger;
        if (validateInvoiceFields()) {



            let treatment = {
                DrId: $('#doctor').val(),
                Email: $('#txtEmail').val(),
                Diagnosis: $('#txtDiagnosis').val(),
                Description: $('#Description').val(),
                Medications: []
            };

            $('.rowClass').each(function (index, element) {
                let medicineName = $(element).find('input[id^="txtMedicineName"]').val();
                let dosage = $(element).find('input[id^="txtDosage"]').val();
                let frequency = $(element).find('input[id^="txtFrequency"]').val();
                let followUpDate = $(element).find('input[id^="txtFollowUpDate"]').val();

                console.log(`Medicine ${index}:`, {
                    Name: medicineName,
                    Dosage: dosage,
                    Frequency: frequency,
                    FollowUpDate: followUpDate
                });

                let medicine = {
                    Name: medicineName,
                    Dosage: dosage,
                    Frequency: frequency,
                    FollowUpDate: followUpDate
                };

                treatment.Medications.push(medicine);
            });

            console.log('Treatment:', treatment);

            $.ajax({
                url: '/AddTreatment',
                type: 'POST',
                data: JSON.stringify(treatment),
                contentType: 'application/json',
                success: function (res) {
                    Info(res.statusCode, res.responseText);
                },
                error: function (error) {
                    Info(error.statusCode, error.responseText);
                }
            });
        }
    }


    function validateInvoiceFields() {
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



});