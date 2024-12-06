const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = [
    { path: '/', file: 'index.html' },
    { path: '/spotify', file: 'spotify.html' },
    { path: '/ss', file: 'ss.html' },
    { path: '/imgur', file: 'Uploader.html' },
    { path: '/shoti', file: 'shoti.html' },
    { path: '/nashbot', file: 'nashbot.html' },
    { path: '/tempmail', file: 'tempmail.html' }
];

routes.forEach(route => {
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', route.file));
    });
});

app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (!userAgent || userAgent.toLowerCase().includes('sitemode') || userAgent.toLowerCase().includes('bot')) {
    res.status(403).send('<h1>This is a Anti Bogart</h1>');
  } else {
    next();
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
