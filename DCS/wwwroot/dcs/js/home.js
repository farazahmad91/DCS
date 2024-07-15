@model API.DBContext.Entities.RegisterViewModel
@{
    ViewData["Title"] = "Register";
    Layout = "~/Views/Shared/_Account.cshtml";
}
<div class="my-auto">
    <!-- title-->
    <h4 class="mt-3">Free Sign Up</h4>
    <p class="text-muted mb-4">Don't have an account? Create your account, it takes less than a minute</p>

    <!-- form -->
    <form>
        <div class="mb-3">
            <label for="Name" class="form-label">Full Name</label>
            <input class="form-control" type="text" id="Name" placeholder="Enter your name" required>
        </div>
        <div class="mb-3">
            <label for="Email" class="form-label">Email address</label>
            <input class="form-control" type="email" id="Email" required placeholder="Enter your email">
        </div>
        <div class="mb-3">
            <label for="PhoneNo" class="form-label">Phone No</label>
            <input class="form-control" type="text" id="PhoneNo" placeholder="Enter your Phone No" required>
        </div>
        <div class="mb-3" hidden>
            <select class="form-control" id="Role" name="Role" hidden>
                <option value="">:: Select Role ::</option>
                <option value="Admin">Admin</option>
                <option value="Client" selected>Client</option>
            </select>
        </div>
        <div class="mb-3">
            <div class="row">
                <div class="col-md-6">
                    <label for="Password" class="form-label">Password</label>
                    <input class="form-control" type="Password" required id="Password" placeholder="Enter your password">
                </div>
                <div class="col-md-6">
                    <label for="ConfirmPassword" class="form-label">Confirm Password</label>
                    <input class="form-control" type="Password" required id="ConfirmPassword" placeholder="Enter your password">
                </div>
            </div>
            
        </div>
        <div class="mb-3">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="checkbox-signup">
                <label class="form-check-label" for="checkbox-signup">I accept <a href="javascript: void(0);" class="text-muted">Terms and Conditions</a></label>
            </div>
        </div>
        <div class="mb-0 d-grid text-center">
            <button class="btn btn-primary" type="submit" id="btnregister"><i class="mdi mdi-account-circle"></i> Sign Up </button>
        </div>
        <!-- social-->
@*         <div class="text-center mt-4">
            <p class="text-muted font-16">Sign up using</p>
            <ul class="social-list list-inline mt-3">
                <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-primary text-primary"><i class="mdi mdi-facebook"></i></a>
                </li>
                <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-danger text-danger"><i class="mdi mdi-google"></i></a>
                </li>
                <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-info text-info"><i class="mdi mdi-twitter"></i></a>
                </li>
                <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary"><i class="mdi mdi-github"></i></a>
                </li>
            </ul>
        </div> *@
    </form>
    <!-- end form-->
</div>

<!--Footer-->
<footer class="footer footer-alt">
    <p class="text-muted">Already have account? <a href="/Login" class="text-muted ms-1"><b>Log In</b></a></p>
</footer>


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $(document).ready(function () {
        $("#togglePassword").click(function () {
            var passwordInput = $("#Password");
            var type = passwordInput.attr("type") === "password" ? "text" : "password";
            passwordInput.attr("type", type);
            $(this).toggleClass("fa-eye fa-eye-slash");
        });
        $("#btnregister").click(function () {
            RegisterUsers();
        
        });
    });

    function RegisterUsers() {
        debugger;
        var param = {
            Name: $("#Name").val(),
            Email: $("#Email").val(),
            PhoneNo: $("#PhoneNo").val(),
            Role: $("#Role").val(),
            Password: $("#Password").val(),
            ConfirmPassword: $("#ConfirmPassword").val(),
        };

        if (validateUser(param)) {
            $.post("/Account/Register", param)
                .done(function (res) {

                    if (res.status === 1) {
                        setTimeout(function () {
                            Info(1, "Register Successful!");
                        }, 1000);

                        window.location.href = "/Account/Login";
                    } else {
                        Info(-1,"Registration failed. Please try again.");
                    }
                })
                .fail(function (xhr) {
                    Info(-1, xhr.responseText);
                });
        }
    }

    function validateUser(param) {
        if (param.Password !== param.ConfirmPassword) {
            showerrors("Passwords do not match!");
            return false;
        }
        return true;
    }

</script>
