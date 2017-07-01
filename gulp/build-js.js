const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');

const prodConfig = Object.create(require('../webpack.config.js'));

gulp.task('build-js', (callback) => {
	prodConfig.devtool = 'cheap-module-source-map';
	prodConfig.entry.vendor = ['dat-gui', 'detector-webgl', 'stats.js', 'three', 'three-trackballcontrols'];

	prodConfig.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
	);

	webpack(prodConfig, function(err, stats) {
		if(err) throw new gutil.PluginError('build-prod', err);
		gutil.log('[build-prod]', stats.toString({
			colors: true
		}));

		callback();
	});
});
