import { googleSheetApiCredentials } from "@/app/lib/constants";
import { google } from "googleapis";

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

export async function createGoogleSheet() {
  try {
    // Step 1: Create a google sheet
    const fileMetadata = {
      name: "New Google Sheet",
      mimeType: "application/vnd.google-apps.spreadsheet",
    };

    const createResponse = await drive.files.create({
      requestBody: fileMetadata,
      fields: "id", // only needs id
    });

    const newSpreadsheetId = createResponse.data.id;

    // Step 2: set up the permission
    if (newSpreadsheetId) {
      const permission = {
        type: "anyone", // allow everybody to visit
        role: "writer", // change to "reader" for read only
      };

      try {
        await drive.permissions.create({
          fileId: newSpreadsheetId,
          requestBody: permission,
        });

        return newSpreadsheetId;
      } catch (error) {
        console.error("id does not exist");
        throw error;
      }
    }

    console.log(`Created new Google Sheet with ID: ${newSpreadsheetId}`);
  } catch (error) {
    console.error("Error creating a Google Sheet:", error);
    throw error;
  }
}

interface IGoogleSheetID {
  googleSheetId: string;
  values: string[][];
}
export async function appendToGoogleSheet(props: IGoogleSheetID) {
  const { googleSheetId, values } = props;

  try {
    // Step 3: 插入数据到 Google Sheet
    const resource = {
      values,
    };

    const range = "Sheet1!A1"; // 指定插入数据的范围
    const valueInputOption = "RAW"; // 或者使用 'USER_ENTERED' 让Google Sheets根据输入推断类型

    await sheets.spreadsheets.values.append({
      spreadsheetId: googleSheetId,
      range,
      valueInputOption,
      requestBody: resource,
    });

    console.log(
      `Data inserted successfully into Google Sheet with ID: ${googleSheetId}`
    );
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    throw error;
  }
}
