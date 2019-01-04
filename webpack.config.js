const path = require('path');

module.exports = ()=>{
  return {
    entry: {
      index:'./src/index.js',
      test:'./src/test.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: false,
      port: 9000,
      setup(app){
        app.post('/post',(req,res)=>res.json({done:true}))
      }
    }
  }
}