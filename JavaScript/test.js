var arr = [5, 4, 7, 9, 2, 4, 4, 5, 6];
function smaller(arr){
    var max, min, half;
    var countArr = [];
    max = arr[0];
    min = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    half = Math.round((max - min) / 2);
    var lowHalf = sortLower(arr, half);
    var highHalf = sortHigher(arr, half);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= half) {
            countArr.push(lowFind(lowHalf, arr[i]));
            lowHalf.splice(findIndex(lowHalf, arr[i]), 1);
        }
        else if (arr[i] > half) {
            countArr.push(lowHalf.length + highFind(highHalf, arr[i]));
            highHalf.splice(findIndex(highHalf, arr[i]), 1);
        }
    }
}
function findIndex(arr, val){
    var index;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            index = i;
            break;
        }
    }
    return index;
}
function highFind(arr, val){
    var countArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (val > arr[i]) {
            countArr.push(arr[i]);
        }
    }
    return countArr.length;
}
function lowFind(arr, val){
    var countArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (val > arr[i]) {
            countArr.push(arr[i]);
        }
    }
    return countArr.length;
}
function sortLower(arr, half){
    var lowHalf = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= half) {
            lowHalf.push(arr[i]);
        }
    }
    return lowHalf;
}
function sortHigher(arr, half){
    var highHalf = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > half) {
            highHalf.push(arr[i]);
        }
    }
    return highHalf;
}
smaller(arr);