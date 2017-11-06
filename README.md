# Visual debugging for CasperJS

Here is how it looks:

![Demo](https://github.com/vxsx/casperjs-visual-debugging/raw/master/demo.gif)

It works like this:
- your test grabs the screen as CasperJS sees it every X ms
- it posts the image to the receiving server (this repo)
- server then sends it via a websocket to the browser
- browser displays the images in a sequence, giving the feel of the video

After that here is also a range input that allows to go back in time to see what was happening before.

## Setup

1. `git clone` and eventually `npm install`
2. `node index.js`
3. go to http://localhost:8002
4. use the code below in your CasperJS tests to update the image:

```js
// eslint-disable-next-line
function show(casper, port) {
    if (!casper.started) {
        return;
    }
    casper.evaluate(function(opts) {
        var options = JSON.parse(opts);
        var img = options.img;
        var visualPort = options.port;
        // eslint-disable-next-line
        __utils__.sendAJAX('http://localhost:' + visualPort, 'POST', { img: img }, false);
    }, JSON.stringify({ img: casper.captureBase64('png'), port: port }));
}

setInterval(function() {
    show(casper, 8002);
}, 10);
```

You can see the example of the setup here: https://github.com/divio/django-cms/blob/440ff84801537218dd16b47d0f8da7e526d241f7/cms/tests/frontend/integration/setup.js#L14-L33
