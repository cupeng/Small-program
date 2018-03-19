module.exports = {
  entry: "src/index.js",
  output: {
  	filename: 'dist/[name].[hash:8].js'
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
      	test: /\.(png|jpg|gif)$/,
      	use: [
      	  {
      	  	loader:"file-loader",
      	  	options: {}
      	  }
      	]
      },
      {
      	test: /\.css$/,
      	use: [
      	  { loader: 'style-loader' },
      	  { loader: 'css-loader' }
      	]
      },
      {
      	test: /\.scss/,
      	use: [
      		{ loader: 'style-loader' },
      		{ loader: 'css-loader' },
      		{ loader: 'sass-loader' }
      	]
      }
    ]
  }
}