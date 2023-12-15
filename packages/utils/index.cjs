'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/utils.prod.cjs')
} else {
  module.exports = require('./dist/utils.cjs')
}
