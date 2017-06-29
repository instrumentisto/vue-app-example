#!/usr/bin/env node

const favicon = require('serve-favicon');
const fs = require('fs');
const path = require('path');
const express = require('express');
const onDeath = require('death')({SIGHUP: true});
const acceptLanguageParser = require('accept-language-parser');
const resolve = (file) => path.resolve(__dirname, file);

const renderer = require('vue-server-renderer')
    .createBundleRenderer(require('./vue-ssr-bundle.json'), {
        runInNewContext: false,
        template: fs.readFileSync(
            resolve('./index.server.html'), 'utf-8'
        ),
    });

const app = express();

app.use(favicon(resolve('./img/logo.png')));

app.use(express.static('./', {
    index: false,
}));

app.get('*', (req, res) => {
    let acceptLanguages = [];
    for (
        let lang of acceptLanguageParser.parse(req.headers['accept-language'])
        ) {
        acceptLanguages.push(lang.code);
    }
    res.setHeader('Content-Type', 'text/html');

    const context = {url: req.url, accept_languages: acceptLanguages};

    renderer.renderToString(context, (error, html) => {
        if (error) {
            switch (error.code) {
            case 404:
                res.status(404).end('404 | Page Not Found');
                break;
            case 500:
                res.status(500).end('500 | Internal Server Error');
                break;
            default:
                res.end('Unknown server error');
            }
            console.error(`Error during render "${req.url}": ${error.message}`);
            return;
        }
        const {title, meta} = context.meta.inject();
        html = html.replace('#{metaInfo}', title.text() + meta.text());
        res.end(html);
    });
});

app.listen(8080);

onDeath(function(signal) {
    console.log(`Received "${signal}" signal`);
    process.exit();
});
