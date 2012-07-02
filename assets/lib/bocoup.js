(function() {
window.CodeEditor = function(file, target, opts) {
  var t = $(target);
  var dest = $('<div class="editor">').appendTo(t)[0];

  CodeMirror.keyMap['default']['Shift-Ctrl-;'] = executeShortcut;
  opts = opts || {};

  function setupEditor(editor) {
    if (!opts.noButtons) {
      var clearButton = $('<button class="btn">Clear</button>').prependTo(t);
      var executeButton = $('<button class="btn">Execute Selection</button>').prependTo(t);
      executeButton.click(execute(editor));
      clearButton.click(clear);
    }
  }

  function clear() {
    $('#target').empty();
  }

  function executeShortcut(editor) {
    execute(editor)();
  }

  function execute(editor) {
    return function() {
      var sel = editor.getSelection();
      var fn = new Function(sel);
      clear();
      fn();
    };
  }

  function makeEditor(dest, contents) {
    return CodeMirror(dest, {
      value : contents || ' ',
      mode : opts.mode || 'javascript',
      lineNumbers : true,
      theme : 'default'
    });
  }

  if (file) {
    $.ajax({
      url : file,
      dataType : 'text',
      success : function(f) {
        var editor = makeEditor(dest, f);
        setupEditor(editor);
      }
    });
  } else {
    makeEditor(dest, '');
  }
};

}());
