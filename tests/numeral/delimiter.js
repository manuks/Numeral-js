var numeral = require('../../numeral');

/*
* http://en.wikipedia.org/wiki/Indian_Numbering_System
* The Indian Numbering System is used throughout India, Pakistan, Bangladesh, Nepal, and Sri Lanka.
* It is based on the Vedic numbering system in which numbers over 9,999 are written 
* in two-digit groups (or a mix of two- and three-digit groups) rather than 
* the three-digit groups used in most other parts of the world.
* Eg: 10 Million = 10,000,000 = One Crore = 1,00,00,000
*/
var toIndianNumeral = function (numberString, lang) {
	var nArr = numberString.replace(/(\d)(?=(\d{3})$)/,'$1,').split(',');
	if (nArr.length <= 1) {
		return numberString;
	}	
	
	nArr[0] = nArr[0].replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1' + lang.delimiters.thousands);
	return nArr.join(lang.delimiters.thousands);
}
exports.format = {
    default: function (test) {
        test.expect(8);

        
	numeral.languageData().delimiters.replaceFunction = toIndianNumeral;
        test.strictEqual(numeral(1.50).format('0,0.00'), '1.50', '0.0');
        test.strictEqual(numeral(10.50).format('0,0.00'), '10.50', '0.0');
        test.strictEqual(numeral(100.50).format('0,0.00'), '100.50', '0.0');
        test.strictEqual(numeral(1000.50).format('0,0.00'), '1,000.50', '0.0');
        test.strictEqual(numeral(10000.50).format('0,0.00'), '10,000.50', '0.0');
        test.strictEqual(numeral(100000.50).format('0,0.00'), '1,00,000.50', '0.0');
        test.strictEqual(numeral(1000000.50).format('0,0.00'), '10,00,000.50', '0.0');
        test.strictEqual(numeral(10000000.50).format('0,0.00'), '1,00,00,000.50', '0.0');
	numeral.languageData().delimiters.replaceFunction = null;

        test.done();
    }
}


