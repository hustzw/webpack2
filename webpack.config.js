var htmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpack = require('webpack');

module.exports = {
	// context: __dirname,
	// 入口文件，单页式.
	entry: './src/app.js',

	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].bundle.js'//,
		// publicPath: 'http:cdn/ss'
	},
	// node: {
	//   fs: "empty"
	// },

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src'), //path.resolve 对node_modules 进行引用
				exclude: path.resolve(__dirname, 'node_modules'),// 不处理node_modules 下文件，耗时
				// 打包速度
				query: {
					presets: ['latest']
				}
			}, {
			    test: /\.html$/,
			    loader: 'html-loader',
			    // query: {
			    //   minimize: true
			    // }
			}, { 
				test: /\.css$/,
				// loader: "style-loader!css-loader?importLoaders=1!postcss-loader",
				use: [{
						loader: "style-loader", 
					}, {
						loader: "css-loader",
						options: {
                            importLoaders: 1
                        }
					},//这里是为了把css里的@import先执行第一个loader
                  	{
                    	loader: "postcss-loader"
                    	// options:{
	                    //     plugins:function(){
	                    //         return [
	                    //             require('precss'),
	                    //             require('autoprefixer')({broswers:['last 5 versions']})
	                    //         ];
	                    //     }
	                    // }

                    }
				]
				// loaders: ["style-loader", "css-loader", "postcss-loader"]
			}
			//  {
			// 	test: /\.scss$/,
			// 	// loader: 'sass-loader'
			// 	use: ['css-loader', 'sass-loader']
			// }
		]
	},
	// postcss: function () {
	// 	return [
	// 		require('autoprefixer')({
	// 			broswers:['last 5 versions']
	// 		})
	// 	]
	// },
	plugins:[
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body'//,
			// title: 'This is a.html',
			// chunks:['main', 'a']
		}),
		// 将css成生文件，而非内联，ExtractTextPlugin
		new ExtractTextPlugin("styles.css"),
		// new webpack.LoaderOptionsPlugin({
  //           options: {
  //               postcss: function(){
  //                   return [
  //                       require("autoprefixer")({
  //                           browsers: ['ie>=8','>1% in CN']
  //                       })
  //                   ]
  //               }
  //           }
  //       })
		// ,
		// new htmlWebpackPlugin({
		// 	filename: 'a.html',
		// 	template: 'index.html',
		// 	inject: 'body',
		// 	title: 'This is a.html',
		// 	chunks:['main', a]
		// })
	]
}