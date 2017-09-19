function validateINN(number) {
	var parse, n;

	//Разрешаем использовать пробельные символы в номере
	number = number.replace(/\s/g, '');

	//Проверка длины
	if (!/^([0-9]{10}|[0-9]{12})$/.test(number)) { return false; }

	//Проверка контрольных цифр
	if (number.length == 10)
	{
		parse = number.match(/^(.{9})(.)$/);
		n     = parse[1].split('');

		var controlCode = parse[2],
		    checkCode   = ((2*n[0] + 4*n[1] + 10*n[2] + 3*n[3] + 5*n[4] + 9*n[5] + 4*n[6] + 6*n[7] + 8*n[8]) % 11) % 10;

		if (checkCode != controlCode) {
			return false;
		}
	}
	else
	{
		parse = number.match(/^(.{10})(.)(.)$/);
		n     = parse[1].split('');
		var controlCode1 = parse[2],
			controlCode2 = parse[3],
			checkCode1   = ((7*n[0] + 2*n[1] + 4*n[2] + 10*n[3] + 3*n[4] + 5*n[5] + 9*n[6] + 4*n[7] + 6*n[8] + 8*n[9]) % 11) % 10,
			checkCode2   = ((3*n[0] + 7*n[1] + 2*n[2] + 4*n[3] + 10*n[4] + 3*n[5] + 5*n[6] + 9*n[7] + 4*n[8] + 6*n[9] + 8*checkCode1) % 11) % 10;

		if (checkCode1 != controlCode1 || checkCode2 != controlCode2) {
			return false;
		}
	}

	return true;
}