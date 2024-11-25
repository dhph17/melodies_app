import Vibrant from "node-vibrant";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("imageUrl"); // Lấy URL hình ảnh từ query

  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    // console.log("Palette: ", palette); 

    const vibrantSwatch = palette.Muted;
    // const vibrantSwatch = palette.DarkVibrant //palette.DarkVibrant; 


    if (vibrantSwatch) {
      const rgbColor = vibrantSwatch.rgb;
      // Tăng cường độ màu
      const adjustedColor = rgbColor.map(color => Math.min(255, Math.round(color)));

      const dominantColor = `rgb(${adjustedColor[0]}, ${adjustedColor[1]}, ${adjustedColor[2]})`;
      console.log("Dominant: ", dominantColor);
      return new Response(JSON.stringify({ dominantColor }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      throw new Error("No vibrant color found");
    }
  } catch (error) {
    console.error("Error getting dominant color: ", error);
    return new Response(JSON.stringify({ error: "Error getting dominant color" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
