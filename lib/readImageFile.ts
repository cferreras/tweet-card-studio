export function readImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Could not read the image."));
    });

    reader.addEventListener("error", () => {
      reject(reader.error ?? new Error("Could not read the image."));
    });

    reader.readAsDataURL(file);
  });
}
