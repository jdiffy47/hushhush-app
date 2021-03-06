import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
})
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
      profile,
      isSelf
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createDetail(req, res) {
  Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.details.push(req.body)
      profile.save()
      .then(() => {
        res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
}

export {
  index,
  show,
  createDetail
}