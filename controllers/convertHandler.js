function ConvertHandler() {
  this.getNum = function (input) {
    return parseFloat(input) || 1;
  };

  this.getUnit = function (input) {
    const match = input.match(/[a-zA-Z]/);
    const firstCharIndex = match ? input.indexOf(match[0]) : null;
    if (firstCharIndex === null) {
      return null;
    } else {
      return input.slice(firstCharIndex);
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
        return (initNum * galToL).toFixed(5);
      case "L":
        return (initNum / galToL).toFixed(5);
      case "lbs":
        return (initNum * lbsToKg).toFixed(5);
      case "kg":
        return (initNum / lbsToKg).toFixed(5);
      case "mi":
        return (initNum * miToKm).toFixed(5);
      case "km":
        return (initNum / miToKm).toFixed(5);
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
