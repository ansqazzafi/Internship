const simulateDelay = (duration) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`GET Response after ${duration} milliseconds`);
        }, duration);
    });
};
const fetchData = async () => {
    console.log("Fetching...");
    const result = await simulateDelay(6000);
    console.log(result);
};

fetchData();
