const driver = function () {
   
    const getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    const createRandomArray = function () {
        let arr = [];
        
        for (let i = 0; i <= 100; i++) {
            arr.push(parseInt(getRandomArbitrary(1, 100)));
        }

        return arr;
    }


    return {
        createRandomArray,
        getRandomArbitrary,

    }
};

export default driver;

