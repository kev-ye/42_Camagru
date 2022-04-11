import HttpClient from "./Common/HttpClient.js";

const http = new HttpClient();

document.addEventListener("click", e => {
  if (e.target && e.target.id === 'test') {
    localStorage.setItem(
      '__token__',
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthbmdrYWkiLCJfaWQiOiI2MjU0MzE2NjVjY2M1OWQ4NjEwYTJiOGEiLCJfYWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNjQ5Njg0OTMwLCJleHAiOjE2NDk3NzEzMzB9.UCX6xIJVAiBbxdvHbdqT819obkpD8a4f1Sg1txUyF4Y"
      );

    // localStorage.removeItem('__token__');
      location.reload()
  }
})