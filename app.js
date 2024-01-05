import QRCode from "qrcode-svg";

function generateQRCode(content) {
  const qrcode = new QRCode({
    content: content,
    padding: 2,
    width: 256,
    height: 256,
    color: "#000000",
    background: "transparent",
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
  const qrCodeData = generateQRCode(content);

  document.getElementById("qrCode").innerHTML = qrCodeData.svgString;
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.href = qrCodeData.downloadUrl;
  downloadLink.style.display = "block";
}

document
  .getElementById("generateButton")
  .addEventListener("click", displayQRCode);
