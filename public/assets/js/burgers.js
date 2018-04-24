$(function () {
    $("body").on("click", ".burger-button", function (event) {
        var id = $(this).data("id");
        $.ajax(`/api/burgers/${id}`, {type:"PUT"}).then(function() {
            console.log("Devoured burger.");
            location.reload();
        });
    });

    $("#burger-form").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        var name = $form.find("input[name='name']").val();
        var burger = {"name": name};
        $.post("/api/burgers", burger).then(function(data) {
            location.reload();
        });
    });

    $("body").on("click", ".delete-button", function() {
        var id = $(this).data("id");
        $.ajax(`/api/burgers/${id}`, {type: "DELETE"}).then(function(data) {
            location.reload();
        })
    });
});