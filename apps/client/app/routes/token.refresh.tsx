import { LoaderFunctionArgs, json } from "@remix-run/node";
import { refreshTokenCookie } from "~/services/session.server";
import { JWT } from "~/utils/jwt";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');

  if (!cookieHeader) {
    return json({ error: 'Cookie not found' }, { status: 500 });
  }

  const refreshToken = await refreshTokenCookie.parse(cookieHeader) as string | undefined;

  if (!refreshToken) {
    return json({}, { status: 401 });
  }

  const jwt = new JWT();
  const { success, data, error } = jwt.verifyRefreshToken(refreshToken);

  if (!success || !data) {
    return json({ error: error }, { status: 403 });
  }

  const { userId } = data;
  const newAccessToken = jwt.generateAccessToken(userId);

  return json({ accessToken: newAccessToken });
}

export async function action() {
  return json({ error: 'Method not allowed' }, { status: 405 });
}
