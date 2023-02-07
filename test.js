const { User, Following, Link } = require('./models')
const Sequelize = require('sequelize')
const main = async () => {
  const req = { user: { id: 2 } }
  const _data = await User.findOne({
    where: { username: 'halo' },
    include: { model: User, as: 'Followings' },
  })

  const data = JSON.parse(JSON.stringify(_data))

  // data.followed = req.user
  //   ? !!data.Followers.find(({ id }) => id == req.user.id)
  //   : false
  // data.following = req.user
  //   ? !!data.Followings.find(({ id }) => id == req.user.id)
  //   : false

  // data.Followings = data.Followings.length
  // data.Followers = data.Followers.length
  console.log(JSON.parse(JSON.stringify(data)))
}

main()
