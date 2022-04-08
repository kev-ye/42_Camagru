import HttpClient from "./Common/HttpClient.js";

window.addEventListener("onload", () => {
  const test = document.getElementById("test");

  console.log('test:', test);

  test.addEventListener('click', testF, false);

  async function testF () {
    const res = await http.get('/api/users/');
    console.log('res:', res);
  };
});