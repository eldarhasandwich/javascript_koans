var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) { // if there are no nuts
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) { // look for mushrooms
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               } // we should break this loop if we find mushrooms
            }
            if (!hasMushrooms) productsICanEat.push(products[i]); // if no mushrooms, add to products
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      var hasMushroom = function(x) { return x === "mushrooms" } // true if x has mushrooms
      var productsICanEat = _(products).filter(function (x) { return x.containsNuts === false
            && !_(x.ingredients).any(hasMushroom) }); // if no nuts and no mushrooms


      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */
    var sum = _( _.range(0,1000) ).reduce(
          function(sum, x) {if (x%3===0 || x%5===0) {return sum + x} else {return sum}} );

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    // turn everything into its ingredient array, flatten it, and summate ingredients
    var addToHistogram = function (x) {
      ingredientCount[x] = (ingredientCount[x] || 0) + 1; }

    _(products).chain() .map(function(x) { return x.ingredients })
                      .flatten()
                      .forEach(addToHistogram);

    // I didn't see how this could be achived with reduce? I used forEach()
    // Same result as imperative if you look at the full ingredientCount dictionary

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var aPointer = 100;
    var bPointer = 100;
    var largestPalindrome = 0;
    // number.length
    function productIsPalindrome(a,b) {
      var item = (a*b).toString().split("");
      var counter = 0;
      while (counter < item.length / 2) {
        if (item[counter] != item[item.length-1-counter]) {
          return false;
        }
        counter ++;
      }
      return true;
    }

    for(var a = 100; a < 1001; a++) {
      for(var b = 100; b < 1001; b++) {
        if (productIsPalindrome(a,b)) {
          if ((a*b) > largestPalindrome) {
            aPointer = a;
            bPointer = b;
            largestPalindrome = (a*b);
          }
        }
      }
    }

    expect(largestPalindrome).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    divisibleRange = _.range(1,21);
    function isDivisible(num) {
      for(var i = 0; i < divisibleRange.length; i++) {
        if (num % divisibleRange[i] != 0) {
          return false;
        }
      }
      return true;
    }

    smallestNum = 20;
    flag = false;
    while (flag == false) {
      smallestNum ++;
      if (isDivisible(smallestNum)) {
        flag = true;
      }
    }

    expect(smallestNum).toBe(232792560);

  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    var n = 10;

    var nRange = _.range(1, n+1);
    var sumOfSquares = _(nRange).reduce(
        function(sum, x) {return (sum + Math.pow(x,2))}, 0); //something is wrong here
    var squareOfSums = Math.pow(_(nRange).reduce(
        function(sum, x) {return sum + x}, 0),2);

    var difference = sumOfSquares - squareOfSums;

    // this can be solved with (n-1)n(n+1)(3n+2) /12 in constant time

    expect(difference).toBe(-2640);

  });

  it("should find the 10001st prime", function () {

  });

});
