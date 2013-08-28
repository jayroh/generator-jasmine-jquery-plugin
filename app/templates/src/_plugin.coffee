$.fn.extend
  <%= pluginSlugified %>: (options) ->
    self = $.fn.<%= pluginSlugified %>
    options = $.extend {}, self.default_options, options
    $(this).each (i, el) ->
      self.init el, options

$.extend $.fn.<%= pluginSlugified %>,
  version:
    '0.0.1'
  default_options:
    editor: 'vim'
    awesome: true
