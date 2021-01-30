$(document).ready(function() {
    $('input[type=checkbox]').change(function() {
    
    if (this.checked) {
    $(this).next(".label-text").css("text-decoration-line", "line-through");
    } else {
    $(this).next(".label-text").css("text-decoration-line", "none");
    }
    
    });
    });