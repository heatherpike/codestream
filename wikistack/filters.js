// Setting custom filters on Swig

module.exports = function(swig) {
  var page_link = function (page) {
    var link_name;
    //dont need to check that title is undefined since we later added required in schema
    if (typeof page.title !== "undefined" && page.title !== "") {
      link_name = page.title
    } else {
      link_name = "Page "+page.url_name;
    }
    return "<a href='"+page.full_route+"'>"+link_name+"</a>";
  };
  page_link.safe = true;

  swig.setFilter('page_link', page_link);

  var markedFilter = function() {
    return marked(text_body);
  }

  markedFilter.safe = true;

  swig.setFilter("marked", markedFilter);
};