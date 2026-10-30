// 2027 느헤미야 청소년 캠프 참석 조사 — 응답을 구글 스프레드시트에 저장합니다.
// 스프레드시트의 [확장 프로그램 > Apps Script]에 이 코드를 붙여 넣고 웹 앱으로 배포하세요.

const SHEET_NAME = "응답";
const HEADERS = ["제출 시각", "이름", "참석 여부", "고민·어려운 이유", "기대되는 점"];

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  const p = e.parameter || {};
  sheet.appendRow([
    new Date(),
    clean(p.name),
    clean(p.attend),
    clean(p.reason),
    clean(p.hope),
  ]);
  return ContentService.createTextOutput("ok");
}

// 수식으로 해석되지 않도록 =, +, -, @ 로 시작하는 값 앞에 ' 를 붙입니다.
function clean(v) {
  const s = String(v || "").slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
