export const StringText= {
    inputBox1:"inputBox1",
    inputBox2:"inputBox2",
    button1:"button1",
    button2:"button2",
    result:"result"
}

let testData = null;
 
const getTestData = () => testData;
 
const setTestData = (newTestData) => {
    testData = { ...testData, ...newTestData };
};
 
export { getTestData, setTestData };