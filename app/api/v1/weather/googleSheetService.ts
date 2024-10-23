import { googleSheetApiCredentials } from "@/app/lib/constants";
import { google } from "googleapis";

export async function appendToGoogleSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: googleSheetApiCredentials.clientEmail,
      private_key: googleSheetApiCredentials.privateKey?.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });

  const drive = google.drive({ version: "v3", auth });
  const sheets = google.sheets({ version: "v4", auth });

  try {
    // Step 1: 创建一个新的Google Sheets文档
    const fileMetadata = {
      name: "New Google Sheet", // 你可以根据需要自定义文档名称
      mimeType: "application/vnd.google-apps.spreadsheet",
    };

    const createResponse = await drive.files.create({
      requestBody: fileMetadata,
      fields: "id", // 只需要文档ID
    });

    const newSpreadsheetId = createResponse.data.id;
    console.log(`Created new Google Sheet with ID: ${newSpreadsheetId}`);
  } catch (error) {
    console.error("Error creating or appending to Google Sheet:", error);
    throw error;
  }
}
