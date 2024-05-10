(function () {
    window.addEventListener("load", function () {
        setTimeout(function () {
            var logo = document.getElementsByClassName('link'); //For Changing The Link On The Logo Image
            logo[0].href = "https://roundpay.in/";
            logo[0].target = "_blank";
            logo[0].children[0].alt = "Implemeting Swagger";
            logo[0].children[0].src = "https://roundpay.in/img/logo.webp"; //For Changing The Logo Image
        });
        setTimeout(function () {
            var url = new URL(location.href);
            var description = document.getElementsByClassName("description");
            console.log('description')
            console.log(description[0]?.innerText);
            description[0].innerHTML = `<div class="renderedMarkdown"><p>Base URL : <a href="#">${url.origin}</a></p></div>`;
        }, 600);
    });
})();