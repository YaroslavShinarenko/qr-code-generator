import QRCode from "qrcode-svg";

function generateQRCode(content, size, padding, backgroundColor, codeColor) {
  const qrcode = new QRCode({
    content: content,
    padding: padding,
    width: size,
    height: size,
    color: codeColor,
    background: backgroundColor,
    ecl: "M",
  });

  const svgString = qrcode.svg();
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const downloadUrl = URL.createObjectURL(blob);

  return {
    svgString: svgString,
    downloadUrl: downloadUrl,
  };
}

function displayQRCode() {
  const content = document.getElementById("content").value;
  const size = parseInt(document.getElementById("size").value);
  const isTransparent = document.getElementById("setTransparent").checked;
  const backgroundColor = isTransparent
    ? "transparent"
    : document.getElementById("backgroundColor").value;
  const codeColor = document.getElementById("codeColor").value;
  const padding = document.getElementById("padding").value;

  const qrCodeData = generateQRCode(
    content,
    size,
    padding,
    backgroundColor,
    codeColor
  );

  document.getElementById("qrCode").innerHTML = qrCodeData.svgString;
  const downloadLinkSvg = document.getElementById("downloadLinkSvg");
  downloadLinkSvg.href = qrCodeData.downloadUrl;
  downloadLinkSvg.style.display = "block";

  convertSvgToPng(qrCodeData.svgString, function (pngDataUrl) {
    const downloadLinkPng = document.getElementById("downloadLinkPng");
    downloadLinkPng.href = pngDataUrl;
    downloadLinkPng.style.display = "block";
  });
}

function convertSvgToPng(svgString, callback) {
  const img = new Image();
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    const imgPng = canvas.toDataURL("image/png");
    callback(imgPng);
  };
  img.src = url;
}

document
  .getElementById("generateButton")
  .addEventListener("click", displayQRCode);
