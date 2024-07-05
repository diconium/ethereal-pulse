import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getRefreshToken } from "~/services/session.server";
import { JWT } from "~/utils/jwt";

export async function loader({ request }: LoaderFunctionArgs) {
  const refreshToken = await getRefreshToken(request);

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
