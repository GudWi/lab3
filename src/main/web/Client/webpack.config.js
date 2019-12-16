let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
    entry: './src/app.js',
    output: {
    	path: path.resolve(__dirname,'./dist'),
    	filename: 'main.js',
    	publicPath: 'dist/'
    },
    devServer:{
    	overlay:true
    },
    module:{
    	rules:[
    	{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
    	},
        {
            test: /\.css$/,

            use: [
                'style-loader',
                'css-loader'
            ]
            /*
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
            */
        },
        {
              test: /\.html/,
              loader: 'raw-loader'
        },
    ]
    },
    resolve: {
            alias: {
                libraries: path.resolve(__dirname, 'node_modules/'),
                'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery'),
                'Zebra_DatePicker': path.join(__dirname, 'node_modules/zebra_datepicker/dist/zebra_datepicker.min.js')
            }
        }
    /*plugins: [
    new ExtractTextPlugin("styles.css")
    ]*/
};

module.exports = (env, options) => {
    let production = options.mode === 'productions';

    conf.devtool = production
                    ? false
                    : 'eval-sourcemap';

    return conf;
}


