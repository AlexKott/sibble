module.exports = {
    formatDate(date) {
        const month = this.getDoubleDigitString(date.getMonth() + 1);
        const day = this.getDoubleDigitString(date.getDate());
        console.log(`${date.getFullYear()}-${month}-${day}`);
        return `${date.getFullYear()}-${month}-${day}`;
    },
    getToday() {
        return this.formatDate(new Date());
    },
    getDoubleDigitString(n) {
        const nInt = parseInt(n);
        if (nInt < 10) { // single digit or negative
            if (nInt < 0) { // negative
                if (nInt < -9) { // negative (min) double digit
                    return (n * -1).toString();
                } else { // negative single digit
                    return '0' + (nInt *= -1);
                }
            } else { // single digit
                return '0' + n;
            }
        } else { // (min) double digit
            return n.toString();
        }
    }
}
