/**
 * Created by zhanglingkang on 14-12-29.
 * 前缀转后缀
 * 输入:一个包含+-* /（）的表达式，比如：5*(90-2)+3
 * 输出:表达式的后缀形式
 * 方法:
 *  使用的文法如下
 *  exp-> term+exp {print +}
 *      | term-exp {print -}
 *      | term
 *
 *  term-> factor*term {print *}
 *       | factor/term {print /}
 *       | factor
 *
 *  factor-> (exp)
 *         | num ｛print num.value｝
 *
 *  本文法中的终结符 +-/*() num
 *
 */
(function () {
    console.assert(calculate(getSuffix("3+3")) === 6);
    console.assert(calculate(getSuffix("3-3")) === 0);
    console.assert(calculate(getSuffix("3*3")) === 9);
    console.assert(calculate(getSuffix("3/3")) === 1);
    console.assert(calculate(getSuffix("(3+3)")) === 6);
    console.assert(calculate(getSuffix("((3+3))")) === 6);
    console.assert(calculate(getSuffix("(3+3)*3")) === 18);
    console.assert(calculate(getSuffix("(3+3)*3-(5-2)")) === 15);
    try {
        calculate(getSuffix("(3+3)*3-(5-2)]"));
    } catch (error) {
        console.log(error);
    }
    try {
        calculate(getSuffix("(3+3)*33 33-(5-2)"));
    } catch (error) {
        console.log(error);
    }
    try {
        calculate(getSuffix("(3+3*33-(5-2)"));
    } catch (error) {
        console.log(error);
    }
}());
/**
 *
 * @param {Array} suffixExpression
 */
function calculate(suffixExpression) {
    var stack = [];
    suffixExpression.forEach(function (value) {
        if (/\+|-|\*|\//.test(value)) {
            var second = stack.pop();
            var first = stack.pop();
            stack.push(eval(first + value + second));
        } else {
            stack.push(value);
        }
    });
    return stack[0];
}
function getSuffix(expression) {
    var TOKEN_TAG = {
        OPERATER: 1,
        NUM: 2,
        BRACKET: 3
    };
    var tokenError = error("token");
    var syntaxError = error("syntax");
    var forward = 0;
    var result = [];
    exp();
    if (forward !== expression.length - 1) {
        throw syntaxError();
    }
    return result;


    function error(namespace) {
        return function () {
            return namespace + "-error:" + ";expression:" + expression.substring(0, forward) + "__" + expression.substring(forward);
        }
    }

    /**
     * 获取forward指针指向的字符
     * @returns {string}
     */
    function getChar() {
        return expression.charAt(forward);
    }

    /**
     * 判断一个字符是不是数位，即0-9
     * @param char
     */
    function isDigit(char) {
        return "0" <= char && char <= "9";
    }

    /**
     * 从forward指针指向的字符开始，得到下一个token，函数返回后，forward指向获取到的token结尾处
     * @returns {boolean|Token}如果输入流已到结尾，返回false,否则返回token {{tag:"",value:""}}
     */
    function getNextToken() {
        var char;
        while (/\s/.test(char = getChar())) {
            forward++;
        }
        if (isDigit(char)) {
            var lexemeBegin = forward;
            do {
                forward++;
            }
            while (isDigit(char = getChar()));
            forward--;
            return {
                tag: TOKEN_TAG.NUM,
                value: expression.substring(lexemeBegin, forward + 1)
            };
        }
        else {
            switch (char) {
                case "+":
                case "-":
                case "*":
                case "/":
                    return {
                        tag: TOKEN_TAG.OPERATER,
                        value: char
                    };
                    break;
                case "(":
                case ")":
                    return {
                        tag: TOKEN_TAG.BRACKET,
                        value: char
                    };
                    break;
                case "":
                    forward--;
                    return false;
                default:
                    throw tokenError();
                    break;
            }
        }
    }

    /**
     * 每个非终结符对应的函数的功能描述：
     * forward代表当前输入流中的指针，
     * 每个函数从forward指向的字符开始，完成对应的非终结符的匹配，匹配完成后，forward的值为匹配的字符串最后一位的索引。
     * 如果函数没有抛出异常，即完成匹配。否则没有完成匹配。
     */

    function exp() {
        term();
        forward++;
        var token = getNextToken();
        if (!token) {
            return;
        }
        if (token.tag === TOKEN_TAG.OPERATER) {
            switch (token.value) {
                case "+":
                case "-":
                    forward++;
                    exp();
                    result.push(token.value);
                    break;
                default:
                    forward -= token.value.length;
                    break;
            }
        } else {
            forward -= token.value.length;
        }
    }

    function term() {
        factor();
        forward++;
        var token = getNextToken();
        if (!token) {
            return;
        }
        if (token.tag === TOKEN_TAG.OPERATER) {
            switch (token.value) {
                case "*":
                case "/":
                    forward++;
                    term();
                    result.push(token.value);
                    break;
                default:
                    forward -= token.value.length;
                    break;
            }
        } else {
            forward -= token.value.length;
        }

    }

    function factor() {
        var token = getNextToken();
        if (!token) {
            throw syntaxError();
        }
        if (token.value === "(") {
            forward++;
            exp();
            forward++;
            if (getNextToken().value !== ")") {
                throw syntaxError();
            }
        } else if (token.tag === TOKEN_TAG.NUM) {
            result.push(token.value);
        } else {
            throw syntaxError();
        }
    }


}