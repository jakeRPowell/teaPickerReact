export default function idHandler() {
  let id = JSON.parse(localStorage.getItem("id") || 0);
  id = id + 1;
  localStorage.setItem("id", id);
  return id;
}
