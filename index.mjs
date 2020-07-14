import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import useragent from 'express-useragent';
const app = express();
const stats = {
    dates: {}
};
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5000
});

function html(title, url, image, description) {
    return `<!DOCTYPE html><html><head><meta name="author" content="DeltaUser"><title>${title}</title><meta property="og:title" content="${title}"><meta property="og:type" content="website"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta property="og:description" content="${description}"></head></html>`;
}

app.set('trust proxy', 1);
app.use(limiter);
app.use(useragent.express());
app.use(cors());
app.use(bodyParser.json());

(async () => {
    app.listen(process.env.PORT || 5000, () => console.log(`[Interact] Listening to http://localhost:${process.env.PORT || 5000}/`));
    app.get('/', (req, res) => {
        res.redirect('https://deltauser.github.io/macrot/');
    });
    app.get('/api/status', (req, res) => {
        if(req.useragent.isBot) return res.send(html('Status', 'https://macrot.herokuapp.com/api/status', 'https://deltauser.github.io/macrot/icon.png', `Current status.`));
        res.send({dashboard: true});
    });
})();