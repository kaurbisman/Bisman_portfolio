/**
 * Safely handles CV/Resume PDF downloading and viewing without triggering
 * Chrome's red 'Not secure' warning when handling Base64/Data URIs.
 */
export function handleCVDownload(url?: string, filename = "Bisman_Kaur_CV.pdf") {
  if (!url) return;

  // 1. If it's a standard HTTP/HTTPS URL (e.g. from Supabase Storage), open directly
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // 2. If it's a base64 data URI (data:application/pdf;base64,...), convert to Blob URL to prevent 'Not secure' warning
  if (url.startsWith("data:")) {
    try {
      const parts = url.split(";base64,");
      const contentType = parts[0].replace("data:", "") || "application/pdf";
      const base64Data = parts[1] || "";
      const raw = window.atob(base64Data);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      const blob = new Blob([uInt8Array], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up memory after download starts
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      return;
    } catch (e) {
      console.warn("Base64 to Blob conversion fallback:", e);
    }
  }

  // Fallback for relative paths (e.g. /resume_bisman_kaur.pdf)
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
