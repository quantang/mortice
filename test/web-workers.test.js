import test from 'ava'
import exec from 'execa'
import path from 'path'
import browserify from 'browserify'

test('execute locks in correct order', async (t) => {
  const result = await exec('run-headless', {
    input: browserify([path.join(__dirname, 'fixtures', 'web-workers.js')]).bundle()
  })

  t.is(result.stdout, `write 1 waiting
read 1 waiting
read 2 waiting
read 3 waiting
write 2 waiting
read 4 waiting
write 1 start
write 1 complete
read 1 start
read 1 complete
read 2 start
read 2 complete
read 3 start
read 3 complete
write 2 start
write 2 complete
read 4 start
read 4 complete`)
})

test('execute locks in correct order on single thread', async (t) => {
  const result = await exec('run-headless', {
    input: browserify([path.join(__dirname, 'fixtures', 'web-workers-single-thread.js')]).bundle()
  })

  t.is(result.stdout, `write 1 waiting
read 1 waiting
read 2 waiting
read 3 waiting
write 2 waiting
read 4 waiting
write 1 start
write 1 complete
read 1 start
read 1 complete
read 2 start
read 2 complete
read 3 start
read 3 complete
write 2 start
write 2 complete
read 4 start
read 4 complete`)
})
