import { generateCaptcha } from "../captchaApi";

export async function GET() {
  return generateCaptcha();
}
