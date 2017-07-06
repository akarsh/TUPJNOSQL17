
$(document).ready(function(){

// Popup for Blog Post

$(document).on("click", "#modalBlogPost", function () {
     var myBlogId = $(this).data('id');
     $(".modal-body #blogId").val( myBlogId );
});

});
