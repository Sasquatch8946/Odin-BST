const driver = function () {
   
    const getRandomArbtirary = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    const createRandomArray = function () {
        let arr = [];
        
        for (let i = 0; i <= 100; i++) {
            arr.push(parseInt(getRandomArbtirary(1, 1000)));
        }

        return arr;
    }


    return {
        createRandomArray,

    }
};

export default driver;

