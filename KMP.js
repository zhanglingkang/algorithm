/**
 * Created by zhanglingkang on 2014/12/30.
 */
/**
 * KMP算法中的失效函数
 * 输入：一个字符串
 * 输出：一个长度为字符串长度的数组，每个值表示对应索引处的失效值
 */
function failure(str) {
    var t = 0;//保存失效值
    var result = [];
    result[0] = 0;
    for (var index = 1; index < str.length; ++index) {
        while (t > 0 && str.charAt(index) !== str.charAt(t)) {
            t = result[t - 1];
        }
        if (str.charAt(index) === str.charAt(t)) {
            t = t + 1;
            result[index] = t;
        } else {
            result[index] = 0;
        }
    }
    return result;
}
/**
 * 在str中查找keyword
 * @param str
 * @param keyword
 * @returns {boolean}
 */
function search(str, keyword) {
    var failureValue = failure(keyword);
    var i = 0;
    var j = 0;
    for (i = 0; i <= str.length - keyword.length; ++i) {
        for (j = 0; j < keyword.length; ++j) {
            if (str.charAt(i + j) !== keyword.charAt(j)) {
                if (j > 0) {
                    i += j - failureValue[j - 1];
                    j = failureValue[j - 1] - 1;
                } else {
                    break;
                }
            }
        }
        if (j === keyword.length) {
            return true;
        }
    }
    return false;
}
console.assert(search("a", "ab") === false);
console.assert(search("ab", "ab") === true);
console.assert(search("abc", "ab") === true);
console.assert(search("abc", "abd") === false);
console.assert(search("abcd", "bc") === true);
console.assert(search("abcd", "cd") === true);