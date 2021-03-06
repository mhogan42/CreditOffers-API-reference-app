$(function() {
  $('.apply-btn').click(function(evt) {
    if ($('.auth-btn').hasClass('logout-btn')) {
      let href = $(this).attr('href')
      $('form[name="prefill-acceptance"]').data('link', href)
      $('a.deny-prefill').attr('href', href)
      $('#prefill-acceptance').modal().on('hidden.bs.modal', () => {
        $('#prefill-acceptance .text-danger').addClass('hidden')
      })
      evt.preventDefault()
    }
  })

  //Prefill append applicantDetailsKey to link url
  $('form[name="prefill-acceptance"]').submit(function(evt) {
    let link = $(this).data('link')
    let $spinner = $(this).find('.spinner')
    $spinner.removeClass('hidden')
    $.ajax({
      type: "POST",
      url: this.action,
      data: $(this).serialize(), // serializes the form's elements.
      xhrFields: {
        withCredentials: true
      },
      success: function(data) {
        link += encodeURIComponent(`&applicantDetailsKey=${data.applicantDetailsKey}`)
      },
      error: function(err) {
        $('#prefill-acceptance .text-danger.hidden').removeClass('hidden')
      },
      complete: function() {
        $spinner.addClass('hidden')
        let win = window.open(link, '_blank')
        if (win) {
          win.focus();
        } else {
          alert('Please allow popups for this website');
        }
      }
    });
    evt.preventDefault();
  });
});
