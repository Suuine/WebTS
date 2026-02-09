"use strict";
console.log("Instruction:");
console.log("You can write function - triangle(arg1, type1, arg2, type2)");
console.log("Where:");
console.log(" - arg1, arg2: numeric values (sides, angle)");
console.log(" - type1, type2: the type of triangle element ('leg', 'hypotenuse', 'adjacent angle', 'opposite angle', angle(only with hypotenuse))");
console.log("Example: triangle(7, 'leg', 60, 'adjacent angle')");
console.log("Please, pay attantion for correct writing names of types or values");
console.log("P.S. Any started leg is a, so all another calculating will based on leg a");
function triangle(arg1, type1, arg2, type2) {
    if (arg1 <= 0 || arg2 <= 0) {
        return "Zero or negative inpute";
    }
    switch (type1) {
        case "leg":
            let a = arg1;
            switch (type2) {
                case "leg": {
                    let b = arg2;
                    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    let alpha = Math.atan(a / b) * (180 / Math.PI);
                    let beta = Math.atan(b / a) * (180 / Math.PI);
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                case "hypotenuse": {
                    let c = arg2;
                    let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    let alpha = Math.atan(a / b) * (180 / Math.PI);
                    let beta = Math.atan(b / a) * (180 / Math.PI);
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                case "adjacent angle": {
                    let alpha = arg2;
                    if (alpha >= 90) {
                        console.log("angle is not sharp(?)");
                        return "failed";
                    }
                    let c = a / Math.cos(alpha * Math.PI / 180);
                    let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    let beta = 90 - alpha;
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                case "opposite angle": {
                    let beta = arg2;
                    if (beta >= 90) {
                        console.log("angle is not sharp(?)");
                        return "failed";
                    }
                    let c = a / Math.sin(beta * Math.PI / 180);
                    let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    let alpha = 90 - beta;
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                default: {
                    console.log("Type(s) had been written wrong, please read names again");
                    console.log("... or you can't find anything with your types");
                    return "failed";
                }
            }
        case "hypotenuse":
            let c = arg1;
            switch (type2) {
                case "leg": {
                    let a = arg2;
                    let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    let alpha = Math.atan(a / b) * (180 / Math.PI);
                    let beta = Math.atan(b / a) * (180 / Math.PI);
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                case "angle": {
                    let alpha = arg2;
                    if (alpha >= 90) {
                        console.log("angle is not sharp(?)");
                        return "failed";
                    }
                    let beta = 90 - alpha;
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    let a = c * Math.sin(alpha * Math.PI / 180);
                    let b = c * Math.sin(beta * Math.PI / 180);
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                default: {
                    console.log("Type(s) had been written wrong, please read names again");
                    console.log("... or you can't find anything with your types");
                    return "failed";
                }
            }
        case "adjacent angle":
            let alpha = arg1;
            switch (type2) {
                case "leg": {
                    let a = arg2;
                    let c = a / Math.cos(alpha * Math.PI / 180);
                    let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    let beta = 90 - alpha;
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                default: {
                    console.log("Type(s) had been written wrong, please read names again");
                    console.log("... or you can't find anything with your types");
                    return "failed";
                }
            }
        case "opposite angle":
            let beta = arg1;
            switch (type2) {
                case "leg": {
                    let a = arg2;
                    let c = a / Math.sin(beta * Math.PI / 180);
                    let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    let alpha = 90 - beta;
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                default: {
                    console.log("Type(s) had been written wrong, please read names again");
                    console.log("... or you can't find anything with your types");
                    return "failed";
                }
            }
        case "angle": {
            let alpha = arg1;
            switch (type2) {
                case "hypotenuse": {
                    let c = arg2;
                    let beta = 90 - alpha;
                    if (alpha <= 0 || beta <= 0) {
                        console.log("Angle(s) going to 0");
                        return "failed";
                    }
                    let a = c * Math.sin(alpha * Math.PI / 180);
                    let b = c * Math.sin(beta * Math.PI / 180);
                    if (c <= a || c <= b) {
                        console.log("triangle is not triangle bc hypotenuse is smaller than leg or same");
                        return "failed";
                    }
                    if (!(a + b >= c || a + c >= b || b + c >= a)) {
                        console.log("triangle is not triangle bc it is not 3 good sides");
                        return "failed";
                    }
                    console.log("a =", a);
                    console.log("b =", b);
                    console.log("c =", c);
                    console.log("alpha =", alpha);
                    console.log("beta =", beta);
                    return "success";
                }
                default: {
                    console.log("Type(s) had been written wrong, please read names again");
                    console.log("... or you can't find anything with your types");
                    return "failed";
                }
            }
        }
        default: {
            console.log("Type(s) had been written wrong, please read names again");
            console.log("... or you can't find anything with your types");
            return "failed";
        }
    }
}
//# sourceMappingURL=main.js.map