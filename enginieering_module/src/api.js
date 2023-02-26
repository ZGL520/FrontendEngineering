export default getUser => {
  fetch('/api/users').then(res => res.json()).then(res => {
    console.log(res);
  });
}