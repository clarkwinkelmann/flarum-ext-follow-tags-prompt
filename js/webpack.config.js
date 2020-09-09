config = require('flarum-webpack-config')();

config.externals.push(function (context, request, callback) {
    let matches;
    if ((matches = /^@fof-follow-tags\/(.+)$/.exec(request))) {
        return callback(null, "root flarum.extensions['fof-follow-tags'] && flarum.extensions['fof-follow-tags']['" + matches[1].replace('/', "']['") + "']");
    }
    callback();
});

module.exports = config;
