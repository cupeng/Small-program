const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.mode === 'development'

const config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: '[name].min.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /(node_modules)/,
				loader: 'vue-loader'
			},
			{
				test: /\.jsx$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env']
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'}
				]
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					'stylus-loader'
				]
			},
			{
				test:/\.(gif|jpg|jpeg|png|svg)/,
			 	use: [
			 		{
			 			loader: 'url-loader',
			 			options: {
			 				limit: 1024,
			 				name: '[name]-aaa.[ext]'
			 			}
			 		}
			 	]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname,'dist'),
		compress: true,
		port: 3000
	}
}

module.exports = config