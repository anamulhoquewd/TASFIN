import cloudinary from "../config/cloudinary.js";

async function fileToBuffer(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function uploadSingleFile(file: File, folder = "tasfin_uploads") {
  try {
    if (!file) {
      return { error: { message: "No file provided" } };
    }

    const buffer = await fileToBuffer(file);
    if (!buffer || buffer.length === 0) {
      return { error: { message: "Failed to process file buffer" } };
    }

    const result: { url: string; public_id: string; secure_url: string } =
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            format: "webp",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              return reject(
                new Error(`Cloudinary upload failed: ${error.message || error}`)
              );
            }
            if (!result) {
              return reject(new Error("Cloudinary returned no result"));
            }
            resolve(result);
          }
        );

        stream.on("error", (err) => {
          reject(new Error(`Stream error: ${err.message}`));
        });

        stream.end(buffer);
      });

    return {
      success: {
        success: true,
        message: "File uploaded successfully",
        data: {
          url: result.secure_url || result.url,
          publicId: result.public_id,
        },
      },
    };
  } catch (error: any) {
    console.error("Upload error →", error.message || error);
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
}

export async function uploadMultipleFiles(
  files: File[],
  folder = "tasfin_uploads"
) {
  try {
    if (!Array.isArray(files) || files.length === 0) {
      return { error: { message: "files must be a non-empty array" } };
    }

    const results: { url: string; publicId: string }[] = [];

    for (const file of files) {
      const uploaded = await uploadSingleFile(file, folder);

      if (!uploaded.success) {
        return {
          success: false,
          error: uploaded.error || {
            message: "Failed to upload one of the files",
          },
        };
      }

      results.push(uploaded.success.data);
    }

    return {
      success: {
        success: true,
        message: "Multiple files uploaded successfully",
        data: results,
      },
    }; // Array of uploaded image info
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
}

export async function readFile(publicId: string) {
  try {
    if (!publicId || publicId.trim() === "") {
      return {
        error: { message: "publicId is required" },
      };
    }

    const result = await cloudinary.api.resource(publicId);

    if (!result) {
      return { error: { message: "No data returned from Cloudinary" } };
    }

    return result;
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
}

export async function deleteSingleFile(publicId: string) {
  try {
    if (!publicId) {
      return { error: { message: "publicId is required" } };
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result?.result !== "ok" && result?.result !== "not_found") {
      return { error: { message: "Cloudinary delete failed" } };
    }

    return {
      success: true,
      message: "File deleted successfully",
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
}

export async function deleteMultipleFiles(publicIds: string[]) {
  try {
    if (!Array.isArray(publicIds) || publicIds.length === 0) {
      return { error: { message: "publicIds must be a non-empty array" } };
    }

    const result = await cloudinary.api.delete_resources(publicIds);

    if (!result) {
      return { error: { message: "Cloudinary delete failed" } };
    }

    return {
      success: true,
      message: "Multiple files deleted successfully",
      data: result,
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
}
