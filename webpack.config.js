const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: 'style.bundle.css'
});

// required for HMR (Hot Module Replacement) - also in devServer hot: true, in plugins: new webpack.HotModuleReplacementPlugin()
// HMR doesn't work with ExtractTextPlugin, so i disabled if for development mode
const webpack = require('webpack');

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
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
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
        extractSass
    ]
};