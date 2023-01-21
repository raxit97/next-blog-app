const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "raxitjain",
        mongodb_password: "2bomPDCMFEeiZ9Qr",
        mongodb_clustername: "cluster0",
        mongodb_database: "posts-dev"
      }
    }
  }
  return {
    env: {
      mongodb_username: "raxitjain",
      mongodb_password: "2bomPDCMFEeiZ9Qr",
      mongodb_clustername: "cluster0",
      mongodb_database: "posts"
    }
  }
}
