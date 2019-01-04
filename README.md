# sweet-axios

axios with sweet alert | 自动提示进度的axios 

![screenshot](./screenshot.gif)

## usage | 使用

```
npm i sweet-axios --save-dev
```

```
import sweetAxios from 'sweet-axios'
const request = sweetAxios()

document.getElementById('test').addEventListener('click', () => {
  request.get('/test.json').then(console.log)
})
```

## run example | 运行示例

```
git clone https://github.com/postor/sweet-axios.git
cd sweet-axios
npm i
npm run dev
```

## customize | 定制

```
import sweetAxios from 'sweet-axios'
const request = sweetAxios({
  start: ()=>{},    //when request starts | 请求开始时的动作
  progress: (e)=>{}, //when progress | 进度更新动作  progressEvent refer https://github.com/axios/axios
  end: ()=>{},      //when request ends | 请求结束动作
})
```

default values refer | 默认值参考

[src/index.js line 7](./src/index.js)