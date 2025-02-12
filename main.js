function validateINN(number) {
	// Разрешаем использовать пробельные символы в номере
	number = number.replace(/\s/g, '')

	// Проверка длины, она может быть только 10 или 12 символов
	if (!/^([0-9]{10}|[0-9]{12})$/.test(number))
		return false

	// Проверка ИНН для юр. лиц
	if (number.length == 10) {
		const parse = number.match(/^(.{9})(.)$/)  // 9 цифр и одна контрольная
		const n = parse[1].split('')
		const checkCode = ((2*n[0] + 4*n[1] + 10*n[2] + 3*n[3] + 5*n[4] + 9*n[5] + 4*n[6] + 6*n[7] + 8*n[8]) % 11) % 10

		return checkCode == parse[2]
	}

	// проверка ИНН для физ. лиц (12 символов)
	const parse = number.match(/^(.{10})(.)(.)$/)  // 10 цифр и две контрольных
	const n = parse[1].split('')
	const checkCode1 = ((7*n[0] + 2*n[1] + 4*n[2] + 10*n[3] + 3*n[4] + 5*n[5] + 9*n[6] + 4*n[7] + 6*n[8] + 8*n[9]) % 11) % 10
	const checkCode2 = ((3*n[0] + 7*n[1] + 2*n[2] + 4*n[3] + 10*n[4] + 3*n[5] + 5*n[6] + 9*n[7] + 4*n[8] + 6*n[9] + 8*checkCode1) % 11) % 10

	return checkCode1 == parse[2] && checkCode2 == parse[3]
}