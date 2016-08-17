jQuery(function () {

  var $bib_uri_input = $('input#form-widgets-bibliographic_uri');
  if ($bib_uri_input.length){
    var $lookup = $('<button class="BibInfoFetchButton" title="Fetch bibliographic data"><span>Fetch Bib Info</span></button>');
    $bib_uri_input.after($lookup);
    $lookup.click(function (ev) {
      var uri = $bib_uri_input.val();
      ev.preventDefault();
      if (uri) {
        var p_url = portal_url[portal_url.length - 1] != '/' ? portal_url : portal_url.substring(0, portal_url.length - 1)
        var fetch_url = p_url + '/@@fetch-bibliographic-data';
        $.getJSON(
          fetch_url,
          {"url": uri},
          function (data) {
            if (data.error) {
              alert(data.error);
              return;
            }
            var $title = $bib_uri_input.parents().find('#form-widgets-title');
            var $detail = $bib_uri_input.parents().find('#form-widgets-citation_detail');
            var $formatted = $bib_uri_input.parents().find('#form-widgets-formatted_citation');
            var $access_uri = $bib_uri_input.parents().find('#form-widgets-access_uri');
            if (data.short_title || data.title) {
              $title.val(data.short_title || data.title || '');
            }
            if (data.citation_detail) {
              $detail.val(data.citation_detail);
            }
            if (data.formatted_citation) {
              $formatted.val(data.formatted_citation);
            }
            if (data.access_uri) {
              $access_uri.val(data.access_uri);
            }
          }
        ).error(function (resp) {var data = JSON.parse(resp.responseText); alert(data.error);});
      }
      return false;
    });
  }
});