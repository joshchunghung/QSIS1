module.exports = {
    client: {
        service: {
            name: 'qsis',
            // GraphQL API 的 URL
            url: 'http://140.109.82.44:8012/graphql'
        },
        // 通过扩展名选择需要处理的文件
        includes: [
            'src/**/*.vue',
            'src/**/*.js',
            'src/**/*.ts'
        ]
    }
}
