#!/bin/sh

# Start backend and frontend concurrently for local development

set -e

(cd server && npm install && npm run dev) &
(cd client && npm install && npm run dev) &

wait

