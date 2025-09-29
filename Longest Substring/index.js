function longestSubstring(s) {
  let set = new Set();
  let left = 0, maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Example
console.log(longestSubstring("abcabcbb")); // 3 ("abc")
console.log(longestSubstring("bbbbb"));    // 1 ("b")
console.log(longestSubstring("pwwkew"));   // 3 ("wke")




function sortByAge(arr) {
  return arr.sort((a, b) => a.age - b.age);
}

// Example
const people = [
  { name: "Rohit", age: 25 },
  { name: "Aman", age: 20 },
  { name: "Vikas", age: 30 }
];

console.log(sortByAge(people));
/*
[
  { name: "Aman", age: 20 },
  { name: "Rohit", age: 25 },
  { name: "Vikas", age: 30 }
]
*/
