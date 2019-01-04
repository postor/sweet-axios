import sweetAgent from './index'
const request = sweetAgent()

//import request from 'axios'

document.getElementById('test').addEventListener('click', () => {
  request.get('/test.json').then(console.log)
})

document.getElementById('post').addEventListener('click', () => {
  const input = document.getElementById('file')
  if (!input.files.length) {
    alert('select file first')
    return
  }
  const form = new FormData()
  form.append('file', input.files[0])

  request.post('/post', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(console.log)
})