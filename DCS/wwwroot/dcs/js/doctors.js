@model Entities.ProjectDetails
@{
	ViewData["Title"] = "Register";
	Layout = "~/Views/Shared/_Account.cshtml";
}

    < !--form -->
	<div class="my-auto">
		<!-- title-->

		<!-- form -->
		<div>
			<h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-account-circle me-1"></i> Personal Info</h5>
			<div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						@if (Model != null && Model.ProjectId != null)
						{
							<div class="mb-3" hidden>
								<label for="Name" class="form-label">Full Name</label>
								<input type="text" class="form-control" id="Name" placeholder="enter full name">
							</div>
						}
						else
						{
							<div class="mb-3">
								<label for="Name" class="form-label">Full Name</label>
								<input type="text" class="form-control" id="Name" placeholder="enter full name">
							</div>
						}
					</div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						@if (Model != null && Model.ProjectId != null)
						{
							<div class="mb-3" hidden>
								<label for="Email" class="form-label">Phone No.</label>
								<input type="number" class="form-control" id="Phone" placeholder="enter phone">
							</div>
						}
						else
						{
							<div class="mb-3">
								<label for="Email" class="form-label">Phone No.</label>
								<input type="number" class="form-control" id="Phone" placeholder="enter phone">
							</div>
						}



					</div>
				</div> <!-- end col -->
			</div> <!-- end row -->

			<div class="row">
				<div class="col-12">
					<div class="mb-3">
						@if (Model != null && Model.ProjectId != null)
						{
							<div class="mb-3">
								<label for="Email" class="form-label">Email</label>
								<input type="email" class="form-control" disabled=true asp-for="Email" placeholder="enter email">
							</div>
						}
						else
						{
							<div class="mb-3">
								<label for="Email" class="form-label">Email</label>
								<input type="email" class="form-control" asp-for="Email" placeholder="enter email">
							</div>
						}
					</div>
				</div> <!-- end col -->
			</div> <!-- end row -->
			@* <div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						<label for="useremail" class="form-label">Email Address</label>
						<input type="email" class="form-control" id="useremail" placeholder="Enter email">
							<span class="form-text text-muted"><small>If you want to change email please <a href="javascript: void(0);">click</a> here.</small></span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						<label for="userpassword" class="form-label">Password</label>
						<input type="password" class="form-control" id="userpassword" placeholder="Enter password">
							<span class="form-text text-muted"><small>If you want to change password please <a href="javascript: void(0);">click</a> here.</small></span>
					</div>
				</div> <!-- end col -->
			</div> <!-- end row --> *@

			<h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-office-building me-1"></i> Company Info</h5>
			<div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						<label for="companyname" class="form-label">Company Name</label>
						<input type="text" class="form-control" asp-for="ProjectName" placeholder="Enter company name">
					</div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						<label for="cwebsite" class="form-label">Website</label>
						<input type="text" class="form-control" asp-for="DomainName" placeholder="enter domain Name">
					</div>
				</div> <!-- end col -->
			</div> <!-- end row -->

			<h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-earth me-1"></i> Social</h5>
			<div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						<label for="social-fb" class="form-label">Facebook</label>
						<div class="input-group">
							<span class="input-group-text"><i class="mdi mdi-facebook"></i></span>
							<input type="text" class="form-control" id="social-fb" placeholder="Url">
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						<label for="social-tw" class="form-label">Twitter</label>
						<div class="input-group">
							<span class="input-group-text"><i class="mdi mdi-twitter"></i></span>
							<input type="text" class="form-control" id="social-tw" placeholder="Username">
						</div>
					</div>
				</div> <!-- end col -->
			</div> <!-- end row -->

			<div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						<label for="social-insta" class="form-label">Instagram</label>
						<div class="input-group">
							<span class="input-group-text"><i class="mdi mdi-instagram"></i></span>
							<input type="text" class="form-control" id="social-insta" placeholder="Url">
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						<label for="social-lin" class="form-label">Linkedin</label>
						<div class="input-group">
							<span class="input-group-text"><i class="mdi mdi-linkedin"></i></span>
							<input type="text" class="form-control" id="social-lin" placeholder="Url">
						</div>
					</div>
				</div> <!-- end col -->
			</div> <!-- end row -->

			<div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						<label for="social-sky" class="form-label">Skype</label>
						<div class="input-group">
							<span class="input-group-text"><i class="mdi mdi-skype"></i></span>
							<input type="text" class="form-control" id="social-sky" placeholder="username">
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						<label for="social-gh" class="form-label">Github</label>
						<div class="input-group">
							<span class="input-group-text"><i class="mdi mdi-github"></i></span>
							<input type="text" class="form-control" id="social-gh" placeholder="Username">
						</div>
					</div>
				</div> <!-- end col -->
			</div> <!-- end row -->
		</div>
		<button type="submit" class="btn btn-success mt-2" onclick="addProject();>
		<i class="mdi mdi-content-save"></i> @if (Model != null && Model.ProjectId != null) {
	<text>Save changes</text>

}
else {
	<text>Create Free</text>
}
	</button >
		< !--end form-- >
	</div >
    < !--end form-- >

< !--Footer-->
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
