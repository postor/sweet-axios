import sweetAxios from './index'
import Swal from 'sweetalert2'
const request = sweetAxios()

//get
document.getElementById('test').addEventListener('click', () => {
  request.get('/test.json').then(console.log)
})

//post
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

//error handle
document.getElementById('error').addEventListener('click', () => {
  request.get('/not-exist.json').then(console.log).catch(e=>{
    Swal.close()
    Swal('Error',e.toString())
  })
})