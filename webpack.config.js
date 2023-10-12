const path = require('path');

module.exports = {
    //entry file을 정의합니다.
    entry: {
        main: ['./dist/main.js']
    },
    //output으로 생성할 파일을 선언합니다.
    output: {
        path: path.resolve(__dirname, './dist/bundle'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'dist/js')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};