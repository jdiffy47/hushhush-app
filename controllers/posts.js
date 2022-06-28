import { Post } from '../models/post.js'



function index(req, res) {
  Post.find({})
  .then(posts => {
    res.render('posts/index', {
      posts,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Post.create(req.body)
  .then(post => {
    res.redirect('/posts')
  })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
}

function show(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    res.render('posts/show', {
      post
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

export { 
  index,
  create,
  show
}