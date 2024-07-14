@{
    ViewData["Title"] = "AddInvoice";
    Layout = "_Layout";
}

< !--Content wrapper start-- >
<div class="content-wrapper">
    <!-- Row start -->
    <div class="row justify-content-center">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Create Invoice</div>
                </div>
                <div class="card-body">
                    <div class="create-invoice-wrapper">
                        <!-- Row start -->
                        <div class="row gx-3">
                            <div class="col-sm-6 col-12">
                                <!-- Row start -->
                                <div class="row gx-3">
                                    <div class="col-sm-6 col-12">
                                        <div class="mb-3">
                                            <label for="customerName" class="form-label">Customer Name</label>
                                            <input type="text" id="txtName" class="form-control" placeholder="Enter Customer Name" />
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <div class="mb-3">
                                            <label for="txtEmail" class="form-label">Email</label>
                                            <div class="input-group">
                                                <input type="email" id="txtEmail" class="form-control" placeholder="Enter Email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <div class="mb-3">
                                            <label for="txtPhone" class="form-label">Mobile No.</label>
                                            <input type="text" id="txtPhone" class="form-control" placeholder="Enter Mobile Number" />
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <div class="mb-3">
                                            <label for="txtAddress" class="form-label">Address</label>
                                            <div class="input-group">
                                                <input type="text" id="txtAddress" class="form-control" placeholder="Enter Address" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Row end -->
                    </div>
                    <hr />
                    <!-- Row start -->
                    <div class="row gx-3">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Unit</th>
                                            <th>Price</th>
                                            <th>VAT</th>
                                            <th>Discount</th>
                                            <th>Amount (Net)</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">
                                        <tr class="rowClass">
                                            <td>
                                                <!-- Form group start -->
                                                <select class="form-select" id="txtService0">
                                                    <option>Select Service</option>
                                                    <option>Mobiles</option>
                                                    <option>Books</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div class="m-0">
                                                    <select class="form-select" id="txtProduct0">
                                                      
                                                    </select>
                                                    <input type="text" class="form-control" id="txtProduct0" placeholder="Product" />
                                                </div>
                                            </td>
                                            <td>
                                                <div class="m-0">
                                                    <input type="number" class="form-control" id="txtQty0" onchange="txtonChange();" placeholder="Qty" />
                                                </div>
                                            </td>
                                            <td>
                                                <select class="form-select" id="txtUnit0">
                                                    <option>Select Unit</option>
                                                    <option>tablet</option>
                                                    <option>Books</option>
                                                </select>
                                            </td>
                                            <td>
                                                <!-- Form group start -->
                                                <div class="input-group m-0">
                                                    <input type="text" id="txtPrice0" onchange="txtonChange();" class="form-control" placeholder="Price" />
                                                    <span class="input-group-text">₹</span>
                                                </div>
                                                <!-- Form group end -->
                                            </td>
                                            <td>
                                                <!-- Form group start -->
                                                <div class="input-group m-0">
                                                    <input type="text" id="txtVat0" onchange="txtonChange();" class="form-control" placeholder="Vat" />
                                                    <span class="input-group-text">%</span>
                                                </div>
                                                <!-- Form group end -->
                                            </td>
                                            <td>
                                                <!-- Form group start -->
                                                <div class="input-group m-0">
                                                    <input type="text" id="txtDiscount0" onchange="txtonChange();" class="form-control" placeholder="Discount" />
                                                    <span class="input-group-text">%</span>
                                                </div>
                                                <!-- Form group end -->
                                            </td>
                                            <td>
                                                <!-- Form group start -->
                                                <div class="input-group m-0">
                                                    <input type="text" id="txtTotalAmount0" class="form-control" placeholder="Total Amount" readonly />
                                                    <span class="input-group-text">₹</span>
                                                </div>
                                                <!-- Form group end -->
                                            </td>
                                            <td>
                                                <div class="d-inline-flex gap-3">
                                                    <button class="btn btn-outline-danger remove">
                                                        <i class="bi bi-trash m-0"></i>
                                                    </button>
                                                    <button class="btn btn-dark" id="btnaddnew">
                                                        Add
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="7">&nbsp;</td>
                                            <td>
                                                <p class="m-0">Subtotal</p>
                                                <p class="m-0">Discount</p>
                                                <p class="m-0">VAT</p>
                                                <h5 class="mt-2 text-red">Total INR</h5>
                                            </td>
                                            <td>
                                                <p class="m-0" id="subtotal">₹0.00</p>
                                                <p class="m-0" id="discountAmount">₹0.00</p>
                                                <p class="m-0" id="vatAmount">₹0.00</p>
                                                <h5 class="mt-2 text-red" id="totalAmount">₹0.00</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="text-end">
                                <button class="btn btn-outline-success" onclick="CreateInvoice();">
                                    Create Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Row end -->
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
    // $(document).ready(() => {
    //     let count = 1;

    //     $('#tbody').on('click', '#btnaddnew', function () {
    //         let dynamicRowHTML = `
    //                 <tr class="rowClass">
    //                     <td>
    //                         <select class="form-select" id="txtService${count}">
    //                             <option>Select Service</option>
    //                             <option>Mobiles</option>
    //                             <option>Books</option>
    //                         </select>
    //                     </td>
    //                     <td>
    //                         <div class="m-0">
    //                             <input type="text" class="form-control" id="txtProduct${count}" placeholder="Product" />
    //                         </div>
    //                     </td>
    //                     <td>
    //                         <div class="m-0">
    //                             <input type="number" class="form-control" id="txtQty${count}" onchange="txtonChange();" placeholder="Qty" />
    //                         </div>
    //                     </td>
    //                     <td>
    //                         <select class="form-select" id="txtUnit${count}">
    //                             <option>Select Unit</option>
    //                             <option>tablet</option>
    //                             <option>Books</option>
    //                         </select>
    //                     </td>
    //                     <td>
    //                         <div class="input-group m-0">
    //                             <input type="text" id="txtPrice${count}" onchange="txtonChange();" class="form-control" placeholder="Price"/>
    //                             <span class="input-group-text">₹</span>
    //                         </div>
    //                     </td>
    //                     <td>
    //                         <div class="input-group m-0">
    //                             <input type="text" id="txtVat${count}" onchange="txtonChange();" class="form-control" placeholder="Vat"/>
    //                             <span class="input-group-text">%</span>
    //                         </div>
    //                     </td>
    //                     <td>
    //                         <div class="input-group m-0">
    //                             <input type="text" id="txtDiscount${count}" onchange="txtonChange();" class="form-control" placeholder="Discount"/>
    //                             <span class="input-group-text">%</span>
    //                         </div>
    //                     </td>
    //                     <td>
    //                         <div class="input-group m-0">
    //                             <input type="text" id="txtTotalAmount${count}" class="form-control" placeholder="Total Amount" readonly/>
    //                             <span class="input-group-text">₹</span>
    //                         </div>
    //                     </td>
    //                     <td>
    //                         <div class="d-inline-flex gap-3">
    //                             <button class="btn btn-outline-danger remove">
    //                                 <i class="bi bi-trash m-0"></i>
    //                             </button>
    //                             <button class="btn btn-dark" id="btnaddnew">
    //                                 Add
    //                             </button>
    //                         </div>
    //                     </td>
    //                 </tr>`;
    //         $('#tbody').append(dynamicRowHTML);
    //         count++;
    //     });

    //     $('#tbody').on('click', '.remove', function () {
    //         $(this).closest('.rowClass').remove();
    //         txtonChange();
    //     });

    //     $('body').on('change', '.form-control', function () {
    //         txtonChange();
    //     });

    //     $('body').on('change', '.form-select', function () {
    //         txtonChange();
    //     });
    // });
    $(document).ready(() => {
        let count = 1;

        $('#tbody').on('click', '#btnaddnew', function () {
            GetMedicines().then(options => {
                let dynamicRowHTML = `
                    <tr class="rowClass">
                        <td>
                            <select class="form-select" id="txtService${count}">
                                <option>Select Service</option>
                                <option>Mobiles</option>
                                <option>Books</option>
                            </select>
                        </td>
                        <td>
                            <div class="m-0">
                                <select class="form-control product-select" id="txtProduct${count}">
                                    ${options}
                                </select>
                            </div>
                        </td>
                        <td>
                            <div class="m-0">
                                <input type="number" class="form-control" id="txtQty${count}" onchange="txtonChange();" placeholder="Qty" />
                            </div>
                        </td>
                        <td>
                            <select class="form-select" id="txtUnit${count}">
                                <option>Select Unit</option>
                                <option>tablet</option>
                                <option>Books</option>
                            </select>
                        </td>
                        <td>
                            <div class="input-group m-0">
                                <input type="text" id="txtPrice${count}" onchange="txtonChange();" class="form-control" placeholder="Price"/>
                                <span class="input-group-text">₹</span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group m-0">
                                <input type="text" id="txtVat${count}" onchange="txtonChange();" class="form-control" placeholder="Vat"/>
                                <span class="input-group-text">%</span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group m-0">
                                <input type="text" id="txtDiscount${count}" onchange="txtonChange();" class="form-control" placeholder="Discount"/>
                                <span class="input-group-text">%</span>
                            </div>
                        </td>
                        <td>
                            <div class="input-group m-0">
                                <input type="text" id="txtTotalAmount${count}" class="form-control" placeholder="Total Amount" readonly/>
                                <span class="input-group-text">₹</span>
                            </div>
                        </td>
                        <td>
                            <div class="d-inline-flex gap-3">
                                <button class="btn btn-outline-danger remove">
                                    <i class="bi bi-trash m-0"></i>
                                </button>
                                <button class="btn btn-dark" id="btnaddnew">
                                    Add
                                </button>
                            </div>
                        </td>
                    </tr>`;
                $('#tbody').append(dynamicRowHTML);
                $('.product-select').select2(); // Initialize Select2 on the new select element
                count++;
            }).fail(() => {
                alert('Failed to fetch medicines.');
            });
        });

        $('#tbody').on('click', '.remove', function () {
            $(this).closest('.rowClass').remove();
            txtonChange();
        });

        $('body').on('change', '.form-control', function () {
            txtonChange();
        });

        $('body').on('change', '.form-select', function () {
            txtonChange();
        });

        // Initialize Select2 on existing product-select elements if any
        $('.product-select').select2();
                                        
        $('#txtProduct0').options($'{ options }');
    });



    function txtonChange() {
        let subtotal = 0;
        let totalDiscount = 0;
        let totalVAT = 0;

        $('.rowClass').each(function (index, element) {
            let qty = parseFloat($(element).find('input[id^="txtQty"]').val()) || 0;
            let price = parseFloat($(element).find('input[id^="txtPrice"]').val()) || 0;
            let vat = parseFloat($(element).find('input[id^="txtVat"]').val()) || 0;
            let discount = parseFloat($(element).find('input[id^="txtDiscount"]').val()) || 0;

            let total = qty * price;
            let vatAmount = (total * vat) / 100;
            let discountAmount = (total * discount) / 100;

            let netAmount = total + vatAmount - discountAmount;

            subtotal += total;
            totalVAT += vatAmount;
            totalDiscount += discountAmount;

            $(element).find('input[id^="txtTotalAmount"]').val(netAmount.toFixed(2));
        });

        $('#subtotal').text(`₹${subtotal.toFixed(2)}`);
        $('#vatAmount').text(`₹${totalVAT.toFixed(2)}`);
        $('#discountAmount').text(`₹${totalDiscount.toFixed(2)}`);
        $('#totalAmount').text(`₹${(subtotal + totalVAT - totalDiscount).toFixed(2)}`);
    }

    function CreateInvoice() {
        let invoiceData = {
            CustomerName: $('#txtName').val(),
            Email: $('#txtEmail').val(),
            Phone: $('#txtPhone').val(),
            Address: $('#txtAddress').val(),
            Subtotal: parseFloat($('#subtotal').text().replace('₹', '')) || 0,
            DiscountAmount: parseFloat($('#discountAmount').text().replace('₹', '')) || 0,
            TotalVAT: parseFloat($('#vatAmount').text().replace('₹', '')) || 0,
            TotalAmount: parseFloat($('#totalAmount').text().replace('₹', '')) || 0,
            Items: [],
            Transactions: []
        };

        let Transaction = {
            Id: "ertre44",
            Mode: "fgfg",
            IsPaid: true,
            DueDate: "",
        };
        invoiceData.Transactions.push(Transaction);

        $('.rowClass').each(function (index, element) {
            let quantity = parseFloat($(element).find('input[id^="txtQty"]').val()) || 0;
            let price = parseFloat($(element).find('input[id^="txtPrice"]').val()) || 0;
            let discountPercent = parseFloat($(element).find('input[id^="txtDiscount"]').val()) || 0;
            let vatPercent = parseFloat($(element).find('input[id^="txtVat"]').val()) || 0;

            let subAmount = quantity * price;
            let discountAmount = (subAmount * discountPercent) / 100;
            let vatAmount = (subAmount * vatPercent) / 100;
            let totalAmount = subAmount - discountAmount + vatAmount;

            let item = {
                Service: $(element).find('select[id^="txtService"]').val(),
                Product: $(element).find('input[id^="txtProduct"]').val(),
                Quantity: quantity,
                Unit: $(element).find('select[id^="txtUnit"]').val(),
                Price: price,
                VAT: vatPercent,
                Discount: discountPercent,
                SingleDiscountAmount: discountAmount,
                SubAmount: subAmount,
                TotalAmount: totalAmount
            };

            invoiceData.Items.push(item);
        });

        $.ajax({
            url: '/AddInvoice',
            type: 'POST',
            data: JSON.stringify(invoiceData),
            contentType: 'application/json',
            success: function (response) {
                alert('Invoice Created Successfully');
                //window.location.href = '@Url.Action("Index", "Invoices")';
            },
            error: function (error) {
                console.log(error);
                alert('Error Creating Invoice');
            }
        });
    }








    // function CreateInvoice() {
            //     let invoiceData = {
            //         CustomerName: $('#txtName').val(),
            //         Email: $('#txtEmail').val(),
            //         Phone: $('#txtPhone').val(),
            //         Address: $('#txtAddress').val(),
            //         Subtotal: parseFloat($('#subtotal').text().replace('₹', '')) || 0,
            //         DiscountAmount: parseFloat($('#discountAmount').text().replace('₹', '')) || 0,
            //         TotalVAT: parseFloat($('#vatAmount').text().replace('₹', '')) || 0,
            //         TotalAmount: parseFloat($('#totalAmount').text().replace('₹', '')) || 0,
            //         Items: []
            //     };

            //     $('.rowClass').each(function (index, element) {
            //         let item = {
            //             Service: $(element).find('select[id^="txtService"]').val(),
            //             Product: $(element).find('input[id^="txtProduct"]').val(),
            //             Quantity: parseFloat($(element).find('input[id^="txtQty"]').val()) || 0,
            //             Unit: $(element).find('select[id^="txtUnit"]').val(),
            //             Price: parseFloat($(element).find('input[id^="txtPrice"]').val()) || 0,
            //             VAT: parseFloat($(element).find('input[id^="txtVat"]').val()) || 0,
            //             Discount: parseFloat($(element).find('input[id^="txtDiscount"]').val()) || 0,
            //             TotalAmount: parseFloat($(element).find('input[id^="txtTotalAmount"]').val()) || 0
            //         };

            //         invoiceData.Items.push(item);
            //     });

            //     $.ajax({
            //         url: '/AddInvoice',
            //         type: 'POST',
            //         data: JSON.stringify(invoiceData),
            //         contentType: 'application/json',
            //         success: function (response) {
            //             alert('Invoice Created Successfully');
            //             //window.location.href = '@Url.Action("Index", "Invoices")';
            //         },
            //         error: function (error) {
            //             console.log(error);
            //             alert('Error Creating Invoice');
            //         }
            //     });
            // }


            function GetMedicines() {
                return $.post('/GetMedicine')
                    .then(function (med) {
                        let options = '<option>Select Product</option>';
                        med.forEach(function (item) {
                            options += `<option value="${item.medicineID}">${item.name}</option>`;
                        });
                        return options;
                    })
                    .catch(function () {
                        debugger;
                        alert('Failed to fetch medicines.');
                        return '<option>Select Product</option>';
                    });
            }
    GetMedicines();

    </script>

[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{nameof(ApplicationRoles.Admin)}")]
alter PROCEDURE Proc_GetPurchasesService
@UserEmail nvarchar(255)
AS
BEGIN
IF(@UserEmail ='All')
BEGIN
SELECT * FROM Purchases;
END
ELSE
BEGIN
SELECT * FROM Purchases WHERE UserEmail LIKE '%' + @UserEmail + '%';
END
END  

alter PROCEDURE Proc_GetPremiumService
@ServiceName NVARCHAR(100) = NULL
AS
BEGIN
IF(@ServiceName = 'All')
BEGIN
SELECT * FROM PremiumServices;
END
ELSE
BEGIN
SELECT * FROM PremiumServices WHERE ServiceName LIKE '%' + @ServiceName + '%';
END
END





 public async Task < IActionResult > UploadImageInDictionary([FromForm] DictionaryImgUploadReq req)
{
    if (req.Image != null) {
        var res = new Service.Models.Response
        {
            StatusCode = ResponseStatus.Failed,
                ResponseText = "An error han occurred try after sometime."
        };
        var uploadImage = _fileUploadService.Upload(new FileUploadModel
                {
                file = req.Image,
                FileName = $"{DateTime.Now.ToString("ddmmyyhhssmmttt")}",
                FilePath =  FileDirectories.DictionaryImage,
            });
        if (uploadImage.StatusCode != ResponseStatus.Success) {
            res.ResponseText = uploadImage.ResponseText;
            return Ok(res);
        }
        req.ImagePath = uploadImage.ResponseText;
    }

    return Ok(await _specificationMaster.UploadImageInDictionary(new RequestBase < DictionaryImgUploadReq >
    {
        Data = req,
        LoginId = User.GetLoggedInUserId < int > ()
    }));
}




                public async Task < ActionResult > UploadImageInDictionary([FromForm]DictionaryImgUploadReq req)
{


    var response = new Response
    {
        ResponseText = "Failed to save Image.",
            StatusCode = ResponseStatus.Failed
    };
    try {
        req.ImagePath = string.Empty;
        var apiRes = await AppWebRequest.O.SendFileAndContentAsync($"{_BaseURL}/api/Specification/UploadImageInDictionary", User.GetLoggedInUserToken(), req, req.Image, null);
        var apiResponse = await apiRes.Content.ReadAsStringAsync();
        if (apiRes != null && apiRes.IsSuccessStatusCode) {
            response = JsonConvert.DeserializeObject < Response > (apiResponse);
        }
    }
    catch (Exception ex)
    {
        response.ResponseText = "An error has ocurred try after sometime!";
    }
    if (response.StatusCode == ResponseStatus.Success) {
        return Ok(response);
    }
    return BadRequest(response);
}

        public async Task < HttpResponseMessage > SendFileAndContentAsync < TContent > (string apiUrl, string authToken, TContent contentData, Microsoft.AspNetCore.Http.IFormFile file, Microsoft.AspNetCore.Http.IFormFile file1 = null)
{
    try {
        using(var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, apiUrl))
                    {

                        if (!string.IsNullOrEmpty(authToken))
        {
            request.Headers.Add("Authorization", $"Bearer {authToken}");
        }
        var formData = new MultipartFormDataContent();
        if (contentData != null) {
            // Add content parameters
            foreach(var property in typeof (TContent).GetProperties())
            {
                var __value = property.GetValue(contentData);
                if (__value != null) {
                    if (__value.GetType().Name.ToUpper() == "FORMFILE") {
                        file = (Microsoft.AspNetCore.Http.FormFile)__value;
                        if (file != null) {
                            // Add the file to the FormData
                            var fileStream = file.OpenReadStream();
                            var fileContent = new StreamContent(fileStream);
                            formData.Add(fileContent, property.Name, file.FileName);
                        }
                    }
                    else {
                        formData.Add(new StringContent(__value.ToString()), property.Name);
                    }
                }
            }
        }
        request.Content = formData;
        // Send the request
        var res = await httpClient.SendAsync(request);
        return res;
    }

                }
            }
            catch (Exception ex)
{
    throw;
}
        }




public async Task < HttpResponseMessage > SendFileAndContentAsync < TContent > (string apiUrl, string authToken, TContent contentData)
{
    try {
        using(var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, apiUrl))
                    {

                        if (!string.IsNullOrEmpty(authToken))
        {
            request.Headers.Add("Authorization", $"Bearer {authToken}");
        }
        var formData = new MultipartFormDataContent();
        if (contentData != null) {
            // Add content parameters
            foreach(var property in typeof (TContent).GetProperties())
            {
                var __value = property.GetValue(contentData);
                if (__value != null) {
                    if (__value.GetType().IsGenericType && __value.GetType().GetGenericTypeDefinition() == typeof (List <>)) {
                        foreach(var item in (List < Microsoft.AspNetCore.Http.IFormFile >)__value)
                        {
                            var file = (Microsoft.AspNetCore.Http.FormFile)item;
                            if (file != null) {
                                // Add the file to the FormData
                                var fileStream = file.OpenReadStream();
                                var fileContent = new StreamContent(fileStream);
                                formData.Add(fileContent, property.Name, file.FileName);
                            }
                        }
                    }
                    else {
                        formData.Add(new StringContent(__value.ToString()), property.Name);
                    }
                }
            }
        }
        request.Content = formData;
        // Send the request
        var res = await httpClient.SendAsync(request);
        return res;
    }

                }
            }
            catch (Exception ex)
{
    throw;
}
        }



public string GetFormatedNotifications(string template, NotificationKeywordsReplacement param)
{
            StringBuilder sb = new StringBuilder(template);

    sb.Replace("{AuctionOpenAt}", param.AuctionOpenAt);
    sb.Replace("{AuctionEndAt}", param.AuctionEndAt);
    sb.Replace("{AccountNumber}", param.AccountNumber);
    sb.Replace("{Amount}", param.Amount?.ToString());
    sb.Replace("{BalanceAmount}", param.BalanceAmount?.ToString());
    sb.Replace("{BidAmount}", param.BidAmount?.ToString());
    sb.Replace("{BidderName}", param.BidderName);
    sb.Replace("{BidSubmissionDate}", param.BidSubmissionDate);
    sb.Replace("{CompanyAddress}", param.CompanyAddress);
    sb.Replace("{CompanyDomain}", param.CompanyDomain);
    sb.Replace("{CompanyEmail}", param.CompanyEmail);
    sb.Replace("{CompanyMobile}", param.CompanyMobile);
    sb.Replace("{CompanyName}", param.CompanyName);
    sb.Replace("{FromMobileNo}", param.FromMobileNo);
    sb.Replace("{FromUserName}", param.FromUserName);
    sb.Replace("{IFSC}", param.IFSC);
    sb.Replace("{LoginID}", param.LoginID);
    sb.Replace("{Message}", param.Message);
    sb.Replace("{Mobile}", param.Mobile);
    sb.Replace("{OTP}", param.OTP);
    sb.Replace("{Password}", param.Password);
    sb.Replace("{PinPassword}", param.PinPassword);
    sb.Replace("{ProductName}", param.ProductName);
    sb.Replace("{RecipientName}", param.RecipientName);
    sb.Replace("{SenderName}", param.SenderName);
    sb.Replace("{ToMobileNo}", param.ToMobileNo);
    sb.Replace("{ToUserName}", param.ToUserName);
    sb.Replace("{TransactionID}", param.TransactionID);
    sb.Replace("{TransactionDate}", param.TransactionDate);
    sb.Replace("{TransMode}", param.TransMode);
    sb.Replace("{UserEmail}", param.UserEmail);
    sb.Replace("{UserName}", param.UserName);
    sb.Replace("{UTRorRRN}", param.UTRorRRN);


    return sb.ToString();
}
