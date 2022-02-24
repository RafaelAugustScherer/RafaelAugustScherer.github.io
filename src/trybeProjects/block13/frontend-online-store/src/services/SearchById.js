export default async function getItemById(id) {
  const item = await fetch(`https://api.mercadolibre.com/items?ids=${id}`);
  const itemJson = await item.json();
  return itemJson;
}
