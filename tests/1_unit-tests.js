const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  // convertHandler should correctly read a whole number input.
  test("Whole number input", function () {
    assert.equal(convertHandler.getNum("32L"), 32);
  });
  // convertHandler should correctly read a decimal number input.
  test("Decimal number input", function () {
    assert.equal(convertHandler.getNum("32.5L"), 32.5);
  });
  // convertHandler should correctly read a fractional input.
  test("Fractional input", function () {
    assert.equal(convertHandler.getNum("1/2L"), 0.5);
  });
  // convertHandler should correctly read a fractional input with a decimal.
  test("Fractional input with decimal", function () {
    assert.equal(convertHandler.getNum("1.5/2L"), 0.75);
  });
  // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
  test("Double fraction error", function () {
    assert.isNull(convertHandler.getNum("3/2/3L"));
  });
  // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test("No numerical input", function () {
    assert.equal(convertHandler.getNum("L"), 1);
  });
  // convertHandler should correctly read each valid input unit.
  test("Valid input unit", function () {
    assert.equal(convertHandler.getUnit("32L"), "L");
    assert.equal(convertHandler.getUnit("32gal"), "gal");
    assert.equal(convertHandler.getUnit("32lbs"), "lbs");
    assert.equal(convertHandler.getUnit("32kg"), "kg");
    assert.equal(convertHandler.getUnit("32mi"), "mi");
    assert.equal(convertHandler.getUnit("32km"), "km");
  });
  // convertHandler should correctly return an error for an invalid input unit.
  test("Invalid input unit", function () {
    assert.isNull(convertHandler.getUnit("32g"));
  });
  // convertHandler should return the correct return unit for each valid input unit.
  test("Return unit", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
  });
  // convertHandler should correctly return the spelled-out string unit for each valid input unit.
  test("Spelled-out unit", function () {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
  });
  // convertHandler should correctly convert gal to L.
  test("Gal to L", function () {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.1);
  });
  // convertHandler should correctly convert L to gal
  test("L to Gal", function () {
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.1);
  });
  // convertHandler should correctly convert mi to km.
  test("Mi to Km", function () {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.1);
  });
  // convertHandler should correctly convert km to mi.
  test("Km to Mi", function () {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.1);
  });
  // convertHandler should correctly convert lbs to kg.
  test("Lbs to Kg", function () {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.1);
  });
  // convertHandler should correctly convert kg to lbs.
  test("Kg to Lbs", function () {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.1);
  });
});
