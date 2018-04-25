$(function () {
    $('.customer').each(function (i, obj) {
        var id = $(obj).data("id");
        console.log(id);
        $.get(`/api/customers/${id}`)
            .then((data) => {
                console.log(data);
                for (var j = 0; j < data.length; j++) {
                    $(this).append(data[j].burger_name);
                }
            });
    });

    $("body").on("click", ".burger-button", function (event) {
        var id = $(this).data("id");
        var customer = $(`#${id}-input`).val();
        console.log(customer);
        $.ajax(`/api/burgers/${id}/${customer}`, { type: "PUT" }).then(function () {
            console.log("Devoured burger.");
            location.reload();
        });
    });

    $("#burger-form").submit(function (event) {
        event.preventDefault();
        var $form = $(this);
        var name = $form.find("input[name='name']").val();
        var burger = { "name": name };
        $.post("/api/burgers", burger).then(function (data) {
            location.reload();
        });
    });

    $("body").on("click", ".delete-button", function () {
        var id = $(this).data("id");
        $.ajax(`/api/burgers/${id}`, { type: "DELETE" }).then(function (data) {
            location.reload();
        })
    });
});