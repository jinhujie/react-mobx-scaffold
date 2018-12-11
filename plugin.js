function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
      'MyPlugin',
      (data, cb) => {
        var options = data.plugin.options;
        var htmlName = options.filename.split('.html')[0];

        compilation.chunks.forEach(chunk => {
          if(chunk.name.indexOf(htmlName) !== -1 && htmlName !== chunk.name){
            var scriptTag = `<script type="text/javascript" src="${chunk.name}.js"></script></body>`
            data.html = data.html.replace(
              '</body>',scriptTag
            );
          }
        });

        cb(null, data)
      }
    )
  })
}

module.exports = MyPlugin;