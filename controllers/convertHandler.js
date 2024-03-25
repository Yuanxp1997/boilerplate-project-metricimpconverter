const { parse } = require("dotenv");

function ConvertHandler() {
  this.getNum = function (input) {
    const match = input.match(/[a-zA-Z]/);
    const number = match ? input.slice(0, match.index) : input;
    const isFraction = input.includes("/");
    if (number === "") {
      return 1;
    } else if (isFraction) {
      const fraction = number.split("/");
      if (fraction.length > 2) {
        return null;
      } else {
        return fraction[0] / fraction[1];
      }
    } else {
      return parseFloat(number);
    }
  };

  this.getUnit = function (input) {
    const match = input.match(/[a-zA-Z]/);
    const firstCharIndex = match ? input.indexOf(match[0]) : null;
    const unit = input.slice(firstCharIndex);
    const validUnits = ["gal", "lbs", "kg", "mi", "km"];
    if (unit === "l" || unit === "L") {
      return "L";
    } else {
      return validUnits.includes(unit.toLowerCase())
        ? unit.toLowerCase()
        : null;
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unitPairs = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };
    return unitPairs[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };
    return unitNames[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        return parseFloat((initNum * galToL).toFixed(5));
      case "L":
        return parseFloat((initNum / galToL).toFixed(5));
      case "lbs":
        return parseFloat((initNum * lbsToKg).toFixed(5));
      case "kg":
        return parseFloat((initNum / lbsToKg).toFixed(5));
      case "mi":
        return parseFloat((initNum * miToKm).toFixed(5));
      case "km":
        return parseFloat((initNum / miToKm).toFixed(5));
      default:
        return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
