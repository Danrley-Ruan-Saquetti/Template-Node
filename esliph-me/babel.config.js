module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
	plugins: [['module-resolver', {
		alias: {
			'@database': './src/app/database/index.js',
			'@util': './src/app/util',
			'@module': './src/app/modules',
			'@service': './src/app/services',
			'@@types': './src/@types/*',
			'@public': './public/*'
		}
	}]],
	ignore: [
		'**/*.spec.ts',
		'public',
		'**/*.d.ts',
		'./scr/@types',
		'prisma'
	]
}