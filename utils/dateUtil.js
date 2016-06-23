module.exports = {
    formatDate(date) {
        const month = this.getDoubleDigitString(date.getMonth() + 1);
        const day = this.getDoubleDigitString(date.getDate());
        return `${date.getFullYear()}-${month}-${day}`;
    },
    getToday() {
        return this.formatDate(new Date());
    },
    getDoubleDigitString(n) {
        let nInt = parseInt(n, 10);
        if (nInt < 10) { // single digit or negative
            if (nInt < 0) { // negative
                if (nInt < -9) { // negative (min) double digit
                    return (nInt * -1).toString();
                }
                return `0${(nInt *= -1)}`;  // negative single digit
            }
            return `0${n}`; // single digit
        }
        return nInt.toString();  // (min) double digit
    },
};
