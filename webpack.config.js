var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var webpack = require('webpack');

var extractSass = new ExtractTextPlugin({
    filename: 'style.bundle.css',
    disable: !isProd
});

var isProd = process.argv.indexOf('-p') !== -1;  //true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = extractSass.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
});
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {

    entry: './src/js/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        // don't show all messages what was done on start - only errors are shown
        stats: 'errors-only',
        // similar to --hot
        hot: true,
        // automaticly open new tab in a browser
        open: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        extractSass
    ]
};
