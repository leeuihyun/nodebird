const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZER === "true",
});
module.exports = {
    compress: true,
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === "production";
        return {
            ...config,
            mode: prod ? "production" : "development",
            devtool: prod ? "hiddent-source-map" : "eval",
            plugins: [
                ...config.plugins,
                new webpack.ContextReplacementPlugin(
                    /moment[/\\]locale$/,
                    /^\.\/ko$/
                ),
            ],
        };
    },
};
