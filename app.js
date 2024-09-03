const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = { title: String, content: String };
const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => Post.find({}, (err, posts) => res.render('index', { posts })));

app.get('/posts/:postId', (req, res) =>
    Post.findById(req.params.postId, (err, post) => res.render('post', { post }))
);

app.get('/compose', (req, res) => res.render('compose'));

app.post('/compose', (req, res) => {
    new Post(req.body).save(() => res.redirect('/'));
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
