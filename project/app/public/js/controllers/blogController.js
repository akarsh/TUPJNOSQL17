/*
function BlogController()
{
// bind event listeners to button clicks //
var that = this;

// handle account settings //
$('#btn-accountsettings').click(function(){window.location.href = '/home';});

//handle navigation to main page //
$('#btn-mainpage').click(function(){window.location.href = '/mainPage';});

// confirm account deletion //
	$('#blog-btn-submit').click(function(){$('.modal-confirm').modal('show')});

// // handle account deletion //
// 	$('.modal-confirm .submit').click(function(){ that.createBlog(); });

// 	this.createBlog = function()
// 	{
// 		$('.modal-confirm').modal('hide');
// 		var that = this;
// 		$.ajax({
// 			url: '/blogPost',
// 			type: 'POST',
// 			data: { blogTittle: $('#title-tf').val(), blogData: $('#theblogTextarea').val()},
// 			success: function(data){
// 	 			that.showLockedAlert('Your Blog Has Been Created');
// 			},
// 			error: function(jqXHR){
// 				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
// 			}
// 		});
// 	}

// 	this.showLockedAlert = function(msg){
// 		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
// 		$('.modal-alert .modal-header h4').text('Success!');
// 		$('.modal-alert .modal-body p').html(msg);
// 		$('.modal-alert').modal('show');
// 		$('.modal-alert button').click(function(){window.location.href = '/';})
// 		setTimeout(function(){window.location.href = '/';}, 3000);
// 	}
// }

BlogController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Success!');
	$('.modal-alert .modal-body p').html('Your Blog has Been Created.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
}
*/
function BlogController()
{
// redirect//
	$('#blog-btn-submit').click(function(){window.location.href = '/mainPage';});
}