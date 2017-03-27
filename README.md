# vue-smooth-picker
🏄🏼 A SmoothPicker for Vue 2

* Can be singleton
* Programmable

## Example

[Live demo](https://hiyali.github.io/vue-smooth-picker)

### Screenshot

![screenshot](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/master/assets/smooth-picker-screenshot.png "screenshot")

## usage
```javascript
import SmoothPicker from 'smooth-picker'
...
components: {
  SmoothPicker
}
...
<SmoothPicker :data="data" :change="change" />
```

### for singleton
```html
<head>
  ...
  <link rel="stylesheet" href="./smooth-picker/dist/css/style.css">
</head>
<body>
  ...
  <script src="./smooth-picker/dist/smooth-picker.js"></script>
	// your code
  ...
</body>
```

## with some option
```javascript
<smooth-picker :data="data" :change="change" />
```

| option         | type       |  default      | other value    |
| :------------- | :--------- | :------------ | :----------- |
| `data`         | `Array`    | []            |              |
| `change`       | `Function` |               | Callback after data current index changed |

## Development / build / exmaple
```shell
npm run dev # development
npm run build # build
npm run example # build example file
```
