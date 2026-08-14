import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const awardMedia = [
  {
    publicUrl: "/manus-storage/2026FinalistBadgeBusiness-web_b16057bd.webp",
    originalFilename: "2026FinalistBadgeBusiness.jpg",
    mimeType: "image/webp",
    width: 720,
    height: 671,
    altText: "Latrobe Health Services Gippsland Business Awards 2026 finalist badge for Business and Professional Services",
    awardingBody: "Latrobe Health Services Gippsland Business Awards",
    awardName: "Gippsland Business Awards",
    category: "Business & Professional Services",
    year: 2026,
    recognitionLevel: "Finalist",
    displayOrder: 1,
  },
  {
    publicUrl: "/manus-storage/MFAA2026_State-Finalist_RegionalFinancebrokerIcon-web_3fc10327.webp",
    originalFilename: "MFAA2026_State-Finalist_RegionalFinancebrokerIcon.png",
    mimeType: "image/webp",
    width: 500,
    height: 500,
    altText: "MFAA Excellence Awards 2026 state finalist badge for Regional Finance Broker Award",
    awardingBody: "Mortgage & Finance Association of Australia",
    awardName: "MFAA Excellence Awards",
    category: "Regional Finance Broker Award",
    year: 2026,
    recognitionLevel: "State Finalist",
    displayOrder: 2,
  },
  {
    publicUrl: "/manus-storage/ABA_2025_Finalist_RegionalBrokeroftheYear-web_c68dc54d.webp",
    originalFilename: "ABA_2025_Finalist_RegionalBrokeroftheYear.png",
    mimeType: "image/webp",
    width: 720,
    height: 720,
    altText: "The Adviser Australian Broking Awards 2025 finalist badge for Regional Broker of the Year",
    awardingBody: "The Adviser",
    awardName: "Australian Broking Awards",
    category: "Regional Broker of the Year",
    year: 2025,
    recognitionLevel: "Finalist",
    displayOrder: 3,
  },
  {
    publicUrl: "/manus-storage/ABA_2025_Finalist_RegionalOfficeoftheYear-web_c88e7b5f.webp",
    originalFilename: "ABA_2025_Finalist_RegionalOfficeoftheYear.png",
    mimeType: "image/webp",
    width: 720,
    height: 720,
    altText: "The Adviser Australian Broking Awards 2025 finalist badge for Regional Office of the Year",
    awardingBody: "The Adviser",
    awardName: "Australian Broking Awards",
    category: "Regional Office of the Year",
    year: 2025,
    recognitionLevel: "Finalist",
    displayOrder: 4,
  },
];

for (const item of awardMedia) {
  const [existingMedia] = await connection.execute("SELECT id FROM media WHERE publicUrl = ? LIMIT 1", [item.publicUrl]);
  let mediaId = existingMedia[0]?.id;
  if (!mediaId) {
    const [inserted] = await connection.execute(
      "INSERT INTO media (publicUrl, originalFilename, mimeType, width, height, altText) VALUES (?, ?, ?, ?, ?, ?)",
      [item.publicUrl, item.originalFilename, item.mimeType, item.width, item.height, item.altText],
    );
    mediaId = inserted.insertId;
  }

  const [existingAward] = await connection.execute(
    "SELECT id FROM awards WHERE awardName = ? AND category = ? AND year = ? LIMIT 1",
    [item.awardName, item.category, item.year],
  );
  if (existingAward[0]?.id) {
    await connection.execute(
      "UPDATE awards SET awardingBody = ?, recognitionLevel = ?, mediaId = ?, active = true, displayOrder = ? WHERE id = ?",
      [item.awardingBody, item.recognitionLevel, mediaId, item.displayOrder, existingAward[0].id],
    );
  } else {
    await connection.execute(
      "INSERT INTO awards (awardingBody, awardName, category, year, recognitionLevel, mediaId, active, displayOrder) VALUES (?, ?, ?, ?, ?, ?, true, ?)",
      [item.awardingBody, item.awardName, item.category, item.year, item.recognitionLevel, mediaId, item.displayOrder],
    );
  }
}

const publicSettings = {
  phone_landline: "03 5639 9204",
  phone_mobile: "0417 690 985",
  email: "unlock@nextmoveloans.com.au",
  address_line_1: "19 Bair Street",
  address_suburb: "Leongatha",
  address_state: "VIC",
  address_postcode: "3953",
  calendly_discovery: "https://calendly.com/martin-reidy/discovery-call",
  calendly_game_plan: "https://calendly.com/martin-reidy/strategysession",
};

for (const [settingKey, valueText] of Object.entries(publicSettings)) {
  await connection.execute(
    "INSERT INTO site_settings (settingKey, valueType, valueText, settingGroup) VALUES (?, 'text', ?, 'public') ON DUPLICATE KEY UPDATE valueText = VALUES(valueText), valueType = 'text', settingGroup = 'public'",
    [settingKey, valueText],
  );
}

const analyticsSettings = {
  "analytics.ga4MeasurementId": "",
  "analytics.gtmContainerId": "",
  "analytics.searchConsoleVerification": "",
  "analytics.metaPixelId": "",
  "analytics.callTrackingProvider": "",
  "analytics.callTrackingNumber": "",
};

for (const [settingKey, valueText] of Object.entries(analyticsSettings)) {
  await connection.execute(
    "INSERT INTO site_settings (settingKey, valueType, valueText, settingGroup) VALUES (?, 'text', ?, 'analytics') ON DUPLICATE KEY UPDATE settingGroup = 'analytics'",
    [settingKey, valueText],
  );
}

await connection.execute(
  "INSERT INTO site_settings (settingKey, valueType, valueJson, settingGroup) VALUES ('analytics.eventCatalog', 'json', ?, 'analytics') ON DUPLICATE KEY UPDATE settingGroup = 'analytics'",
  [JSON.stringify({ events: ["phone_click", "email_click", "calendly_discovery", "calendly_game_plan", "lead_form_success", "lead_form_error", "proof_reviews_open"] })],
);

await connection.execute(
  "INSERT INTO site_settings (settingKey, valueType, valueJson, settingGroup) VALUES ('analytics.conversionMappings', 'json', ?, 'analytics') ON DUPLICATE KEY UPDATE settingGroup = 'analytics'",
  [JSON.stringify({ lead_form_success: { googleAdsSendTo: "", metaEvent: "Lead" }, calendly_discovery: { googleAdsSendTo: "", metaEvent: "Schedule" }, calendly_game_plan: { googleAdsSendTo: "", metaEvent: "Schedule" }, phone_click: { googleAdsSendTo: "", metaEvent: "Contact" } })],
);

await connection.execute(
  "INSERT INTO site_settings (settingKey, valueType, valueJson, settingGroup) VALUES ('analytics.callTracking', 'json', ?, 'analytics') ON DUPLICATE KEY UPDATE settingGroup = 'analytics'",
  [JSON.stringify({ enabled: false, originalHref: "tel:+61356399204", originalDisplay: "03 5639 9204", replacementHref: "", replacementDisplay: "", provider: "" })],
);

await connection.end();
console.log("Seeded verified awards, public contact settings and central analytics configuration placeholders.");
