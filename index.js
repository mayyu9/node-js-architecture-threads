const fs = require('fs');

setTimeout(() => {
    console.log('set timeout 0')
}, 0);

fs.readFile('sample.txt', 'utf-8', () => {
    console.log('file reading io operation done.....');

    // lets register two more callbacks inside the io operation callbacks.
    setTimeout(() => {
        console.log('inside the io operation 1')
    }, 0);
    setTimeout(() => {
        console.log('inside the io operation 2')
    }, 10 * 100);
});

console.log('Hello from nodejs server');


/// output:

// Hello from nodejs server -> as top level code executes first
// all the callbacks got registered
// set timeout 0 -> as this is expired callback
// file reading io operation done..... -> this io operation callback.

// inside the io operation 1 -> as this callbacks register later, event loop gets executed once more to finish this two callbacks
                                //as this was expired callback, so gets executed first.
// inside the io operation 2 -> after 10sec this timer gets expired so this gets executed.