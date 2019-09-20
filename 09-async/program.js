function f1Sync(){
    console.log('f1Sync started');
    console.log('f1Sync completed');
}

function f2Sync(){
    console.log('f2Sync started');
    console.log('f2Sync completed');
}

function f3Sync(){
    console.log('f3Sync started');
    console.log('f3Sync completed');
}

function f4Sync(){
    console.log('f4Sync started');
    console.log('f4Sync completed');
}

/*
function runSync(){
    f1Sync();
    f2Sync();
    f3Sync();
    f4Sync();
}
*/

var syncFns = [ f1Sync, f2Sync, f3Sync, f4Sync ];

function runSync(){
    for (let index = 0; index < syncFns.length; index++) {
        const syncFn = syncFns[index];
        syncFn();
    }
}

module.exports['runSync'] = runSync;

function f1Async(callback){
    console.log('f1Async started');
    setTimeout(function(){
        console.log('f1Async completed');
        if (typeof callback === 'function')
            callback();
    }, 5000);
}

function f2Async(callback){
    console.log('f2Async started');
    setTimeout(function(){
        console.log('f2Async completed');
        if (typeof callback === 'function')
            callback();
    }, 3000);
}

function f3Async(callback){
    console.log('f3Async started');
    setTimeout(function(){
        console.log('f3Async completed');
        if (typeof callback === 'function')
            callback();
    }, 4000);
}

function f4Async(callback){
    console.log('f4Async started');
    setTimeout(function(){
        console.log('f4Async completed');
        if (typeof callback === 'function')
            callback();
    }, 2000);
}

/*
function runAsync(){
    f1Async(function(){
        f2Async(function(){
            f3Async(function(){
                f4Async();
            });
        });
    });
}
*/

var asyncFns = [f1Async, f2Async, f3Async, f4Async];

function exec(fns){
    const [first, ...remaining] = fns,
        next = function(){
            exec(remaining);
        };
    if (typeof first === 'function')
        first(next);
}
function runAsync(){
    exec(asyncFns);
}
module.exports['runAsync'] = runAsync;

