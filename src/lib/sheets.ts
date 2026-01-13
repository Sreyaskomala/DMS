import { google } from "googleapis";

export async function getSheetsClient(accessToken: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    return google.sheets({ version: "v4", auth });
}

export async function appendToSheet(
    accessToken: string,
    spreadsheetId: string,
    range: string,
    values: any[][]
) {
    const sheets = await getSheetsClient(accessToken);
    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error appending to sheet:", error);
        throw error;
    }
}

export async function getSheetData(
    accessToken: string,
    spreadsheetId: string,
    range: string
) {
    const sheets = await getSheetsClient(accessToken);
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        return response.data.values;
    } catch (error) {
        console.error("Error reading sheet:", error);
        throw error;
    }
}
