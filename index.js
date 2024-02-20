const fs = require('fs');
const crypto = require('crypto');

const start = Date.now(); // start time of server

process.env.UV_THREADPOOL_SIZE = 5; // this is by which we can control the thread size.

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

    // adding blocking calls by adding crypto
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(`${Date.now() -start}ms password1 hashing....`)
    });

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(`${Date.now() -start}ms password2 hashing....`)
    })

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(`${Date.now() -start}ms password3 hashing....`)
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(`${Date.now() -start}ms password4 hashing....`)
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(`${Date.now() -start}ms password5 hashing....`)
    })

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

// when we add some blocking code, when we have 4 blocking blocking calls and we have 4 threads in default. execution time for all
// the process is almost same as all four blocking calls execute on a separate thread so time is almost same.

// when we add 5th blocking call, time taken by 5th is more because the thread was busy doing other task.
