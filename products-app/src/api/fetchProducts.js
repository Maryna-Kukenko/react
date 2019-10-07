export default function () {
  return fetch('http://demo9165932.mockable.io/products',
    {
      method: 'GET'
    })
    .then(res =>
      res.json())
}