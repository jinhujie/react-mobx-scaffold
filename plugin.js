const { ABSOLUTE_PUBLIC_PATH } = require('./env');
// const mode = argvModeIndex !== '-1' ? process.argv[argvModeIndex + 1] : undefined;
// const isDevMode = mode === 'development';
// const publicPath = isDevMode ? '' : ABSOLUTE_PUBLIC_PATH;
const publicPath = ABSOLUTE_PUBLIC_PATH;

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
          //TODO: HTML PUBLIC PATH NOT WORK
          var htmlPublicPath = 'page/';
          var htmlNameWhithoutPath = htmlName.replace(htmlPublicPath, '');
          var shouldInsertChunk = chunk.name.indexOf(htmlNameWhithoutPath)
           !== -1 && htmlNameWhithoutPath !== chunk.name;

          function getHmltNode (file) {
            var fileType = file.match(/\.[^\.]+$/)
            var htmlNode = {
              '.css': `<link href="${publicPath}${file}" rel="stylesheet">`,
              '.js': `<script type="text/javascript" src="${publicPath}${file}"></script>`
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
              //TODO: HTML PUBLIC PATH NOT WORK
              var htmlNode = getHmltNode('/' + file);
              // console.log("=====")
              // console.log(file, htmlNode);
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
        var commonCssTag;
        var cssLinkTags = data.html.match(/<link[^>]+>/g);
        for(var j = 0; j < cssLinkTags.length; j++) {
          var link = cssLinkTags[j];
          if (/common\.css/.test(link)){
            commonCssTag = link;
          }
        }
        data.html = data.html.replace(commonCssTag, '');
        data.html = data.html.replace('<body>', '<body>' + commonCssTag);

        cb(null, data)
      }
    )
  })
}

module.exports = MyPlugin;