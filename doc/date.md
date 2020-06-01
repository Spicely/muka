### date

方法 | 参数类型 | 必须 | 返回值 
:--- | :---: | :---: | ---:
getDate |string| 否 | Object

``` javascript
    let time = date.getDate()
    // console.log(time)
    // {
    //     date: Mon Mar 12 2018 18:45:30 GMT+0800 (CST) {},
    //     day: '12',
    //     hours: '18',
    //     milliSeconds: '164',
    //     minutes: '45',
    //     month: '03',
    //     seconds: '30',
    //     year: '2018'
    // } 
    time = date.getDate('2018-01-01')
    // console.log(time)
    // {
    //     date:Mon Jan 01 2018 08:00:00 GMT+0800 (CST) {},
    //     day:'01',
    //     hours:'08',
    //     milliSeconds:'0',
    //     minutes:'0',
    //     month:'01',
    //     seconds:'0',
    //     year:'2018'
    // }
```