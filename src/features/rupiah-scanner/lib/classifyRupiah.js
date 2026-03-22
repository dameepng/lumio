import { callClaude } from "../../../core/lib/anthropic";

export async function classifyRupiah(base64Image) {
  const prompt = `Kamu adalah sistem klasifikasi uang rupiah Indonesia.
Lihat gambar ini dan identifikasi nominal uang kertas rupiah yang terlihat.
Jawab HANYA dengan JSON berikut tanpa teks lain:
{"nominal": "seratus-ribu", "confidence": "high"}

Nilai nominal yang valid HANYA:
seribu | dua-ribu | lima-ribu | sepuluh-ribu | dua-puluh-ribu | lima-puluh-ribu | seratus-ribu | tidak-terdeteksi

Nilai confidence: high | medium | low

Kalau bukan uang rupiah atau tidak terlihat jelas, gunakan tidak-terdeteksi.`;

  try {
    const response = await callClaude(base64Image, prompt);

    // API proxy return { result, model, usage }
    const resultText =
      response.result ||
      response.text ||
      response.content ||
      response.message ||
      JSON.stringify(response);

    const match = resultText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");

    const parsed = JSON.parse(match[0]);
    const validNominals = [
      "seribu",
      "dua-ribu",
      "lima-ribu",
      "sepuluh-ribu",
      "dua-puluh-ribu",
      "lima-puluh-ribu",
      "seratus-ribu",
      "tidak-terdeteksi",
    ];

    if (validNominals.includes(parsed.nominal)) {
      return {
        nominal: parsed.nominal,
        confidence: parsed.confidence || "low",
      };
    }

    throw new Error("Invalid nominal value");
  } catch (error) {
    console.error("Classification error:", error);
    return { nominal: "tidak-terdeteksi", confidence: "low" };
  }
}
