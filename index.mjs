import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
const app = express();
app.set('trust proxy', 1);
const stats = {
    dates: {}
};
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5000
});
   
app.use(limiter);
app.use(cors());
app.use(bodyParser.json());

(async () => {
    app.listen(process.env.PORT || 5000, () => console.log(`[Interact] Listening to http://localhost:${process.env.PORT || 5000}/`));
    app.get('/', (req, res) => {
        res.redirect('https://deltauser.github.io/macrot/');
    });
    app.post('/api/stats', (req, res) => {
        if(!stats.dates[new Date().toLocaleString().split(',')[0]]) stats.dates[new Date().toLocaleString().split(',')[0]] = {keys: 0, clicks: 0};
        stats.dates[new Date().toLocaleString().split(',')[0]].keys += req.body.keys;
        stats.dates[new Date().toLocaleString().split(',')[0]].clicks += req.body.clicks;
        res.send(stats);
    });
    app.get('/api/stats', (req, res) => {
        res.send(stats);
    });
})();