import crypto from "crypto";

export function generateDownloadLink(guideId) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Link expires in 24 hours

  return { token, expiresAt };
}
