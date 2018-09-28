function reverseString(string) {
    let words = string.split(' ');
    let reversedWords = [];
    words.forEach((word) => {
        let temp = [...word];
        temp.reverse();
        reversedWords.push(temp.join(''));
    });
    return reversedWords.join(' ');
}

console.log(reverseString('Hello world this is a sentence'));
