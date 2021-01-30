$(document).ready(function() {
    $('input[type=checkbox]').change(function() {
    
    if (this.checked) {
    $(this).next(".label-text").css("text-decoration-line", "line-through");
    } else {
    $(this).next(".label-text").css("text-decoration-line", "none");
    }
    
    });

    // $('input[id=currentDate]').change(function() {
    
    //     var today = new Date();
    //     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //     return date;
        
    //     });

    });

//     localStorage.setItem("mytime", Date.now());

//     <input type="text" id="currentDate">
// <br><br>
// <script>
//   var today = new Date();
//   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//   document.getElementById("currentDate").value = date;
// </script>