export function readImageDetails(href: string) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = document.createElement('img');
  image.src = href;

  ctx.drawImage(image, 0, 0);
  document.body.appendChild(canvas);

}