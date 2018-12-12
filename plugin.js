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
          var shouldInsertChunk = chunk.name.indexOf(htmlName) !== -1 && htmlName !== chunk.name;

          function getHmltNode (file) {
            var fileType = file.match(/\.[^\.]+$/)
            var htmlNode = {
              '.css': `<link href="${file}" rel="stylesheet">`,
              '.js': `<script type="text/javascript" src="${file}"></script>`
            };
            
            if (fileType) {
              return {
                node: htmlNode[fileType[0]],
                type: fileType[0]
              }
            } 
          }
          
          if(shouldInsertChunk){
            for (var i = 0; i< chunk.files.length; i++){
              var file = chunk.files[i];
              var htmlNode = getHmltNode(file);
              if (htmlNode) {
                var translateTarget = {
                  '.css': '</head>',
                  '.js': '</body>'
                }
                data.html = data.html.replace(
                  translateTarget[htmlNode.type],
                  `${htmlNode.node}` + translateTarget[htmlNode.type]
                );
              }
            }
          }
        });

        cb(null, data)
      }
    )
  })
}

module.exports = MyPlugin;