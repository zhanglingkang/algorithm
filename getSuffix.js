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
 *  num-> digittemp
 *
 *  temp->digittemp|空
 *
 *  digit->0|1|2|3|4|5|6|7|8|9
 */
(function () {
    console.log(calculate(getSuffix("(20-5)*3")));
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
    var index = 0;
    var result = [];
    expression = expression.replace(/\s+/g, "");
    exp();
    if (index !== expression.length - 1) {
        throw "error";
    }
    return result;


    function getNextChar() {
        return expression.charAt(index);
    }

    /**
     * 每个非终结符对应的函数的功能描述：
     * index代表当前输入流中的指针，
     * 每个函数从index指向的字符开始，完成对应的非终结符的匹配，匹配完成后，index的值为匹配的字符串最后一位的索引。
     * 如果函数没有抛出异常，即完成匹配。否则没有完成匹配。
     */

    function exp() {
        term();
        index++;
        var char = getNextChar();
        switch (char) {
            case "+":
                index++;
                exp();
                result.push("+");
                break;
            case "-":
                index++;
                exp();
                result.push("-");
                break;
            default:
                index--;
                break;
//            default:
//                throw "表达式错误"
        }
    }

    function term() {
        factor();
        index++;
        switch (getNextChar()) {
            case "*":
                index++;
                term();
                result.push("*");
                break;
            case "/":
                index++;
                term();
                result.push("/");
                break;
            default:
                index--;
                break;

        }
    }

    function factor() {
        var char = getNextChar();
        if (char === "(") {
            index++;
            exp();
            index++;
            if (getNextChar() !== ")") {
                throw "error";
            }
        } else {
            num();
        }

    }

    function num() {
        var char = getNextChar();
        var start = index;
        if ("0" <= char && char <= "9") {
            index++;
            temp();
            result.push(expression.substring(start, index + 1));
        } else {
            throw "error";
        }
    }

    function temp() {
        var char = getNextChar();
        if ("0" <= char && char <= "9") {
            index++;
            temp();
        } else {
            index--;
        }
    }
}